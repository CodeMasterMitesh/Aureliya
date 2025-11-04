import Button from './ui/Button.jsx'
const TIERS = [
  {
    name: 'Basic',
    price: 'Free',
    features: ['Browse catalog', 'Guest cart', 'Email support'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '₹499/mo',
    features: ['User accounts', 'Wishlist + Reviews', 'Priority support'],
    cta: 'Start Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact',
    features: ['Custom SLAs', 'SSO + SAML', 'Dedicated manager'],
    cta: 'Contact sales',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section className="container container-padding py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Simple, transparent pricing</h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">Choose the plan that fits your stage. Upgrade anytime.</p>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl p-6 border transition-shadow shadow-sm hover:shadow-md ${
              t.highlighted
                ? 'border-blue-500/40 bg-gradient-to-b from-blue-50/60 to-white dark:from-blue-950/20 dark:to-neutral-950 border-2'
                : 'border-neutral-200/70 dark:border-neutral-800'
            }`}
          >
            {t.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-blue-600 text-white text-xs px-3 py-1 shadow-sm">
                Recommended
              </span>
            )}
            <div className="font-semibold text-lg">{t.name}</div>
            <div className="mt-2 text-3xl font-bold">{t.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span aria-hidden className="text-green-600">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 w-full"
              variant={t.highlighted ? 'solid' : 'outline'}
              aria-label={`${t.cta} - ${t.name}`}
            >
              {t.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
