import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { fetchCompanies, fetchBranches } from '../../src/api/companies'
import api from '../../src/api/axios'
import { useAuth } from '../../src/store/auth'

export default function AdminLogin(){
  const router = useRouter()
  const loginStore = useAuth(s=>s.login)
  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])
  const [form, setForm] = useState({ identifier:'', password:'', companyId:'', branchId:'' })
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function init(){
      try {
        // Fetch CSRF token then companies
        await api.get('/csrf')
        fetchCompanies().then(setCompanies).catch(()=>{})
      } catch (e){ /* ignore token fetch failure - login will fail gracefully */ }
    }
    init()
  }, [])

  useEffect(()=>{
    if (!form.companyId){ setBranches([]); setForm(f=>({ ...f, branchId:'' })); return }
    fetchBranches(form.companyId).then(setBranches).catch(()=>setBranches([]))
  }, [form.companyId])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
  const { data } = await api.post('/auth/login', form)
  loginStore({ user: data.user })
      
      // Show success alert
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${data.user.name || data.user.email}!`,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      })
      
      router.push('/admin/dashboard')
    } catch (e) {
      const errorMsg = e?.response?.data?.error || 'Login failed. Please check your credentials.'
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMsg,
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Try Again'
      })
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Aureliya</h1>
          <p className="text-gray-600">Admin / Employee Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username or Email
            </label>
            <input 
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
              value={form.identifier} 
              onChange={e=>setForm({ ...form, identifier:e.target.value })} 
              placeholder="Enter your username or email"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
              value={form.password} 
              onChange={e=>setForm({ ...form, password:e.target.value })} 
              placeholder="Enter your password"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <select 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white" 
              value={form.companyId} 
              onChange={e=>setForm({ ...form, companyId:e.target.value })}
            >
              <option value="">Select company</option>
              {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            <select 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-50 disabled:cursor-not-allowed" 
              value={form.branchId} 
              onChange={e=>setForm({ ...form, branchId:e.target.value })} 
              disabled={!form.companyId}
            >
              <option value="">Select branch</option>
              {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading} 
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Aureliya. All rights reserved.
        </p>
      </div>
    </div>
  )
}
