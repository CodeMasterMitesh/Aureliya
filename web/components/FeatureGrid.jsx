export default function FeatureGrid(){
  return (
    <section className="container container-padding py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['🚚','Free Shipping'],
          ['↩️','Easy Returns'],
          ['🔒','Secure Payments'],
          ['⭐','Top Rated']
        ].map(([icon,label])=> (
          <div key={label} className="rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-6 flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <div className="font-medium">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
