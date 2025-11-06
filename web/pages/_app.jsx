import '@/styles/globals.css'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@/src/store/auth'
import { getMe } from '@/src/api/profile'

export default function MyApp({ Component, pageProps }){
  const router = useRouter()
  const setUser = useAuth((s)=>s.setUser)
  const token = useAuth((s)=>s.token)

  useEffect(()=>{
    let mounted = true
    async function hydrate(){
      try {
        if (!token && typeof window !== 'undefined'){
          const t = localStorage.getItem('access_token')
          if (!t) return
        }
        const me = await getMe()
        if (mounted) setUser(me)
      } catch (_) { /* ignore */ }
    }
    hydrate()
    return ()=>{ mounted = false }
  }, [token, setUser])

  // Hide global chrome on specific routes (e.g., admin login)
  // Hide site chrome on all admin routes
  const hideChrome = router.pathname.startsWith('/admin')

  if (hideChrome) {
    return (
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
