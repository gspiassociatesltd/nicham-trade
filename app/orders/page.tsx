'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function OrdersPage(){
  const [orders,setOrders]=useState<any[]>([])
  useEffect(()=>{ const s=localStorage.getItem('nicham_orders'); if(s) setOrders(JSON.parse(s)) },[])
  return (
    <div className="min-h-screen bg-gray-50 p-4"><div className="max-w-4xl mx-auto">
      <Link href="/?lang=en" className="text-blue-600 text-sm">← Back to Market</Link>
      <h1 className="text-2xl font-black mt-4">📦 My Orders - 2% Cheaper than AfricanIES</h1>
      <div className="bg-green-50 border p-3 text-xs mt-3 rounded">10% merchant discount from AfricanIES → 2% to you (competitive) → 8% GSPI margin. Carbon shared with MTN only.</div>
      {orders.length===0 ? <div className="bg-white p-8 text-center mt-4 rounded-xl">No orders yet. <Link href="/?lang=en" className="bg-black text-white px-4 py-2 rounded-full">Market</Link></div> :
        <div className="space-y-3 mt-4">{orders.map((o:any,i:number)=><div key={i} className="bg-white p-4 rounded-xl shadow"><div className="flex justify-between"><b>{o.productName}</b><span className="text-green-600 font-black">₦{o.total?.toLocaleString()}</span></div><div className="text-xs text-gray-600">Order {o.orderId} | Saved vs AfricanIES ₦{o.saving||10000}</div></div>)}</div>
      }
    </div></div>
  )
}
