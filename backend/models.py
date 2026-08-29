from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base


# -----------------------------------
# Customers
# -----------------------------------
class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(String(20), unique=True, nullable=False)

    name = Column(String(100))
    email = Column(String(120))
    product = Column(String(120))

    cart_value = Column(Float)
    device = Column(String(50))
    payment = Column(String(50))
    coupon_used = Column(Boolean, default=False)
    time_spent = Column(Integer)

    status = Column(String(30), default="Abandoned")

    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    predictions = relationship(
        "Prediction",
        back_populates="customer",
        cascade="all, delete-orphan"
    )

    messages = relationship(
        "RecoveryMessage",
        back_populates="customer",
        cascade="all, delete-orphan"
    )

    audits = relationship(
        "AuditLog",
        back_populates="customer",
        cascade="all, delete-orphan"
    )


# -----------------------------------
# AI Predictions
# -----------------------------------
class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id", ondelete="CASCADE")
    )

    intent = Column(String(100))
    confidence = Column(Integer)

    recovery_probability = Column(Integer)
    priority = Column(String(20))
    offer = Column(String(100))

    created_at = Column(DateTime, server_default=func.now())

    customer = relationship("Customer", back_populates="predictions")


# -----------------------------------
# Recovery Messages
# -----------------------------------
class RecoveryMessage(Base):
    __tablename__ = "recovery_messages"

    id = Column(Integer, primary_key=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id", ondelete="CASCADE")
    )

    message = Column(String(500))
    channel = Column(String(30), default="WhatsApp")
    sent = Column(Boolean, default=False)

    created_at = Column(DateTime, server_default=func.now())

    customer = relationship("Customer", back_populates="messages")


# -----------------------------------
# Merchant Copilot Chat History
# -----------------------------------
class MerchantChat(Base):
    __tablename__ = "merchant_chat"

    id = Column(Integer, primary_key=True)

    role = Column(String(20))
    content = Column(Text)

    created_at = Column(DateTime, server_default=func.now())


# -----------------------------------
# AI Audit Trail
# -----------------------------------
class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id", ondelete="CASCADE")
    )

    action = Column(String(100))
    input_data = Column(Text)
    ai_decision = Column(Text)

    approved = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer", back_populates="audits")

    # -----------------------------------
# Product Catalog
# -----------------------------------
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    sku = Column(String(30), unique=True, nullable=False)
    name = Column(String(120), nullable=False)
    category = Column(String(80))

    price = Column(Float)
    stock = Column(Integer, default=0)
    rating = Column(Float)

    description = Column(Text)
    image_url = Column(Text)

    created_at = Column(DateTime, server_default=func.now())


# -----------------------------------
# Checkout Sessions
# -----------------------------------
class CheckoutSession(Base):
    __tablename__ = "checkout_sessions"

    id = Column(Integer, primary_key=True)

    customer_name = Column(String(120))
    product_name = Column(String(150))
    amount = Column(Float)

    status = Column(String(30), default="Pending Approval")

    payment_link = Column(Text)

    created_at = Column(DateTime, server_default=func.now())

   # -----------------------------------
# AI Campaigns (Razorpay Phase 4)
# -----------------------------------
class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True)

    name = Column(String(150))
    audience = Column(String(120))
    channel = Column(String(30))

    message = Column(Text)

    predicted_recovery = Column(Float)

    status = Column(String(30), default="Pending Approval")

    created_at = Column(DateTime, server_default=func.now())