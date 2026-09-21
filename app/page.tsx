"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
const PRODUCTS = [
  {id:'1', name:'Solar Incubator 500 Eggs', desc:'Hatch 500 chicks with sun', cat:'Farm & Agro', emoji:'🥚'},
  {id:'9', name:'Cutlass + Shovel Set', desc:'Farm hand tools set', cat:'Hand Tools', emoji:'⛏️'},
]
export default function Home(){
  const [cat,setCat]=useState('All')
  const [aff,setAff]=useState('')
  useEffect(()=>{
    const ref = new URLSearchParams(window.location.search).get('ref')
    if(ref){localStorage.setItem('nicham_affiliate',ref); setAff(ref)}
    else {const s=localStorage.getItem('nicham_affiliate'); if(s) setAff(s)}
  },[])
  const filtered = PRODUCTS.filter(p=>cat==='All'||p.cat===cat)
  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white p-4 text-center border-b">
        <div className="font-black">NiChAm Trade V114 RFQ</div>
        <div className="text-">No prices — Request for Quote only • Affiliate {aff||'None'} 1% perpetual from platform 5%</div>
        <div className="flex gap-2 justify-center mt-2">
          <Link href="/orders" className="bg-black text-white text-xs px-3 py-1 rounded-full">Orders/RFQs</Link>
          <Link href="/admin" className="text-xs border px-3 py-1 rounded-full">Admin Vault</Link>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-2">{['All','Farm & Agro','Hand Tools'].map(c=><button key={c} onClick={()=>setCat(c)} className={cat===c?'bg-black text-white text-xs px-2 py-1 rounded-full':'bg-white border text-xs px-2 py-1 rounded-full'}>{c}</button>)}</div>
        <div className="grid grid-cols-2 gap-3 mt-4">{filtered.map(p=><div key={p.id} className="bg-white rounded-xl p-3 border"><div className="text-2xl">{p.emoji}</div><div className="font-bold text-sm">{p.name}</div><div className="text-xs">{p.cat}</div><Link href={`/product/${p.id}${aff?`?ref=${aff}`:''}`} className="mt-2 block bg-green-600 text-white text-xs px-3 py-1 rounded-full text-center">Request for Quote</Link></div>)}</div>
        <div className="text- text-center text-gray-400 mt-4">V114 — Platform earns 3% if Discovery→Accepted • Affiliate 1% perpetual + Field 2% deducted from platform 5% • Factory Visit ₦10k deductible • AfricanIES full landed includes Customs+Delivery by default</div>
      </div>
    </div>
  )
}
