/*
  Import account groups from Accountgroups table into canonical AccountGroup model.
*/
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createMysqlConn, streamTable } from './streamingImportUtil.js'
import AccountGroup from '../models/AccountGroup.js'

dotenv.config()

function mapGroup(row){
  return {
    name: row.groupname || row.name || row.title || `Group-${row.id}`,
    description: row.description || row.remark || undefined,
    parentGroup: null // could be resolved if hierarchy exists in source
  }
}

async function main(){
  const { MONGODB_URI } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set')
  await mongoose.connect(MONGODB_URI)
  console.log('Mongo connected')
  const conn = await createMysqlConn(process.env)
  console.log('MySQL connected')

  let created = 0, updated = 0
  await streamTable(conn, 'Accountgroups', { batchSize: 1000, onBatch: async rows => {
    for (const row of rows){
      const data = mapGroup(row)
      let doc = await AccountGroup.findOne({ name: data.name })
      if (doc){
        if (data.description && !doc.description) doc.description = data.description
        await doc.save(); updated++
      } else {
        await AccountGroup.create(data); created++
      }
    }
  } })

  console.log(`AccountGroups: created=${created} updated=${updated}`)
  await conn.end()
  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
