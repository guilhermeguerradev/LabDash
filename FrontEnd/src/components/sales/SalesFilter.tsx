import { useState } from 'react'

interface SalesFilterProps {
  onFilter: (params: { date?: string }) => void
}

function formatDate(date: string) {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

function SalesFilter({ onFilter }: SalesFilterProps) {
  const [date, setDate] = useState('')

  function handleFilter() {
    onFilter({
      date: date ? formatDate(date) : undefined,
    })
  }

  function handleClear() {
    setDate('')
    onFilter({})
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="cursor-pointer bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-purple-400/50 transition-colors [color-scheme:dark]"
      />
    <div className="flex gap-2">
      <button
        onClick={handleFilter}
        className="cursor-pointer flex-1 sm:flex-none px-4 py-2 bg-purple-400/10 border border-purple-400/20 text-purple-400 text-sm font-medium rounded-xl hover:bg-purple-400/20 transition-all duration-200"
      >
        Filtrar
      </button>
      <button
        onClick={handleClear}
        className="cursor-pointer flex-1 sm:flex-none px-4 py-2 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:bg-white/5 transition-all duration-200"
      >
        Limpar
      </button>
    </div>
  </div>
  )
}

export default SalesFilter