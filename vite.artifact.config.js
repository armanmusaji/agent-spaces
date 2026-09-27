import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], build: { outDir: 'dist-artifact', rollupOptions: { input: 'artifact-entry.html', output: { inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: 'app.[ext]' } }, cssCodeSplit: false, modulePreload: false } })
