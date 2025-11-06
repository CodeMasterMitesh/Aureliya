import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchMenuTree } from '../src/api/menus'

function Collapse({ label, children, defaultOpen=false }){
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-100 rounded" onClick={()=>setOpen(o=>!o)}>
        <span className="text-sm font-medium">{label}</span>
        <span className={`transition-transform ${open?'rotate-90':''}`}>›</span>
      </button>
      {open && <div className="ml-3 border-l pl-3 space-y-1">{children}</div>}
    </div>
  )
}

function Node({ node, depth=0, activePath }){
  const isLeaf = !node.submenus || node.submenus.length === 0
  const isActive = !!(activePath && node.path && activePath.startsWith(node.path))
  if (isLeaf) {
    return (
      <Link href={node.path || '#'} className={`block px-3 py-2 rounded text-sm ${isActive? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-gray-100'}`}>
        {node.name}
      </Link>
    )
  }
  const anyActive = node.submenus.some(s => activePath && s.path && activePath.startsWith(s.path))
  return (
    <Collapse label={node.name} defaultOpen={anyActive}>
      {node.submenus.map(child => (
        <Node key={child._id} node={child} depth={depth+1} activePath={activePath} />
      ))}
    </Collapse>
  )
}

export default function Sidebar(){
  const [items, setItems] = useState([])
  const router = useRouter()
  const activePath = router.asPath

  useEffect(()=>{
    let mounted = true
    fetchMenuTree().then(data => { if (mounted) setItems(data) }).catch(()=>{})
    return ()=>{ mounted = false }
  }, [])

  const flatNodes = useMemo(()=>items, [items])

  return (
    <aside className="w-64 border-r bg-white h-full overflow-y-auto p-2">
      <div className="text-xs uppercase tracking-wide text-gray-500 px-3 mb-2">Menu</div>
      <div className="space-y-2">
        {flatNodes.map(m => (
          <div key={m._id}>
            <div className="px-3 py-1 text-gray-700 font-semibold text-sm">{m.name}</div>
            <div className="ml-1 space-y-1">
              {(m.submenus||[]).map(node => (
                <Node key={node._id} node={node} depth={0} activePath={activePath} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
