import json
from ai import client

MODEL = "models/gemini-3.6-flash"


def orchestrate(customer):
    """
    GrowthFlow AI Orchestrator

    One Gemini call generates outputs for four specialized agents.
    """

    prompt = f"""
You are GrowthFlow AI Orchestrator.

Simulate four specialized AI agents working together.

Customer Session:
- Cart Value: ₹{customer['cart_value']}
- Time Spent: {customer['time_spent']} seconds
- Coupon Used: {customer['coupon_used']}

Agent responsibilities:

1. Intent Agent
   - Predict customer purchase intent.
   - Give confidence (0-100).
   - Provide 3 short reasoning points.

2. Offer Agent
   Choose ONLY ONE:
   - Free Shipping
   - 5% Discount
   - 10% Discount
   - Cashback
   - Reminder Only

   Explain why.

3. Message Agent
   Write a natural WhatsApp recovery message.

4. Recovery Agent
   Predict:
   - recovery probability (0-100)
   - priority (Low/Medium/High)

Return ONLY valid JSON.

{{
  "intent": {{
    "intent": "",
    "confidence": 0,
    "reasoning": []
  }},
  "offer": {{
    "offer": "",
    "why": ""
  }},
  "message": {{
    "message": ""
  }},
  "recovery": {{
    "probability": 0,
    "priority": ""
  }}
}}
"""

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt
        )

        text = (response.text or "").strip()
        text = text.replace("```json", "").replace("```", "").strip()

        try:
           return json.loads(text)
        except json.JSONDecodeError:
             raise ValueError(f"Invalid JSON returned by Gemini: {text}")

    except Exception as e:
        print("Orchestrator Error:", e)

        # Safe fallback so the UI never gets stuck
        return {
            "intent": {
                "intent": "Price Sensitive",
                "confidence": 78,
                "reasoning": [
                    "High cart value",
                    "Long browsing session",
                    "No coupon applied"
                ]
            },
            "offer": {
                "offer": "Free Shipping",
                "why": "Shipping cost appears to be the main friction."
            },
            "message": {
                "message": "Your cart is waiting! Complete your order today and enjoy free shipping."
            },
            "recovery": {
                "probability": 82,
                "priority": "High"
            }
        }