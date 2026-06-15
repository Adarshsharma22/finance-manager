import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer
} from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl p-3 shadow-lg text-sm transition-colors duration-300">
      <p className="font-bold text-gray-800 dark:text-gray-200 mb-0.5">{d.category_name}</p>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        ₹{Number(d.total).toLocaleString('en-IN')} · <span className="font-semibold text-indigo-500 dark:text-indigo-400">{d.percentage}%</span>
      </p>
    </div>
  )
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
  if (percentage < 5) return null // skip tiny labels
  const RAD = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RAD)
  const y = cy + r * Math.sin(-midAngle * RAD)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle"
      dominantBaseline="central" fontSize={11} fontWeight={600}>
      {percentage}%
    </text>
  )
}

export default function CategoryPieChart({ data, month, year }) {
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec']

  const total = (data || []).reduce((sum, d) => sum + parseFloat(d.total), 0)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-colors duration-300">
      
      {/* Header Info Banner */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200 uppercase">
          Expenses by Category
        </h2>
        <span className="text-xs font-semibold bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full border border-gray-100 dark:border-gray-700/50">
          {MONTHS[month - 1]} {year}
        </span>
      </div>

      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">No expense records logged for this month.</p>
        </div>
      ) : (
        <>
          {/* Chart Wrapper Container with Centered Absolute Data Labels */}
          <div className="relative flex items-center justify-center h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="total"
                  nameKey="category_name"
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={100}
                  paddingAngle={3}
                  labelLine={false}
                  label={<CustomLabel />}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} className="focus:outline-none transition-opacity duration-200 hover:opacity-90 cursor-pointer" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Center Donut Summary */}
            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Total Spent
              </p>
              <p className="text-xl font-black tracking-tight text-gray-800 dark:text-white mt-0.5">
                ₹{total.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Premium Formatted Legend Rows */}
          <div className="space-y-2.5 border-t border-gray-100 dark:border-gray-800/60 pt-4 mt-2">
            {data.map((d, i) => (
              <div key={i} className="flex items-center justify-between group px-1 py-0.5 rounded-lg hover:bg-gray-50/40 dark:hover:bg-gray-800/20 transition-colors">
                
                {/* Left Side Identity */}
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-4 ring-offset-0"
                    style={{ 
                      background: d.color,
                      '--tw-ring-color': `${d.color}15`
                    }} 
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {d.category_name}
                  </span>
                </div>
                
                {/* Right Side Quantitative Metrics */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/60 px-1.5 py-0.5 rounded-md border border-gray-100/50 dark:border-gray-700/30">
                    {d.percentage}%
                  </span>
                  <span className="text-sm font-bold tracking-tight text-gray-800 dark:text-gray-200">
                    ₹{Number(d.total).toLocaleString('en-IN')}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}