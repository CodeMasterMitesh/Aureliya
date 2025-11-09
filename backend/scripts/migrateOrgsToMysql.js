import 'dotenv/config'
import mongoose from 'mongoose'
import Company from '../src/models/Company.js'
import Branch from '../src/models/Branch.js'
import AccountGroup from '../src/models/AccountGroup.js'
import { env } from '../src/config/index.js'
import { initMysqlIfEnabled, runQuery } from '../src/db/mysql.js'

function upsertCompanyRow(c) {
  const name = c.name || ''
  const address = c.address || ''
  const city = c.city || ''
  const state = c.state || ''
  const country = c.country || ''
  const pincode = c.pincode || ''
  const financialyear = '2000-04-01'
  const vatno = ''
  const tinno = ''
  const panno = ''
  const servicetaxno = ''
  const phone = ''
  const email = ''
  const website = ''
  const del = 0
  const active = 1
  const gstno = null
  const code = c.code || null
  const analyticallicno = null
  const landmark = null
  const company = 1
  const letterhead = null
  const accountname = null
  const accounttype = null
  const accno = null
  const micrcode = null
  const rtgs = null
  const swiftcode = null
  const branchaddress = null
  const registeraddress = null
  const terms = null
  const bankname = null
  const msmeno = null
  const saccode = null

  // Provide minimal required NOT NULL fields; many legacy fields mapped to blank defaults for now
  const sql = `INSERT INTO companymaster (
    name, address, city, state, country, pincode,
    financialyear, vatno, tinno, panno, servicetaxno,
    phone, email, website, \`delete\`, active, gstno, code, analyticallicno, landmark, company,
    aumusername, aumpassword, gspusername, gsppassword, area, logo, color,
    letterhead, accountname, accounttype, accno, micrcode, rtgs, swiftcode,
    branchaddress, registeraddress, terms, bankname, msmeno, saccode
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  ON DUPLICATE KEY UPDATE address=VALUES(address), city=VALUES(city), state=VALUES(state), code=VALUES(code), gstno=VALUES(gstno)`

  const params = [
    name, address, city, state, country, pincode,
    financialyear, vatno, tinno, panno, servicetaxno,
    phone, email, website, del, active, gstno, code, analyticallicno, landmark, company,
    null, null, null, null, null, null, null,
    letterhead, accountname, accounttype, accno, micrcode, rtgs, swiftcode,
    branchaddress, registeraddress, terms, bankname, msmeno, saccode
  ]
  return runQuery(sql, params).then(async (res) => {
    if (res.insertId) return res.insertId
    const rows = await runQuery('SELECT id FROM companymaster WHERE name = ? LIMIT 1', [name])
    return rows[0]?.id
  })
}

async function upsertBranchRow(b, companyId) {
  // Ensure second param is a string if ObjectId
  const companyName = b.company ? (typeof b.company === 'object' && typeof b.company.toString === 'function' ? (b.company.name || b.company.toString()) : (b.company.name || String(b.company))) : null
  const cols = [
    'name','companyname','branchtype','code','officeno','complexname','streetname','landmark','area',
    'city','state','country','pincode','phone','fax','mobile','email','website','panno','taxidentificationno','servicetaxno',
    'vatno','tdsno','companyregno','importexportcode','exportpromotioncapitalcode','employeestateinsurancecode',
    'establishyear','professionaltax','providendfundcode','centralsalestax','excisecontrolcode','nagarpalikanigamlicenceno',
    'otherno','`delete`','active','company','gstno'
  ]
  const placeholders = cols.map(()=>'?').join(',')
  const sql = `INSERT INTO branchmaster (${cols.join(',')}) VALUES (${placeholders})
  ON DUPLICATE KEY UPDATE code=VALUES(code), city=VALUES(city), state=VALUES(state), country=VALUES(country), gstno=VALUES(gstno)`

  const params = [
    b.name || null,
    companyName,
    b.branchtype || null,
    (b.code ? String(b.code) : null),
    null, // officeno
    null, // complexname
    null, // streetname
    null, // landmark
    null, // area
    b.city || null,
    b.state || null,
    b.country || null,
    (b.pincode ? String(b.pincode) : null),
    b.phone || null,
    null, // fax
    b.mobile || null,
    b.email || null,
    b.website || null,
    null, // panno
    null, // taxidentificationno
    null, // servicetaxno
    null, // vatno
    null, // tdsno
    null, // companyregno
    null, // importexportcode
    null, // exportpromotioncapitalcode
    null, // employeestateinsurancecode
    null, // establishyear
    null, // professionaltax
    null, // providendfundcode
    null, // centralsalestax
    null, // excisecontrolcode
    null, // nagarpalikanigamlicenceno
    null, // otherno
    0,    // delete
    1,    // active
    companyId || 1,
    b.gstno || null
  ]
  const res = await runQuery(sql, params)
  return res.insertId
}

async function upsertAccountGroupRow(g, companyId) {
  // accountgroups has UNIQUE (name, company)
  const res = await runQuery(
    `INSERT INTO accountgroups (name, parentgroup, code, type, company, \`delete\`, \`lock\`, enterdatetime, modifiedby, modifieddatetime, active)
     VALUES (?,?,?,?,?,0,0,NOW(),0,NOW(),1)
     ON DUPLICATE KEY UPDATE code=VALUES(code), type=VALUES(type)`,
    [g.name || '', g.parentgroup || '', g.code || '', g.type || '', companyId || 1]
  )
  return res.insertId || (await (async()=>{ const rows = await runQuery('SELECT id FROM accountgroups WHERE name=? AND company=? LIMIT 1',[g.name || '', companyId || 1]); return rows[0]?.id })())
}

