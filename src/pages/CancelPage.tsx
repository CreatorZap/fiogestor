import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  XCircle, 
  ArrowLeft, 
  MessageCircle, 
  HelpCircle,
  RefreshCw,
  Star
} from 'lucide-react'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
        
        {/* Cancel Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Pagamento Cancelado
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-2"
          >
            Não se preocupe, nada foi cobrado
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500"
          >
            Você pode tentar novamente a qualquer momento
          </motion.p>
        </motion.div>

        {/* What happened */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            O que aconteceu?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowLeft className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Você cancelou</h3>
              <p className="text-gray-600 text-sm">
                O pagamento foi cancelado antes da conclusão
              </p>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Erro no pagamento</h3>
              <p className="text-gray-600 text-sm">
                Pode ter ocorrido um problema técnico
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dúvidas</h3>
              <p className="text-gray-600 text-sm">
                Precisa de mais informações sobre os planos
              </p>
            </div>
          </div>
        </motion.div>

        {/* Try Again */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white mb-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Que tal tentar novamente?
            </h2>
            <p className="text-pink-100 mb-6">
              Mais de 500 costureiras já transformaram seus ateliês com o FioGestor
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#pricing"
                className="bg-white text-pink-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-semibold"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Tentar Novamente
              </Link>
              
              <a
                href="https://wa.me/5511999999999?text=Olá! Tive problemas no pagamento do FioGestor e gostaria de ajuda"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-pink-600 transition-colors flex items-center justify-center font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Common Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Dúvidas Frequentes
          </h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                É seguro fazer o pagamento?
              </h3>
              <p className="text-gray-600">
                Sim! Usamos o Stripe, a mesma tecnologia de segurança de empresas como Uber e Shopify. 
                Seus dados estão 100% protegidos.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Posso cancelar a qualquer momento?
              </h3>
              <p className="text-gray-600">
                Claro! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas. 
                Oferecemos ainda 30 dias de garantia.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Como funciona o teste grátis?
              </h3>
              <p className="text-gray-600">
                Você tem 14 dias para testar todas as funcionalidades gratuitamente. 
                Só cobramos se você decidir continuar após o período de teste.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Que formas de pagamento vocês aceitam?
              </h3>
              <p className="text-gray-600">
                Aceitamos cartões de crédito (Visa, Mastercard, American Express), 
                PIX e boleto bancário. Você pode parcelar em até 12x no cartão.
              </p>
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
            "Estava com receio de assinar, mas o FioGestor mudou completamente meu ateliê. 
            Valeu cada centavo! Recomendo para todas as costureiras."
          </blockquote>
          
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <div className="font-semibold text-gray-900">Ana Costa</div>
              <div className="text-gray-600 text-sm">Costureira Autônoma - Rio de Janeiro</div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center mt-12"
        >
          <div className="space-y-4">
            <Link
              to="/#pricing"
              className="bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              Ver Planos Novamente
              <RefreshCw className="w-5 h-5 ml-2" />
            </Link>
            
            <div className="text-center">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para a página inicial
              </Link>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mt-6">
            Precisa de ajuda? Fale conosco no WhatsApp: (11) 99999-9999
          </p>
        </motion.div>

      </div>
    </div>
  )
}

