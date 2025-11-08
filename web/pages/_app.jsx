import '@/styles/globals.css'
// Removed storefront chrome components (TopBar, Navbar, Footer)
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@/src/store/auth'
// Removed profile API usage
import api, { setCsrfToken } from '@/src/api/axios'

export default function MyApp({ Component, pageProps }){
  const router = useRouter()
  const setUser = useAuth((s)=>s.setUser)
  // token no longer used (cookie-only auth)

  useEffect(()=>{
    let mounted = true
    async function hydrate(){
      try {
        const csrfRes = await api.get('/csrf')
        if (csrfRes?.data?.csrfToken) setCsrfToken(csrfRes.data.csrfToken)
        // User hydration removed with storefront deprecation
      } catch (_) { /* silent */ }
    }
    hydrate()
    return ()=>{ mounted = false }
  }, [])

  // Hide global chrome on specific routes (e.g., admin login)
  // Hide site chrome on all admin routes
  const hideChrome = router.pathname.startsWith('/admin')

  // Always render bare layout (storefront removed)
  return (
    <main className="min-h-screen">
      <Component {...pageProps} />
    </main>
  )
}
