/*
  Create MongoDB collections for all defined models without importing data.
  - Loads canonical/core models and generated schemas under src/models_generated
  - Calls Model.createCollection() to materialize the collection

  Usage:
    node src/scripts/createCollections.js
    DRY_RUN=true node src/scripts/createCollections.js
*/
import fs from 'fs'
import path from 'path'
import url from 'url'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const modelsDir = path.resolve(__dirname, '../models')
const genDir = path.resolve(__dirname, '../models_generated')

// Import core models explicitly
async function importCoreModels(){
  const core = [
    'User.js','Company.js','Branch.js','AccountGroup.js','Product.js','Order.js','Payment.js',
    'Blog.js','Cart.js','Category.js','MainMenu.js','SubMenu.js',
    'Employeesalary.js','Attendance.js','Leaveregister.js','Assignshift.js','Shiftmaster.js'
  ]
  for (const f of core){
    const p = path.join(modelsDir, f)
    if (fs.existsSync(p)) await import(url.pathToFileURL(p))
  }
  // Canonical subfolder
  const canonicalDir = path.join(modelsDir, 'canonical')
  if (fs.existsSync(canonicalDir)){
    const files = fs.readdirSync(canonicalDir).filter(x => x.endsWith('.js'))
    for (const f of files) await import(url.pathToFileURL(path.join(canonicalDir, f)))
  }
}

async function importGeneratedModels(){
  if (!fs.existsSync(genDir)) return []
  const files = fs.readdirSync(genDir).filter(f => f.endsWith('.js') && f !== 'index.js')
  for (const f of files){
    const modelName = path.basename(f, '.js')
    if (mongoose.models[modelName]){
      console.log(`Skipping generated model ${modelName} (already defined)`)
      continue
    }
    const p = path.join(genDir, f)
    await import(url.pathToFileURL(p))
  }
  return files
}

async function main(){
  const { MONGODB_URI, DRY_RUN, BUILD_INDEXES } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set')
  await mongoose.connect(MONGODB_URI)
  console.log('Mongo connected')

  await importCoreModels()
  const gen = await importGeneratedModels()

  // All models now registered in mongoose.models
  const names = Object.keys(mongoose.models)
  console.log(`Found ${names.length} models`)

  for (const name of names){
    const Model = mongoose.models[name]
    const coll = Model.collection?.name || Model.modelName.toLowerCase()
    if (DRY_RUN === 'true'){
      console.log(`[DRY] would create: ${coll}`)
      continue
    }
    try {
      await Model.createCollection()
      if (BUILD_INDEXES === 'true'){
        await Model.syncIndexes()
        console.log(`Created/exists: ${coll} (indexes synced)`)        
      } else {
        console.log(`Created/exists: ${coll}`)
      }
    } catch (e){
      console.error(`Failed: ${coll}:`, e.message)
    }
  }

  await mongoose.disconnect()
  console.log('Done')
}

main().catch(err => { console.error(err); process.exit(1) })
