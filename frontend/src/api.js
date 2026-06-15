import axios from 'axios'
import { API_URL } from './config'

const api = axios.create({
  baseURL: API_URL,
})

// This interceptor runs before EVERY request
// It reads the token from localStorage and attaches it automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Transactions ──────────────────────────────────────────
export const getTransactions = (params) =>
  api.get('/transactions/', { params })

export const createTransaction = (data) =>
  api.post('/transactions/', data)

export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`)

// ── Categories ────────────────────────────────────────────
export const getCategories = () =>
  api.get('/categories/')

// ── Reports ───────────────────────────────────────────────
export const getMonthlyReport = (year) =>
  api.get('/reports/monthly', { params: { year } })

export const getCategoryReport = (month, year) =>
  api.get('/reports/by-category', { params: { month, year } })

// ── Budgets ───────────────────────────────────────────────
export const getBudgets = () =>
  api.get('/budgets/')

export const createBudget = (data) =>
  api.post('/budgets/', data)