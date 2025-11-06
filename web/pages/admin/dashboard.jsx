import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { adminDashboard } from '../../src/api/admin'

function BarChart({ data }){
  // data: [{ day, total }]
  const max = Math.max(1, ...data.map(d=>d.total))
  return (
    <div className="h-40 flex items-end gap-1">
      {data.map(d => (
        <div key={d.day} className="flex-1 bg-blue-200" style={{ height: `${(d.total/max)*100}%` }} title={`Day ${d.day}: ${d.total}`} />
      ))}
    </div>
  )
}

function Donut({ data }){
  const entries = Object.entries(data)
  const total = entries.reduce((s, [,v])=>s+v, 0)
  if (!total) return <div className="text-sm text-gray-500">No data</div>
  const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#6366f1']
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-32 h-32 rounded-full bg-gray-100 relative" style={{ background: `conic-gradient(${entries.map(([k,v],i)=>`${colors[i%colors.length]} ${(v/total)*100}%`).join(',')})` }} />
        <div className="text-sm space-y-1">
          {entries.map(([k,v],i)=> (
            <div key={k} className="flex items-center gap-2"><span className="w-3 h-3 inline-block rounded-sm" style={{ background: colors[i%colors.length] }} /> {k}: {v}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard(){
  const [data, setData] = useState(null)

  useEffect(()=>{
    adminDashboard().then(setData).catch(()=>{})
  }, [])

  return (
    <div className="min-h-[70vh] flex">
      <Sidebar />
      <main className="flex-1 p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 border rounded bg-white">
            <div className="text-gray-500 text-sm">Today's Orders</div>
            <div className="text-2xl font-bold">{data?.cards?.todayOrders ?? '-'}</div>
          </div>
          <div className="p-4 border rounded bg-white">
            <div className="text-gray-500 text-sm">This Week Orders</div>
            <div className="text-2xl font-bold">{data?.cards?.weekOrders ?? '-'}</div>
          </div>
          <div className="p-4 border rounded bg-white">
            <div className="text-gray-500 text-sm">This Month Orders</div>
            <div className="text-2xl font-bold">{data?.cards?.monthOrders ?? '-'}</div>
          </div>
          <div className="p-4 border rounded bg-white">
            <div className="text-gray-500 text-sm">Low Stock Products</div>
            <div className="text-2xl font-bold">{data?.cards?.lowStock ?? '-'}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border rounded bg-white p-4 lg:col-span-2">
            <div className="font-semibold mb-2">Sales by Day (This Month)</div>
            {data ? <BarChart data={data.charts.salesByDay} /> : <div className="h-40 bg-gray-50 rounded" />}
          </div>
          <div className="border rounded bg-white p-4">
            <div className="font-semibold mb-2">Orders by Status</div>
            {data ? <Donut data={data.charts.ordersByStatus} /> : <div className="h-40 bg-gray-50 rounded" />}
          </div>
        </div>
      </main>
    </div>
  )
}
