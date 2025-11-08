/*
  Import companies and branches from legacy tables using streaming utility.
  Mapping source: Companymaster, Branchmaster
*/
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createMysqlConn, streamTable } from './streamingImportUtil.js'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'

dotenv.config()

function mapCompany(row){
  return {
    name: row.companyname || row.name || row.title || 'Company',
    code: row.code || undefined,
    address: [row.address1, row.address2, row.address3].filter(Boolean).join(', '),
    city: row.city || undefined,
    state: row.state || undefined,
    country: row.country || 'India',
    gstin: row.gstno || row.gstin || undefined,
    pan: row.panno || undefined,
    email: row.email || undefined,
    phone: row.phone || row.mobile || undefined,
  }
}

function mapBranch(row, companyId){
  return {
    company: companyId,
    name: row.branchname || row.name || 'Branch',
    code: row.code || undefined,
    address: [row.address1, row.address2, row.address3].filter(Boolean).join(', '),
    city: row.city || undefined,
    state: row.state || undefined,
    country: row.country || 'India'
  }
}

async function main(){
  const { MONGODB_URI } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set')
  await mongoose.connect(MONGODB_URI)
  console.log('Mongo connected')
  const conn = await createMysqlConn(process.env)
  console.log('MySQL connected')

  let companiesCreated = 0, companiesUpdated = 0
  await streamTable(conn, 'Companymaster', { batchSize: 500, onBatch: async rows => {
    for (const row of rows){
      const data = mapCompany(row)
      let doc = await Company.findOne({ name: data.name })
      if (doc){
        // minimal update
        doc.gstin = doc.gstin || data.gstin
        doc.pan = doc.pan || data.pan
        doc.email = doc.email || data.email
        doc.phone = doc.phone || data.phone
        await doc.save()
        companiesUpdated++
      } else {
        await Company.create(data)
        companiesCreated++
      }
    }
  } })

  const companyCache = {}
  const companies = await Company.find().select('name _id').lean()
  for (const c of companies) companyCache[c.name] = c._id

  let branchesCreated = 0, branchesUpdated = 0
  await streamTable(conn, 'Branchmaster', { batchSize: 500, onBatch: async rows => {
    for (const row of rows){
      const baseName = row.companyname || row.company || row.name
      const companyId = companyCache[baseName] || null
      const data = mapBranch(row, companyId)
      let doc = await Branch.findOne({ name: data.name, company: companyId })
      if (doc){
        doc.address = doc.address || data.address
        await doc.save()
        branchesUpdated++
      } else {
        await Branch.create(data)
        branchesCreated++
      }
    }
  } })

  console.log(`Companies: created=${companiesCreated} updated=${companiesUpdated}`)
  console.log(`Branches: created=${branchesCreated} updated=${branchesUpdated}`)
  await conn.end()
  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
