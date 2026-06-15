import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, CalendarDays } from 'lucide-react'

export default function Navbar({ month, year, onMonthChange, onYearChange }) {
  const { dark, toggleTheme } = useTheme()
  const { user } = useAuth()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <nav className="bg-white/90 dark:bg-gray-950/90 border-b border-gray-100 dark:border-gray-900 px-6 py-3.5 sticky top-0 z-50 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo Identity */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <span className="text-white text-base font-extrabold">₹</span>
          </div>
          <h1 className="text-sm font-black tracking-tight text-gray-900 dark:text-white uppercase group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
            Finance Manager
          </h1>
        </Link>

        {/* Dynamic Navigation Controls Workspace */}
        <div className="flex items-center gap-4">
          
          {/* Calendar Select Wrapper Pill */}
          <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-900 p-1 rounded-xl border border-gray-100 dark:border-gray-800/80">
            <div className="pl-2 text-gray-400 dark:text-gray-500 hidden sm:block">
              <CalendarDays className="w-3.5 h-3.5" />
            </div>
            
            {/* Month Selector */}
            <select 
              value={month} 
              onChange={e => onMonthChange(Number(e.target.value))}
              className="text-xs font-bold bg-transparent text-gray-700 dark:text-gray-300 px-2 py-1.5 rounded-lg border-0 focus:ring-4 focus:ring-indigo-500/10 outline-none cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
            >
              {months.map((m, i) => (
                <option key={i} value={i+1} className="dark:bg-gray-950 bg-white font-medium">
                  {m}
                </option>
              ))}
            </select>

            {/* Year Selector */}
            <select 
              value={year} 
              onChange={e => onYearChange(Number(e.target.value))}
              className="text-xs font-bold bg-transparent text-gray-700 dark:text-gray-300 px-2 py-1.5 rounded-lg border-0 focus:ring-4 focus:ring-indigo-500/10 outline-none cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
            >
              {[2024, 2025, 2026].map(y => (
                <option key={y} value={y} className="dark:bg-gray-950 bg-white font-medium">
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Premium Theme Switcher Engine */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-200/60 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm  active:scale-95 transition-all duration-200"
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? (
              <Sun className="w-4 h-4 text-amber-500 animate-fade-in" strokeWidth={2.5} />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 animate-fade-in" strokeWidth={2.5} />
            )}
          </button>

          {/* Vertical Structural Divider */}
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-800 hidden sm:block" />

          {/* User Account Navigation Hub */}
          <Link to="/profile" className="relative group flex-shrink-0">
            {user?.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-500 dark:group-hover:ring-indigo-400 transition-all duration-200 shadow-sm" 
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center ring-2 ring-transparent group-hover:ring-indigo-500 dark:group-hover:ring-indigo-400 shadow-inner transition-all duration-200 cursor-pointer">
                <span className="text-indigo-600 dark:text-indigo-400 text-xs font-black tracking-wider">
                  {initials || '??'}
                </span>
              </div>
            )}
          </Link>

        </div>
      </div>
    </nav>
  )
}