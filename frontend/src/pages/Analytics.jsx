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

  // Enhanced pulse skeleton frame matching real component heights
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Monthly bar chart placeholder */}
        <div className="h-[340px] bg-gray-100/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl w-full" />
        
        {/* Bottom charts placeholder grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="h-[390px] lg:col-span-5 bg-gray-100/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl" />
          <div className="h-[390px] lg:col-span-7 bg-gray-100/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top row — Bar chart taking full container width */}
      <div className="w-full">
        <MonthlyBarChart data={monthly} />
      </div>

      {/* Bottom row — Re-architected side-by-side grid using 12-column system */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Pie Chart container */}
        <div className="lg:col-span-5 w-full">
          <CategoryPieChart data={byCategory} month={month} year={year} />
        </div>

        {/* Trend Chart container */}
        <div className="lg:col-span-7 w-full">
          <BalanceTrendChart data={monthly} />
        </div>
      </div>
    </div>
  )
}