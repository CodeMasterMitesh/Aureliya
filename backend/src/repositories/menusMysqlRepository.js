import { runQuery } from '../db/mysql.js'

function menuSlug(val) {
  return (val || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

// Paginated softwares (main menus)
export async function listMainMenus({ page = 1, limit = 20, search } = {}) {
  const clauses = []
  const params = []
  if (search) { clauses.push('name LIKE ?'); params.push(`%${search}%`) }
  const where = clauses.length ? ' WHERE ' + clauses.join(' AND ') : ''
  const totalRows = await runQuery(`SELECT COUNT(1) cnt FROM softwares${where}`, params)
  const total = totalRows[0]?.cnt || 0
  let sql = `SELECT id, name, code, sort, installed FROM softwares${where} ORDER BY sort ASC, name ASC`
  const outParams = [...params]
  if (limit && limit !== 'ALL') {
    const n = Number(limit)
    const offset = (Number(page) - 1) * n
    sql += ' LIMIT ? OFFSET ?'
    outParams.push(n, offset)
  }
  const rows = await runQuery(sql, outParams)
  const items = rows.map(r => ({
    id: r.id,
    name: r.name,
    slug: menuSlug(r.code || r.name),
    icon: null,
    order: r.sort ?? 0,
    installed: r.installed,
    code: r.code,
  }))
  return { items, total }
}

// Paginated modules (sub menus)
export async function listSubMenus({ mainMenuId, parentId, search, page = 1, limit = 20 } = {}) {
  const clauses = []
  const params = []
  if (mainMenuId) { clauses.push('sid = ?'); params.push(mainMenuId) }
  if (parentId) { clauses.push('parent = ?'); params.push(parentId) }
  if (search) { clauses.push('name LIKE ?'); params.push(`%${search}%`) }
  const where = clauses.length ? ' WHERE ' + clauses.join(' AND ') : ''
  const totalRows = await runQuery(`SELECT COUNT(1) cnt FROM modules${where}`, params)
  const total = totalRows[0]?.cnt || 0
  let sql = `SELECT id, sid, name, parent, sort, code, company FROM modules${where} ORDER BY sort ASC, name ASC`
  const outParams = [...params]
  if (limit && limit !== 'ALL') {
    const n = Number(limit)
    const offset = (Number(page) - 1) * n
    sql += ' LIMIT ? OFFSET ?'
    outParams.push(n, offset)
  }
  const rows = await runQuery(sql, outParams)
  const items = rows.map(r => ({
    id: r.id,
    main_menu_id: r.sid,
    parent_id: r.parent === 1 ? null : r.parent,
    name: r.name,
    slug: menuSlug(r.code || r.name),
    path: null,
    order: r.sort ?? 0,
    meta: { company: r.company, code: r.code },
  }))
  return { items, total }
}

export async function buildMenuTree() {
  // Load all modules + softwares and form tree relationships by parent
  const mainsRaw = await runQuery('SELECT id, name, code, sort FROM softwares ORDER BY sort ASC, name ASC')
  const modules = await runQuery('SELECT id, sid, name, parent, sort, code, company FROM modules')
  const byParent = {}
  for (const m of modules) {
    const key = String(m.parent === 1 ? 'root-' + m.sid : m.parent)
    if (!byParent[key]) byParent[key] = []
    byParent[key].push(m)
  }
  function mapModule(mod) {
    const key = String(mod.id)
    const children = byParent[key] || []
    return {
      id: mod.id,
      name: mod.name,
      slug: (mod.code || mod.name || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
      order: mod.sort ?? 0,
      meta: { company: mod.company, code: mod.code },
      submenus: children.sort((a,b)=> (a.sort-b.sort) || a.name.localeCompare(b.name)).map(mapModule)
    }
  }
  return mainsRaw.map(main => {
    const tops = byParent['root-' + main.id] || []
    return {
      id: main.id,
      name: main.name,
      slug: (main.code || main.name || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
      icon: null,
      order: main.sort ?? 0,
      submenus: tops.sort((a,b)=> (a.sort-b.sort)||a.name.localeCompare(b.name)).map(mapModule)
    }
  })
}
