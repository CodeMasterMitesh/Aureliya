import 'dotenv/config'
import mongoose from 'mongoose'
import { env } from '../src/config/index.js'
import User from '../src/models/User.js'
import { initMysqlIfEnabled, runQuery } from '../src/db/mysql.js'

function splitName(full) {
  if (!full) return { first: null, last: null }
  const parts = String(full).trim().split(/\s+/)
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

function mapContactType(u) {
  const t = u.type || u.role || 'customer'
  const map = { supplier: 'vendor', employee: 'employee', admin: 'other', user: 'customer' }
  return map[t] || (['customer','vendor','employee','lead','other'].includes(t) ? t : 'customer')
}

async function upsertContact(conn, u) {
  const { first, last } = splitName(u.name)
  const contactType = mapContactType(u)
  const email = u.email || null
  const mobile = u.ledger?.mobile_no || null
  const username = u.username || null
  const pan = u.ledger?.pan_no || u.employee?.pan || null
  const gst = u.ledger?.gstin || null
  const opening = null
  const closing = null

  const columns = `contact_type, salutation, first_name, middle_name, last_name, email, mobile,
    status, is_active, is_deleted, company_id, branch_id, group_id,
    opening_balance, closing_balance, balance_type, credit_limit, due_days,
    username, password_hash, last_login, last_logout, nationality, religion, caste,
    birth_date, pan, gst_no, tin_no, notes, remarks, created_by, updated_by`
  const placeholders = '(' + new Array(33).fill('?').join(',') + ')'
  const sql = `INSERT INTO contacts (${columns}) VALUES ${placeholders}
  ON DUPLICATE KEY UPDATE
    email = VALUES(email),
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    mobile = VALUES(mobile),
    contact_type = VALUES(contact_type)`

  const params = [
    contactType, null, first, null, last, email, mobile,
    'active', 1, 0, null, null, null,
    opening, closing, null, null, null,
    username, null, null, null, null, null, null,
    u.ledger?.birth_date || null, pan, gst, null, null, null, null, null,
  ]

  const res = await runQuery(sql, params)
  const contactId = res.insertId || (await (async () => {
    // If duplicate (username unique), fetch the existing id
    const rows = await runQuery('SELECT id FROM contacts WHERE username = ? OR email = ? LIMIT 1', [username, email])
    return rows[0]?.id
  })())

  // Address from ledger snapshot
  const addr = u.ledger
  if (addr && (addr.address_line1 || addr.city || addr.state)) {
    await runQuery(
      `INSERT INTO contact_addresses (contact_id, address_type, line1, line2, line3, area, city, state, country, postal_code)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [contactId, 'business', addr.address_line1 || '', addr.address_line2 || null, addr.address_line3 || null, addr.area || null, addr.city || null, addr.state || null, addr.country || null, addr.pincode || null]
    )
  }

  // Bank from ledger snapshot
  if (addr && (addr.bank_name || addr.account_no)) {
    await runQuery(
      `INSERT INTO contact_accounts (contact_id, bank_name, branch_name, account_no, ifsc_code, swift_code, is_primary)
       VALUES (?,?,?,?,?,?,1)`,
      [contactId, addr.bank_name || null, addr.branch_name || null, addr.account_no || null, addr.ifsc_code || null, addr.swift_code || null]
    )
  }

  return contactId
}

async function main() {
  await mongoose.connect(env.MONGODB_URI)
  await initMysqlIfEnabled()

  const cursor = User.find({}).cursor()
  let n = 0
  for (let u = await cursor.next(); u != null; u = await cursor.next()) {
    try {
      await upsertContact(null, u)
      n++
      if (n % 100 === 0) console.log(`Migrated ${n} users -> contacts`)
    } catch (e) {
      console.error('Failed migrating user', u._id?.toString?.(), e.message)
    }
  }

  console.log('Done. Migrated total:', n)
  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
