from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, SectionLocal
from . import models
from .routers import transactions, categories, reports, budgets, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Finance Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:51730",
        "https://finance-manager-one-delta.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(transactions.router)
app.include_router(categories.router)
app.include_router(reports.router)
app.include_router(budgets.router)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.on_event("startup")
def startup_seed():
    db = SessionLocal()
    try:
        # Only seed if categories table is empty
        from .models import Category
        if db.query(Category).count() == 0:
            from .seed import seed_categories
            seed_categories(db)
            print("✅ Database seeded successfully")
        else:
            print("ℹ️ Database already seeded, skipping")
    finally:
        db.close()