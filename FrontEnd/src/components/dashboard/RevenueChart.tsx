import { useState, useEffect, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import api from '@/services/api'

interface RevenueChartProps {
  title: string
  endpoint: string
  color: string
  dataKey?: string
}

function RevenueChart({ title, endpoint, color, dataKey = 'totalValue' }: RevenueChartProps) {
  const [chartData, setChartData] = useState<{ date: string; totalValue: number }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get(endpoint)
      if (response.data.orders) setChartData(response.data.orders)
      else if (response.data.sales) setChartData(response.data.sales)
      else setChartData([])
    } catch (error) {
      console.error('Erro ao buscar dados do gráfico:', error)
      setChartData([])
    } finally {
      setIsLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-64 animate-pulse" />
    )
  }

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
            dataKey={dataKey}
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