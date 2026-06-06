from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from ..database import get_db
from ..models import Transaction, Category
from ..schemas import MonthlyReport, CategoryReport
from typing import List
from datetime import datetime

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("/monthly", response_model=List[MonthlyReport])
def monthly_report(
    year: int = Query(default=datetime.now().year),
    db: Session = Depends(get_db)
):
    results = []

    for month in range(1, 13):
        # Total income for this month
        income = db.query(func.sum(Transaction.amount)).filter(
            Transaction.type == "income",
            extract("month", Transaction.date) == month,
            extract("year",  Transaction.date) == year
        ).scalar() or 0.0

        # Total expense for this month
        expense = db.query(func.sum(Transaction.amount)).filter(
            Transaction.type == "expense",
            extract("month", Transaction.date) == month,
            extract("year",  Transaction.date) == year
        ).scalar() or 0.0

        if income > 0 or expense > 0:   # skip empty months
            results.append(MonthlyReport(
                month=month,
                year=year,
                total_income=float(income),
                total_expense=float(expense),
                balance=float(income) - float(expense)
            ))

    return results


@router.get("/by-category", response_model=List[CategoryReport])
def category_report(
    month: int = Query(default=datetime.now().month),
    year:  int = Query(default=datetime.now().year),
    db: Session = Depends(get_db)
):
    # Group expenses by category and sum them
    rows = db.query(
        Category.name,
        Category.color,
        func.sum(Transaction.amount).label("total")
    ).join(Transaction).filter(
        Transaction.type == "expense",
        extract("month", Transaction.date) == month,
        extract("year",  Transaction.date) == year
    ).group_by(Category.name, Category.color).all()

    if not rows:
        return []

    grand_total = sum(r.total for r in rows)

    return [
        CategoryReport(
            category_name=r.name,
            color=r.color,
            total=float(r.total),
            percentage=round((float(r.total) / float(grand_total)) * 100, 1)
        )
        for r in rows
    ]