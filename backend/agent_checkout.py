from product_service import search_products
from checkout_service import create_checkout

def agent_checkout(query: str, category=None, max_price=None, customer="Guest"):
    products = search_products(query=query, category=category, max_price=max_price)

    if not products:
        return {
            "success": False,
            "message": "No matching products found."
        }

    product = products[0]

    checkout = create_checkout(
        product_name=product["name"],
        customer_name=customer
    )

    return {
        "success": True,
        "product": product,
        "checkout": checkout
    }