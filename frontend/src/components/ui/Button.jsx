import clsx from 'clsx'

export default function Button({ as: Tag = 'button', variant = 'solid', className, children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  const styles = {
    solid: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600',
    outline: 'border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900',
    ghost: 'hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60',
  }
  return (
    <Tag className={clsx(base, styles[variant], 'px-4 py-2', className)} {...props}>
      {children}
    </Tag>
  )
}
