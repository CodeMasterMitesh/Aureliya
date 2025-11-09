import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import AdvancedDataTable from '@/components/AdvancedDataTable'
import FormModal from '@/components/FormModal'
import Breadcrumb from '@/components/Breadcrumb'
import { useAuth } from '@/src/store/auth'
import { listBranches, fetchCompanies, createBranch, updateBranch, deleteBranch, bulkDeleteBranches } from '@/src/api/companies'
import { importBranches } from '@/src/api/import'

export default function BranchesPage() {
  const router = useRouter()
  const user = useAuth(s => s.user)
  const ready = useAuth(s => s.ready)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(20)
  const [search, setSearch] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [codeFilter, setCodeFilter] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState(new Set())

  useEffect(() => { if (ready && !user) router.replace('/login') }, [user, ready])
  useEffect(() => { fetchCompanies('').then(setCompanies) }, [])

  async function load(p = page, l = limit) {
    setLoading(true)
    try {
      const { items, pages, total, page: cur } = await listBranches({
        page: p,
        limit: l,
        search,
        name: nameFilter || undefined,
        code: codeFilter || undefined,
        company: companyFilter || undefined
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
        text: 'Failed to load branches. Please try again.',
        confirmButtonColor: '#3b82f6'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(1) }, [search, nameFilter, codeFilter, companyFilter])

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
        await deleteBranch(id)
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Branch has been deleted.',
          timer: 2000,
          showConfirmButton: false
        })
        load(page)
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.response?.data?.error || 'Failed to delete branch.',
          confirmButtonColor: '#3b82f6'
        })
      }
    }
  }

  const handleBulkDelete = async (ids) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${ids.length} branch(es). This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Yes, delete ${ids.length} item(s)!`
    })

    if (result.isConfirmed) {
      try {
        await bulkDeleteBranches(ids)
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${ids.length} branch(es) have been deleted.`,
          timer: 2000,
          showConfirmButton: false
        })
        load(page)
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.response?.data?.error || 'Failed to delete branches.',
          confirmButtonColor: '#3b82f6'
        })
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateBranch(editing._id, formData)
        await Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Branch has been updated successfully.',
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        await createBranch(formData)
        await Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Branch has been created successfully.',
          timer: 2000,
          showConfirmButton: false
        })
      }
      setIsModalOpen(false)
      setEditing(null)
      load(1)
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.error || 'Failed to save branch.',
        confirmButtonColor: '#3b82f6'
      })
    }
  }

  const columns = useMemo(() => [
    {
      key: 'company',
      label: 'Company',
      render: (v) => v?.name || ''
    },
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'address', label: 'Address' },
  ], [])

  const formFields = useMemo(() => [
    {
      key: 'company',
      label: 'Company',
      type: 'select',
      required: true,
      options: companies.map(c => ({ value: c._id, label: c.name })),
      placeholder: 'Select company'
    },
    {
      key: 'name',
      label: 'Name',
      required: true,
      placeholder: 'Enter branch name'
    },
    {
      key: 'code',
      label: 'Code',
      placeholder: 'Enter branch code'
    },
    {
      key: 'address',
      label: 'Address',
      type: 'textarea',
      rows: 4,
      placeholder: 'Enter branch address'
    }
  ], [companies])

  const formSections = useMemo(() => [
    {
      title: 'Branch Information',
      fields: formFields
    }
  ], [formFields])

  const filters = useMemo(() => [
    {
      key: 'company',
      label: 'Company',
      type: 'select',
      value: companyFilter,
      options: [{ value: '', label: '' }, ...companies.map(c => ({ value: c._id, label: c.name }))]
    },
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      value: nameFilter,
      placeholder: 'Filter by name'
    },
    {
      key: 'code',
      label: 'Code',
      type: 'text',
      value: codeFilter,
      placeholder: 'Filter by code'
    }
  ], [companyFilter, nameFilter, codeFilter, companies])

  const handleFilterChange = (key, value) => {
    if (key === 'company') {
      setCompanyFilter(value)
    } else if (key === 'name') {
      setNameFilter(value)
    } else if (key === 'code') {
      setCodeFilter(value)
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
      return {
        company: editing.company?._id || editing.company || '',
        name: editing.name || '',
        code: editing.code || '',
        address: editing.address || ''
      }
    }
    return {
      company: companyFilter || '',
      name: '',
      code: '',
      address: ''
    }
  }

  if (!ready) return null
  if (!user) return null

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopBar />
        <div className="p-6 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
              { label: 'Branches' }
            ]}
          />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Branches</h1>
              <p className="text-gray-600 mt-1">Manage your branches</p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Branch
            </button>
          </div>

          <AdvancedDataTable
            title="Branches"
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
            exportFileName="branches"
            enableImport
            importSampleColumns={['company','name','code','address']}
            onImportRows={async (rows) => {
              const { ok, data, error } = await (async () => {
                try { const { data } = await importBranches(rows); return { ok: true, data } } catch (e) { return { ok: false, error: e.message } } })()
              if (!ok) return Swal.fire({ icon: 'error', title: 'Import Failed', text: error })
              await Swal.fire({ icon: data.errors.length ? 'warning' : 'success', title: 'Import Complete', html: `Created: <b>${data.created}</b><br/>Errors: <b>${data.errors.length}</b>` })
              load(1)
            }}
            showSearch
            searchPlaceholder="Search branches..."
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
        title={editing ? 'Edit Branch' : 'Add New Branch'}
        sections={formSections}
        initialData={getInitialFormData()}
        submitLabel={editing ? 'Update Branch' : 'Create Branch'}
      />
    </div>
  )
}
