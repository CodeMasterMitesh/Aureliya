import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Sidebar from '@/components/Sidebar'
import AdminTopBar from '@/components/AdminTopBar'
import AdvancedDataTable from '@/components/AdvancedDataTable'
import FormModal from '@/components/FormModal'
import Breadcrumb from '@/components/Breadcrumb'
import { useAuth } from '@/src/store/auth'
import { listSubMenus, listMainMenus, createSubMenu, updateSubMenu, deleteSubMenu } from '@/src/api/menus'

export default function SubMenusPage() {
  const router = useRouter()
  const user = useAuth(s => s.user)
  const ready = useAuth(s => s.ready)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(20)
  const [search, setSearch] = useState('')
  const [mainFilter, setMainFilter] = useState('')
  const [parentFilter, setParentFilter] = useState('')
  const [mains, setMains] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState(new Set())

  useEffect(() => { if (ready && !user) router.replace('/login') }, [user, ready])
  useEffect(() => {
    (async () => {
      const { items } = await listMainMenus({ limit: 200 })
      setMains(items)
    })()
  }, [])

  async function load(p = page) {
    setLoading(true)
    try {
      const { items, pages, total, page: cur } = await listSubMenus({
        page: p,
        limit,
        search,
        main_menu_id: mainFilter || undefined,
        parent_id: parentFilter || undefined
      })
      setItems(items)
      setPages(pages)
      setTotal(total)
      setPage(cur)
      setSelected(new Set())
    } catch (e) {
      const code = e?.response?.status
      if (code === 401 || code === 403) router.replace('/login')
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load sub menus. Please try again.',
        confirmButtonColor: '#3b82f6'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(1) }, [search, mainFilter, parentFilter])

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
        await deleteSubMenu(id)
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Sub menu has been deleted.',
          timer: 2000,
          showConfirmButton: false
        })
        load(page)
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.response?.data?.error || 'Failed to delete sub menu.',
          confirmButtonColor: '#3b82f6'
        })
      }
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateSubMenu(editing._id, formData)
        await Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Sub menu has been updated successfully.',
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        await createSubMenu(formData)
        await Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Sub menu has been created successfully.',
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
        text: error?.response?.data?.error || 'Failed to save sub menu.',
        confirmButtonColor: '#3b82f6'
      })
    }
  }

  const columns = useMemo(() => [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    { key: 'path', label: 'Path' },
    { key: 'order', label: 'Order' },
    {
      key: 'main_menu_id',
      label: 'Main Menu',
      render: (v) => mains.find(m => m._id === v)?.name || ''
    },
    {
      key: 'parent_id',
      label: 'Parent',
      render: (v) => items.find(i => i._id === v)?.name || '-'
    },
  ], [mains, items])

  const formFields = useMemo(() => [
    {
      key: 'main_menu_id',
      label: 'Main Menu',
      type: 'select',
      required: true,
      options: mains.map(m => ({ value: m._id, label: m.name })),
      placeholder: 'Select main menu'
    },
    {
      key: 'parent_id',
      label: 'Parent (optional)',
      type: 'select',
      options: [{ value: '', label: 'None' }, ...items.filter(i => !i.parent_id).map(i => ({ value: i._id, label: i.name }))],
      placeholder: 'Select parent menu'
    },
    {
      key: 'name',
      label: 'Name',
      required: true,
      placeholder: 'Enter sub menu name'
    },
    {
      key: 'slug',
      label: 'Slug',
      placeholder: 'Enter slug'
    },
    {
      key: 'path',
      label: 'Path',
      placeholder: 'Enter path'
    },
    {
      key: 'order',
      label: 'Order',
      type: 'number',
      placeholder: 'Enter display order',
      defaultValue: 0
    }
  ], [mains, items])

  const formSections = useMemo(() => [
    {
      title: 'Sub Menu Information',
      fields: formFields
    }
  ], [formFields])

  const filters = useMemo(() => [
    {
      key: 'main_menu_id',
      label: 'Main Menu',
      type: 'select',
      value: mainFilter,
      options: [{ value: '', label: 'All Main Menus' }, ...mains.map(m => ({ value: m._id, label: m.name }))]
    },
    {
      key: 'parent_id',
      label: 'Parent',
      type: 'select',
      value: parentFilter,
      options: [{ value: '', label: 'All Parents' }, ...items.filter(i => !i.parent_id).map(i => ({ value: i._id, label: i.name }))]
    }
  ], [mainFilter, parentFilter, mains, items])

  const handleFilterChange = (key, value) => {
    if (key === 'main_menu_id') {
      setMainFilter(value)
    } else if (key === 'parent_id') {
      setParentFilter(value)
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
        main_menu_id: editing.main_menu_id || '',
        parent_id: editing.parent_id || '',
        name: editing.name || '',
        slug: editing.slug || '',
        path: editing.path || '',
        order: editing.order || 0
      }
    }
    return {
      main_menu_id: '',
      parent_id: '',
      name: '',
      slug: '',
      path: '',
      order: 0
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
              { label: 'Sub Menus' }
            ]}
          />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sub Menus</h1>
              <p className="text-gray-600 mt-1">Manage your sub navigation menus</p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Sub Menu
            </button>
          </div>

          <AdvancedDataTable
            title="Sub Menus"
            columns={columns}
            data={items}
            loading={loading}
            pagination={{ page, pages, total, limit }}
            onPageChange={(p) => { setPage(p); load(p) }}
            filters={filters}
            onFilterChange={handleFilterChange}
            selectable
            selectedIds={selected}
            onToggleRow={toggleRow}
            onToggleAll={toggleAll}
            exportFileName="sub-menus"
            showSearch
            searchPlaceholder="Search sub menus..."
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
        title={editing ? 'Edit Sub Menu' : 'Add New Sub Menu'}
        sections={formSections}
        initialData={getInitialFormData()}
        submitLabel={editing ? 'Update Sub Menu' : 'Create Sub Menu'}
      />
    </div>
  )
}
