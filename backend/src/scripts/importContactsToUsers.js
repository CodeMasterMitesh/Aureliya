/*
  Import contacts from an existing MariaDB/MySQL `contacts` table into Mongo Users.

  Env vars required:
    MONGODB_URI=mongodb connection string
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER=root
    MYSQL_PASSWORD=secret
    MYSQL_DATABASE=il_ipc (or your DB)
    ALLOW_NO_EMAIL=true|false (optional, default false). When true, creates placeholder emails.

  Run:
    node src/scripts/importContactsToUsers.js
*/

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import mysql from 'mysql2/promise'
import User from '../models/User.js'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'

dotenv.config()

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

function toUserType(v) {
  if (!v) return 'other'
  const s = String(v).toLowerCase()
  if (s.includes('employee')) return 'employee'
  if (s.includes('customer') || s.includes('client')) return 'customer'
  if (s.includes('supplier') || s.includes('vendor')) return 'supplier'
  if (s.includes('bank')) return 'bank'
  if (s.includes('cash')) return 'cash'
  return 'other'
}

function fullName(row) {
  const parts = [row.firstname, row.middlename, row.lastname].filter(Boolean)
  if (parts.length) return parts.join(' ').replace(/\s+/g, ' ').trim()
  return row.cpname || row.company || 'Contact'
}

function pickEmail(row) {
  const cands = [
    row['e-mailaddress1'],
    row['e-mailaddress2'],
    row['e-mailaddress'],
    row['e-mail2address'],
    row['e-mail3address'],
  ]
  const e = cands.find(x => x && String(x).includes('@'))
  return e ? String(e).toLowerCase() : null
}

function pickPhone(row) {
  const cands = [row.mobile, row.primaryphone, row.businessphone, row.homephone]
  return cands.find(x => x && String(x).trim()) || null
}

function addressFrom(prefix, row, label) {
  const line = [row[`${prefix}street`], row[`${prefix}street2`], row[`${prefix}street3`]]
    .filter(Boolean)
    .join(', ')
  const city = row[`${prefix}city`] || ''
  const zip = row[`${prefix}postalcode`] || ''
  const country = row[`${prefix}country`] || 'India'
  if (!(line || city || zip)) return null
  return { label: label, line1: line || city || 'NA', city: city || 'NA', zip: zip || '000000', country }
}

async function resolveCompanyRef(name) {
  if (!name) return null
  const c = await Company.findOne({ name }).select('_id').lean()
  return c ? c._id : null
}

async function resolveBranchRef(name) {
  // If you keep branches by name, implement lookup. For now return null.
  return null
}

function randPassword() {
  return 'Temp#' + Math.random().toString(36).slice(2, 10)
}

function mapLedger(row) {
  return {
    gstin: row.gstno || undefined,
    pan_no: row.pancardno || row.PAN || undefined,
    bank_name: row.bankname || undefined,
    branch_name: row.bankbranchname || undefined,
    account_no: row.bankacno || undefined,
    mobile_no: row.mobile || undefined,
    country: row.businesscountry || row.homecountry || 'India',
    is_active: row.active !== 0,
    updated_at: new Date(),
  }
}

async function main() {
  const { MONGODB_URI, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, ALLOW_NO_EMAIL } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set')
  if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_DATABASE) throw new Error('MySQL env vars not set')

  console.log('Connecting to Mongo...')
  await mongoose.connect(MONGODB_URI)
  console.log('Connected Mongo')

  console.log('Connecting to MySQL...')
  const conn = await mysql.createConnection({ host: MYSQL_HOST, port: Number(MYSQL_PORT || 3306), user: MYSQL_USER, password: MYSQL_PASSWORD, database: MYSQL_DATABASE, rowsAsArray: false })
  console.log('Connected MySQL')

  const [rows] = await conn.execute('SELECT * FROM contacts')
  console.log(`Fetched ${rows.length} contacts`)

  let created = 0, updated = 0, skipped = 0
  for (const row of rows) {
    try {
      const email = pickEmail(row)
      if (!email) {
        if (ALLOW_NO_EMAIL === 'true') {
          row.__placeholderEmail = `noemail-${row.id || Math.random().toString(36).slice(2)}@import.local`
        } else {
          skipped++
          continue
        }
      }

      const name = fullName(row)
      const type = toUserType(row.type)
      const phone = pickPhone(row)
      const ledger = mapLedger(row)
      const business = addressFrom('business', row, 'Business')
      const home = addressFrom('home', row, 'Home')
      const other = addressFrom('other', row, 'Other')
      const addresses = [business, home, other].filter(Boolean)

      const companyRef = await resolveCompanyRef(row.company)
      const branchRef = await resolveBranchRef(row.branch)

      const queryEmail = email || row.__placeholderEmail
      let user = await User.findOne({ email: queryEmail })
      if (user) {
        // update
        user.name = user.name || name
        user.type = user.type || type
        if (!user.profileImage && row.photo) user.profileImage = row.photo
        if (companyRef) user.company = companyRef
        if (branchRef) user.branch = branchRef
        // merge addresses minimally (append if none)
        if ((!user.addresses || user.addresses.length === 0) && addresses.length) user.addresses = addresses
        user.ledger = { ...user.ledger, ...ledger }
        await user.save()
        updated++
      } else {
        user = await User.create({
          name,
          username: null,
          email: queryEmail,
          password: randPassword(),
          role: 'user',
          type,
          company: companyRef,
          branch: branchRef,
          profileImage: row.photo || undefined,
          addresses,
          ledger,
        })
        created++
      }
    } catch (e) {
      console.error('Failed to import contact', row?.id, e.message)
      skipped++
      await sleep(5)
    }
  }

  console.log(`Done. created=${created} updated=${updated} skipped=${skipped}`)
  await conn.end()
  await mongoose.disconnect()
}

main().catch(err => { console.error(err); process.exit(1) })
