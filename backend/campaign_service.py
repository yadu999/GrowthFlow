from database import SessionLocal
from models import Customer, Campaign
from ai import ai_chat


def create_campaign(name, channel="WhatsApp"):
    db = SessionLocal()

    try:
        # Find high-value abandoned carts
        customers = (
            db.query(Customer)
            .filter(
                Customer.status == "Abandoned",
                Customer.cart_value >= 4000,
            )
            .all()
        )

        audience = len(customers)

        # Generate AI recovery message
        try:
            message = ai_chat(
                f"""
Write a {channel} recovery message.

Audience:
{audience} customers with carts above ₹4000.

Requirements:
- Friendly
- Under 40 words
- Encourage checkout
- No markdown
"""
            )
        except Exception:
            message = (
                "Complete your purchase today and unlock an exclusive "
                "limited-time offer before it expires."
            )

        # Create campaign
        campaign = Campaign(
            name=name,
            audience=f"{audience} high-value customers",
            channel=channel,
            message=message,
            predicted_recovery=38.5,
            status="Pending Approval",
        )

        db.add(campaign)
        db.commit()
        db.refresh(campaign)

        return {
            "campaign_id": campaign.id,
            "name": campaign.name,
            "audience": audience,
            "channel": campaign.channel,
            "message": campaign.message,
            "predicted_recovery": campaign.predicted_recovery,
            "status": campaign.status,
        }

    finally:
        db.close()