import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import MainMenu from '../models/MainMenu.js'
import SubMenu from '../models/SubMenu.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aureliya_ecom'

function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9\s-/]/g, '')
    .replace(/[\s/]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const repoRoot = path.resolve(__dirname, '../../..')

  // Resolve CSV via priority: env CSV_PATH -> /app/industry_standard_menu.csv (container mount) -> repo root
  const tryPaths = [
    process.env.CSV_PATH,
    '/app/industry_standard_menu.csv',
    path.resolve(repoRoot, 'industry_standard_menu.csv'),
  ].filter(Boolean)

  let csvPath = null
  for (const p of tryPaths) {
    try {
      if (fs.existsSync(p)) {
        csvPath = p
        break
      }
    } catch {}
  }

  if (!csvPath) {
    console.error('CSV not found. Tried paths:', tryPaths.join(', '))
    console.error('Hint: mount the CSV into the backend container or set CSV_PATH env.')
    process.exit(1)
  }
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to Mongo')
  // Clean existing
  await Promise.all([MainMenu.deleteMany({}), SubMenu.deleteMany({})])

  const text = fs.readFileSync(csvPath, 'utf8')
  const lines = text.split(/\r?\n/).filter(Boolean)
  // header: main_menu,sub_menu,module_name,full_path
  const header = lines.shift()
  const idx = { main: 0, sub: 1, module: 2, path: 3 }
  const mainIndex = new Map() // name -> {_id, order}
  const subIndex = new Map() // key main|name -> {_id, order}
  let mainOrder = 1

  for (const line of lines) {
    const cols = line.split(',').map((c) => c.trim())
    const mainName = cols[idx.main]
    const subName = cols[idx.sub]
    const moduleName = cols[idx.module]
    const fullPath = cols[idx.path]
    if (!mainName || !moduleName) continue

    // ensure main
    let mainDoc = mainIndex.get(mainName)
    if (!mainDoc) {
      const m = await MainMenu.create({
        name: mainName,
        slug: slugify(mainName),
        order: mainOrder++,
      })
      mainDoc = { _id: m._id }
      mainIndex.set(mainName, mainDoc)
    }

    let parentId = null
    if (subName) {
      const key = `${mainName}|${subName}`
      let subDoc = subIndex.get(key)
      if (!subDoc) {
        const s = await SubMenu.create({
          main_menu_id: mainDoc._id,
          parent_id: null,
          name: subName,
          slug: slugify(subName),
          order: 0,
        })
        subDoc = { _id: s._id }
        subIndex.set(key, subDoc)
      }
      parentId = subDoc._id
    }

    // leaf module
    await SubMenu.create({
      main_menu_id: mainDoc._id,
      parent_id: parentId,
      name: moduleName,
      slug: slugify(moduleName),
      path: fullPath,
      order: 0,
      meta: { type: 'module' },
    })
  }

  console.log('Seeded menus from CSV successfully')
  await mongoose.disconnect()
}

main().catch(async (e) => {
  console.error(e)
  try {
    await mongoose.disconnect()
  } catch {}
  process.exit(1)
})
