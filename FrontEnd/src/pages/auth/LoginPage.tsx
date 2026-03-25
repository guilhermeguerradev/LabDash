import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react' 
import LoginCard from '@/components/auth/LoginCard'
import LoginInput from '@/components/auth/LoginInput'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import api from '@/services/api'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const login = useAuthStore((state) => state.login)

  const {
    register,      
    handleSubmit, 
    formState: { errors, isSubmitting }, 
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema), 
  })

  async function onSubmit(data: LoginForm) {
      try {
        setError(null)
        const response = await api.post('/auth/login', data) 
        const { token, role, name } = response.data          
        login(token, role, name)                             
        navigate('/dashboard')                                
      } catch {
        setError('Email ou senha inválidos')                 
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050818] relative overflow-hidden">

      {/* Brilhos de fundo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <LoginCard>
          <h1 className="text-5xl font-bold text-white text-center mb-10 tracking-wide">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <LoginInput
              icon={User}
              iconColor="text-green-400"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>
            )}

            <LoginInput
              icon={Lock}
              iconColor="text-blue-400"
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
              rightIcon={showPassword ? EyeOff : Eye} 
              onRightIconClick={() => setShowPassword(!showPassword)}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-400 text-xs ml-1">{errors.password.message}</p>
            )}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
            type="submit"
            disabled={isSubmitting}
             className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-base transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Entrando...' : 'Login'}
            </button>
          </form>
        </LoginCard>
      </div>
    </div>
  )
}

export default LoginPage