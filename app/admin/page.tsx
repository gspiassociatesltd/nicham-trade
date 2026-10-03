'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function Admin(){ const r=useRouter(); useEffect(()=>{r.push('/admin/motoma-ddp')},[]); return <div>Redirecting...</div> }
