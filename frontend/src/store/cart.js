import { create } from 'zustand'

export const useCart = create((set, get) => ({
  items: [],
  setItems(items){ set({ items }) },
  // Add an item; if already in cart (by slug), increment qty
  add(item) {
    const items = get().items.slice()
    const idx = items.findIndex((i) => i.slug === item.slug)
    if (idx >= 0) {
      const existing = items[idx]
      items[idx] = { ...existing, qty: (existing.qty || 0) + (item.qty || 1) }
    } else {
      items.push({ ...item, qty: item.qty || 1 })
    }
    set({ items })
  },
  // Set absolute quantity; if qty <= 0, remove
  setQty(slug, qty) {
    const q = Math.max(0, Number(qty) || 0)
    const items = get().items.slice()
    const idx = items.findIndex((i) => i.slug === slug)
    if (idx < 0) return
    if (q <= 0) {
      items.splice(idx, 1)
    } else {
      items[idx] = { ...items[idx], qty: q }
    }
    set({ items })
  },
  increment(slug) {
    const items = get().items.slice()
    const idx = items.findIndex((i) => i.slug === slug)
    if (idx < 0) return
    const it = items[idx]
    items[idx] = { ...it, qty: (it.qty || 0) + 1 }
    set({ items })
  },
  decrement(slug) {
    const items = get().items.slice()
    const idx = items.findIndex((i) => i.slug === slug)
    if (idx < 0) return
    const it = items[idx]
    const q = (it.qty || 0) - 1
    if (q <= 0) items.splice(idx, 1)
    else items[idx] = { ...it, qty: q }
    set({ items })
  },
  remove(slug) {
    set({ items: get().items.filter((i) => i.slug !== slug) })
  },
  clear() { set({ items: [] }) },
  // Derived totals
  total() {
    return get().items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 0), 0)
  },
  count() {
    return get().items.reduce((sum, i) => sum + (i.qty || 0), 0)
  },
}))
