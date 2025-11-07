import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Breadcrumb({ items = [] }) {
  const router = useRouter()

  if (!items || items.length === 0) return null

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <svg className="w-6 h-6 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {isLast ? (
                <span className="text-sm font-medium text-gray-500 flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center transition-colors"
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

