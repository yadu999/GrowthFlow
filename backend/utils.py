from datetime import datetime


def current_time():
    return datetime.now().strftime("%I:%M %p")


def inr(value):
    return f"₹{value:,}"