// Deprecated individual product page: redirect any product slug to dashboard
export default function Redirect(){ return null }
export async function getServerSideProps(){
  return { redirect: { destination: '/dashboard', permanent: false } }
}
