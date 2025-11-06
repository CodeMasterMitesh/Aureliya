export default function Table({ columns=[], data=[], actions }){
  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-3 py-2 text-left font-semibold text-gray-600">{col.label}</th>
            ))}
            {actions && <th className="px-3 py-2"/>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row._id || idx} className="border-t hover:bg-gray-50">
              {columns.map(col => (
                <td key={col.key} className="px-3 py-2">{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              ))}
              {actions && <td className="px-3 py-2">{actions(row)}</td>}
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={columns.length + (actions?1:0)} className="px-3 py-6 text-center text-gray-500">No records</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
