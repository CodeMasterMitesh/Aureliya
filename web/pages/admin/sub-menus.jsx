import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'next/router'
import { useAuth } from '@/src/store/auth'
import { listSubMenus, listMainMenus, createSubMenu, updateSubMenu, deleteSubMenu } from '@/src/api/menus'

function toCSV(rows){
  if (!rows?.length) return ''
  const cols = ['main_menu_id','parent_id','name','slug','path','order']
  const header = cols.join(',')
  const body = rows.map(r=> cols.map(c=>`"${(r[c]??'').toString().replaceAll('"','""')}"`).join(',')).join('\n')
  return header + '\n' + body
}

export default function SubMenusPage(){
  const router = useRouter()
  const token = useAuth(s=>s.token)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(20)
  const [search, setSearch] = useState('')
  const [mainFilter, setMainFilter] = useState('')
  const [parentFilter, setParentFilter] = useState('')
  const [mains, setMains] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ main_menu_id:'', parent_id:'', name:'', slug:'', path:'', order:0 })
  const [selected, setSelected] = useState(new Set())

  useEffect(()=>{ if (!token) router.replace('/admin/login') }, [token])
  useEffect(()=>{ (async()=>{ const { items } = await listMainMenus({ limit:200 }); setMains(items) })() }, [])

  async function load(p=page){
    setLoading(true)
    try {
      const { items, pages, total, page:cur } = await listSubMenus({ page: p, limit, search, main_menu_id: mainFilter||undefined, parent_id: parentFilter||undefined })
      setItems(items); setPages(pages); setTotal(total); setPage(cur); setSelected(new Set())
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load(1) }, [search, mainFilter, parentFilter])
  useEffect(()=>{ load(page) }, [])

  function startEdit(row){ setEditing(row); setForm({ main_menu_id: row.main_menu_id||'', parent_id: row.parent_id||'', name: row.name||'', slug: row.slug||'', path: row.path||'', order: row.order||0 }) }
  function resetForm(){ setEditing(null); setForm({ main_menu_id:'', parent_id:'', name:'', slug:'', path:'', order:0 }) }
  async function submitForm(e){ e.preventDefault(); if (editing) await updateSubMenu(editing._id, form); else await createSubMenu(form); resetForm(); load(1) }
  async function removeOne(id){ await deleteSubMenu(id); load(page) }

  function exportCSV(){ const csv = toCSV(items); const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='sub-menus.csv'; a.click(); URL.revokeObjectURL(url) }

  const columns = useMemo(()=>[
    { key:'name', label:'Name' },
    { key:'slug', label:'Slug' },
    { key:'path', label:'Path' },
    { key:'order', label:'Order' },
    { key:'main_menu_id', label:'Main', render:(v)=> mains.find(m=>m._id===v)?.name || '' },
    { key:'parent_id', label:'Parent', render:(v)=> items.find(i=>i._id===v)?.name || '' },
  ], [mains, items])

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
            <h1 className="text-2xl font-semibold">Sub Menus</h1>
            <div className="flex items-center gap-2">
              <button onClick={exportCSV} className="px-3 py-2 border rounded text-sm">Export CSV</button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <div className="flex gap-2 flex-wrap">
                <div className="max-w-xs"><SearchBar onSearch={setSearch} placeholder="Search by name..." /></div>
                <select value={mainFilter} onChange={e=>setMainFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
                  <option value="">All Main Menus</option>
                  {mains.map(m=> <option key={m._id} value={m._id}>{m.name}</option>)}
                </select>
                <select value={parentFilter} onChange={e=>setParentFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
                  <option value="">All Parents</option>
                  {items.filter(i=>!i.parent_id).map(i=> <option key={i._id} value={i._id}>{i.name}</option>)}
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
                <div className="font-medium mb-2">{editing? 'Edit Sub Menu' : 'Add Sub Menu'}</div>
                <form onSubmit={submitForm} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Main Menu</label>
                    <select value={form.main_menu_id} onChange={e=>setForm(f=>({...f, main_menu_id:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" required>
                      <option value="" disabled>Select main</option>
                      {mains.map(m=> <option key={m._id} value={m._id}>{m.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Parent (optional)</label>
                    <select value={form.parent_id} onChange={e=>setForm(f=>({...f, parent_id:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm">
                      <option value="">None</option>
                      {items.filter(i=>!i.parent_id).map(i=> <option key={i._id} value={i._id}>{i.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Name</label>
                    <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Slug</label>
                    <input value={form.slug} onChange={e=>setForm(f=>({...f, slug:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Path</label>
                    <input value={form.path} onChange={e=>setForm(f=>({...f, path:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" />
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
