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
  const setReady = useAuth((s)=>s.setReady)
  // token no longer used (cookie-only auth)

  useEffect(()=>{
    let mounted = true
    async function hydrate(){
      try {
        // Seed CSRF (optional for GET) and then hydrate user from JWT cookie
        const csrfRes = await api.get('/csrf')
        if (csrfRes?.data?.csrfToken) setCsrfToken(csrfRes.data.csrfToken)
      } catch (_) {}
      try {
        const me = await api.get('/auth/me')
        if (me?.data) setUser({
          id: me.data.id,
          name: me.data.name,
          email: me.data.email,
          role: me.data.role,
          profileImage: me.data.profileImage,
        })
      } catch (_) {
        // not logged in; leave user as null
      } finally {
        setReady(true)
      }
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
