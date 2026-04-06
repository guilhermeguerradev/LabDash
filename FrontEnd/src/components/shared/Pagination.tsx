import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, totalElements, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-2 mt-4">
      <p className="text-gray-400 text-xs">
        Total de <span className="text-white font-medium">{totalElements}</span> registros
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="p-2 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => {
            // mostra só páginas próximas da atual
            if (
              i === 0 ||
              i === totalPages - 1 ||
              (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
              return (
                <button
                  key={i}
                  onClick={() => onPageChange(i)}
                  className={`w-8 h-8 rounded-xl text-xs font-medium transition-all duration-200
                    ${currentPage === i
                      ? 'bg-green-400/10 border border-green-400/20 text-green-400'
                      : 'border border-white/10 text-gray-400 hover:bg-white/5'
                    }`}
                >
                  {i + 1}
                </button>
              )
            }

            if (i === currentPage - 2 || i === currentPage + 2) {
              return <span key={i} className="text-gray-600 px-1">...</span>
            }

            return null
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="p-2 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default Pagination