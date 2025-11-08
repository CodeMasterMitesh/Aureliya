/*
  Insert a minimal placeholder document into every EMPTY collection so GUI tools
  like MongoDB Compass display them clearly (Compass sometimes hides pure empty
  collections until refresh). Safe for dev only.

  Behavior:
    - Loads models (same routine as createCollections script)
    - For each collection with 0 documents, inserts a tiny placeholder
      { __placeholder: true, createdAt: new Date() }
    - Skips collections whose name matches /^system\./
    - Optional env filters:
        SKIP_GENERATED=true -> do not load models_generated
        GEN_STRATEGY=... (same handling as createCollections.js) if needed

  Usage:
    node src/scripts/seedPlaceholders.js
    DRY_RUN=true node src/scripts/seedPlaceholders.js
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

async function importCore(){
  const coreFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('.js'))
  for (const f of coreFiles){
    await import(url.pathToFileURL(path.join(modelsDir, f)))
  }
  const canonicalDir = path.join(modelsDir, 'canonical')
  if (fs.existsSync(canonicalDir)){
    const files = fs.readdirSync(canonicalDir).filter(f => f.endsWith('.js'))
    for (const f of files){
      await import(url.pathToFileURL(path.join(canonicalDir, f)))
    }
  }
}

async function importGenerated(){
  if (process.env.SKIP_GENERATED === 'true') return
  if (!fs.existsSync(genDir)) return
  const strategy = (process.env.GEN_STRATEGY || 'skip').toLowerCase()
  const files = fs.readdirSync(genDir).filter(f => f.endsWith('.js') && f !== 'index.js')
  for (const f of files){
    const name = path.basename(f, '.js')
    const p = path.join(genDir, f)
    if (strategy === 'skip'){
      if (mongoose.models[name]) { console.log(`Skip generated ${name} (exists)`); continue }
      await import(url.pathToFileURL(p))
      continue
    }
    if (strategy === 'overwrite'){
      if (mongoose.models[name]){ try { mongoose.deleteModel(name) } catch {} }
      await import(url.pathToFileURL(p))
      continue
    }
    const original = mongoose.model
    mongoose.model = function(mName, schema, collection, opts){
      if (mongoose.models[mName]){
        const ns = `Gen_${mName}`
        console.log(`Namespacing generated model ${mName} -> ${ns}`)
        return original.call(this, ns, schema, collection, opts)
      }
      return original.call(this, mName, schema, collection, opts)
    }
    try { await import(url.pathToFileURL(p)) } finally { mongoose.model = original }
  }
}

async function main(){
  const { MONGODB_URI, DRY_RUN } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set')
  await mongoose.connect(MONGODB_URI)
  console.log('Connected')
  await importCore()
  await importGenerated()
  const modelEntries = Object.entries(mongoose.models)
  console.log(`Models loaded: ${modelEntries.length}`)
  for (const [name, Model] of modelEntries){
    const coll = Model.collection.name
    if (coll.startsWith('system.')) continue
    const count = await Model.estimatedDocumentCount().catch(()=>0)
    if (count > 0){
      console.log(`Skip ${coll} (has ${count} docs)`) ; continue
    }
    if (DRY_RUN === 'true'){
      console.log(`[DRY] would insert placeholder into ${coll}`)
      continue
    }
    try {
      await Model.create({ __placeholder: true, createdAt: new Date(), updatedAt: new Date() })
      console.log(`Inserted placeholder into ${coll}`)
    } catch (e){
      console.error(`Failed placeholder for ${coll}: ${e.message}`)
    }
  }
  await mongoose.disconnect()
  console.log('Done')
}

main().catch(e => { console.error(e); process.exit(1) })
