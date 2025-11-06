import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Table from '../../../components/Table'
import Pagination from '../../../components/Pagination'
import SearchBar from '../../../components/SearchBar'
import { listSubMenus, createSubMenu, updateSubMenu } from '../../../src/api/menus'

export default function MenuModules(){
  const router = useRouter()
  const { main, slug = [] } = router.query
  const last = slug?.[slug.length-1]
  const prev = slug?.[slug.length-2]

  const mode = useMemo(()=>{
    if (last === 'add') return 'add'
    if (prev === 'edit') return 'edit'
    return 'list'
  }, [last, prev])

  if (mode === 'list') return <ModuleList main={main} slug={slug} />
  if (mode === 'add') return <AddModule main={main} slug={slug} />
  if (mode === 'edit') return <EditModule main={main} id={last} slug={slug} />
  return null
}

function ModuleList({ main, slug }){
  const [data, setData] = useState({ items: [], page:1, pages:1, total:0 })
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(()=>{
    if (!main) return
    const load = async () => {
      const params = { page, limit: 20, search }
      const res = await listSubMenus(params)
      setData(res)
    }
    load()
  }, [main, page, search])

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    { key: 'path', label: 'Path' },
    { key: 'order', label: 'Order' },
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-semibold">{[main, ...slug].filter(Boolean).join(' / ')}</h1>
        <Link href={{ pathname: `/menus/${main}/${slug.join('/')}/add` }} className="px-3 py-2 bg-blue-600 text-white rounded">Add</Link>
      </div>
      <div className="mb-3 max-w-sm"><SearchBar onSearch={setSearch} /></div>
      <Table columns={columns} data={data.items} actions={(row)=> (
        <div className="flex gap-2">
          <Link className="px-2 py-1 border rounded" href={{ pathname: `/menus/${main}/${slug.join('/')}/edit/${row._id}` }}>Edit</Link>
        </div>
      )} />
      <Pagination page={data.page} pages={data.pages} onChange={setPage} />
    </div>
  )
}

function AddModule(){
  const router = useRouter()
  const { main, slug = [] } = router.query
  const [form, setForm] = useState({ name:'', path:'', order:0 })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { name: form.name, path: form.path, order: Number(form.order) || 0, main_menu_id: undefined }
      await createSubMenu(payload)
      router.back()
    } finally { setLoading(false) }
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        <Link href={`/menus/${main}/${slug.slice(0, -1).join('/')}`}>← Back</Link>
      </div>
      <h1 className="text-xl font-semibold mb-3">Add Module</h1>
      <form onSubmit={submit} className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="border rounded px-3 py-2 w-full" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} required/>
        </div>
        <div>
          <label className="block text-sm mb-1">Path</label>
          <input className="border rounded px-3 py-2 w-full" value={form.path} onChange={e=>setForm({ ...form, path:e.target.value })} required/>
        </div>
        <div>
          <label className="block text-sm mb-1">Order</label>
          <input type="number" className="border rounded px-3 py-2 w-full" value={form.order} onChange={e=>setForm({ ...form, order:e.target.value })}/>
        </div>
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  )
}

function EditModule(){
  const router = useRouter()
  const { slug = [] } = router.query
  const id = slug[slug.length-1]
  const [form, setForm] = useState({ name:'', path:'', order:0 })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateSubMenu(id, { name: form.name, path: form.path, order: Number(form.order)||0 })
      router.back()
    } finally { setLoading(false) }
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        <button onClick={()=>router.back()} className="underline">← Back</button>
      </div>
      <h1 className="text-xl font-semibold mb-3">Edit Module</h1>
      <form onSubmit={submit} className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="border rounded px-3 py-2 w-full" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} required/>
        </div>
        <div>
          <label className="block text-sm mb-1">Path</label>
          <input className="border rounded px-3 py-2 w-full" value={form.path} onChange={e=>setForm({ ...form, path:e.target.value })} required/>
        </div>
        <div>
          <label className="block text-sm mb-1">Order</label>
          <input type="number" className="border rounded px-3 py-2 w-full" value={form.order} onChange={e=>setForm({ ...form, order:e.target.value })}/>
        </div>
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  )
}
