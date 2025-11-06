import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../src/store/auth'
import Link from 'next/link'

export default function AdminTopBar(){
  const user = useAuth(s=>s.user)
  const logout = useAuth(s=>s.logout)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(()=>{
    function onDoc(e){
      if (!ref.current) return
      if (!ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return ()=> document.removeEventListener('mousedown', onDoc)
  },[])

  return (
    <div className="flex items-center justify-end px-4 py-2 bg-slate-900 border-b border-slate-800">
      <div className="relative" ref={ref}>
        <button onClick={()=>setOpen(o=>!o)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700">
          <img src={user?.profileImage || '/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-slate-700" />
          <span className="text-sm font-medium hidden sm:inline-block">{user?.name || 'Admin'}</span>
          <span className="text-xs opacity-70">▾</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow border p-2 z-50">
            <div className="px-2 py-1 text-xs text-slate-500">Account</div>
            <Link href="/admin/setup" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-slate-100 text-sm">
              <span>⚙️</span> <span>Setup</span>
            </Link>
            <button onClick={()=>{ logout(); }} className="flex w-full text-left items-center gap-2 px-2 py-2 rounded hover:bg-slate-100 text-sm">
              <span>🚪</span> <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
