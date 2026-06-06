import { useState, useEffect } from 'react'
import MonthlyBarChart    from '../components/charts/MonthlyBarChart'
import CategoryPieChart   from '../components/charts/CategoryPieChart'
import BalanceTrendChart  from '../components/charts/BalanceTrendChart'
import { getMonthlyReport, getCategoryReport } from '../api'

export default function Analytics({ month, year }) {
  const [monthly,  setMonthly]  = useState([])
  const [byCategory, setByCategory] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [mRes, cRes] = await Promise.all([
          getMonthlyReport(year),
          getCategoryReport(month, year),
        ])
        setMonthly(mRes.data)
        setByCategory(cRes.data)
      } catch (err) {
        console.error('Failed to load analytics:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [month, year])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-sm text-gray-500">Loading charts...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top row — bar chart full width */}
      <MonthlyBarChart data={monthly} />

      {/* Bottom row — pie + trend side by side */}
      <div className="grid grid-cols-[1fr_1.4fr] gap-6">
        <CategoryPieChart data={byCategory} month={month} year={year} />
        <BalanceTrendChart data={monthly} />
      </div>
    </div>
  )
}
