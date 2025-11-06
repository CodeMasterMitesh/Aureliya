import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
import { useAuth } from '@/src/store/auth'
import { getMe } from '@/src/api/profile'

export default function MyApp({ Component, pageProps }){
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
