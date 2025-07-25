import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  MessageCircle, 
  Calendar, 
  DollarSign,
  ArrowRight,
  Download,
  Play,
  Star
} from 'lucide-react'

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const planId = searchParams.get('plan') || 'professional'

  useEffect(() => {
    // Track successful purchase
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'purchase', {
        transaction_id: sessionId || `fiogestor_${Date.now()}`,
        value: getPlanValue(planId),
        currency: 'BRL',
        items: [{
          item_id: planId,
          item_name: `FioGestor ${planId}`,
          category: 'subscription',
          quantity: 1,
          price: getPlanValue(planId)
        }]
      })
    }

    // Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Purchase', {
        value: getPlanValue(planId),
        currency: 'BRL',
        content_name: `FioGestor ${planId}`
      })
    }
  }, [sessionId, planId])

  const getPlanValue = (plan: string) => {
    const values = { starter: 19.90, professional: 39.90, premium: 69.90 }
    return values[plan as keyof typeof values] || 39.90
  }

  const getPlanName = (plan: string) => {
    const names = { starter: 'Starter', professional: 'Professional', premium: 'Premium' }
    return names[plan as keyof typeof names] || 'Professional'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FioGestor</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            🎉 Parabéns!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-2"
          >
            Sua assinatura do FioGestor {getPlanName(planId)} foi ativada com sucesso!
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500"
          >
            Bem-vinda à família de costureiras organizadas! ✨
          </motion.p>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Próximos passos para organizar seu ateliê
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Acesse sua conta</h3>
              <p className="text-gray-600 text-sm mb-4">
                Faça login e configure seu perfil
              </p>
              <Link
                to="/login"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Fazer login
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Configure o WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-4">
                Crie seus templates personalizados
              </p>
              <button className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                Ver tutorial
                <Play className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cadastre clientes</h3>
              <p className="text-gray-600 text-sm mb-4">
                Importe ou adicione suas clientes
              </p>
              <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                Começar agora
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Features Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Agora você tem acesso a tudo isso:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-3 opacity-90" />
              <h3 className="font-semibold mb-2">WhatsApp Automático</h3>
              <p className="text-pink-100 text-sm">
                Mensagens prontas e lembretes automáticos
              </p>
            </div>
            
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3 opacity-90" />
              <h3 className="font-semibold mb-2">Agenda Inteligente</h3>
              <p className="text-pink-100 text-sm">
                Organize consultas e evite conflitos
              </p>
            </div>
            
            <div className="text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-3 opacity-90" />
              <h3 className="font-semibold mb-2">Controle Financeiro</h3>
              <p className="text-pink-100 text-sm">
                Acompanhe receitas e lucros
              </p>
            </div>
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Precisa de ajuda?
            </h2>
            <p className="text-gray-600 mb-6">
              Nossa equipe está pronta para te ajudar a aproveitar ao máximo o FioGestor
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511999999999?text=Olá! Acabei de assinar o FioGestor e gostaria de ajuda para começar"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Suporte via WhatsApp
              </a>
              
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Baixar Guia Rápido
              </button>
            </div>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gray-50 rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <blockquote className="text-lg text-gray-700 italic mb-4">
            "O FioGestor transformou completamente meu ateliê. Em 30 dias aumentei 40% da receita e economizo 2 horas por dia que gastava com organização!"
          </blockquote>
          
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <div className="font-semibold text-gray-900">Maria Silva</div>
              <div className="text-gray-600 text-sm">Ateliê da Mari - São Paulo</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/dashboard"
            className="bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            Acessar meu FioGestor
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          
          <p className="text-gray-500 text-sm mt-4">
            Você receberá um email com todas as informações da sua conta
          </p>
        </motion.div>

      </div>
    </div>
  )
}

