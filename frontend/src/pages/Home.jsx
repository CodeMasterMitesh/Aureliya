import BannerCarousel from '../components/BannerCarousel.jsx'
import CategoryStrip from '../components/CategoryStrip.jsx'
import Hero from '../components/Hero.jsx'
import FeatureGrid from '../components/FeatureGrid.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Pricing from '../components/Pricing.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products.js'
import { fetchBlogs } from '../api/blogs.js'
import FAQ from '../components/FAQ.jsx'
import BlogPreview from '../components/BlogPreview.jsx'

export default function Home() {
  const [products, setProducts] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [{ items }, blogData] = await Promise.all([
          fetchProducts({ limit: 8, sort: 'newest' }),
          fetchBlogs(),
        ])
        if (mounted) {
          setProducts(items || [])
          setBlogs(blogData.items || [])
        }
      } catch (e) {
        console.error('Home fetch error', e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => (mounted = false)
  }, [])

  return (
    <>
      <BannerCarousel />
      <CategoryStrip />
      <Hero />
      <section className="container container-padding py-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">New Arrivals</h2>
          <a className="text-blue-600 hover:underline" href="/products">View all</a>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading && Array.from({ length: 8 }).map((_,i)=>(
            <div key={i} className="h-64 rounded-xl border border-neutral-200/70 dark:border-neutral-800 animate-pulse bg-neutral-50 dark:bg-neutral-900" />
          ))}
          {!loading && products.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
      <FeatureGrid />
      <Testimonials />
  <Pricing />
  <BlogPreview posts={blogs} />
      <FAQ />
    </>
  )
}
