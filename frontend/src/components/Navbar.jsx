import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../store/cart.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const [sp] = useSearchParams()
  const items = useCart((s)=>s.items)
  const count = useCart((s)=>s.count())
  const [dark, setDark] = useState(() => {
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
    // initialize search box from URL if present
    const q = sp.get('q') || ''
    setQuery(q)
  }, [])

  function onSearchSubmit(e){
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setOpen(false)
  }
  return (
    <header className="border-b border-neutral-200/60 dark:border-neutral-800 sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-neutral-950/70">
      <div className="container container-padding">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-semibold text-xl">Aureliya</Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={({isActive})=>isActive? 'text-blue-600' : 'hover:text-blue-600'}>Home</NavLink>
            <NavLink to="/products" className={({isActive})=>isActive? 'text-blue-600' : 'hover:text-blue-600'}>Shop</NavLink>
            <NavLink to="/about" className={({isActive})=>isActive? 'text-blue-600' : 'hover:text-blue-600'}>About</NavLink>
            <NavLink to="/contact" className={({isActive})=>isActive? 'text-blue-600' : 'hover:text-blue-600'}>Contact</NavLink>
            <NavLink to="/cart" className={({isActive})=>isActive? 'text-blue-600' : 'hover:text-blue-600'}>Cart</NavLink>
          </nav>
          <form onSubmit={onSearchSubmit} className="hidden md:flex items-center gap-2">
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Search products"
              className="w-56 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-1.5 text-sm"
              aria-label="Search products"
            />
            <button type="submit" className="rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900">Search</button>
          </form>
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
              <Link to="/cart" className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                Cart{count ? ` (${count})` : ''}
              </Link>
              {/* mini-cart preview */}
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
                    <Link to="/cart" className="text-sm text-blue-600 hover:underline">View cart →</Link>
                  </div>
                </div>
              )}
            </div>
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
            <div className="flex flex-col gap-2">
              <NavLink to="/" onClick={()=>setOpen(false)}>Home</NavLink>
              <NavLink to="/products" onClick={()=>setOpen(false)}>Shop</NavLink>
              <NavLink to="/about" onClick={()=>setOpen(false)}>About</NavLink>
              <NavLink to="/contact" onClick={()=>setOpen(false)}>Contact</NavLink>
              <NavLink to="/cart" onClick={()=>setOpen(false)}>Cart</NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
