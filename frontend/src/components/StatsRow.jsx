export default function StatsRow({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const balance = income - expense

  const fmt = (n) => {
    const isNegative = n < 0
    const absoluteValue = Math.abs(n)
    return (isNegative ? '-₹' : '₹') + absoluteValue.toLocaleString('en-IN')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      
      {/* Income Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/60 p-5 shadow-sm transition-all duration-300 flex items-center justify-between group hover:shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
            Total Income
          </p>
          <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 transition-colors">
            {fmt(income)}
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </div>

      {/* Expense Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/60 p-5 shadow-sm transition-all duration-300 flex items-center justify-between group hover:shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
            Total Expenses
          </p>
          <p className="text-2xl font-bold tracking-tight text-rose-500 dark:text-rose-400 transition-colors">
            {fmt(expense)}
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </div>
      </div>

      {/* Balance Card */}
      <div className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 flex items-center justify-between group hover:shadow-md ${
        balance >= 0 
          ? 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800/60' 
          : 'bg-rose-50/30 dark:bg-rose-950/10 border-rose-100 dark:border-rose-950/30'
      }`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
            Net Balance
          </p>
          <p className={`text-2xl font-bold tracking-tight transition-colors ${
            balance >= 0 ? 'text-gray-900 dark:text-white' : 'text-rose-600 dark:text-rose-400'
          }`}>
            {fmt(balance)}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${
          balance >= 0 
            ? 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400' 
            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400'
        }`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
      </div>

    </div>
  )
}