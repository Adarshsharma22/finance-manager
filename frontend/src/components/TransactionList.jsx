import { deleteTransaction } from '../api'

export default function TransactionList({ transactions, onDeleted }) {
  const fmt = (n) => '₹' + parseFloat(n).toLocaleString('en-IN')

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this transaction?')) return
    try {
      await deleteTransaction(id)
      onDeleted()
    } catch {
      alert('Could not delete transaction.')
    }
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-colors duration-300">
        <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200 uppercase mb-4">
          Recent Transactions
        </h2>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">No records found for this period.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200 uppercase">
          Recent Transactions
        </h2>
        <span className="text-xs font-semibold bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full border border-gray-100 dark:border-gray-700/50">
          {transactions.length} total
        </span>
      </div>

      <div className="-mx-2 divide-y divide-gray-100/70 dark:divide-gray-800/50">
        {transactions.map(t => {
          const isIncome = t.type === 'income'
          
          return (
            <div
              key={t.id}
              className="flex items-center gap-4 px-2 py-3.5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 rounded-xl transition-all duration-200 group"
            >
              {/* Category indicator ring */}
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-4 ring-offset-0"
                style={{ 
                  background: t.category.color,
                  '--tw-ring-color': `${t.category.color}15`
                }}
              />

              {/* Text Meta Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-200 truncate">
                  {t.note || t.category.name}
                </p>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                  {t.note ? `${t.category.name} · ` : ''}{formatDate(t.date)}
                </p>
              </div>

              {/* Numerical Transaction Values */}
              <div className="text-right flex-shrink-0">
                <span className={`text-sm font-bold tracking-tight ${
                  isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
                }`}>
                  {isIncome ? '+' : '−'}{fmt(t.amount)}
                </span>
              </div>

              {/* Inline Action Triggers */}
              <div className="w-6 h-6 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(t.id)}
                  className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-md text-gray-300 hover:text-rose-500 dark:text-gray-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-150"
                  title="Delete transaction"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}