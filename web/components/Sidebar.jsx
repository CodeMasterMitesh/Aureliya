import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchMenuTree } from '../src/api/menus'
import { AnimatePresence, motion } from 'framer-motion'

// Persist state helpers
const LS_KEY = 'admin_sidebar_state'
const loadState = () => {
  if (typeof window === 'undefined') return { collapsed: false, open: {} }
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || { collapsed: false, open: {} } } catch { return { collapsed: false, open: {} } }
}
const saveState = (s) => { if (typeof window !== 'undefined') localStorage.setItem(LS_KEY, JSON.stringify(s)) }

function Chevron({ open }){
  return (
    <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="inline-block">
      ▸
    </motion.span>
  )
}

function Node({ node, depth=0, activePath, openMap, toggle, collapsed }){
  const isLeaf = !node.submenus || node.submenus.length === 0
  const key = `sub:${node._id}`
  const isOpen = !!openMap[key]
  const isActive = !!(activePath && node.path && activePath.startsWith(node.path))

  const baseItem = (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ease-in-out ${isActive ? 'bg-slate-700 text-white' : 'text-slate-200 hover:bg-slate-800/80'}`}
      onClick={() => !isLeaf && toggle(key)}>
      {!isLeaf && <Chevron open={isOpen} />}
      {!collapsed && <span className="text-sm font-medium truncate">{node.name}</span>}
    </div>
  )

  if (isLeaf) {
    return (
      <Link href={node.path || '#'} title={collapsed ? node.name : undefined} className="block">
        {baseItem}
      </Link>
    )
  }

  return (
    <div>
      <button title={collapsed ? node.name : undefined} className="w-full text-left">
        {baseItem}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && !collapsed && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-3 pl-2 border-l border-slate-700 space-y-1"
          >
            {(node.submenus||[]).map(child => (
              <Node key={child._id} node={child} depth={depth+1} activePath={activePath} openMap={openMap} toggle={toggle} collapsed={collapsed} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Sidebar(){
  const [items, setItems] = useState([])
  const [{ collapsed, open }, setPersist] = useState(loadState)
  const router = useRouter()
  const activePath = router.asPath

  // Fetch menu tree
  useEffect(()=>{
    let mounted = true
    fetchMenuTree().then(data => { if (mounted) setItems(data) }).catch(()=>{})
    return ()=>{ mounted = false }
  }, [])

  // Persist on change
  useEffect(()=>{ saveState({ collapsed, open }) }, [collapsed, open])

  const flatNodes = useMemo(()=>items, [items])
  const toggle = (key) => setPersist(s => ({ ...s, open: { ...s.open, [key]: !s.open[key] } }))
  const toggleMain = (id) => toggle(`main:${id}`)

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} sticky top-0 self-start h-screen overflow-y-auto bg-slate-900 border-r border-slate-800 p-2 transition-all duration-300` }>
      <div className="flex items-center justify-between px-2 mb-2">
        {!collapsed && <div className="text-xs uppercase tracking-wide text-slate-400">Menu</div>}
        <button
          className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg p-1 transition-colors"
          onClick={()=> setPersist(s => ({ ...s, collapsed: !s.collapsed }))}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>
      <div className="space-y-2">
        {flatNodes.map(m => {
          const mKey = `main:${m._id}`
          const mOpen = !!open[mKey]
          const mainIcon = (m.icon?.[0] || m.name?.[0] || '•').toUpperCase()
          return (
            <div key={m._id}>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-300 ease-in-out ${mOpen ? 'bg-slate-800 text-white' : 'text-slate-200 hover:bg-slate-800/60'}`}
                onClick={()=> toggleMain(m._id)}
                title={collapsed ? m.name : undefined}
              >
                <div className="w-7 h-7 rounded-md bg-slate-800/80 text-slate-200 grid place-items-center text-sm">{mainIcon}</div>
                {!collapsed && <div className="font-semibold text-sm truncate flex-1">{m.name}</div>}
                {!collapsed && <Chevron open={mOpen} />}
              </button>
              <AnimatePresence initial={false}>
                {mOpen && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 ml-2 space-y-1"
                  >
                    {(m.submenus||[]).map(node => (
                      <Node key={node._id} node={node} activePath={activePath} openMap={open} toggle={toggle} collapsed={collapsed} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        {flatNodes.length === 0 && (
          <div className="px-3 py-2 text-xs text-slate-400">Loading menus...</div>
        )}
      </div>
    </aside>
  )
}
