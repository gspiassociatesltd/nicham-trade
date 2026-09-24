"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProductPage({params:{id:string}}){
  const [p, setP] = useState<any>(null)
  const [qty, setQty] = useState(1)

  useEffect(()=>{
    const saved = localStorage.getItem('nicham_v103_products')
    if(saved){
      try{
        const list = JSON.parse(saved)
        const found = list.find((x:any)=> x.id===params.id)
        setP(found)
      }catch{}
    }
  },[])

  if(!p) return <div className="min-h-screen flex items-center justify-center"><div className="bg-white border rounded-xl p-6 text-sm">Product not found. <Link href="/" className="underline">Home</Link></div></div>

  // REAL numbers - NO fake 801 fallback
  const ADMIN_WA = process.env.NEXT_PUBLIC_ADMIN_WA || '2347050477950'
  const AFRICANIES_WA = process.env.NEXT_PUBLIC_AFRICANIES_WA || '2347050477950'
  const QIMA_WA = process.env.NEXT_PUBLIC_QIMA_WA || '2347050477950'

  const total = (p.appPrice || 0) * qty
  const rfqId = `RFQ${Date.now().toString().slice(-6)}`

  const waText = `NEW RFQ ${rfqId}: ${p.name} ${p.category} x${qty} to Lagos. Total $${total.toFixed(2)}. QUOTE NEEDED: Factory Visit N10k - QIMA Inspection. Product: ${p.manufacturer} Verified by AfricanIES`
  const waLink = `https://api.whatsapp.com/send/?phone=${ADMIN_WA}&text=${encodeURIComponent(waText)}`

  return <div className="min-h-screen bg-[#fefce8]/50">
    <div className="max-w-5xl mx-auto p-3">
      <header className="flex justify-between items-center border rounded-xl p-3 bg-white">
        <Link href="/" className="flex gap-2 items-center"><div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center text-white">✳</div><div className="font-black text-sm">NiChAm Trade</div></Link>
      </header>
      <div className="mt-4 bg-white border rounded-xl p-4">
        <div className="font-black text-xl">{p.name}</div>
        <div className="text-xs opacity-60">{p.manufacturer} • {p.category}</div>
        <div className="mt-3 text-3xl font-black">${p.appPrice?.toFixed(2)}</div>
        <div className="text- opacity-50">No factory leak. Factory +15% logistics +5% platform +3% sourcing +1% affiliate +2% field agent.</div>
        <a href={waLink} target="_blank" className="mt-4 block bg-green-600 text-white text-center py-2.5 rounded-xl text-sm font-bold">Request RFQ via WhatsApp ({ADMIN_WA})</a>
        <div className="text- opacity-40 mt-2">Uses NEXT_PUBLIC_ADMIN_WA={ADMIN_WA} - No 801 number</div>
      </div>
    </div>
  </div>
}
