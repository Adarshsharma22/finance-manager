from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from ..database import get_db
from ..models import Budget, Transaction
from ..schemas import BudgetCreate, BudgetOut
from typing import List

router = APIRouter(prefix="/budgets", tags=["budgets"])


@router.get("/", response_model=List[BudgetOut])
def get_budgets(
    month: int = None,
    year:  int = None,
    db: Session = Depends(get_db)
):
    budgets = db.query(Budget).filter(Budget.user_id == 1).all()
    result = []

    for budget in budgets:
        # Calculate how much was actually spent for this category/month
        spent = db.query(func.sum(Transaction.amount)).filter(
            Transaction.category_id == budget.category_id,
            Transaction.type == "expense",
            extract("month", Transaction.date) == budget.month,
            extract("year",  Transaction.date) == budget.year
        ).scalar() or 0.0

        budget_out = BudgetOut(
            id=budget.id,
            limit_amount=float(budget.limit_amount),
            month=budget.month,
            year=budget.year,
            category=budget.category,
            spent=float(spent)
        )
        result.append(budget_out)

    return result


@router.post("/", response_model=BudgetOut)
def create_budget(data: BudgetCreate, db: Session = Depends(get_db)):
    # Check if budget already exists for this category/month/year
    existing = db.query(Budget).filter(
        Budget.category_id == data.category_id,
        Budget.month == data.month,
        Budget.year == data.year,
        Budget.user_id == 1
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Budget already set for this category and month"
        )

    budget = Budget(user_id=1, **data.model_dump())
    db.add(budget)
    db.commit()
    db.refresh(budget)

    budget_out = BudgetOut(
        id=budget.id,
        limit_amount=float(budget.limit_amount),
        month=budget.month,
        year=budget.year,
        category=budget.category,
        spent=0.0
    )
    return budget_out