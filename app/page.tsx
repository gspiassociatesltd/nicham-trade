"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home(){
  const [products, setProducts] = useState<any[]>([])
  useEffect(()=>{
    const saved = localStorage.getItem('nicham_v103_products')
    if(saved){
      try{
        const list = JSON.parse(saved)
        setProducts(list.filter((p:any)=> p.status==='Approved'))
      }catch{}
    }
  },[])
  return <div className="min-h-screen bg-[#fefce8]/50">
    <div className="max-w-5xl mx-auto p-3">
      <header className="flex justify-between items-center border rounded-xl p-3 bg-white shadow-sm">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">✳</div>
          <div>
            <div className="font-black text-sm">NiChAm Trade</div>
            <div className="text-xs text-green-700">Verified Solar & Chemicals • Nigeria</div>
          </div>
        </div>
        <Link href="/admin" className="text-xs bg-black text-white px-3 py-1.5 rounded-lg">Admin Vault</Link>
      </header>

      <div className="mt-3 border rounded-xl p-5 bg-[#fffff5]">
        <h1 className="text-2xl font-black">Verified Solar & Chemicals for Nigerian Businesses.</h1>
        <p className="mt-1 text-xs opacity-70">All products verified with EU/US standards and inspected by QIMA & Cotecna. Sourced via AfricanIES.</p>
      </div>

      <h2 className="mt-4 font-bold text-xs">Approved Products ({products.length})</h2>
      
      {products.length===0 ? 
        <div className="mt-8"></div>
      :
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          {products.map((p:any)=><div key={p.id} className="border rounded-xl p-3 bg-white">
            <div className="font-bold text-sm">{p.name}</div>
            <div className="text-xs opacity-60">{p.manufacturer} • {p.category}</div>
            <div className="text-xs mt-1">${p.factoryPrice} → ${p.appPrice?.toFixed(2)}</div>
            <Link href={`/product/${p.id}`} className="mt-2 block text-xs border rounded py-1 text-center">View</Link>
          </div>)}
        </div>
      }

      <footer className="mt-16 text-center text-[11px] opacity-40 pb-10">V106 English Only • No Pay on Delivery text • Admin at /admin</footer>
    </div>
  </div>
}
