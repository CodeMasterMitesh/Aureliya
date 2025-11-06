import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import Link from 'next/link'
import { useAuth } from '@/src/store/auth'

const cards = [
  { href: '/admin/companies', title: 'Companies', desc: 'Manage companies (create, update, bulk delete).', icon: '🏢' },
  { href: '/admin/branches', title: 'Branches', desc: 'Manage branches under companies.', icon: '🏬' },
  { href: '/admin/main-menus', title: 'Main Menus', desc: 'Top-level navigation groups.', icon: '🧭' },
  { href: '/admin/sub-menus', title: 'Sub Menus', desc: 'Nested navigation items.', icon: '🗂️' },
  { href: '/admin/masters/accounts/groups', title: 'Account Groups', desc: 'Ledger grouping (filtering and classification).', icon: '📁' },
  { href: '/admin/masters/accounts/ledger', title: 'Ledgers', desc: 'Full ledger master data management.', icon: '📒' },
]

export default function AdminSetup(){
  const router = useRouter()
  const token = useAuth(s=>s.token)

  useEffect(()=>{
    if (!token) router.replace('/admin/login')
  }, [token])

  if (!token) return null
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopBar />
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Admin Setup</h1>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map(c => (
              <Link key={c.href} href={c.href} className="group border rounded-lg bg-white p-4 flex flex-col gap-2 shadow-sm hover:shadow transition">
                <div className="text-3xl">{c.icon}</div>
                <div className="font-medium text-slate-800 group-hover:text-blue-600">{c.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{c.desc}</div>
                <div className="mt-auto text-sm text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition">Manage →</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}