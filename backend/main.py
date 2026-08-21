from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ai import analyze_customer, client
from rules import decide_offer
from data_service import get_customers

app = FastAPI(title="GrowthFlow AI")

# CORS
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

# Home
@app.get("/")
def home():
    return {"status": "GrowthFlow AI running"}

# Customer list
@app.get("/customers")
def customers():
    return get_customers()

# AI Analysis
@app.post("/analyze")
def analyze(data: dict):

    offer = decide_offer(
        data["cart_value"],
        data["time_spent"],
        data["coupon_used"],
    )

    ai_result = analyze_customer(data)

    return {
        "recommended_offer": offer,
        "ai_analysis": ai_result,
    }

# Merchant Copilot
@app.post("/copilot")
def copilot(data: dict):
    question = data["question"]

    prompt = (
        "You are GrowthFlow AI, an AI commerce assistant.\n\n"
        "Current dashboard snapshot:\n"
        "- Revenue Today: ₹3.2L\n"
        "- Conversion Rate: 5.8%\n"
        "- Abandoned Carts: 143\n"
        "- AI Recovery Rate: 37%\n\n"
        f"Merchant Question:\n{question}\n\n"
        "Answer like a Razorpay AI assistant in under 80 words."
    )

    try:
        response = client.models.generate_content(
            model="models/gemini-3.6-flash",
            contents=prompt,
        )

        return {"answer": response.text}

    except Exception as e:
        print("Copilot fallback:", e)

        q = question.lower()

        if "abandon" in q:
            answer = (
                "Today's cart abandonment is mainly driven by price sensitivity "
                "and checkout friction. Offer free shipping or a 10% coupon to "
                "high-value carts for the biggest recovery impact."
            )

        elif "free shipping" in q:
            answer = (
                "Offer free shipping for carts above ₹2,000. It typically reduces "
                "checkout friction while protecting margins."
            )

        elif "target" in q or "customer" in q:
            answer = (
                "Prioritize high-value customers who spent over 8 minutes browsing "
                "without using a coupon. They have the highest recovery potential."
            )

        else:
            answer = (
                "Based on your dashboard, focus on recovering high-value abandoned "
                "carts first and personalize offers using AI recommendations."
            )

        return {"answer": answer}

    return {
        "answer": response.text
    }