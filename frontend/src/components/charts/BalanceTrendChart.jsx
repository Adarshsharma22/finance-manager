import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const val = payload[0].value
  const isPos = val >= 0
  
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl p-3 shadow-lg text-sm transition-colors duration-300">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">{label}</p>
      <p className={`font-bold tracking-tight ${isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
        {isPos ? '+' : '-'}₹{Math.abs(Number(val)).toLocaleString('en-IN')}
      </p>
    </div>
  )
}

export default function BalanceTrendChart({ data }) {
  const chartData = (data || []).map(d => ({
    month: MONTHS[d.month - 1],
    Balance: parseFloat(d.balance),
  }))

  const fmt = (n) => {
    const isNegative = n < 0
    const absN = Math.abs(n)
    const sign = isNegative ? '-₹' : '₹'

    if (absN >= 100000) return sign + (absN / 100000).toFixed(1) + 'L'
    if (absN >= 1000)   return sign + (absN / 1000).toFixed(0) + 'K'
    return sign + absN
  }

  const hasNegative = chartData.some(d => d.Balance < 0)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200 uppercase">
          Monthly Balance Trend
        </h2>
      </div>

      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">No trend data available for this timeline.</p>
        </div>
      ) : (
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="4 4" 
                stroke="currentColor" 
                className="text-gray-100 dark:text-gray-800/40" 
                vertical={false} 
              />
              
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, className: 'fill-gray-400 dark:fill-gray-500 font-medium' }}
                axisLine={false} 
                tickLine={false}
                dy={10}
              />
              
              <YAxis
                tickFormatter={fmt}
                tick={{ fontSize: 11, className: 'fill-gray-400 dark:fill-gray-500 font-medium' }}
                axisLine={false} 
                tickLine={false}
                width={55}
                dx={-2}
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.4 }} 
              />
              
              {hasNegative && (
                <ReferenceLine 
                  y={0} 
                  stroke="currentColor" 
                  className="text-gray-200 dark:text-gray-700/60" 
                  strokeDasharray="4 4" 
                />
              )}
              
              <Area
                type="monotone"
                dataKey="Balance"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#balGrad)"
                dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }}
                activeDot={{ fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2, r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}