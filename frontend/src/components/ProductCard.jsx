import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../store/cart.js'
import Button from './ui/Button.jsx'

function Stars({ value = 0 }) {
  const v = Math.round(value)
  return (
    <div className="flex items-center gap-0.5 text-amber-500" aria-label={`${v} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 ${i < v ? 'opacity-100' : 'opacity-30'}`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
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
    function onKey(e) {
      if (e.key === 'Escape') setQuick(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [quick])

  return (
    <div className="group relative border border-neutral-200/70 dark:border-neutral-800 rounded-xl overflow-hidden">
      <div className="aspect-square bg-neutral-100 dark:bg-neutral-900">
        <img src={img} alt={product.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/70 dark:border-neutral-800 p-2 shadow-sm hover:scale-105 transition"
      >
        ❤
      </button>
      {/* Hover actions */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-3 opacity-0 group-hover:opacity-100 transition">
        <div className="pointer-events-auto flex gap-2">
          <Button
            variant="solid"
            className="px-3 py-1.5"
            aria-label="Add to cart"
            onClick={() => add({ slug: product.slug, title: product.title, price: product.price, qty: 1, image: img })}
          >
            🛒 Add
          </Button>
          <Button variant="outline" className="px-3 py-1.5" onClick={() => setQuick(true)} aria-label="Quick view">
            👁 Quick view
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.slug}`} className="font-medium group-hover:text-blue-600 line-clamp-1">{product.title}</Link>
        <div className="mt-1 text-sm text-neutral-500 capitalize">{product.category || 'category'}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold">₹{price}</div>
          <Stars value={product.rating?.avg || 0} />
        </div>
      </div>
      {/* Simple Quick View Modal */}
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
                  <Link to={`/product/${product.slug}`} className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900" onClick={()=>setQuick(false)}>View details</Link>
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
