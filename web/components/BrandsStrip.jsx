export default function BrandsStrip(){
  const brands = Array.from({ length: 8 }).map((_,i)=> ({
    name: `Brand ${i+1}`,
    image: `https://picsum.photos/seed/brand-${i+1}/180/80`
  }))
  return (
    <section className="container container-padding py-8">
      <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800 p-4 overflow-x-auto">
        <div className="flex items-center justify-between gap-6 min-w-max">
          {brands.map((b,i)=> (
            <img key={i} src={b.image} alt={b.name} className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition" />
          ))}
        </div>
      </div>
    </section>
  )
}
