import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchOrderById } from '../api/orders.js'

const STEPS = ['placed','paid','shipped','delivered']

export default function OrderDetail(){
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    let active=true
    fetchOrderById(id).then(o=>{ if(active) setOrder(o) }).catch(()=>{})
    return ()=>{ active=false }
  }, [id])

  if (!order) return <div className="container container-padding py-10">Loading order…</div>

  const timeline = (order.timeline && order.timeline.length>0) ? order.timeline : deriveTimeline(order)

  return (
    <section className="container container-padding py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order #{order._id.slice(-6)}</h1>
        <div className="text-sm"><Link className="text-blue-600 hover:underline mr-3" to={`/orders/${order._id}/invoice`}>Invoice</Link><span className="text-neutral-500 capitalize">{order.paymentStatus}</span></div>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="text-lg font-semibold mb-3">Tracking</h2>
          <ul className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-neutral-200 dark:before:bg-neutral-800">
            {timeline.map((t, idx)=> (
              <li key={idx} className="relative mb-4">
                <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full ${isReached(order.status, t.status)?'bg-green-500':'bg-neutral-400'}`} />
                <div className="ml-4">
                  <div className="font-medium capitalize">{t.status}</div>
                  <div className="text-sm text-neutral-600">{new Date(t.at).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-8 mb-3">Items</h2>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800">
            {order.items.map((it, idx)=> (
              <div key={idx} className="p-3 flex items-center justify-between text-sm">
                <span>{it.title} × {it.qty}</span>
                <span>₹{(it.price*it.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="mt-2 text-sm text-neutral-600">Status: <span className="capitalize">{order.status}</span></div>
          <div className="mt-2 font-semibold">Total: ₹{(order.subtotal||0).toLocaleString('en-IN')}</div>
          {order.address && (
            <div className="mt-4">
              <div className="font-medium">Shipping Address</div>
              <div className="text-sm text-neutral-600">{order.address.name}</div>
              <div className="text-sm text-neutral-600">{order.address.line1}, {order.address.city} {order.address.zip}</div>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

function deriveTimeline(order){
  const arr = []
  arr.push({ status:'placed', at: order.createdAt || new Date() })
  if (order.paymentStatus==='paid') arr.push({ status:'paid', at: order.updatedAt || new Date() })
  if (order.status==='shipped' || order.status==='delivered') arr.push({ status:'shipped', at: order.updatedAt || new Date() })
  if (order.status==='delivered') arr.push({ status:'delivered', at: order.updatedAt || new Date() })
  return arr
}

function isReached(current, step){
  const order = ['placed','paid','shipped','delivered']
  const ci = order.indexOf(current)
  const si = order.indexOf(step)
  return ci>=si
}
