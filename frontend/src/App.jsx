import { useState, useEffect, useCallback } from 'react'
import Navbar          from './components/Navbar'
import StatsRow        from './components/StatsRow'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import BudgetTracker   from './components/BudgetTracker'
import Analytics       from './pages/Analytics'
import { getTransactions, getCategories, getBudgets } from './api'

export default function App() {
  const now = new Date()
  const [month,  setMonth]  = useState(now.getMonth() + 1)
  const [year,   setYear]   = useState(now.getFullYear())
  const [tab,    setTab]    = useState('dashboard')  // 'dashboard' | 'analytics'

  const [transactions, setTransactions] = useState([])
  const [categories,   setCategories]   = useState([])
  const [budgets,      setBudgets]      = useState([])
  const [loading,      setLoading]      = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [txRes, catRes, budRes] = await Promise.all([
        getTransactions({ month, year }),
        getCategories(),
        getBudgets(),
      ])
      setTransactions(txRes.data)
      setCategories(catRes.data)
      setBudgets(budRes.data)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }, [month, year])

  useEffect(() => { loadData() }, [loadData])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        month={month} year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex gap-1">
          {['dashboard', 'analytics'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                tab === t
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'dashboard' ? '⊞  Dashboard' : '↗  Analytics'}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading && tab === 'dashboard' ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-sm text-gray-500">Loading...</span>
          </div>
        ) : tab === 'dashboard' ? (
          <>
            <StatsRow transactions={transactions} />
            <div className="grid grid-cols-[1fr_1.5fr] gap-6 mb-6">
              <TransactionForm categories={categories} onAdded={loadData} />
              <TransactionList transactions={transactions} onDeleted={loadData} />
            </div>
            <BudgetTracker budgets={budgets} />
          </>
        ) : (
          <Analytics month={month} year={year} />
        )}
      </main>
    </div>
  )
}