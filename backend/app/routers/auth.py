from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import UserRegister, UserLogin, TokenOut, UserOut, UserUpdate
from ..auth import (
    hash_password, verify_password,
    create_access_token, get_current_user
)
import httpx, os

router = APIRouter(prefix="/auth", tags=["auth"])

GOOGLE_CLIENT_ID     = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI  = os.getenv("GOOGLE_REDIRECT_URI")
FRONTEND_URL         = os.getenv("FRONTEND_URL")


# ── Email register ────────────────────────────────────────────
@router.post("/register", response_model=TokenOut)
def register(data: UserRegister, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
        auth_provider="email"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": str(user.id)})
    return TokenOut(access_token=token, user=user)


# ── Email login ───────────────────────────────────────────────
@router.post("/login", response_model=TokenOut)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not user.hashed_password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user.id)})
    return TokenOut(access_token=token, user=user)


# ── Get current user (me) ─────────────────────────────────────
@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


# ── Update profile ────────────────────────────────────────────
@router.patch("/me", response_model=UserOut)
def update_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if data.name:
        current_user.name = data.name
    if data.avatar_url is not None:
        current_user.avatar_url = data.avatar_url
    db.commit()
    db.refresh(current_user)
    return current_user


# ── Google OAuth — redirect to Google ────────────────────────
@router.get("/google")
def google_login():
    params = (
        f"client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=openid email profile"
        f"&access_type=offline"
    )
    return RedirectResponse(
        f"https://accounts.google.com/o/oauth2/v2/auth?{params}"
    )


# ── Google OAuth — handle callback ───────────────────────────
@router.get("/google/callback")
async def google_callback(code: str, db: Session = Depends(get_db)):
    # 1. Exchange code for tokens
    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            }
        )
        token_data = token_res.json()

        # 2. Get user info from Google
        user_res = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {token_data['access_token']}"}
        )
        google_user = user_res.json()

    # 3. Find or create user in our database
    user = db.query(User).filter(User.email == google_user["email"]).first()
    if not user:
        user = User(
            name=google_user.get("name", ""),
            email=google_user["email"],
            avatar_url=google_user.get("picture"),
            auth_provider="google",
            hashed_password=None
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # 4. Issue our JWT and redirect to frontend
    token = create_access_token({"sub": str(user.id)})
    return RedirectResponse(
        f"{FRONTEND_URL}/auth/callback?token={token}"
    )