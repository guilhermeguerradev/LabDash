import { useState } from 'react'
import { FileText, Truck, ShoppingCart, DollarSign } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import ReportModal from '@/components/dashboard/ReportModal'
import StatsCard from '@/components/dashboard/StatsCard'
import api from '@/services/api'
import type { FinancialReport } from '@/types'

function DashboardPage() {
  const today = new Date().toISOString().split('T')[0]
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  // Busca os dados financeiros do período
  const { data, isLoading } = useQuery<FinancialReport>({
    queryKey: ['financial', startDate, endDate],
    queryFn: async () => {
      const response = await api.post('/reports/financial', {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      })
      return response.data
    },
  })

  function handleGenerate(start: string, end: string) {
    setStartDate(start)
    setEndDate(end)
  }

  function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className="space-y-8">

      {/* Título + Botão */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">{getPeriodText()}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium rounded-xl hover:bg-green-400/20 transition-all duration-200"
        >
          <FileText size={16} />
          Gerar Relatório
        </button>
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
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