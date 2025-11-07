import { useState, useEffect } from 'react'

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Form',
  fields = [],
  initialData = {},
  loading = false,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  sections = []
}) {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {})
      setErrors({})
    }
  }, [isOpen, initialData])

  const handleChange = (key, value) => {
    setFormData(prev => {
      const updated = { ...prev, [key]: value }
      // Call onChange callback if provided
      const allFields = sections.length > 0 
        ? sections.flatMap(s => s.fields)
        : fields
      const field = allFields.find(f => f.key === key)
      if (field?.onChange) {
        // If onChange modifies the form data, use the returned value
        const result = field.onChange(value, updated)
        if (result && typeof result === 'object') {
          return { ...updated, ...result }
        }
      }
      return updated
    })
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors = {}
    const allFields = sections.length > 0 
      ? sections.flatMap(s => s.fields)
      : fields
    allFields.forEach(field => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`
      }
      if (field.type === 'email' && formData[field.key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.key])) {
        newErrors[field.key] = 'Invalid email format'
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  if (!isOpen) return null

  const renderField = (field) => {
    const value = formData[field.key] ?? (field.defaultValue || '')
    const error = errors[field.key]
    const fieldId = `field-${field.key}`

    return (
      <div key={field.key} className={field.fullWidth ? 'col-span-2' : ''}>
        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {field.type === 'select' ? (
          <select
            id={fieldId}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            disabled={field.disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            required={field.required}
          >
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea
            id={fieldId}
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            rows={field.rows || 3}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            required={field.required}
          />
        ) : field.type === 'checkbox' ? (
          <div className="flex items-center">
            <input
              id={fieldId}
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleChange(field.key, e.target.checked)}
              disabled={field.disabled}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor={fieldId} className="ml-2 text-sm text-gray-700">
              {field.checkboxLabel || field.label}
            </label>
          </div>
        ) : field.type === 'date' ? (
          <input
            id={fieldId}
            type="date"
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            disabled={field.disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            required={field.required}
          />
        ) : (
          <input
            id={fieldId}
            type={field.type || 'text'}
            value={value}
            onChange={(e) => handleChange(field.key, field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            min={field.min}
            max={field.max}
            step={field.step}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            required={field.required}
          />
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {field.helpText && <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {sections.length > 0 ? (
              sections.map((section, idx) => (
                <div key={idx} className="mb-6">
                  {section.title && (
                    <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      {section.title}
                    </h4>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.fields.map(field => renderField(field))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map(field => renderField(field))}
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

