from upsell_service import recommend_addons


def create_bundle_checkout(product_name: str, customer="Guest"):
    bundle = recommend_addons(product_name)

    if "error" in bundle:
        return bundle

    return {
        "customer": customer,
        "product": bundle["product"]["name"],
        "bundle_items": [
            item["name"] for item in bundle["recommended"]
        ],
        "base_amount": bundle["product"]["price"],
        "additional_amount": bundle["additional_value"],
        "total_amount": bundle["grand_total"],
        "currency": "INR",
        "checkout_status": "Bundle Ready",
        "payment_link": (
            f"https://growthflow.ai/demo-checkout?"
            f"customer={customer.replace(' ', '%20')}"
            f"&product={bundle['product']['name'].replace(' ', '%20')}"
        )
    }