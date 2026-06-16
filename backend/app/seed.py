from .database import SessionLocal
from .models import User, Category, Transaction, Budget
from datetime import date


def seed_categories(db):
    """Seed only categories — safe to call on startup"""
    categories = [
        Category(name="Salary",     type="income",  color="#22c55e"),
        Category(name="Freelance",  type="income",  color="#3b82f6"),
        Category(name="Food",       type="expense", color="#f97316"),
        Category(name="Rent",       type="expense", color="#ef4444"),
        Category(name="Transport",  type="expense", color="#a855f7"),
        Category(name="Shopping",   type="expense", color="#ec4899"),
        Category(name="Utilities",  type="expense", color="#14b8a6"),
    ]
    for c in categories:
        db.add(c)
    db.commit()


def seed():
    db = SessionLocal()

    # Create a test user
    user = User(name="Harsh Sharma", email="harsh@example.com")
    db.add(user)
    db.commit()
    db.refresh(user)

    # Create categories
    categories = [
        Category(name="Salary",      type="income",  color="#22c55e"),
        Category(name="Freelance",   type="income",  color="#3b82f6"),
        Category(name="Food",        type="expense", color="#f97316"),
        Category(name="Rent",        type="expense", color="#ef4444"),
        Category(name="Transport",   type="expense", color="#a855f7"),
        Category(name="Shopping",    type="expense", color="#ec4899"),
        Category(name="Utilities",   type="expense", color="#14b8a6"),
    ]
    for c in categories:
        db.add(c)
    db.commit()

    # Create some transactions
    salary = db.query(Category).filter_by(name="Salary").first()
    food   = db.query(Category).filter_by(name="Food").first()
    rent   = db.query(Category).filter_by(name="Rent").first()

    transactions = [
        Transaction(user_id=user.id, category_id=salary.id, amount=50000, type="income",  note="June salary",  date=date(2026, 6, 1)),
        Transaction(user_id=user.id, category_id=food.id,   amount=3200,  type="expense", note="Groceries",    date=date(2026, 6, 2)),
        Transaction(user_id=user.id, category_id=rent.id,   amount=12000, type="expense", note="June rent",    date=date(2026, 6, 1)),
        Transaction(user_id=user.id, category_id=food.id,   amount=850,   type="expense", note="Restaurant",   date=date(2026, 6, 4)),
    ]
    for t in transactions:
        db.add(t)

    # Create a budget
    db.add(Budget(user_id=user.id, category_id=food.id, limit_amount=5000, month=6, year=2026))
    db.commit()
    db.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()