import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function MastersRedirect(){
  const router = useRouter()
  const { slug } = router.query
  useEffect(()=>{
    if (!slug) return
    // join parts and redirect to admin area equivalent
    const path = Array.isArray(slug) ? slug.join('/') : String(slug)
    router.replace(`/admin/masters/${path}`)
  }, [slug])
  return <div className="min-h-[60vh] flex items-center justify-center">Redirecting...</div>
}