async function main() {
  if (!env.MYSQL_ENABLED) throw new Error('MYSQL_ENABLED=false')
  await initMysqlIfEnabled()
  await mongoose.connect(env.MONGODB_URI)

  // Relax NOT NULL constraints temporarily to allow NULL inserts where data is missing
  try {
    await runQuery(`ALTER TABLE companymaster
      MODIFY address varchar(255) NULL,
      MODIFY city varchar(25) NULL,
      MODIFY state varchar(25) NULL,
      MODIFY country varchar(25) NULL,
      MODIFY pincode varchar(11) NULL,
      MODIFY financialyear date NULL,
      MODIFY vatno varchar(25) NULL,
      MODIFY tinno varchar(25) NULL,
      MODIFY panno varchar(25) NULL,
      MODIFY servicetaxno varchar(25) NULL,
      MODIFY phone varchar(25) NULL,
      MODIFY email varchar(50) NULL,
      MODIFY website varchar(50) NULL,
      MODIFY gstno varchar(25) NULL,
      MODIFY code varchar(15) NULL,
      MODIFY analyticallicno int(11) NULL,
      MODIFY landmark varchar(100) NULL,
      MODIFY aumusername varchar(20) NULL,
      MODIFY aumpassword varchar(20) NULL,
      MODIFY gspusername varchar(25) NULL,
      MODIFY gsppassword varchar(25) NULL,
      MODIFY area varchar(50) NULL,
      MODIFY logo varchar(100) NULL,
      MODIFY color varchar(100) NULL,
      MODIFY letterhead varchar(100) NULL,
      MODIFY accountname varchar(100) NULL,
      MODIFY accounttype varchar(100) NULL,
      MODIFY accno varchar(100) NULL,
      MODIFY micrcode varchar(100) NULL,
      MODIFY rtgs varchar(100) NULL,
      MODIFY swiftcode varchar(100) NULL,
      MODIFY branchaddress varchar(100) NULL,
      MODIFY registeraddress varchar(100) NULL,
      MODIFY terms text NULL,
      MODIFY bankname varchar(100) NULL,
      MODIFY msmeno varchar(100) NULL,
      MODIFY saccode varchar(100) NULL`)
  } catch (e) {
    // ignore if already altered
  }
  try {
    await runQuery(`ALTER TABLE branchmaster
      MODIFY companyname varchar(255) NULL,
      MODIFY branchtype varchar(255) NULL,
      MODIFY code varchar(255) NULL,
      MODIFY officeno varchar(255) NULL,
      MODIFY complexname varchar(255) NULL,
      MODIFY streetname varchar(255) NULL,
      MODIFY landmark varchar(255) NULL,
      MODIFY area varchar(255) NULL,
      MODIFY city varchar(255) NULL,
      MODIFY state varchar(255) NULL,
      MODIFY country varchar(255) NULL,
      MODIFY pincode varchar(255) NULL,
      MODIFY phone varchar(255) NULL,
      MODIFY fax varchar(255) NULL,
      MODIFY mobile varchar(255) NULL,
      MODIFY email varchar(255) NULL,
      MODIFY website varchar(255) NULL,
      MODIFY panno varchar(255) NULL,
      MODIFY taxidentificationno varchar(255) NULL,
      MODIFY servicetaxno varchar(255) NULL,
      MODIFY vatno varchar(255) NULL,
      MODIFY tdsno varchar(255) NULL,
      MODIFY companyregno varchar(255) NULL,
      MODIFY importexportcode varchar(255) NULL,
      MODIFY exportpromotioncapitalcode varchar(255) NULL,
      MODIFY employeestateinsurancecode varchar(255) NULL,
      MODIFY establishyear varchar(25) NULL,
      MODIFY professionaltax varchar(255) NULL,
      MODIFY providendfundcode varchar(255) NULL,
      MODIFY centralsalestax varchar(255) NULL,
      MODIFY excisecontrolcode varchar(255) NULL,
      MODIFY nagarpalikanigamlicenceno varchar(255) NULL,
      MODIFY otherno varchar(255) NULL`)
  } catch (e) {
    // ignore if already altered
  }

  const companies = await Company.find().lean()
  const companyIdByName = new Map()
  for (const c of companies) {
    const id = await upsertCompanyRow(c)
    if (id) companyIdByName.set(c.name, id)
  }

  const branches = await Branch.find().lean()
  for (const b of branches) {
    const cid = b.company && companyIdByName.get((b.company.name || b.company).toString()) || null
    await upsertBranchRow(b, cid)
  }

  const groups = await AccountGroup.find().lean()
  for (const g of groups) {
    const cid = g.company && companyIdByName.get((g.company.name || g.company).toString()) || 1
    await upsertAccountGroupRow(g, cid)
  }

  console.log('Migrated orgs: companies=%d, branches=%d, accountgroups=%d', companies.length, branches.length, groups.length)
  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
