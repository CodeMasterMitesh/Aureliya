import { useEffect, useState } from 'react'
import Button from '../components/ui/Button.jsx'
import { login } from '../api/auth.js'
import api from '../api/axios.js'
import { useAuth } from '../store/auth.js'

export default function Dashboard() {
  const token = useAuth((s)=>s.token)
  const setAuth = useAuth((s)=>s.login)
  const [email, setEmail] = useState('admin@aureliya.test')
  const [password, setPassword] = useState('admin123')
  const [stats, setStats] = useState(null)
  const [form, setForm] = useState({ title: '', slug: '', price: 999, category: '', image: '' })
  const [cats, setCats] = useState([])

  useEffect(()=>{
    if (!token) return
    ;(async()=>{
      try {
        const [{ data: s }, { data: c }] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/categories')
        ])
        setStats(s)
        setCats(c.items || [])
      } catch (e) {
        console.error('Admin fetch failed', e)
      }
    })()
  }, [token])

  async function onLogin(e){
    e.preventDefault()
    const data = await login({ email, password })
    setAuth(data)
  }

  async function createProduct(e){
    e.preventDefault()
    const body = { title: form.title, slug: form.slug, price: Number(form.price), category: form.category, images: form.image ? [form.image] : [] }
    await api.post('/products', body)
    alert('Product created')
    setForm({ title: '', slug: '', price: 999, category: '', image: '' })
  }

  return (
    <section className="container container-padding py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
      {!token ? (
        <form onSubmit={onLogin} className="mt-6 max-w-sm space-y-3">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
          <Button type="submit" variant="solid">Login</Button>
        </form>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold">Stats</h2>
            {stats ? (
              <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <li className="rounded-lg border p-3">Sales (24h): ₹{stats.sales24h.toLocaleString('en-IN')}</li>
                <li className="rounded-lg border p-3">Orders: {stats.orders}</li>
                <li className="rounded-lg border p-3">Users: {stats.users}</li>
                <li className="rounded-lg border p-3">Low stock: {stats.lowStock}</li>
              </ul>
            ) : <p className="text-neutral-500">Loading…</p>}
          </div>
          <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold">Create Product</h2>
            <form onSubmit={createProduct} className="mt-4 grid gap-3">
              <input value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} placeholder="Title" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
              <input value={form.slug} onChange={(e)=>setForm({...form, slug: e.target.value})} placeholder="Slug" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
              <input type="number" value={form.price} onChange={(e)=>setForm({...form, price: e.target.value})} placeholder="Price" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
              <select value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm">
                <option value="">Select category</option>
                {cats.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
              <input value={form.image} onChange={(e)=>setForm({...form, image: e.target.value})} placeholder="Image URL" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
              <Button type="submit" variant="solid">Create</Button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
