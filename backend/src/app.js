import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'

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

dotenv.config()

const app = express()
app.use(express.json({ limit: '1mb' }))
// Allow common frontend dev ports; prefer explicit env but include 3001 fallback for port conflicts
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3001',
]
app.use(cors({ 
  origin: allowedOrigins,
  credentials: true 
}))
// Configure session
app.use(session({
  secret: process.env.SESSION_SECRET || 'aureliya_session_secret_key_change_in_production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}))

app.get('/health', (_, res) => res.json({ ok: true }))

// Static uploads directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
app.use('/uploads', express.static(path.join(rootDir, 'uploads')))

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

export default app
