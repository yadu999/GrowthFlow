from ai import ai_chat
from campaign_service import create_campaign
from upsell_service import recommend_addons
from bundle_service import create_bundle_checkout


def ask_copilot(question: str):
    """
    GrowthFlow AI Merchant Copilot

    Executes merchant actions and always responds in
    natural conversational language.
    """

    q = question.lower()

    # --------------------------------------------------
    # Bundle Generation
    # --------------------------------------------------
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
                "answer": "I couldn't generate a bundle because that product isn't available in the current catalog."
            }

        items = "\n".join(
            f"• {item['name']} (₹{int(item['price'])}) — {item['reason']}"
            for item in bundle["recommendations"]
        )

        return {
            "answer": f"""I've created a high-converting bundle for **{bundle['product']['name']}**.

Based on similar purchase behaviour, I'd recommend adding:

{items}

**Bundle Summary**

• Original value: ₹{int(bundle['original_total'])}
• Bundle discount: ₹{int(bundle['discount'])}
• Final total: ₹{int(bundle['grand_total'])}

These products naturally complement the purchase and help increase average order value while improving the customer's overall buying experience."""
        }

    # --------------------------------------------------
    # Campaign Creation
    # --------------------------------------------------
    if "campaign" in q or "whatsapp" in q:

        campaign = create_campaign(
            name="AI Recovery Campaign",
            channel="WhatsApp",
        )

        return {
            "answer": f"""I've prepared a WhatsApp recovery campaign for your store.

The campaign targets **{campaign['audience']} customers** who abandoned their carts and are most likely to convert if contacted now.

**Campaign Details**

• Name: {campaign['name']}
• Channel: {campaign['channel']}
• Expected recovery: approximately **{campaign['predicted_recovery']}%**

**Message Preview**

"{campaign['message']}"

The campaign is currently marked as **{campaign['status']}**, so you can review it before sending."""
        }

    

    # --------------------------------------------------
    # Customer Behaviour
    # --------------------------------------------------
    if "abandon" in q or "cart" in q:

        return {
            "answer": """Today's abandoned carts appear to be concentrated around higher-value purchases, which usually indicates purchase hesitation rather than low intent.

The quickest recovery strategy would be to target these shoppers within the next 30 minutes using a personalized WhatsApp reminder and a small incentive such as free shipping or a limited-time discount. These customers typically have a much higher chance of returning than users who left immediately after browsing."""
        }

    # --------------------------------------------------
    # Revenue Suggestions
    # --------------------------------------------------
    if "revenue" in q or "increase sales" in q:

        return {
            "answer": """The fastest opportunities to increase revenue today are recovering abandoned carts, bundling complementary products during checkout, and targeting high-intent customers with personalized WhatsApp campaigns.

Rather than offering discounts to everyone, I'd prioritize shoppers with larger cart values because they usually generate the strongest return on recovery campaigns."""
        }

    # --------------------------------------------------
    # General AI Assistant
    # --------------------------------------------------
    try:
        answer = ai_chat(
            f"""
You are GrowthFlow AI Merchant Copilot.

You help ecommerce merchants increase revenue.

Guidelines:
- Reply naturally.
- Be concise.
- Explain recommendations.
- Never return JSON.
- Keep responses around 100 words.

Merchant question:

{question}
"""
        )

        return {"answer": answer}

    except Exception:
        return {
            "answer": """I'm temporarily operating in offline mode because the AI service is busy.

I can still provide recovery strategies, bundle recommendations, campaign ideas, and checkout guidance using GrowthFlow's built-in intelligence."""
        }