from ai import ai_chat
from campaign_service import create_campaign
from upsell_service import recommend_addons
from bundle_service import create_bundle_checkout


def ask_copilot(question: str):
    """
    GrowthFlow AI Merchant Copilot
    Executes business actions and replies in natural language.
    """

    q = question.lower()

    # ------------------------------------
    # Campaign Creation
    # ------------------------------------
    if "campaign" in q or "whatsapp campaign" in q:
        campaign = create_campaign(
            name="AI Recovery Campaign",
            channel="WhatsApp",
        )

        return {
            "answer": f"""I've prepared a WhatsApp recovery campaign for you.

The campaign targets **{campaign['audience']} customers** who are most likely to complete their purchase if contacted now.

**Campaign:** {campaign['name']}
**Channel:** {campaign['channel']}

**Message Preview**

{campaign['message']}

Based on recent customer behaviour, this campaign is expected to recover approximately **{campaign['predicted_recovery']}%** of eligible abandoned carts.

The campaign is currently marked as **{campaign['status']}**, so you can review it before sending."""
        }

    # ------------------------------------
    # Bundle Recommendation
    # ------------------------------------
    if "bundle" in q or "upsell" in q:

        if "lg" in q:
            product = "LG OLED TV"
        elif "redmi" in q:
            product = "Redmi 4K Smart TV"
        else:
            product = "Samsung Smart TV"

        bundle = recommend_addons(product)

        if not bundle:
            return {
                "answer": "I couldn't generate a bundle for that product because it isn't available in the catalog yet."
            }

        recommendations = "\n".join(
            f"• {item['name']} (₹{int(item['price'])}) — {item['reason']}"
            for item in bundle["recommendations"]
        )

        return {
            "answer": f"""I've created a high-converting bundle for **{bundle['product']['name']}**.

I'd recommend adding:

{recommendations}

The original combined value is **₹{int(bundle['original_total'])}**.

After applying a **4% bundle discount**, the customer would pay **₹{int(bundle['grand_total'])}**.

This combination is designed to increase average order value while keeping the recommendations relevant to the customer's purchase."""
        }

    # ------------------------------------
    # Checkout Creation
    # ------------------------------------
    if "checkout" in q or "payment link" in q:

        if "lg" in q:
            product = "LG OLED TV"
        elif "redmi" in q:
            product = "Redmi 4K Smart TV"
        else:
            product = "Samsung Smart TV"

        checkout = create_bundle_checkout(
            product_name=product,
            customer="Merchant Demo",
        )

        return {
            "answer": f"""I've created a Razorpay checkout for **{product}**.

**Customer:** Merchant Demo
**Amount:** ₹{int(checkout['amount'])}

The checkout session has been generated successfully and is currently waiting for payment confirmation.

You can now open the payment page and complete the transaction securely through Razorpay."""
        }

    # ------------------------------------
    # General AI Assistant
    # ------------------------------------
    try:
        answer = ai_chat(
            f"""
You are GrowthFlow AI Merchant Copilot.

You help ecommerce merchants increase revenue, recover abandoned carts,
improve conversions and explain customer behaviour.

Merchant Question:
{question}

Reply naturally in a conversational tone.
Keep it concise (80–120 words).
Avoid bullet points unless they improve clarity.
"""
        )

        return {"answer": answer}

    except Exception:
        return {
            "answer": "I'm temporarily operating in offline mode because the AI service is busy. I can still help with recovery strategies, bundle suggestions, and checkout guidance."
        }