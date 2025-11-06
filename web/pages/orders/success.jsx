import Link from 'next/link'

export default function OrderSuccess(){
  return (
    <section className="container container-padding py-16 text-center">
      <div className="mx-auto max-w-lg">
        <div className="text-3xl font-semibold">Order confirmed 🎉</div>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">Your order has been placed and payment confirmed. You can track its progress and download the invoice anytime.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link className="underline" href="/profile#orders">View my orders</Link>
          <span className="text-neutral-400">•</span>
          <Link className="underline" href="/products">Continue shopping</Link>
        </div>
      </div>
    </section>
  )
}
