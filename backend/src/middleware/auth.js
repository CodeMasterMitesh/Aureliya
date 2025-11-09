import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import { getById as getContactById } from '../repositories/contactsRepository.js'

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
  // MySQL-only: rely on token role or contact_type in contacts table
  const role = req.user.role
  if (role === 'admin') return next()
  try {
    const c = await getContactById(req.user.id)
    if (c && (c.contact_type === 'admin' || c.contact_type === 'other')) return next()
  } catch {}
  return res.status(403).json({ error: 'Forbidden' })
}
