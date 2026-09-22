"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  {id:'1', name:'Solar Incubator 500 Eggs', desc:'Hatch 500 chicks with sun. No NEPA.', cat:'Farm & Agro'},
  {id:'2', name:'Solar Corn Sheller', desc:'Shell corn 500kg/hour with solar.', cat:'Farm & Agro'},
  {id:'3', name:'Solar Oil Press Machine', desc:'Press groundnut oil with solar.', cat:'Farm & Agro'},
  {id:'9', name:'Cutlass + Shovel Set', desc:'Farm hand tools set.', cat:'Hand Tools'},
  {id:'10', name:'Solar Welding Machine', desc:'Weld gates with solar 200A.', cat:'Hand Tools'},
]

export default function Home(){
  const [cat,setCat]=useState('All')
  const [aff,setAff]=useState('')

  useEffect(()=>{
    const ref = new URLSearchParams(window.location.search).get('ref')
    if(ref){
      localStorage.setItem('nicham_affiliate', ref)
      localStorage.setItem('nicham_affiliate_first_seen', Date.now().toString())
      setAff(ref)
    } else {
      const saved = localStorage.getItem('nicham_affiliate')
      if(saved) setAff(saved)
    }
  },[])

  const filtered = PRODUCTS.filter(p=> cat==='All' || p.cat===cat)

  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white p-4 text-center border-b sticky top-0 z-10">
        <div className="font-black text-xl text-green-800">NiChAm Trade V114 RFQ Tracking</div>
        <div className="text- text-gray-500">No prices — Request for Quote only • Platform earns 3% if Discovery → Accepted by AfricanIES/QIMA • Affiliate 1% perpetual + Field 2% from platform 5%</div>
        <div className="flex gap-2 justify-center mt-2 flex-wrap">
          <Link href="/orders" className="bg-black text-white text-xs px-4 py-1.5 rounded-full">Orders / RFQs</Link>
          <Link href="/agent" className="bg-yellow-400 text-black text-xs px-4 py-1.5 rounded-full">Agent Dashboard</Link>
          <Link href="/affiliate" className="bg-purple-600 text-white text-xs px-4 py-1.5 rounded-full">Affiliate</Link>
          <Link href="/admin" className="text-xs border px-3 py-1 rounded-full">Admin Vault</Link>
        </div>
      </header>

      {aff && <div className="bg-purple-100 text-center text-xs py-1">Referred by Affiliate {aff} — 1% perpetual (deducted from platform 5%, no extra cost to you)</div>}

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white border border-green-100 rounded-2xl p-3 text-center">
          <div className="text-sm font-bold text-green-700">How Nicham knows who is involved:</div>
          <div className="text- text-gray-600 mt-1">Affiliate:?ref=CODE in URL → localStorage nicham_affiliate → RFQ includes affiliateCode → 1% from platform 5% (Platform net 4%) • Field Agent: Agent Code field in RFQ form → if empty no agent → if filled 2% from platform 5% (Platform net 3%) • Sourcing: Admin selects SourcedBy dropdown (Discovery→Platform earns 3% vs AfricanIES/Betterluck all-in vs External 3% to external) • Visit Fee: N10k per item type deductible from shipping</div>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {['All','Farm & Agro','Hand Tools'].map(c=><button key={c} onClick={()=>setCat(c)} className={cat===c?'bg-black text-white text-xs px-3 py-1.5 rounded-full':'bg-white border text-xs px-3 py-1.5 rounded-full'}>{c}</button>)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-2xl p-4 border shadow-sm">
              <div className="w-full h-16 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl flex items-center justify-center text-2xl font-black text-green-700">{p.name[0]}</div>
              <div className="font-bold text-sm mt-3">{p.name}</div>
              <div className="text- text-gray-500 mt-1">{p.desc} • {p.cat} • Verified by AfricanIES</div>
              <div className="text- bg-yellow-50 border border-yellow-200 rounded px-2 py-1 mt-2">5 Proofs Gate: EU Cert, Business License, Video, Test Report, Export History</div>
              <Link href={`/product/${p.id}${aff?`?ref=${aff}`:''}`} className="mt-3 block w-full text-center bg-green-600 text-white rounded-full py-2.5 text-xs font-bold">Request for Quote</Link>
              <div className="text- text-center text-gray-400 mt-1">No price — AfricanIES will quote Factory + Shipping + Customs + Delivery</div>
            </div>
          ))}
        </div>

        <footer className="text- text-center text-gray-400 mt-8 pb-10">
          V114 RFQ Tracking • Sourced and delivered by AfricanIES • Factory Visit Fee N10k per item type deductible • Platform 5% shared (Affiliate 1% perpetual + Field 2% deducted from 5%) + Sourcing 3% (Platform if Discovery→Accepted, External if China/America not AfricanIES/Betterluck) + Escrow 1% + Insurance 1% = 10% total to buyer
        </footer>
      </div>
    </div>
  )
}
