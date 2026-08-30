import json

from database import SessionLocal
from models import Product
from ai import ai_chat


# -----------------------------------
# AI Bundle Generator
# -----------------------------------

def generate_bundle(product_name):
    db = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(Product.name == product_name)
            .first()
        )

        if product is None:
            return None

        # Build catalog excluding the selected product
        catalog = (
            db.query(Product)
            .filter(Product.name != product_name)
            .all()
        )

        catalog_text = "\n".join(
            f"- {p.name} | {p.category} | ₹{int(p.price)}"
            for p in catalog
        )

        prompt = f"""
You are an ecommerce merchandising AI.

Customer selected: {product.name}
Category: {product.category}
Price: ₹{int(product.price)}

Available catalog:
{catalog_text}

Choose 2 to 4 complementary products.

Rules:
- Only use products from the catalog.
- Do NOT recommend the original product.
- Prefer accessories or products that increase cart value naturally.
- Give a short reason for each recommendation.

Return ONLY valid JSON in this format:

{{
  "recommendations": [
    {{
      "name": "Product Name",
      "reason": "Short reason"
    }}
  ]
}}
"""

        ai_response = ai_chat(prompt)

        # Parse AI JSON safely
        try:
            parsed = json.loads(ai_response)
        except Exception:
            parsed = {"recommendations": []}

        recommendations = []
        original_total = float(product.price)

        for rec in parsed.get("recommendations", []):
            item = (
                db.query(Product)
                .filter(Product.name == rec["name"])
                .first()
            )

            if item:
                recommendations.append({
                    "name": item.name,
                    "price": float(item.price),
                    "reason": rec.get("reason", "AI recommendation")
                })

                original_total += float(item.price)

        # Fallback recommendations if AI returns nothing
        if not recommendations:
            fallback = (
                db.query(Product)
                .filter(Product.category == product.category)
                .filter(Product.name != product.name)
                .limit(3)
                .all()
            )

            for item in fallback:
                recommendations.append({
                    "name": item.name,
                    "price": float(item.price),
                    "reason": "Frequently bought together"
                })

                original_total += float(item.price)

        discount = round(original_total * 0.04, 2)
        grand_total = round(original_total - discount, 2)

        return {
            "product": {
                "name": product.name,
                "price": float(product.price),
            },
            "recommendations": recommendations,
            "original_total": original_total,
            "discount": discount,
            "grand_total": grand_total,
        }

    finally:
        db.close()


# -----------------------------------
# Backward Compatibility
# Used by copilot_service.py
# -----------------------------------

def recommend_addons(product_name):
    return generate_bundle(product_name)