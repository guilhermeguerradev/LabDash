import { useState, useEffect, useCallback } from 'react'
import { FileText, Truck, ShoppingCart, DollarSign } from 'lucide-react'
import ReportModal from '@/components/dashboard/ReportModal'
import StatsCard from '@/components/dashboard/StatsCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import api from '@/services/api'
import type { FinancialReport } from '@/types'

function DashboardPage() {
  const today = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Sao_Paulo'
  })
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<FinancialReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  function formatDate(date: string) {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  function getPeriodText() {
    if (startDate === endDate) {
      return `Resumo do dia ${formatDate(startDate)}`
    }
    return `Resumo de ${formatDate(startDate)} até ${formatDate(endDate)}`
  }

  function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const fetchFinancial = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.post('/reports/financial', {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      })
      console.log(startDate)
      console.log(endDate)
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setIsLoading(false)
    }
  }, [startDate, endDate])

  useEffect(() => {
    fetchFinancial()
  }, [fetchFinancial])

  function handleGenerate(start: string, end: string) {
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <div className="space-y-8">

      {/* Título + Botão */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">{getPeriodText()}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-green-400/10 border border-green-400/20 text-green-400 text-xs sm:text-sm font-medium rounded-xl hover:bg-green-400/20 transition-all duration-200 whitespace-nowrap shrink-0"
        >
          <FileText size={14} />
          <span className="hidden sm:inline">Gerar Relatório</span>
          <span className="sm:hidden">Relatório</span>
        </button>
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            title="Total Geral"
            value={formatCurrency(data?.totalRevenue ?? 0)}
            icon={DollarSign}
            iconColor="text-green-400"
            glowColor="rgba(74,222,128,0.15)"
          />
          <StatsCard
            title="Total Entregas"
            value={formatCurrency(data?.totalOrders ?? 0)}
            icon={Truck}
            iconColor="text-cyan-400"
            glowColor="rgba(34,211,238,0.15)"
          />
          <StatsCard
            title="Total Vendas Balcão"
            value={formatCurrency(data?.totalSales ?? 0)}
            icon={ShoppingCart}
            iconColor="text-purple-400"
            glowColor="rgba(192,132,252,0.15)"
          />
        </div>
      )}

      {/* Gráficos */}
      <RevenueChart
        title="Entregas — Últimos 7 dias"
        endpoint="/reports/orders/last-7"
        color="#22d3ee"
      />

      <RevenueChart
        title="Vendas Balcão — Últimos 7 dias"
        endpoint="/reports/sales/last-7"
        color="#c084fc"
        dataKey="totalDay"
      />

      {/* Modal */}
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerate}
      />

    </div>
  )
}

export default DashboardPage