from ai import ai_chat
from product_service import PRODUCTS


def recommend_addons(product_name: str):
    """
    Recommend AI-powered upsell and cross-sell products.
    """

    # Product → Add-on mapping
    mapping = {
        "Samsung Smart TV": [
            "HDMI Cable",
            "Wall Mount",
            "Extended Warranty",
        ],
        "LG OLED TV": [
            "Soundbar",
            "HDMI Cable",
            "Extended Warranty",
        ],
        "Redmi 4K Smart TV": [
            "HDMI Cable",
            "Wall Mount",
        ],
    }

    # Find the purchased product
    base_product = next(
        (p for p in PRODUCTS if p["name"] == product_name),
        None
    )

    if not base_product:
        return {
            "error": "Product not found."
        }

    addon_names = mapping.get(product_name, [])

    addons = [
        p for p in PRODUCTS
        if p["name"] in addon_names
    ]

    additional_value = sum(item["price"] for item in addons)
    grand_total = base_product["price"] + additional_value

    # AI explanation
    try:
        reason = ai_chat(
            f"""
Customer selected "{product_name}".

Recommended add-ons:
{", ".join(addon_names)}

Explain in under 35 words why these products improve the purchase.
No markdown.
"""
        )
    except Exception:
        reason = (
            "These accessories improve setup, viewing experience, "
            "and long-term protection while increasing customer value."
        )

    return {
        "product": base_product,
        "recommended": addons,
        "additional_value": additional_value,
        "grand_total": grand_total,
        "reason": reason,
    }