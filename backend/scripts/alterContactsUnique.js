import 'dotenv/config'
import { initMysqlIfEnabled, runQuery } from '../src/db/mysql.js'

async function main() {
  await initMysqlIfEnabled()
  // Check for duplicate emails which would block unique
  const dups = await runQuery(`
    SELECT email, COUNT(*) c
    FROM contacts
    WHERE email IS NOT NULL AND email <> ''
    GROUP BY email
    HAVING c > 1
    ORDER BY c DESC
    LIMIT 5
  `)
  if (dups.length) {
    console.log('Duplicate emails found, skipping unique(email):', dups)
  } else {
    try {
      await runQuery('ALTER TABLE contacts ADD UNIQUE KEY uq_contacts_email (email)')
      console.log('Unique(email) added')
    } catch (e) {
      if (e && e.code === 'ER_DUP_KEYNAME') {
        console.log('Unique(email) already exists')
      } else {
        console.error('Failed adding unique(email):', e.message)
      }
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
