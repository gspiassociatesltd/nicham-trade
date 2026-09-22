"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
export const dynamic='force-dynamic'
const FALLBACK=[
  {id:'4', name:'Glyphosate 360SL Herbicide 20L', cat:'Agro Chemicals', status:'Approved'},
  {id:'5', name:'NPK 20-10-10 Fertilizer 50kg', cat:'Fertilizers', status:'Approved'},
  {id:'6', name:'Caustic Soda Flakes 25kg', cat:'Industrial Chemicals', status:'Approved'},
]
export default function Home(){
  const [products,setProducts]=useState<any[]>(FALLBACK)
  const [cat,setCat]=useState('All')
  const [search,setSearch]=useState('')
  useEffect(()=>{ const saved=localStorage.getItem('nicham_v103_products'); if(saved){ try{ const list=JSON.parse(saved); const approved=list.filter((p:any)=>p.status==='Approved'); if(approved.length>0) setProducts(approved) }catch{} } },[])
  const filtered=products.filter((p:any)=>(cat==='All'||p.category===cat||p.cat===cat)&&(search===''||p.name.toLowerCase().includes(search.toLowerCase())))
  return <div className="min-h-screen bg-[#FFFEF5]"><div className="max-w-6xl mx-auto p-4">
    <header className="flex justify-between items-center bg-white border rounded-2xl p-4 shadow-sm"><div className="flex gap-3 items-center"><div className="w-11 h-11 bg-green-700 rounded-xl flex items-center justify-center text-white font-black">N</div><div><div className="font-black">NiChAm Trade — Chemicals Traction</div><div className="text- text-green-700">Verified • No Admin Link • Cap 1+2+3</div></div></div><Link href="/orders" className="text-xs bg-black text-white px-5 py-2.5 rounded-full font-bold">My RFQs</Link></header>
    <div className="mt-4 bg-gradient-to-br from-green-700 to-green-900 rounded- p-6 text-white"><h1 className="text-2xl font-black">Verified Agro & Industrial Chemicals + Solar Farm Equipment</h1><p className="text-xs mt-2 opacity-80">Bulk paste + brochure → auto tabs + trending + price comparison vs local source before forwarding to buyer.</p></div>
    <div className="mt-6 flex gap-2 overflow-x-auto pb-2">{['All','Agro Chemicals','Industrial Chemicals','Fertilizers','Farm & Agro','Solar Power','Hand Tools'].map(c=><button key={c} onClick={()=>setCat(c)} className={cat===c?'bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold whitespace-nowrap':'bg-white border text-xs px-5 py-2.5 rounded-full font-bold whitespace-nowrap'}>{c}</button>)}</div>
    <div className="mt-3"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="w-full border rounded-full px-4 py-2.5 text-sm bg-white" /></div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">{filtered.map((p:any)=><div key={p.id} className="bg-white rounded- border p-4"><div className="h-20 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl flex items-center justify-center text-xl font-black text-green-800">{p.name.charAt(0)}</div><div className="font-bold text-sm mt-3">{p.name}</div><div className="text- text-gray-500 mt-1">{p.cat||p.category} • Verified</div><Link href={`/product/${p.id}`} className="mt-3 block text-center bg-green-700 text-white rounded-full py-2.5 text-xs font-bold">Request for Quote</Link></div>)}</div>
    <footer className="text- text-center text-gray-400 mt-12 pb-10">V200 Cap 1+2+3 • No prices • No commission leak • No admin link • Price comparison vs local before forwarding</footer>
  </div></div>
}
