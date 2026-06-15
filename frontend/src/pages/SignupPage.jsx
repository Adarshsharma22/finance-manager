import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { API_URL } from '../config'

export default function SignupPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form,    setForm]    = useState({ name: '', email: '', password: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/auth/register`, form)
      login(res.data.access_token, res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-sm">

        {/* Brand Identity Branding Header Section */}
        <div className="text-center mb-8 group">
          <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-105 transition-transform duration-200">
            <span className="text-white text-xl font-extrabold">₹</span>
          </div>
          <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white transition-colors">
            Create Account
          </h1>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mt-1">
            Start tracking your finances today
          </p>
        </div>

        {/* Primary Account Registration Form Box */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-xl shadow-gray-200/20 dark:shadow-none transition-all duration-300">
          
          {error && (
            <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 rounded-r-xl px-4 py-3 mb-4 animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input Field Row */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Harsh Sharma"
                required
                className="w-full text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
              />
            </div>

            {/* Email Address Input Field Row */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="you@example.com"
                required
                className="w-full text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
              />
            </div>

            {/* Password Input Field Row */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                placeholder="Minimum 6 characters"
                required
                className="w-full text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
              />
            </div>

            {/* Registration Action Submission Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-bold rounded-xl py-2.5 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Clean Unified Row Border Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-900 px-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                or
              </span>
            </div>
          </div>

          {/* Third Party OAuth Single Sign-on Target Redirect Anchor */}
          <a
            href={`${API_URL}/auth/google`}
            className="flex items-center justify-center gap-2.5 w-full bg-gray-50 dark:bg-gray-950 hover:bg-gray-100/70 dark:hover:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 transition-all duration-200 active:scale-[0.98]"
          >
            <svg width="16" height="16" viewBox="0 0 48 48" className="flex-shrink-0">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.5 30.2 0 24 0 14.7 0 6.7 5.5 2.9 13.6l7.8 6C12.5 13.2 17.8 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-9.9 7.1-17z"/>
              <path fill="#FBBC05" d="M10.7 28.4A14.6 14.6 0 0 1 9.5 24c0-1.5.3-3 .8-4.3l-7.8-6A24 24 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8.2-6.2z"/>
              <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.3-9.8l-8.2 6.2C6.5 42.5 14.7 48 24 48z"/>
            </svg>
            Sign up with Google
          </a>
        </div>

        {/* Secondary Navigation Intent Footnote */}
        <p className="text-center text-sm font-medium text-gray-400 dark:text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline transition-all">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}