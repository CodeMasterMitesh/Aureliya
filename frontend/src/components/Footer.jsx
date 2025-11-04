export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800">
      <div className="container container-padding py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold text-lg">Aureliya</div>
          <p className="mt-3 text-neutral-500 max-w-sm">Modern eCommerce crafted with performance, accessibility, and delightful UX.</p>
        </div>
        <div>
          <div className="font-medium mb-2">Company</div>
          <ul className="space-y-1 text-neutral-500">
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Support</div>
          <ul className="space-y-1 text-neutral-500">
            <li><a href="/contact" className="hover:underline">Help Center</a></li>
            <li><a href="/shipping" className="hover:underline">Shipping</a></li>
            <li><a href="/returns" className="hover:underline">Returns</a></li>
          </ul>
        </div>
      </div>
      <div className="py-4 text-center text-neutral-500 text-xs">© {new Date().getFullYear()} Aureliya. All rights reserved.</div>
    </footer>
  )
}
