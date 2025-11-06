import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { fetchOrderById } from '@/src/api/orders'

export default function OrderDetail(){
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    if (!id) return
    ;(async()=>{
      try{ const o = await fetchOrderById(id); setOrder(o) }catch{}
    })()
  }, [id])

  if (!order) return (
    <section className="container container-padding py-16">
      <h1 className="text-2xl font-semibold">Order Detail</h1>
      <p className="mt-4 text-neutral-500">Loading...</p>
    </section>
  )

  return (
    <section className="container container-padding py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order #{order._id.slice(-6)}</h1>
        <Link href={`/invoice/${order._id}`} className="underline text-sm">View Invoice</Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold">Status Timeline</h2>
            <ul className="mt-4 space-y-4">
              {order.timeline?.length ? order.timeline.map((t, idx)=> (
                <li key={idx} className="relative pl-6">
                  <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-blue-500" />
                  <div className="text-sm font-medium capitalize">{t.status}</div>
                  {t.note && <div className="text-xs text-neutral-500">{t.note}</div>}
                  <div className="text-xs text-neutral-500">{new Date(t.at||t.date||order.createdAt).toLocaleString()}</div>
                </li>
              )) : <li className="text-sm text-neutral-500">No timeline yet.</li>}
            </ul>
          </div>

          <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold">Items</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {order.items?.map((it)=> (
                <li key={it.slug} className="flex items-center justify-between">
                  <span>{it.title} × {it.qty}</span>
                  <span>₹{((it.price||0)*(it.qty||0)).toLocaleString('en-IN')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Payment: {order.paymentStatus}</div>
          <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Status: {order.status}</div>
          <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Order date: {new Date(order.createdAt).toLocaleString()}</div>
          <div className="mt-4 border-t border-neutral-200 dark:border-neutral-800" />
          <div className="mt-4 flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>₹{(order.total||0).toLocaleString('en-IN')}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
