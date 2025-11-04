import { useParams } from 'react-router-dom'
import { useCart } from '../store/cart.js'

export default function ProductPage() {
  const { slug } = useParams()
  const add = useCart((s)=>s.add)
  const product = { slug, title: slug?.replaceAll('-', ' ') || 'Product', price: 1999 }
  return (
    <section className="container container-padding py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-xl bg-neutral-100 dark:bg-neutral-900" />
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">Product description goes here. Variants, stock, and reviews TBD.</p>
          <div className="mt-4 text-2xl font-semibold">₹{product.price.toLocaleString('en-IN')}</div>
          <button onClick={()=>add({ title: product.title, price: product.price, slug: product.slug, qty: 1 })} className="mt-6 px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>
    </section>
  )
}
