'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function OrdersPage(){
  const [orders,setOrders]=useState<any[]>([])
  useEffect(()=>{ const s=localStorage.getItem('nicham_orders'); if(s) setOrders(JSON.parse(s)) },[])
  return <div className="min-h-screen p-4"><div className="max-w-4xl mx-auto"><Link href="/?lang=en">← Back</Link><h1 className="text-2xl font-black mt-4">📦 My Orders - 2% Cheaper</h1><div className="text-xs mt-2">10% discount → 2% to you → 8% margin | Carbon MTN only</div>{orders.length===0?<div className="bg-white p-8 mt-4 text-center rounded-xl">No orders</div>:<div className="mt-4 space-y-2">{orders.map((o:any,i:number)=><div key={i} className="bg-white p-4 rounded-xl border"><b>{o.productName}</b> - ₦{o.total?.toLocaleString()} - Save ₦{o.saving}</div>)}</div>}</div></div>
}
