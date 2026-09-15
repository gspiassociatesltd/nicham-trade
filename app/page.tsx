'use client'
import { useState, useEffect } from 'react'
import SearchMic from '../components/SearchMic'

const categories = ["All", "Farm & Agro", "Home & Kitchen", "Salon & Beauty", "Tailoring & Workshop", "Industrial Chemicals", "Trending Affiliate"]

const productsMeta = [
  { id: 1, cat: "Farm & Agro", basePrice: 450000, img: "🥚", keywords: "incubator egg 500 hatching chicken solar", name: "Solar Incubator 500 Eggs", desc: "Hatch 500 chicks with sun. No NEPA. Hatchery business.", type: "solar" },
  { id: 2, cat: "Farm & Agro", basePrice: 180000, img: "🌽", keywords: "corn sheller maize thresher solar", name: "Solar Corn Sheller", desc: "Shell corn fast with solar. 500kg per hour. No diesel.", type: "solar" },
  { id: 3, cat: "Farm & Agro", basePrice: 220000, img: "🫒", keywords: "oil press groundnut palm kernel solar", name: "Solar Oil Press Machine", desc: "Press groundnut, palm kernel oil with solar. No fuel.", type: "solar" },
  { id: 10, cat: "Home & Kitchen", basePrice: 75000, img: "🍳", keywords: "cooker solar electric cooking blender", name: "Solar Cooker + Blender", desc: "Cook and blend with sun. No gas. No NEPA.", type: "solar" },
  { id: 12, cat: "Home & Kitchen", basePrice: 58900, img: "🌀", keywords: "rechargeable solar fan tinmo miratec trending affiliate", name: "Rechargeable Solar Fan 16 Panel + 2 Bulbs", desc: "TINMO 18 12 Months Warranty + Panel 2 Bulbs. Best seller.", type: "affiliate" },
  { id: 201, cat: "Industrial Chemicals", basePrice: 8500, img: "💊", keywords: "paracetamol powder pharma", name: "Paracetamol Powder BP/USP", desc: "Pharma grade 99% purity 25kg drum COA. NAFDAC permit required.", type: "chemical", chemPrice: "$5.5/kg MOQ 500kg" },
  { id: 203, cat: "Industrial Chemicals", basePrice: 420000, img: "🧼", keywords: "caustic soda flakes", name: "Caustic Soda Flakes 99%", desc: "NaOH 99% 25kg bag Shandong China. Soap, detergent, textile.", type: "chemical", chemPrice: "$420/ton MOQ 5 tons" },
  { id: 204, cat: "Industrial Chemicals", basePrice: 180000, img: "🧪", keywords: "hydrochloric acid", name: "Hydrochloric Acid 31-33%", desc: "HCl 31% 30kg jerry can industrial grade.", type: "chemical", chemPrice: "$180/ton MOQ 10 tons" },
  { id: 211, cat: "Industrial Chemicals", basePrice: 280000, img: "🌊", keywords: "soda ash", name: "Soda Ash Light", desc: "Na2CO3 99.2% 50kg bag.", type: "chemical", chemPrice: "$280/ton MOQ 10 tons" },
]

