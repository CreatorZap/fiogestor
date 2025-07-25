import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'FioGestor - Seu ateliê em modo automático',
        short_name: 'FioGestor',
        description: 'Sistema de gestão completo para costureiras autônomas',
        theme_color: '#ec4899',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?v=1`;
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/js\.stripe\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'stripe-cache',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
      '@/styles': path.resolve(__dirname, './src/styles'),
    },
  },
  define: {
    // Expose environment variables to the client
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
    
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'chart-vendor': ['recharts'],
          'date-vendor': ['date-fns'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Target modern browsers
    target: 'es2020',
    
    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000,
    host: true, // Allow external connections
    open: true, // Open browser on start
    cors: true,
    
    // Proxy API calls (for development)
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 3000,
    host: true,
    cors: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'lucide-react',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'date-fns',
      'react-hot-toast',
      '@stripe/stripe-js',
      '@stripe/react-stripe-js',
    ],
  },
  esbuild: {
    // Remove console logs in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})

