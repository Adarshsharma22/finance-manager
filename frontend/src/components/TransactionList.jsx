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

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent transactions</h2>
        <p className="text-sm text-gray-400 text-center py-6">No transactions yet this month.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Recent transactions
        <span className="ml-2 text-xs font-normal text-gray-400">
          ({transactions.length})
        </span>
      </h2>

      <div className="space-y-1">
        {transactions.map(t => (
          <div
            key={t.id}
            className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0 group"
          >
            {/* Category color dot */}
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: t.category.color }}
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 truncate">
                {t.note || t.category.name}
              </p>
              <p className="text-xs text-gray-400">
                {t.category.name} · {formatDate(t.date)}
              </p>
            </div>

            {/* Amount */}
            <span className={`text-sm font-medium ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
              {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
            </span>

            {/* Delete button (shows on hover) */}
            <button
              onClick={() => handleDelete(t.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all text-xs px-1"
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
