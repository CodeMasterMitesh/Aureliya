import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'next/router'
import { useAuth } from '@/src/store/auth'
import { listCompanies, createCompany, updateCompany, deleteCompany, bulkDeleteCompanies } from '@/src/api/companies'

function toCSV(rows){
  if (!rows?.length) return ''
  const cols = ['name','code','address']
  const header = cols.join(',')
  const body = rows.map(r=> cols.map(c=>`"${(r[c]??'').toString().replaceAll('"','""')}"`).join(',')).join('\n')
  return header + '\n' + body
}

export default function CompaniesPage(){
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
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // object or null
  const [form, setForm] = useState({ name:'', code:'', address:'' })
  const [selected, setSelected] = useState(new Set())

  useEffect(()=>{ if (!token) router.replace('/admin/login') }, [token])

  async function load(p=page){
    setLoading(true)
    try {
      const { items, pages, total, page:cur } = await listCompanies({ page: p, limit, search, name: nameFilter, code: codeFilter })
      setItems(items); setPages(pages); setTotal(total); setPage(cur)
      setSelected(new Set())
    } finally { setLoading(false) }
  }

  useEffect(()=>{ load(1) }, [search, nameFilter, codeFilter])
  useEffect(()=>{ load(page) }, [])

  function startEdit(row){
    setEditing(row)
    setForm({ name: row.name||'', code: row.code||'', address: row.address||'' })
  }

  function resetForm(){ setEditing(null); setForm({ name:'', code:'', address:'' }) }

  async function submitForm(e){
    e.preventDefault()
    if (editing){
      await updateCompany(editing._id, form)
    } else {
      await createCompany(form)
    }
    resetForm(); load(1)
  }

  async function removeOne(id){
    await deleteCompany(id); load(page)
  }

  async function removeSelected(){
    if (selected.size === 0) return
    await bulkDeleteCompanies(Array.from(selected))
    setSelected(new Set()); load(page)
  }

  function exportCSV(){
    const csv = toCSV(items)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'companies.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const columns = useMemo(()=>[
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
  ], [nameFilter, codeFilter])

  function toggleRow(row, checked){
    const next = new Set(selected)
    if (checked) next.add(row._id); else next.delete(row._id)
    setSelected(next)
  }

  function toggleAll(checked){
    if (checked) setSelected(new Set(items.map(i=>i._id)))
    else setSelected(new Set())
  }

  if (!token) return null

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopBar />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold">Companies</h1>
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
                <div className="font-medium mb-2">{editing? 'Edit Company' : 'Add Company'}</div>
                <form onSubmit={submitForm} className="space-y-3">
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
