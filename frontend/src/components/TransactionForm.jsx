import { useState } from 'react'
import { createTransaction } from '../api'

export default function TransactionForm({ categories, onAdded }) {
  const [form, setForm] = useState({
    amount: '',
    category_id: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (type) => {
    if (!form.amount || !form.category_id || !form.date) {
      setError('Please fill in amount, category, and date.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await createTransaction({ ...form, type, amount: parseFloat(form.amount) })
      setForm({ amount: '', category_id: '', note: '', date: new Date().toISOString().split('T')[0] })
      onAdded()
    } catch (err) {
      setError('Failed to add transaction. Is your backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-colors duration-300">
      <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200 uppercase mb-5">
        Add Transaction
      </h2>

      {error && (
        <div className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 rounded-r-lg px-3 py-2.5 mb-4 animate-fade-in">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1.5">
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1.5">
            Category
          </label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 cursor-pointer"
          >
            <option value="" className="dark:bg-gray-900 text-gray-400">Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id} className="dark:bg-gray-900">{c.name}</option>
            ))}
          </select>
        </div>

        {/* Optional Memo/Note */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1.5">
            Note <span className="text-[10px] font-normal normal-case text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="e.g. Groceries at DMart"
            className="w-full text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
          />
        </div>

        {/* Transaction Calendar Date */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1.5">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl px-3.5 py-2.5 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
      </div>

      {/* Direct Submission Split Action Grid */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button
          onClick={() => submit('income')}
          disabled={loading}
          className="bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]"
        >
          {loading ? 'Processing...' : '+ Income'}
        </button>
        <button
          onClick={() => submit('expense')}
          disabled={loading}
          className="bg-rose-50 hover:bg-rose-100/80 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]"
        >
          {loading ? 'Processing...' : '− Expense'}
        </button>
      </div>
    </div>
  )
}