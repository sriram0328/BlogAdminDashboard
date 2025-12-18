
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5181,       // <--- Sets the port to 5181
    strictPort: true, // <--- Ensures it doesn't switch to 5182 if 5181 is busy
  },
})