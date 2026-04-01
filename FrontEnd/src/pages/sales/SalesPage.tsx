import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import type { DailyCounterSale } from '@/types'
import SalesTable from '@/components/sales/SalesTable'
import SalesFilter from '@/components/sales/SalesFilter'
import SalesModal from '@/components/sales/SalesModal'

function SalesPage() {
  const [sales, setSales] = useState<DailyCounterSale[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<DailyCounterSale | null>(null)

  const role = useAuthStore((state) => state.role)
  const isAdmin = role === 'ADMIN'

  function handleEdit(sale: DailyCounterSale) {
    setSelectedSale(sale)
    setIsModalOpen(true)
  }

  const fetchSales = async (params?: { date?: string }) => {
    try {
      setIsLoading(true)

      let url = '/counter-sales'

      if (params?.date) {
        url = `/counter-sales/search?date=${params.date}`
      }

      const response = await api.get(url)
      setSales(Array.isArray(response.data) ? response.data : [response.data])
    } catch (error) {
      console.error('Erro ao buscar vendas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSales()
  }, [])

  function handleFilter(params: { date?: string }) {
    fetchSales(params)
  }

  async function handleDelete(id: number) {
    if (!confirm('Deseja deletar esta venda?')) return
    try {
      await api.delete(`/counter-sales/${id}`)
      fetchSales()
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  return (
    <div className="space-y-6">

      {/* Título + Botão */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Vendas Balcão</h1>
          <p className="text-gray-400 text-sm mt-1">Gestão de vendas no balcão</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => { setSelectedSale(null); setIsModalOpen(true) }}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-purple-400/10 border border-purple-400/20 text-purple-400 text-sm font-medium rounded-xl hover:bg-purple-400/20 transition-all duration-200"
          >
            <Plus size={16} />
            Nova Venda
          </button>
        )}
      </div>

      {/* Filtro */}
      <SalesFilter onFilter={handleFilter} />

      {/* Tabela */}
      {isLoading ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-64 animate-pulse" />
      ) : (
        <SalesTable
          sales={sales}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      )}

      <SalesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchSales()}
        sale={selectedSale}
      />

    </div>
  )
}

export default SalesPage