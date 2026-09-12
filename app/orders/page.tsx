'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  useEffect(() => {
    const stored = localStorage.getItem('nicham_orders')
    if (stored) setOrders(JSON.parse(stored))
  }, [],)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/?lang=en" className="text-blue-600 text-sm">← Back to Market</Link>
        <h1 className="text-2xl font-black mt-4">📦 My Orders - Competitive Pricing</h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs mt-3">
          <div className="font-bold">Pricing Strategy: 10% merchant discount from AfricanIES → 2% to you → 8% GSPI margin</div>
          <div>You pay 2% LESS than AfricanIES website price. AfricanIES NOT in carbon credit - only GSPI + MTN + You share carbon revenue.</div>
          <div className="mt-1">Example: AfricanIES retail ₦500k → You pay ₦490k (2% save ₦10k) → GSPI cost ₦450k (10% discount) → GSPI margin ₦40k (8%)</div>
        </div>
        {orders.length===0 ? (
          <div className="bg-white rounded-xl p-8 text-center mt-4">
            <p>No orders yet.</p>
            <Link href="/?lang=en" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-full">Go to Market</Link>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {orders.map((o:any,i:number)=>(
              <div key={i} className="bg-white rounded-xl p-4 shadow border">
                <div className="flex justify-between">
                  <div className="font-bold">{o.productName}</div>
                  <div className="text-green-600 font-black">₦{o.total?.toLocaleString()} <span className="text-[10px] text-green-600">2% cheaper than AfricanIES</span></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">Order: {o.orderId} | Saving vs AfricanIES: ₦{o.saving?.toLocaleString() || '10,000'}</div>
                <div className="text-xs mt-2 flex gap-2 flex-wrap">
                  <span className="bg-yellow-100 px-2 py-1 rounded">Escrow: GSPI/MoMo</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Fulfillment: Logistics Partner</span>
                  <span className="bg-green-100 px-2 py-1 rounded">Carbon: Shared with MTN (not AfricanIES)</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
