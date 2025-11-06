export default function BlogPreview({ posts=[] }){
  if (!posts?.length) return null
  return (
    <section className="container container-padding py-8">
      <h2 className="text-2xl font-semibold">From the blog</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {posts.slice(0,3).map((p)=> (
          <a key={p.slug} href="#" className="block rounded-xl border border-neutral-200/70 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900">
            <div className="font-medium line-clamp-2">{p.title}</div>
            <div className="mt-1 text-sm text-neutral-500 line-clamp-3">{p.excerpt}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
