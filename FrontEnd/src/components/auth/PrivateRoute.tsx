import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface PrivateRouteProps {
  children: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default PrivateRoute