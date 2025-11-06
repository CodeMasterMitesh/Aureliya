import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'next/router'
import { useAuth } from '@/src/store/auth'
import { listAccountGroups, createAccountGroup, updateAccountGroup, deleteAccountGroup, bulkDeleteAccountGroups } from '@/src/api/accountGroups'
import { fetchCompanies, listBranches } from '@/src/api/companies'

function toCSV(rows){
  if (!rows?.length) return ''
  const cols = ['name','code','description','is_active']
  const header = cols.join(',')
  const body = rows.map(r=> cols.map(c=>`"${(r[c]??'').toString().replaceAll('"','""')}"`).join(',')).join('\n')
  return header + '\n' + body
}

export default function AccountGroupsPage(){
  const router = useRouter()
  const token = useAuth(s=>s.token)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(20)
  const [search, setSearch] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [branchFilter, setBranchFilter] = useState('')
  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name:'', code:'', description:'', company:'', branch:'', is_active:true })
  const [selected, setSelected] = useState(new Set())

  useEffect(()=>{ if (!token) router.replace('/admin/login') }, [token])
  useEffect(()=>{ fetchCompanies('').then(setCompanies) }, [])
  useEffect(()=>{ if (companyFilter) listBranches({ company: companyFilter, limit: 500 }).then(({items})=> setBranches(items)); else setBranches([]) }, [companyFilter])

  async function load(p=page){
    setLoading(true)
    try {
      const { items, pages, total, page:cur } = await listAccountGroups({ page: p, limit, search, company: companyFilter||undefined, branch: branchFilter||undefined })
      setItems(items); setPages(pages); setTotal(total); setPage(cur); setSelected(new Set())
    } catch (e) {
      const code = e?.response?.status
      if (code === 401 || code === 403) router.replace('/admin/login')
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load(1) }, [search, companyFilter, branchFilter])
  useEffect(()=>{ load(page) }, [])

  function startEdit(row){ setEditing(row); setForm({ name: row.name||'', code: row.code||'', description: row.description||'', company: row.company||'', branch: row.branch||'', is_active: row.is_active!==false }) }
  function resetForm(){ setEditing(null); setForm({ name:'', code:'', description:'', company:'', branch:'', is_active:true }) }
  async function submitForm(e){ e.preventDefault(); if (editing) await updateAccountGroup(editing._id, form); else await createAccountGroup(form); resetForm(); load(1) }
  async function removeOne(id){ await deleteAccountGroup(id); load(page) }
  async function removeSelected(){ if (selected.size){ await bulkDeleteAccountGroups(Array.from(selected)); setSelected(new Set()); load(page) } }
  function exportCSV(){ const csv = toCSV(items); const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' }); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='account-groups.csv'; a.click(); URL.revokeObjectURL(url) }

  const columns = useMemo(()=>[
    { key:'name', label:'Name' },
    { key:'code', label:'Code' },
    { key:'description', label:'Description' },
    { key:'is_active', label:'Active', render:(v)=> v? 'Yes':'No' },
  ], [])

  function toggleRow(row, checked){ const next=new Set(selected); if (checked) next.add(row._id); else next.delete(row._id); setSelected(next) }
  function toggleAll(checked){ if (checked) setSelected(new Set(items.map(i=>i._id))); else setSelected(new Set()) }

  if (!token) return null
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopBar />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold">Account Groups</h1>
            <div className="flex items-center gap-2">
              <button onClick={exportCSV} className="px-3 py-2 border rounded text-sm">Export CSV</button>
              <button onClick={removeSelected} disabled={selected.size===0} className="px-3 py-2 border rounded text-sm disabled:opacity-50">Delete Selected</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <div className="flex gap-2 flex-wrap">
                <div className="max-w-xs"><SearchBar onSearch={setSearch} placeholder="Search by name..." /></div>
                <select value={companyFilter} onChange={e=>setCompanyFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
                  <option value="">All Companies</option>
                  {companies.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <select value={branchFilter} onChange={e=>setBranchFilter(e.target.value)} className="border rounded px-3 py-2 text-sm" disabled={!companyFilter}>
                  <option value="">All Branches</option>
                  {branches.map(b=> <option key={b._id} value={b._id}>{b.name}</option>)}
                </select>
              </div>
              <Table
                columns={columns}
                data={items}
                actions={(row)=> (
                  <div className="flex gap-2">
                    <button onClick={()=>startEdit(row)} className="px-2 py-1 border rounded text-xs">Edit</button>
                    <button onClick={()=>removeOne(row._id)} className="px-2 py-1 border rounded text-xs">Delete</button>
                  </div>
                )}
                selectable
                selectedIds={selected}
                onToggleRow={toggleRow}
                onToggleAll={toggleAll}
              />
              <Pagination page={page} pages={pages} onChange={p=>{ setPage(p); load(p) }} />
              {loading && <div className="text-sm text-gray-500 mt-2">Loading...</div>}
            </div>
            <div>
              <div className="border rounded p-4 bg-white">
                <div className="font-medium mb-2">{editing? 'Edit Account Group' : 'Add Account Group'}</div>
                <form onSubmit={submitForm} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Company</label>
                    <select value={form.company} onChange={e=>setForm(f=>({...f, company:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm">
                      <option value="">None</option>
                      {companies.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Branch</label>
                    <select value={form.branch} onChange={e=>setForm(f=>({...f, branch:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" disabled={!form.company}>
                      <option value="">None</option>
                      {branches.map(b=> <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Name</label>
                    <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Code</label>
                    <input value={form.code} onChange={e=>setForm(f=>({...f, code:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Description</label>
                    <textarea value={form.description} onChange={e=>setForm(f=>({...f, description:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" rows={3} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="ag_active" type="checkbox" checked={form.is_active} onChange={e=>setForm(f=>({...f, is_active:e.target.checked}))} />
                    <label htmlFor="ag_active" className="text-sm">Active</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="submit" className="px-3 py-2 border rounded text-sm bg-blue-600 text-white">{editing? 'Update' : 'Create'}</button>
                    {editing && <button type="button" onClick={resetForm} className="px-3 py-2 border rounded text-sm">Cancel</button>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
