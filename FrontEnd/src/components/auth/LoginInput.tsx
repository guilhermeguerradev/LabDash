import type { InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon
  iconColor?: string
  rightIcon?: LucideIcon
  onRightIconClick?: () => void
}

function LoginInput({ icon: Icon, iconColor = 'text-gray-400', rightIcon: RightIcon, onRightIconClick, ...props }: LoginInputProps) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus-within:border-cyan-400/50 transition-colors">
      <Icon size={18} className={`${iconColor} shrink-0`} />
      <input
        className="bg-transparent text-white placeholder-gray-400 text-sm w-full outline-none"
        {...props}
      />
      {RightIcon && (
        <button type="button" onClick={onRightIconClick} className="text-gray-400 hover:text-white transition-colors shrink-0">
          <RightIcon size={18} />
        </button>
      )}
    </div>
  )
}

export default LoginInput