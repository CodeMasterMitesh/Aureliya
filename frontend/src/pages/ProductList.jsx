import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { fetchProducts } from '../api/products.js'

export default function ProductList() {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') || ''
  const category = sp.get('category') || ''
  const sort = sp.get('sort') || 'newest'
  const [data, setData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProducts({ q, category, sort, page: 1, limit: 12 })
      .then((d) => {
        if (mounted) setData(d)
      })
      .catch((e) => console.error('Fetch products error', e))
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [q, category, sort])

  function onSortChange(e) {
    setSp((prev) => {
      const next = new URLSearchParams(prev)
      next.set('sort', e.target.value)
      return next
    }, { replace: true })
  }
  return (
    <section className="container container-padding py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <div className="flex gap-3">
          <input defaultValue={q} onKeyDown={(e)=>{ if(e.key==='Enter'){ setSp((prev)=>{const n=new URLSearchParams(prev); const v=e.currentTarget.value.trim(); if(v) n.set('q', v); else n.delete('q'); return n}, { replace: true })}}} className="input w-full md:w-64 border rounded-md px-3 py-2 bg-transparent" placeholder="Search products" aria-label="Search products" />
          <select value={sort} onChange={onSortChange} className="border rounded-md px-3 py-2 bg-transparent">
            <option value="newest">Sort by newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Rating: High to Low</option>
          </select>
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && Array.from({ length: 12 }).map((_,i)=>(
          <div key={i} className="h-64 rounded-xl border border-neutral-200/70 dark:border-neutral-800 animate-pulse bg-neutral-50 dark:bg-neutral-900" />
        ))}
        {!loading && data.items.map(p => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  )
}
