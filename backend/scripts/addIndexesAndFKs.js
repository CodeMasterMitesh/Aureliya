import 'dotenv/config'
import { initMysqlIfEnabled, runQuery } from '../src/db/mysql.js'
import { env } from '../src/config/index.js'

// Adds helpful non-unique indexes across tables on common filter columns.
// Skips if index already exists. Designed to run inside backend container (MYSQL_HOST=mysql).

const SCHEMA = env.MYSQL_DB
const COMMON_COLUMNS = [
  'company', 'company_id', 'branch', 'branch_id', 'enterby', 'modifiedby', 'approvedby',
  'status', 'active', 'delete', 'code', 'name', 'gstno', 'date', 'datetime',
]

async function indexExists(table, indexName) {
  const rows = await runQuery(
    `SELECT 1 FROM information_schema.statistics WHERE table_schema=? AND table_name=? AND index_name=? LIMIT 1`,
    [SCHEMA, table, indexName]
  )
  return rows.length > 0
}

async function columnExists(table, column) {
  const rows = await runQuery(
    `SELECT 1 FROM information_schema.columns WHERE table_schema=? AND table_name=? AND column_name=? LIMIT 1`,
    [SCHEMA, table, column]
  )
  return rows.length > 0
}

function buildIndexName(table, column) {
  let idx = `idx_${table}_${column}`.replace(/[^a-zA-Z0-9_]/g, '_')
  if (idx.length > 60) idx = idx.slice(0, 60)
  return idx
}

async function addIndex(table, column) {
  const idxName = buildIndexName(table, column)
  const exists = await indexExists(table, idxName)
  if (exists) return false
  const hasCol = await columnExists(table, column)
  if (!hasCol) return false
  await runQuery(`ALTER TABLE \`${table}\` ADD INDEX \`${idxName}\` (\`${column}\`)`)
  return true
}

async function addCommonIndexes() {
  const tables = await runQuery(
    `SELECT table_name FROM information_schema.tables WHERE table_schema=? AND table_type='BASE TABLE'`,
    [SCHEMA]
  )
  let added = 0
  for (const { table_name } of tables) {
    for (const col of COMMON_COLUMNS) {
      try {
        const did = await addIndex(table_name, col)
        if (did) added++
      } catch (e) {
        // Ignore index failures; continue
      }
    }
  }
  return added
}

async function verifyNormalizedFks() {
  // These FKs are defined in the normalized schema already; verify they exist.
  const checks = [
    { table: 'contact_addresses', constraint: 'fk_contact_addresses_contact' },
    { table: 'contact_preferences', constraint: 'fk_contact_preferences_contact' },
    { table: 'contact_accounts', constraint: 'fk_contact_accounts_contact' },
  ]
  const missing = []
  for (const c of checks) {
    const rows = await runQuery(
      `SELECT CONSTRAINT_NAME FROM information_schema.key_column_usage WHERE table_schema=? AND table_name=? AND CONSTRAINT_NAME=? LIMIT 1`,
      [SCHEMA, c.table, c.constraint]
    )
    if (rows.length === 0) missing.push(c)
  }
  return missing
}

async function main() {
  await initMysqlIfEnabled()
  const added = await addCommonIndexes()
  const missing = await verifyNormalizedFks()
  console.log(JSON.stringify({ addedIndexes: added, missingNormalizedFks: missing }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
