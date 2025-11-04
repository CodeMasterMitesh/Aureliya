import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, A11y, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const TESTIMONIALS = [
  {
    name: 'Anaya Patel',
    role: 'Product Designer',
    quote:
      'Aureliya nails the details. The UX feels premium, loads fast, and the checkout is frictionless.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Founder, Craftico',
    quote:
      'Exactly what we needed for launch. Clean, reliable, and built with performance in mind.',
    rating: 5,
  },
  {
    name: 'Sophia Mehta',
    role: 'Marketing Lead',
    quote:
      'Mobile experience is outstanding. The interface adapts beautifully across breakpoints.',
    rating: 5,
  },
  {
    name: 'Ishaan Shah',
    role: 'Engineer',
    quote:
      'Code quality is top-notch. Clear patterns, accessible components, and smart state management.',
    rating: 5,
  },
  {
    name: 'Maira Khan',
    role: 'eCom Ops',
    quote:
      'Search, filters, and cart merge flow work flawlessly. This is production-grade.',
    rating: 5,
  },
  {
    name: 'Liam Rodrigues',
    role: 'Brand Manager',
    quote:
      'Polished visuals with purpose. The brand feels consistent from hero to checkout.',
    rating: 5,
  },
]

function Stars({ value = 5 }) {
  return (
    <div aria-label={`${value} out of 5 stars`} className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 ${i < value ? 'opacity-100' : 'opacity-30'}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div
      className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm"
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/70 to-transparent dark:from-blue-950/20" />

      <div className="container container-padding">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Loved by teams that care about craft</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">Real feedback from people building modern commerce experiences.</p>
        </div>

        <div className="mt-10">
          <Swiper
            modules={[Pagination, Autoplay, A11y, Keyboard]}
            slidesPerView={1}
            spaceBetween={16}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            keyboard={{ enabled: true }}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            aria-roledescription="carousel"
          >
            {TESTIMONIALS.map((t, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <article className="h-full rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/60 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Stars value={t.rating} />
                  <blockquote className="mt-3 text-[15px] leading-6 text-neutral-700 dark:text-neutral-300">“{t.quote}”</blockquote>
                  <footer className="mt-6 flex items-center gap-3">
                    <Avatar name={t.name} />
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">{t.role}</div>
                    </div>
                  </footer>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
