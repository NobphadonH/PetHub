import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/pethub-website/",
  ssr: {
    noExternal: ["remix-utils"],
  },
  server: {
    host: '0.0.0.0',  // Listen on all network interfaces
    port: 5173,        // Ensure it's the port you're using
  }
})
