"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ProductPage(){
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  useEffect(()=>{
    const saved = localStorage.getItem('nicham_v103_products')
    if(saved){
      try{
        const list = JSON.parse(saved)
        const found = list.find((p:any)=> p.id===params.id)
        if(found) setProduct(found)
      }catch{}
    }
  },[params.id])
  if(!product) return <div className="p-6">Loading product {params.id as string}... <Link href="/" className="underline">Back to Home</Link></div>
  return <div className="max-w-3xl mx-auto p-4">
    <Link href="/" className="text-sm underline">← Back to Marketplace</Link>
    <h1 className="text-2xl font-black mt-3">{product.name}</h1>
    <p className="text-sm opacity-70">{product.manufacturer} • {product.category} • Sourced by {product.sourcedBy}</p>
    <div className="mt-4 border rounded-xl p-4">
      <div>Factory Price: ${product.factoryPrice}</div>
      <div className="font-black text-lg">App Price Inclusive: ${product.appPrice.toFixed(2)} = ₦{(product.appPrice*1500).toLocaleString()}</div>
      <div className="text-xs opacity-60 mt-1">Includes: 15% logistics (AfricanIES ₦10k sourcing + 5% procurement + shipping) + 5% platform + 3% sourcing + 1% insurance</div>
      <div className="mt-3 text-xs space-y-1">
        <div>Logistics: {product.logisticsStatus} {product.guarantor ? '(Guarantor: AfricanIES bears failed inspection)' : ''}</div>
        <div>QIMA Audit: {product.qimaAudit} | PSI: {product.qimaPsi}</div>
        <div>Status: {product.status} • Proofs: {Object.values(product.proofs||{}).filter(Boolean).length}/5</div>
      </div>
      <button className="mt-4 w-full bg-black text-white rounded-lg py-2">Order with Pay on Arrival (10% commitment via MoMo)</button>
      <p className="text-[11px] opacity-60 mt-2">Pay 10% now, balance on arrival at AfricanIES office after seeing goods + QIMA certificate. If QIMA fails, AfricanIES bears inspection cost and sources alternative free.</p>
    </div>
  </div>
}
