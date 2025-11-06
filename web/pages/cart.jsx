import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { useCart } from '@/src/store/cart'
import { useAuth } from '@/src/store/auth'
import { fetchCart, addToCart, setCartQty as apiSetQty, clearCart as apiClear } from '@/src/api/cart'
import api from '@/src/api/axios'
import { login, register } from '@/src/api/auth'
import { fetchProduct } from '@/src/api/products'
import { useRouter } from 'next/router'

export default function Cart(){
  const items = useCart((s) => s.items)
  const setItems = useCart((s) => s.setItems)
  const increment = useCart((s) => s.increment)
  const decrement = useCart((s) => s.decrement)
  const remove = useCart((s) => s.remove)
  const clear = useCart((s) => s.clear)
  const total = useCart((s) => s.total())
  const token = useAuth((s)=>s.token)
  const setAuth = useAuth((s)=>s.login)
  const router = useRouter()
  const [loginOpen, setLoginOpen] = useState(false)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  useEffect(()=>{
    if (!token) return
    ;(async()=>{
      try {
        const data = await fetchCart()
        const mapped = (data.items||[]).map(it=>({ slug: it.product.slug, title: it.product.title, image: it.product.image, price: it.product.price, qty: it.qty }))
        setItems(mapped)
      } catch (e) { console.error('Failed to sync cart', e) }
    })()
  }, [token])

  return (
    <section className="container container-padding py-10">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 p-8 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">Your cart is empty.</p>
          <Button as={Link} href="/products" variant="solid" className="mt-4">Shop products</Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.slug} className="flex items-center gap-4 rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-4">
                <img src={it.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${it.slug}`} className="line-clamp-1 font-medium hover:text-blue-600">{it.title}</Link>
                  <div className="mt-1 text-sm text-neutral-500">₹{(it.price || 0).toLocaleString('en-IN')}</div>
                  <div className="mt-3 inline-flex items-center gap-2">
                    <Button variant="outline" className="h-8 w-8 p-0" aria-label="Decrease" onClick={async() => { if (token) await apiSetQty({ slug: it.slug, qty: (it.qty||0)-1 }); decrement(it.slug) }}>-</Button>
                    <span className="w-8 text-center tabular-nums">{it.qty}</span>
                    <Button variant="outline" className="h-8 w-8 p-0" aria-label="Increase" onClick={async() => { if (token) await addToCart({ slug: it.slug, qty: 1 }); increment(it.slug) }}>+</Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="font-semibold">₹{((it.price || 0) * (it.qty || 0)).toLocaleString('en-IN')}</div>
                  <button className="text-sm text-red-600 hover:underline" onClick={async() => { if (token) await apiSetQty({ slug: it.slug, qty: 0 }); remove(it.slug) }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="mt-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="mt-4 border-t border-neutral-200 dark:border-neutral-800" />
            <div className="mt-4 flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <Button
              variant="solid"
              className="mt-6 w-full"
              onClick={async()=>{ if (!token){ setLoginOpen(true); return } router.push('/checkout') }}
            >
              Checkout
            </Button>
            <button className="mt-3 w-full text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300" onClick={async()=>{ if (token) await apiClear(); clear() }}>Clear cart</button>
          </aside>
        </div>
      )}
      {loginOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-black/50" aria-label="Close" onClick={()=>setLoginOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{mode==='login' ? 'Login' : 'Register'}</h3>
              <button className="text-sm text-blue-600" onClick={()=>setMode(mode==='login' ? 'register' : 'login')}>
                {mode==='login' ? 'Create account' : 'Have an account? Login'}
              </button>
            </div>
            <form className="mt-4 grid gap-3" onSubmit={async(e)=>{
              e.preventDefault()
              try {
                let data
                if (mode==='login') {
                  data = await login({ email: form.email, password: form.password })
                } else {
                  data = await register({ name: form.name, email: form.email, password: form.password })
                }
                setAuth(data)
                const itemsLocal = items
                const payload = await Promise.all(itemsLocal.map(async it=>{
                  const p = await fetchProduct(it.slug)
                  return { product: p._id, qty: it.qty || 1, price: it.price || 0 }
                }))
                if (payload.length > 0) {
                  await api.post('/auth/merge-cart', { userId: data.user.id, items: payload })
                }
                const serverCart = await fetchCart()
                const mapped = (serverCart.items||[]).map(it=>({ slug: it.product.slug, title: it.product.title, image: it.product.image, price: it.product.price, qty: it.qty }))
                setItems(mapped)
                setLoginOpen(false)
                router.push('/checkout')
              } catch (err) {
                alert('Authentication failed')
              }
            }}>
              {mode==='register' && (
                <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder="Name" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" required />
              )}
              <input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} placeholder="Email" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" required />
              <input type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} placeholder="Password" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" required />
              <Button type="submit" variant="solid">{mode==='login' ? 'Login' : 'Register'}</Button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
