import { loadStripe } from '@stripe/stripe-js'
import { CheckoutFormData } from '@/types'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export class StripeService {
  
  // ========================================================================
  // CHECKOUT SESSION
  // ========================================================================
  
  static async createCheckoutSession(formData: CheckoutFormData) {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const session = await response.json()

      if (!response.ok) {
        throw new Error(session.error || 'Erro ao criar sessão de checkout')
      }

      return session
    } catch (error) {
      console.error('Erro no checkout:', error)
      throw error
    }
  }

  // ========================================================================
  // REDIRECT TO CHECKOUT
  // ========================================================================
  
  static async redirectToCheckout(sessionId: string) {
    const stripe = await stripePromise
    
    if (!stripe) {
      throw new Error('Stripe não foi carregado')
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  // ========================================================================
  // DIRECT CHECKOUT (SEM BACKEND)
  // ========================================================================
  
  static async directCheckout(formData: CheckoutFormData) {
    try {
      // Para validação rápida, vamos usar links diretos do Stripe
      const checkoutUrls = {
        starter: {
          monthly: 'https://buy.stripe.com/test_starter_monthly',
          yearly: 'https://buy.stripe.com/test_starter_yearly'
        },
        professional: {
          monthly: 'https://buy.stripe.com/test_professional_monthly',
          yearly: 'https://buy.stripe.com/test_professional_yearly'
        },
        premium: {
          monthly: 'https://buy.stripe.com/test_premium_monthly',
          yearly: 'https://buy.stripe.com/test_premium_yearly'
        }
      }

      const url = checkoutUrls[formData.planId as keyof typeof checkoutUrls]?.[formData.billingCycle]
      
      if (!url) {
        throw new Error('Plano não encontrado')
      }

      // Redirecionar para o checkout do Stripe
      window.location.href = url
      
    } catch (error) {
      console.error('Erro no checkout direto:', error)
      throw error
    }
  }

  // ========================================================================
  // ANALYTICS
  // ========================================================================
  
  static trackCheckoutStart(planId: string, billingCycle: string) {
    // Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: this.getPlanValue(planId, billingCycle),
        items: [{
          item_id: `${planId}_${billingCycle}`,
          item_name: `FioGestor ${planId}`,
          category: 'subscription',
          quantity: 1,
          price: this.getPlanValue(planId, billingCycle)
        }]
      })
    }

    // Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', {
        value: this.getPlanValue(planId, billingCycle),
        currency: 'BRL',
        content_name: `FioGestor ${planId}`,
        content_category: 'subscription'
      })
    }
  }

  static trackPurchase(planId: string, billingCycle: string, transactionId?: string) {
    const value = this.getPlanValue(planId, billingCycle)

    // Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId || `fiogestor_${Date.now()}`,
        value: value,
        currency: 'BRL',
        items: [{
          item_id: `${planId}_${billingCycle}`,
          item_name: `FioGestor ${planId}`,
          category: 'subscription',
          quantity: 1,
          price: value
        }]
      })
    }

    // Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Purchase', {
        value: value,
        currency: 'BRL',
        content_name: `FioGestor ${planId}`,
        content_type: 'product'
      })
    }
  }

  // ========================================================================
  // UTILITIES
  // ========================================================================
  
  private static getPlanValue(planId: string, billingCycle: string): number {
    const prices = {
      starter: { monthly: 19.90, yearly: 199.00 },
      professional: { monthly: 39.90, yearly: 399.00 },
      premium: { monthly: 69.90, yearly: 699.00 }
    }

    return prices[planId as keyof typeof prices]?.[billingCycle as keyof typeof prices.starter] || 0
  }

  // ========================================================================
  // CUSTOMER PORTAL
  // ========================================================================
  
  static async createCustomerPortalSession(customerId: string) {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      })

      const session = await response.json()

      if (!response.ok) {
        throw new Error(session.error || 'Erro ao criar sessão do portal')
      }

      return session
    } catch (error) {
      console.error('Erro no portal do cliente:', error)
      throw error
    }
  }

  // ========================================================================
  // SUBSCRIPTION MANAGEMENT
  // ========================================================================
  
  static async getSubscription(subscriptionId: string) {
    try {
      const response = await fetch(`/api/subscription/${subscriptionId}`)
      const subscription = await response.json()

      if (!response.ok) {
        throw new Error(subscription.error || 'Erro ao buscar assinatura')
      }

      return subscription
    } catch (error) {
      console.error('Erro ao buscar assinatura:', error)
      throw error
    }
  }

  static async cancelSubscription(subscriptionId: string) {
    try {
      const response = await fetch(`/api/subscription/${subscriptionId}/cancel`, {
        method: 'POST',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao cancelar assinatura')
      }

      return result
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error)
      throw error
    }
  }

  // ========================================================================
  // VALIDATION
  // ========================================================================
  
  static validateCheckoutData(formData: CheckoutFormData): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!formData.email) {
      errors.push('Email é obrigatório')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Email inválido')
    }

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres')
    }

    if (!formData.planId) {
      errors.push('Plano é obrigatório')
    }

    if (!formData.billingCycle) {
      errors.push('Ciclo de cobrança é obrigatório')
    }

    if (formData.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      errors.push('Telefone deve estar no formato (11) 99999-9999')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

