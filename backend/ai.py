import os
import json
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

Return ONLY valid JSON in this format:

{{
  "intent":"Price Sensitive",
  "action":"Offer Free Shipping",
  "message":"Hey! Your cart is waiting.",
  "confidence":91
}}
"""

    response = client.models.generate_content(
        model="models/gemini-3.6-flash",
        contents=prompt,
    )

    text = response.text.strip()
    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)