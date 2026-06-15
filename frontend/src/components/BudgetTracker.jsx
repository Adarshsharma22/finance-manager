export default function BudgetTracker({ budgets }) {
  const fmt = (n) => '₹' + parseFloat(n).toLocaleString('en-IN')

  if (!budgets || budgets.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-colors duration-300">
        <h2 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200 uppercase mb-3">
          Budget Tracker
        </h2>
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">No active budgets set for this period.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200 uppercase">
          Budget Tracker
        </h2>
        <span className="text-xs bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full border border-gray-100 dark:border-gray-700/50">
          {budgets.length} {budgets.length === 1 ? 'Category' : 'Categories'}
        </span>
      </div>

      <div className="space-y-5">
        {budgets.map(b => {
          const pct = Math.min((b.spent / b.limit_amount) * 100, 100)
          const isOver = b.spent > b.limit_amount

          return (
            <div key={b.id} className="group">
              <div className="flex items-end justify-between mb-2">
                {/* Category Identity */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full ring-4 ring-offset-0 transition-all group-hover:scale-110"
                    style={{ 
                      background: b.category.color,
                      '--tw-ring-color': `${b.category.color}20` 
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {b.category.name}
                  </span>
                </div>

                {/* Pricing / Alert Info */}
                <div className="text-right">
                  <span className={`text-xs font-semibold tracking-tight ${
                    isOver ? 'text-red-500 dark:text-red-400 animate-pulse' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {fmt(b.spent)}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">
                    {' '}/ {fmt(b.limit_amount)}
                  </span>
                  {isOver && (
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-red-500 dark:text-red-400 mt-0.5">
                      ⚠ Over Limit
                    </span>
                  )}
                </div>
              </div>

              {/* Enhanced Progress Bar Track */}
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner relative">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: isOver 
                      ? 'linear-gradient(90deg, #ef4444, #f87171)' 
                      : b.category.color
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}