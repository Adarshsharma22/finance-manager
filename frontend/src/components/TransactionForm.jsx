import { useState } from 'react'
import { createTransaction } from '../api'

export default function TransactionForm({ categories, onAdded }) {
  const [form, setForm] = useState({
    amount: '',
    category_id: '',
    note: '',
    date: new Date().toISOString().split('T')[0],  // today's date
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
      onAdded()   // refresh the transaction list
    } catch (err) {
      setError('Failed to add transaction. Is your backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Add transaction</h2>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-3">{error}</p>
      )}

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Category</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Note (optional)</label>
          <input
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="e.g. Groceries at DMart"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={() => submit('income')}
          disabled={loading}
          className="bg-green-50 text-green-700 border border-green-200 rounded-lg py-2 text-sm font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
        >
          + Income
        </button>
        <button
          onClick={() => submit('expense')}
          disabled={loading}
          className="bg-red-50 text-red-600 border border-red-200 rounded-lg py-2 text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          − Expense
        </button>
      </div>
    </div>
  )
}