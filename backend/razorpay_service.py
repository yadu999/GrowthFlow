import os
import razorpay
from dotenv import load_dotenv

load_dotenv()

KEY_ID = os.getenv("RAZORPAY_KEY_ID")
KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

if not KEY_ID or not KEY_SECRET:
    raise ValueError(
        "RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in .env"
    )

client = razorpay.Client(auth=(KEY_ID, KEY_SECRET))


def create_order(amount, receipt):
    try:
        order = client.order.create({  # type: ignore[attr-defined]
            "amount": int(float(amount) * 100),   # Rupees → Paise
            "currency": "INR",
            "receipt": receipt
        })
        return order

    except Exception as e:
        print("Razorpay Create Order Error:", e)
        raise


def verify_signature(order_id, payment_id, signature):
    try:
        client.utility.verify_payment_signature({  # type: ignore[attr-defined]
            "razorpay_order_id": order_id,
            "razorpay_payment_id": payment_id,
            "razorpay_signature": signature
        })
        return True

    except Exception as e:
        print("Signature Verification Error:", e)
        raise