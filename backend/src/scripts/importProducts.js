/*
  Consolidate products from multiple legacy tables into canonical Product.
  Uses productConsolidation.config.json for column alias resolution.
*/
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import { createMysqlConn, streamTable, tableExists } from './streamingImportUtil.js'
import Product from '../models/Product.js'
import { resolveCompany, resolveBranch } from './resolvers.js'

dotenv.config()

const configPath = path.resolve(process.cwd(), 'src/scripts/productConsolidation.config.json')
const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'))

function firstField(row, candidates){
  for (const c of candidates){
    if (c in row && row[c] != null && String(row[c]).trim() !== '') return row[c]
  }
  return null
}

function buildHash(name, unit){
  return (String(name||'').toLowerCase() + '|' + String(unit||'').toLowerCase()).replace(/\s+/g,' ')
}

async function upsertBatch(rows, columnMap){
  for (const r of rows){
    const name = firstField(r, columnMap.name)
    if (!name) continue
    const sku = firstField(r, columnMap.sku)
    const unit = firstField(r, columnMap.unit)
    const hsn = firstField(r, columnMap.hsn)
    const gst = Number(firstField(r, columnMap.gst)) || 0
    const mrp = Number(firstField(r, columnMap.mrp)) || undefined
    const purchasePrice = Number(firstField(r, columnMap.purchase_price)) || undefined
    const companyName = firstField(r, columnMap.company)
    const branchName = firstField(r, columnMap.branch)
    const companyId = companyName ? await resolveCompany(companyName) : null
    const branchId = branchName ? await resolveBranch(branchName, companyId) : null
    const hash = buildHash(name, unit)

    let doc
    if (sku){
      doc = await Product.findOne({ sku })
    }
    if (!doc){
      doc = await Product.findOne({ slug: hash }) // fallback slug-based
    }
    if (doc){
      // update missing fields only
      if (!doc.sku && sku) doc.sku = sku
      if (!doc.unit && unit) doc.unit = unit
      if (!doc.hsn_code && hsn) doc.hsn_code = hsn
      if (doc.gst_rate === 0 && gst) doc.gst_rate = gst
      if (!doc.mrp && mrp) doc.mrp = mrp
      if (!doc.purchase_price && purchasePrice) doc.purchase_price = purchasePrice
      if (!doc.company && companyId) doc.company = companyId
      if (!doc.branch && branchId) doc.branch = branchId
      await doc.save()
    } else {
      const slug = hash.replace(/[^a-z0-9|]+/g,'-').replace(/-+/g,'-').replace(/\|/g,'-')
      await Product.create({
        title: name,
        slug,
        sku: sku || undefined,
        unit: unit || undefined,
        hsn_code: hsn || undefined,
        gst_rate: gst || 0,
        mrp: mrp,
        purchase_price: purchasePrice,
        company: companyId,
        branch: branchId,
        price: purchasePrice || mrp || 0,
        stock: 0
      })
    }
  }
}

async function main(){
  const { MONGODB_URI } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set')
  await mongoose.connect(MONGODB_URI)
  console.log('Mongo connected')
  const conn = await createMysqlConn(process.env)
  console.log('MySQL connected')

  for (const src of cfg.sources){
    const table = src.table
    const columns = src.columns.$ref ? cfg.$defs.defaultColumns : src.columns
    if (!(await tableExists(conn, table))){
      console.log(`Skip missing table ${table}`)
      continue
    }
    console.log(`Importing table ${table}`)
    let total = 0
    await streamTable(conn, table, { batchSize: 500, onBatch: async rows => {
      await upsertBatch(rows, columns)
      total += rows.length
    } })
    console.log(`Table ${table} processed rows=${total}`)
  }

  await conn.end()
  await mongoose.disconnect()
  console.log('Done product consolidation')
}

main().catch(e => { console.error(e); process.exit(1) })
