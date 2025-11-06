import { useEffect, useRef, useState } from 'react'

export default function Reveal({ as:As='div', children, className='', delay=0, ...props }){
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(()=>{
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) setShown(true) })
    }, { threshold: 0.1 })
    io.observe(el)
    return ()=>io.disconnect()
  }, [])
  const Comp = As
  return <Comp ref={ref} className={`${className} transition ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`} style={{ transitionDelay: `${delay}ms` }} {...props}>{children}</Comp>
}
