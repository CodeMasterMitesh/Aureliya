export default function TopBar(){
  return (
    <div className="hidden md:block bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-sm">
      <div className="container container-padding h-9 flex items-center justify-between">
        <div>Free shipping on orders over ₹999</div>
        <div className="flex items-center gap-4">
          <span>Support: +91-99999-99999</span>
          <span className="hidden lg:inline">Email: support@aureliya.test</span>
        </div>
      </div>
    </div>
  )
}
