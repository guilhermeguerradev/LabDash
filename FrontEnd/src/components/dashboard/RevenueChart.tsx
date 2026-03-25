import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import api from '@/services/api'

interface RevenueChartProps {
  title: string
  endpoint: string
  queryKey: string
  color: string
  dataKey?: string  // ← adicionar
}

function RevenueChart({ title, endpoint, queryKey, color, dataKey = 'totalValue' }: RevenueChartProps) {
  const { data, isLoading } = useQuery<{ date: string; totalValue: number }[]>({
    queryKey: [queryKey],
    queryFn: async () => {
    const response = await api.get(endpoint)
    console.log('Dados do gráfico:', response.data)

    // Pega o array correto dependendo do endpoint
    if (response.data.orders) return response.data.orders
    if (response.data.sales) return response.data.sales
    return []
    },
  })

  if (isLoading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-64 animate-pulse" />
    )
  }

  // Garante que chartData sempre é um array
  const chartData = Array.isArray(data) ? data : []

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-white font-semibold text-sm mb-6">{title}</h2>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>
              value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0a0f1e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
            }}
            formatter={(value) => [
              Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
              'Total'
            ]}
          />
          <Line
            type="monotone"
            dataKey={dataKey}  // ← trocar de "totalValue" para dataKey
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
            />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart