import 'dotenv/config'
import mongoose from 'mongoose'
import MainMenu from '../src/models/MainMenu.js'
import SubMenu from '../src/models/SubMenu.js'
import { env } from '../src/config/index.js'
import { initMysqlIfEnabled, runQuery } from '../src/db/mysql.js'

function slug(s) { return (s || '').toString().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') }

async function upsertSoftware(m) {
  // Upsert by code or name
  const code = m.slug || slug(m.name)
  const existing = await runQuery('SELECT id FROM softwares WHERE code = ? OR name = ? LIMIT 1', [code, m.name])
  if (existing[0]) return existing[0].id
  const res = await runQuery(
    'INSERT INTO softwares (name, `desc`, installed, code, sort, company) VALUES (?,?,?,?,?,?)',
    [m.name, '', 1, code, m.order || 0, null]
  )
  return res.insertId
}

async function upsertModule(module, softwareId, parentModuleId) {
  const code = module.slug || slug(module.name)
  // modules has UNIQUE(code). Do ON DUPLICATE to get id if exists
  const res = await runQuery(
    `INSERT INTO modules (sid, name, installed, parent, sort, code, grnno, company)
     VALUES (?,?,?,?,?,?,NULL,?)
     ON DUPLICATE KEY UPDATE sid=VALUES(sid), name=VALUES(name), parent=VALUES(parent), sort=VALUES(sort)`,
    [softwareId, module.name, 1, parentModuleId || 1, module.order || 0, code, null]
  )
  if (res.insertId) return res.insertId
  const row = await runQuery('SELECT id FROM modules WHERE code = ? LIMIT 1', [code])
  return row[0]?.id
}

async function main() {
  if (!env.MYSQL_ENABLED) throw new Error('MYSQL_ENABLED=false')
  await initMysqlIfEnabled()
  await mongoose.connect(env.MONGODB_URI)

  const mains = await MainMenu.find().sort({ order: 1, name: 1 }).lean()
  const softwareIdByMain = new Map()
  for (const m of mains) {
    const sid = await upsertSoftware(m)
    softwareIdByMain.set(String(m._id), sid)
  }

  const subs = await SubMenu.find().sort({ order: 1, name: 1 }).lean()
  const byParent = subs.reduce((acc, s) => {
    const key = String(s.parent_id || 'root-' + s.main_menu_id)
    acc[key] = acc[key] || []
    acc[key].push(s)
    return acc
  }, {})

  const moduleIdBySub = new Map()

  // First pass: top-level (no parent)
  for (const m of mains) {
    const sid = softwareIdByMain.get(String(m._id))
    const tops = byParent['root-' + String(m._id)] || []
    for (const t of tops) {
      const mid = await upsertModule(t, sid, null)
      moduleIdBySub.set(String(t._id), mid)
    }
  }
  // Second pass: recursive children
  async function insertChildren(sub) {
    const parentId = moduleIdBySub.get(String(sub._id))
    const kids = byParent[String(sub._id)] || []
    const sid = softwareIdByMain.get(String(sub.main_menu_id))
    for (const k of kids) {
      const mid = await upsertModule(k, sid, parentId)
      moduleIdBySub.set(String(k._id), mid)
      await insertChildren(k)
    }
  }
  for (const [id, mid] of moduleIdBySub) {
    const node = subs.find(s => String(s._id) === id)
    if (node) await insertChildren(node)
  }

  console.log('Migrated menus:', mains.length, 'softwares and', subs.length, 'modules')
  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
