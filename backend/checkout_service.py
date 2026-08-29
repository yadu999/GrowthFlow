from database import SessionLocal
from models import Product, CheckoutSession


def create_checkout(product_name: str, customer_name="Guest"):
    db = SessionLocal()

    try:
        product = (
            db.query(Product)
            .filter(Product.name.ilike(f"%{product_name}%"))
            .first()
        )

        if not product:
            return None

        session = CheckoutSession(
            customer_name=customer_name,
            product_name=product.name,
            amount=product.price,
            status="Pending Approval",
        )

        db.add(session)
        db.commit()
        db.refresh(session)

        return {
            "checkout_id": session.id,
            "product": product.name,
            "amount": product.price,
            "status": session.status,
        }

    finally:
        db.close()