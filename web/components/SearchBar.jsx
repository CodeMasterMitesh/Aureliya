import { useEffect, useState } from 'react'

export default function SearchBar({ onSearch, delay=400, placeholder='Search...' }){
  const [term, setTerm] = useState('')
  useEffect(()=>{
    const t = setTimeout(()=> onSearch(term), delay)
    return ()=> clearTimeout(t)
  }, [term])
  return (
    <input value={term} onChange={e=>setTerm(e.target.value)} className="border rounded px-3 py-2 text-sm w-full" placeholder={placeholder} />
  )
}
