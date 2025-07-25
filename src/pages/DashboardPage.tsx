import { useState } from 'react'
import { 
  BarChart3, 
  Users, 
  Calendar, 
  DollarSign,
  MessageCircle,
  Plus,
  TrendingUp,
  Clock,
  Star,
  Settings,
  LogOut
} from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const stats = {
    totalRevenue: 4850.00,
    totalClients: 23,
    activeProjects: 8,
    todayAppointments: 3
  }

  const recentClients = [
    { id: 1, name: 'Maria Silva', phone: '(11) 99999-1111', lastAppointment: '2024-01-15', status: 'active' },
    { id: 2, name: 'Ana Costa', phone: '(11) 99999-2222', lastAppointment: '2024-01-14', status: 'active' },
    { id: 3, name: 'Carla Santos', phone: '(11) 99999-3333', lastAppointment: '2024-01-13', status: 'active' }
  ]

  const upcomingAppointments = [
    { id: 1, client: 'Maria Silva', type: 'Prova', date: '2024-01-16', time: '14:00' },
    { id: 2, client: 'Ana Costa', type: 'Entrega', date: '2024-01-16', time: '16:00' },
    { id: 3, client: 'Carla Santos', type: 'Consulta', date: '2024-01-17', time: '10:00' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FioGestor</h1>
                <p className="text-sm text-gray-600">Ateliê da Maria</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vinda, Maria! 👋
          </h2>
          <p className="text-gray-600">
            Aqui está um resumo do seu ateliê hoje
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% este mês</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">+3 novos</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Projetos Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">2 urgentes</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Consultas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
                <div className="flex items-center mt-2">
                  <Calendar className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">Próxima às 14h</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                  <Plus className="w-6 h-6 text-pink-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Nova Cliente</span>
                </button>
                
                <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Agendar</span>
                </button>
                
                <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">WhatsApp</span>
                </button>
                
                <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Relatórios</span>
                </button>
              </div>
            </div>

            {/* Recent Clients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Clientes Recentes</h3>
                  <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                    Ver todas
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-pink-600 font-semibold text-sm">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{client.name}</h4>
                          <p className="text-sm text-gray-600">{client.phone}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Última consulta</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(client.lastAppointment).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Today's Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Consultas de Hoje</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{appointment.client}</h4>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2">
                  Ver agenda completa
                </button>
              </div>
            </div>

            {/* WhatsApp Templates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Templates WhatsApp</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Lembrete de Prova</span>
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      "Oi {'{nome}'}! Lembrando que sua prova é amanhã..."
                    </p>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Orçamento</span>
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      "Seu orçamento ficou pronto! Valor: R$ {'{valor}'}..."
                    </p>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Peça Pronta</span>
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      "{'{nome}'}, sua peça está pronta! 🎉"
                    </p>
                  </button>
                </div>
                
                <button className="w-full mt-4 text-center text-green-600 hover:text-green-700 text-sm font-medium py-2">
                  Criar novo template
                </button>
              </div>
            </div>

            {/* Upgrade Banner */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 mr-2" />
                <span className="font-semibold">Plano Starter</span>
              </div>
              
              <h3 className="font-bold mb-2">Que tal evoluir?</h3>
              <p className="text-pink-100 text-sm mb-4">
                Upgrade para o Professional e tenha clientes ilimitados + WhatsApp avançado
              </p>
              
              <button className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                Fazer Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

