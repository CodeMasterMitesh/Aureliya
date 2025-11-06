import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/src/api/products'
import { fetchCategories } from '@/src/api/categories'

export default function ProductList(){
  const router = useRouter()
  const q = typeof router.query.q === 'string' ? router.query.q : ''
  const sort = typeof router.query.sort === 'string' ? router.query.sort : 'newest'
  const category = typeof router.query.category === 'string' ? router.query.category : ''
  const [data, setData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [cats, setCats] = useState([])

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fetchProducts({ q, category, sort, page: 1, limit: 12 })
      .then(d => { if (mounted) setData(d) })
      .finally(()=> mounted && setLoading(false))
    return ()=>{ mounted=false }
  }, [q, category, sort])

  useEffect(()=>{ (async()=>{ try{ const d = await fetchCategories(); setCats(d.items||[]) }catch{} })() },[])

  function onSortChange(e){
    const next = { ...router.query, sort: e.target.value }
    router.push({ pathname: '/products', query: next }, undefined, { shallow: true })
  }

  return (
    <section className="container container-padding py-10">
      <h1 className="text-2xl font-semibold">Shop</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 h-fit p-4">
          <div className="font-semibold">Categories</div>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <a href="/products" className={`block rounded px-2 py-1 ${!category? 'bg-neutral-100 dark:bg-neutral-800' : 'hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>All</a>
            </li>
            {cats.map(c=> (
              <li key={c.slug}>
                <a href={`/products?category=${encodeURIComponent(c.slug)}${q?`&q=${encodeURIComponent(q)}`:''}&sort=${encodeURIComponent(sort)}`} className={`block rounded px-2 py-1 ${category===c.slug? 'bg-neutral-100 dark:bg-neutral-800' : 'hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </aside>
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm text-neutral-500">{data.total} results</div>
            <div className="flex gap-3">
              <input defaultValue={q} onKeyDown={(e)=>{ if(e.key==='Enter'){ const v=e.currentTarget.value.trim(); const next={...router.query}; if(v) next.q=v; else delete next.q; router.push({ pathname:'/products', query: next }, undefined, { shallow:true }) } }} className="input w-full md:w-64 border rounded-md px-3 py-2 bg-transparent" placeholder="Search products" aria-label="Search products" />
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
        </div>
      </div>
    </section>
  )
}
