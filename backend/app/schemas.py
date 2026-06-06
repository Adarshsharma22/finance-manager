from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

# ─── Category schemas ───────────────────────────────────────

class CategoryCreate(BaseModel):
    name: str
    type: str       # "income" or "expense"
    color: str = "#6366f1"

class CategoryOut(BaseModel):
    id: int
    name: str
    type: str
    color: str

    class Config:
        from_attributes = True   # lets Pydantic read SQLAlchemy objects


# ─── Transaction schemas ─────────────────────────────────────

class TransactionCreate(BaseModel):
    category_id: int
    amount: float
    type: str        # "income" or "expense"
    note: str = ""
    date: date

class TransactionOut(BaseModel):
    id: int
    amount: float
    type: str
    note: str
    date: date
    created_at: datetime
    category: CategoryOut   # nested — returns full category info

    class Config:
        from_attributes = True


# ─── Budget schemas ──────────────────────────────────────────

class BudgetCreate(BaseModel):
    category_id: int
    limit_amount: float
    month: int   # 1–12
    year: int

class BudgetOut(BaseModel):
    id: int
    limit_amount: float
    month: int
    year: int
    category: CategoryOut
    spent: float = 0.0   # calculated field — filled in the route

    class Config:
        from_attributes = True


# ─── Report schemas ──────────────────────────────────────────

class MonthlyReport(BaseModel):
    month: int
    year: int
    total_income: float
    total_expense: float
    balance: float

class CategoryReport(BaseModel):
    category_name: str
    color: str
    total: float
    percentage: float