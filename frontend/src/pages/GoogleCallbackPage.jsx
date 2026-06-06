import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

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
    axios.get('http://localhost:8000/auth/me')
      .then(res => {
        login(token, res.data)
        navigate('/')
      })
      .catch(() => navigate('/login'))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500">Signing you in with Google...</p>
      </div>
    </div>
  )
}