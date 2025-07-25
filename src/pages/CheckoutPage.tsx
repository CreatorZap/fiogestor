import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { 
  ArrowLeft, 
  Check, 
  Shield, 
  CreditCard,
  Lock,
  Star
} from 'lucide-react'

import { plans, getPlanById, formatPrice, calculateYearlyDiscount } from '@/utils/plans'
import { StripeService } from '@/services/stripe'
import { CheckoutFormData } from '@/types'

const checkoutSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  phone: z.string().optional(),
  planId: z.string(),
  billingCycle: z.enum(['monthly', 'yearly'])
})

export default function CheckoutPage() {
  const { planId } = useParams()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(getPlanById(planId || 'professional'))
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    (searchParams.get('billing') as 'monthly' | 'yearly') || 'monthly'
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      planId: planId || 'professional',
      billingCycle: billingCycle
    }
  })

  const watchedPlanId = watch('planId')

  useEffect(() => {
    if (watchedPlanId) {
      setSelectedPlan(getPlanById(watchedPlanId))
    }
  }, [watchedPlanId])

  useEffect(() => {
    setValue('billingCycle', billingCycle)
  }, [billingCycle, setValue])

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true)
    
    try {
      // Track checkout start
      StripeService.trackCheckoutStart(data.planId, data.billingCycle)
      
      // Validate form data
      const validation = StripeService.validateCheckoutData(data)
      if (!validation.valid) {
        validation.errors.forEach(error => toast.error(error))
        return
      }

      // Create checkout session
      await StripeService.directCheckout(data)
      
    } catch (error) {
      console.error('Erro no checkout:', error)
      toast.error('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plano não encontrado</h1>
          <Link to="/" className="text-pink-600 hover:text-pink-700">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    )
  }

  const currentPrice = billingCycle === 'monthly' ? selectedPlan.price : selectedPlan.priceYearly
  const discount = billingCycle === 'yearly' ? calculateYearlyDiscount(selectedPlan.price * 12, selectedPlan.priceYearly) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FioGestor</span>
            </Link>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Pagamento 100% seguro</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column - Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Finalize sua assinatura
              </h1>
              
              {/* Plan Selection */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Escolha seu plano</h2>
                
                <div className="grid gap-4">
                  {plans.map((plan) => (
                    <label
                      key={plan.id}
                      className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        watchedPlanId === plan.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={plan.id}
                        {...register('planId')}
                        className="sr-only"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                            <p className="text-sm text-gray-600">{plan.description}</p>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {formatPrice(billingCycle === 'monthly' ? plan.price : plan.priceYearly)}
                            </div>
                            <div className="text-sm text-gray-600">
                              /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {plan.popular && (
                        <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Billing Cycle */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ciclo de cobrança</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      billingCycle === 'monthly'
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value="monthly"
                      checked={billingCycle === 'monthly'}
                      onChange={(e) => setBillingCycle(e.target.value as 'monthly')}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">Mensal</div>
                      <div className="text-sm text-gray-600">Pague mensalmente</div>
                    </div>
                  </label>
                  
                  <label
                    className={`relative flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      billingCycle === 'yearly'
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value="yearly"
                      checked={billingCycle === 'yearly'}
                      onChange={(e) => setBillingCycle(e.target.value as 'yearly')}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">Anual</div>
                      <div className="text-sm text-gray-600">2 meses grátis</div>
                    </div>
                    
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      -{discount}%
                    </div>
                  </label>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Maria Silva"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone (opcional)
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-pink-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processando...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Finalizar Assinatura
                    </>
                  )}
                </button>
              </form>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-1" />
                  <span>SSL Seguro</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Stripe</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  <span>Garantia 30 dias</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do pedido</h2>
              
              {/* Plan Summary */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">FioGestor {selectedPlan.name}</h3>
                    <p className="text-sm text-gray-600">
                      Cobrança {billingCycle === 'monthly' ? 'mensal' : 'anual'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {formatPrice(currentPrice)}
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-600">
                        Economize {discount}%
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-2">
                  {selectedPlan.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {selectedPlan.features.length > 4 && (
                    <div className="text-sm text-gray-500">
                      +{selectedPlan.features.length - 4} funcionalidades
                    </div>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(currentPrice)}</span>
                </div>
                
                {billingCycle === 'yearly' && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Desconto anual</span>
                    <span>-{formatPrice(selectedPlan.price * 12 - selectedPlan.priceYearly)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(currentPrice)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {billingCycle === 'monthly' ? 'Cobrado mensalmente' : 'Cobrado anualmente'}
                  </p>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                  <span>Garantia de reembolso de 30 dias</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Cancele a qualquer momento</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span>Suporte prioritário incluído</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">Maria S.</span>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Aumentei 40% da receita no primeiro mês! O WhatsApp automático mudou minha vida."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

