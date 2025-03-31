import { defineConfig } from 'vite'
import { glob } from 'glob'
import path from 'path'

// Автоматически находим все HTML файлы в директории pages
const pages = glob.sync('src/pages/*.html').reduce((acc, file) => {
  const name = path.basename(file, '.html')
  acc[name] = file
  return acc
}, {})

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        ...pages
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