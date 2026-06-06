import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 text-sm">
      <p className="font-medium text-gray-700">{d.category_name}</p>
      <p className="text-gray-500">
        ₹{Number(d.total).toLocaleString('en-IN')} · {d.percentage}%
      </p>
    </div>
  )
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
  if (percentage < 5) return null   // skip tiny labels
  const RAD = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RAD)
  const y = cy + r * Math.sin(-midAngle * RAD)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle"
      dominantBaseline="central" fontSize={11} fontWeight={500}>
      {percentage}%
    </text>
  )
}

export default function CategoryPieChart({ data, month, year }) {
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec']

  const total = data.reduce((sum, d) => sum + parseFloat(d.total), 0)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Expenses by category
        </h2>
        <span className="text-xs text-gray-400">
          {MONTHS[month - 1]} {year}
        </span>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">
          No expense data this month.
        </p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category_name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                labelLine={false}
                label={<CustomLabel />}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Centre total label */}
          <div className="-mt-2 mb-4 text-center">
            <p className="text-xs text-gray-400">Total spent</p>
            <p className="text-lg font-semibold text-gray-800">
              ₹{total.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Legend rows */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            {data.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: d.color }} />
                  <span className="text-sm text-gray-600">{d.category_name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{d.percentage}%</span>
                  <span className="text-sm font-medium text-gray-700">
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
