import json
from ai import ai_chat

SYSTEM_PROMPT = """
You are GrowthFlow AI, an enterprise ecommerce recovery system.

Simulate four AI agents:
1. Intent Agent
2. Offer Agent
3. Message Agent
4. Recovery Agent

Return ONLY valid JSON.
Never use markdown.
"""


# ---------------------------------------
# Safe JSON Extraction
# ---------------------------------------
def clean_json(text: str):
    """Extract valid JSON even if the model adds extra text."""

    text = (text or "").strip()

    text = text.replace("```json", "").replace("```", "").strip()

    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1:
        raise ValueError("No JSON found in AI response.")

    text = text[start:end + 1]

    return json.loads(text)


# ---------------------------------------
# GrowthFlow Orchestrator
# ---------------------------------------
def orchestrate(customer):
    """
    Runs four virtual AI agents in one LLM call.

    Returns:
    {
      intent,
      offer,
      message,
      recovery
    }
    """

    prompt = f"""
{SYSTEM_PROMPT}

Customer Session

Cart Value: ₹{customer["cart_value"]}
Time Spent: {customer["time_spent"]} seconds
Coupon Used: {customer["coupon_used"]}

Agent 1 – Intent Agent
- Determine purchase intent.
- Confidence (0-100).
- Exactly three reasoning points.

Agent 2 – Offer Agent
Choose ONLY one:
- Free Shipping
- 5% Discount
- 10% Discount
- Cashback
- Reminder Only

Explain why.

Agent 3 – Message Agent
Write a WhatsApp recovery message.
- Friendly
- Personalized
- Under 45 words
- No markdown

Agent 4 – Recovery Agent
Predict:
- recovery probability (0-100)
- priority (Low, Medium, High)

Return ONLY this JSON:

{{
  "intent": {{
    "intent": "",
    "confidence": 0,
    "reasoning": ["", "", ""]
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
        response_text = ai_chat(
            prompt,
            system_message=SYSTEM_PROMPT
        )

        result = clean_json(response_text)

        # Basic validation
        required = ["intent", "offer", "message", "recovery"]
        for key in required:
            if key not in result:
                raise ValueError(f"Missing '{key}' in AI response.")

        return result

    except Exception as e:
        print("Orchestrator Error:", e)

        # ---------------------------------------
        # Intelligent Fallback
        # ---------------------------------------

        cart = customer["cart_value"]
        time_spent = customer["time_spent"]
        coupon = customer["coupon_used"]

        # High-value customer
        if cart >= 4000 and time_spent >= 600 and not coupon:

            discount = int(cart * 0.10)

            return {
                "intent": {
                    "intent": "High Purchase Intent",
                    "confidence": 92,
                    "reasoning": [
                        "Customer spent over 10 minutes reviewing products.",
                        "High cart value suggests strong buying intent.",
                        "No coupon indicates price hesitation."
                    ]
                },
                "offer": {
                    "offer": "10% Discount",
                    "why": "A limited-time discount provides the strongest conversion trigger for premium carts."
                },
                "message": {
                    "message": (
                        f"Hey! Your ₹{cart:,} cart is waiting. "
                        f"Use SAVE10 and save ₹{discount:,} before the offer expires."
                    )
                },
                "recovery": {
                    "probability": 88,
                    "priority": "High"
                }
            }

        # Engaged customer
        elif time_spent >= 500:

            return {
                "intent": {
                    "intent": "Engaged Shopper",
                    "confidence": 84,
                    "reasoning": [
                        "Customer spent significant time browsing.",
                        "Late-stage shopping behaviour detected.",
                        "Removing shipping friction may improve conversion."
                    ]
                },
                "offer": {
                    "offer": "Free Shipping",
                    "why": "Free shipping often converts hesitant customers without reducing product margins."
                },
                "message": {
                    "message": (
                        "You're almost there! Complete your order today and enjoy free shipping."
                    )
                },
                "recovery": {
                    "probability": 80,
                    "priority": "Medium"
                }
            }

        # Casual browser
        else:

            return {
                "intent": {
                    "intent": "Browsing",
                    "confidence": 72,
                    "reasoning": [
                        "Browsing session was relatively short.",
                        "Customer is still exploring options.",
                        "A reminder is more effective than an immediate discount."
                    ]
                },
                "offer": {
                    "offer": "Reminder Only",
                    "why": "A gentle reminder preserves margins while encouraging the customer to return."
                },
                "message": {
                    "message": (
                        "Your cart is waiting whenever you're ready. We'd love to have you back."
                    )
                },
                "recovery": {
                    "probability": 65,
                    "priority": "Low"
                }
            }