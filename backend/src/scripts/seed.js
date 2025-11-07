import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import Blog from '../models/Blog.js'
import User from '../models/User.js'
import Company from '../models/Company.js'
import Branch from '../models/Branch.js'
import Cart from '../models/Cart.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aureliya_ecom'

async function run() {
  await mongoose.connect(MONGODB_URI)
  const existing = await Product.countDocuments()
  if (existing > 0) {
    console.log('Seed skipped: products already exist.')
    // Ensure default company/branch exist
    let company = await Company.findOne({ name: 'Aureliya Inc' })
    if (!company) company = await Company.create({ name: 'Aureliya Inc', code: 'AUR' })
    let branch = await Branch.findOne({ company: company._id, name: 'HQ' })
    if (!branch) branch = await Branch.create({ company: company._id, name: 'HQ', code: 'HQ' })
    // Ensure admin user/cart still exist
    const adminEmail = 'admin@aureliya.test'
    let admin = await User.findOne({ email: adminEmail })
    if (!admin) {
      admin = await User.create({
        name: 'Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
        username: 'admin',
        company: company._id,
        branch: branch._id,
      })
      console.log('Created admin user:', adminEmail, 'password: admin123')
    }
    if (!admin.company || !admin.branch) {
      admin.company = company._id
      admin.branch = branch._id
      await admin.save()
    }
    const adminCart = await Cart.findOne({ user: admin._id })
    if (!adminCart) await Cart.create({ user: admin._id, items: [] })
    await mongoose.disconnect()
    return
  }

  console.log('Seeding database...')

  const catNames = ['men', 'women', 'kids', 'accessories', 'electronics']
  const cats = await Category.insertMany(
    catNames.map((c) => ({ name: c[0].toUpperCase() + c.slice(1), slug: c }))
  )

  const prods = []
  for (let i = 1; i <= 24; i++) {
    const cat = cats[(i - 1) % cats.length]
    const slug = `sample-${i}`
    prods.push({
      title: `Sample Product ${i}`,
      slug,
      price: 999 + i * 75,
      category: cat._id,
      images: [`https://picsum.photos/seed/${slug}/600/600`],
      rating: { avg: 4 + ((i % 5) - 2) * 0.2, count: 20 + i },
      stock: 20 + (i % 10),
    })
  }
  await Product.insertMany(prods)

  await Blog.insertMany([
    {
      slug: 'welcome-to-our-store',
      title: 'Welcome to our store',
      excerpt: 'Discover what makes our experience different.',
      image: 'https://picsum.photos/seed/blog-1/800/450',
      content: '<p>We built Aureliya to be fast, accessible, and delightful to use.</p>',
    },
    {
      slug: 'gift-guide-2025',
      title: 'Gift Guide 2025',
      excerpt: 'Top picks for everyone on your list.',
      image: 'https://picsum.photos/seed/blog-2/800/450',
      content: '<p>Explore curated selections for every budget and style.</p>',
    },
    {
      slug: 'how-we-build',
      title: 'How we build',
      excerpt: 'A peek into our frontend performance work.',
      image: 'https://picsum.photos/seed/blog-3/800/450',
      content: '<p>We prioritize performance, accessibility, and maintainability.</p>',
    },
  ])

  // Create admin user if not exists
  const adminEmail = 'admin@aureliya.test'
  let admin = await User.findOne({ email: adminEmail })
  if (!admin) {
    // Ensure a default company/branch exist
    let company = await Company.findOne({ name: 'Aureliya Inc' })
    if (!company) company = await Company.create({ name: 'Aureliya Inc', code: 'AUR' })
    let branch = await Branch.findOne({ company: company._id, name: 'HQ' })
    if (!branch) branch = await Branch.create({ company: company._id, name: 'HQ', code: 'HQ' })
    admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: 'admin123',
      role: 'admin',
      company: company._id,
      branch: branch._id,
      username: 'admin',
    })
    console.log('Created admin user:', adminEmail, 'password: admin123')
  }
  // Ensure admin has a cart document
  const adminCart = await Cart.findOne({ user: admin._id })
  if (!adminCart) await Cart.create({ user: admin._id, items: [] })

  console.log('Seed complete.')
  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
