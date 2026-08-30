import random
import pandas as pd

from database import SessionLocal
from models import Customer, Product

db = SessionLocal()

# ----------------------------------------
# Clear Existing Data
# ----------------------------------------

db.query(Customer).delete()
db.query(Product).delete()
db.commit()

# ----------------------------------------
# Seed Products
# ----------------------------------------

products = [
    # TVs
    {
        "sku": "TV001",
        "name": "Samsung Smart TV",
        "category": "TV",
        "price": 44999,
        "stock": 15,
        "rating": 4.7,
        "description": "55-inch 4K UHD Smart TV."
    },
    {
        "sku": "TV002",
        "name": "LG OLED TV",
        "category": "TV",
        "price": 69999,
        "stock": 8,
        "rating": 4.8,
        "description": "Premium OLED television."
    },

    # TV Accessories
    {
        "sku": "TV101",
        "name": "Samsung Soundbar",
        "category": "TV",
        "price": 3999,
        "stock": 35,
        "rating": 4.6,
        "description": "Dolby Audio Soundbar."
    },
    {
        "sku": "TV102",
        "name": "Wall Mount Kit",
        "category": "TV",
        "price": 799,
        "stock": 60,
        "rating": 4.5,
        "description": "Universal TV Wall Mount."
    },
    {
        "sku": "TV103",
        "name": "Premium HDMI Cable",
        "category": "TV",
        "price": 499,
        "stock": 120,
        "rating": 4.7,
        "description": "High-speed HDMI 2.1 cable."
    },
    {
        "sku": "TV104",
        "name": "Fire TV Stick",
        "category": "TV",
        "price": 2999,
        "stock": 45,
        "rating": 4.8,
        "description": "Streaming media player."
    },

    # Audio
    {
        "sku": "AUD001",
        "name": "Sony WH-1000XM5",
        "category": "Audio",
        "price": 24999,
        "stock": 18,
        "rating": 4.9,
        "description": "Noise-cancelling headphones."
    },
    {
        "sku": "AUD002",
        "name": "JBL Flip 6",
        "category": "Audio",
        "price": 8999,
        "stock": 30,
        "rating": 4.7,
        "description": "Portable Bluetooth speaker."
    },

    # Gaming
    {
        "sku": "GAME001",
        "name": "Mechanical Keyboard",
        "category": "Gaming",
        "price": 3999,
        "stock": 40,
        "rating": 4.5,
        "description": "RGB mechanical keyboard."
    },
    {
        "sku": "GAME002",
        "name": "Gaming Mouse",
        "category": "Gaming",
        "price": 1999,
        "stock": 55,
        "rating": 4.4,
        "description": "High DPI gaming mouse."
    },
    {
        "sku": "GAME003",
        "name": "Extended Mouse Pad",
        "category": "Gaming",
        "price": 799,
        "stock": 70,
        "rating": 4.6,
        "description": "Large gaming desk mat."
    },

    # Wearables
    {
        "sku": "WR001",
        "name": "Apple Watch Series 9",
        "category": "Wearables",
        "price": 39999,
        "stock": 12,
        "rating": 4.8,
        "description": "Advanced smartwatch."
    },
    {
        "sku": "WR002",
        "name": "Watch Strap",
        "category": "Wearables",
        "price": 999,
        "stock": 90,
        "rating": 4.4,
        "description": "Silicone replacement strap."
    },

    # Mobile
    {
        "sku": "MB001",
        "name": "iPhone Case",
        "category": "Mobile",
        "price": 999,
        "stock": 80,
        "rating": 4.3,
        "description": "Shockproof phone case."
    },
    {
        "sku": "MB002",
        "name": "Wireless Charger",
        "category": "Mobile",
        "price": 1999,
        "stock": 60,
        "rating": 4.5,
        "description": "15W wireless charger."
    },
    {
        "sku": "MB003",
        "name": "USB-C Fast Charger",
        "category": "Mobile",
        "price": 1499,
        "stock": 75,
        "rating": 4.6,
        "description": "30W fast charging adapter."
    },
    {
        "sku": "MB004",
        "name": "Power Bank 20000mAh",
        "category": "Mobile",
        "price": 2499,
        "stock": 45,
        "rating": 4.7,
        "description": "High-capacity power bank."
    },

    # Extra Accessories
    {
        "sku": "ACC001",
        "name": "Smart Plug",
        "category": "Accessories",
        "price": 899,
        "stock": 65,
        "rating": 4.4,
        "description": "WiFi smart plug."
    },
    {
        "sku": "ACC002",
        "name": "Cable Organizer",
        "category": "Accessories",
        "price": 299,
        "stock": 100,
        "rating": 4.2,
        "description": "Desk cable management kit."
    },
]

for p in products:
    db.add(Product(**p))

db.commit()

# ----------------------------------------
# Seed Customers
# ----------------------------------------

df = pd.read_csv("../data/sample_customers.csv")

customer_products = [
    "Nike Air Max",
    "Sony WH-1000XM5",
    "Mechanical Keyboard",
    "Apple Watch Series 9",
    "Samsung Smart TV",
    "iPhone Case",
    "JBL Flip 6",
]

devices = ["iPhone", "Android", "Laptop", "MacBook"]
payments = ["UPI", "Credit Card", "Net Banking", "Wallet"]

for _, row in df.iterrows():
    customer = Customer(
        customer_id=row["CustomerID"],
        name=f"Customer {row['CustomerID']}",
        email=f"{row['CustomerID'].lower()}@growthflow.demo",
        product=random.choice(customer_products),
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
print(f"Successfully imported {len(products)} products into MySQL.")