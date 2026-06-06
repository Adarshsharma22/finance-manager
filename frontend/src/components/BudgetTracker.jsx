export default function BudgetTracker({ budgets }) {
  const fmt = (n) => '₹' + parseFloat(n).toLocaleString('en-IN')

  if (budgets.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Budget tracker</h2>
        <p className="text-sm text-gray-400">No budgets set yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Budget tracker</h2>
      <div className="space-y-4">
        {budgets.map(b => {
          const pct = Math.min((b.spent / b.limit_amount) * 100, 100)
          const isOver = b.spent > b.limit_amount

          return (
            <div key={b.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: b.category.color }}
                  />
                  <span className="text-sm text-gray-700">{b.category.name}</span>
                </div>
                <span className={`text-xs font-medium ${isOver ? 'text-red-500' : 'text-gray-500'}`}>
                  {fmt(b.spent)} / {fmt(b.limit_amount)}
                  {isOver && ' ⚠ Over budget'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: isOver ? '#ef4444' : b.category.color
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
