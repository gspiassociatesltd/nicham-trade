'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function Admin() {
  const router = useRouter()
  useEffect(()=>{ router.push('/admin/motoma-ddp') },[])
  return <div style={{padding:20}}>Redirecting to MOTOMA DDP Admin...</div>
}
