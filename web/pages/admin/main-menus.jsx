import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'next/router'
import { useAuth } from '@/src/store/auth'
import { listMainMenus, createMainMenu, updateMainMenu, deleteMainMenu } from '@/src/api/menus'

function toCSV(rows){
  if (!rows?.length) return ''
  const cols = ['name','slug','icon','order']
  const header = cols.join(',')
  const body = rows.map(r=> cols.map(c=>`"${(r[c]??'').toString().replaceAll('"','""')}"`).join(',')).join('\n')
  return header + '\n' + body
}

export default function MainMenusPage(){
  const router = useRouter()
  const token = useAuth(s=>s.token)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(20)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name:'', slug:'', icon:'', order:0 })
  const [selected, setSelected] = useState(new Set())

  useEffect(()=>{ if (!token) router.replace('/admin/login') }, [token])

  async function load(p=page){
    setLoading(true)
    try {
      const { items, pages, total, page:cur } = await listMainMenus({ page: p, limit, search })
      setItems(items); setPages(pages); setTotal(total); setPage(cur)
      setSelected(new Set())
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load(1) }, [search])
  useEffect(()=>{ load(page) }, [])

  function startEdit(row){ setEditing(row); setForm({ name: row.name||'', slug: row.slug||'', icon: row.icon||'', order: row.order||0 }) }
  function resetForm(){ setEditing(null); setForm({ name:'', slug:'', icon:'', order:0 }) }
  async function submitForm(e){ e.preventDefault(); if (editing) await updateMainMenu(editing._id, form); else await createMainMenu(form); resetForm(); load(1) }
  async function removeOne(id){ await deleteMainMenu(id); load(page) }

  function exportCSV(){ const csv = toCSV(items); const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='main-menus.csv'; a.click(); URL.revokeObjectURL(url) }

  const columns = useMemo(()=>[
    { key:'name', label:'Name' },
    { key:'slug', label:'Slug' },
    { key:'icon', label:'Icon' },
    { key:'order', label:'Order' },
  ], [])

  function toggleRow(row, checked){ const next = new Set(selected); if (checked) next.add(row._id); else next.delete(row._id); setSelected(next) }
  function toggleAll(checked){ if (checked) setSelected(new Set(items.map(i=>i._id))); else setSelected(new Set()) }

  if (!token) return null
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopBar />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold">Main Menus</h1>
            <div className="flex items-center gap-2">
              <button onClick={exportCSV} className="px-3 py-2 border rounded text-sm">Export CSV</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="mb-2 max-w-xs"><SearchBar onSearch={setSearch} placeholder="Search by name..." /></div>
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
                <div className="font-medium mb-2">{editing? 'Edit Main Menu' : 'Add Main Menu'}</div>
                <form onSubmit={submitForm} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Name</label>
                    <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Slug</label>
                    <input value={form.slug} onChange={e=>setForm(f=>({...f, slug:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Icon</label>
                    <input value={form.icon} onChange={e=>setForm(f=>({...f, icon:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Order</label>
                    <input type="number" value={form.order} onChange={e=>setForm(f=>({...f, order:parseInt(e.target.value||'0',10)}))} className="border rounded px-3 py-2 w-full text-sm" />
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
