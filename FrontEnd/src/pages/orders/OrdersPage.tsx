import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import type { OrderResponse } from '@/types'
import OrdersTable from '@/components/orders/OrdersTable'
import OrdersFilter from '@/components/orders/OrdersFilter'
import OrderModal from '@/components/orders/OrdersModal'

function OrdersPage() {
  const [orders, setOrders] = useState<OrderResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null)

  const role = useAuthStore((state) => state.role)
  const isAdmin = role === 'ADMIN'

  function handleEdit(order: OrderResponse) {
  setSelectedOrder(order)
  setIsModalOpen(true)
}

  const fetchOrders = async (params?: {
    date?: string
    company?: string
    client?: string
    startDate?: string
    endDate?: string
  }) => {
    try {
      setIsLoading(true)

      let url = '/orders'

      if (params?.date || params?.company || params?.client || params?.startDate) {
        const query = new URLSearchParams()
        if (params.date) query.append('date', params.date)
        if (params.company) query.append('company', params.company)
        if (params.client) query.append('client', params.client)
        if (params.startDate) query.append('startDate', params.startDate)
        if (params.endDate) query.append('endDate', params.endDate)
        url = `/orders/search?${query.toString()}`
      }

      const response = await api.get(url)
      setOrders(response.data)
    } catch (error) {
      console.error('Erro ao buscar orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  function handleFilter(params: {
    date?: string
    company?: string
    client?: string
    startDate?: string
    endDate?: string
  }) {
    fetchOrders(params)
  }

  async function handleDelete(id: number) {
    if (!confirm('Deseja deletar este pedido?')) return
    try {
      await api.delete(`/orders/${id}`)
      fetchOrders()
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
        <OrdersTable
          orders={orders}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      )}

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchOrders()}
        order={selectedOrder}
      />

    </div>
  )
}

export default OrdersPage