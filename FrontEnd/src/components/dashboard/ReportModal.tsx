import { useState } from 'react'
import { X, FileText } from 'lucide-react'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (startDate: string, endDate: string) => void
}

function ReportModal({ isOpen, onClose, onGenerate }: ReportModalProps) {
  const today = new Date().toISOString().split('T')[0]
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)

  if (!isOpen) return null

  function handleGenerate() {
    if (startDate > endDate) {
      alert('A data de início não pode ser maior que a data fim!')
      return
    }
    onGenerate(startDate, endDate)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-[0_0_40px_rgba(74,222,128,0.1)]">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-green-400" />
            <h2 className="text-white font-semibold">Gerar Relatório</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Campos de data */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs mb-2 block">Data Início</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-2 block">Data Fim</label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/5 transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleGenerate}
            className="flex-1 py-3 rounded-xl bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium hover:bg-green-400/20 transition-all duration-200"
          >
            Gerar
          </button>
        </div>

      </div>
    </div>
  )
}

export default ReportModal