import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        introduction: 'src/pages/introduction.html'
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('postcss-combine-media-query')
      ]
    }
  }
}) 