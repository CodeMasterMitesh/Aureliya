import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, A11y, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  { title: 'End of Season Sale', subtitle: 'Up to 50% off selected items', cta: 'Shop Now', href: '/products', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop' },
  { title: 'New Arrivals', subtitle: 'Fresh picks for the season', cta: 'Explore', href: '/products', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop' },
  { title: 'Trending Now', subtitle: 'Most-loved products by customers', cta: 'Discover', href: '/products', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop' },
]

export default function BannerCarousel(){
  return (
    <section className="container container-padding pt-6">
      <Swiper
        modules={[Autoplay, Pagination, A11y, Keyboard]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        keyboard={{ enabled: true }}
        aria-roledescription="carousel"
        className="rounded-2xl overflow-hidden border border-neutral-200/70 dark:border-neutral-800"
      >
        {slides.map((s, i)=> (
          <SwiperSlide key={i}>
            <div className="relative aspect-[21/9] md:aspect-[16/6] w-full">
              <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
              <div className="relative z-10 h-full px-6 sm:px-10 py-10 md:py-16 flex flex-col justify-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight drop-shadow">{s.title}</h2>
                <p className="mt-2 text-white/90 max-w-xl drop-shadow">{s.subtitle}</p>
                <a href={s.href} className="mt-6 inline-block rounded-md bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700">{s.cta}</a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
