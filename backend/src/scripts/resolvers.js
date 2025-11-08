import Company from '../models/Company.js'
import Branch from '../models/Branch.js'
import AccountGroup from '../models/AccountGroup.js'

const cache = { companyByName: new Map(), branchByName: new Map(), agByName: new Map() }

export async function resolveCompany(nameOrCode){
  if (!nameOrCode) return null
  const key = String(nameOrCode).trim().toLowerCase()
  if (cache.companyByName.has(key)) return cache.companyByName.get(key)
  const doc = await Company.findOne({ $or: [{ name: nameOrCode }, { code: nameOrCode }] }).select('_id name').lean()
  const id = doc?._id || null
  cache.companyByName.set(key, id)
  return id
}

export async function resolveBranch(nameOrCode, companyId){
  if (!nameOrCode && !companyId) return null
  const key = `${String(nameOrCode||'').toLowerCase()}|${companyId||''}`
  if (cache.branchByName.has(key)) return cache.branchByName.get(key)
  const q = { }
  if (nameOrCode) q.$or = [{ name: nameOrCode }, { code: nameOrCode }]
  if (companyId) q.company = companyId
  const doc = await Branch.findOne(q).select('_id name').lean()
  const id = doc?._id || null
  cache.branchByName.set(key, id)
  return id
}

export async function resolveAccountGroup(name){
  if (!name) return null
  const key = String(name).trim().toLowerCase()
  if (cache.agByName.has(key)) return cache.agByName.get(key)
  const doc = await AccountGroup.findOne({ name }).select('_id name').lean()
  const id = doc?._id || null
  cache.agByName.set(key, id)
  return id
}
