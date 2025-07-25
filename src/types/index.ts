// ============================================================================
// TYPES - FioGestor
// ============================================================================

export interface Plan {
  id: string
  name: string
  price: number
  priceYearly: number
  description: string
  features: string[]
  popular?: boolean
  stripePriceId: string
  stripePriceIdYearly: string
  limits: {
    clients: number | 'unlimited'
    appointments: number | 'unlimited'
    whatsappMessages: number | 'unlimited'
    storage: number // GB
  }
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  plan: string
  subscription?: Subscription
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  stripeSubscriptionId: string
  stripeCustomerId: string
}

export interface Client {
  id: string
  userId: string
  name: string
  email?: string
  phone: string
  address?: string
  notes?: string
  clothingTypes: ClothingType[]
  measurements?: Measurements
  totalSpent: number
  lastAppointment?: Date
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export type ClothingType = 
  | 'vestido-festa'
  | 'vestido-noiva'
  | 'vestido-madrinha'
  | 'saia'
  | 'blusa'
  | 'calca'
  | 'ajustes'
  | 'outros'

export interface Measurements {
  bust: number
  waist: number
  hips: number
  height: number
  notes?: string
  updatedAt: Date
}

export interface Appointment {
  id: string
  userId: string
  clientId: string
  client?: Client
  title: string
  description?: string
  date: Date
  time: string
  duration: number
  type: AppointmentType
  status: AppointmentStatus
  price?: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export type AppointmentType = 
  | 'consulta'
  | 'prova'
  | 'entrega'
  | 'medicao'
  | 'ajuste'

export type AppointmentStatus = 
  | 'agendado'
  | 'confirmado'
  | 'concluido'
  | 'cancelado'

export interface WhatsAppTemplate {
  id: string
  userId: string
  name: string
  type: WhatsAppTemplateType
  message: string
  variables: string[]
  isActive: boolean
  usageCount: number
  createdAt: Date
  updatedAt: Date
}

export type WhatsAppTemplateType = 
  | 'agendamento'
  | 'lembrete'
  | 'confirmacao'
  | 'orcamento'
  | 'entrega'
  | 'follow-up'
  | 'personalizado'

export interface DashboardStats {
  totalRevenue: number
  totalClients: number
  activeProjects: number
  todayAppointments: number
  monthlyRevenue: Array<{
    month: string
    revenue: number
  }>
  recentClients: Client[]
  upcomingAppointments: Appointment[]
}

// Forms
export interface CheckoutFormData {
  email: string
  name: string
  phone?: string
  planId: string
  billingCycle: 'monthly' | 'yearly'
}

export interface ClientFormData {
  name: string
  email?: string
  phone: string
  address?: string
  notes?: string
  clothingTypes: ClothingType[]
}

export interface AppointmentFormData {
  clientId: string
  title: string
  description?: string
  date: string
  time: string
  duration: number
  type: AppointmentType
  price?: number
  notes?: string
}

// API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

