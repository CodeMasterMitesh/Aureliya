export default function Contact() {
  return (
    <section className="container container-padding py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Contact Us</h1>
      <form className="mt-6 max-w-xl space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium">Name</label>
          <input id="contact-name" name="name" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium">Email</label>
          <input id="contact-email" name="email" type="email" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium">Message</label>
          <textarea id="contact-message" name="message" rows="5" className="mt-1 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <button className="rounded-md bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700">Send</button>
      </form>
    </section>
  )
}
