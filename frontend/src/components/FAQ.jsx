export default function FAQ() {
  const faqs = [
    {
      q: 'Is this production-ready?',
      a: 'Yes. The stack follows industry practices with routing, state, and API patterns. You can extend it for your needs.',
    },
    {
      q: 'Does it support mobile well?',
      a: 'The UI is built mobile-first with Tailwind. Components adapt across breakpoints and support dark mode.',
    },
    {
      q: 'How do payments work?',
      a: 'Integrate Razorpay from the backend. The frontend triggers order creation and verifies payment server-side.',
    },
  ]
  return (
    <section className="container container-padding py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-neutral-200/70 dark:divide-neutral-800">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                <span>{f.q}</span>
                <span className="ml-4 text-neutral-500 group-open:rotate-180 transition-transform" aria-hidden>▾</span>
              </summary>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
