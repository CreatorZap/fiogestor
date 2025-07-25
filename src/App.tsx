import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Pages
import LandingPage from './pages/LandingPage'
import CheckoutPage from './pages/CheckoutPage'
import SuccessPage from './pages/SuccessPage'
import CancelPage from './pages/CancelPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'

// Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

// React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <Router>
          <div className="App">
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Checkout */}
              <Route path="/checkout/:planId" element={<CheckoutPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* Payment Results */}
              <Route path="/sucesso" element={<SuccessPage />} />
              <Route path="/cancelado" element={<CancelPage />} />
              
              {/* App */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Fallback */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />
          </div>
        </Router>
      </Elements>
    </QueryClientProvider>
  )
}

export default App

