import { useEffect, useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/auth.js'
import { getMe, updateMe, addAddress, updateAddress, deleteAddress, changePassword } from '../api/profile.js'
import { uploadProfile } from '../api/uploads.js'
import { fetchOrders } from '../api/orders.js'

export default function Profile(){
  const token = useAuth(s=>s.token)
  const user = useAuth(s=>s.user)
  const setUser = useAuth(s=>s.setUser)
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    if (!token) return
    let active = true
    async function load(){
      try { const me = await getMe(); if (active) setUser(me) } catch {}
      try { const o = await fetchOrders(); if (active) setOrders(o.items || []) } catch {}
    }
    load()
    return ()=>{ active=false }
  }, [token])

  if (!token){
    return (
      <div className="container container-padding py-10">
        <h1 className="text-2xl font-semibold mb-2">Account</h1>
        <p className="text-neutral-600">Please <Link to="/checkout" className="text-blue-600 underline">login</Link> to manage your profile and orders.</p>
      </div>
    )
  }

  return (
    <div className="container container-padding py-8">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-56 shrink-0">
          <ul className="space-y-2">
            <li><button onClick={()=>setTab('overview')} className={`w-full text-left px-3 py-2 rounded-md border ${tab==='overview'?'border-blue-500 text-blue-600':'border-neutral-300 dark:border-neutral-700'}`}>Profile</button></li>
            <li><button onClick={()=>setTab('addresses')} className={`w-full text-left px-3 py-2 rounded-md border ${tab==='addresses'?'border-blue-500 text-blue-600':'border-neutral-300 dark:border-neutral-700'}`}>Addresses</button></li>
            <li><button onClick={()=>setTab('orders')} className={`w-full text-left px-3 py-2 rounded-md border ${tab==='orders'?'border-blue-500 text-blue-600':'border-neutral-300 dark:border-neutral-700'}`}>Orders</button></li>
            <li><button onClick={()=>setTab('security')} className={`w-full text-left px-3 py-2 rounded-md border ${tab==='security'?'border-blue-500 text-blue-600':'border-neutral-300 dark:border-neutral-700'}`}>Security</button></li>
          </ul>
        </aside>
        <section className="flex-1">
          {tab==='overview' && <Overview user={user} onSave={async(values)=>{ setLoading(true); try { const updated = await updateMe(values); setUser(updated) } finally { setLoading(false) } }} loading={loading} />}
          {tab==='addresses' && <Addresses user={user} onUser={setUser} />}
          {tab==='orders' && <Orders orders={orders} />}
          {tab==='security' && <Security />}
        </section>
      </div>
    </div>
  )
}

function Overview({ user, onSave, loading }){
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', profileImage: user?.profileImage || '' })
  const [file, setFile] = useState(null)
  const [upMsg, setUpMsg] = useState('')
  useEffect(()=>{ setForm({ name: user?.name || '', email: user?.email || '', profileImage: user?.profileImage || '' }) }, [user])
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <div className="flex items-center gap-4 mb-4">
        <Avatar src={form.profileImage} name={form.name} size={56} />
        <div className="text-sm text-neutral-600">Upload a new photo or use a URL.</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Profile Image URL</label>
          <input value={form.profileImage} onChange={e=>setForm(f=>({...f, profileImage: e.target.value}))} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Upload Profile Photo</label>
          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="text-sm" />
            <button disabled={!file} onClick={async()=>{ setUpMsg(''); if(!file) return; try { const { url } = await uploadProfile(file); setForm(f=>({...f, profileImage: url })); setUpMsg('Uploaded') } catch(e){ setUpMsg('Upload failed') } }} className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700">Upload</button>
            {upMsg && <span className="text-sm text-neutral-600">{upMsg}</span>}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button disabled={loading} onClick={()=>onSave(form)} className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900">Save changes</button>
      </div>
    </div>
  )
}

