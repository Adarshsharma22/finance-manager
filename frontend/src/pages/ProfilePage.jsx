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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">

        <h1 className="text-xl font-semibold text-gray-900 mb-8">Profile</h1>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">

          {/* Avatar + name */}
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-700 text-xl font-semibold">{initials}</span>
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900 text-lg">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                {user?.auth_provider === 'google' ? 'Google account' : 'Email account'}
              </span>
            </div>
          </div>

          {/* Edit name */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-600 block mb-1.5">Display name</label>
            {editing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSave}
                  className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditing(false); setName(user?.name) }}
                  className="text-sm border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">{user?.name}</span>
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            {saved && <p className="text-xs text-green-600 mt-1">Saved!</p>}
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">Email</label>
            <p className="text-sm text-gray-500">{user?.email}</p>
            {user?.auth_provider === 'google' && (
              <p className="text-xs text-gray-400 mt-1">
                Managed by Google — can't be changed here
              </p>
            )}
          </div>
        </div>

        {/* Account info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Account info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Member since</span>
              <span className="text-gray-800">
                {new Date(user?.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Login method</span>
              <span className="text-gray-800 capitalize">{user?.auth_provider}</span>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={logout}
          className="w-full text-sm text-red-500 border border-red-200 rounded-xl py-3 hover:bg-red-50 transition-colors"
        >
          Sign out
        </button>

      </div>
    </div>
  )
}