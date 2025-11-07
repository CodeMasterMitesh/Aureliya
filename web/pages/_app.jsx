import '@/styles/globals.css'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@/src/store/auth'
import { getMe } from '@/src/api/profile'
import api, { setCsrfToken } from '@/src/api/axios'

export default function MyApp({ Component, pageProps }){
  const router = useRouter()
  const setUser = useAuth((s)=>s.setUser)
  // token no longer used (cookie-only auth)

  useEffect(()=>{
    let mounted = true
    async function hydrate(){
      try {
        // Fetch CSRF token once per session
        const csrfRes = await api.get('/csrf')
        if (csrfRes?.data?.csrfToken) setCsrfToken(csrfRes.data.csrfToken)
        // Attempt to load user (cookie-based)
        const me = await getMe()
        if (mounted) setUser(me)
      } catch (_) { /* silent */ }
    }
    hydrate()
    return ()=>{ mounted = false }
  }, [setUser])

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
