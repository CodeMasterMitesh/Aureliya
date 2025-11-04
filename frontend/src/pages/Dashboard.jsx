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
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  useEffect(()=>{
    if (!token) return
    ;(async()=>{
      try {
        const [{ data: s }, { data: c }, { data: allOrders }] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/categories'),
          api.get('/admin/orders'),
        ])
        setStats(s)
        setCats(c.items || [])
        setOrders(allOrders.items || [])
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

  async function updateOrderStatus(id, status){
    try {
      const { data } = await api.put(`/admin/orders/${id}`, { status })
      setOrders(prev => prev.map(o => o._id === id ? data : o))
    } catch (e) {
      alert('Failed to update order')
    }
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
          <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6 md:col-span-2">
            <h2 className="text-lg font-semibold">Orders</h2>
            {!orders.length ? (
              <p className="mt-3 text-neutral-500 text-sm">No orders yet.</p>
            ) : (
              <div className="mt-4 overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-neutral-200 dark:border-neutral-800">
                      <th className="py-2 pr-4">Order ID</th>
                      <th className="py-2 pr-4">User</th>
                      <th className="py-2 pr-4">Items</th>
                      <th className="py-2 pr-4">Subtotal</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Payment</th>
                      <th className="py-2 pr-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id} className="border-b border-neutral-100 dark:border-neutral-900">
                        <td className="py-2 pr-4 font-mono text-xs">{o._id}</td>
                        <td className="py-2 pr-4">{o.user}</td>
                        <td className="py-2 pr-4">{o.items?.length || 0}</td>
                        <td className="py-2 pr-4">₹{(o.subtotal||0).toLocaleString('en-IN')}</td>
                        <td className="py-2 pr-4">
                          <select value={o.status} onChange={(e)=>updateOrderStatus(o._id, e.target.value)} className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1">
                            {['pending','paid','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="py-2 pr-4">{o.paymentStatus}</td>
                        <td className="py-2 pr-4"><a className="text-blue-600 hover:underline" href={`#/orders/${o._id}`}>View</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
