import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Ledger from '../models/Ledger.js'
import AccountGroup from '../models/AccountGroup.js'

dotenv.config()

async function main(){
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI not set')
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  const cursor = Ledger.find({}).cursor()
  let processed = 0
  for await (const doc of cursor){
    try {
      const payload = doc.toObject()
      const ledger = { ...payload, ledger_ref: doc._id, updated_at: new Date() }
      delete ledger._id
      delete ledger.__v

      if (ledger.account_group_id){
        const ag = await AccountGroup.findById(ledger.account_group_id).lean()
        if (ag) ledger.account_group_name = ag.name
      }

      let user = null
      if (doc.email) user = await User.findOne({ email: doc.email })
      if (user){
        user.ledger = { ...user.ledger, ...ledger }
        if (doc.company && !user.company) user.company = doc.company
        if (doc.branch && !user.branch) user.branch = doc.branch
        await user.save()
      } else {
        const name = doc.title || 'Ledger Entry'
        // Generate a placeholder password; user may be non-auth
        const password = 'Temp#' + Math.random().toString(36).slice(2, 10)
        user = await User.create({
          name,
          email: doc.email, // may be undefined
          password,
          company: doc.company,
          branch: doc.branch,
          type: 'customer',
          ledger,
        })
      }
      processed++
      if (processed % 100 === 0) console.log(`Processed ${processed} ledgers...`)
    } catch (e){
      console.error('Failed to migrate ledger', doc._id, e)
    }
  }
  console.log(`Done. Migrated ${processed} ledgers.`)
  await mongoose.disconnect()
}

main().catch(err => { console.error(err); process.exit(1) })
