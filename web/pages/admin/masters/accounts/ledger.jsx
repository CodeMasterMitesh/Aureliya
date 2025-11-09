import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import AdvancedDataTable from '@/components/AdvancedDataTable'
import FormModal from '@/components/FormModal'
import Breadcrumb from '@/components/Breadcrumb'
import { useAuth } from '@/src/store/auth'
import { listLedgers, createLedger, updateLedger, deleteLedger, bulkDeleteLedgers } from '@/src/api/ledgers'
import { importLedgers } from '@/src/api/import'
import { listAccountGroups } from '@/src/api/accountGroups'
import { fetchCompanies, listBranches } from '@/src/api/companies'

const FIELD_DEFS = [
  { key: 'ledger_type', label: 'Ledger Type' },
  { key: 'category', label: 'Category' },
  { key: 'alias_name', label: 'Alias Name' },
  { key: 'registration_type', label: 'Registration Type' },
  { key: 'gstin', label: 'GSTIN' },
  { key: 'pan_no', label: 'PAN' },
  { key: 'birth_date', label: 'Birth Date', type: 'date' },
  { key: 'swift_code', label: 'SWIFT Code' },
  { key: 'ifsc_code', label: 'IFSC Code' },
  { key: 'bank_name', label: 'Bank Name' },
  { key: 'branch_name', label: 'Bank Branch Name' },
  { key: 'account_no', label: 'Account No' },
  { key: 'tan_no', label: 'TAN No' },
  { key: 'country', label: 'Country' },
  { key: 'tds_percentage', label: 'TDS %', type: 'number', step: 0.01 },
  { key: 'address_line1', label: 'Address Line 1' },
  { key: 'address_line2', label: 'Address Line 2' },
  { key: 'address_line3', label: 'Address Line 3' },
  { key: 'address_line4', label: 'Address Line 4' },
  { key: 'address_line5', label: 'Address Line 5' },
  { key: 'area', label: 'Area' },
  { key: 'city', label: 'City' },
  { key: 'pincode', label: 'Pincode' },
  { key: 'state', label: 'State' },
  { key: 'contact_person_name', label: 'Contact Person' },
  { key: 'contact_person_number', label: 'Contact Number' },
  { key: 'credit_period_days', label: 'Credit Period (days)', type: 'number' },
  { key: 'is_rcm_applicable', label: 'RCM Applicable', type: 'checkbox' },
  { key: 'is_msme_registered', label: 'MSME Registered', type: 'checkbox' },
]

