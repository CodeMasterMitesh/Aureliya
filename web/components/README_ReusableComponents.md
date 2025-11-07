# Reusable Components Documentation

This document explains how to use the reusable `AdvancedDataTable` and `FormModal` components in your modules.

## AdvancedDataTable Component

A powerful, feature-rich data table component with column-wise search, pagination, filters, export, and bulk operations.

### Features
- ✅ Column-wise search/filter
- ✅ Global search
- ✅ Pagination
- ✅ Multiple filters
- ✅ Export to Excel
- ✅ Multiple row selection
- ✅ Bulk delete
- ✅ Custom actions per row
- ✅ Loading states
- ✅ Responsive design

### Usage Example

```jsx
import AdvancedDataTable from '@/components/AdvancedDataTable'

function MyModule() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState(new Set())
  const [filters, setFilters] = useState([
    { key: 'status', label: 'Status', type: 'select', value: '', options: [
      { value: '', label: 'All Status' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]}
  ])

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ]

  const handleFilterChange = (key, value) => {
    setFilters(prev => prev.map(f => f.key === key ? { ...f, value } : f))
    // Reload data with new filter
  }

  return (
    <AdvancedDataTable
      title="My Data"
      columns={columns}
      data={items}
      loading={loading}
      pagination={{ page, pages, total, limit: 20 }}
      onPageChange={(p) => { setPage(p); loadData(p) }}
      filters={filters}
      onFilterChange={handleFilterChange}
      selectable
      selectedIds={selected}
      onToggleRow={(row, checked) => {
        const next = new Set(selected)
        if (checked) next.add(row._id)
        else next.delete(row._id)
        setSelected(next)
      }}
      onToggleAll={(checked) => {
        setSelected(checked ? new Set(items.map(i => i._id)) : new Set())
      }}
      onBulkDelete={async (ids) => {
        // Show SweetAlert confirmation
        const result = await Swal.fire({...})
        if (result.isConfirmed) {
          await bulkDelete(ids)
          loadData()
        }
      }}
      exportFileName="my-data"
      showSearch
      searchPlaceholder="Search..."
      actions={(row) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row._id)}>Delete</button>
        </div>
      )}
    />
  )
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | No | Table title |
| `columns` | array | Yes | Column definitions with `key`, `label`, and optional `render` |
| `data` | array | Yes | Array of data objects |
| `loading` | boolean | No | Loading state |
| `pagination` | object | No | `{ page, pages, total, limit }` |
| `onPageChange` | function | No | Callback when page changes |
| `filters` | array | No | Filter definitions |
| `onFilterChange` | function | No | Callback when filter changes |
| `selectable` | boolean | No | Enable row selection |
| `selectedIds` | Set | No | Set of selected row IDs |
| `onToggleRow` | function | No | Callback for row toggle |
| `onToggleAll` | function | No | Callback for select all |
| `onBulkDelete` | function | No | Callback for bulk delete |
| `exportFileName` | string | No | Excel export filename |
| `onExport` | function | No | Custom export handler |
| `showSearch` | boolean | No | Show global search |
| `searchPlaceholder` | string | No | Search placeholder |
| `actions` | function | No | Render function for action buttons |

## FormModal Component

A beautiful, reusable modal form component with sections, validation, and field types.

### Features
- ✅ Multiple sections
- ✅ Field validation
- ✅ Multiple field types (text, select, textarea, checkbox, date, number, email)
- ✅ Custom onChange handlers
- ✅ Loading states
- ✅ Responsive design
- ✅ Beautiful UI

### Usage Example

```jsx
import FormModal from '@/components/FormModal'
import Swal from 'sweetalert2'

function MyModule() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const formSections = [
    {
      title: 'Basic Information',
      fields: [
        {
          key: 'name',
          label: 'Name',
          required: true,
          placeholder: 'Enter name'
        },
        {
          key: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Enter email'
        },
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]
        },
        {
          key: 'is_active',
          label: 'Active',
          type: 'checkbox',
          checkboxLabel: 'Mark as active'
        }
      ]
    },
    {
      title: 'Additional Details',
      fields: [
        {
          key: 'description',
          label: 'Description',
          type: 'textarea',
          rows: 4,
          placeholder: 'Enter description'
        },
        {
          key: 'date',
          label: 'Date',
          type: 'date'
        },
        {
          key: 'amount',
          label: 'Amount',
          type: 'number',
          step: 0.01,
          min: 0
        }
      ]
    }
  ]

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateItem(editing._id, formData)
        await Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Item updated successfully.',
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        await createItem(formData)
        await Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Item created successfully.',
          timer: 2000,
          showConfirmButton: false
        })
      }
      setIsModalOpen(false)
      setEditing(null)
      loadData()
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.error || 'Failed to save.',
        confirmButtonColor: '#3b82f6'
      })
    }
  }

  const getInitialData = () => {
    if (editing) {
      return {
        name: editing.name || '',
        email: editing.email || '',
        status: editing.status || '',
        is_active: editing.is_active || false,
        description: editing.description || '',
        date: editing.date || '',
        amount: editing.amount || 0
      }
    }
    return {
      name: '',
      email: '',
      status: '',
      is_active: true,
      description: '',
      date: '',
      amount: 0
    }
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Add New</button>
      
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSubmit}
        title={editing ? 'Edit Item' : 'Add New Item'}
        sections={formSections}
        initialData={getInitialData()}
        submitLabel={editing ? 'Update' : 'Create'}
      />
    </>
  )
}
```

### Field Types

1. **text** (default): Text input
2. **email**: Email input with validation
3. **number**: Number input with min/max/step
4. **date**: Date picker
5. **select**: Dropdown select
6. **textarea**: Multi-line text
7. **checkbox**: Boolean checkbox

### Field Properties

| Property | Type | Description |
|----------|------|-------------|
| `key` | string | Field key (required) |
| `label` | string | Field label (required) |
| `type` | string | Field type |
| `required` | boolean | Is field required |
| `placeholder` | string | Placeholder text |
| `options` | array | Options for select (format: `[{value, label}]`) |
| `disabled` | boolean | Is field disabled |
| `onChange` | function | Custom onChange handler `(value, formData) => {}` |
| `defaultValue` | any | Default value |
| `helpText` | string | Help text below field |
| `min` | number | Min value (for number/date) |
| `max` | number | Max value (for number/date) |
| `step` | number | Step value (for number) |
| `rows` | number | Rows for textarea |
| `fullWidth` | boolean | Span full width (2 columns) |
| `checkboxLabel` | string | Label for checkbox |

## Complete Example: Ledger Module

See `web/pages/admin/masters/accounts/ledger.jsx` for a complete implementation example.

## Best Practices

1. **Always use SweetAlert2** for user confirmations and notifications
2. **Handle loading states** properly
3. **Validate data** before submission
4. **Clear form state** when modal closes
5. **Use sections** to organize complex forms
6. **Provide helpful placeholders** and help text
7. **Handle errors gracefully** with user-friendly messages
8. **Use proper field types** for better UX (email, date, number, etc.)

## Integration with SweetAlert2

Always use SweetAlert2 for:
- ✅ Success notifications after create/update/delete
- ✅ Error notifications
- ✅ Confirmation dialogs before delete operations
- ✅ Loading indicators during async operations

Example:
```jsx
// Success
await Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'Operation completed successfully.',
  timer: 2000,
  showConfirmButton: false
})

// Error
await Swal.fire({
  icon: 'error',
  title: 'Error',
  text: 'Something went wrong.',
  confirmButtonColor: '#3b82f6'
})

// Confirmation
const result = await Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6',
  confirmButtonText: 'Yes, delete it!'
})
```

