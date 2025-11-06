import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { fetchCompanies, fetchBranches } from '../../src/api/companies'
import api from '../../src/api/axios'

export default function AdminLogin(){
  const router = useRouter()
  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])
  const [form, setForm] = useState({ identifier:'', password:'', companyId:'', branchId:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetchCompanies().then(setCompanies).catch(()=>{})
  }, [])

  useEffect(()=>{
    if (!form.companyId){ setBranches([]); setForm(f=>({ ...f, branchId:'' })); return }
    fetchBranches(form.companyId).then(setBranches).catch(()=>setBranches([]))
  }, [form.companyId])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { data } = await api.post('/auth/login', form)
      localStorage.setItem('access_token', data.token)
      router.push('/admin/dashboard')
    } catch (e) {
      setError(e?.response?.data?.error || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md space-y-4 border rounded p-6 bg-white shadow">
        <h1 className="text-2xl font-semibold text-center">Admin / Employee Login</h1>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div>
          <label className="block text-sm mb-1">Username or Email</label>
          <input className="border rounded px-3 py-2 w-full" value={form.identifier} onChange={e=>setForm({ ...form, identifier:e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="border rounded px-3 py-2 w-full" value={form.password} onChange={e=>setForm({ ...form, password:e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Company</label>
          <select className="border rounded px-3 py-2 w-full" value={form.companyId} onChange={e=>setForm({ ...form, companyId:e.target.value })}>
            <option value="">Select company</option>
            {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Branch</label>
          <select className="border rounded px-3 py-2 w-full" value={form.branchId} onChange={e=>setForm({ ...form, branchId:e.target.value })} disabled={!form.companyId}>
            <option value="">Select branch</option>
            {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>
        </div>
        <button disabled={loading} className="w-full px-4 py-2 bg-blue-600 text-white rounded">{loading? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  )
}
