import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, A11y, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  { title: 'End of Season Sale', subtitle: 'Up to 50% off selected items', cta: 'Shop Now', href: '/products' },
  { title: 'New Arrivals', subtitle: 'Fresh picks for the season', cta: 'Explore', href: '/products' },
  { title: 'Trending Now', subtitle: 'Most-loved products by customers', cta: 'Discover', href: '/products' },
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
          <SwiperSlide key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-900 dark:to-neutral-800">
            <div className="px-6 sm:px-10 py-14 md:py-20">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{s.title}</h2>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">{s.subtitle}</p>
              <a href={s.href} className="mt-6 inline-block rounded-md bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700">{s.cta}</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
