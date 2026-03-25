import type { LucideIcon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  path: string
}

function SidebarItem({ icon: Icon, label, path }: SidebarItemProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <button
      onClick={() => navigate(path)}
className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
  ${isActive
    ? 'bg-green-400/10 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)] border border-green-400/20'
    : 'text-gray-400 hover:bg-white/5 hover:text-white'
  }`}
    >
      <Icon size={18} />
      {label}
    </button>
  )
}

export default SidebarItem