import api from './axios'

// Companies & Branches
export const importCompanies = async (rows=[]) => api.post('/companies/import', { rows })
export const importBranches = async (rows=[]) => api.post('/branches/import', { rows })

// Account Groups
export const importAccountGroups = async (rows=[]) => api.post('/account-groups/import', { rows })

// Menus
export const importMainMenus = async (rows=[]) => api.post('/main-menus/import', { rows })
export const importSubMenus = async (rows=[]) => api.post('/sub-menus/import', { rows })

// Ledgers
export const importLedgers = async (rows=[]) => api.post('/ledgers/import', { rows })

// Generic safe wrapper
export async function safeImport(fn, rows) {
  try {
    const { data } = await fn(rows)
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: e?.response?.data?.error || e.message }
  }
}
