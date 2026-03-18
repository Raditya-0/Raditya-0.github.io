import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: true
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
