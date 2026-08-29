import os
import json
import re
from dotenv import load_dotenv
from groq import Groq
from groq.types.chat import ChatCompletionMessageParam

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-20b"

SYSTEM_PROMPT = """
You are Merchant Copilot for GrowthFlow.

You help e-commerce merchants increase conversions.

Always respond ONLY with valid JSON.

Required JSON format:

{
  "intent": {
    "intent": "",
    "confidence": 0,
    "reasoning": []
  },
  "offer": {
    "offer": "",
    "why": ""
  },
  "recovery": {
    "probability": 0,
    "priority": ""
  },
  "message": {
    "message": ""
  }
}

Rules:
- No markdown.
- No code blocks.
- Keep reasoning concise.
- Customer message should sound natural and friendly.
"""

# ------------------------------
# Shared Conversation Memory
# ------------------------------

chat_history: list[ChatCompletionMessageParam] = []

# ------------------------------
# Helpers
# ------------------------------


def clean_json(text: str):
    """Extract valid JSON from AI response."""
    text = (text or "").strip()
    text = text.replace("```json", "").replace("```", "").strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        text = match.group(0)

    return json.loads(text)


def ai_chat(
    prompt: str,
    system_message: str = "You are Merchant Copilot for GrowthFlow."
) -> str:
    """Reusable Groq wrapper."""

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.7,
        max_tokens=900,
        messages=[
            {
                "role": "system",
                "content": system_message,
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )

    return (response.choices[0].message.content or "").strip()


# ------------------------------
# Customer Analysis
# ------------------------------


def analyze_customer(data):
    prompt = f"""
{SYSTEM_PROMPT}

Customer Data

Cart Value: ₹{data['cart_value']}
Time Spent: {data['time_spent']} seconds
Coupon Used: {data['coupon_used']}
"""

    try:
        return clean_json(ai_chat(prompt))

    except Exception as e:
        print("AI unavailable:", e)

        cart = data["cart_value"]
        time_spent = data["time_spent"]
        coupon = data["coupon_used"]

        if cart >= 4000 and not coupon:
            discount = int(cart * 0.10)

            return {
                "intent": {
                    "intent": "High Purchase Intent",
                    "confidence": 92,
                    "reasoning": [
                        f"Spent {time_spent // 60} minutes evaluating products.",
                        f"₹{cart:,} cart indicates strong buying intent.",
                        "No coupon suggests price hesitation."
                    ]
                },
                "offer": {
                    "offer": "10% Discount",
                    "why": "A limited-time discount removes hesitation while keeping recovery costs low."
                },
                "recovery": {
                    "probability": 88,
                    "priority": "High"
                },
                "message": {
                    "message": (
                        f"Hey there! 👋 Your ₹{cart:,} order is still waiting. "
                        f"Save ₹{discount:,} today with code SAVE10 and complete your purchase."
                    )
                }
            }

        elif time_spent >= 500:
            return {
                "intent": {
                    "intent": "High Purchase Intent",
                    "confidence": 87,
                    "reasoning": [
                        "Long browsing session indicates strong interest.",
                        "Customer reached late-stage evaluation.",
                        "Removing delivery friction may improve conversion."
                    ]
                },
                "offer": {
                    "offer": "Free Shipping",
                    "why": "Free shipping often converts engaged shoppers without reducing product margins."
                },
                "recovery": {
                    "probability": 82,
                    "priority": "Medium"
                },
                "message": {
                    "message": "You're almost there! 🚚 We've saved your cart—complete your purchase today and enjoy free shipping."
                }
            }

        else:
            return {
                "intent": {
                    "intent": "Browsing",
                    "confidence": 74,
                    "reasoning": [
                        "Browsing behaviour without strong checkout signals.",
                        "A reminder is more effective than immediate discounts."
                    ]
                },
                "offer": {
                    "offer": "Cart Reminder",
                    "why": "A gentle reminder preserves margins while encouraging the customer to return."
                },
                "recovery": {
                    "probability": 63,
                    "priority": "Low"
                },
                "message": {
                    "message": "Your cart is waiting for you. Come back anytime—we'll keep everything ready."
                }
            }


# ------------------------------
# Merchant Copilot
# ------------------------------


def merchant_copilot(question):
    global chat_history

    chat_history.append(
        {
            "role": "user",
            "content": question,
        }
    )

    chat_history = chat_history[-8:]

    dashboard_context = """
Current GrowthFlow Dashboard:

Revenue Today: ₹3.24L
Conversion Rate: 5.85%
Abandoned Carts: 145
Recovery Rate: 38%

Behave like an experienced commerce consultant.
Answer naturally like ChatGPT.
Use previous conversation whenever relevant.
"""

    messages: list[ChatCompletionMessageParam] = [
        {
            "role": "system",
            "content": dashboard_context,
        }
    ]

    messages.extend(chat_history)

    try:
        response = client.chat.completions.create(
            model=MODEL,
            temperature=0.8,
            max_tokens=700,
            messages=messages,
        )

        answer = (response.choices[0].message.content or "").strip()

        chat_history.append(
            {
                "role": "assistant",
                "content": answer,
            }
        )

        chat_history = chat_history[-8:]

        return {"answer": answer}

    except Exception as e:
        print("Copilot Error:", e)

        return {
            "answer": "I'm unable to contact the AI service right now. Please check your Groq API key or internet connection."
        }