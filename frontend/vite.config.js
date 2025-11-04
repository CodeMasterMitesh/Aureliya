import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },

  // ✅ Add this section for Vitest
  test: {
    environment: 'jsdom', // enables simulated browser (DOM)
    globals: true,        // allows using describe/it/expect without imports
    setupFiles: './src/setupTests.js', // optional, if you use jest-dom
  },
})
