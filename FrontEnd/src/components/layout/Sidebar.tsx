import { LayoutDashboard, Truck, ShoppingCart, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import SidebarItem from './SidebarItem'

function Sidebar() {
  const navigate = useNavigate()
  const { name, role, logout } = useAuthStore()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0a0f1e] border-r border-white/10 flex flex-col px-4 py-6">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(74,222,128,0.4)]">
          <span className="text-black font-black text-sm">L</span>
        </div>
        <span className="text-white font-bold text-xl tracking-wide">
          Lab<span className="text-green-400">Dash</span>
        </span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 flex-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" />
        <SidebarItem icon={Truck} label="Entregas (Obras)" path="/orders" />
        <SidebarItem icon={ShoppingCart} label="Vendas Balcão" path="/sales" />
        {role === 'ADMIN' && (
          <SidebarItem icon={Settings} label="Configurações" path="/settings" />
        )}
      </nav>

      {/* Usuário + Logout */}
      <div className="border-t border-white/10 pt-4 mt-4">
        <p className="text-gray-400 text-xs px-4 mb-1">Logado como</p>
        <p className="text-white text-sm font-medium px-4 mb-3">{name}</p>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>

    </aside>
  )
}

export default Sidebar