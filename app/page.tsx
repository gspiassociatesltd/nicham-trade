"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Home(){
  const [products, setProducts] = useState<any[]>([])

  useEffect(()=>{
    const local = localStorage.getItem('nicham_v103_products')
    if(local){
      try{
        const parsed = JSON.parse(local)
        const approved = parsed.filter((p:any)=> p.status==='Approved')
        if(approved.length>0){ setProducts(approved); return }
      }catch{}
    }
    supabase.from('products').select('*').eq('status','approved').limit(20).then(({data})=> setProducts(data||[]))
  },[])

  return <div className="max-w-5xl mx-auto p-4">
    <header className="flex justify-between items-center border rounded-xl p-3 sticky top-2 z-10 bg-white">
      <div className="flex gap-2 items-center"><div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">☀</div><div><div className="font-black">NiChAm Trade</div><div className="text-xs text-green-700">Verified Solar & Chemicals • Pay on Arrival • Nigeria</div></div></div>
      <div className="flex gap-2"><Link href="/admin" className="text-xs border px-3 py-1.5 rounded-lg">Admin Vault</Link><Link href="/chemicals" className="text-xs bg-black text-white px-3 py-1.5 rounded-lg">Chemicals</Link></div>
    </header>

    <div className="mt-4 border rounded-xl p-5 bg-gradient-to-br from-yellow-50 to-green-50">
      <div className="inline-block bg-white px-3 py-1 rounded-full text-xs font-bold border">• All Nigeria • MTN MoMo Escrow • Pay on Arrival • QIMA Verified</div>
      <h1 className="text-4xl font-black mt-3 leading-[0.9]">Verified <br/><span className="text-green-700">Solar & Chemicals</span><br/>for Nigerian Businesses.</h1>
      <p className="mt-3 text-sm opacity-80">Every product is verified by AfricanIES (₦10k sourcing verification) + QIMA inspection. Pay 10% commitment, balance on arrival after you see goods + QIMA certificate at AfricanIES office.</p>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="bg-white border rounded-lg p-2">📦 Pay on Arrival<br/>See before you pay</div>
        <div className="bg-white border rounded-lg p-2">✅ AfricanIES Verified<br/>₦10k sourcing + 5% procurement</div>
        <div className="bg-white border rounded-lg p-2">🔍 QIMA Inspected<br/>Supplier Audit $500 + PSI $350</div>
        <div className="bg-white border rounded-lg p-2">🛡️ Guarantor<br/>Failed inspection = AfricanIES bears cost</div>
      </div>
    </div>

    <h2 className="mt-6 font-black text-xl">Approved Products — Verified by AfricanIES + QIMA ({products.length})</h2>
    {products.length===0 && <div className="mt-3 border rounded-xl p-6 text-center text-sm opacity-60">No approved products yet. Go to /admin to add products. After you approve with 5 proofs + Logistics Approved by AfricanIES, they appear here.</div>}
    
    <div className="grid md:grid-cols-3 gap-3 mt-3">
      {products.map(p=>{
        const displayName = p.name || p.name_en
        const factoryPrice = p.factoryPrice || p.price_usd || 0
        const appPrice = p.appPrice || p.app_price_usd || 0
        return <div key={p.id} className="border rounded-xl p-3 bg-white">
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-xs">IMG: {p.category}</div>
          <div className="mt-2 flex gap-1"><span className="text-[10px] bg-green-100 px-2 py-0.5 rounded-full">✓ Verified</span><span className="text-[10px] bg-yellow-100 px-2 py-0.5 rounded-full">{p.category}</span><span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded-full">{p.sourcedBy || p.sourced_by}</span></div>
          <div className="font-bold mt-1">{displayName}</div>
          <div className="text-xs opacity-70">{p.manufacturer} • Factory ${factoryPrice} → App ${appPrice.toFixed ? appPrice.toFixed(2) : appPrice} inclusive</div>
          <div className="mt-2 text-xs"><span className="bg-gray-50 border px-2 py-0.5 rounded">Logistics: {p.logisticsStatus || p.logistics_status}</span></div>
          <div className="mt-2 font-black">App ${appPrice.toFixed ? appPrice.toFixed(2) : appPrice} = ₦{((appPrice||0)*1500).toLocaleString()} inclusive</div>
          <div className="text-[10px] opacity-60 mt-1">Factory + 15% logistics (AfricanIES ₦10k + 5% + shipping) + 5% platform + 3% sourcing + 1% insurance</div>
          <Link href={`/product/${p.id}`} className="mt-2 block text-center bg-black text-white rounded-lg py-2 text-sm">View → Order with Pay on Arrival</Link>
        </div>
      })}
    </div>

    <div className="mt-8 border rounded-xl p-4 bg-white">
      <h3 className="font-bold text-sm">How It Works — English Only MVP</h3>
      <ol className="text-xs mt-2 list-decimal pl-4 space-y-1 opacity-80">
        <li>Buyer pays AfricanIES ₦10,000 sourcing fee directly — AfricanIES verifies factory (company visit + recommendation)</li>
        <li>If AfricanIES approves, buyer pays 5% procurement + 10% commitment — AfricanIES pays China factory</li>
        <li>NiChAm books QIMA Supplier Audit $500 (one-time per factory) + PSI $350 per shipment — AfricanIES bears cost if fails (guarantor)</li>
        <li>Ship → Clearing → Arrives AfricanIES office — Buyer sees goods + QIMA certificate, pays balance (Pay on Arrival)</li>
        <li>MTN MoMo escrow holds 10% commitment until buyer confirms delivery</li>
      </ol>
    </div>

    <footer className="mt-8 text-center text-xs opacity-60 pb-10">English Only MVP • Post-MVP: Hausa, Yoruba, Igbo, Pidgin • gspiassociatesltd/nicham-trade • V104 English Only • <a href="/admin" className="underline">Admin Vault</a></footer>
  </div>
}
