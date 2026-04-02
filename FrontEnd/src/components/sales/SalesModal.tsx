import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import api from '@/services/api'
import type { DailyCounterSale } from '@/types'

const schema = z.object({
  date: z.string().min(1, 'Data é obrigatória'),
  pixAmount: z.number().min(0, 'Valor inválido'),
  cashAmount: z.number().min(0, 'Valor inválido'),
  cardAmount: z.number().min(0, 'Valor inválido'),
})

type FormData = z.infer<typeof schema>

interface SalesModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  sale: DailyCounterSale | null
}

function formatDateToBackend(date: string) {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

function formatDateToInput(date: string) {
  if (date.includes('/')) {
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
  }
  return date
}

function SalesModal({ isOpen, onClose, onSuccess, sale }: SalesModalProps) {
  const isEditing = !!sale
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      pixAmount: 0,
      cashAmount: 0,
      cardAmount: 0,
    },
  })

  function getTodayBR() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' })
}

  useEffect(() => {
    if (isOpen) {
      if (sale) {
        reset({
          date: formatDateToInput(sale.date),  // ← já existe
          pixAmount: sale.pixAmount,
          cashAmount: sale.cashAmount,
          cardAmount: sale.cardAmount,
        })
      } else {
        reset({
          date: getTodayBR(),  // ← troca '' por getTodayBR()
          pixAmount: 0,
          cashAmount: 0,
          cardAmount: 0,
        })
      }
    }
  }, [isOpen, sale, reset])

  async function onSubmit(data: FormData) {
    setErrorMsg(null)
    try {
      const payload = {
        date: formatDateToBackend(data.date),
        pixAmount: data.pixAmount,
        cashAmount: data.cashAmount,
        cardAmount: data.cardAmount,
      }

      if (isEditing) {
        await api.put(`/counter-sales/${sale.id}`, payload)
      } else {
        await api.post('/counter-sales', payload)
      }

      onSuccess()
      onClose()
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      const msg = error?.response?.data?.message || 'Já existe uma venda cadastrada nessa data.'
      setErrorMsg(msg)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">
            {isEditing ? 'Editar Venda' : 'Nova Venda Balcão'}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Data */}
          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Data</label>
            <input
              type="date"
              {...register('date')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-400/50 transition-colors [color-scheme:dark]"
            />
            {errors.date && (
              <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Pix */}
          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Pix (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('pixAmount', { valueAsNumber: true })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-400/50 transition-colors"
              placeholder="0,00"
            />
            {errors.pixAmount && (
              <p className="text-red-400 text-xs mt-1">{errors.pixAmount.message}</p>
            )}
          </div>

          {/* Cartão */}
          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Cartão (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('cardAmount', { valueAsNumber: true })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-400/50 transition-colors"
              placeholder="0,00"
            />
            {errors.cardAmount && (
              <p className="text-red-400 text-xs mt-1">{errors.cardAmount.message}</p>
            )}
          </div>

          {/* Dinheiro */}
          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Dinheiro (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('cashAmount', { valueAsNumber: true })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
              placeholder="0,00"
            />
            {errors.cashAmount && (
              <p className="text-red-400 text-xs mt-1">{errors.cashAmount.message}</p>
            )}
          </div>
        </div>

        {/* Erro */}
        {errorMsg && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer flex-1 py-3 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:bg-white/5 transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="cursor-pointer flex-1 py-3 bg-purple-400/10 border border-purple-400/20 text-purple-400 text-sm font-medium rounded-xl hover:bg-purple-400/20 transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SalesModal