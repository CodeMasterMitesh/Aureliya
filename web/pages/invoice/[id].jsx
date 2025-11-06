import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@/components/ui/Button'
import { fetchOrderById } from '@/src/api/orders'

export default function Invoice(){
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    if (!id) return
    ;(async()=>{ try{ const o = await fetchOrderById(id); setOrder(o) }catch{} })()
  }, [id])

  if (!order) return (
    <section className="container container-padding py-16">
      <h1 className="text-2xl font-semibold">Invoice</h1>
      <p className="mt-4 text-neutral-500">Loading...</p>
    </section>
  )

  return (
    <section className="container container-padding py-10 print:py-0">
      <div className="flex items-center justify-between print:hidden">
        <h1 className="text-2xl font-semibold">Invoice #{order._id.slice(-6)}</h1>
        <Button onClick={()=>window.print()}>Print</Button>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="font-semibold">Billed To</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {order.address?.name}<br/>
              {order.address?.line1}<br/>
              {order.address?.city} {order.address?.zip}
            </div>
          </div>
          <div className="sm:text-right">
            <div className="font-semibold">Order</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              #{order._id}<br/>
              {new Date(order.createdAt).toLocaleString()}<br/>
              Payment: {order.paymentStatus}
            </div>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="py-2">Item</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Price</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((it)=> (
                <tr key={it.slug} className="border-b border-neutral-200 dark:border-neutral-800">
                  <td className="py-2 pr-4">{it.title}</td>
                  <td className="py-2">{it.qty}</td>
                  <td className="py-2">₹{(it.price||0).toLocaleString('en-IN')}</td>
                  <td className="py-2 text-right">₹{((it.price||0)*(it.qty||0)).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="py-3 font-semibold text-right">Total</td>
                <td className="py-3 font-semibold text-right">₹{(order.total||0).toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}
