"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ProductPage(){
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  useEffect(()=>{
    const saved = localStorage.getItem('nicham_v200_products')
    if(saved){
      try{
        const list = JSON.parse(saved)
        const found = list.find((p:any)=> p.id===params.id)
        if(found) setProduct(found)
      }catch{}
    }
  },[params.id])

  if(!product) return <div className="p-6">Loading product {params.id as string}... <Link href="/" className="underline">Back to Home</Link></div>

  const ADMIN_WA = process.env.NEXT_PUBLIC_ADMIN_WA || '2347050477950'
  const AFRICANIES_WA = process.env.NEXT_PUBLIC_AFRICANIES_WA || '2347050477950'
  const QIMA_WA = process.env.NEXT_PUBLIC_QIMA_WA || '2347050477950'

  const rfqId = `RFQ${Date.now().toString().slice(-6)}`
  const waText = `NEW RFQ ${rfqId}: ${product.name} ${product.category} x1 to Lagos. Total $${product.appPrice?.toFixed(2)}. QUOTE NEEDED: Factory Visit N10k + QIMA Inspection. Product: ${product.manufacturer} Verified by AfricanIES`
  const waLink = `https://api.whatsapp.com/send/?phone=${ADMIN_WA}&text=${encodeURIComponent(waText)}`

  return <div className="max-w-3xl mx-auto p-4">
    <Link href="/" className="text-sm underline">← Back to Marketplace</Link>
    <h1 className="text-2xl font-black mt-3">{product.name}</h1>
    <p className="text-sm opacity-70">{product.manufacturer} • {product.category} • Sourced by {product.sourcedBy}</p>
    <div className="mt-4 border rounded-xl p-4">
      <div className="font-black text-xl">₦{(product.appPrice*1500).toLocaleString()} • ${product.appPrice.toFixed(2)} verified</div>
      <div className="text-xs opacity-60 mt-1">Includes: 15% logistics + 5% platform + 3% sourcing + 1% affiliate + 2% field agent = 26% markup. Escrow 1% + Insurance 1% disabled for MVP. MoMo 30/40/30% disabled.</div>
      <div className="mt-3 text-xs space-y-1">
        <div>Logistics: {product.logisticsStatus} (Guarantor: AfricanIES)</div>
        <div>Status: {product.status} • Proofs: {Object.values(product.proofs||{}).filter(Boolean).length}/5</div>
      </div>
      <a href={waLink} target="_blank" className="mt-4 block w-full bg-green-600 text-white rounded-lg py-2.5 text-center text-sm font-bold">Request RFQ via WhatsApp ({ADMIN_WA})</a>
      <p className="text- opacity-60 mt-2">RFQ {rfqId} • Paystack Checkout • No factory leak • No Pay on Delivery • Uses NEXT_PUBLIC_ADMIN_WA={ADMIN_WA}</p>
    </div>
  </div>
}
