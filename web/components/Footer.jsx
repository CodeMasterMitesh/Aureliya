export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800">
      <div className="container container-padding py-10 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="font-semibold text-lg">Contact us</div>
          <ul className="mt-3 space-y-1 text-neutral-600 dark:text-neutral-400">
            <li>8500 Lorem Street Chicago, IL 55030</li>
            <li>Dolor sit amet</li>
            <li>+91(780)207 5968</li>
            <li><a href="mailto:Mahaviradd27@gmail.com" className="hover:underline">Mahaviradd27@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-lg">Shopping</div>
          <ul className="mt-3 space-y-1 text-neutral-600 dark:text-neutral-400">
            <li><a href="/shipping" className="hover:underline">Shipping</a></li>
            <li><a href="/brands" className="hover:underline">Shop by Brand</a></li>
            <li><a href="/dashboard" className="hover:underline">Track order</a></li>
            <li><a href="/terms" className="hover:underline">Terms &amp; Conditions</a></li>
            <li><a href="/size-guide" className="hover:underline">Size Guide</a></li>
            <li><a href="/wishlist" className="hover:underline">My Wishlist</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-lg">Information</div>
          <ul className="mt-3 space-y-1 text-neutral-600 dark:text-neutral-400">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/policy" className="hover:underline">Term &amp; Policy</a></li>
            <li><a href="/help" className="hover:underline">Help Center</a></li>
            <li><a href="/blog" className="hover:underline">News &amp; Blog</a></li>
            <li><a href="/refunds" className="hover:underline">Refunds</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-lg">Let’s keep in touch</div>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">Enter your email below to be the first to know about new collections and product launches.</p>
          <form className="mt-3 flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
            <button type="submit" className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Subscribe</button>
          </form>
          <p className="mt-2 text-xs text-neutral-500">By clicking subscribe, you agree to the Terms of Service and Privacy Policy.</p>
          <div className="mt-4">
            <a href="/help" className="hover:underline">Help &amp; FAQs</a>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-neutral-500 text-xs">© {new Date().getFullYear()} Aureliya. All rights reserved.</div>
    </footer>
  )
}
