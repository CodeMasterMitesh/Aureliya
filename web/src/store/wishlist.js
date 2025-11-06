import { create } from 'zustand'

const storageKey = 'wishlist_items'

function load(){
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(storageKey) || '[]') } catch { return [] }
}

export const useWishlist = create((set, get)=> ({
  items: load(),
  has: (slug)=> get().items.some(i=>i.slug===slug),
  toggle: (item)=>{
    const items = get().items.slice()
    const idx = items.findIndex(i=>i.slug===item.slug)
    if (idx>=0) items.splice(idx,1)
    else items.push({ ...item, addedAt: Date.now() })
    set({ items })
    if (typeof window !== 'undefined') localStorage.setItem(storageKey, JSON.stringify(items))
  },
  clear: ()=>{ set({ items: [] }); if (typeof window !== 'undefined') localStorage.removeItem(storageKey) }
}))
