import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createReadStream } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RSC_WEB_DIR = path.resolve(__dirname, 'rsc-web')

function isInsideDir(file: string, dir: string): boolean {
  const f = path.resolve(file)
  const d = path.resolve(dir)
  return f === d || f.startsWith(d + path.sep)
}

function rscWebStaticPlugin(): Plugin {
  return {
    name: 'rsc-web-static',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split('?')[0] ?? ''
        if (!raw.startsWith('/rsc-web')) return next()

        let rel = raw.slice('/rsc-web'.length) || '/'
        if (rel === '' || rel === '/') rel = '/index.html'
        try {
          rel = decodeURIComponent(rel)
        } catch {
          return next()
        }

        let filePath = path.normalize(path.join(RSC_WEB_DIR, rel))
        if (!isInsideDir(filePath, RSC_WEB_DIR)) return next()

        try {
          const st = fs.statSync(filePath)
          if (st.isDirectory()) {
            filePath = path.join(filePath, 'index.html')
          }
        } catch {
          return next()
        }

        try {
          if (!fs.statSync(filePath).isFile()) return next()
        } catch {
          return next()
        }

        const ext = path.extname(filePath).toLowerCase()
        const types: Record<string, string> = {
          '.html': 'text/html; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.mjs': 'application/javascript; charset=utf-8',
          '.json': 'application/json',
          '.svg': 'image/svg+xml',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.webp': 'image/webp',
          '.ico': 'image/x-icon',
          '.woff2': 'font/woff2',
          '.woff': 'font/woff',
          '.ttf': 'font/ttf',
          '.apk': 'application/vnd.android.package-archive',
        }
        res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
        res.setHeader('Cache-Control', 'no-cache')
        const stream = createReadStream(filePath)
        stream.on('error', () => next())
        stream.pipe(res)
      })
    },
    closeBundle() {
      if (!fs.existsSync(RSC_WEB_DIR)) {
        console.warn('[rsc-web-static] No existe la carpeta rsc-web junto al proyecto; omitiendo copia al dist.')
        return
      }
      const outDir = path.resolve(__dirname, 'dist')
      const dest = path.join(outDir, 'rsc-web')
      fs.mkdirSync(outDir, { recursive: true })
      fs.cpSync(RSC_WEB_DIR, dest, {
        recursive: true,
        filter: (src) => {
          const norm = path.normalize(src)
          const parts = norm.split(path.sep)
          if (parts.includes('node_modules')) return false
          if (parts.includes('.git')) return false
          return true
        },
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|tsx|js)$/,
      babel: {
        plugins: [],
      },
    }),
    rscWebStaticPlugin(),
  ],
  root: './src',
  publicDir: '../public',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    open: false,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'ethers'],
  },
})

