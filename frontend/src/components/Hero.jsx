import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/70 via-transparent to-transparent dark:from-blue-950/20" />
      <div className="container container-padding py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Shop smarter with a modern experience
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-prose">
              Fast, accessible, and responsive storefront powered by React and Tailwind. Curated products, seamless checkout.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button as={Link} to="/products" variant="solid" className="px-5 py-3">
                Explore Products
              </Button>
              <Button as={Link} to="#features" variant="outline" className="px-5 py-3">
                Learn More
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2"><span aria-hidden>⚡</span> Blazing fast</div>
              <div className="flex items-center gap-2"><span aria-hidden>🔒</span> Secure</div>
              <div className="flex items-center gap-2"><span aria-hidden>♿</span> Accessible</div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200/70 dark:border-neutral-800 shadow-sm" aria-hidden="true" />
            <div className="absolute -bottom-6 -right-6 hidden md:block h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
