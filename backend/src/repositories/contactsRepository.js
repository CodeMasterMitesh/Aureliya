import bcrypt from 'bcryptjs'
import { runQuery } from '../db/mysql.js'

// Utility: split a full name into first/last heuristically
function splitName(full) {
  if (!full) return { first: null, last: null }
  const parts = String(full).trim().split(/\s+/)
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

function mapRoleToContactType(role = 'user', type = 'customer') {
  // prefer explicit type, then role fallback
  const t = (type || role || 'customer').toLowerCase()
  const map = { supplier: 'vendor', employee: 'employee', admin: 'other', user: 'customer' }
  return map[t] || (['customer','vendor','employee','lead','other'].includes(t) ? t : 'customer')
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePassword(hash, candidate) {
  if (!hash) return false
  return bcrypt.compare(candidate, hash)
}

export async function findByIdentifier({ email, username, identifier }) {
  const where = identifier
    ? 'WHERE email = ? OR username = ?'
    : email
      ? 'WHERE email = ?'
      : 'WHERE username = ?'
  const params = identifier ? [identifier, identifier] : email ? [email] : [username]
  const rows = await runQuery(
    `SELECT id, email, username, password_hash, contact_type, first_name, last_name, company_id, branch_id
     FROM contacts ${where} LIMIT 1`,
    params
  )
  return rows[0] || null
}

export async function createContact({ name, email, username, password, role, type, companyId, branchId }) {
  const { first, last } = splitName(name)
  const contactType = mapRoleToContactType(role, type)
  const passwordHash = await hashPassword(password)
  const res = await runQuery(
    `INSERT INTO contacts (contact_type, first_name, last_name, email, username, password_hash, status, is_active, company_id, branch_id)
     VALUES (?, ?, ?, ?, ?, ?, 'active', 1, ?, ?)`,
    [contactType, first, last, email, username || null, passwordHash, companyId || null, branchId || null]
  )
  const id = res.insertId
  const created = await runQuery(
    `SELECT id, email, username, contact_type, first_name, last_name, company_id, branch_id FROM contacts WHERE id = ?`,
    [id]
  )
  return created[0]
}

export async function getById(id) {
  const rows = await runQuery(
    `SELECT id, email, username, contact_type, first_name, last_name, company_id, branch_id FROM contacts WHERE id = ? LIMIT 1`,
    [id]
  )
  return rows[0] || null
}

export async function updateProfile(id, { name, email }) {
  const { first, last } = name ? splitName(name) : { first: undefined, last: undefined }
  const sets = []
  const params = []
  if (email !== undefined) { sets.push('email = ?'); params.push(email) }
  if (first !== undefined) { sets.push('first_name = ?'); params.push(first) }
  if (last !== undefined) { sets.push('last_name = ?'); params.push(last) }
  if (!sets.length) return getById(id)
  params.push(id)
  await runQuery(`UPDATE contacts SET ${sets.join(', ')} WHERE id = ?`, params)
  return getById(id)
}

export async function changePassword(id, newPassword) {
  const hash = await hashPassword(newPassword)
  await runQuery(`UPDATE contacts SET password_hash = ? WHERE id = ?`, [hash, id])
  return true
}

// Addresses
export async function listAddresses(contactId) {
  return runQuery(
    `SELECT id, address_type, line1, line2, line3, area, city, state, country, postal_code, landmark
     FROM contact_addresses WHERE contact_id = ? ORDER BY id ASC`,
    [contactId]
  )
}

export async function addAddress(contactId, payload) {
  const { address_type = 'business', line1, line2 = null, line3 = null, area = null, city = null, state = null, country = null, postal_code = null, landmark = null } = payload
  const res = await runQuery(
    `INSERT INTO contact_addresses (contact_id, address_type, line1, line2, line3, area, city, state, country, postal_code, landmark)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [contactId, address_type, line1, line2, line3, area, city, state, country, postal_code, landmark]
  )
  const id = res.insertId
  const rows = await runQuery(
    `SELECT id, address_type, line1, line2, line3, area, city, state, country, postal_code, landmark
     FROM contact_addresses WHERE id = ?`,
    [id]
  )
  return rows[0]
}

export async function updateAddress(addressId, payload) {
  const allowed = ['address_type','line1','line2','line3','area','city','state','country','postal_code','landmark']
  const sets = []
  const params = []
  for (const k of allowed) {
    if (payload[k] !== undefined) { sets.push(`${k} = ?`); params.push(payload[k]) }
  }
  if (!sets.length) return getAddressById(addressId)
  params.push(addressId)
  await runQuery(`UPDATE contact_addresses SET ${sets.join(', ')} WHERE id = ?`, params)
  return getAddressById(addressId)
}

export async function deleteAddress(addressId) {
  await runQuery(`DELETE FROM contact_addresses WHERE id = ?`, [addressId])
  return true
}

export async function getAddressById(id) {
  const rows = await runQuery(
    `SELECT id, address_type, line1, line2, line3, area, city, state, country, postal_code, landmark
     FROM contact_addresses WHERE id = ?`,
    [id]
  )
  return rows[0] || null
}

// Shape a contact row into the token/user payload expected by frontend
export function toAuthUserPayload(contact) {
  const name = [contact.first_name, contact.last_name].filter(Boolean).join(' ').trim()
  return {
    id: contact.id,
    email: contact.email,
    role: contact.contact_type === 'employee' ? 'employee' : (contact.contact_type === 'other' ? 'admin' : 'user'),
    type: contact.contact_type || 'customer',
    name,
    username: contact.username,
    company: contact.company_id,
    branch: contact.branch_id,
  }
}
