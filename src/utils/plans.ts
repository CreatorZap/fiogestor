import { Plan } from '@/types'

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1990, // R$ 19,90 em centavos
    priceYearly: 19900, // R$ 199,00 em centavos (17% desconto)
    description: 'Perfeito para costureiras iniciantes',
    stripePriceId: import.meta.env.VITE_STRIPE_PRICE_STARTER_MONTHLY || 'price_starter_monthly',
    stripePriceIdYearly: import.meta.env.VITE_STRIPE_PRICE_STARTER_YEARLY || 'price_starter_yearly',
    features: [
      'Até 50 clientes',
      'WhatsApp Templates inteligentes',
      'Agenda básica',
      'Controle financeiro simples',
      'Suporte por email',
      '1GB de armazenamento'
    ],
    limits: {
      clients: 50,
      appointments: 100,
      whatsappMessages: 500,
      storage: 1
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 3990, // R$ 39,90 em centavos
    priceYearly: 39900, // R$ 399,00 em centavos (17% desconto)
    description: 'Para costureiras estabelecidas',
    stripePriceId: import.meta.env.VITE_STRIPE_PRICE_PROFESSIONAL_MONTHLY || 'price_professional_monthly',
    stripePriceIdYearly: import.meta.env.VITE_STRIPE_PRICE_PROFESSIONAL_YEARLY || 'price_professional_yearly',
    popular: true,
    features: [
      'Clientes ilimitados',
      'WhatsApp Templates avançados',
      'Agenda completa com lembretes',
      'Controle de produção',
      'Relatórios detalhados',
      'Backup automático',
      'Suporte prioritário',
      '10GB de armazenamento'
    ],
    limits: {
      clients: 'unlimited',
      appointments: 'unlimited',
      whatsappMessages: 2000,
      storage: 10
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 6990, // R$ 69,90 em centavos
    priceYearly: 69900, // R$ 699,00 em centavos (17% desconto)
    description: 'Para ateliês grandes e profissionais',
    stripePriceId: import.meta.env.VITE_STRIPE_PRICE_PREMIUM_MONTHLY || 'price_premium_monthly',
    stripePriceIdYearly: import.meta.env.VITE_STRIPE_PRICE_PREMIUM_YEARLY || 'price_premium_yearly',
    features: [
      'Tudo do Professional',
      'WhatsApp API oficial (futuro)',
      'Calculadora de preços IA',
      'Relatórios avançados',
      'Marca personalizada',
      'Suporte VIP (WhatsApp)',
      'Treinamento personalizado',
      '50GB de armazenamento'
    ],
    limits: {
      clients: 'unlimited',
      appointments: 'unlimited',
      whatsappMessages: 'unlimited',
      storage: 50
    }
  }
]

export const getPlanById = (id: string): Plan | undefined => {
  return plans.find(plan => plan.id === id)
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price / 100)
}

export const calculateYearlyDiscount = (monthlyPrice: number, yearlyPrice: number): number => {
  const yearlyMonthly = monthlyPrice * 12
  const discount = ((yearlyMonthly - yearlyPrice) / yearlyMonthly) * 100
  return Math.round(discount)
}

export const getPopularPlan = (): Plan => {
  return plans.find(plan => plan.popular) || plans[1]
}

