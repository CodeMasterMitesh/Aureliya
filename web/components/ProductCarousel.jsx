import { useRef } from 'react'
import ProductCard from './ProductCard'

export default function ProductCarousel({ title, href, products=[] }){
  const ref = useRef(null)
  function scrollBy(dx){
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dx, behavior: 'smooth' })
  }
  if (!products.length) return null
  return (
    <section className="container container-padding py-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {href && <a className="text-blue-600 hover:underline" href={href}>View all</a>}
      </div>
      <div className="relative mt-6">
        <div ref={ref} className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
          {products.map(p=> (
            <div key={p.slug} className="snap-start w-72 flex-none">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <button aria-label="Scroll left" onClick={()=>scrollBy(-320)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/90 dark:bg-neutral-900/90 p-2 shadow hidden md:inline">◀</button>
        <button aria-label="Scroll right" onClick={()=>scrollBy(320)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/90 dark:bg-neutral-900/90 p-2 shadow hidden md:inline">▶</button>
      </div>
    </section>
  )
}
