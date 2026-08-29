import random
import pandas as pd

from database import SessionLocal
from models import Customer

db = SessionLocal()

# Clear existing records (optional)
db.query(Customer).delete()
db.commit()

df = pd.read_csv("../data/sample_customers.csv")

products = [
    "Nike Air Max",
    "Sony Headphones",
    "Gaming Keyboard",
    "Apple Watch",
    "Samsung TV",
    "iPhone Case",
    "Bluetooth Speaker",
]

devices = ["iPhone", "Android", "Laptop", "MacBook"]
payments = ["UPI", "Credit Card", "Net Banking", "Wallet"]

for _, row in df.iterrows():
    customer = Customer(
        customer_id=row["CustomerID"],          # <-- FIX
        name=f"Customer {row['CustomerID']}",
        email=f"{row['CustomerID'].lower()}@growthflow.demo",  # <-- FIX
        product=random.choice(products),
        cart_value=int(row["CartValue"]),
        time_spent=int(row["TimeSpent"]),
        coupon_used=str(row["CouponUsed"]).lower() == "true",
        device=random.choice(devices),
        payment=random.choice(payments),
        status=row["Status"],
    )

    db.add(customer)

db.commit()
db.close()

print(f"Successfully imported {len(df)} customers into MySQL.")