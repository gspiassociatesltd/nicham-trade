"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  {id:'1', name:'Solar Incubator 500 Eggs', desc:'Hatch 500 chicks with sun. No NEPA.', cat:'Farm & Agro', letter:'S'},
  {id:'2', name:'Solar Corn Sheller', desc:'Shell corn 500kg/hour with solar.', cat:'Farm & Agro', letter:'S'},
  {id:'3', name:'Solar Oil Press Machine', desc:'Press groundnut oil with solar.', cat:'Farm & Agro', letter:'S'},
  {id:'9', name:'Cutlass + Shovel Set', desc:'Farm hand tools set.', cat:'Hand Tools', letter:'C'},
  {id:'10', name:'Solar Welding Machine', desc:'Weld gates with solar 200A.', cat:'Hand Tools', letter:'S'},
  {id:'11', name:'Solar Incubator 100 Eggs', desc:'Small family hatchery.', cat:'Farm & Agro', letter:'S'},
  {id:'12', name:'Weeding Hoe Pro', desc:'Durable farm hoe.', cat:'Hand Tools', letter:'C'},
]

export default function Home(){
  const [cat,setCat]=useState('All')
  const [aff,setAff]=useState('')
  const [search,setSearch]=useState('')
  useEffect(()=>{
    const ref = new URLSearchParams(window.location.search).get('ref')
    if(ref){ localStorage.setItem('nicham_affiliate', ref); setAff(ref) }
    else { const saved = localStorage.getItem('nicham_affiliate'); if(saved) setAff(saved) }
  },[])
  const filtered = PRODUCTS.filter(p=> {
    const matchCat = cat==='All' || p.cat===cat
    const matchSearch = search==='' || p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center text-white font-black text-lg">N</div>
              <div>
                <div className="font-black text-">NiChAm Trade</div>
                <div className="text- text-green-700">Verified Solar & Chemicals • Nigeria</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/orders" className="bg-black text-white text-xs px-4 py-2 rounded-full font-bold">Orders</Link>
              <Link href="/admin" className="bg-white border text-xs px-4 py-2 rounded-full font-bold">Admin Vault</Link>
            </div>
          </div>
          <div className="mt-3">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Solar Incubator, Welding Machine..." className="w-full border rounded-full px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:border-green-600" />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-gradient-to-br from-green-700 to-green-900 rounded- p-6 text-white mt-4">
          <h1 className="text-2xl font-black leading-tight">Verified Solar & Farm Equipment for Nigerian Businesses.</h1>
          <p className="text-xs mt-2 opacity-80">All products verified with EU/US standards and inspected by QIMA & Cotecna. Sourced and delivered by AfricanIES.</p>
          <div className="mt-3 flex gap-2 text-"><span className="bg-white/20 px-3 py-1 rounded-full">✓ EU Certified</span><span className="bg-white/20 px-3 py-1 rounded-full">✓ Factory Video</span><span className="bg-white/20 px-3 py-1 rounded-full">✓ Export History</span></div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-sm">Browse by Category</h2>
            <span className="text- text-gray-500">{filtered.length} items</span>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {['All','Farm & Agro','Hand Tools','Solar Power'].map(c=>(
              <button key={c} onClick={()=>setCat(c)} className={cat===c?'bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold whitespace-nowrap':'bg-white border text-xs px-5 py-2.5 rounded-full font-bold whitespace-nowrap hover:bg-gray-50'}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded- border overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-28 bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center relative">
                <div className="text-4xl font-black text-green-800">{p.letter}</div>
                <div className="absolute top-2 right-2 bg-white text- px-2 py-1 rounded-full font-bold shadow-sm">{p.cat}</div>
              </div>
              <div className="p-4">
                <div className="font-bold text- leading-tight">{p.name}</div>
                <div className="text- text-gray-500 mt-1 line-clamp-2">{p.desc} • Verified by AfricanIES</div>
                <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1.5 text- font-medium">5 Proofs: EU Cert • License • Video • Test • Export</div>
                <Link href={`/product/${p.id}${aff?`?ref=${aff}`:''}`} className="mt-3 block w-full text-center bg-green-700 text-white rounded-full py-2.5 text-xs font-bold hover:bg-black">Request for Quote</Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length===0 && <div className="text-center py-16 text-sm text-gray-400">No items in {cat} — try All</div>}

        <footer className="text- text-center text-gray-400 mt-12 pb-8">V116 Clean • No prices displayed • Sourced and delivered by AfricanIES</footer>
      </div>
    </div>
  )
}
