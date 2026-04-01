import { Pencil, Trash2 } from 'lucide-react'
import type { OrderResponse } from '@/types'

interface OrdersTableProps {
  orders: OrderResponse[]
  onEdit: (order: OrderResponse) => void
  onDelete: (id: number) => void
  isAdmin: boolean
}

function OrdersTable({ orders, onEdit, onDelete, isAdmin }: OrdersTableProps) {
  function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-white/10">
              <th className="text-left pb-3 font-medium">ID</th>
              <th className="text-left pb-3 font-medium">Obra</th>
              <th className="text-left pb-3 font-medium">Cliente</th>
              <th className="text-left pb-3 font-medium">Data</th>
              <th className="text-left pb-3 font-medium">Quantidade</th>
              <th className="text-left pb-3 font-medium">Valor Total</th>
              {isAdmin && (
                <th className="text-right pb-3 font-medium">Ações</th>
              )}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-8">
                  Nenhum pedido encontrado
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-gray-400">{order.id}</td>
                  <td className="py-3 text-white">{order.companyName}</td>
                  <td className="py-3 text-white">{order.clientName}</td>
                  <td className="py-3 text-gray-400">{String(order.date)}</td>
                  <td className="py-3 text-cyan-400 font-medium">{order.quantity} itens</td>
                  <td className="py-3 text-green-400 font-medium">
                    {formatCurrency(order.totalValue)}
                  </td>
                  {isAdmin && (
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(order)}
                          className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => onDelete(order.id)}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersTable