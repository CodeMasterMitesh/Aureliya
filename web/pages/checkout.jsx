import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { useAuth } from '@/src/store/auth'
import { useCart } from '@/src/store/cart'
import { createOrder } from '@/src/api/orders'
import { createPaymentIntent, confirmPayment } from '@/src/api/payments'
import { useRouter } from 'next/router'

export default function Checkout(){
  const token = useAuth((s)=>s.token)
  const user = useAuth((s)=>s.user)
  const items = useCart((s)=>s.items)
  const total = useCart((s)=>s.total())
  const router = useRouter()
  const [placing, setPlacing] = useState(false)
  const [address, setAddress] = useState({ name: '', line1: '', city: '', zip: '' })
  const [useSaved, setUseSaved] = useState(true)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(()=>{
    if (!token || !items?.length) router.push('/cart')
    const a = user?.addresses?.find(a=>a.isDefault) || user?.addresses?.[0]
    if (a) { setSelectedId(a._id); setAddress({ name: user?.name||'', line1: a.line1||'', city: a.city||'', zip: a.zip||'' }) }
  }, [token, items?.length])

  async function onPlaceOrder(){
    if (!address.name || !address.line1 || !address.city || !address.zip){ alert('Please fill shipping address'); return }
    setPlacing(true)
    try {
      const order = await createOrder({ address })
      const intent = await createPaymentIntent(order._id)
      await confirmPayment(intent.paymentId)
      router.push('/orders/success')
    } catch (e) { alert('Payment failed. Please try again.') } finally { setPlacing(false) }
  }

  return (
    <section className="container container-padding py-10">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            {user?.addresses?.length > 0 && (
              <div className="mt-3">
                <label className="flex items-center gap-2 text-sm mb-2"><input type="checkbox" checked={useSaved} onChange={e=>setUseSaved(e.target.checked)} /> Use saved address</label>
                {useSaved && (
                  <div className="space-y-2">
                    {user.addresses.map(a=> (
                      <label key={a._id} className={`block rounded-md border p-3 text-sm cursor-pointer ${selectedId===a._id?'border-blue-500':'border-neutral-300 dark:border-neutral-700'}`}>
                        <input type="radio" name="seladdr" checked={selectedId===a._id} onChange={()=>{ setSelectedId(a._id); setAddress({ name: user?.name||'', line1:a.line1||'', city:a.city||'', zip:a.zip||'' }) }} className="mr-2" />
                        {a.label}: {a.line1}, {a.city} {a.zip}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input value={address.name} onChange={(e)=>setAddress({...address, name: e.target.value})} placeholder="Full name" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
              <input value={address.line1} onChange={(e)=>setAddress({...address, line1: e.target.value})} placeholder="Address line" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm sm:col-span-2" />
              <input value={address.city} onChange={(e)=>setAddress({...address, city: e.target.value})} placeholder="City" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
              <input value={address.zip} onChange={(e)=>setAddress({...address, zip: e.target.value})} placeholder="ZIP" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="mt-2 text-sm text-neutral-500">Mock payment: we’ll create an order and instantly confirm a fake payment.</p>
          </div>
        </div>
        <aside className="h-fit rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((it)=> (
              <li key={it.slug} className="flex items-center justify-between gap-3">
                <span className="truncate">{it.title} × {it.qty}</span>
                <span>₹{((it.price||0)*(it.qty||0)).toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-neutral-200 dark:border-neutral-800" />
          <div className="mt-4 flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <Button className="mt-6 w-full" variant="solid" disabled={placing} onClick={onPlaceOrder}>{placing ? 'Placing...' : 'Place order & pay'}</Button>
        </aside>
      </div>
    </section>
  )
}
