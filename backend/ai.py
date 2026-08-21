import os
import json
import re
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_customer(data):
    prompt = f"""
You are GrowthFlow AI.

Analyze this customer's shopping behavior.

Cart Value: ₹{data['cart_value']}
Time Spent: {data['time_spent']} seconds
Coupon Used: {data['coupon_used']}

Return ONLY valid JSON.
"""

    try:
        response = client.models.generate_content(
            model="models/gemini-3.6-flash",
            contents=prompt,
        )

        text = (response.text or "").strip()
        text = text.replace("```json", "").replace("```", "").strip()

        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            text = match.group(0)

        return json.loads(text)

    except Exception as e:
        print("Gemini unavailable:", e)

        # Intelligent fallback
        cart = data["cart_value"]
        time = data["time_spent"]
        coupon = data["coupon_used"]

        if cart > 4000 and not coupon:
            return {
                "intent": "Price Sensitive",
                "action": "Offer 10% Discount Coupon",
                "message": f"We noticed you're interested! Complete your ₹{cart} order now and save 10% with SAVE10.",
                "confidence": 92
            }

        elif time > 500:
            return {
                "intent": "High Purchase Intent",
                "action": "Offer Free Shipping",
                "message": "You're almost there! Enjoy free shipping if you checkout today.",
                "confidence": 88
            }

        else:
            return {
                "intent": "Browsing",
                "action": "Send Reminder",
                "message": "Your cart is waiting. Come back anytime to finish your purchase.",
                "confidence": 76
            }