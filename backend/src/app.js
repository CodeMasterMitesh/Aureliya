import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import { env } from './config/index.js'
import helmet from 'helmet'
import { requestId, httpLogger } from './middleware/logger.js'
import { notFound, errorHandler } from './middleware/error.js'

import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import categoryRoutes from './routes/categories.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/orders.js'
import adminRoutes from './routes/admin.js'
import blogRoutes from './routes/blogs.js'
import paymentRoutes from './routes/payments.js'
import uploadRoutes from './routes/uploads.js'
import menuRoutes from './routes/menus.js'
import companyRoutes from './routes/companies.js'
import accountGroupRoutes from './routes/accountGroups.js'
import ledgerRoutes from './routes/ledgers.js'

const app = express()
// basic middlewares
app.use(requestId)
app.use(httpLogger)
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
// Security headers & CSP (adjust domains as needed)
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'blob:'],
        'connect-src': ["'self'", env.FRONTEND_URL.replace(/\/$/, ''), 'http://localhost:3000'],
        'object-src': ["'none'"],
        'frame-ancestors': ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false, // for potential third-party scripts/images
  })
)
// Allow common frontend dev ports; prefer explicit env but include 3001 fallback for port conflicts
const allowedOrigins = [env.FRONTEND_URL, 'http://localhost:3001']
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)
// Configure session
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: env.isProduction,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
)

// CSRF protection using double-submit cookie pattern
const csrfProtection = csrf({ cookie: { key: 'XSRF-TOKEN', sameSite: 'lax', secure: env.isProduction, httpOnly: false } })
// Apply CSRF middleware under API prefix (GET/HEAD/OPTIONS ignored by default)
app.use(env.API_PREFIX, csrfProtection)
// Provide explicit endpoint to fetch token and also set cookie on GETs
app.get(`${env.API_PREFIX}/csrf`, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { sameSite: 'lax', secure: env.isProduction, httpOnly: false })
  res.json({ csrfToken: req.csrfToken() })
})
// For convenience, set XSRF-TOKEN on other GET requests under API prefix
app.use((req, res, next) => {
  if (req.method === 'GET' && req.path.startsWith(env.API_PREFIX)) {
    try { res.cookie('XSRF-TOKEN', req.csrfToken(), { sameSite: 'lax', secure: env.isProduction, httpOnly: false }) } catch {}
  }
  next()
})

app.get('/health', (_, res) => res.json({ ok: true }))

// Static uploads directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
app.use('/uploads', express.static(path.join(rootDir, 'uploads')))

// Versioned routes
const api = env.API_PREFIX
app.use(`${api}/auth`, authRoutes)
app.use(`${api}/products`, productRoutes)
app.use(`${api}/categories`, categoryRoutes)
app.use(`${api}/cart`, cartRoutes)
app.use(`${api}/orders`, orderRoutes)
app.use(`${api}/admin`, adminRoutes)
app.use(`${api}/blogs`, blogRoutes)
app.use(`${api}/payments`, paymentRoutes)
app.use(`${api}/uploads`, uploadRoutes)
app.use(`${api}`, menuRoutes)
app.use(`${api}`, companyRoutes)
app.use(`${api}`, accountGroupRoutes)
app.use(`${api}`, ledgerRoutes)

// Optional legacy mounts for smooth transition
if (env.ENABLE_LEGACY_API) {
  app.use('/api/auth', authRoutes)
  app.use('/api/products', productRoutes)
  app.use('/api/categories', categoryRoutes)
  app.use('/api/cart', cartRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/api/admin', adminRoutes)
  app.use('/api/blogs', blogRoutes)
  app.use('/api/payments', paymentRoutes)
  app.use('/api/uploads', uploadRoutes)
  app.use('/api', menuRoutes)
  app.use('/api', companyRoutes)
  app.use('/api', accountGroupRoutes)
  app.use('/api', ledgerRoutes)
}

// 404 and error handler
app.use(notFound)
app.use(errorHandler)

export default app
