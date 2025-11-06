import { useEffect, useState } from 'react'
import { fetchCategories } from '@/src/api/categories'

const fallbackIcons = ['🧥','👗','👟','🎒','💻','⌚','🎧','📱','🧸','🏀']

export default function CategoryStrip(){
  const [cats, setCats] = useState([])
  useEffect(()=>{ (async()=>{ try{ const d = await fetchCategories(); setCats(d.items||[]) }catch{} })() },[])
  if (!cats.length) return null
  return (
    <section className="container container-padding py-6">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-thin" role="list">
        {cats.map((c, i)=> (
          <a key={c.slug} href={`/products?category=${encodeURIComponent(c.slug)}`} className="flex-none group text-center w-24">
            <div className="mx-auto h-16 w-16 rounded-full border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-center text-2xl shadow-sm transition group-hover:scale-105">
              <span>{fallbackIcons[i % fallbackIcons.length]}</span>
            </div>
            <div className="mt-2 text-sm truncate">{c.name}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
