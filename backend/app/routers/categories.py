from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Category
from ..schemas import CategoryCreate, CategoryOut
from typing import List

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("/", response_model=List[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()


@router.post("/", response_model=CategoryOut)
def create_category(data: CategoryCreate, db: Session = Depends(get_db)):
    # Check if category name already exists
    existing = db.query(Category).filter(Category.name == data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")

    category = Category(**data.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category