export default function Home(){
  const [query,setQuery]=useState('')
  const [cat,setCat]=useState('All')
  const [showTut,setShowTut]=useState(false)
  useEffect(()=>{
    try{
      const msg=new SpeechSynthesisUtterance('Welcome to Nicham Trade, type the product you want into the search box and click search or click the microphone and say the name of the product you want')
      msg.lang='en-NG'
      window.speechSynthesis.speak(msg)
    }catch{}
  },[])
  const filtered=productsMeta.filter(p=>{
    const q=query.toLowerCase()
    const matchQ=!q|| p.keywords.toLowerCase().includes(q)|| p.name.toLowerCase().includes(q)
    const matchC=cat==='All'||p.cat===cat
    return matchQ&&matchC
  })
  const calcPoints=(price:number, type:string)=>{ if(type==='chemical') return 0; return Math.round(price*0.01) }
  return (
    <main className="min-h-screen bg-[#f6f7e8]">
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="logo" className="w-16 h-16 rounded-full border-2 border-green-600 shadow" />
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-green-700">NiChAm Trade</h1>
            </div>
            <div className="text-[11px] font-bold text-gray-600 tracking-widest">SOLAR + CHEMICALS MARKETPLACE</div>
          </div>
          <div className="flex gap-2 mt-3">
            <a href="/orders" className="px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold">Orders</a>
            <a href="/agent" className="px-4 py-1.5 bg-yellow-400 text-black rounded-full text-xs font-bold">Agent - Cash + Points</a>
            <button onClick={()=>setShowTut(true)} className="px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold">How It Works</button>
          </div>
        </div>
        <div className="bg-green-600 text-white text-center py-1.5 text-[11px] font-bold tracking-wide">Green Points on Every Solar Purchase | Voice Ordering | 30/40/30% MTN Escrow | Platform 5%</div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white border-2 border-green-200 rounded-xl p-3 mb-3 text-center">
          <div className="text-sm font-bold text-green-800">Welcome to NiChAm Trade, type the product you want into the search box and click Search OR click the microphone 🎙️ and say the name of the product you want.</div>
          <div className="text-[10px] text-gray-500 mt-1">Barka da zuwa - Rubuta sunan kaya | Ka te oruko oja | Pịnye aha ngwa ahịa</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-3 flex gap-2 items-center">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Type product e.g. Caustic Soda, Solar Fan..." className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm outline-none" />
          <button className="px-5 py-2 bg-green-600 text-white rounded-full text-sm font-bold">Search</button>
          <SearchMic onResult={setQuery} />
        </div>
        <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
          {categories.map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border ${cat===c?'bg-black text-white':'bg-white text-gray-700'}`}>{c}</button>
          ))}
        </div>
        <div className="text-xs text-gray-600 mt-2">Showing: {cat} ({filtered.length})</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
          {filtered.map(p=>{
            const isChem=p.type==='chemical'
            const points=calcPoints(p.basePrice, p.type)
            return (
              <a key={p.id} href={`/product/${p.id}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition">
                <div className="text-4xl text-center">{p.img}</div>
                <div className="font-bold text-sm mt-2 line-clamp-2">{p.name}</div>
                <div className="text-[11px] text-gray-600 line-clamp-2">{p.desc}</div>
                {isChem ? (
                  <div className="mt-2"><div className="text-sm font-black text-green-700">{p.chemPrice}</div></div>
                ):(
                  <div className="mt-2">
                    <div className="text-sm font-black">N{p.basePrice.toLocaleString()}</div>
                    <div className="text-[10px] text-green-700 font-bold">+ {points} Green Points</div>
                    <div className="text-[10px] text-gray-500">Total (VAT 7.5% inclusive) N{Math.round(p.basePrice*1.075).toLocaleString()}</div>
                  </div>
                )}
              </a>
            )
          })}
        </div>
      </div>
      {showTut && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black">NiChAm Trade - How It Works</h2>
              <button onClick={()=>setShowTut(false)} className="text-xl">✕</button>
            </div>
            <div className="mt-4 space-y-4 text-xs">
              <div className="bg-green-50 p-3 rounded-xl"><div className="font-bold">1. How to Use (Buyer)</div><div className="mt-1">Type product or mic say name. Click YES. Pay MTN MoMo escrow. AfricanIES delivers. Confirm → Points.</div></div>
              <div className="bg-yellow-50 p-3 rounded-xl"><div className="font-bold">2. Agent - Cash + Points</div><div className="mt-1">Save Name+MoMo. Help farmer. Earn 2% cash via MTN Disbursement same time seller paid (30/40/30%). N193,500 → N3,870 cash + 1935 pts.</div></div>
              <div className="bg-blue-50 p-3 rounded-xl"><div className="font-bold">3. Affiliate</div><div className="mt-1">Share link /?ref=CODE. Earn cash+points. Chemicals $3-5/ton perpetual.</div></div>
              <div className="bg-purple-50 p-3 rounded-xl"><div className="font-bold">4. Sourcing Agent China/USA</div><div className="mt-1">Find factory, COA, MOQ. Earn 3% per ton after B/L. Paid via Juicyway Naira→CNY Alipay, Grey Naira→USD. MTN cannot forex due CBN.</div></div>
              <div className="bg-orange-50 p-3 rounded-xl"><div className="font-bold">5. Seller (Chemicals)</div><div className="mt-1">List chemical with COA, $/ton, MOQ. Buyer pays MTN Escrow. Split: Platform 5%, AfricanIES 15%, Seller 75%, Agent 2%, Sourcing 3%.</div></div>
              <div className="bg-gray-50 p-3 rounded-xl border"><div className="font-bold">6. Payments - Platform NOT holding, Forex via Fintech</div><div className="mt-1">Buyer→MTN Escrow→Stage 30/40/30% on AfricanIES confirm→MTN auto-split: Platform→Flutterwave, Local→MoMo, China→Juicyway, USA→Grey.</div></div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
