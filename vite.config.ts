import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.png'],
      manifest: {
        name: 'FuelFlow Pro — Customer Portal',
        short_name: 'FuelFlow',
        description: 'Manage your bulk fuel orders, track deliveries, and make payments.',
        theme_color: '#1d4ed8',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          {
            name: 'New Order',
            short_name: 'Order',
            url: '/orders/new',
            icons: [{ src: '/icons/shortcut-order.png', sizes: '96x96' }],
          },
          {
            name: 'Track Delivery',
            short_name: 'Track',
            url: '/orders',
            icons: [{ src: '/icons/shortcut-track.png', sizes: '96x96' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/api\/customers\/me/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'customer-profile',
              expiration: { maxAgeSeconds: 60 * 60 },
            },
          },
          {
            urlPattern: /^https?:\/\/.*\/api\/orders/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'orders-cache',
              expiration: { maxAgeSeconds: 60 * 5 },
            },
          },
          {
            urlPattern: /^https?:\/\/.*\/api\/invoices/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'invoices-cache',
              expiration: { maxAgeSeconds: 60 * 5 },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
