from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ai import analyze_customer
from rules import decide_offer

app = FastAPI(title="GrowthFlow AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "GrowthFlow AI running"}

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