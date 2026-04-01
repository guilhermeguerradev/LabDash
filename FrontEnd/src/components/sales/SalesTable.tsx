import { Pencil, Trash2 } from 'lucide-react'
import type { DailyCounterSale } from '@/types'

interface SalesTableProps {
  sales: DailyCounterSale[]
  onEdit: (sale: DailyCounterSale) => void
  onDelete: (id: number) => void
  isAdmin: boolean
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function SalesTable({ sales, onEdit, onDelete, isAdmin }: SalesTableProps) {
  if (sales.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-gray-400 text-sm">Nenhuma venda encontrada.</p>
      </div>
    )
  }

  function formatDate(date: string) {
    if (date.includes('/')) return date // já está em dd/MM/yyyy
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left px-6 py-4 text-gray-400 font-medium">ID</th>
            <th className="text-left px-6 py-4 text-gray-400 font-medium">Data</th>
            <th className="text-right px-6 py-4 text-gray-400 font-medium">Pix</th>
            <th className="text-right px-6 py-4 text-gray-400 font-medium">Cartão</th>
            <th className="text-right px-6 py-4 text-gray-400 font-medium">Dinheiro</th>
            <th className="text-right px-6 py-4 text-gray-400 font-medium">Total do Dia</th>
            {isAdmin && (
              <th className="text-right px-6 py-4 text-gray-400 font-medium">Ações</th>
            )}
          </tr>
        </thead>
        <tbody>
          {[...sales].sort((a, b) => {
              // date vem como dd/MM/yyyy do backend
              const [da, ma, ya] = a.date.split('/')
              const [db, mb, yb] = b.date.split('/')
              return new Date(`${yb}-${mb}-${db}`).getTime() - new Date(`${ya}-${ma}-${da}`).getTime()
            }).map((sale) => (
            <tr
              key={sale.id}
              className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150"
            >
              <td className="px-6 py-4 text-gray-400">{sale.id}</td>
              <td className="px-6 py-4 text-white">{formatDate(sale.date)}</td>
              <td className="px-6 py-4 text-right text-cyan-400">{formatCurrency(sale.pixAmount)}</td>
              <td className="px-6 py-4 text-right text-blue-400">{formatCurrency(sale.cardAmount)}</td>
              <td className="px-6 py-4 text-right text-green-400">{formatCurrency(sale.cashAmount)}</td>
              <td className="px-6 py-4 text-right text-purple-400 font-semibold">
                {formatCurrency(sale.totalDay)}
              </td>
              {isAdmin && (
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => onEdit(sale)}
                      className="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors"
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(sale.id)}
                      className="cursor-pointer text-red-400 hover:text-red-300 transition-colors"
                      title="Deletar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable