export default function NewsletterBar(){
  return (
    <section className="bg-blue-600 text-white">
      <div className="container container-padding py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xl font-semibold">Get special offers & updates</div>
          <div className="text-white/80 text-sm">Subscribe to our newsletter</div>
        </div>
        <form className="flex w-full md:w-auto max-w-lg" onSubmit={(e)=>{ e.preventDefault(); alert('Subscribed!') }}>
          <input type="email" required placeholder="Your email" className="flex-1 rounded-l-md px-3 py-2 text-sm text-neutral-900" />
          <button className="rounded-r-md bg-neutral-900 px-4 py-2 text-sm">Subscribe</button>
        </form>
      </div>
    </section>
  )
}
