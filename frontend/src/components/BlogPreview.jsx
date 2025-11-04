import { Link } from 'react-router-dom'

export default function BlogPreview({ posts = [] }){
  return (
    <section className="container container-padding py-12 md:py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold">From the blog</h2>
        <Link to="/blog" className="text-blue-600 hover:underline">View all</Link>
      </div>
      {posts.length > 0 && (
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {posts.slice(0,3).map(p => (
            <article key={p.slug} className="overflow-hidden rounded-xl border border-neutral-200/70 dark:border-neutral-800">
              {p.image && (
                <div className="aspect-[16/9] bg-neutral-100 dark:bg-neutral-900">
                  <img src={p.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-semibold text-lg line-clamp-2">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{p.excerpt || p.content}</p>
                <Link to={`/blog/${p.slug}`} className="mt-4 inline-block text-sm text-blue-600 hover:underline">Read more →</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
