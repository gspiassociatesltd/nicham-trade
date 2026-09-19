
"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Home(){
  const [products, setProducts] = useState<any[]>([])
  useEffect(()=>{
    const saved = localStorage.getItem('nicham_v103_products')
    if(saved){
      try{
        const list = JSON.parse(saved)
        const approved = list.filter((p:any)=> p.status==='Approved')
        if(approved.length>0){ setProducts(approved); return }
      }catch{}
    }
    supabase.from('products').select('*').eq('status','approved').limit(20).then(({data})=> setProducts(data||[]))
  },[])
  return <div className="max-w-5xl mx-auto p-4">
    <header className="flex justify-between items-center border rounded-xl p-3 sticky top-2 z-10 bg-white">
      <div className="flex gap-2 items-center"><div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">☀</div><div><div className="font-black">NiChAm Trade</div><div className="text-xs text-green-700">Verified Solar & Chemicals • Nigeria</div></div></div>
      <Link href="/admin" className="text-xs bg-black text-white px-3 py-1.5 rounded-lg">Admin Vault</Link>
    </header>
    <div className="mt-4 border rounded-xl p-5">
      <h1 className="text-3xl font-black">Verified Solar & Chemicals for Nigerian Businesses.</h1>
      <p className="mt-2 text-sm opacity-70">All products verified with EU/US standards and inspected by QIMA & Cotecna. Sourced via AfricanIES.</p>
    </div>
    <h2 className="mt-6 font-bold text-sm">Approved Products ({products.length})</h2>
    <div className="grid md:grid-cols-3 gap-3 mt-3">
      {products.map((p:any)=><div key={p.id} className="border rounded-xl p-3 bg-white">
        <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-xs">{p.category}</div>
        <div className="font-bold mt-2 text-sm">{p.name}</div>
        <div className="text-xs opacity-60">{p.manufacturer}</div>
        <div className="text-xs mt-1">${p.factoryPrice} → ${p.appPrice?.toFixed(2)}</div>
        <Link href={`/product/${p.id}`} className="mt-2 block border rounded py-1 text-xs text-center">View</Link>
      </div>)}
    </div>
    <footer className="mt-8 text-center text-xs opacity-50">V106 English Only • No Pay on Delivery text • Admin at /admin</footer>
  </div>
}

