"use client"
import { useState } from 'react'
import Link from 'next/link'
const PRODUCTS = [
  {id:'1', name:'Solar Incubator 500 Eggs', desc:'Hatch 500 chicks with sun. No NEPA.', price:450000, cat:'Farm & Agro', emoji:'🥚'},
  {id:'2', name:'Solar Corn Sheller', desc:'Shell corn fast with solar. 500kg/hour.', price:180000, cat:'Farm & Agro', emoji:'🌽'},
  {id:'3', name:'Solar Oil Press Machine', desc:'Press groundnut oil with solar.', price:220000, cat:'Farm & Agro', emoji:'🫒'},
  {id:'4', name:'Solar Veg Dryer 100kg', desc:'Dry tomatoes, pepper, meat clean.', price:150000, cat:'Farm & Agro', emoji:'🌶️'},
  {id:'5', name:'Caustic Soda 25kg', desc:'Industrial grade for soap.', price:45000, cat:'Industrial Chemicals', emoji:'🧪'},
  {id:'6', name:'Solar Fan 16 inch', desc:'Cool home with solar.', price:65000, cat:'Home & Kitchen', emoji:'🌀'},
  {id:'7', name:'Hammer 2kg', desc:'Heavy duty hand tool.', price:8000, cat:'Hand Tools', emoji:'🔨'},
  {id:'8', name:'Solar Drill Machine', desc:'Drill without NEPA.', price:55000, cat:'Hand Tools', emoji:'🔧'},
  {id:'9', name:'Cutlass + Shovel Set', desc:'Farm hand tools set.', price:12000, cat:'Hand Tools', emoji:'⛏️'},
  {id:'10', name:'Solar Welding Machine', desc:'Weld gates with solar 200A.', price:180000, cat:'Hand Tools', emoji:'⚡'},
]
export default function Home(){
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const cats = ['All','Farm & Agro','Home & Kitchen','Salon & Beauty','Tailoring & Workshop','Industrial Chemicals','Hand Tools']
  const filtered = PRODUCTS.filter(p=> (p.name.toLowerCase().includes(search.toLowerCase())) && (cat==='All'||p.cat===cat))
  const total = (pr:number)=> Math.round(pr*1.075)
  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-50 border-2 border-green-600 flex items-center justify-center"><span className="text-[10px] font-black text-green-700 text-center">NiChAm<br/>Trade</span></div>
              <div><div className="font-black text-2xl text-green-800">NiChAm Trade</div><div className="text-[10px] tracking-[0.25em] text-gray-500 font-bold">SOLAR + CHEMICALS MARKETPLACE</div></div>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap justify-center">
              <Link href="/orders" className="bg-black text-white text-xs px-5 py-2 rounded-full font-bold">Orders</Link>
              <Link href="/agent" className="bg-yellow-400 text-black text-xs px-5 py-2 rounded-full font-bold">Agent Dashboard</Link>
              <Link href="/affiliate" className="bg-purple-600 text-white text-xs px-5 py-2 rounded-full font-bold">Affiliate</Link>
              <Link href="/admin" className="bg-white border text-xs px-4 py-2 rounded-full">Admin</Link>
            </div>
          </div>
        </div>
        <div className="bg-green-600 text-white text-center text-xs py-2 font-semibold">Secure Trading via MTN Escrow | Traders & Farmers Marketplace</div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white border border-green-100 rounded-2xl p-4 text-center shadow-sm">
          <div className="text-green-700 font-bold text-sm">Welcome to NiChAm Trade, type the product you want into the search box and click Search.</div>
          <div className="text-[11px] text-gray-500 mt-1">Marketplace for Manufacturers to sell, farmers and traders to buy. Agent helps those who cannot read or write English.</div>
        </div>
        <div className="bg-white rounded-2xl p-2 flex gap-2 mt-4 shadow-sm border">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Type product e.g. Caustic Soda, Solar Fan, Hand Tools..." className="flex-1 bg-gray-50 rounded-full px-5 py-3 text-sm outline-none"/>
          <button className="bg-green-600 text-white px-8 rounded-full text-sm font-bold">Search</button>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {cats.map(c=>(<button key={c} onClick={()=>setCat(c)} className={`text-xs px-4 py-2 rounded-full border font-medium whitespace-nowrap ${cat===c?'bg-black text-white border-black':'bg-white'}`}>{c}</button>))}
        </div>
        <div className="text-xs text-gray-500 mt-3">Showing: {cat} ({filtered.length})</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {filtered.map(p=>(<div key={p.id} className="bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition"><div className="w-full h-16 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl flex items-center justify-center text-4xl">{p.emoji}</div><div className="font-bold text-sm mt-3">{p.name}</div><div className="text-[11px] text-gray-500 mt-1">{p.desc}</div><div className="font-black text-sm mt-3">N{p.price.toLocaleString()}</div><div className="text-[10px] text-gray-400">Total (VAT 7.5% inc) N{total(p.price).toLocaleString()}</div><Link href={`/product/${p.id}`} className="mt-3 block w-full text-center bg-gray-900 text-white rounded-full py-2 text-xs font-bold">View</Link></div>))}
        </div>
        <footer className="mt-12 text-center text-[10px] text-gray-400 pb-10">V111 Beautiful + Hand Tools • Secure via MTN Escrow</footer>
      </div>
    </div>
  )
}
