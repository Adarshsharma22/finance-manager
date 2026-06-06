import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                'Jul','Aug','Sep','Oct','Nov','Dec']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN')

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 text-sm shadow-sm">
      <p className="font-medium text-gray-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function MonthlyBarChart({ data }) {
  const chartData = data.map(d => ({
    month: MONTHS[d.month - 1],
    Income:  parseFloat(d.total_income),
    Expense: parseFloat(d.total_expense),
  }))

  const fmt = (n) => {
    if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L'
    if (n >= 1000)   return '₹' + (n / 1000).toFixed(0) + 'K'
    return '₹' + n
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-6">
        Income vs expenses — {data[0]?.year ?? ''}
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">
          No data available for this year.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
              iconType="circle"
              iconSize={8}
            />
            <Bar dataKey="Income"  fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expense" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}