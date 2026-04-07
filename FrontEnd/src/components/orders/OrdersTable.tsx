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

  function formatDate(date: string) {
    if (date.includes('/')) return date // já está em dd/MM/yyyy
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-gray-400 text-sm">Nenhum pedido encontrado</p>
      </div>
    )
  }

  return (
    <>
      {/* Cards — mobile */}
      <div className="flex flex-col gap-3 sm:hidden">
        {orders.map((order) => (
          <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">#{order.id}</span>
              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => onEdit(order)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => onDelete(order.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400 text-xs mb-1">Obra</p>
                <p className="text-white font-medium">{order.companyName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Cliente</p>
                <p className="text-white font-medium">{order.clientName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Data</p>
                <p className="text-gray-400">{formatDate(order.date)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Quantidade</p>
                <p className="text-cyan-400 font-medium">{order.quantity} itens</p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-2 flex items-center justify-between">
              <span className="text-gray-400 text-xs">Valor Total</span>
              <span className="text-green-400 font-semibold">{formatCurrency(order.totalValue)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela — desktop */}
      <div className="hidden sm:block bg-white/5 border border-white/10 rounded-2xl p-6">
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
                {isAdmin && <th className="text-right pb-3 font-medium">Ações</th>}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-gray-400">{order.id}</td>
                  <td className="py-3 text-white">{order.companyName}</td>
                  <td className="py-3 text-white">{order.clientName}</td>
                  <td className="py-3 text-gray-400">{formatDate(order.date)}</td>
                  <td className="py-3 text-cyan-400 font-medium">{order.quantity} itens</td>
                  <td className="py-3 text-green-400 font-medium">{formatCurrency(order.totalValue)}</td>
                  {isAdmin && (
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => onEdit(order)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => onDelete(order.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default OrdersTable