import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'next/router'
import { useAuth } from '@/src/store/auth'
import { listBranches, fetchCompanies, createBranch, updateBranch, deleteBranch, bulkDeleteBranches } from '@/src/api/companies'

function toCSV(rows){
  if (!rows?.length) return ''
  const cols = ['company.name','name','code','address']
  const header = ['Company','Name','Code','Address'].join(',')
  const body = rows.map(r=> {
    const vals = [r.company?.name, r.name, r.code, r.address].map(v=>`"${(v??'').toString().replaceAll('"','""')}"`)
    return vals.join(',')
  }).join('\n')
  return header + '\n' + body
}

export default function BranchesPage(){
  const router = useRouter()
  const token = useAuth(s=>s.token)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(20)
  const [search, setSearch] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [codeFilter, setCodeFilter] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ company:'', name:'', code:'', address:'' })
  const [selected, setSelected] = useState(new Set())

  useEffect(()=>{ if (!token) router.replace('/admin/login') }, [token])
  useEffect(()=>{ fetchCompanies('').then(setCompanies) }, [])

  async function load(p=page){
    setLoading(true)
    try {
      const { items, pages, total, page:cur } = await listBranches({ page: p, limit, search, name: nameFilter, code: codeFilter, company: companyFilter||undefined })
      setItems(items); setPages(pages); setTotal(total); setPage(cur)
      setSelected(new Set())
    } finally { setLoading(false) }
  }

  useEffect(()=>{ load(1) }, [search, nameFilter, codeFilter, companyFilter])
  useEffect(()=>{ load(page) }, [])

  function startEdit(row){
    setEditing(row)
    setForm({ company: row.company?._id || row.company || '', name: row.name||'', code: row.code||'', address: row.address||'' })
  }
  function resetForm(){ setEditing(null); setForm({ company:'', name:'', code:'', address:'' }) }

  async function submitForm(e){
    e.preventDefault()
    if (editing){ await updateBranch(editing._id, form) }
    else { await createBranch(form) }
    resetForm(); load(1)
  }

  async function removeOne(id){ await deleteBranch(id); load(page) }
  async function removeSelected(){ if (selected.size){ await bulkDeleteBranches(Array.from(selected)); setSelected(new Set()); load(page) } }

  function exportCSV(){
    const csv = toCSV(items)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'branches.csv'; a.click(); URL.revokeObjectURL(url)
  }

  const columns = useMemo(()=>[
    { key:'company', label:'Company', render: (v)=> v?.name || '' , headerRender: ()=> (
      <div>
        <div className="font-semibold text-gray-600">Company</div>
        <select className="mt-1 border rounded px-2 py-1 w-full text-xs" value={companyFilter} onChange={e=>setCompanyFilter(e.target.value)}>
          <option value="">All</option>
          {companies.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>
    )},
    { key:'name', label:'Name', headerRender: ()=> (
      <div>
        <div className="font-semibold text-gray-600">Name</div>
        <input className="mt-1 border rounded px-2 py-1 w-full text-xs" placeholder="Filter by name" value={nameFilter} onChange={e=>setNameFilter(e.target.value)} />
      </div>
    )},
    { key:'code', label:'Code', headerRender: ()=> (
      <div>
        <div className="font-semibold text-gray-600">Code</div>
        <input className="mt-1 border rounded px-2 py-1 w-full text-xs" placeholder="Filter by code" value={codeFilter} onChange={e=>setCodeFilter(e.target.value)} />
      </div>
    )},
    { key:'address', label:'Address' },
  ], [companies, companyFilter, nameFilter, codeFilter])

  function toggleRow(row, checked){
    const next = new Set(selected)
    if (checked) next.add(row._id); else next.delete(row._id)
    setSelected(next)
  }
  function toggleAll(checked){ if (checked) setSelected(new Set(items.map(i=>i._id))); else setSelected(new Set()) }

  if (!token) return null

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopBar />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold">Branches</h1>
            <div className="flex items-center gap-2">
              <button onClick={exportCSV} className="px-3 py-2 border rounded text-sm">Export CSV</button>
              <button onClick={removeSelected} disabled={selected.size===0} className="px-3 py-2 border rounded text-sm disabled:opacity-50">Delete Selected</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="mb-2 max-w-xs"><SearchBar onSearch={setSearch} placeholder="Search name/code..." /></div>
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
                <div className="font-medium mb-2">{editing? 'Edit Branch' : 'Add Branch'}</div>
                <form onSubmit={submitForm} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Company</label>
                    <select value={form.company} onChange={e=>setForm(f=>({...f, company:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" required>
                      <option value="" disabled>Select company</option>
                      {companies.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
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
                    <label className="block text-xs text-gray-600 mb-1">Address</label>
                    <textarea value={form.address} onChange={e=>setForm(f=>({...f, address:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" rows={3} />
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
