import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // ✅ Ensure build output is explicitly set
    chunkSizeWarningLimit: 1000, // 🔧 Increase chunk limit to avoid warnings
  },
})
