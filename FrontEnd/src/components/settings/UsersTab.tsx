import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, Shield, User, Pencil, X, Trash2 } from 'lucide-react'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'

const createSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  role: z.enum(['ADMIN', 'USER']),
})

const editSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres').optional().or(z.literal('')),
  role: z.enum(['ADMIN', 'USER']),
})

type CreateFormData = z.infer<typeof createSchema>
type EditFormData = z.infer<typeof editSchema>

interface UserResponse {
  id: number
  name: string
  email: string
  role: string
}

function UsersTab() {
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [users, setUsers] = useState<UserResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null)
  const [editErrorMsg, setEditErrorMsg] = useState<string | null>(null)

  const role = useAuthStore((state) => state.role)
  const isAdmin = role === 'ADMIN'

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateFormData>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: '', email: '', password: '', role: 'USER' },
  })

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit, isSubmitting: isSubmittingEdit },
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: { name: '', email: '', password: '', role: 'USER' },
  })

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAdmin) fetchUsers()
  }, [isAdmin])

  async function onSubmit(data: CreateFormData) {
    setErrorMsg(null)
    setSuccessMsg(null)
    try {
      await api.post('/auth/register', data)
      setSuccessMsg(`Usuário "${data.name}" criado com sucesso!`)
      reset()
      fetchUsers()
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      setErrorMsg(error?.response?.data?.message || 'Erro ao criar usuário.')
    }
  }

  function handleOpenEdit(user: UserResponse) {
    setEditingUser(user)
    setEditErrorMsg(null)
    resetEdit({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role as 'ADMIN' | 'USER',
    })
  }

  function handleCloseEdit() {
    setEditingUser(null)
    setEditErrorMsg(null)
  }

  async function onSubmitEdit(data: EditFormData) {
    setEditErrorMsg(null)
    try {
      const payload = {
        ...data,
        password: data.password || undefined,
      }
      await api.put(`/users/${editingUser!.id}`, payload)
      fetchUsers()
      handleCloseEdit()
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } }
      setEditErrorMsg(error?.response?.data?.message || 'Erro ao atualizar usuário.')
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Deseja deletar este usuário?')) return
    try {
      await api.delete(`/users/${id}`)
      fetchUsers()
    } catch (err: unknown) {
      console.error('Erro ao deletar usuário:', err)
    }
  }

  return (
    <div className="flex gap-8 items-start">

      {/* Formulário de criação */}
      <div className="w-80 shrink-0">
        <p className="text-gray-400 text-sm mb-6">Cadastre novos usuários no sistema.</p>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Nome</label>
            <input
              {...register('name')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
              placeholder="Nome completo"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">E-mail</label>
            <input
              type="email"
              {...register('email')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
              placeholder="email@exemplo.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Senha</label>
            <input
              type="password"
              {...register('password')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-1.5 block">Perfil</label>
            <div className="flex gap-2">
              {(['USER', 'ADMIN'] as const).map((r) => (
                <label
                  key={r}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200
                    ${watch('role') === r
                      ? 'bg-green-400/10 border-green-400/20 text-green-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                >
                  <input type="radio" value={r} {...register('role')} className="hidden" />
                  {r === 'USER' ? 'Usuário' : 'Administrador'}
                </label>
              ))}
            </div>
            {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mt-4 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3 text-green-400 text-sm">
            {successMsg}
          </div>
        )}

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium rounded-xl hover:bg-green-400/20 transition-all duration-200 disabled:opacity-50"
        >
          <UserPlus size={16} />
          {isSubmitting ? 'Criando...' : 'Criar Usuário'}
        </button>
      </div>

      {/* Tabela */}
      {isAdmin && (
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-6">Usuários cadastrados no sistema.</p>

          {isLoading ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-48 animate-pulse" />
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">ID</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Nome</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">E-mail</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Perfil</th>
                    <th className="text-right px-6 py-4 text-gray-400 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-400 py-8">
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-gray-400">{user.id}</td>
                        <td className="px-6 py-4 text-white">{user.name}</td>
                        <td className="px-6 py-4 text-gray-400">{user.email}</td>
                        <td className="px-6 py-4">
                          {user.role === 'ADMIN' ? (
                            <span className="flex items-center gap-1.5 text-yellow-400 text-xs font-medium">
                              <Shield size={13} />
                              Administrador
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                              <User size={13} />
                              Usuário
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => handleOpenEdit(user)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Pencil size={16} />
                            </button>
                            {/* <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button> */}
                            
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal de edição */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseEdit} />
          <div className="relative z-10 w-full max-w-md bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-lg">Editar Usuário</h2>
              <button onClick={handleCloseEdit} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Nome</label>
                <input
                  {...registerEdit('name')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
                  placeholder="Nome completo"
                />
                {errorsEdit.name && <p className="text-red-400 text-xs mt-1">{errorsEdit.name.message}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">E-mail</label>
                <input
                  type="email"
                  {...registerEdit('email')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
                  placeholder="email@exemplo.com"
                />
                {errorsEdit.email && <p className="text-red-400 text-xs mt-1">{errorsEdit.email.message}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">
                  Nova Senha
                  <span className="text-gray-500 ml-1">(deixe em branco para não alterar)</span>
                </label>
                <input
                  type="password"
                  {...registerEdit('password')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
                  placeholder="Mínimo 6 caracteres"
                />
                {errorsEdit.password && <p className="text-red-400 text-xs mt-1">{errorsEdit.password.message}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Perfil</label>
                <div className="flex gap-2">
                  {(['USER', 'ADMIN'] as const).map((r) => (
                    <label
                      key={r}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200
                        ${watchEdit('role') === r
                          ? 'bg-green-400/10 border-green-400/20 text-green-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                    >
                      <input type="radio" value={r} {...registerEdit('role')} className="hidden" />
                      {r === 'USER' ? 'Usuário' : 'Administrador'}
                    </label>
                  ))}
                </div>
                {errorsEdit.role && <p className="text-red-400 text-xs mt-1">{errorsEdit.role.message}</p>}
              </div>
            </div>

            {editErrorMsg && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {editErrorMsg}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleCloseEdit}
                className="flex-1 py-3 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:bg-white/5 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitEdit(onSubmitEdit)}
                disabled={isSubmittingEdit}
                className="flex-1 py-3 bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium rounded-xl hover:bg-green-400/20 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmittingEdit ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default UsersTab