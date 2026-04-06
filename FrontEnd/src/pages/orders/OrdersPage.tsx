import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import type { OrderResponse } from '@/types'
import OrdersTable from '@/components/orders/OrdersTable'
import OrdersFilter from '@/components/orders/OrdersFilter'
import OrderModal from '@/components/orders/OrdersModal'
import Pagination from '@/components/shared/Pagination'

interface PageResponse {
  content: OrderResponse[]
  totalPages: number
  totalElements: number
  number: number
}

interface FilterParams {
  date?: string
  company?: string
  client?: string
  startDate?: string
  endDate?: string
}

function OrdersPage() {
  const [orders, setOrders] = useState<OrderResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [activeFilters, setActiveFilters] = useState<FilterParams>({})
  const [isFiltered, setIsFiltered] = useState(false)

  const role = useAuthStore((state) => state.role)
  const isAdmin = role === 'ADMIN'

  function handleEdit(order: OrderResponse) {
  setSelectedOrder(order)
  setIsModalOpen(true)
}

  const fetchOrders = async (params?: FilterParams, page = 0) => {
    try {
      setIsLoading(true)
      const hasFilters = params && (params.date || params.company || params.client || params.startDate)
      if (hasFilters) {
        const query = new URLSearchParams()
        if (params.date) query.append('date', params.date)
        if (params.company) query.append('company', params.company)
        if (params.client) query.append('client', params.client)
        if (params.startDate) query.append('startDate', params.startDate)
        if (params.endDate) query.append('endDate', params.endDate)
        const response = await api.get(`/orders/search?${query.toString()}`)
        setOrders(response.data)
        setTotalPages(0)
        setTotalElements(response.data.length)
        setIsFiltered(true)
      } else {
        const response = await api.get(`/orders?page=${page}&size=15`)
        const data: PageResponse = response.data
        setOrders(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
        setCurrentPage(data.number)
        setIsFiltered(false)
      }
    } catch (error) {
      console.error('Erro ao buscar orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  function handleFilter(params: FilterParams) {
    setActiveFilters(params)
    setCurrentPage(0)
    fetchOrders(params, 0)
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
    fetchOrders(activeFilters, page)
  }

  async function handleDelete(id: number) {
    if (!confirm('Deseja deletar este pedido?')) return
    try {
      await api.delete(`/orders/${id}`)
      fetchOrders(activeFilters, currentPage)
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  return (
    <div className="space-y-6">

      {/* Título + Botão Nova Entrega */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Entregas</h1>
          <p className="text-gray-400 text-sm mt-1">Gestão de pedidos de entrega</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => { setSelectedOrder(null); setIsModalOpen(true) }}
            className="flex items-center gap-2 px-4 py-2 bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium rounded-xl hover:bg-green-400/20 transition-all duration-200"
          >
            <Plus size={16} />
            Nova Entrega
          </button>
        )}
      </div>

      

      {/* Filtro */}
      <OrdersFilter onFilter={handleFilter} />

      {/* Tabela */}
      {isLoading ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-64 animate-pulse" />
      ) : (
      <>
        <OrdersTable
          orders={orders}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
        {!isFiltered && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            onPageChange={handlePageChange}
          />
        )}
      </>
    )}

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchOrders(activeFilters, currentPage)}
        order={selectedOrder}
      />

    </div>
  )
}

export default OrdersPage