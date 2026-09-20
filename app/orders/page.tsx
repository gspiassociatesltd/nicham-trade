"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
export default function Orders(){
  const [orders,setOrders]=useState<any[]>([])
  useEffect(()=>{
    const saved=localStorage.getItem('nicham_orders')
    if(saved) try{ setOrders(JSON.parse(saved)) }catch{}
  },[])
  const clear=()=>{ localStorage.removeItem('nicham_orders'); setOrders([])}
  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b"><div className="max-w-4xl mx-auto px-4 py-3 flex justify-between"><Link href="/" className="text-xs border px-4 py-2 rounded-full">← Marketplace</Link><button onClick={clear} className="text-xs border px-3 py-2 rounded-full">Clear</button></div></header>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="font-black text-xl">Orders ({orders.length})</h1>
        <div className="text-xs text-gray-500 mt-1">Secure trading via MTN Escrow. Orders saved when you click Order via WhatsApp.</div>
        {orders.length===0 ? <div className="mt-10 bg-white rounded-2xl p-10 text-center border text-sm text-gray-400">No orders yet. Go to marketplace and order a product.<br/><Link href="/" className="mt-3 inline-block bg-black text-white px-5 py-2 rounded-full text-xs">Go to Marketplace</Link></div> :
          <div className="mt-4 space-y-2">
            {orders.map((o:any)=><div key={o.id} className="bg-white rounded-2xl p-4 border flex justify-between items-center"><div><div className="font-bold text-sm">{o.product}</div><div className="text-xs text-gray-500">Qty {o.qty} • {o.date}</div><div className="text-xs mt-1 bg-yellow-100 inline-block px-2 py-0.5 rounded-full">{o.status}</div></div><div className="font-black text-sm">N{o.total.toLocaleString()}</div></div>)}
          </div>
        }
      </div>
    </div>
  )
}
