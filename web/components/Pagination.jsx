export default function Pagination({ page=1, pages=1, onChange }){
  if (pages <= 1) return null
  const prev = () => onChange(Math.max(1, page-1))
  const next = () => onChange(Math.min(pages, page+1))
  return (
    <div className="flex items-center gap-2 mt-3">
      <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page===1} onClick={prev}>Prev</button>
      <span className="text-sm text-gray-600">Page {page} of {pages}</span>
      <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page===pages} onClick={next}>Next</button>
    </div>
  )
}
