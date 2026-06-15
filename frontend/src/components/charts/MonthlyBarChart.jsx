import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN')

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl p-3 shadow-lg text-sm transition-colors duration-300">
      <p className="font-bold text-gray-800 dark:text-gray-200 mb-1.5">{label}</p>
      <div className="space-y-1">
        {payload.map(p => (
          <p key={p.name} className="text-xs font-semibold flex items-center gap-2" style={{ color: p.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
            {p.name}: <span className="font-bold tracking-tight">{fmt(p.value)}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default function MonthlyBarChart({ data }) {
  const chartData = (data || []).map(d => ({
    month: MONTHS[d.month - 1],
    Income: parseFloat(d.total_income),
    Expense: parseFloat(d.total_expense),
  }))

  const fmt = (n) => {
    const absN = Math.abs(n)
    const sign = n < 0 ? '-₹' : '₹'

    if (absN >= 100000) return sign + (absN / 100000).toFixed(1) + 'L'
    if (absN >= 1000)   return sign + (absN / 1000).toFixed(0) + 'K'
    return sign + absN
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-colors duration-300">
      
      {/* Title Header Banner */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200 uppercase">
          Income vs Expenses {data[0]?.year ? `— ${data[0].year}` : ''}
        </h2>
      </div>

      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">No comparative data available for this year timeline.</p>
        </div>
      ) : (
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={5} barCategoryGap="28%" margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              
              {/* Responsive Background Alignment Lines */}
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
                dy={8}
              />
              
              <YAxis
                tickFormatter={fmt}
                tick={{ fontSize: 11, className: 'fill-gray-400 dark:fill-gray-500 font-medium' }}
                axisLine={false}
                tickLine={false}
                width={55}
                dx={-2}
              />
              
              {/* Hover Cursor Tooltip Integration */}
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ className: 'fill-gray-50/50 dark:fill-gray-800/20' }} 
              />
              
              {/* Normalized Custom Legend Layout */}
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1.5 transition-colors">
                    {value}
                  </span>
                )}
              />
              
              {/* Value Bars with Premium Structural Radius */}
              <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} className="cursor-pointer hover:opacity-90 transition-opacity" />
              <Bar dataKey="Expense" fill="#f43f5e" radius={[6, 6, 0, 0]} className="cursor-pointer hover:opacity-90 transition-opacity" />
              
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}