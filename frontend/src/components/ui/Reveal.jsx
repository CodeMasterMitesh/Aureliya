import { useInView } from '../../hooks/useInView'

export default function Reveal({ as: Tag = 'div', children, className = '', direction = 'up', delay = 0 }){
  const { ref, inView } = useInView()
  const base = 'transition-all duration-700 ease-out will-change-transform'
  const hidden = direction === 'up' ? 'opacity-0 translate-y-6' : direction === 'down' ? 'opacity-0 -translate-y-6' : 'opacity-0 translate-y-3'
  const shown = 'opacity-100 translate-y-0'
  return (
    <Tag ref={ref} className={`${base} ${inView ? shown : hidden} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}
