# -----------------------------------
# GrowthFlow AI - Product Catalog
# Phase 5 - Step 5.1
# -----------------------------------

PRODUCTS = [
    {
        "sku": "TV001",
        "name": "Samsung Smart TV",
        "category": "TV",
        "price": 44999,
        "stock": 25,
        "rating": 4.7,
        "description": "55-inch 4K UHD Smart TV with HDR."
    },
    {
        "sku": "TV002",
        "name": "LG OLED TV",
        "category": "TV",
        "price": 48999,
        "stock": 18,
        "rating": 4.9,
        "description": "55-inch OLED Smart TV with Dolby Vision."
    },
    {
        "sku": "TV003",
        "name": "Redmi 4K Smart TV",
        "category": "TV",
        "price": 31999,
        "stock": 32,
        "rating": 4.5,
        "description": "43-inch 4K Smart TV with Android TV."
    },
    {
        "sku": "ACC001",
        "name": "HDMI Cable",
        "category": "Accessory",
        "price": 799,
        "stock": 120,
        "rating": 4.6,
        "description": "High-speed HDMI 2.1 cable."
    },
    {
        "sku": "ACC002",
        "name": "Wall Mount",
        "category": "Accessory",
        "price": 1499,
        "stock": 60,
        "rating": 4.5,
        "description": "Universal wall mount for 32–65 inch TVs."
    },
    {
        "sku": "SRV001",
        "name": "Extended Warranty",
        "category": "Service",
        "price": 2499,
        "stock": 999,
        "rating": 4.8,
        "description": "Two-year extended protection plan."
    },
    {
        "sku": "AUD001",
        "name": "Soundbar",
        "category": "Audio",
        "price": 6999,
        "stock": 40,
        "rating": 4.7,
        "description": "Bluetooth soundbar with deep bass."
    }
]


# -----------------------------------
# Search Product Catalog
# -----------------------------------

def search_products(query=None, category=None, max_price=None):
    """
    Search the AI-readable product catalog.

    Supports:
    - query (name/description/category)
    - category filter
    - maximum price filter
    """

    results = PRODUCTS.copy()

    # Search by keyword
    if query:
        query = query.lower()

        results = [
            product
            for product in results
            if query in product["name"].lower()
            or query in product["description"].lower()
            or query in product["category"].lower()
        ]

    # Filter by category
    if category:
        category = category.lower()

        results = [
            product
            for product in results
            if product["category"].lower() == category
        ]

    # Filter by maximum price
    if max_price is not None:
        results = [
            product
            for product in results
            if product["price"] <= max_price
        ]

    return results