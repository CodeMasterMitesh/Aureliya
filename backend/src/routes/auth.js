import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import {
  findByIdentifier,
  createContact,
  getById as getContactById,
  updateProfile as updateContactProfile,
  changePassword as changeContactPassword,
  listAddresses as listContactAddresses,
  addAddress as addContactAddress,
  updateAddress as updateContactAddress,
  deleteAddress as deleteContactAddress,
  toAuthUserPayload,
  comparePassword as compareContactPassword,
} from '../repositories/contactsRepository.js'
// Mongo models removed; auth now uses MySQL contacts only
import { auth } from '../middleware/auth.js'
import { loginLimiter } from '../middleware/rateLimit.js'
const r = Router()

function sign(rawUser, req, res) {
  // rawUser may be a Mongo User document or a contacts row shaped into payload already
  const payload = rawUser._id
    ? {
        id: rawUser._id,
        email: rawUser.email,
        role: rawUser.role,
        type: rawUser.type || 'customer',
        name: rawUser.name,
        username: rawUser.username,
        company: rawUser.company,
        branch: rawUser.branch,
      }
    : toAuthUserPayload(rawUser)
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
  // Also set secure HttpOnly cookie to move away from localStorage over time
  if (res) {
    const isProd = process.env.NODE_ENV === 'production'
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
  }

  // Store user data in session
  if (req && req.session) {
    req.session.user = payload
  }

  return { token, user: payload }
}

// Register (Mongo legacy or MySQL contacts depending on flag)
r.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
    const existing = await findByIdentifier({ email })
    if (existing) return res.status(400).json({ error: 'Email already registered' })
    const created = await createContact({ name, email, password, role: 'user', type: 'customer' })
    return res.json(sign(created, req, res))
  } catch (e) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

r.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, username, identifier, password, companyId, branchId } = req.body
    const contact = await findByIdentifier({ email, username, identifier })
    if (!contact) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await compareContactPassword(contact.password_hash, password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    if ((companyId && contact.company_id && contact.company_id !== companyId) || (branchId && contact.branch_id && contact.branch_id !== branchId)) {
      return res.status(401).json({ error: 'Company/Branch mismatch' })
    }
    return res.json(sign(contact, req, res))
  } catch (e) {
    res.status(500).json({ error: 'Login failed' })
  }
})

r.post('/logout', async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Logout failed' })
        }
        res.clearCookie('connect.sid')
        res.clearCookie('access_token')
        res.json({ ok: true, message: 'Logged out successfully' })
      })
    } else {
      res.json({ ok: true, message: 'Logged out successfully' })
    }
  } catch (e) {
    res.status(500).json({ error: 'Logout failed' })
  }
})

// merge-cart removed since cart feature is removed

// Authenticated user profile endpoints
r.get('/me', auth, async (req, res) => {
  try {
    const contact = await getContactById(req.user.id)
    if (!contact) return res.status(404).json({ error: 'User not found' })
    const addresses = await listContactAddresses(contact.id)
    const name = [contact.first_name, contact.last_name].filter(Boolean).join(' ').trim()
    return res.json({ id: contact.id, name, email: contact.email, role: contact.contact_type, profileImage: null, addresses, createdAt: null })
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
})

r.put('/me', auth, async (req, res) => {
  try {
    const { name, email, profileImage } = req.body
    const updated = await updateContactProfile(req.user.id, { name, email })
    if (!updated) return res.status(404).json({ error: 'User not found' })
    const addresses = await listContactAddresses(updated.id)
    const nameFull = [updated.first_name, updated.last_name].filter(Boolean).join(' ').trim()
    return res.json({ id: updated.id, name: nameFull, email: updated.email, role: updated.contact_type, profileImage: null, addresses })
  } catch (e) {
    return res.status(400).json({ error: 'Update failed' })
  }
})

r.put('/change-password', auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const contact = await findByIdentifier({ identifier: req.user.email }) || await getContactById(req.user.id)
    if (!contact) return res.status(404).json({ error: 'User not found' })
    const ok = await compareContactPassword(contact.password_hash, oldPassword)
    if (!ok) return res.status(400).json({ error: 'Invalid current password' })
    await changeContactPassword(contact.id, newPassword)
    return res.json({ ok: true })
  } catch (e) {
    return res.status(400).json({ error: 'Change password failed' })
  }
})

// Addresses
r.post('/me/addresses', auth, async (req, res) => {
  try {
    const addr = await addContactAddress(req.user.id, req.body)
    return res.status(201).json(addr)
  } catch (e) {
    res.status(400).json({ error: 'Add address failed' })
  }
})

r.put('/me/addresses/:id', auth, async (req, res) => {
  try {
    const updated = await updateContactAddress(Number(req.params.id), req.body)
    if (!updated) return res.status(404).json({ error: 'Address not found' })
    return res.json(updated)
  } catch (e) {
    res.status(400).json({ error: 'Update address failed' })
  }
})

r.delete('/me/addresses/:id', auth, async (req, res) => {
  try {
    await deleteContactAddress(Number(req.params.id))
    return res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: 'Delete address failed' })
  }
})

export default r
