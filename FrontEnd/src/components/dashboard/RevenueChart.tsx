import { useState, useEffect, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import api from '@/services/api'

interface RevenueChartProps {
  title: string
  endpoint: string
  color: string
}

interface ChartPoint {
  date: string
  totalValue: number
}

function formatToBR(date: string): string {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

function RevenueChart({ title, endpoint, color }: RevenueChartProps) {
  const [chartData, setChartData] = useState<ChartPoint[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get(endpoint)

      let raw: ChartPoint[] = []
      if (response.data.orders) raw = response.data.orders
      else if (response.data.sales) raw = response.data.sales

      setChartData(raw.map(item => ({ ...item, date: formatToBR(item.date) })))
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
        <LineChart data={chartData} margin={{ left: -10, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={90}
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
              fontSize: '13px',
            }}
            formatter={(value) => [
              Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
              'Total',
            ]}
          />
          <Line
            type="monotone"
            dataKey="totalValue"
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