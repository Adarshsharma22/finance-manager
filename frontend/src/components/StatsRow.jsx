export default function StatsRow({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const balance = income - expense

  const fmt = (n) => '₹' + n.toLocaleString('en-IN')

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm text-gray-500 mb-1">Total income</p>
        <p className="text-2xl font-semibold text-green-600">{fmt(income)}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm text-gray-500 mb-1">Total expenses</p>
        <p className="text-2xl font-semibold text-red-500">{fmt(expense)}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm text-gray-500 mb-1">Balance</p>
        <p className={`text-2xl font-semibold ${balance >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
          {fmt(balance)}
        </p>
      </div>
    </div>
  )
}