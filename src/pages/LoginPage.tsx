import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  ArrowRight,
  MessageCircle
} from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    
    try {
      // Simulate login (replace with real authentication)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any email/password
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
      
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">FioGestor</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vinda de volta!
          </h2>
          <p className="text-gray-600">
            Acesse sua conta para gerenciar seu ateliê
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Lembrar de mim
                </label>
              </div>
              
              <button
                type="button"
                className="text-sm text-pink-600 hover:text-pink-700"
              >
                Esqueci minha senha
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              🚀 Para testar (demo):
            </h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Email:</strong> demo@fiogestor.com</p>
              <p><strong>Senha:</strong> 123456</p>
            </div>
          </div>
        </div>

        {/* Sign Up */}
        <div className="text-center">
          <p className="text-gray-600">
            Ainda não tem uma conta?{' '}
            <Link to="/#pricing" className="text-pink-600 hover:text-pink-700 font-medium">
              Assine agora
            </Link>
          </p>
        </div>

        {/* Help */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Precisa de ajuda para acessar sua conta?
          </p>
          
          <a
            href="https://wa.me/5511999999999?text=Olá! Preciso de ajuda para acessar minha conta do FioGestor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Falar no WhatsApp
          </a>
        </div>

        {/* Social Proof */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-2">
            Mais de 500 costureiras confiam no FioGestor
          </p>
          <div className="flex justify-center items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
            <span className="text-gray-600 text-sm ml-2">4.9/5 (127 avaliações)</span>
          </div>
        </div>

      </div>
    </div>
  )
}

