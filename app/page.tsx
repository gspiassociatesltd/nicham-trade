"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  {id:'1', name:'Solar Incubator 500 Eggs', cat:'Farm & Agro', letter:'S'},
  {id:'2', name:'Solar Corn Sheller', cat:'Farm & Agro', letter:'S'},
  {id:'3', name:'Solar Oil Press', cat:'Farm & Agro', letter:'S'},
  {id:'4', name:'Glyphosate 360SL Herbicide', cat:'Chemicals', letter:'C'},
  {id:'5', name:'NPK 20-10-10 Fertilizer', cat:'Chemicals', letter:'C'},
  {id:'6', name:'Industrial Caustic Soda', cat:'Chemicals', letter:'C'},
  {id:'9', name:'Cutlass + Shovel Set', cat:'Hand Tools', letter:'T'},
  {id:'10', name:'Solar Welding Machine', cat:'Hand Tools', letter:'S'},
]

export default function Home(){
  const [cat,setCat]=useState('All')
  const [aff,setAff]=useState('')
  const [search,setSearch]=useState('')
  useEffect(()=>{
    const r = new URLSearchParams(window.location.search).get('ref')
    if(r){ localStorage.setItem('nicham_affiliate', r); setAff(r) }
    else { const s = localStorage.getItem('nicham_affiliate'); if(s) setAff(s) }
  },[])
  const filtered = PRODUCTS.filter(p=> (cat==='All'||p.cat===cat) && (search===''||p.name.toLowerCase().includes(search.toLowerCase())))
  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-2 items-center"><div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center text-white font-black">N</div><div><div className="font-black text-sm">NiChAm Trade</div><div className="text- text-green-700">Verified Solar & Chemicals • Nigeria</div></div></div>
          <div className="flex gap-2"><Link href="/orders" className="bg-black text-white text-xs px-4 py-2 rounded-full font-bold">Orders</Link><Link href="/admin" className="bg-white border text-xs px-4 py-2 rounded-full font-bold">Admin Vault</Link></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-3"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Chemicals, Solar Incubator..." className="w-full border rounded-full px-4 py-2.5 text-sm bg-gray-50" /></div>
      </header>
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-gradient-to-br from-green-700 to-green-900 rounded- p-6 text-white"><h1 className="text-2xl font-black">Verified Solar, Chemicals & Farm Equipment for Nigerian Businesses.</h1><p className="text-xs mt-2 opacity-80">All products verified with EU/US standards and inspected by QIMA & Cotecna. Sourced and delivered by AfricanIES.</p></div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">{['All','Farm & Agro','Chemicals','Hand Tools','Solar Power'].map(c=><button key={c} onClick={()=>setCat(c)} className={cat===c?'bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold whitespace-nowrap':'bg-white border text-xs px-5 py-2.5 rounded-full font-bold whitespace-nowrap'}>{c}</button>)}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">{filtered.map(p=><div key={p.id} className="bg-white rounded- border p-4"><div className="h-20 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl flex items-center justify-center text-3xl font-black text-green-800">{p.letter}</div><div className="font-bold text-sm mt-3">{p.name}</div><div className="text- text-gray-500">{p.cat} • Verified by AfricanIES</div><Link href={`/product/${p.id}${aff?`?ref=${aff}`:''}`} className="mt-3 block text-center bg-green-700 text-white rounded-full py-2.5 text-xs font-bold">Request for Quote</Link></div>)}</div>
      </div>
    </div>
  )
}
