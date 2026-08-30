import asyncio
import json
import os

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from copilot_service import ask_copilot
from data_service import get_customers
from agents import orchestrate
from rules import decide_offer
from database import SessionLocal
from models import Customer, Prediction, RecoveryMessage, AuditLog
from dashboard_service import get_dashboard
from socket_manager import manager
from live_sessions import create_live_customer
from analytics_service import get_revenue_trend
from product_service import search_products
from checkout_service import create_checkout
from agent_checkout import agent_checkout
from campaign_service import create_campaign
from upsell_service import recommend_addons
from bundle_service import create_bundle_checkout
from razorpay_service import create_order, verify_signature
from fastapi import HTTPException

app = FastAPI(
    title="GrowthFlow AI",
    version="2.0.0",
    description="AI-powered commerce recovery assistant."
)

# -----------------------------------
# CORS
# -----------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------
# Live AI Engine
# -----------------------------------

async def live_engine():
    while True:
        db = SessionLocal()

        try:
            customer = await create_live_customer()

            result = orchestrate({
                "cart_value": customer.cart_value,
                "time_spent": customer.time_spent,
                "coupon_used": customer.coupon_used,
            })

            db.add(Prediction(
                customer_id=customer.id,
                intent=result["intent"]["intent"],
                confidence=result["intent"]["confidence"],
                recovery_probability=result["recovery"]["probability"],
                priority=result["recovery"]["priority"],
                offer=result["offer"]["offer"],
            ))

            db.add(RecoveryMessage(
                customer_id=customer.id,
                message=result["message"]["message"],
                channel="WhatsApp",
                sent=False,
            ))

            db.add(AuditLog(
                customer_id=customer.id,
                action="Live AI Recommendation",
                input_data=json.dumps({
                    "cart_value": customer.cart_value,
                    "time_spent": customer.time_spent,
                    "coupon_used": customer.coupon_used,
                }),
                ai_decision=json.dumps(result),
                approved=False,
            ))

            db.commit()

            await manager.broadcast({
                "type": "new_customer",
                "customer": {
                    "id": customer.customer_id,
                    "name": customer.name,
                    "cart_value": customer.cart_value,
                    "status": customer.status,
                },
                "analysis": result,
            })

        except Exception as e:
            print("Live Engine Error:", e)
            db.rollback()

        finally:
            db.close()

        await asyncio.sleep(20)

# -----------------------------------
# Startup
# -----------------------------------

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(live_engine())

# -----------------------------------
# Home
# -----------------------------------

@app.get("/")
def home():
    return {
        "status": "GrowthFlow AI running",
        "version": "2.0.0"
    }

# -----------------------------------
# Dashboard
# -----------------------------------

@app.get("/dashboard")
def dashboard():
    return get_dashboard()

# -----------------------------------
# Revenue Analytics
# -----------------------------------

@app.get("/analytics/revenue")
def revenue_trend():
    return get_revenue_trend()

# -----------------------------------
# Customers
# -----------------------------------

@app.get("/customers")
def customers():
    return get_customers()

# -----------------------------------
# Product Catalog Search
# -----------------------------------

@app.get("/products/search")
def product_search(
    query: str | None = None,
    category: str | None = None,
    max_price: float | None = None,
):
    return search_products(query, category, max_price)

# -----------------------------------
# Checkout Creation
# -----------------------------------

@app.post("/checkout/create")
def checkout(data: dict):

    product = data.get("product")

    if not product:
        return {"error": "Product required"}

    result = create_checkout(
        product_name=product,
        customer_name=data.get("customer", "Guest")
    )

    if result is None:
        return {"error": "Product not found"}

    return result

# -----------------------------------
# AI Buyer Checkout
# -----------------------------------

@app.post("/agent/checkout")
def ai_checkout(data: dict):

    return agent_checkout(
        query=data.get("query"),
        category=data.get("category"),
        max_price=data.get("max_price"),
        customer=data.get("customer", "Guest"),
    )

# -----------------------------------
# Analyze Customer
# -----------------------------------

