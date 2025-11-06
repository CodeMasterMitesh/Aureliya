import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useAuth } from '@/src/store/auth'
import { getMe, updateMe, changePassword, addAddress, updateAddress, deleteAddress } from '@/src/api/profile'
import { uploadProfile } from '@/src/api/uploads'
import { fetchOrders } from '@/src/api/orders'

export default function Profile(){
  const token = useAuth((s)=>s.token)
  const user = useAuth((s)=>s.user)
  const setUser = useAuth((s)=>s.setUser)

  const [tab, setTab] = useState('overview')
  const [saving, setSaving] = useState(false)
  const [me, setMe] = useState(user || null)
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    async function load(){
      if (!token) return
      try{
        const m = await getMe()
        setMe(m); setUser(m)
      }catch{}
      try{
        const list = await fetchOrders()
        setOrders(list)
      }catch{}
    }
    load()
  }, [token])

  if (!token) return (
    <section className="container container-padding py-16">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="mt-4 text-neutral-500">Please log in to view your profile.</p>
    </section>
  )

  async function onUpload(e){
    const file = e.target.files?.[0]
    if (!file) return
    setSaving(true)
    try{
      const { url } = await uploadProfile(file)
      const next = await updateMe({ profileImage: url })
      setMe(next); setUser(next)
    }catch{ alert('Upload failed') } finally { setSaving(false) }
  }

  async function onSaveProfile(){
    setSaving(true)
    try{
      const next = await updateMe({ name: me?.name })
      setMe(next); setUser(next)
      alert('Saved')
    }catch{ alert('Failed to save') } finally { setSaving(false) }
  }

  async function onChangePassword(e){
    e.preventDefault()
    const form = new FormData(e.target)
    const oldPassword = form.get('oldPassword')
    const newPassword = form.get('newPassword')
    if (!oldPassword || !newPassword) { alert('Enter both passwords'); return }
    setSaving(true)
    try{ await changePassword({ oldPassword, newPassword }); alert('Password changed') }
    catch{ alert('Failed to change password') }
    finally{ setSaving(false); e.target.reset() }
  }

  async function onAddAddress(e){
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = {
      label: form.get('label')||'Home',
      line1: form.get('line1')||'',
      city: form.get('city')||'',
      zip: form.get('zip')||'',
      isDefault: form.get('isDefault') === 'on'
    }
    try{
      const res = await addAddress(payload)
      const next = await getMe(); setMe(next); setUser(next)
      e.target.reset()
    }catch{ alert('Unable to add address') }
  }

  async function onSetDefault(id){
    try{ await updateAddress(id, { isDefault: true }); const next = await getMe(); setMe(next); setUser(next) }
    catch{ alert('Failed to set default') }
  }

  async function onDeleteAddress(id){
    if (!confirm('Delete this address?')) return
    try{ await deleteAddress(id); const next = await getMe(); setMe(next); setUser(next) }
    catch{ alert('Failed to delete') }
  }

  return (
    <section className="container container-padding py-10">
      <h1 className="text-2xl font-semibold">My Account</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-4">
          <nav className="space-y-2 text-sm">
            <button className={`block w-full text-left rounded-md px-3 py-2 ${tab==='overview'?'bg-neutral-100 dark:bg-neutral-800':''}`} onClick={()=>setTab('overview')}>Overview</button>
            <button className={`block w-full text-left rounded-md px-3 py-2 ${tab==='addresses'?'bg-neutral-100 dark:bg-neutral-800':''}`} onClick={()=>setTab('addresses')}>Addresses</button>
            <button className={`block w-full text-left rounded-md px-3 py-2 ${tab==='security'?'bg-neutral-100 dark:bg-neutral-800':''}`} onClick={()=>setTab('security')}>Security</button>
            <button className={`block w-full text-left rounded-md px-3 py-2 ${tab==='orders'?'bg-neutral-100 dark:bg-neutral-800':''}`} onClick={()=>setTab('orders')}>Orders</button>
          </nav>
        </aside>
        <div>
          {tab==='overview' && (
            <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-neutral-200">
                  {me?.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={me.profileImage} alt="avatar" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Profile photo</label>
                  <input type="file" accept="image/*" onChange={onUpload} disabled={saving} className="block text-sm mt-1" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-neutral-500">Name</label>
                  <input value={me?.name||''} onChange={(e)=>setMe({...me, name: e.target.value})} className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-neutral-500">Email</label>
                  <input value={me?.email||''} disabled className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2 text-sm" />
                </div>
              </div>
              <Button variant="solid" onClick={onSaveProfile} disabled={saving}>Save changes</Button>
            </div>
          )}

          {tab==='addresses' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
                <h2 className="font-semibold">Saved addresses</h2>
                <ul className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
                  {me?.addresses?.length ? me.addresses.map(a=> (
                    <li key={a._id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-sm">{a.label} {a.isDefault && <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Default</span>}</div>
                        <div className="text-sm text-neutral-500">{a.line1}, {a.city} {a.zip}</div>
                      </div>
                      <div className="flex gap-2">
                        {!a.isDefault && <Button size="sm" onClick={()=>onSetDefault(a._id)}>Set default</Button>}
                        <Button size="sm" variant="outline" onClick={()=>onDeleteAddress(a._id)}>Delete</Button>
                      </div>
                    </li>
                  )) : <li className="py-3 text-sm text-neutral-500">No addresses yet.</li>}
                </ul>
              </div>
              <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
                <h2 className="font-semibold">Add new address</h2>
                <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={onAddAddress}>
                  <input name="label" placeholder="Label (Home)" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
                  <input name="line1" placeholder="Address line" className="sm:col-span-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
                  <input name="city" placeholder="City" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
                  <input name="zip" placeholder="ZIP" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
                  <label className="sm:col-span-2 text-sm"><input type="checkbox" name="isDefault" className="mr-2" /> Set as default</label>
                  <div className="sm:col-span-2"><Button variant="solid" type="submit">Add address</Button></div>
                </form>
              </div>
            </div>
          )}

          {tab==='security' && (
            <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
              <h2 className="font-semibold">Change password</h2>
              <form className="mt-4 grid gap-3 sm:w-96" onSubmit={onChangePassword}>
                <input name="oldPassword" type="password" placeholder="Current password" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
                <input name="newPassword" type="password" placeholder="New password" className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
                <div><Button variant="solid" type="submit">Update password</Button></div>
              </form>
            </div>
          )}

          {tab==='orders' && (
            <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
              <h2 className="font-semibold">Orders</h2>
              <ul className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
                {orders?.length ? orders.map(o=> (
                  <li key={o._id} className="py-3 flex items-center justify-between gap-4 text-sm">
                    <div>
                      <div className="font-medium">#{o._id.slice(-6)} • {new Date(o.createdAt).toLocaleString()}</div>
                      <div className="text-neutral-500">{o.items?.length||0} items • Total ₹{(o.total||0).toLocaleString('en-IN')} • {o.status}</div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/orders/${o._id}`} className="underline">Details</Link>
                      <Link href={`/invoice/${o._id}`} className="underline">Invoice</Link>
                    </div>
                  </li>
                )) : <li className="py-4 text-neutral-500 text-sm">No orders yet.</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
