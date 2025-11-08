/*
  Audit the generated schemas to curate ERP+LIMS domain tables.
  Outputs a JSON and Markdown report listing:
    - Table -> model name
    - Field count
    - Suspicious field names (renamed, slashes, reserved)
    - Likely foreign keys (company/branch/group/user/product id hints)
    - Duplicate/variant table clusters (e.g., Products vs Itemmaster)

  Run:
    node src/scripts/auditGeneratedSchemas.js
*/

import fs from 'fs'
import path from 'path'

const genDir = path.resolve(process.cwd(), 'src/models_generated')
const outDir = path.resolve(process.cwd(), 'reports')

function ensureDir(p){ if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }) }

function loadModels(){
  const files = fs.readdirSync(genDir).filter(f => f.endsWith('.js') && f !== 'index.js')
  const models = []
  for (const f of files){
    const fp = path.join(genDir, f)
    const src = fs.readFileSync(fp, 'utf8')
    // Extract schema fields inside new Schema({ ... })
    const m = src.match(/new Schema\((\{[\s\S]*?\})\s*,\s*\{/)
    if (!m) continue
    const body = m[1]
    const fieldLines = body.split(/\r?\n/)
    const fields = []
    for (const line of fieldLines){
      const t = line.trim()
      const lm = t.match(/^([a-zA-Z0-9_]+):\s+(.+?),\s+\/\/\s+(.+)$/)
      if (lm){
        fields.push({ name: lm[1], type: lm[2], comment: lm[3] })
      }
    }
    models.push({ file: f, name: f.replace(/\.js$/, ''), fields, src })
  }
  return models
}

function suspicious(field){
  const issues = []
  if (/Field$/.test(field.name)) issues.push('reserved_renamed')
  if (field.comment.includes('/')) issues.push('slash_in_sql_name')
  if (/\s/.test(field.name)) issues.push('whitespace')
  if (/^[0-9]/.test(field.name)) issues.push('starts_with_digit')
  return issues
}

function likelyFk(field){
  const n = field.name.toLowerCase()
  if (n === 'id') return null
  if (n.endsWith('id') || n.endsWith('_id')) return n
  const hints = ['company', 'branch', 'group', 'account', 'user', 'product', 'sample', 'instrument']
  if (hints.some(h => n.includes(h) && /code|id|ref/.test(n))) return n
  return null
}

function clusterDuplicates(files){
  // naive clustering by base name
  const clusters = {}
  for (const f of files){
    const base = f.name.toLowerCase()
    // collapse numeric suffixes and copy indicators
    const key = base.replace(/(copy|[0-9]+|[0-9]{6})/g, '')
    clusters[key] = clusters[key] || []
    clusters[key].push(f.name)
  }
  // filter clusters with >1 member and known patterns
  const dupes = Object.entries(clusters)
    .filter(([, arr]) => arr.length > 1)
    .map(([key, arr]) => ({ key, variants: arr }))
  return dupes
}

function main(){
  ensureDir(outDir)
  const models = loadModels()
  const report = { totalModels: models.length, models: [], duplicates: [], summary: {} }
  for (const m of models){
    const susp = []
    const fks = []
    for (const f of m.fields){
      const s = suspicious(f)
      if (s.length) susp.push({ field: f.name, issues: s, sql: f.comment })
      const fk = likelyFk(f)
      if (fk) fks.push(fk)
    }
    report.models.push({ name: m.name, file: m.file, fieldCount: m.fields.length, suspicious: susp, likelyFks: Array.from(new Set(fks)) })
  }
  // duplicates for a few canonical bases
  const dupes = clusterDuplicates(models)
  report.duplicates = dupes
  // quick domain-oriented counts
  const limsMarkers = ['sample', 'test', 'instrument', 'method', 'stability', 'qc']
  const erpMarkers = ['product', 'item', 'purchase', 'sales', 'voucher', 'ledger', 'account', 'stock', 'inventory', 'company', 'branch']
  report.summary.lims = models.filter(m => limsMarkers.some(k => m.name.toLowerCase().includes(k))).length
  report.summary.erp = models.filter(m => erpMarkers.some(k => m.name.toLowerCase().includes(k))).length

  const jsonPath = path.join(outDir, 'schema_audit.json')
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8')

  // Markdown overview
  const lines = []
  lines.push(`# Schema Audit Report`)
  lines.push(`Total Models: ${report.totalModels}`)
  lines.push(`ERP-like Models: ${report.summary.erp}`)
  lines.push(`LIMS-like Models: ${report.summary.lims}`)
  lines.push(``)
  lines.push(`## Duplicate/variant clusters (top)`)
  for (const d of report.duplicates.slice(0, 20)){
    lines.push(`- ${d.key}: ${d.variants.join(', ')}`)
  }
  lines.push(``)
  lines.push(`## Suspicious fields (first 50 models with issues)`)
  let shown = 0
  for (const m of report.models){
    if (m.suspicious.length){
      lines.push(`### ${m.name}`)
      for (const s of m.suspicious.slice(0, 10)){
        lines.push(`- ${s.field} (${s.issues.join('+')}) // ${s.sql}`)
      }
      lines.push('')
      shown++
      if (shown >= 50) break
    }
  }
  fs.writeFileSync(path.join(outDir, 'schema_audit.md'), lines.join('\n'), 'utf8')
  console.log(`Wrote audit to ${path.relative(process.cwd(), outDir)} (schema_audit.json, schema_audit.md)`) 
}

main()
