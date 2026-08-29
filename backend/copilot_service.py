from ai import ai_chat
from campaign_service import create_campaign
from upsell_service import recommend_addons
from bundle_service import create_bundle_checkout


def ask_copilot(question: str):
    """
    Merchant Copilot that can execute business actions.
    """

    q = question.lower()

    # ----------------------------
    # Campaign Creation
    # ----------------------------
    if "campaign" in q or "whatsapp campaign" in q:
        campaign = create_campaign(
            name="AI Recovery Campaign",
            channel="WhatsApp"
        )

        return {
            "type": "campaign",
            "title": "Campaign Created",
            "data": campaign
        }

    # ----------------------------
    # Bundle Recommendation
    # ----------------------------
    if "bundle" in q or "upsell" in q:

        if "lg" in q:
            product = "LG OLED TV"
        elif "redmi" in q:
            product = "Redmi 4K Smart TV"
        else:
            product = "Samsung Smart TV"

        bundle = recommend_addons(product)

        return {
            "type": "bundle",
            "title": "Bundle Recommendation",
            "data": bundle
        }

    # ----------------------------
    # Checkout Creation
    # ----------------------------
    if "checkout" in q or "payment link" in q:

        if "lg" in q:
            product = "LG OLED TV"
        elif "redmi" in q:
            product = "Redmi 4K Smart TV"
        else:
            product = "Samsung Smart TV"

        checkout = create_bundle_checkout(
            product_name=product,
            customer="Merchant Demo"
        )

        return {
            "type": "checkout",
            "title": "Checkout Ready",
            "data": checkout
        }

    # ----------------------------
    # General AI Assistant
    # ----------------------------
    answer = ai_chat(
        f"""
You are GrowthFlow AI Merchant Copilot.

Merchant Question:
{question}

Answer briefly in under 80 words.
"""
    )

    return {
        "type": "chat",
        "title": "Merchant Copilot",
        "answer": answer
    }