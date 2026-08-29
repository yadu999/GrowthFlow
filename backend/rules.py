def decide_offer(cart, time_spent, coupon):
    """
    GrowthFlow Business Rules

    Determines the most effective recovery offer based on
    customer behavior before checkout.
    """

    # Premium customer with high intent
    if cart >= 4000 and time_spent >= 600 and not coupon:
        return "10% Discount"

    # High cart but shorter session
    elif cart >= 4000:
        return "Free Shipping"

    # Mid-value engaged customer
    elif cart >= 2000 and time_spent >= 400:
        return "5% Discount"

    # Coupon already used – avoid stacking discounts
    elif coupon and time_spent >= 300:
        return "Cashback"

    # Long browsing session with low cart
    elif time_spent >= 500:
        return "Free Shipping"

    # Light browsing – just send a reminder
    else:
        return "Reminder Only"