@app.post("/analyze")
def analyze(data: dict):

    db = SessionLocal()

    try:
        result = orchestrate(data)

        result["rule_based_offer"] = decide_offer(
            data["cart_value"],
            data["time_spent"],
            data["coupon_used"],
        )

        customer = (
            db.query(Customer)
            .filter(
                Customer.cart_value == data["cart_value"],
                Customer.time_spent == data["time_spent"],
            )
            .first()
        )

        if customer:

            db.add(Prediction(
                customer_id=customer.id,
                intent=result["intent"]["intent"],
                confidence=result["intent"]["confidence"],
                recovery_probability=result["recovery"]["probability"],
                priority=result["recovery"]["priority"],
                offer=result["offer"]["offer"],
            ))

            db.add(RecoveryMessage(
                customer_id=customer.id,
                message=result["message"]["message"],
                channel="WhatsApp",
                sent=False,
            ))

            db.add(AuditLog(
                customer_id=customer.id,
                action="Merchant Analysis",
                input_data=json.dumps(data),
                ai_decision=json.dumps(result),
                approved=False,
            ))

            db.commit()

        return result

    except Exception as e:
        db.rollback()
        return {"error": str(e)}

    finally:
        db.close()

# -----------------------------------
# Merchant Copilot
# -----------------------------------

@app.post("/copilot")
def copilot(data: dict):

    question = data.get("question", "").strip()

    if not question:
        return {
            "answer": (
                "Ask me about customers, abandoned carts, products, "
                "campaigns, recovery strategies, or revenue."
            )
        }

    return ask_copilot(question)

# -----------------------------------
# Campaign Orchestrator (Phase 4)
# -----------------------------------

@app.post("/campaign/create")
def campaign(data: dict):

    return create_campaign(
        name=data.get("name", "AI Recovery Campaign"),
        channel=data.get("channel", "WhatsApp"),
    )

# -----------------------------------
# Audit History
# -----------------------------------

@app.get("/audit")
def audit_history():

    db = SessionLocal()

    try:
        logs = (
            db.query(AuditLog)
            .order_by(AuditLog.created_at.desc())
            .all()
        )

        return [
            {
                "id": log.id,
                "customer_id": log.customer_id,
                "action": log.action,
                "approved": log.approved,
                "created_at": log.created_at,
            }
            for log in logs
        ]

    finally:
        db.close()

# -----------------------------------
# Approve AI Recommendation
# -----------------------------------

@app.post("/approve/{audit_id}")
def approve_action(audit_id: int):

    db = SessionLocal()

    try:
        audit = (
            db.query(AuditLog)
            .filter(AuditLog.id == audit_id)
            .first()
        )

        if audit is None:
            return {"error": "Audit log not found"}

        audit.approved = True

        db.commit()
        db.refresh(audit)

        return {
            "status": "approved",
            "audit_id": audit.id,
            "approved": audit.approved,
        }

    finally:
        db.close()

        # -----------------------------------
# AI Upsell & Cross-Sell Agent
# -----------------------------------

@app.post("/upsell")
def upsell(data: dict):

    product = data.get("product")

    if not product:
        return {"error": "Product required"}

    return recommend_addons(product)

# -----------------------------------
# Bundle Checkout
# -----------------------------------

@app.post("/bundle/checkout")
def bundle_checkout(data: dict):

    product = data.get("product")
    customer = data.get("customer", "Guest")

    if not product:
        return {"error": "Product required"}

    return create_bundle_checkout(product, customer)

@app.post("/razorpay/order")
def razorpay_order(data: dict):

    amount = data.get("amount")
    customer = data.get("customer", "Guest")

    if not amount:
        raise HTTPException(status_code=400, detail="Amount required")

    order = create_order(
        amount=amount,
        receipt=f"growthflow_{customer}"
    )

    return {
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"],
        "key": os.getenv("RAZORPAY_KEY_ID")
    }


@app.post("/razorpay/verify")
def razorpay_verify(data: dict):

    try:
        verify_signature(
            data["razorpay_order_id"],
            data["razorpay_payment_id"],
            data["razorpay_signature"]
        )

        return {
            "status": "success"
        }

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid payment signature"
        )

# -----------------------------------
# Dashboard WebSocket
# -----------------------------------

@app.websocket("/ws/dashboard")
async def websocket_dashboard(websocket: WebSocket):

    await manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect(websocket)