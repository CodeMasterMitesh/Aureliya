import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOrderById } from '../api/orders.js'

export default function Invoice(){
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    let active=true
    fetchOrderById(id).then(o=>{ if(active) setOrder(o) }).catch(()=>{})
    return ()=>{ active=false }
  }, [id])

  if (!order) return <div className="container container-padding py-10">Loading order…</div>
  const date = new Date(order.createdAt)

  return (
    <div className="container container-padding py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Invoice</h1>
        <button onClick={()=>window.print()} className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700">Print</button>
      </div>
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 print:p-0">
        <header className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-xl font-semibold">Aureliya</div>
            <div className="text-sm text-neutral-600">Order ID: {order._id}</div>
            <div className="text-sm text-neutral-600">Date: {date.toLocaleString()}</div>
          </div>
          <div className="md:text-right">
            <div className="font-medium">Billed To</div>
            <div className="text-sm text-neutral-600">{order.user?.name || 'Customer'}</div>
          </div>
        </header>
        <table className="w-full text-sm border-t border-b border-neutral-200 dark:border-neutral-800">
          <thead>
            <tr className="text-left">
              <th className="py-2">Item</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it, idx)=>{
              const total = (it.price||0) * (it.qty||1)
              return (
                <tr key={idx} className="border-t border-neutral-100 dark:border-neutral-800">
                  <td className="py-2">{it.title || 'Item'}</td>
                  <td className="py-2">{it.qty || 1}</td>
                  <td className="py-2">₹{(it.price||0).toLocaleString('en-IN')}</td>
                  <td className="py-2 text-right">₹{total.toLocaleString('en-IN')}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="py-2 text-right font-semibold">Subtotal</td>
              <td className="py-2 text-right font-semibold">₹{(order.subtotal||0).toLocaleString('en-IN')}</td>
            </tr>
          </tfoot>
        </table>
        <div className="mt-6 text-sm text-neutral-600">
          Payment Status: <span className="capitalize">{order.paymentStatus}</span> · Order Status: <span className="capitalize">{order.status}</span>
        </div>
      </div>
      <style>{`@media print{ header,nav,footer,button{ display:none !important } .container{ max-width:100% } }`}</style>
    </div>
  )
}
