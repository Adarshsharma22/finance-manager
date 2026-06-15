import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function ProfilePage() {
  const { user, setUser, logout } = useAuth()
  const [editing, setEditing]     = useState(false)
  const [name,    setName]        = useState(user?.name || '')
  const [saved,   setSaved]       = useState(false)
  const [error,   setError]       = useState('')

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const handleSave = async () => {
    try {
      const res = await axios.patch('http://localhost:8000/auth/me', { name })
      setUser(res.data)
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to update profile')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-12 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">

        {/* Section Title Header */}
        <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white uppercase mb-6">
          Profile Settings
        </h1>

        {/* Primary Identity Info Block Container */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-5 shadow-sm transition-all duration-300">

          {/* Avatar Header Panel */}
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800/60">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-indigo-500/10 dark:ring-indigo-400/10"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center ring-4 ring-indigo-500/10 dark:ring-indigo-400/10 flex-shrink-0">
                <span className="text-indigo-600 dark:text-indigo-400 text-lg font-bold tracking-wider">{initials}</span>
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold tracking-tight text-gray-900 dark:text-white text-lg truncate">{user?.name}</p>
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500 truncate mt-0.5">{user?.email}</p>
              <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/30">
                {user?.auth_provider === 'google' ? 'Google Authenticated' : 'Email Account'}
              </span>
            </div>
          </div>

          {/* Editable Display Name Sub-row */}
          <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800/60">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2">
              Display Name
            </label>
            {editing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="flex-1 text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
                />
                <button
                  onClick={handleSave}
                  className="text-sm font-bold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition-colors active:scale-[0.98]"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditing(false); setName(user?.name) }}
                  className="text-sm font-bold border border-gray-200 dark:border-gray-800 bg-transparent text-gray-600 dark:text-gray-400 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-gray-50/50 dark:bg-gray-950/40 border border-gray-100/80 dark:border-gray-800 px-3.5 py-2.5 rounded-xl">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.name}</span>
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  Edit Name
                </button>
              </div>
            )}
            {error && <p className="text-xs font-semibold text-rose-500 mt-2 animate-fade-in">{error}</p>}
            {saved && <p className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-2 animate-fade-in">Profile updated successfully!</p>}
          </div>

          {/* Core Registered Account Address (Always Read-Only) */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1.5">
              Email Address
            </label>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-100/80 dark:border-gray-800 px-3.5 py-2.5 rounded-xl cursor-not-allowed">
              {user?.email}
            </p>
            {user?.auth_provider === 'google' && (
              <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Managed securely by Google Enterprise OpenID
              </p>
            )}
          </div>
        </div>

        {/* Administrative Data Rows Block */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-6 shadow-sm transition-all duration-300">
          <h2 className="text-xs font-bold tracking-wide text-gray-400 dark:text-gray-500 uppercase mb-4">
            System Account Details
          </h2>
          <div className="space-y-3.5 text-sm font-medium">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-400 dark:text-gray-500">Member Verification Timestamp</span>
              <span className="text-gray-800 dark:text-gray-200 font-bold tracking-tight">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric'
                }) : '--'}
              </span>
            </div>
            <div className="w-full border-t border-gray-100 dark:border-gray-800/60" />
            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-400 dark:text-gray-500">Sign-In Gateway Protocol</span>
              <span className="text-gray-800 dark:text-gray-200 font-bold capitalize tracking-tight">{user?.auth_provider} Key</span>
            </div>
          </div>
        </div>

        {/* Main Application Exit Action Button */}
        <button
          onClick={logout}
          className="w-full text-sm font-bold text-rose-500 dark:text-rose-400 border border-rose-200/60 dark:border-rose-950/40 bg-white dark:bg-gray-900/40 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl py-3 shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99]"
        >
          End Session & Sign Out
        </button>

      </div>
    </div>
  )
}