import { useEffect, useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'next/router'
import { useAuth } from '@/src/store/auth'
import { listLedgers, createLedger, updateLedger, deleteLedger, bulkDeleteLedgers } from '@/src/api/ledgers'
import { listAccountGroups } from '@/src/api/accountGroups'
import { fetchCompanies, listBranches } from '@/src/api/companies'

function toCSV(rows){
  if (!rows?.length) return ''
  const cols = ['title','account_group_name','ledger_type','category','email','mobile_no','gstin','pan_no','is_active']
  const header = ['Title','Account Group','Ledger Type','Category','Email','Mobile','GSTIN','PAN','Active'].join(',')
  const body = rows.map(r=> [r.title,r.account_group_name,r.ledger_type,r.category,r.email,r.mobile_no,r.gstin,r.pan_no,(r.is_active? 'Yes':'No')]
    .map(v=>`"${(v??'').toString().replaceAll('"','""')}"`).join(',')).join('\n')
  return header + '\n' + body
}

const FIELD_DEFS = [
  { key:'ledger_type', label:'Ledger Type' },
  { key:'category', label:'Category' },
  { key:'alias_name', label:'Alias Name' },
  { key:'registration_type', label:'Registration Type' },
  { key:'gstin', label:'GSTIN' },
  { key:'pan_no', label:'PAN' },
  { key:'birth_date', label:'Birth Date', type:'date' },
  { key:'swift_code', label:'SWIFT Code' },
  { key:'ifsc_code', label:'IFSC Code' },
  { key:'bank_name', label:'Bank Name' },
  { key:'branch_name', label:'Bank Branch Name' },
  { key:'account_no', label:'Account No' },
  { key:'tan_no', label:'TAN No' },
  { key:'country', label:'Country' },
  { key:'tds_percentage', label:'TDS %', type:'number' },
  { key:'address_line1', label:'Address Line 1' },
  { key:'address_line2', label:'Address Line 2' },
  { key:'address_line3', label:'Address Line 3' },
  { key:'address_line4', label:'Address Line 4' },
  { key:'address_line5', label:'Address Line 5' },
  { key:'area', label:'Area' },
  { key:'city', label:'City' },
  { key:'pincode', label:'Pincode' },
  { key:'state', label:'State' },
  { key:'contact_person_name', label:'Contact Person' },
  { key:'contact_person_number', label:'Contact Number' },
  { key:'credit_period_days', label:'Credit Period (days)', type:'number' },
]

export default function LedgersPage(){
  const router = useRouter()
  const token = useAuth(s=>s.token)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(20)
  const [search, setSearch] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [branchFilter, setBranchFilter] = useState('')
  const [groupFilter, setGroupFilter] = useState('')
  const [companies, setCompanies] = useState([])
  const [branches, setBranches] = useState([])
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title:'', email:'', mobile_no:'',
    company:'', branch:'', account_group_id:'', account_group_name:'',
    is_active:true,
  })
  const [more, setMore] = useState({})
  const [selected, setSelected] = useState(new Set())

  useEffect(()=>{ if (!token) router.replace('/admin/login') }, [token])
  useEffect(()=>{ fetchCompanies('').then(setCompanies) }, [])
  useEffect(()=>{ if (companyFilter) listBranches({ company: companyFilter, limit:500 }).then(({items})=> setBranches(items)); else setBranches([]) }, [companyFilter])
  useEffect(()=>{ // preload account groups for filters and forms
    (async()=>{ const { items } = await listAccountGroups({ limit: 500 }); setGroups(items) })()
  }, [])

  async function load(p=page){
    setLoading(true)
    try {
      const { items, pages, total, page:cur } = await listLedgers({ page: p, limit, search, company: companyFilter||undefined, branch: branchFilter||undefined, account_group_id: groupFilter||undefined })
      setItems(items); setPages(pages); setTotal(total); setPage(cur); setSelected(new Set())
    } catch (e){
      const code = e?.response?.status
      if (code === 401 || code === 403) router.replace('/admin/login')
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load(1) }, [search, companyFilter, branchFilter, groupFilter])
  useEffect(()=>{ load(page) }, [])

  function startEdit(row){
    setEditing(row)
    const base = {
      title: row.title||'', email: row.email||'', mobile_no: row.mobile_no||'',
      company: row.company||'', branch: row.branch||'', account_group_id: row.account_group_id||'', account_group_name: row.account_group_name||'',
      is_active: row.is_active!==false,
    }
    const extra = {}
    FIELD_DEFS.forEach(f=> extra[f.key] = row[f.key] ?? (f.type==='number'? 0 : ''))
    setForm(base); setMore(extra)
  }
  function resetForm(){ setEditing(null); setForm({ title:'', email:'', mobile_no:'', company:'', branch:'', account_group_id:'', account_group_name:'', is_active:true }); setMore({}) }

  async function submitForm(e){
    e.preventDefault()
    const payload = { ...form, ...more }
    const g = groups.find(g=>g._id===payload.account_group_id); if (g) payload.account_group_name = g.name
    try {
      if (editing) await updateLedger(editing._id, payload); else await createLedger(payload)
      resetForm(); load(1)
    } catch (err){
      const code = err?.response?.status
      if (code === 401 || code === 403) router.replace('/admin/login')
      // basic surface: could add toast/error UI later
    }
  }

  async function removeOne(id){ await deleteLedger(id); load(page) }
  async function removeSelected(){ if (selected.size){ await bulkDeleteLedgers(Array.from(selected)); setSelected(new Set()); load(page) } }
  function exportCSV(){ const csv = toCSV(items); const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' }); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='ledgers.csv'; a.click(); URL.revokeObjectURL(url) }

  const columns = useMemo(()=>[
    { key:'title', label:'Title' },
    { key:'account_group_name', label:'Group' },
    { key:'email', label:'Email' },
    { key:'mobile_no', label:'Mobile' },
    { key:'gstin', label:'GSTIN' },
    { key:'pan_no', label:'PAN' },
    { key:'is_active', label:'Active', render:(v)=> v? 'Yes':'No' },
  ], [])

  function toggleRow(row, checked){ const next=new Set(selected); if (checked) next.add(row._id); else next.delete(row._id); setSelected(next) }
  function toggleAll(checked){ if (checked) setSelected(new Set(items.map(i=>i._id))); else setSelected(new Set()) }

  if (!token) return null
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopBar />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h1 className="text-2xl font-semibold">Ledgers</h1>
            <div className="flex items-center gap-2">
              <button onClick={exportCSV} className="px-3 py-2 border rounded text-sm">Export CSV</button>
              <button onClick={removeSelected} disabled={selected.size===0} className="px-3 py-2 border rounded text-sm disabled:opacity-50">Delete Selected</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <div className="flex gap-2 flex-wrap">
                <div className="max-w-xs"><SearchBar onSearch={setSearch} placeholder="Search title/group..." /></div>
                <select value={companyFilter} onChange={e=>setCompanyFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
                  <option value="">All Companies</option>
                  {companies.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <select value={branchFilter} onChange={e=>setBranchFilter(e.target.value)} className="border rounded px-3 py-2 text-sm" disabled={!companyFilter}>
                  <option value="">All Branches</option>
                  {branches.map(b=> <option key={b._id} value={b._id}>{b.name}</option>)}
                </select>
                <select value={groupFilter} onChange={e=>setGroupFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
                  <option value="">All Groups</option>
                  {groups.map(g=> <option key={g._id} value={g._id}>{g.name}</option>)}
                </select>
              </div>
              <Table
                columns={columns}
                data={items}
                actions={(row)=> (
                  <div className="flex gap-2">
                    <button onClick={()=>startEdit(row)} className="px-2 py-1 border rounded text-xs">Edit</button>
                    <button onClick={()=>removeOne(row._id)} className="px-2 py-1 border rounded text-xs">Delete</button>
                  </div>
                )}
                selectable
                selectedIds={selected}
                onToggleRow={toggleRow}
                onToggleAll={toggleAll}
              />
              <Pagination page={page} pages={pages} onChange={p=>{ setPage(p); load(p) }} />
              {loading && <div className="text-sm text-gray-500 mt-2">Loading...</div>}
            </div>
            <div>
              <div className="border rounded p-4 bg-white space-y-3">
                <div className="font-medium">{editing? 'Edit Ledger' : 'Add Ledger'}</div>
                <form onSubmit={submitForm} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Company</label>
                    <select value={form.company} onChange={e=>setForm(f=>({...f, company:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm">
                      <option value="">None</option>
                      {companies.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Branch</label>
                    <select value={form.branch} onChange={e=>setForm(f=>({...f, branch:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" disabled={!form.company}>
                      <option value="">None</option>
                      {branches.map(b=> <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Account Group</label>
                    <select value={form.account_group_id} onChange={e=>setForm(f=>({...f, account_group_id:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm">
                      <option value="">None</option>
                      {groups.map(g=> <option key={g._id} value={g._id}>{g.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Title</label>
                    <input value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" required />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Email</label>
                      <input value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" type="email" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Mobile</label>
                      <input value={form.mobile_no} onChange={e=>setForm(f=>({...f, mobile_no:e.target.value}))} className="border rounded px-3 py-2 w-full text-sm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="ld_active" type="checkbox" checked={form.is_active} onChange={e=>setForm(f=>({...f, is_active:e.target.checked}))} />
                    <label htmlFor="ld_active" className="text-sm">Active</label>
                  </div>

                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-medium">More details</summary>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {FIELD_DEFS.map(f=> (
                        <div key={f.key} className="col-span-2 sm:col-span-1">
                          <label className="block text-xs text-gray-600 mb-1">{f.label}</label>
                          <input
                            type={f.type||'text'}
                            value={more[f.key] ?? ''}
                            onChange={e=>setMore(m=>({...m, [f.key]: f.type==='number' ? parseFloat(e.target.value||'0') : e.target.value }))}
                            className="border rounded px-3 py-2 w-full text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </details>

                  <div className="flex items-center gap-2">
                    <button type="submit" className="px-3 py-2 border rounded text-sm bg-blue-600 text-white">{editing? 'Update' : 'Create'}</button>
                    {editing && <button type="button" onClick={resetForm} className="px-3 py-2 border rounded text-sm">Cancel</button>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
