import clsx from 'clsx'

export default function Card({ className, children, ...props }) {
  return (
    <div className={clsx('rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/60', className)} {...props}>
      {children}
    </div>
  )
}
