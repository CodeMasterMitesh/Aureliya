import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
const r = Router()

// Get current user's cart
r.get('/', auth, async (req, res) => {
	const cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'title slug images price').lean()
	if (!cart) return res.json({ items: [] })
	const items = (cart.items || []).map(it => ({
		product: { slug: it.product?.slug, title: it.product?.title, image: it.product?.images?.[0], price: it.product?.price },
		qty: it.qty,
		price: it.price,
	}))
	res.json({ items })
})

// Add item
r.post('/', auth, async (req, res) => {
	const { slug, qty = 1 } = req.body
	const p = await Product.findOne({ slug })
	if (!p) return res.status(404).json({ error: 'Product not found' })
	let cart = await Cart.findOne({ user: req.user.id })
	if (!cart) cart = await Cart.create({ user: req.user.id, items: [] })
	const price = p.price
	const idx = cart.items.findIndex(i => String(i.product) === String(p._id))
	if (idx >= 0) cart.items[idx].qty += qty
	else cart.items.push({ product: p._id, qty, price })
	await cart.save()
	res.json({ ok: true })
})

// Update quantity
r.put('/', auth, async (req, res) => {
	const { slug, qty } = req.body
	const p = await Product.findOne({ slug })
	if (!p) return res.status(404).json({ error: 'Product not found' })
	const cart = await Cart.findOne({ user: req.user.id })
	const idx = cart.items.findIndex(i => String(i.product) === String(p._id))
	if (idx < 0) return res.status(404).json({ error: 'Item not in cart' })
	if (qty <= 0) cart.items.splice(idx, 1)
	else cart.items[idx].qty = qty
	await cart.save()
	res.json({ ok: true })
})

// Clear cart
r.delete('/', auth, async (req, res) => {
	const cart = await Cart.findOne({ user: req.user.id })
	if (cart) { cart.items = []; await cart.save() }
	res.json({ ok: true })
})

export default r
