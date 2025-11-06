import BannerCarousel from '@/components/BannerCarousel'
import FeatureGrid from '@/components/FeatureGrid'
import ProductCard from '@/components/ProductCard'
import BlogPreview from '@/components/BlogPreview'
import Reveal from '@/components/ui/Reveal'
import CategoryStrip from '@/components/CategoryStrip'
import ProductCarousel from '@/components/ProductCarousel'
import BrandsStrip from '@/components/BrandsStrip'
import NewsletterBar from '@/components/NewsletterBar'
import { useEffect, useState } from 'react'
import { fetchProducts } from '@/src/api/products'
import { fetchBlogs } from '@/src/api/blogs'

export default function Home(){
  const [products, setProducts] = useState([])
  const [best, setBest] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      try{
        const [newestData, bestData, blogData] = await Promise.all([
          fetchProducts({ limit: 8, sort: 'newest' }),
          fetchProducts({ limit: 8, sort: 'rating_desc' }),
          fetchBlogs(),
        ])
        if (mounted){
          setProducts(newestData.items || [])
          setBest(bestData.items || [])
          setBlogs(blogData.items || [])
        }
      } finally { if (mounted) setLoading(false) }
    })()
    return ()=>{ mounted=false }
  }, [])
  return (
    <>
      <BannerCarousel />
      <CategoryStrip />
      {!loading && <ProductCarousel title="New Arrivals" href="/products?sort=newest" products={products.slice(0,12)} />}
      {!loading && <ProductCarousel title="Best Sellers" href="/products?sort=rating_desc" products={best.slice(0,12)} />}
      <Reveal as="section" className="container container-padding" delay={100}>
        <div className="grid gap-4 md:grid-cols-2">
          <a href="/products" className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop" alt="" className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 p-6 text-white">
              <div className="text-sm uppercase tracking-wider">Voucher Today</div>
              <div className="mt-1 text-2xl font-bold">FLAT 20% OFF</div>
              <div className="mt-2">Use code: TODAY20</div>
            </div>
          </a>
          <a href="/products" className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800">
            <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1600&auto=format&fit=crop" alt="" className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 p-6 text-white">
              <div className="text-sm uppercase tracking-wider">Promotional</div>
              <div className="mt-1 text-2xl font-bold">BUY 1 GET 1</div>
              <div className="mt-2">On select styles</div>
            </div>
          </a>
        </div>
      </Reveal>
      <FeatureGrid />
      <BrandsStrip />
      <Reveal as="section" className="container container-padding py-8" delay={200}>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <a className="text-blue-600 hover:underline" href="/products">Shop all</a>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading && Array.from({ length: 8 }).map((_,i)=>(
            <div key={i} className="h-64 rounded-xl border border-neutral-200/70 dark:border-neutral-800 animate-pulse bg-neutral-50 dark:bg-neutral-900" />
          ))}
          {!loading && products.slice(0,8).map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </Reveal>
      <Reveal as="div" delay={300}><BlogPreview posts={blogs} /></Reveal>
      <NewsletterBar />
    </>
  )
}