function Addresses({ user, onUser }){
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ label:'Home', line1:'', city:'', zip:'', country:'', phone:'', isDefault:false })

  async function add(){
    const addr = await addAddress(form)
    onUser({ ...user, addresses: [...(user?.addresses||[]), addr] })
    setForm({ label:'Home', line1:'', city:'', zip:'', country:'', phone:'', isDefault:false })
    setAdding(false)
  }
  async function save(id, values){
    const updated = await updateAddress(id, values)
    const next = (user?.addresses||[]).map(a=>a._id===id? updated : a)
    onUser({ ...user, addresses: next })
  }
  async function remove(id){
    await deleteAddress(id)
    const next = (user?.addresses||[]).filter(a=>a._id!==id)
    onUser({ ...user, addresses: next })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Addresses</h2>
      <div className="space-y-3">
        {(user?.addresses||[]).map(a=> (
          <AddressItem key={a._id} a={a} onSave={(v)=>save(a._id, v)} onDelete={()=>remove(a._id)} />
        ))}
      </div>
      <div className="mt-4">
        {!adding ? (
          <button onClick={()=>setAdding(true)} className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700">Add address</button>
        ) : (
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 grid md:grid-cols-3 gap-3">
            <input placeholder="Label" value={form.label} onChange={e=>setForm(f=>({...f,label:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
            <input placeholder="Address line" value={form.line1} onChange={e=>setForm(f=>({...f,line1:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
            <input placeholder="City" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
            <input placeholder="ZIP" value={form.zip} onChange={e=>setForm(f=>({...f,zip:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
            <input placeholder="Country" value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isDefault} onChange={e=>setForm(f=>({...f,isDefault:e.target.checked}))} /> Default</label>
            <div className="md:col-span-3 flex gap-2">
              <button onClick={add} className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700">Save</button>
              <button onClick={()=>setAdding(false)} className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AddressItem({ a, onSave, onDelete }){
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState(a)
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
      {!edit ? (
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium">{a.label} {a.isDefault && <span className="ml-2 text-xs text-green-600">(Default)</span>}</div>
            <div className="text-sm text-neutral-600">{a.line1}, {a.city} {a.zip}, {a.country}</div>
            {a.phone && <div className="text-sm text-neutral-600">📞 {a.phone}</div>}
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setEdit(true)} className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 text-sm">Edit</button>
            <button onClick={onDelete} className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 text-sm">Delete</button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-3">
          <input value={form.label} onChange={e=>setForm(f=>({...f,label:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
          <input value={form.line1} onChange={e=>setForm(f=>({...f,line1:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
          <input value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
          <input value={form.zip} onChange={e=>setForm(f=>({...f,zip:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
          <input value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
          <input value={form.phone || ''} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} className="rounded-md border border-neutral-300 dark:border-neutral-700 px-2 py-1.5" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.isDefault} onChange={e=>setForm(f=>({...f,isDefault:e.target.checked}))} /> Default</label>
          <div className="md:col-span-3 flex gap-2">
            <button onClick={()=>{ onSave(form); setEdit(false) }} className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700">Save</button>
            <button onClick={()=>{ setForm(a); setEdit(false) }} className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Orders({ orders }){
  if (!orders?.length) return <div><h2 className="text-xl font-semibold mb-3">Orders</h2><p className="text-neutral-600">No orders yet.</p></div>
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Orders</h2>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-800">
        {orders.map(o=> (
          <div key={o._id} className="p-4 flex items-center gap-4 justify-between">
            <div>
              <div className="font-medium">Order #{o._id.slice(-6)}</div>
              <div className="text-sm text-neutral-600">{new Date(o.createdAt).toLocaleString()} · Status: <span className="capitalize">{o.status}</span></div>
            </div>
            <div className="text-right">
              <div className="font-semibold">₹{(o.subtotal||0).toLocaleString('en-IN')}</div>
              <div className="text-sm">
                <Link to={`/orders/${o._id}`} className="text-blue-600 hover:underline mr-3">Details</Link>
                <Link to={`/orders/${o._id}/invoice`} className="text-blue-600 hover:underline mr-3">Invoice</Link>
                <span className="text-neutral-500">{o.paymentStatus==='paid'?'Paid':'Unpaid'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Security(){
  const [form, setForm] = useState({ oldPassword:'', newPassword:'' })
  const [msg, setMsg] = useState('')
  async function submit(){
    setMsg('')
    try { await changePassword(form); setMsg('Password updated') } catch (e) { setMsg('Failed to update') }
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Security</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Current password</label>
          <input type="password" value={form.oldPassword} onChange={e=>setForm(f=>({...f,oldPassword:e.target.value}))} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">New password</label>
          <input type="password" value={form.newPassword} onChange={e=>setForm(f=>({...f,newPassword:e.target.value}))} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
      </div>
      <div className="mt-4">
        <button onClick={submit} className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900">Change password</button>
        {msg && <span className="ml-3 text-sm text-neutral-600">{msg}</span>}
      </div>
    </div>
  )
}

function Avatar({ src, name, size=32 }){
  if (src) return <img src={src} alt={name||'avatar'} className="rounded-full object-cover" style={{ width:size, height:size }} />
  const initial = (name||'?').trim().charAt(0).toUpperCase()
  return (
    <div className="rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-100" style={{ width:size, height:size }}>
      <span className="text-sm font-semibold">{initial}</span>
    </div>
  )
}
