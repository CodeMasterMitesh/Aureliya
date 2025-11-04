export default function NotFound() {
  return (
    <section className="container container-padding py-16 text-center">
      <h1 className="text-5xl font-bold tracking-tight">404</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">We couldn’t find that page.</p>
      <a href="/" className="mt-6 inline-block rounded-md bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700">Go home</a>
    </section>
  )
}
