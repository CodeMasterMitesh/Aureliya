import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'
import Ledger from '../models/Ledger.js'
import AccountGroup from '../models/AccountGroup.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aureliya_ecom'

async function inspect() {
  await mongoose.connect(MONGODB_URI)
  console.log('✓ Connected to MongoDB\n')

  const [users, companies, branches, ledgers, groups] = await Promise.all([
    User.countDocuments(),
    Company.countDocuments(),
    Branch.countDocuments(),
    Ledger.countDocuments(),
    AccountGroup.countDocuments(),
  ])

  console.log('📊 Database Overview:')
  console.log('─'.repeat(40))
  console.log(`Users:          ${users}`)
  console.log(`Companies:      ${companies}`)
  console.log(`Branches:       ${branches}`)
  console.log(`Ledgers:        ${ledgers}`)
  console.log(`Account Groups: ${groups}`)
  console.log('─'.repeat(40))

  console.log('\n📋 Sample Data:\n')

  const sampleUser = await User.findOne().lean()
  if (sampleUser) {
    console.log(
      'Sample User:',
      JSON.stringify(
        {
          name: sampleUser.name,
          email: sampleUser.email,
          role: sampleUser.role,
          company: sampleUser.company,
          branch: sampleUser.branch,
          ledger: sampleUser.ledger,
        },
        null,
        2
      )
    )
  }

  const sampleCompany = await Company.findOne().lean()
  if (sampleCompany) {
    console.log('\nSample Company:', JSON.stringify(sampleCompany, null, 2))
  }

  const sampleLedger = await Ledger.findOne().lean()
  if (sampleLedger) {
    console.log(
      '\nSample Ledger:',
      JSON.stringify(
        {
          title: sampleLedger.title,
          email: sampleLedger.email,
          company: sampleLedger.company,
          branch: sampleLedger.branch,
          account_group_name: sampleLedger.account_group_name,
          gstin: sampleLedger.gstin,
          is_active: sampleLedger.is_active,
        },
        null,
        2
      )
    )
  }

  await mongoose.disconnect()
  console.log('\n✓ Disconnected')
}

inspect()
  .catch(console.error)
  .finally(() => process.exit(0))
