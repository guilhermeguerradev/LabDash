import { useState } from 'react'
import { Users, Building2, UserCog } from 'lucide-react'
import ClientsTab from '@/components/settings/ClientsTab'
import CompaniesTab from '@/components/settings/CompaniesTab'
import UsersTab from '@/components/settings/UsersTab'

type Tab = 'clients' | 'companies' | 'users'

const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'companies', label: 'Empresas', icon: Building2 },
  { id: 'users', label: 'Usuários', icon: UserCog },
]

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('clients')

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-gray-400 text-sm mt-1">Gerenciamento de clientes, empresas e usuários</p>
      </div>

      {/* Abas */}
      <div className="flex gap-2 border-b border-white/10 pb-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-xl border-b-2 transition-all duration-200
              ${activeTab === id
                ? 'text-green-400 border-green-400 bg-green-400/5'
                : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
              }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div>
        {activeTab === 'clients' && <ClientsTab />}
        {activeTab === 'companies' && <CompaniesTab />}
        {activeTab === 'users' && <UsersTab />}
      </div>

    </div>
  )
}

export default SettingsPage