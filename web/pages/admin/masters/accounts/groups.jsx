import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import AdvancedDataTable from '@/components/AdvancedDataTable'
import FormModal from '@/components/FormModal'
import Breadcrumb from '@/components/Breadcrumb'
import { useAuth } from '@/src/store/auth'
import { listAccountGroups, createAccountGroup, updateAccountGroup, deleteAccountGroup, bulkDeleteAccountGroups } from '@/src/api/accountGroups'
import { importAccountGroups } from '@/src/api/import'

export default function AccountGroupsPage() {
  const router = useRouter()
  const user = useAuth(s => s.user)
  const ready = useAuth(s => s.ready)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(20)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState(new Set())

  // Get company and branch from session user
  const userCompany = user?.company || ''
  const userBranch = user?.branch || ''

  useEffect(() => { if (ready && !user) router.replace('/login') }, [user, ready])

  async function load(p = page, l = limit) {
    setLoading(true)
    try {
      const { items, pages, total, page: cur } = await listAccountGroups({
        page: p,
        limit: l,
        search,
        company: userCompany || undefined,
        branch: userBranch || undefined
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
        text: 'Failed to load account groups. Please try again.',
        confirmButtonColor: '#3b82f6'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(1) }, [search, userCompany, userBranch])

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
        await deleteAccountGroup(id)
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Account group has been deleted.',
          timer: 2000,
          showConfirmButton: false
        })
        load(page)
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.response?.data?.error || 'Failed to delete account group.',
          confirmButtonColor: '#3b82f6'
        })
      }
    }
  }

  const handleBulkDelete = async (ids) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${ids.length} account group(s). This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `Yes, delete ${ids.length} item(s)!`
    })

    if (result.isConfirmed) {
      try {
        await bulkDeleteAccountGroups(ids)
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${ids.length} account group(s) have been deleted.`,
          timer: 2000,
          showConfirmButton: false
        })
        load(page)
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.response?.data?.error || 'Failed to delete account groups.',
          confirmButtonColor: '#3b82f6'
        })
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      const payload = { ...formData }
      // Automatically set company and branch from session user
      if (userCompany) payload.company = userCompany
      if (userBranch) payload.branch = userBranch

      if (editing) {
        await updateAccountGroup(editing._id, payload)
        await Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Account group has been updated successfully.',
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        await createAccountGroup(payload)
        await Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Account group has been created successfully.',
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
        text: error?.response?.data?.error || 'Failed to save account group.',
        confirmButtonColor: '#3b82f6'
      })
    }
  }

  const columns = useMemo(() => [
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'description', label: 'Description' },
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

  const formFields = useMemo(() => [
    {
      key: 'name',
      label: 'Name',
      required: true,
      placeholder: 'Enter account group name'
    },
    {
      key: 'code',
      label: 'Code',
      placeholder: 'Enter code (optional)'
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea',
      rows: 4,
      placeholder: 'Enter description (optional)'
    },
    {
      key: 'is_active',
      label: 'Active',
      type: 'checkbox',
      checkboxLabel: 'Mark as active',
      defaultValue: true
    }
  ], [])

  const formSections = useMemo(() => [
    {
      title: 'Account Group Information',
      fields: formFields
    }
  ], [formFields])

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
        name: editing.name || '',
        code: editing.code || '',
        description: editing.description || '',
        is_active: editing.is_active !== false
      }
    }
    return {
      name: '',
      code: '',
      description: '',
      is_active: true
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
              { label: 'Masters', href: '/masters' },
              { label: 'Accounts', href: '/masters/accounts' },
              { label: 'Account Groups' }
            ]}
          />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Groups</h1>
              <p className="text-gray-600 mt-1">Manage your account groups</p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Account Group
            </button>
          </div>

          <AdvancedDataTable
            title="Account Groups"
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
            filters={[]}
            selectable
            selectedIds={selected}
            onToggleRow={toggleRow}
            onToggleAll={toggleAll}
            onBulkDelete={handleBulkDelete}
            exportFileName="account-groups"
            enableImport
            importSampleColumns={['name','code','description','is_active']}
            onImportRows={async (rows) => {
              try {
                const { data } = await importAccountGroups(rows)
                await Swal.fire({ icon: data.errors.length ? 'warning' : 'success', title: 'Import Complete', html: `Created: <b>${data.created}</b><br/>Errors: <b>${data.errors.length}</b>` })
                load(1)
              } catch (e) {
                await Swal.fire({ icon: 'error', title: 'Import Failed', text: e.message })
              }
            }}
            showSearch
            searchPlaceholder="Search account groups..."
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
        title={editing ? 'Edit Account Group' : 'Add New Account Group'}
        sections={formSections}
        initialData={getInitialFormData()}
        submitLabel={editing ? 'Update Account Group' : 'Create Account Group'}
      />
    </div>
  )
}
