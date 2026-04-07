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

function formatDate(date: string) {
  if (date.includes('/')) return date
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

function SalesTable({ sales, onEdit, onDelete, isAdmin }: SalesTableProps) {
  if (sales.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-gray-400 text-sm">Nenhuma venda encontrada.</p>
      </div>
    )
  }

  return (
    <>
      {/* Cards — mobile */}
      <div className="flex flex-col gap-3 sm:hidden">
        {sales.map((sale) => (
          <div key={sale.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-xs">#{sale.id}</span>
                <span className="text-white text-sm font-medium ml-2">{formatDate(sale.date)}</span>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => onEdit(sale)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => onDelete(sale.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-gray-400 text-xs mb-1">Pix</p>
                <p className="text-cyan-400 font-medium">{formatCurrency(sale.pixAmount)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Cartão</p>
                <p className="text-blue-400 font-medium">{formatCurrency(sale.cardAmount)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Dinheiro</p>
                <p className="text-green-400 font-medium">{formatCurrency(sale.cashAmount)}</p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-2 flex items-center justify-between">
              <span className="text-gray-400 text-xs">Total do Dia</span>
              <span className="text-purple-400 font-semibold">{formatCurrency(sale.totalDay)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela — desktop */}
      <div className="hidden sm:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-gray-400 font-medium">ID</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Data</th>
              <th className="text-right px-6 py-4 text-gray-400 font-medium">Pix</th>
              <th className="text-right px-6 py-4 text-gray-400 font-medium">Cartão</th>
              <th className="text-right px-6 py-4 text-gray-400 font-medium">Dinheiro</th>
              <th className="text-right px-6 py-4 text-gray-400 font-medium">Total do Dia</th>
              {isAdmin && <th className="text-right px-6 py-4 text-gray-400 font-medium">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150">
                <td className="px-6 py-4 text-gray-400">{sale.id}</td>
                <td className="px-6 py-4 text-white">{formatDate(sale.date)}</td>
                <td className="px-6 py-4 text-right text-cyan-400">{formatCurrency(sale.pixAmount)}</td>
                <td className="px-6 py-4 text-right text-blue-400">{formatCurrency(sale.cardAmount)}</td>
                <td className="px-6 py-4 text-right text-green-400">{formatCurrency(sale.cashAmount)}</td>
                <td className="px-6 py-4 text-right text-purple-400 font-semibold">{formatCurrency(sale.totalDay)}</td>
                {isAdmin && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => onEdit(sale)} className="cursor-pointer p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => onDelete(sale.id)} className="cursor-pointer p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
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
    </>
  )
}

export default SalesTable