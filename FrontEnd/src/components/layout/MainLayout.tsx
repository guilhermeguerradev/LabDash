import { useState } from 'react'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#050818]">

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static z-30 h-full transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setIsOpen(false)} />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header mobile */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-4 bg-[#0a0f1e] border-b border-white/10">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-cyan-400 rounded-md flex items-center justify-center">
              <span className="text-black font-black text-xs">L</span>
            </div>
            <span className="text-white font-bold tracking-wide">
              Lab<span className="text-green-400">Dash</span>
            </span>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  )
}

export default MainLayout