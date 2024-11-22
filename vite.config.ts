import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
   postcss: {
    plugins: [tailwindcss()],
   },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
    }
  },
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'SDKWidget',
      fileName: 'sdk-widget',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        extend: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: (assetInfo: any) => {
          if (assetInfo.name === 'style.css') {
            return 'sdk-widget.css';
          }
          return assetInfo.name;
        },
      }
    },
    cssCodeSplit: false
  }
}) 