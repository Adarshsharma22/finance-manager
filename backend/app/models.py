from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String, nullable=False)
    email      = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships — lets you do user.transactions in Python
    transactions = relationship("Transaction", back_populates="user")
    budgets      = relationship("Budget", back_populates="user")


class Category(Base):
    __tablename__ = "categories"

    id    = Column(Integer, primary_key=True, index=True)
    name  = Column(String, nullable=False)   # e.g. "Food", "Rent", "Salary"
    type  = Column(String, nullable=False)   # "income" or "expense"
    color = Column(String, default="#6366f1") # hex color for charts

    transactions = relationship("Transaction", back_populates="category")
    budgets      = relationship("Budget", back_populates="category")


class Transaction(Base):
    __tablename__ = "transactions"

    id          = Column(Integer, primary_key=True, index=True)
    user_id     = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    amount      = Column(Numeric(10, 2), nullable=False)  # e.g. 1500.00
    type        = Column(String, nullable=False)           # "income" or "expense"
    note        = Column(String, default="")
    date        = Column(Date, nullable=False)
    created_at  = Column(DateTime, server_default=func.now())

    user     = relationship("User", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")


class Budget(Base):
    __tablename__ = "budgets"

    id           = Column(Integer, primary_key=True, index=True)
    user_id      = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id  = Column(Integer, ForeignKey("categories.id"), nullable=False)
    limit_amount = Column(Numeric(10, 2), nullable=False)  # monthly budget limit
    month        = Column(Integer, nullable=False)  # 1-12
    year         = Column(Integer, nullable=False)  # e.g. 2026

    user     = relationship("User", back_populates="budgets")
    category = relationship("Category", back_populates="budgets")