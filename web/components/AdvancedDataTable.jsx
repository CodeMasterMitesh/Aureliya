import { useState, useMemo } from 'react'
import * as XLSX from 'xlsx'

// Lightweight CSV parser (supports commas inside quotes) without extra dependency
function parseCSV(text) {
  const rows = []
  let cur = ''
  let inQuotes = false
  const push = () => { rows[rows.length - 1].push(cur); cur = '' }
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') { cur += '"'; i++; continue }
      inQuotes = !inQuotes
      continue
    }
    if (!inQuotes && (c === '\n' || c === '\r')) {
      if (cur !== '' || rows[rows.length - 1]?.length) { push() }
      if (rows[rows.length - 1]?.length) { /* row complete */ } else if (cur === '' && !rows.length) {}
      if (rows[rows.length - 1]?.length === 0) rows.pop()
      if (rows.length === 0 || rows[rows.length - 1].length) rows.push([])
      if (c === '\r' && text[i + 1] === '\n') i++
      continue
    }
    if (!inQuotes && c === ',') { push(); continue }
    if (!rows.length) rows.push([])
    cur += c
  }
  if (cur !== '' || (rows.length && rows[rows.length - 1].length)) { if (!rows.length) rows.push([]); rows[rows.length - 1].push(cur) }
  return rows.filter(r => r.length && r.some(c => c !== ''))
}

export default function AdvancedDataTable({
  columns = [],
  data = [],
  loading = false,
  pagination = { page: 1, pages: 1, total: 0, limit: 20 },
  onPageChange,
  onLimitChange,
  onFilterChange,
  filters = [],
  selectable = false,
  selectedIds = new Set(),
  onToggleRow,
  onToggleAll,
  actions,
  title = 'Data Table',
  showTitle = true,
  exportFileName = 'export',
  onExport,
  onBulkDelete,
  showSearch = true,
  searchPlaceholder = 'Search...',
  showColumnFilters = true,
  pageSizeOptions = [10,20,50,100,500,1000,2000,5000,'ALL'],
  enableImport = true,
  importSampleColumns = [], // e.g. ['name','code']
  onImportRows, // async (rowsArray) => {}
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

  const handleImport = async (file) => {
    if (!file) return
    const text = await file.text()
    const rows = parseCSV(text)
    if (!rows.length) return alert('Empty CSV')
    const headers = rows[0].map(h => h.trim())
    const dataRows = rows.slice(1).map(r => {
      const obj = {}
      headers.forEach((h, i) => { obj[h] = r[i] || '' })
      return obj
    })
    if (onImportRows) await onImportRows(dataRows)
  }

  const downloadSample = () => {
    if (!importSampleColumns.length) return
    const header = importSampleColumns.join(',')
    const blob = new Blob([header + '\n'], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sample_${exportFileName}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const allSelected = filteredData.length > 0 && filteredData.every(row => selectedIds.has(row._id))
  const someSelected = filteredData.some(row => selectedIds.has(row._id))

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Unified Header: optional title + search + bulk + export */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            {showTitle && (
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            )}
          </div>
          <div className="flex flex-col w-full gap-3 lg:flex-row lg:items-center lg:justify-end">
            {showSearch && (
              <div className="w-full lg:w-64">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {enableImport && (
                <div className="flex items-center gap-2">
                  <input
                    id="adt-import-file"
                    type="file"
                    accept=".csv,text/csv"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) handleImport(f)
                      e.target.value = ''
                    }}
                  />
                  <button
                    onClick={() => document.getElementById('adt-import-file').click()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Import CSV
                  </button>
                  {importSampleColumns.length > 0 && (
                    <button
                      onClick={downloadSample}
                      type="button"
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs font-medium"
                    >Sample</button>
                  )}
                </div>
              )}
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
        {filters && filters.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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

      {/* Column Filters (optional) */}
      {showColumnFilters && (
        <div className="p-2 border-b border-gray-200 bg-gray-50">
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns.length + (actions ? 1 : 0)}, minmax(120px, 1fr))` }}>
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
      )}

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
      {pagination && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-700">
              {pagination.total > 0 ? (
                <>
                  Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
                  <span className="font-medium">{pagination.total}</span> results
                </>
              ) : (
                'No results'
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Page size selector */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-600">Rows / page</label>
                <select
                  className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={pageSizeOptions.includes(pagination.limit) ? pagination.limit : pagination.limit}
                  onChange={(e) => {
                    const val = e.target.value
                    let nextLimit = val === 'ALL' ? pagination.total || pagination.limit : parseInt(val)
                    if (!Number.isFinite(nextLimit) || nextLimit <= 0) nextLimit = 20
                    if (onLimitChange) onLimitChange(nextLimit === (pagination.total || pagination.limit) && val === 'ALL' ? 'ALL' : nextLimit)
                    // Reset to page 1 after size change
                    if (onPageChange) onPageChange(1)
                  }}
                >
                  {pageSizeOptions.map(opt => (
                    <option key={opt} value={opt}>{opt === 'ALL' ? 'All' : opt}</option>
                  ))}
                </select>
              </div>
              {/* Pagination buttons */}
              {pagination.pages > 1 && (
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

