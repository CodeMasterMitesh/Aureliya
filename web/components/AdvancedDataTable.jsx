import { useState, useMemo } from 'react'
import * as XLSX from 'xlsx'

export default function AdvancedDataTable({
  columns = [],
  data = [],
  loading = false,
  pagination = { page: 1, pages: 1, total: 0, limit: 20 },
  onPageChange,
  onFilterChange,
  filters = [],
  selectable = false,
  selectedIds = new Set(),
  onToggleRow,
  onToggleAll,
  actions,
  title = 'Data Table',
  exportFileName = 'export',
  onExport,
  onBulkDelete,
  showSearch = true,
  searchPlaceholder = 'Search...'
}) {
  const [columnFilters, setColumnFilters] = useState({})
  const [globalSearch, setGlobalSearch] = useState('')

  // Apply column filters and global search
  const filteredData = useMemo(() => {
    let result = [...data]
    
    // Apply global search
    if (globalSearch) {
      const searchLower = globalSearch.toLowerCase()
      result = result.filter(row => 
        columns.some(col => {
          const value = row[col.key]
          return value && String(value).toLowerCase().includes(searchLower)
        })
      )
    }
    
    // Apply column filters
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        const searchValue = String(value).toLowerCase()
        result = result.filter(row => {
          const cellValue = row[key]
          return cellValue && String(cellValue).toLowerCase().includes(searchValue)
        })
      }
    })
    
    return result
  }, [data, globalSearch, columnFilters, columns])

  const handleColumnFilter = (key, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleExportExcel = () => {
    if (onExport) {
      onExport(filteredData)
      return
    }

    // Default export
    const exportData = filteredData.map(row => {
      const obj = {}
      columns.forEach(col => {
        const value = row[col.key]
        obj[col.label] = col.render ? col.render(value, row) : (value ?? '')
      })
      return obj
    })

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, `${exportFileName}_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (onBulkDelete) {
      await onBulkDelete(Array.from(selectedIds))
    }
  }

  const allSelected = filteredData.length > 0 && filteredData.every(row => selectedIds.has(row._id))
  const someSelected = filteredData.some(row => selectedIds.has(row._id))

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {selectable && selectedIds.size > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Selected ({selectedIds.size})
              </button>
            )}
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="space-y-3">
          {showSearch && (
            <div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          )}
          
          {filters && filters.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filters.map((filter, idx) => (
                <div key={idx}>
                  {filter.type === 'select' ? (
                    <select
                      value={filter.value || ''}
                      onChange={(e) => onFilterChange && onFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    >
                      <option value="">{filter.placeholder || `All ${filter.label}`}</option>
                      {filter.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={filter.placeholder || `Filter by ${filter.label}`}
                      value={filter.value || ''}
                      onChange={(e) => onFilterChange && onFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Column Filters */}
      <div className="p-2 border-b border-gray-200 bg-gray-50">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}, minmax(120px, 1fr))` }}>
          {selectable && (
            <div className="px-2">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) input.indeterminate = someSelected && !allSelected
                }}
                onChange={(e) => onToggleAll && onToggleAll(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          )}
          {columns.map(col => (
            <div key={col.key} className="px-2">
              <input
                type="text"
                placeholder={`Filter ${col.label}`}
                value={columnFilters[col.key] || ''}
                onChange={(e) => handleColumnFilter(col.key, e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          ))}
          {actions && <div></div>}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected && !allSelected
                    }}
                    onChange={(e) => onToggleAll && onToggleAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={(selectable ? 1 : 0) + columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-2 text-gray-600">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={(selectable ? 1 : 0) + columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={row._id || idx} className="hover:bg-gray-50 transition-colors">
                  {selectable && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(row._id)}
                        onChange={(e) => onToggleRow && onToggleRow(row, e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '-')}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
              <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
              <span className="font-medium">{pagination.total}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange && onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                  let pageNum
                  if (pagination.pages <= 5) {
                    pageNum = i + 1
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1
                  } else if (pagination.page >= pagination.pages - 2) {
                    pageNum = pagination.pages - 4 + i
                  } else {
                    pageNum = pagination.page - 2 + i
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange && onPageChange(pageNum)}
                      className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                        pagination.page === pageNum
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => onPageChange && onPageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

