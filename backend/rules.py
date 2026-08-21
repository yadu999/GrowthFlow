def decide_offer(cart, time_spent, coupon):

    if cart > 3000:
        return "Offer Free Shipping"

    if coupon:
        return "Offer 5% Discount"

    if time_spent > 600:
        return "Send Reminder after 2 hours"

    return "No Offer Needed"