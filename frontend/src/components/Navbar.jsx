import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Navbar({ month, year, onMonthChange, onYearChange }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December']

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">₹</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Finance Manager</h1>
        </div>

        <div className="flex items-center gap-3">
          <select value={month} onChange={e => onMonthChange(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
            {months.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
          </select>
          <select value={year} onChange={e => onYearChange(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
            {[2024,2025,2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          {/* Profile avatar */}
          <Link to="/profile">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100 hover:ring-indigo-300 transition-all" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center ring-2 ring-indigo-100 hover:ring-indigo-300 transition-all cursor-pointer">
                <span className="text-indigo-700 text-xs font-semibold">{initials}</span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}