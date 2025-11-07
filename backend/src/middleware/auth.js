import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function getTokenFromCookie(req) {
  const cookieHeader = req.headers.cookie || ''
  const parts = cookieHeader.split(';').map((s) => s.trim())
  for (const p of parts) {
    if (p.startsWith('access_token=')) return decodeURIComponent(p.split('=')[1] || '')
  }
  return null
}

export function auth(req, res, next) {
  const header = req.headers.authorization || ''
  let token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) token = getTokenFromCookie(req)
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export async function admin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
  const user = await User.findById(req.user.id).lean()
  if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  next()
}
