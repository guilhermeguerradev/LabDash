import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  iconColor?: string
  glowColor?: string
}

function StatsCard({ title, value, icon: Icon, iconColor = 'text-green-400', glowColor = 'rgba(74,222,128,0.15)' }: StatsCardProps) {
  return (
    <div
      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4"
      style={{ boxShadow: `0 0 20px ${glowColor}` }}
    >
      <div className="p-3 bg-white/5 rounded-xl">
        <Icon size={22} className={iconColor} />
      </div>
      <div>
        <p className="text-gray-400 text-xs mb-1">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

export default StatsCard