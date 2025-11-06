export default function Button({ as:As='button', variant='outline', className='', ...props }){
  const base = 'inline-flex items-center justify-center rounded-md text-sm transition'
  const styles = variant==='solid'
    ? 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600'
    : 'border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900'
  const Comp = As
  return <Comp className={`${base} ${styles} ${className}`} {...props} />
}
