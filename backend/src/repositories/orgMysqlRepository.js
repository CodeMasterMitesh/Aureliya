import { runQuery } from '../db/mysql.js'

function buildWhere({ companyId, search, code, type }) {
  const clauses = []
  const params = []
  if (companyId) { clauses.push('company = ?'); params.push(companyId) }
  if (search) { clauses.push('name LIKE ?'); params.push(`%${search}%`) }
  if (code) { clauses.push('code LIKE ?'); params.push(`%${code}%`) }
  if (type) { clauses.push('type = ?'); params.push(type) }
  return { where: clauses.length ? ' WHERE ' + clauses.join(' AND ') : '', params }
}

export async function listCompanies({ page = 1, limit = 20, search, code } = {}) {
  const { where, params } = buildWhere({ search, code })
  const base = 'FROM companymaster'
  const totalRows = await runQuery(`SELECT COUNT(1) as cnt ${base} ${where}`, params)
  const total = totalRows[0]?.cnt || 0
  let sql = `SELECT id, name, code, address, active ${base} ${where} ORDER BY name ASC`
  const outParams = [...params]
  if (limit && limit !== 'ALL') {
    const n = Number(limit)
    const offset = (Number(page) - 1) * n
    sql += ' LIMIT ? OFFSET ?'
    outParams.push(n, offset)
  }
  const rows = await runQuery(sql, outParams)
  const items = rows.map(r => ({ id: r.id, name: r.name, code: r.code, address: r.address, active: r.active }))
  return { items, total }
}

export async function listBranches({ companyId, page = 1, limit = 20, search, code } = {}) {
  const { where, params } = buildWhere({ companyId, search, code })
  const base = 'FROM branchmaster'
  const totalRows = await runQuery(`SELECT COUNT(1) as cnt ${base} ${where}`, params)
  const total = totalRows[0]?.cnt || 0
  let sql = `SELECT id, name, code, company, city, state, country, gstno, active ${base} ${where} ORDER BY name ASC`
  const outParams = [...params]
  if (limit && limit !== 'ALL') {
    const n = Number(limit)
    const offset = (Number(page) - 1) * n
    sql += ' LIMIT ? OFFSET ?'
    outParams.push(n, offset)
  }
  const rows = await runQuery(sql, outParams)
  const items = rows.map(r => ({ id: r.id, name: r.name, code: r.code, company: r.company, city: r.city, state: r.state, country: r.country, gstno: r.gstno, active: r.active }))
  return { items, total }
}

export async function listAccountGroups({ companyId, page = 1, limit = 20, search, type } = {}) {
  const { where, params } = buildWhere({ companyId, search, type })
  const base = 'FROM accountgroups'
  const totalRows = await runQuery(`SELECT COUNT(1) as cnt ${base} ${where}`, params)
  const total = totalRows[0]?.cnt || 0
  let sql = `SELECT id, name, code, type, company, parentgroup ${base} ${where} ORDER BY name ASC`
  const outParams = [...params]
  if (limit && limit !== 'ALL') {
    const n = Number(limit)
    const offset = (Number(page) - 1) * n
    sql += ' LIMIT ? OFFSET ?'
    outParams.push(n, offset)
  }
  const rows = await runQuery(sql, outParams)
  const items = rows.map(r => ({ id: r.id, name: r.name, code: r.code, type: r.type, company: r.company, parentgroup: r.parentgroup }))
  return { items, total }
}
