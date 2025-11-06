import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/src/store/cart'
import Button from './ui/Button'

function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0))
  const full = Math.floor(v)
  const hasHalf = v - full >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)
  const Star = ({ type, i }) => {
    // type: 'full' | 'half' | 'empty'
    if (type === 'half') {
      return (
        <svg key={`h${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-amber-500">
          <defs>
            <linearGradient id={`half-${i}`}>
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill={`url(#half-${i})`} stroke="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      )
    }
    if (type === 'empty') {
      return (
        <svg key={`e${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-amber-500 opacity-30">
          <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      )
    }
    return (
      <svg key={`f${i}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-amber-500">
        <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    )
  }
  return (
    <div className="flex items-center gap-0.5" aria-label={`${v.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => <Star key={`sf${i}`} type="full" i={i} />)}
      {hasHalf && <Star type="half" i={full} />}
      {Array.from({ length: empty }).map((_, i) => <Star key={`se${i}`} type="empty" i={i} />)}
    </div>
  )
}

export default function ProductCard({ product }) {
  const add = useCart((s) => s.add)
  const [quick, setQuick] = useState(false)
  const price = product.price?.toLocaleString?.('en-IN') || '—'
  const img = product.image || `https://picsum.photos/seed/${product.slug}/600/600`

  useEffect(() => {
    if (!quick) return
    function onKey(e) { if (e.key === 'Escape') setQuick(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [quick])

  return (
    <div className="group relative border border-neutral-200/70 dark:border-neutral-800 rounded-xl overflow-hidden">
      <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-900">
        <img src={img} alt={product.title} className="h-full w-full object-cover" loading="lazy" />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          <div className="pointer-events-auto flex gap-2">
            <Button variant="solid" className="px-3 py-1.5" aria-label="Add to cart" onClick={() => add({ slug: product.slug, title: product.title, price: product.price, qty: 1, image: img })}>🛒 Add</Button>
            <Button variant="outline" className="px-3 py-1.5" onClick={() => setQuick(true)} aria-label="Quick view">👁 Quick view</Button>
          </div>
        </div>
        <WishlistButton product={product} image={img} />
      </div>
      <div className="p-4">
        <Link href={`/product/${product.slug}`} className="font-medium group-hover:text-blue-600 line-clamp-1">{product.title}</Link>
        <div className="mt-1 text-sm text-neutral-500 capitalize">{product.category || 'category'}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold">₹{price}</div>
          <Stars value={product.rating?.avg || 0} />
        </div>
      </div>
      {quick && (
        <div role="dialog" aria-modal="true" aria-label="Quick view dialog" className="fixed inset-0 z-[60] p-4">
          <div className="relative flex h-full w-full items-center justify-center">
            <button type="button" aria-label="Close quick view" className="absolute inset-0 h-full w-full bg-black/50" onClick={()=>setQuick(false)} />
            <div className="relative z-10 w-full max-w-lg rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
              <div className="flex gap-4">
                <img src={img} alt="" className="h-32 w-32 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="font-semibold text-lg line-clamp-2">{product.title}</div>
                  <div className="text-sm text-neutral-500 capitalize">{product.category}</div>
                  <div className="mt-2 font-semibold">₹{price}</div>
                  <div className="mt-2"><Stars value={product.rating?.avg || 0} /></div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="solid" onClick={()=>{ add({ slug: product.slug, title: product.title, price: product.price, qty: 1, image: img }); setQuick(false) }}>🛒 Add to cart</Button>
                    <Link href={`/product/${product.slug}`} className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900" onClick={()=>setQuick(false)}>View details</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function WishlistButton({ product, image }){
  const { toggle, has } = useWishlist()
  const active = has(product.slug)
  return (
    <button
      type="button"
      aria-label="Add to wishlist"
      aria-pressed={active}
      onClick={(e)=>{ e.stopPropagation(); e.preventDefault(); toggle({ slug: product.slug, title: product.title, price: product.price, image }) }}
      className={`absolute top-3 right-3 rounded-full border p-2 shadow-sm transition ${active ? 'bg-red-500 text-white border-red-600' : 'bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-100 border-neutral-200/70 dark:border-neutral-800 hover:scale-105'}`}
    >❤</button>
  )
}

import { useWishlist } from '@/src/store/wishlist'
