'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function OrdersPage(){
  const [orders,setOrders]=useState<any[]>([])
  useEffect(()=>{ try{ const s=localStorage.getItem('nicham_orders'); if(s) setOrders(JSON.parse(s)) }catch{} },[])
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/?lang=en" className="text-blue-600 text-sm">← Back to Market</Link>
        <h1 className="text-2xl font-black mt-4">📦 My Orders - Ready for AfricanIES API</h1>
        <div className="bg-white border rounded-lg p-3 text-xs mt-3 space-y-1">
          <div className="font-bold">✅ Pricing: AfricanIES retail ₦500k → You pay ₦490k (2% cheaper) → Cost ₦450k (10% discount) → Margin ₦40k (8%)</div>
          <div>✅ Carbon: Buyer 50% + GSPI 30% + MTN 20% | AfricanIES 0% (logistics only, not in carbon)</div>
          <div>✅ API Ready: /lib/suppliers/africanIES.ts + factory.ts - Plug manufacturer API key when you get it</div>
          <div>✅ White-label: Products show as NiChAm, fulfillment by Pan-African Logistics Partner</div>
        </div>
        {orders.length===0 ? <div className="bg-white rounded-xl p-8 text-center mt-4">No orders yet. <Link href="/?lang=en" className="bg-black text-white px-6 py-2 rounded-full ml-2">Go to Market</Link></div> :
          <div className="space-y-3 mt-4">{orders.map((o:any,i:number)=><div key={i} className="bg-white rounded-xl p-4 shadow border"><div className="flex justify-between"><b>{o.productName}</b><span className="text-green-600 font-black">₦{o.total?.toLocaleString()} <span className="text-[9px] bg-green-100 px-1 rounded">2% cheaper</span></span></div><div className="text-xs text-gray-600">Order {o.orderId} | Saving vs AfricanIES: ₦{o.saving?.toLocaleString()}</div><div className="text-[10px] text-gray-500 mt-1">Fulfillment: AfricanIES Logistics (merchant discount 10%) | Carbon: GSPI+MTN share only</div></div>)}</div>
        }
      </div>
    </div>
  )
}
