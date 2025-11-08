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
  'connect-src': ["'self'", env.FRONTEND_URL.replace(/\/$/, ''), 'http://localhost:3000', 'http://localhost:3001'],
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

// CSRF protection (apply to all API routes so GET initializes secret properly)
// Use separate secret cookie (httpOnly) and a readable token cookie we set manually.
const csrfProtection = csrf({
  cookie: {
    key: '_csrf', // secret cookie name (not exposed to frontend JS)
    sameSite: 'lax',
    secure: env.isProduction,
    httpOnly: true,
    signed: false,
  },
})
// Apply CSRF protection only to unsafe methods; allow safe reads without token.
// Additionally, expose a request-scoped helper for safe methods to generate a token lazily.
app.use(env.API_PREFIX, (req, res, next) => {
  if (['GET','HEAD','OPTIONS'].includes(req.method)) {
    // For GETs we still want ability to issue token later without wrapping route again.
    req._csrfInit = () => new Promise((resolve, reject) => {
      csrfProtection(req, res, (err) => (err ? reject(err) : resolve()))
    })
    return next()
  }
  return csrfProtection(req, res, next)
})

// Endpoint to issue a CSRF token (frontend reads XSRF-TOKEN cookie or response)
app.get(`${env.API_PREFIX}/csrf`, async (req, res) => {
  try {
    // Initialize secret if not already done
    if (!req.csrfToken) {
      await req._csrfInit()
    }
    const token = req.csrfToken()
    res.cookie('XSRF-TOKEN', token, {
      sameSite: 'lax',
      secure: env.isProduction,
      httpOnly: false,
    })
    return res.json({ csrfToken: token })
  } catch (e) {
    return res.status(500).json({ error: 'Failed to issue CSRF token', detail: e.message })
  }
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

// Explicit CSRF error handler (placed before generic error handler)
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      error: {
        code: 'EBADCSRFTOKEN',
        message: 'Invalid or missing CSRF token',
      },
    })
  }
  return next(err)
})

app.use(errorHandler)

export default app
