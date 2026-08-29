import random
import asyncio

from database import SessionLocal
from models import Customer

products = [
    "Nike Air Max",
    "Sony Headphones",
    "Gaming Keyboard",
    "Apple Watch",
    "Samsung TV",
]

devices = [
    "iPhone",
    "Android",
    "Laptop",
    "MacBook",
]

payments = [
    "UPI",
    "Credit Card",
    "Wallet",
]


async def create_live_customer():

    db = SessionLocal()

    try:

        customer = Customer(
            customer_id=f"LIVE{random.randint(1000,9999)}",
            name=f"Live Customer {random.randint(1,999)}",
            email=f"live{random.randint(1,9999)}@demo.com",
            product=random.choice(products),
            cart_value=random.randint(500,7000),
            device=random.choice(devices),
            payment=random.choice(payments),
            coupon_used=random.choice([True, False]),
            time_spent=random.randint(120,1200),
            status="Abandoned",
        )

        db.add(customer)
        db.commit()
        db.refresh(customer)

        return customer

    finally:
        db.close()