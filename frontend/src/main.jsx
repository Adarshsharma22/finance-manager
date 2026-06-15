import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import App              from './App'
import LoginPage        from './pages/LoginPage'
import SignupPage       from './pages/SignupPage'
import ProfilePage      from './pages/ProfilePage'
import GoogleCallbackPage from './pages/GoogleCallbackPage'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  
  // High-fidelity light/dark synchronized authentication checkpoint loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="relative w-12 h-12 flex items-center justify-center">
          
          {/* Outer Ambient Breathing Glow Pulse Ring */}
          <div className="absolute inset-0 border-4 border-indigo-500/10 dark:border-indigo-400/10 rounded-full animate-ping" />
          
          {/* Static Background Guideway Track */}
          <div className="absolute inset-0 border-4 border-gray-100 dark:border-gray-900 rounded-full" />
          
          {/* Active Mechanical Spinning Overlay Wheel */}
          <div className="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-500 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
          
        </div>
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" replace />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider> 
        <Routes>
          <Route path="/login"           element={<LoginPage />} />
          <Route path="/signup"          element={<SignupPage />} />
          <Route path="/auth/callback"   element={<GoogleCallbackPage />} />
          <Route path="/"                element={<PrivateRoute><App /></PrivateRoute>} />
          <Route path="/profile"         element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          {/* Wildcard fallback redirection */}
          <Route path="*"                element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)