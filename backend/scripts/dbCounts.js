import 'dotenv/config'
import { initMysqlIfEnabled, runQuery } from '../src/db/mysql.js'
import { env } from '../src/config/index.js'

async function main() {
  if (!env.MYSQL_ENABLED) throw new Error('MYSQL_ENABLED=false')
  await initMysqlIfEnabled()
  const q = async (sql) => (await runQuery(sql, []))[0]?.cnt || 0
  const companymaster = await q('SELECT COUNT(1) AS cnt FROM companymaster')
  const branchmaster = await q('SELECT COUNT(1) AS cnt FROM branchmaster')
  const accountgroups = await q('SELECT COUNT(1) AS cnt FROM accountgroups')
  const softwares = await q('SELECT COUNT(1) AS cnt FROM softwares')
  const modules = await q('SELECT COUNT(1) AS cnt FROM modules')
  console.log(JSON.stringify({ companymaster, branchmaster, accountgroups, softwares, modules }))
}

main().catch(e => { console.error(e); process.exit(1) })
