// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '.trycloudflare.com'
    ]
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@prayer': path.resolve(__dirname, './src/components/pages/prayer')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'] // framer-motion appeared unused but good to keep if added later
        }
      }
    }
  }
})