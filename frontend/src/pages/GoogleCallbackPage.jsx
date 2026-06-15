import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { API_URL } from '../config'

export default function GoogleCallbackPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token  = params.get('token')

    if (!token) {
      navigate('/login')
      return
    }

    // Fetch user data with the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${API_URL}/auth/me`)
      .then(res => {
        login(token, res.data)
        navigate('/')
      })
      .catch(() => navigate('/login'))
  }, [login, navigate])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-8 max-w-sm w-full text-center shadow-xl shadow-gray-200/30 dark:shadow-none transition-all duration-300">
        
        {/* Advanced Layered Loader Engine */}
        <div className="relative w-14 h-14 mx-auto mb-6 flex items-center justify-center">
          {/* Outer Breathing Glow Pulse Ring */}
          <div className="absolute inset-0 border-4 border-indigo-500/10 dark:border-indigo-400/10 rounded-full animate-ping" />
          
          {/* Static Background Guideway Track */}
          <div className="absolute inset-0 border-4 border-gray-100 dark:border-gray-800 rounded-full" />
          
          {/* Active Mechanical Spinning Overlay Wheel */}
          <div className="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-500 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
          
          {/* Central Centered Google Vector Branding Representation */}
          <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
        </div>

        {/* Text Copy Context */}
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 tracking-tight mb-1">
          Authenticating Account
        </h3>
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
          Securing your session token...
        </p>
      </div>
    </div>
  )
}