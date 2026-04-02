import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, X, AlertTriangle } from 'lucide-react'
import api from '@/services/api'
import type { Client } from '@/types'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  unitPrice: z.number().min(0, 'Preço inválido'),
})

type FormData = z.infer<typeof schema>

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function ClientsTab() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const isEditing = !!selectedClient

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', unitPrice: 0 },
  })

  const fetchClients = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/clients')
      setClients(response.data)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  function handleOpenCreate() {
    setSelectedClient(null)
    reset({ name: '', unitPrice: 0 })
    setIsModalOpen(true)
  }

  function handleOpenEdit(client: Client) {
    setSelectedClient(client)
    reset({ name: client.name, unitPrice: client.unitPrice })
    setIsModalOpen(true)
  }

  function handleClose() {
    setIsModalOpen(false)
    setSelectedClient(null)
    setErrorMsg(null)
  }

  function handleDeleteClick(client: Client) {
    setDeleteTarget(client)
  }

  function handleCancelDelete() {
    setDeleteTarget(null)
  }

  async function handleDelete(deleteOrders: boolean) {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await api.delete(`/clients/${deleteTarget.id}?deleteOrders=${deleteOrders}`)
      fetchClients()
      setDeleteTarget(null)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      alert(error?.response?.data?.message || 'Erro ao deletar cliente.')
    } finally {
      setIsDeleting(false)
    }
  }

  async function onSubmit(data: FormData) {
    setErrorMsg(null)
    try {
      if (isEditing) {
        await api.put(`/clients/${selectedClient.id}`, data)
      } else {
        await api.post('/clients', data)
      }
      fetchClients()
      handleClose()
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      setErrorMsg(error?.response?.data?.message || 'Erro ao salvar cliente.')
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">Gerencie os clientes e seus preços unitários.</p>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium rounded-xl hover:bg-green-400/20 transition-all duration-200"
        >
          <Plus size={16} />
          Novo Cliente
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-48 animate-pulse" />
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-gray-400 font-medium">ID</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Nome</th>
                <th className="text-right px-6 py-4 text-gray-400 font-medium">Preço Unitário</th>
                <th className="text-right px-6 py-4 text-gray-400 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-8">
                    Nenhum cliente cadastrado.
                  </td>
                </tr>
              ) : (
                [...clients].sort((a, b) => a.id - b.id).map((client) => (
                  <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-gray-400">{client.id}</td>
                    <td className="px-6 py-4 text-white">{client.name}</td>
                    <td className="px-6 py-4 text-right text-green-400 font-medium">
                      {formatCurrency(client.unitPrice)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleOpenEdit(client)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(client)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal criar/editar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative z-10 w-full max-w-md bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-lg">
                {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Nome</label>
                <input
                  {...register('name')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
                  placeholder="Nome do cliente"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Preço Unitário (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('unitPrice', { valueAsNumber: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
                  placeholder="0,00"
                />
                {errors.unitPrice && <p className="text-red-400 text-xs mt-1">{errors.unitPrice.message}</p>}
              </div>
            </div>

            {errorMsg && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:bg-white/5 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium rounded-xl hover:bg-green-400/20 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de delete */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCancelDelete} />
          <div className="relative z-10 w-full max-w-md bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 shadow-2xl">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <h2 className="text-white font-semibold text-lg">Deletar cliente</h2>
            </div>

            <p className="text-gray-400 text-sm mb-1">
              Deseja deletar o cliente <span className="text-white font-medium">"{deleteTarget.name}"</span>?
            </p>
            <p className="text-gray-500 text-xs mb-6">
              Se houver entregas vinculadas a este cliente, você pode deletá-las junto ou cancelar a operação.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleDelete(true)}
                disabled={isDeleting}
                className="w-full py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50"
              >
                {isDeleting ? 'Deletando...' : 'Deletar cliente e todas as entregas vinculadas'}
              </button>

              <button
                onClick={() => handleDelete(false)}
                disabled={isDeleting}
                className="w-full py-3 bg-white/5 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
              >
                Deletar apenas o cliente
              </button>

              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="w-full py-3 border border-white/10 text-gray-500 text-sm font-medium rounded-xl hover:bg-white/5 transition-all duration-200 disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default ClientsTab