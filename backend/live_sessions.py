import asyncio
import random
import uuid

from database import SessionLocal
from models import Customer


PRODUCTS = [
    "Nike Air Max",
    "Apple Watch",
    "Samsung Smart TV",
    "MacBook Air",
    "Sony Headphones",
]

DEVICES = ["iPhone 15", "Android", "Windows Laptop", "MacBook"]
PAYMENTS = ["UPI", "Card", "Net Banking"]


async def live_customer_generator():
    while True:
        db = SessionLocal()

        try:
            customer = Customer(
                customer_id=f"LIVE-{uuid.uuid4().hex[:8].upper()}",
                name=f"Live Customer {random.randint(1,999)}",
                email=f"live{random.randint(1000,9999)}@demo.com",
                product=random.choice(PRODUCTS),
                cart_value=random.randint(1200, 8000),
                device=random.choice(DEVICES),
                payment=random.choice(PAYMENTS),
                coupon_used=random.choice([0, 1]),
                time_spent=random.randint(120, 900),
                status=random.choice(["Abandoned", "Recovered"]),
            )

            db.add(customer)
            db.commit()

        except Exception as e:
            db.rollback()
            print("Live Engine Error:", e)

        finally:
            db.close()

        await asyncio.sleep(5)