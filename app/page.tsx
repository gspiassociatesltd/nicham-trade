"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  {id:'1', name:'Solar Incubator 500 Eggs', desc:'Hatch 500 chicks with sun. No NEPA.', cat:'Farm & Agro', letter:'S'},
  {id:'2', name:'Solar Corn Sheller', desc:'Shell corn 500kg/hour with solar.', cat:'Farm & Agro', letter:'S'},
  {id:'3', name:'Solar Oil Press Machine', desc:'Press groundnut oil with solar.', cat:'Farm & Agro', letter:'S'},
  {id:'9', name:'Cutlass + Shovel Set', desc:'Farm hand tools set.', cat:'Hand Tools', letter:'C'},
  {id:'10', name:'Solar Welding Machine', desc:'Weld gates with solar 200A.', cat:'Hand Tools', letter:'S'},
]

export default function Home(){
  const [cat,setCat]=useState('All')
  const [aff,setAff]=useState('')
  useEffect(()=>{
    const ref = new URLSearchParams(window.location.search).get('ref')
    if(ref){ localStorage.setItem('nicham_affiliate', ref); setAff(ref) }
    else { const saved = localStorage.getItem('nicham_affiliate'); if(saved) setAff(saved) }
  },[])
  const filtered = PRODUCTS.filter(p=> cat==='All' || p.cat===cat)

  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      {/* Header Premium */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-green-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <div className="font-black text-2xl text-green-900 tracking-tight">NiChAm Trade V114 RFQ Tracking</div>
              <div className="text- text-gray-500 mt-1 max-w-3xl">No prices — Request for Quote only • Platform earns 3% if Discovery → Accepted by AfricanIES/QIMA • Affiliate 1% perpetual + Field 2% from platform 5%</div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link href="/orders" className="bg-black text-white text-xs px-4 py-2 rounded-full font-bold shadow">Orders / RFQs</Link>
              <Link href="/agent" className="bg-yellow-400 text-black text-xs px-4 py-2 rounded-full font-bold">Agent Dashboard</Link>
              <Link href="/affiliate" className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full font-bold">Affiliate</Link>
              <Link href="/admin" className="bg-white border text-xs px-4 py-2 rounded-full font-bold">Admin Vault</Link>
            </div>
          </div>
        </div>
      </header>

      {aff && <div className="bg-purple-600 text-white text-center text-xs py-2 font-bold">Referred by Affiliate {aff} — 1% perpetual from platform 5%</div>}

      <div className="max-w-6xl mx-auto p-4">
        {/* How Nicham knows - Beautiful Card */}
        <div className="bg-white rounded- border border-green-100 p-6 shadow-sm mt-4">
          <div className="text-center font-black text-green-700 text-sm">How Nicham knows who is involved:</div>
          <div className="grid md:grid-cols-3 gap-3 mt-4 text- leading-relaxed">
            <div className="bg-green-50 rounded-2xl p-3 border border-green-100"><span className="font-black">Affiliate:</span>?ref=CODE in URL → localStorage nicham_affiliate → RFQ includes affiliateCode → 1% from platform 5% (Platform net 4%)</div>
            <div className="bg-yellow-50 rounded-2xl p-3 border border-yellow-100"><span className="font-black">Field Agent:</span> Agent Code field in RFQ form → if empty no agent → if filled 2% from platform 5% (Platform net 3%)</div>
            <div className="bg-[#FFFEF5] rounded-2xl p-3 border border-yellow-100"><span className="font-black">Sourcing:</span> Admin selects SourcedBy (Discovery→Platform earns 3% vs AfricanIES/Betterluck all-in vs External 3% to external) • Visit Fee: N10k deductible</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          {['All','Farm & Agro','Hand Tools'].map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={cat===c?'bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold shadow':'bg-white border border-gray-200 text-xs px-5 py-2.5 rounded-full font-bold hover:bg-gray-50'}>{c}</button>
          ))}
        </div>

        {/* Products Grid Beautiful */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded- border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="h-36 bg-gradient-to-br from-[#E8F5D8] to-[#FFF4B8] flex items-center justify-center relative">
                <div className="text-5xl font-black text-green-900">{p.letter}</div>
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur text- px-2 py-1 rounded-full font-bold">{p.cat}</div>
              </div>
              <div className="p-5">
                <div className="font-black text- leading-tight">{p.name}</div>
                <div className="text- text-gray-500 mt-1 leading-snug">{p.desc} • {p.cat} • Verified by AfricanIES</div>
                <div className="mt-3 bg-[#FFFBEB] border border-amber-200 rounded-xl px-3 py-2 text- leading-snug font-medium">5 Proofs Gate: EU Cert, Business License, Video, Test Report, Export History</div>
                <Link href={`/product/${p.id}${aff?`?ref=${aff}`:''}`} className="mt-4 block w-full text-center bg-gradient-to-br from-green-700 to-black text-white rounded-full py-3 text-xs font-black shadow-lg hover:from-black hover:to-green-900 transition-all">Request for Quote</Link>
                <div className="text- text-center text-gray-400 mt-2">No price — AfricanIES quotes Factory + Shipping + Customs + Delivery</div>
              </div>
            </div>
          ))}
        </div>

        <footer className="text- text-center text-gray-400 mt-12 pb-10 leading-relaxed">V115 Beautiful • Sourced and delivered by AfricanIES • Factory Visit Fee N10k deductible • Platform 5% shared (Affiliate 1%+Field 2% from 5%) + Sourcing 3% + Escrow 1% + Insurance 1% = 10% total</footer>
      </div>
    </div>
  )
}
