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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Top Application Navigation Block */}
      <Navbar
        month={month} 
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />

      {/* Main Core Navigation Tab Bar Strip */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900/60 sticky top-[61px] z-40 backdrop-blur-md bg-white/90 dark:bg-gray-950/90 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 flex gap-2">
          {['dashboard', 'analytics'].map(t => {
            const isActive = tab === t
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all relative -mb-px ${
                  isActive
                    ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-extrabold'
                    : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t === 'dashboard' ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                      </svg>
                      Dashboard
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                      Analytics Trends
                    </>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Container Workspaces Layout */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Core Dashboard Tab Loading Skeleton Pipeline */}
        {loading && tab === 'dashboard' ? (
          <div className="space-y-6 animate-pulse">
            {/* Top row stats card shell items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gray-100/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 rounded-2xl" />
              ))}
            </div>
            {/* Middle split section grid placeholder shells */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="h-[430px] lg:col-span-5 bg-gray-100/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 rounded-2xl" />
              <div className="h-[430px] lg:col-span-7 bg-gray-100/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 rounded-2xl" />
            </div>
          </div>
        ) : tab === 'dashboard' ? (
          <>
            {/* Live Populated Financial Overview Grid Component Row */}
            <StatsRow transactions={transactions} />
            
            {/* Split Core Workspace Content Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 items-start">
              {/* Context Submission Input Widget Form */}
              <div className="lg:col-span-5 w-full">
                <TransactionForm categories={categories} onAdded={loadData} />
              </div>
              
              {/* Dynamic Interactive Historical Table Listing Logs */}
              <div className="lg:col-span-7 w-full">
                <TransactionList transactions={transactions} onDeleted={loadData} />
              </div>
            </div>
            
            {/* Bottom Section Budget Visual Bars Tracking Suite */}
            <BudgetTracker budgets={budgets} />
          </>
        ) : (
          /* Segmented Analytics Graphical Aggregations Panel Page View */
          <Analytics month={month} year={year} />
        )}
      </main>
    </div>
  )
}