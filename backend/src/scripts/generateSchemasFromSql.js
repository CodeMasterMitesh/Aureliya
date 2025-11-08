/*
  Generate Mongoose schemas from a MySQL/MariaDB SQL dump of CREATE TABLE statements.

  Usage (PowerShell):
    node src/scripts/generateSchemasFromSql.js ..\project.sql

  Output:
    - Writes one model file per table into src/models_generated/<TableName>.js
    - Creates src/models_generated/index.js exporting all models

  Notes:
    - Types are heuristically mapped (int/decimal -> Number, varchar/text -> String, date/datetime -> Date, tinyint(1) -> Boolean).
    - Column names are normalized to camelCase; unsafe characters removed. Originals are commented.
    - Keys and constraints are ignored except primary key on `id` which becomes an indexed Number field.
    - You can refine generated models manually afterwards.
*/

import fs from 'fs'
import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

let sqlInput = process.argv[2] || path.resolve(__dirname, '../../..', 'project.sql')
const outDir = path.resolve(__dirname, '../models_generated')

function ensureDir(p){ if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }) }

function toPascalCase(name){
  return name
    .replace(/[`'"\[\]]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('')
}

function toCamelCase(name){
  const p = toPascalCase(name)
  return p.charAt(0).toLowerCase() + p.slice(1)
}

function mapSqlTypeToJs(sqlType, colName){
  const t = sqlType.toLowerCase()
  if (t.startsWith('tinyint') && /\(1\)/.test(t)) return 'Boolean'
  if (t.startsWith('int') || t.startsWith('smallint') || t.startsWith('bigint')) return 'Number'
  if (t.startsWith('decimal') || t.startsWith('float') || t.startsWith('double') || t.startsWith('numeric')) return 'Number'
  if (t.startsWith('date') || t.startsWith('datetime') || t.startsWith('timestamp')) return 'Date'
  if (t.startsWith('enum')) return 'String'
  if (t.startsWith('json')) return 'Schema.Types.Mixed'
  if (t.includes('text') || t.includes('char') || t.includes('varchar')) return 'String'
  if (t.includes('blob')) return 'Buffer'
  // Heuristic: columns ending with _id might be ObjectId references
  if (/(_id|id)$/i.test(colName)) return 'Schema.Types.Mixed'
  return 'String'
}

function normalizeColumnName(raw){
  // remove backticks and quotes
  let s = raw.replace(/^[`'"]|[`'"]$/g, '')
  // replace special sequences
  s = s.replace(/\//g, ' ').replace(/\s+/g, ' ')
  s = s.replace(/[^a-zA-Z0-9]+/g, ' ')
  s = s.trim()
  if (!s) s = 'field'
  s = toCamelCase(s)
  if (/^\d/.test(s)) s = 'f' + s // cannot start with digit
  // reserved words
  if (['type', 'delete', 'default'].includes(s)) s = s + 'Field'
  return s
}

function parseCreateTables(sql){
  const tables = []
  const regex = /CREATE\s+TABLE\s+(IF\s+NOT\s+EXISTS\s+)?`([^`]+)`\s*\(([\s\S]*?)\)\s*ENGINE/gi
  let m
  while ((m = regex.exec(sql))){
    const name = m[2]
    const body = m[3]
    tables.push({ name, body })
  }
  return tables
}

function parseColumns(body){
  const lines = body.split(/\r?\n/)
  const cols = []
  let buffer = ''
  function flush(){
    const s = buffer.trim().replace(/,$/, '')
    if (!s) return
    // skip keys
    if (/^(primary|unique|key|constraint|index)\b/i.test(s)) { buffer = ''; return }
    const m = s.match(/^`([^`]+)`\s+([^,]+)(?:,|$)/)
    if (m){
      const rawName = m[1]
      const typeAndRest = m[2]
      cols.push({ rawName, typeAndRest })
    }
    buffer = ''
  }
  for (const ln of lines){
    // handle enums with commas by tracking parentheses depth
    buffer += (buffer ? ' ' : '') + ln.trim()
    // naive check: line ends with , or we see , before constraints
    if (/,$/.test(ln.trim())) flush()
  }
  flush()
  return cols
}

function buildSchemaCode(table){
  const cols = parseColumns(table.body)
  const fields = []
  let hasIdPk = false
  for (const c of cols){
    const normName = normalizeColumnName(c.rawName)
    const sqlType = c.typeAndRest.split(/\s+/)[0]
    const jsType = mapSqlTypeToJs(sqlType, c.rawName)
    if (c.rawName.toLowerCase() === 'id') hasIdPk = true
    fields.push({ normName, rawName: c.rawName, jsType, sqlType })
  }

  const modelName = toPascalCase(table.name)
  const lines = []
  lines.push("import mongoose from 'mongoose'")
  lines.push('const { Schema } = mongoose')
  lines.push('')
  lines.push(`const ${modelName}Schema = new Schema({`)
  for (const f of fields){
    const comment = `// ${f.rawName} ${f.sqlType}`
    const typeStr = f.jsType.includes('.') ? f.jsType : `{ type: ${f.jsType} }`
    lines.push(`  ${f.normName}: ${typeStr}, ${comment}`)
  }
  // add legacyId if id existed
  if (hasIdPk && !fields.find(f => f.normName === 'id')){
    lines.push("  legacyId: { type: Number, index: true, unique: true }, // original primary key 'id'")
  }
  lines.push('}, { timestamps: false })')
  lines.push('')
  lines.push(`export default mongoose.model('${modelName}', ${modelName}Schema, '${table.name}')`)
  lines.push('')
  return lines.join('\n')
}

function main(){
  if (!fs.existsSync(sqlInput)){
    // Fallback: find the largest .sql file in repo root
    const root = path.resolve(__dirname, '../../..')
    const candidates = fs.readdirSync(root).filter(f => f.toLowerCase().endsWith('.sql')).map(f => path.join(root, f))
    if (candidates.length){
      candidates.sort((a,b) => fs.statSync(b).size - fs.statSync(a).size)
      sqlInput = candidates[0]
      console.log('Auto-detected SQL file:', path.basename(sqlInput))
    } else {
      console.error('SQL file not found:', sqlInput)
      console.error('Provide a path: node src/scripts/generateSchemasFromSql.js <path-to-sql>')
      process.exit(1)
    }
  }
  const sql = fs.readFileSync(sqlInput, 'utf8')
  const tables = parseCreateTables(sql)
  if (!tables.length){
    console.error('No CREATE TABLE statements found in', sqlInput)
    process.exit(1)
  }
  ensureDir(outDir)
  const exportsIdx = []
  for (const t of tables){
    const code = buildSchemaCode(t)
    const fileName = toPascalCase(t.name) + '.js'
    fs.writeFileSync(path.join(outDir, fileName), code, 'utf8')
    exportsIdx.push(`export { default as ${toPascalCase(t.name)} } from './${toPascalCase(t.name)}.js'`)
  }
  fs.writeFileSync(path.join(outDir, 'index.js'), exportsIdx.join('\n') + '\n', 'utf8')
  console.log(`Generated ${tables.length} schemas in ${path.relative(process.cwd(), outDir)}`)
}

main()
