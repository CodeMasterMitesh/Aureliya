const features = [
  { title: 'Blazing Fast', desc: 'Vite + React with code-splitting and lazy loading.' },
  { title: 'Responsive', desc: 'Mobile-first layouts with Tailwind CSS.' },
  { title: 'Accessible', desc: 'Semantic HTML and keyboard-first navigation.' },
  { title: 'Secure', desc: 'JWT auth-ready and API guards.' },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="container container-padding py-12 md:py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f)=> (
          <div key={f.title} className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6">
            <div className="font-semibold">{f.title}</div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
