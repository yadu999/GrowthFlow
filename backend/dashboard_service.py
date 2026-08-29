from sqlalchemy import text
from database import SessionLocal


def get_dashboard():
    db = SessionLocal()

    try:
        revenue = db.execute(text("""
            SELECT COALESCE(SUM(cart_value), 0)
            FROM customers
            WHERE status='Recovered';
        """)).scalar() or 0

        abandoned = db.execute(text("""
            SELECT COUNT(*)
            FROM customers
            WHERE status='Abandoned';
        """)).scalar() or 0

        recovered = db.execute(text("""
            SELECT COUNT(*)
            FROM customers
            WHERE status='Recovered';
        """)).scalar() or 0

        pending = db.execute(text("""
            SELECT COUNT(*)
            FROM customers
            WHERE status='Pending';
        """)).scalar() or 0

        total = db.execute(text("""
            SELECT COUNT(*)
            FROM customers;
        """)).scalar() or 0

        avg_cart = db.execute(text("""
            SELECT COALESCE(AVG(cart_value), 0)
            FROM customers;
        """)).scalar() or 0

        recovery_rate = db.execute(text("""
            SELECT COALESCE(AVG(recovery_probability), 0)
            FROM predictions;
        """)).scalar() or 0

        conversion = round((recovered / total) * 100, 1) if total else 0

        return {
            "revenue": int(revenue),
            "conversion": conversion,
            "abandoned": int(abandoned),
            "recovered": int(recovered),
            "pending": int(pending),
            "total_customers": int(total),
            "average_cart": round(float(avg_cart)),
            "recovery_rate": round(float(recovery_rate), 1),
        }

    finally:
        db.close()