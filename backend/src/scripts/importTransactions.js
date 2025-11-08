/*
  Import transactions from legacy ERP tables to canonical Transaction model.
  Reads mapping from transactionMapping.config.json
*/
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import { createMysqlConn, streamTable, tableExists } from './streamingImportUtil.js'
import Transaction from '../models/canonical/Transaction.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import { resolveCompany, resolveBranch, resolveAccountGroup } from './resolvers.js'

dotenv.config()

const configPath = path.resolve(process.cwd(), 'src/scripts/transactionMapping.config.json')
const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'))

function pick(row, arr){ for (const k of arr||[]) { if (k in row && row[k] != null && String(row[k]) !== '') return row[k] }; return null }

async function findProductRef(val){
  if (!val) return null
  // try by numeric legacy id stored in sku or slug hash fallback
  let p = null
  if (typeof val === 'number') p = await Product.findOne({ sku: String(val) }).select('_id').lean()
  if (!p) p = await Product.findOne({ sku: String(val) }).select('_id').lean()
  return p?._id || null
}

async function findPartyRef(val){
  if (!val) return null
  // try by email/name as User; fallback by ledger snapshot name
  const u = await User.findOne({ $or: [ { name: val }, { 'ledger.title': val } ] }).select('_id').lean()
  return u?._id || null
}

function toNumber(x){ const n = Number(x); return Number.isFinite(n) ? n : 0 }

async function importSource(conn, src){
  const table = src.table
  if (!(await tableExists(conn, table))){
    console.log(`Skip missing ${table}`)
    return
  }
  console.log(`Importing ${table}`)
  const headerMap = src.header
  const lineDef = src.lines || null
  const linesCache = new Map()

  // Preload lines if defined
  if (lineDef && await tableExists(conn, lineDef.table)){
    const linkHeaderKey = lineDef.link.headerKey
    const linkLineKey = lineDef.link.lineKey
    await streamTable(conn, lineDef.table, { batchSize: 2000, onBatch: async rows => {
      for (const r of rows){
        const hid = r[linkLineKey]
        if (!linesCache.has(hid)) linesCache.set(hid, [])
        linesCache.get(hid).push(r)
      }
    } })
    console.log(`Preloaded lines from ${lineDef.table}: ${linesCache.size} headers`)
  }

  await streamTable(conn, table, { batchSize: 500, onBatch: async rows => {
    for (const h of rows){
      try {
        const number = pick(h, headerMap.number)
        const date = new Date(pick(h, headerMap.date) || Date.now())
        const partyVal = pick(h, headerMap.party)
        const companyVal = pick(h, headerMap.company)
        const branchVal = pick(h, headerMap.branch)
        const subtotal = toNumber(pick(h, headerMap.subtotal))
        const gt = toNumber(pick(h, headerMap.grand_total)) || toNumber(h.gtotal) || toNumber(h.grandtotal)
        const currency = pick(h, headerMap.currency) || 'INR'
        let tax_total = 0
        const txParts = [].concat(headerMap.tax_total || [])
        for (const k of txParts){ tax_total += toNumber(h[k]) }

        const company = await resolveCompany(companyVal)
        const branch = await resolveBranch(branchVal, company)
        const party = await findPartyRef(partyVal)

        const doc = new Transaction({
          kind: src.kind,
          number,
          date,
          company,
          branch,
          party,
          subtotal: subtotal || gt,
          tax_total,
          grand_total: gt || (subtotal + tax_total),
          currency,
          status: 'approved'
        })

        // Lines
        if (lineDef){
          const hdrId = h.id
          const lrows = linesCache.get(hdrId) || []
          for (const lr of lrows){
            const prodVal = pick(lr, lineDef.product)
            const product = await findProductRef(prodVal)
            const qty = toNumber(pick(lr, lineDef.qty)) || 1
            const price = toNumber(pick(lr, lineDef.price))
            const total = toNumber(pick(lr, lineDef.total)) || qty * price
            const tax_rate = toNumber(pick(lr, lineDef.tax_rate))
            const hsn = pick(lr, lineDef.hsn)
            doc.lines.push({ product, qty, price, total, tax_rate, unit: null, description: null })
          }
        }

        await doc.save()
      } catch (e){
        console.error('Transaction import error:', e.message)
      }
    }
  } })
}

async function main(){
  const { MONGODB_URI } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set')
  await mongoose.connect(MONGODB_URI)
  console.log('Mongo connected')
  const conn = await createMysqlConn(process.env)
  console.log('MySQL connected')

  for (const src of cfg.sources){
    await importSource(conn, src)
  }

  await conn.end()
  await mongoose.disconnect()
  console.log('Done transactions import')
}

main().catch(e => { console.error(e); process.exit(1) })
