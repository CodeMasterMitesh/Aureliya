import { useEffect, useRef, useState } from 'react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
    badge: 'Fresh Arrivals',
    title: 'Upgrade your style',
    href: '/products'
  },
  {
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1600&auto=format&fit=crop',
    badge: 'Limited Offer',
    title: 'Buy 1 Get 1',
    href: '/products?deal=bogo'
  },
  {
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1600&auto=format&fit=crop',
    badge: 'Trending',
    title: 'Essentials you’ll love',
    href: '/products?sort=rating_desc'
  }
]

export default function BannerCarousel(){
  const [idx, setIdx] = useState(0)
  const timer = useRef(null)
  useEffect(()=>{
    timer.current && clearInterval(timer.current)
    timer.current = setInterval(()=> setIdx((i)=> (i+1)%slides.length), 5000)
    return ()=>{ timer.current && clearInterval(timer.current) }
  }, [])

  function goTo(i){ setIdx(((i%slides.length)+slides.length)%slides.length) }
  function prev(){ goTo(idx-1) }
  function next(){ goTo(idx+1) }

  return (
    <section className="container container-padding py-6">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800">
        <div className="relative h-[300px] sm:h-[360px]">
          {slides.map((s, i)=> (
            <a key={i} href={s.href} className={`absolute inset-0 transition-opacity duration-700 ease-out ${i===idx? 'opacity-100' : 'opacity-0'}`} aria-hidden={i!==idx} tabIndex={i===idx?0:-1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 p-6 sm:p-10 text-white">
                <div className="text-xs sm:text-sm uppercase tracking-wider">{s.badge}</div>
                <div className="mt-1 text-2xl sm:text-4xl font-bold max-w-xl">{s.title}</div>
                <div className="mt-4 inline-flex items-center rounded-md bg-white/90 text-neutral-900 px-4 py-2 text-sm font-medium hover:bg-white">Shop now →</div>
              </div>
            </a>
          ))}
        </div>
        <button aria-label="Previous" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-neutral-900/90 p-2 shadow hover:scale-105 transition">◀</button>
        <button aria-label="Next" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-neutral-900/90 p-2 shadow hover:scale-105 transition">▶</button>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {slides.map((_, i)=> (
            <button key={i} aria-label={`Slide ${i+1}`} onClick={()=>goTo(i)} className={`h-2 w-2 rounded-full ${i===idx? 'bg-white' : 'bg-white/60 hover:bg-white'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
