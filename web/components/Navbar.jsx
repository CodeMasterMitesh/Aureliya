import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/src/store/cart'
import { fetchProducts } from '@/src/api/products'
import { useAuth } from '@/src/store/auth'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const items = useCart((s)=>s.items)
  const count = useCart((s)=>s.count())
  const authUser = useAuth((s)=>s.user)
  const logout = useAuth((s)=>s.logout)
  const [dark, setDark] = useState(() => {
    if (typeof window==='undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  useEffect(()=>{
    const q = router.query.q || ''
    if (typeof q === 'string') setQuery(q)
  }, [router.query.q])

  function onSearchSubmit(e){
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setOpen(false)
  }
  // autocomplete search
  const [suggestions, setSuggestions] = useState([])
  const [showSug, setShowSug] = useState(false)
  const sugRef = useRef(null)
  useEffect(()=>{
    const q = query.trim()
    let active = true
    if (!q) { setSuggestions([]); return }
    const t = setTimeout(async()=>{
      try {
        const { items } = await fetchProducts({ q, limit: 6 })
        if (active) setSuggestions(items || [])
      } catch (e) {
        // ignore
      }
    }, 200)
    return ()=>{ active=false; clearTimeout(t) }
  }, [query])
  useEffect(()=>{
    function onDocClick(e){
      if (!sugRef.current) return
      if (!sugRef.current.contains(e.target)) setShowSug(false)
    }
    document.addEventListener('click', onDocClick)
    return ()=>document.removeEventListener('click', onDocClick)
  }, [])
  const isActive = (href) => router.pathname === href
  return (
    <header className="border-b border-neutral-200/60 dark:border-neutral-800 sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-neutral-950/70">
      <div className="container container-padding">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-semibold text-xl">Aureliya</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={isActive('/')? 'text-blue-600' : 'hover:text-blue-600'}>Home</Link>
            <Link href="/products" className={isActive('/products')? 'text-blue-600' : 'hover:text-blue-600'}>Shop</Link>
            <Link href="/about" className={isActive('/about')? 'text-blue-600' : 'hover:text-blue-600'}>About</Link>
            <Link href="/contact" className={isActive('/contact')? 'text-blue-600' : 'hover:text-blue-600'}>Contact</Link>
          </nav>
          <div className="hidden md:block relative" ref={sugRef}>
            <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e)=>{ setQuery(e.target.value); setShowSug(true) }}
                onFocus={()=>setShowSug(true)}
                placeholder="Search products"
                className="w-72 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-1.5 text-sm"
                aria-label="Search products"
              />
              <button type="submit" className="rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900">Search</button>
            </form>
            {showSug && suggestions.length > 0 && (
              <div className="absolute z-50 mt-2 w-[28rem] rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg p-2">
                <ul>
                  {suggestions.map(p => (
                    <li key={p.slug}>
                      <Link href={`/product/${p.slug}`} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900" onMouseDown={(e)=>e.preventDefault()} onClick={()=>setShowSug(false)}>
                        <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{p.title}</div>
                          <div className="text-xs text-neutral-500 capitalize">{p.category}</div>
                        </div>
                        <div className="ml-auto text-sm font-semibold">₹{(p.price||0).toLocaleString('en-IN')}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 relative">
            <button
              type="button"
              className="px-2 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-sm"
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle dark mode"
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? '🌙' : '☀️'}
            </button>
            <div className="group inline-block">
              <Link href="/cart" className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                Cart{count ? ` (${count})` : ''}
              </Link>
              {items.length > 0 && (
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 mt-2 w-72 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg p-4 z-50">
                  <div className="text-sm font-medium mb-2">Recently added</div>
                  <ul className="space-y-2 max-h-60 overflow-auto">
                    {items.slice(-5).map((it, idx)=>(
                      <li key={idx} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-sm">{it.title || 'Item'}</div>
                          <div className="text-xs text-neutral-500">Qty {it.qty || 1}</div>
                        </div>
                        <div className="text-sm font-semibold">₹{(it.price || 0).toLocaleString('en-IN')}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-right">
                    <Link href="/cart" className="text-sm text-blue-600 hover:underline">View cart →</Link>
                  </div>
                </div>
              )}
            </div>
            {authUser ? (
              <div className="relative group">
                <Link href="/profile" className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                  <Avatar name={authUser.name} src={authUser.profileImage} />
                  <span className="hidden md:inline text-sm max-w-[10rem] truncate">{authUser.name}</span>
                </Link>
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 mt-2 w-40 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg p-2 z-50">
                  <ul className="text-sm">
                    <li><Link href="/profile" className="block px-2 py-1 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900">Profile</Link></li>
                    <li><button onClick={()=>logout()} className="w-full text-left px-2 py-1 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900">Logout</button></li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link href="/checkout" className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900">Login</Link>
            )}
            <button
              className="md:hidden p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={()=>setOpen(v=>!v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="i">☰</span>
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-menu" className="md:hidden pb-4 animate-in">
            <form onSubmit={onSearchSubmit} className="mb-3">
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm" />
            </form>
            {suggestions.length > 0 && (
              <div className="mb-3 rounded-xl border border-neutral-200/70 dark:border-neutral-800">
                <ul>
                  {suggestions.map(p=> (
                    <li key={p.slug}>
                      <Link href={`/product/${p.slug}`} className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900" onClick={()=>setOpen(false)}>
                        <img src={p.image} alt="" className="h-8 w-8 rounded object-cover" />
                        <span className="truncate text-sm">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Link href="/" onClick={()=>setOpen(false)}>Home</Link>
              <Link href="/products" onClick={()=>setOpen(false)}>Shop</Link>
              <Link href="/about" onClick={()=>setOpen(false)}>About</Link>
              <Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function normalizeSrc(src){
  if (!src) return src
  // Ensure leading slash so Next rewrites /uploads correctly
  if (src.startsWith('uploads/')) return '/' + src
  return src
}

function Avatar({ src, name }){
  const size = 28
  const resolved = normalizeSrc(src)
  if (resolved) return <img src={resolved} alt={name||'avatar'} className="rounded-full object-cover" style={{ width:size, height:size }} />
  const initial = (name||'?').trim().charAt(0).toUpperCase()
  return (
    <div className="rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-100" style={{ width:size, height:size }}>
      <span className="text-xs font-semibold">{initial}</span>
    </div>
  )
}
