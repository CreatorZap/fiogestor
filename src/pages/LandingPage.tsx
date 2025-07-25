import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MessageCircle, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Check, 
  Star,
  ArrowRight,
  Play,
  Users,
  Clock,
  Shield,
  Smartphone,
  Zap,
  Heart
} from 'lucide-react'

import { plans, formatPrice, calculateYearlyDiscount } from '@/utils/plans'

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Intersection Observer hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [pricingRef, pricingInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    // Track page view
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_title: 'FioGestor - Landing Page',
        page_location: window.location.href
      })
    }
  }, [])

  const handleGetStarted = () => {
    // Track CTA click
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Hero Get Started'
      })
    }

    // Scroll to pricing
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FioGestor</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#funcionalidades" className="text-gray-600 hover:text-pink-600 transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-pink-600 transition-colors">
                Preços
              </a>
              <a href="#depoimentos" className="text-gray-600 hover:text-pink-600 transition-colors">
                Depoimentos
              </a>
              <Link 
                to="/login" 
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Entrar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-16 pb-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Novo: WhatsApp Automático para Costureiras
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Seu ateliê em{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  modo automático
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Transforme sua costura em um negócio organizado e lucrativo. 
                WhatsApp automático, agenda inteligente e controle financeiro em um só lugar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleGetStarted}
                  className="bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Começar Grátis - 14 Dias
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
                
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-pink-600 hover:text-pink-600 transition-all duration-200 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Sem cartão de crédito
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Cancele quando quiser
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Suporte em português
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ✨ Novo
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">WhatsApp conectado!</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Mensagem automática:</p>
                    <div className="bg-green-100 p-3 rounded-lg text-sm">
                      "Oi Maria! 😊 Confirmando sua prova amanhã às 14h para o vestido de festa. Te espero! 💕"
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Enviado automaticamente</span>
                    <div className="flex items-center text-green-500">
                      <Check className="w-4 h-4 mr-1" />
                      <span className="text-sm">Entregue</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-8">Já são mais de 500+ costureiras organizando seus ateliês</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Costureiras</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Clientes gerenciados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50k+</div>
                <div className="text-sm text-gray-600">WhatsApps enviados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Avaliação média</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Cansada de perder tempo e dinheiro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sabemos como é difícil gerenciar um ateliê. Criamos o FioGestor para resolver seus maiores problemas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'WhatsApp bagunçado',
                description: 'Conversas misturadas, mensagens perdidas, clientes esquecidos'
              },
              {
                icon: Calendar,
                title: 'Agenda desorganizada',
                description: 'Conflitos de horário, provas esquecidas, clientes insatisfeitos'
              },
              {
                icon: DollarSign,
                title: 'Não sabe se lucra',
                description: 'Preços no "achômetro", sem controle de gastos e receitas'
              },
              {
                icon: Clock,
                title: 'Perde muito tempo',
                description: 'Horas perdidas com planilhas, anotações e tarefas manuais'
              }
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-red-50 rounded-xl border border-red-100"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <problem.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-gray-600 text-sm">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="funcionalidades" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              O FioGestor resolve tudo isso!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Funcionalidades pensadas especificamente para costureiras, com a simplicidade que você precisa.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* WhatsApp Feature */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">WhatsApp Automático</h3>
                    <p className="text-green-600 font-medium">Sua maior dor resolvida!</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {[
                    'Mensagens prontas para cada situação',
                    'Lembretes automáticos de consulta',
                    'Orçamentos profissionais via chat',
                    'Nunca mais esqueça de um cliente'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Exemplo de mensagem automática:</p>
                  <div className="bg-green-100 p-3 rounded-lg text-sm">
                    "Oi {'{nome}'}! 😊 Lembrando que sua prova é amanhã às {'{hora}'} para o {'{tipo_peca}'}. Te espero! 💕"
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Agenda Feature */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center mb-4">
                  <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Agenda Inteligente</h3>
                </div>
                <p className="text-gray-600 mb-4">Visualize todos os compromissos, evite conflitos e nunca mais perca uma consulta.</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>+80% menos conflitos de horário</span>
                </div>
              </div>
              
              {/* Financial Feature */}
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-center mb-4">
                  <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Controle Financeiro</h3>
                </div>
                <p className="text-gray-600 mb-4">Saiba exatamente quanto está ganhando, controle pagamentos e tenha relatórios automáticos.</p>
                <div className="flex items-center text-purple-600 font-medium">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>+40% aumento na receita média</span>
                </div>
              </div>
              
              {/* Reports Feature */}
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Relatórios Automáticos</h3>
                </div>
                <p className="text-gray-600 mb-4">Relatórios mensais automáticos, gráficos intuitivos e insights para crescer seu negócio.</p>
                <div className="flex items-center text-orange-600 font-medium">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Decisões baseadas em dados reais</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} id="depoimentos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              O que as costureiras estão falando
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reais de quem já transformou seu ateliê
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Silva',
                business: 'Ateliê da Mari',
                image: '/testimonial-1.jpg',
                rating: 5,
                text: 'Aumentei minha receita em 40% no primeiro mês! O WhatsApp automático mudou completamente minha relação com as clientes.',
                result: '+40% receita'
              },
              {
                name: 'Ana Costa',
                business: 'Costureira Autônoma',
                image: '/testimonial-2.jpg',
                rating: 5,
                text: 'Nunca mais perdi um cliente por desorganização. A agenda inteligente me salvou de vários conflitos de horário.',
                result: '0 conflitos'
              },
              {
                name: 'Carla Santos',
                business: 'Ateliê Elegante',
                image: '/testimonial-3.jpg',
                rating: 5,
                text: 'Economizo 2 horas por dia que gastava com planilhas e anotações. Agora posso focar no que amo: costurar!',
                result: '-2h admin/dia'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative"
              >
                <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {testimonial.result}
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Escolha o plano ideal para seu ateliê
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Comece grátis e evolua conforme seu negócio cresce
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
                  -17%
                </span>
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular ? 'ring-2 ring-pink-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(billingCycle === 'monthly' ? plan.price : plan.priceYearly)}
                    </span>
                    <span className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                    </span>
                  </div>
                  
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium">
                      Economize {calculateYearlyDiscount(plan.price * 12, plan.priceYearly)}% pagando anual
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={`/checkout/${plan.id}?billing=${billingCycle}`}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    // Track plan selection
                    if (typeof window.gtag !== 'undefined') {
                      window.gtag('event', 'select_item', {
                        item_list_id: 'pricing_plans',
                        item_list_name: 'Pricing Plans',
                        items: [{
                          item_id: plan.id,
                          item_name: plan.name,
                          item_category: 'subscription',
                          price: billingCycle === 'monthly' ? plan.price / 100 : plan.priceYearly / 100,
                          quantity: 1
                        }]
                      })
                    }
                  }}
                >
                  Escolher {plan.name}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Garantia de 30 dias
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Cancele quando quiser
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Suporte em português
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre o FioGestor
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: 'Como funciona o WhatsApp automático?',
                answer: 'O FioGestor gera mensagens personalizadas que você pode enviar com um clique. Não enviamos mensagens automaticamente - você tem controle total sobre quando e o que enviar.'
              },
              {
                question: 'Preciso de conhecimento técnico para usar?',
                answer: 'Não! O FioGestor foi criado pensando na simplicidade. Se você sabe usar WhatsApp, consegue usar o FioGestor. Além disso, oferecemos suporte completo em português.'
              },
              {
                question: 'Posso cancelar a qualquer momento?',
                answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas. Seus dados ficam seguros por 30 dias caso queira reativar.'
              },
              {
                question: 'Como funciona o teste grátis?',
                answer: 'Você tem 14 dias para testar todas as funcionalidades gratuitamente, sem precisar informar cartão de crédito. Só cobramos se você decidir continuar.'
              },
              {
                question: 'Meus dados ficam seguros?',
                answer: 'Absolutamente! Usamos criptografia de nível bancário e servidores seguros. Seus dados e de suas clientes estão 100% protegidos.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronta para transformar seu ateliê?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Junte-se a mais de 500 costureiras que já organizaram seus negócios com o FioGestor
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-white text-pink-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Começar Grátis Agora
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o FioGestor"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-pink-600 transition-all duration-200 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </a>
          </div>
          
          <p className="text-pink-100 text-sm mt-6">
            ✨ Sem cartão de crédito • Cancele quando quiser • Suporte em português
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold">FioGestor</span>
              </div>
              <p className="text-gray-400">
                Seu ateliê em modo automático. Sistema completo para costureiras autônomas.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FioGestor. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Demonstração do FioGestor</h3>
              <p className="text-gray-600 mb-6">
                Em breve: vídeo demonstrando todas as funcionalidades do sistema
              </p>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

