export default function BannerCarousel(){
  return (
    <section className="container container-padding py-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop" alt="Banner" className="h-60 w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 p-6 text-white">
            <div className="text-sm uppercase tracking-wider">Fresh Arrivals</div>
            <div className="mt-1 text-2xl font-bold">Upgrade your style</div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1600&auto=format&fit=crop" alt="Banner 2" className="h-60 w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 p-6 text-white">
            <div className="text-sm uppercase tracking-wider">Limited Offer</div>
            <div className="mt-1 text-2xl font-bold">Buy 1 Get 1</div>
          </div>
        </div>
      </div>
    </section>
  )
}
