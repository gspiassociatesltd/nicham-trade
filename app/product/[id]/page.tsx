'use client'
import { useState, useEffect } from 'react'
const productsMap:any = {
  1: { name: "Solar Incubator 500 Eggs", desc: "Hatch 500 chicks with sun. No NEPA.", basePrice: 450000, type: "solar" },
  2: { name: "Solar Corn Sheller", desc: "Shell 500kg corn per hour with solar. No diesel.", basePrice: 193500, type: "solar" },
  3: { name: "Solar Oil Press Machine", basePrice: 220000, type: "solar", desc: "Press groundnut, palm kernel oil with solar." },
  201: { name: "Paracetamol Powder BP/USP", basePrice: 8500, type: "chemical", chemPrice: "$5.5/kg MOQ 500kg", desc: "Pharma grade 99% purity 25kg drum COA." },
  203: { name: "Caustic Soda Flakes 99%", basePrice: 420000, type: "chemical", chemPrice: "$420/ton MOQ 5 tons", desc: "NaOH 99% 25kg bag Shandong China." },
}
export default function ProductPage({ params }: any){
  const [prod,setProd]=useState<any>(null)
  useEffect(()=>{ const pid=params.id||'2'; setProd(productsMap[pid]||productsMap[2]) },[])
  if(!prod) return <div className="p-4">Loading...</div>
  const isChem=prod.type==='chemical'
  const points=isChem?0:Math.round(prod.basePrice*0.01)
  const totalVAT=isChem?prod.basePrice:Math.round(prod.basePrice*1.075)
  const order=()=>{
    const orders=JSON.parse(localStorage.getItem('nicham_orders')||'[]')
    const oid='NCH-'+Date.now().toString().slice(-6)
    orders.unshift({orderId:oid, productName:prod.name, total:totalVAT, points, date:new Date().toLocaleDateString(), status:'awaiting_payment'})
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    window.location.href='/orders'
  }
  return (
    <main className="min-h-screen bg-[#f6f7e8]">
      <header className="bg-white shadow p-3">
        <div className="flex items-center w-full">
          <a href="/" className="font-bold text-sm flex items-center gap-1">← Back to NiChAm Trade</a>
          <div className="flex-1 flex justify-center items-center gap-2">
            <img src="/logo.png" className="w-10 h-10 rounded-full border-2 border-green-600" />
            <span className="text-xl font-black text-green-700">NiChAm Trade</span>
          </div>
        </div>
      </header>
      <div className="max-w-xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow p-6 mt-4">
          <h1 className="text-xl font-black">{prod.name}</h1>
          <div className="text-sm text-gray-600 mt-1">{prod.desc}</div>
          <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <div className="font-bold text-sm">Order - Click YES or Say YES - Voice Ordering</div>
            {!isChem && <div className="text-[11px] text-green-700 mt-1">✓ Earn {points} Green Points | Total (VAT 7.5% inclusive) N{totalVAT.toLocaleString()}</div>}
            {isChem && <div className="text-[11px] text-gray-700 mt-1">Chemical - {prod.chemPrice} | No Green Points | MTN Escrow 30/40/30% incl. Platform 5%</div>}
            <button onClick={order} className="mt-3 w-full py-3 bg-green-600 text-white rounded-full font-black text-sm">YES - Confirm</button>
            <button className="mt-2 w-full py-2 bg-black text-white rounded-full font-bold text-xs">Hear Instruction</button>
            <button className="mt-2 w-full py-2 border border-black rounded-full font-bold text-xs">🎙️ Mic - Say YES</button>
          </div>
          <div className="mt-4 bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-600">Total (VAT 7.5% inclusive)</div>
            <div className="text-2xl font-black text-green-700">N{totalVAT.toLocaleString()}</div>
            {!isChem && <div className="text-[10px] text-green-700">+ {points} Green Points</div>}
            {isChem && <div className="text-[10px] text-gray-500">{prod.chemPrice}</div>}
          </div>
          <div className="mt-3 text-[9px] text-gray-500 text-center">Platform 5% + AfricanIES 15% + Seller 75% + Agent NG 2% + Sourcing CN/US 3% = 100%. Forex via Juicyway/Grey.</div>
        </div>
      </div>
    </main>
  )
}
