
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
  return <div className="max-w-5xl mx-auto p-3">
    <header className="flex justify-between items-center">
      <div className="flex gap-2 items-center"><div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-xs">☀</div><div className="font-black text-sm">NiChAm Trade</div></div>
      <Link href="/admin" className="text-xs border px-3 py-1 rounded-lg">Admin</Link>
    </header>
    <div className="mt-6">
      <h1 className="font-bold text-sm">Products ({products.length})</h1>
      {products.length===0 ? <div className="mt-3 text-xs opacity-50 border border-dashed rounded-xl p-8 text-center">No products yet.</div> :
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          {products.map((p:any)=><div key={p.id} className="border rounded-xl p-3">
            <div className="font-bold text-sm">{p.name}</div>
            <div className="text-xs opacity-60">{p.manufacturer} • {p.category}</div>
            <div className="text-xs mt-1">${p.factoryPrice} → ${p.appPrice?.toFixed(2)}</div>
            <Link href={`/product/${p.id}`} className="mt-2 block text-xs border rounded py-1 text-center">View</Link>
          </div>)}
        </div>
      }
    </div>
  </div>
}

