interface LoginCardProps {
  children: React.ReactNode
}

function LoginCard({ children }: LoginCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-[0_0_40px_rgba(99,102,241,0.15)] min-h-[480px] flex flex-col justify-center">
      {children}
    </div>
  )
}

export default LoginCard