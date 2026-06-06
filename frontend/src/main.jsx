import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import App              from './App'
import LoginPage        from './pages/LoginPage'
import SignupPage       from './pages/SignupPage'
import ProfilePage      from './pages/ProfilePage'
import GoogleCallbackPage from './pages/GoogleCallbackPage'
import './index.css'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  return user ? children : <Navigate to="/login" />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/signup"          element={<SignupPage />} />
        <Route path="/auth/callback"   element={<GoogleCallbackPage />} />
        <Route path="/"                element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path="/profile"         element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)