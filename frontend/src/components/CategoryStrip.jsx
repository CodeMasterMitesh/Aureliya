import { useEffect, useState } from 'react'
import { fetchCategories } from '../api/categories.js'

export default function CategoryStrip(){
  const [cats, setCats] = useState([])
  useEffect(()=>{
    fetchCategories().then((d)=> setCats(d.items || [])).catch(()=> setCats([]))
  }, [])
  const all = [{ name: 'All', slug: '' }, ...cats]
  return (
    <section className="container container-padding pt-6">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1" role="tablist" aria-label="Browse categories">
        {all.map(c => (
          <a key={c.slug || 'all'} href={c.slug ? `/products?category=${encodeURIComponent(c.slug)}` : '/products'} className="shrink-0 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm capitalize hover:bg-neutral-50 dark:hover:bg-neutral-900" role="tab">{c.name}</a>
        ))}
      </div>
    </section>
  )
}
