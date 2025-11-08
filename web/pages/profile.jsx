import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useAuth } from '@/src/store/auth'
import { getMe, updateMe, changePassword, addAddress, updateAddress, deleteAddress } from '@/src/api/profile'
import { uploadProfile } from '@/src/api/uploads'
import { fetchOrders } from '@/src/api/orders'

function DeprecatedProfile(){
  const token = useAuth((s)=>s.token)
  const user = useAuth((s)=>s.user)
  const setUser = useAuth((s)=>s.setUser)













  // Deprecated profile page removed content
}

// Deprecated profile page: redirect to dashboard
export default function Redirect(){ return null }
export async function getServerSideProps(){
  return { redirect: { destination: '/dashboard', permanent: false } }
}
