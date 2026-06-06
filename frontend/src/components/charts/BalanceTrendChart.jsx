import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                'Jul','Aug','Sep','Oct','Nov','Dec']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const val = payload[0].value
  const isPos = val >= 0
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 text-sm">
      <p className="text-gray-500 mb-1">{label}</p>
      <p className={`font-semibold ${isPos ? 'text-green-600' : 'text-red-500'}`}>
        {isPos ? '+' : ''}₹{Number(val).toLocaleString('en-IN')}
      </p>
    </div>
  )
}

export default function BalanceTrendChart({ data }) {
  const chartData = data.map(d => ({
    month: MONTHS[d.month - 1],
    Balance: parseFloat(d.balance),
  }))

  const fmt = (n) => {
    if (Math.abs(n) >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L'
    if (Math.abs(n) >= 1000)   return '₹' + (n / 1000).toFixed(0) + 'K'
    return '₹' + n
  }

  const hasNegative = chartData.some(d => d.Balance < 0)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-6">
        Monthly balance trend
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">
          No data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tickFormatter={fmt}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false} tickLine={false}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} />
            {hasNegative && (
              <ReferenceLine y={0} stroke="#e5e7eb" strokeDasharray="4 4" />
            )}
            <Area
              type="monotone"
              dataKey="Balance"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#balGrad)"
              dot={{ fill: '#6366f1', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
