"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  {id:'1', name:'Solar Incubator 500 Eggs', desc:'Hatch 500 chicks with sun. No NEPA.', cat:'Farm & Agro', letter:'S'},
  {id:'2', name:'Solar Corn Sheller', desc:'Shell corn 500kg/hour with solar.', cat:'Farm & Agro', letter:'S'},
  {id:'3', name:'Solar Oil Press Machine', desc:'Press groundnut oil with solar.', cat:'Farm & Agro', letter:'S'},
  {id:'9', name:'Cutlass + Shovel Set', desc:'Farm hand tools set.', cat:'Hand Tools', letter:'C'},
  {id:'10', name:'Solar Welding Machine', desc:'Weld gates with solar 200A.', cat:'Hand Tools', letter:'C'},
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
    <div className="min-h-screen bg-[#FFFEF5] relative">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Outfit:wght@400;600&display=swap'); *{font-family:'Outfit',sans-serif} h1,h2,.font-black{font-family:'Space Grotesk',sans-serif}`}</style>

      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`url("data:image/svg+xml,[STRIPPED]}}></div>

      <header className="relative bg-white/80 backdrop-blur-xl border-b border-black/5 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-5 text-center">
          <div className="inline-flex items-center gap-3 bg-[#0A2214] text-white px-5 py-2 rounded-full text-xs tracking-widest uppercase">✓ Verified by AfricanIES • QIMA Inspected • No Prices • RFQ Only</div>
          <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-[#0A2214]">NiChAm Trade V114 RFQ Tracking</h1>
          <p className="mt-2 text- text-black/60 max-w-2xl mx-auto">No prices — Request for Quote only • Platform earns 3% if Discovery → Accepted by AfricanIES/QIMA • Affiliate 1% perpetual + Field 2% from platform 5%</p>
          <div className="flex gap-2 justify-center mt-5 flex-wrap">
            <Link href="/orders" className="bg-[#0A2214] text-white text-xs px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-black/20 hover:scale-105 transition">Orders / RFQs</Link>
            <Link href="/agent" className="bg-[#FFD60A] text-black text-xs px-6 py-2.5 rounded-full font-semibold hover:scale-105 transition">Agent Dashboard</Link>
            <Link href="/affiliate" className="bg-[#7C3AED] text-white text-xs px-6 py-2.5 rounded-full font-semibold hover:scale-105 transition">Affiliate</Link>
            <Link href="/admin" className="bg-white border border-black/10 text-black text-xs px-6 py-2.5 rounded-full font-semibold hover:bg-black hover:text-white transition">Admin Vault</Link>
          </div>
        </div>
      </header>

      {aff && <div className="relative bg-[#7C3AED] text-white text-center text-xs py-2.5 tracking-wide">Referred by Affiliate {aff} — 1% perpetual (deducted from platform 5% net 4%)</div>}

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded- border border-black/5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] p-6">
          <div className="text-center text- font-black tracking-[0.2em] uppercase text-[#0A2214]/60 mb-4">How Nicham knows who is involved</div>
          <div className="grid md:grid-cols-3 gap-3 text- leading-relaxed">
            <div className="bg-[#F7F5FF] rounded-2xl p-4 border border-[#7C3AED]/10"><span className="font-bold text-[#7C3AED]">Affiliate:</span>?ref=CODE in URL → localStorage nicham_affiliate → RFQ includes affiliateCode → 1% from platform 5% (Platform net 4%)</div>
            <div className="bg-[#FFFBEB] rounded-2xl p-4 border border-[#FFD60A]/20"><span className="font-bold text-[#92400E]">Field Agent:</span> Agent Code field in RFQ form → if empty no agent → if filled 2% from platform 5% (Platform net 3%)</div>
            <div className="bg-[#F0FDF4] rounded-2xl p-4 border border-[#0A2214]/10"><span className="font-bold text-[#0A2214]">Sourcing:</span> Admin selects SourcedBy dropdown (Discovery→Platform earns 3% vs AfricanIES/Betterluck all-in vs External 3% to external) • Visit Fee: N10k per item type deductible</div>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          {['All','Farm & Agro','Hand Tools'].map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${cat===c?'bg-[#0A2214] text-white shadow-lg':'bg-white border border-black/10 text-black/60 hover:border-black/20'}`}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {filtered.map(p=>(
            <div key={p.id} className="group bg-white rounded- border border-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)] overflow-hidden hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-500">
              <div className="h-32 bg-gradient-to-br from-[#E8F5D8] to-[#FFF4B8] flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-40 h-40 bg-white/40 rounded-full blur-2xl -top-10 -right-10"></div>
                <div className="text-5xl font-black text-[#0A2214] tracking-tighter">{p.letter}</div>
              </div>
              <div className="p-5">
                <div className="font-black text- leading-tight text-[#0A2214]">{p.name}</div>
                <div className="text- text-black/50 mt-2 leading-relaxed">{p.desc} • {p.cat} • Verified by AfricanIES</div>
                <div className="mt-4 bg-[#FFFBEB] border border-[#FFD60A]/30 rounded-xl px-3 py-2.5 text- leading-relaxed text-[#92400E]">5 Proofs Gate: EU Cert, Business License, Video, Test Report, Export History</div>
                <Link href={`/product/${p.id}${aff?`?ref=${aff}`:''}`} className="mt-4 block w-full text-center bg-gradient-to-br from-[#0A2214] to-black text-white rounded-full py-3 text-xs font-bold tracking-wide shadow-lg shadow-black/20 group-hover:shadow-black/30 transition">Request for Quote</Link>
                <div className="text- text-center text-black/30 mt-2.5 uppercase tracking-widest">No price — AfricanIES will quote</div>
              </div>
            </div>
          ))}
        </div>

        <footer className="text- text-center text-black/30 mt-16 pb-10 tracking-wide">V114 • Sourced and delivered by AfricanIES • Factory Visit Fee N10k deductible • Platform 5% shared (Affiliate 1%+Field 2% from 5%) + Sourcing 3% (Platform if Discovery→Accepted, External if China/America not AfricanIES/Betterluck) + Escrow 1% + Insurance 1% = 10% total</footer>
      </div>
    </div>
  )
}