export default function LedgersPage() {
  const router = useRouter()
  const user = useAuth(s => s.user)
  const ready = useAuth(s => s.ready)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(20)
  const [search, setSearch] = useState('')
  const [groupFilter, setGroupFilter] = useState('')
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState(new Set())

  // Get company and branch from session user
  const userCompany = user?.company || ''
  const userBranch = user?.branch || ''

  // Guard behavior is handled per-request: if backend returns 401/403 we redirect below.
  useEffect(() => {
    (async () => {
      try {
        const { items } = await listAccountGroups({ 
          limit: 200, // Backend max limit is 200
          company: userCompany || undefined,
          branch: userBranch || undefined
        })
        setGroups(items)
      } catch (error) {
        console.error('Failed to load account groups:', error)
        setGroups([])
      }
    })()
  }, [userCompany, userBranch])

  useEffect(() => {
    if (ready && !user) router.replace('/login')
  }, [ready, user])

  async function load(p = page, l = limit) {
    setLoading(true)
    try {
      const { items, pages, total, page: cur } = await listLedgers({
        page: p,
        limit: l,
        search,
        company: userCompany || undefined,
        branch: userBranch || undefined,
        account_group_id: groupFilter || undefined
      })
      setItems(items)
      setPages(pages)
      setTotal(total)
      setPage(cur)
      setLimit(l)
      setSelected(new Set())
    } catch (e) {
      const code = e?.response?.status
      if (code === 401 || code === 403) router.replace('/login')
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load ledgers. Please try again.',
        confirmButtonColor: '#3b82f6'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(1) }, [search, groupFilter, userCompany, userBranch])

  const handleAdd = () => {
    setEditing(null)
    setIsModalOpen(true)
  }

  const handleEdit = (row) => {
    setEditing(row)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        await deleteLedger(id)
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Ledger has been deleted.',
          timer: 2000,
          showConfirmButton: false
        })
        load(page)
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.response?.data?.error || 'Failed to delete ledger.',
          confirmButtonColor: '#3b82f6'
        })
      }
    }
  }

  const handleBulkDelete = async (ids) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${ids.length} ledger(s). This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Yes, delete ${ids.length} item(s)!`
    })

    if (result.isConfirmed) {
      try {
        await bulkDeleteLedgers(ids)
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${ids.length} ledger(s) have been deleted.`,
          timer: 2000,
          showConfirmButton: false
        })
        load(page)
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.response?.data?.error || 'Failed to delete ledgers.',
          confirmButtonColor: '#3b82f6'
        })
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const payload = { ...formData }
      
      // Clean up payload: remove empty strings and convert to proper types
      const cleanedPayload = {}
      Object.keys(payload).forEach(key => {
        const value = payload[key]
        
        // Skip undefined values
        if (value === undefined) return
        
        // Handle empty strings - remove for optional fields, keep for required
        if (value === '' || value === null) {
          // Only keep required fields (title is required)
          if (key === 'title') {
            cleanedPayload[key] = value
          }
          // Remove optional fields with empty values
          return
        }
        
        // Convert number fields
        if (['tds_percentage', 'credit_period_days'].includes(key)) {
          const numValue = Number(value)
          if (!isNaN(numValue)) {
            cleanedPayload[key] = numValue
          }
          return
        }
        
        // Handle date fields
        if (key === 'birth_date' && value) {
          cleanedPayload[key] = new Date(value)
          return
        }
        
        // Ensure boolean fields are boolean
        if (['is_active', 'is_rcm_applicable', 'is_msme_registered'].includes(key)) {
          cleanedPayload[key] = Boolean(value)
          return
        }
        
        // Keep all other non-empty values
        cleanedPayload[key] = value
      })
      
      // Use cleaned payload
      Object.assign(payload, cleanedPayload)
      
      // Automatically set company and branch from session user (only if valid)
      if (userCompany && String(userCompany).trim() !== '') {
        payload.company = String(userCompany)
      }
      if (userBranch && String(userBranch).trim() !== '') {
        payload.branch = String(userBranch)
      }
      
      // Validate and set account_group_name if account_group_id is provided
      if (payload.account_group_id && payload.account_group_id.trim() !== '') {
        const g = groups.find(g => g._id === payload.account_group_id)
        if (g) {
          payload.account_group_name = g.name
        }
      } else {
        // Remove if empty to avoid validation error
        delete payload.account_group_id
        delete payload.account_group_name
      }
      
      // Remove email if empty (to avoid email validation error)
      if (payload.email === '' || !payload.email) {
        delete payload.email
      }

      if (editing) {
        await updateLedger(editing._id, payload)
        await Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Ledger has been updated successfully.',
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        await createLedger(payload)
        await Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Ledger has been created successfully.',
          timer: 2000,
          showConfirmButton: false
        })
      }
      setIsModalOpen(false)
      setEditing(null)
      load(1)
    } catch (error) {
      // Show detailed error message
      const errorMessage = error?.response?.data?.errors 
        ? error.response.data.errors.map(e => `${e.path}: ${e.msg}`).join(', ')
        : error?.response?.data?.error || 'Failed to save ledger.'
      
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#3b82f6'
      })
    }
  }

  const columns = useMemo(() => [
    { key: 'title', label: 'Title' },
    { key: 'account_group_name', label: 'Group' },
    { key: 'email', label: 'Email' },
    { key: 'mobile_no', label: 'Mobile' },
    { key: 'gstin', label: 'GSTIN' },
    { key: 'pan_no', label: 'PAN' },
    {
      key: 'is_active',
      label: 'Active',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    },
  ], [])

  const formFields = useMemo(() => {
    const baseFields = [
      {
        key: 'type',
        label: 'Type',
        type: 'select',
        required: true,
        options: [
          { value: 'employee', label: 'Employee' },
          { value: 'customer', label: 'Customer' },
          { value: 'supplier', label: 'Supplier' },
          { value: 'bank', label: 'Bank' },
          { value: 'cash', label: 'Cash' },
          { value: 'other', label: 'Other' },
        ],
        placeholder: 'Select Type'
      },
      {
        key: 'account_group_id',
        label: 'Account Group',
        type: 'select',
        required: true,
        options: groups.map(g => ({ value: g._id, label: g.name })),
        placeholder: 'Select Account Group'
      },
      {
        key: 'title',
        label: 'Title',
        required: true,
        placeholder: 'Enter title'
      },
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email'
      },
      {
        key: 'mobile_no',
        label: 'Mobile',
        placeholder: 'Enter mobile number'
      },
      {
        key: 'is_active',
        label: 'Active',
        type: 'checkbox',
        checkboxLabel: 'Mark as active',
        defaultValue: true
      }
    ]

    const moreFields = FIELD_DEFS.map(f => ({
      key: f.key,
      label: f.label,
      type: f.type || 'text',
      step: f.step,
      placeholder: `Enter ${f.label.toLowerCase()}`
    }))

    return [...baseFields, ...moreFields]
  }, [groups])

  const formSections = useMemo(() => [
    {
      title: 'Basic Information',
      fields: formFields.slice(0, 8)
    },
    {
      title: 'Additional Details',
      fields: formFields.slice(8, 16)
    },
    {
      title: 'Bank Details',
      fields: formFields.slice(16, 23)
    },
    {
      title: 'Address Information',
      fields: formFields.slice(23, 31)
    },
    {
      title: 'Other Information',
      fields: formFields.slice(31)
    }
  ], [formFields])

  const filters = useMemo(() => [
    {
      key: 'account_group_id',
      label: 'Account Group',
      type: 'select',
      value: groupFilter,
      options: [{ value: '', label: '' }, ...groups.map(g => ({ value: g._id, label: g.name }))]
    }
  ], [groupFilter, groups])

  const handleFilterChange = (key, value) => {
    if (key === 'account_group_id') {
      setGroupFilter(value)
    }
  }

  const toggleRow = (row, checked) => {
    const next = new Set(selected)
    if (checked) next.add(row._id)
    else next.delete(row._id)
    setSelected(next)
  }

  const toggleAll = (checked) => {
    if (checked) setSelected(new Set(items.map(i => i._id)))
    else setSelected(new Set())
  }

  const getInitialFormData = () => {
    if (editing) {
      const base = {
        type: editing.type || 'customer',
        title: editing.title || '',
        email: editing.email || '',
        mobile_no: editing.mobile_no || '',
        account_group_id: editing.account_group_id || '',
        is_active: editing.is_active !== false
      }
      const extra = {}
      FIELD_DEFS.forEach(f => {
        extra[f.key] = editing[f.key] ?? (f.type === 'number' ? 0 : f.type === 'checkbox' ? false : '')
      })
      return { ...base, ...extra }
    }
    return {
      type: 'customer',
      title: '',
      email: '',
      mobile_no: '',
      account_group_id: '',
      is_active: true
    }
  }

  // Render page (data loader will redirect on 401/403). If you prefer a guard, check `user` instead of token.

  return (
    !ready ? null : !user ? null :
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopBar />
        <div className="p-6 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
              { label: 'Masters', href: '/masters' },
              { label: 'Accounts', href: '/masters/accounts' },
              { label: 'Ledgers' }
            ]}
          />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ledgers</h1>
              <p className="text-gray-600 mt-1">Manage your ledger accounts</p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Ledger
            </button>
          </div>

          <AdvancedDataTable
            title="Ledgers"
            columns={columns}
            data={items}
            loading={loading}
            pagination={{ page, pages, total, limit }}
            onPageChange={(p) => { setPage(p); load(p) }}
            onLimitChange={(val) => {
              const next = val === 'ALL' ? (total || limit) : val
              setLimit(next)
              load(1, next)
            }}
            filters={filters}
            onFilterChange={handleFilterChange}
            selectable
            selectedIds={selected}
            onToggleRow={toggleRow}
            onToggleAll={toggleAll}
            onBulkDelete={handleBulkDelete}
            exportFileName="ledgers"
            enableImport
            importSampleColumns={['title','account_group','email','gstin','pan_no','is_active']}
            onImportRows={async (rows) => {
              try {
                const { data } = await importLedgers(rows)
                await Swal.fire({ icon: data.errors.length ? 'warning' : 'success', title: 'Import Complete', html: `Created: <b>${data.created}</b><br/>Errors: <b>${data.errors.length}</b>` })
                load(1)
              } catch (e) {
                await Swal.fire({ icon: 'error', title: 'Import Failed', text: e.message })
              }
            }}
            showSearch
            searchPlaceholder="Search ledgers..."
            showTitle={false}
            showColumnFilters={false}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(row)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          />
        </div>
      </main>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSubmit}
        title={editing ? 'Edit Ledger' : 'Add New Ledger'}
        sections={formSections}
        initialData={getInitialFormData()}
        submitLabel={editing ? 'Update Ledger' : 'Create Ledger'}
      />
    </div>
  )
}
