import { useState } from 'react'
import { Search } from 'lucide-react'

interface OrdersFilterProps {
  onFilter: (params: {
    date?: string
    company?: string
    client?: string
    startDate?: string
    endDate?: string
  }) => void
}

function OrdersFilter({ onFilter }: OrdersFilterProps) {
  const [filterType, setFilterType] = useState<'date' | 'period' | 'company' | 'client'>('date')
  const [date, setDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [company, setCompany] = useState('')
  const [client, setClient] = useState('')

  function handleFilter() {
    if (filterType === 'date') {
      onFilter({ date: date || undefined })
    } else if (filterType === 'period') {
      onFilter({ startDate: startDate || undefined, endDate: endDate || undefined })
    } else if (filterType === 'company') {
      onFilter({ company: company || undefined })
    } else {
      onFilter({ client: client || undefined })
    }
  }

  function handleClear() {
    setDate('')
    setStartDate('')
    setEndDate('')
    setCompany('')
    setClient('')
    onFilter({})
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">

      {/* Botões de tipo de filtro */}
      <div className="flex gap-2">

        <button
          onClick={() => setFilterType('date')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${filterType === 'date'
              ? 'bg-green-400/10 border border-green-400/20 text-green-400'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
        >
          Por Data
        </button>

        <button
          onClick={() => setFilterType('period')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${filterType === 'period'
              ? 'bg-green-400/10 border border-green-400/20 text-green-400'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
        >
          Por Período
        </button>

        <button
          onClick={() => setFilterType('company')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${filterType === 'company'
              ? 'bg-green-400/10 border border-green-400/20 text-green-400'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
        >
          Por Empresa
        </button>

        <button
          onClick={() => setFilterType('client')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${filterType === 'client'
              ? 'bg-green-400/10 border border-green-400/20 text-green-400'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
        >
          Por Cliente
        </button>

      </div>

      {/* Inputs */}
      <div className="flex items-center gap-3">

        {filterType === 'date' && (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
          />
        )}

        {filterType === 'period' && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
            />
            <span className="text-gray-400 text-sm">até</span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-green-400/50 transition-colors"
            />
          </>
        )}

        {filterType === 'company' && (
          <div className="flex items-center gap-2 flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nome da empresa..."
              className="bg-transparent text-white placeholder-gray-400 text-sm w-full outline-none"
            />
          </div>
        )}

        {filterType === 'client' && (
          <div className="flex items-center gap-2 flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Nome do cliente..."
              className="bg-transparent text-white placeholder-gray-400 text-sm w-full outline-none"
            />
          </div>
        )}

        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium rounded-xl hover:bg-green-400/20 transition-all duration-200"
        >
          Filtrar
        </button>

        <button
          onClick={handleClear}
          className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:bg-white/10 transition-all duration-200"
        >
          Limpar
        </button>

      </div>
    </div>
  )
}

export default OrdersFilter