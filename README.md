<div align="center">

<img src="https://img.shields.io/badge/Finance-Manager-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHRleHQgeT0iMjAiIGZvbnQtc2l6ZT0iMjAiPuKCuTwvdGV4dD48L3N2Zz4=" alt="Finance Manager"/>

# 💰 Personal Finance Manager

**A full-stack web application to track income, expenses, budgets, and analytics — built from scratch as an internship learning project.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql)](https://postgresql.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python)](https://python.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [API Docs](#-api-reference) • [Screenshots](#-screenshots)

</div>

---

## ✨ Features

- 🔐 **Authentication** — Email/password signup & login + Google OAuth (JWT-based)
- 👤 **User profiles** — Edit name, view account info, avatar from Google
- 💸 **Transaction tracking** — Add income and expenses with categories, notes, and dates
- 🗂️ **Expense categories** — Color-coded categories (Food, Rent, Salary, Transport, etc.)
- 📊 **Monthly reports** — Income vs expense breakdown by month
- 🎯 **Budget limits** — Set monthly budget per category with a live progress bar
- 📈 **Charts & analytics** — Bar chart, donut chart, and area trend chart powered by Recharts
- 🗑️ **Delete transactions** — Hover to reveal delete button per transaction
- 📅 **Month/year filter** — Switch between months from the navbar

---

## 🛠 Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Dev server & bundler |
| Tailwind CSS v4 | Styling |
| Recharts | Charts and analytics |
| Axios | API communication |
| React Router v6 | Client-side routing |

### Backend
| Tool | Purpose |
|------|---------|
| FastAPI | REST API framework |
| SQLAlchemy | ORM for database models |
| PostgreSQL | Relational database |
| Alembic | Database migrations |
| Pydantic | Request/response validation |
| python-jose | JWT token generation |
| passlib + bcrypt | Password hashing |
| httpx | Google OAuth HTTP calls |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 15+ (with pgAdmin or psql)
- A **Google Cloud** project with OAuth credentials (for Google login)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/finance-manager.git
cd finance-manager
```

---

### 2. Set up the database

Open pgAdmin or psql and run:

```sql
CREATE DATABASE finance_db;
```

---

### 3. Set up the backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/finance_db
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

Seed the database with starter categories:

```bash
python -m app.seed
```

Start the backend server:

```bash
uvicorn app.main:app --reload
```

Backend runs at **http://localhost:8000**
Interactive API docs at **http://localhost:8000/docs**

---

### 4. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

---

### 5. Set up Google OAuth (optional)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → OAuth consent screen (External)
3. Credentials → Create OAuth Client ID → Web application
4. Add redirect URI: `http://localhost:8000/auth/google/callback`
5. Copy Client ID and Client Secret into your `.env`
6. Add your Gmail as a test user under OAuth consent screen

---

## 📁 Project Structure

```
finance-manager/
│
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── database.py       # SQLAlchemy engine and session
│   │   ├── models.py         # Database table definitions
│   │   ├── schemas.py        # Pydantic request/response models
│   │   ├── auth.py           # JWT and password utilities
│   │   ├── seed.py           # Seed script for starter data
│   │   └── routers/
│   │       ├── auth.py       # /auth/* routes (login, register, Google OAuth)
│   │       ├── transactions.py # /transactions/* routes
│   │       ├── categories.py   # /categories/* routes
│   │       ├── reports.py      # /reports/* routes
│   │       └── budgets.py      # /budgets/* routes
│   ├── requirements.txt
│   └── .env                  # Never commit this!
│
└── frontend/
    └── src/
        ├── App.jsx             # Root component with tab navigation
        ├── main.jsx            # React entry point with routing
        ├── api.js              # All Axios API calls in one place
        ├── context/
        │   └── AuthContext.jsx # Global auth state (user, login, logout)
        ├── components/
        │   ├── Navbar.jsx
        │   ├── StatsRow.jsx
        │   ├── TransactionForm.jsx
        │   ├── TransactionList.jsx
        │   ├── BudgetTracker.jsx
        │   └── charts/
        │       ├── MonthlyBarChart.jsx
        │       ├── CategoryPieChart.jsx
        │       └── BalanceTrendChart.jsx
        └── pages/
            ├── LoginPage.jsx
            ├── SignupPage.jsx
            ├── ProfilePage.jsx
            ├── GoogleCallbackPage.jsx
            └── Analytics.jsx
```

---

## 📡 API Reference

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Create new account | ❌ |
| POST | `/auth/login` | Login with email/password | ❌ |
| GET | `/auth/me` | Get current user | ✅ |
| PATCH | `/auth/me` | Update profile | ✅ |
| GET | `/auth/google` | Redirect to Google login | ❌ |
| GET | `/auth/google/callback` | Google OAuth callback | ❌ |
| GET | `/transactions/` | List transactions (filter by month/year/type) | ✅ |
| POST | `/transactions/` | Add a transaction | ✅ |
| DELETE | `/transactions/{id}` | Delete a transaction | ✅ |
| GET | `/categories/` | List all categories | ✅ |
| POST | `/categories/` | Create a category | ✅ |
| GET | `/reports/monthly` | Monthly income vs expense | ✅ |
| GET | `/reports/by-category` | Spending by category | ✅ |
| GET | `/budgets/` | List budgets with spent amount | ✅ |
| POST | `/budgets/` | Set a budget limit | ✅ |

---

## 🗄️ Database Schema

```
users
  id, name, email, hashed_password, avatar_url, auth_provider, created_at

categories
  id, name, type (income/expense), color

transactions
  id, user_id (FK), category_id (FK), amount, type, note, date, created_at

budgets
  id, user_id (FK), category_id (FK), limit_amount, month, year
```

---

## 🧠 What I Learned Building This

This project was built to prepare for a full-stack internship. Key concepts learned:

- **FastAPI** — routing, Pydantic validation, dependency injection, async handlers
- **SQLAlchemy ORM** — models, relationships, sessions, SQL aggregation with `func.sum()`
- **PostgreSQL** — table design, foreign keys, filtering with `EXTRACT(month FROM date)`
- **JWT Authentication** — token creation, validation, and protected routes
- **Google OAuth 2.0** — authorization code flow, token exchange, user info API
- **React patterns** — Context API, custom hooks, protected routes, `useCallback`
- **Tailwind CSS v4** — utility-first styling, responsive layout, hover effects
- **Recharts** — BarChart, PieChart, AreaChart with custom tooltips
- **Axios interceptors** — automatically attaching auth headers to every request
- **CORS** — allowing cross-origin requests between frontend and backend

---

## 🤖 Built with AI Assistance

This project was built with the help of **[Claude](https://claude.ai)** by Anthropic — an AI assistant used throughout the development process.

Claude helped with:
- Designing the full project architecture and folder structure
- Writing and explaining FastAPI routes, SQLAlchemy models, and Pydantic schemas
- Debugging errors (bcrypt version mismatch, Tailwind v4 setup, JWT 401 errors)
- Setting up Google OAuth from scratch
- Building the React components and Tailwind UI
- Teaching concepts as we coded — not just giving answers, but explaining the *why*

> The goal wasn't to copy-paste code — it was to learn by building something real.
> Every error we hit became a lesson. Every concept was explained before being applied.
>
> This is how I'd recommend using AI tools as a student: as a **patient tutor**,
> not a code machine.

---

## 📝 License

MIT — free to use, modify, and learn from.

---

<div align="center">

Built by **Harsh Sharma** · Powered by FastAPI + React + PostgreSQL · Guided by Claude (Anthropic)

</div>
