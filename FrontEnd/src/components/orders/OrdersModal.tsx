import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { OrderResponse } from '@/types'
import api from '@/services/api'

interface Company {
  id: number
  name: string
}

interface Client {
  id: number
  name: string
  unitPrice: number
}

const orderSchema = z.object({
  companyId: z.number().min(1, 'Selecione uma obra'),
  clientId: z.number().min(1, 'Selecione um cliente'),
  quantity: z.number().min(1, 'Mínimo 1'),
  date: z.string().min(1, 'Informe a data'),
})

type OrderForm = z.infer<typeof orderSchema>

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  order?: OrderResponse | null
}

function OrderModal({ isOpen, onClose, onSuccess, order }: OrderModalProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Se tem order → é edição, senão → é criação
  const isEditing = !!order

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
  })

  useEffect(() => {
    if (!isOpen) return

    async function fetchData() {
      try {
        const [companiesRes, clientsRes] = await Promise.all([
          api.get('/companies'),
          api.get('/clients'),
        ])
        setCompanies(companiesRes.data)
        setClients(clientsRes.data)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    fetchData()
  }, [isOpen])

  useEffect(() => {
    if (order) {
      reset({
        companyId: order.companyId,
        clientId: order.clientId,
        quantity: order.quantity,
        date: order.date,
      })
    } else {
      reset({
        companyId: 0,
        clientId: 0,
        quantity: 0,
        date: '',
      })
    }
  }, [order, reset])

  async function onSubmit(data: OrderForm) {
    try {
      setIsSubmitting(true)
      if (isEditing) {
        await api.put(`/orders/${order.id}`, data)
      } else {
        await api.post('/orders', data)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Erro ao salvar order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-[0_0_40px_rgba(74,222,128,0.1)]">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold">
            {isEditing ? 'Editar Pedido' : 'Novo Pedido'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Obra */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block">Obra</label>
            <select
              {...register('companyId', { valueAsNumber: true })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
            >
              <option value={0} className="bg-[#0a0f1e]">Selecione uma obra</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id} className="bg-[#0a0f1e]">
                  {company.name}
                </option>
              ))}
            </select>
            {errors.companyId && (
              <p className="text-red-400 text-xs mt-1">{errors.companyId.message}</p>
            )}
          </div>

          {/* Cliente */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block">Cliente</label>
            <select
              {...register('clientId', { valueAsNumber: true })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
            >
              <option value={0} className="bg-[#0a0f1e]">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id} className="bg-[#0a0f1e]">
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <p className="text-red-400 text-xs mt-1">{errors.clientId.message}</p>
            )}
          </div>

          {/* Quantidade */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block">Quantidade</label>
            <input
              type="number"
              {...register('quantity', { valueAsNumber: true })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
              placeholder="0"
            />
            {errors.quantity && (
              <p className="text-red-400 text-xs mt-1">{errors.quantity.message}</p>
            )}
          </div>

          {/* Data */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block">Data</label>
            <input
              type="date"
              {...register('date')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
            />
            {errors.date && (
              <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/5 transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium hover:bg-green-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default OrderModal