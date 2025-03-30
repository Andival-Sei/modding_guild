import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  }
}) 