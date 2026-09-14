'use client'
import { useState, useEffect } from 'react'
import SearchMic from '../components/SearchMic'

const productsMeta = [
  { id: 1, basePrice: 400000, img: "🚲", keywords: "cargo bike solar 500w bike", name: "Solar Cargo Bike 500W", desc: "Carry 200kg with solar. No fuel. Save N500k fuel yearly." },
  { id: 2, basePrice: 280000, img: "💧", keywords: "water pump solar irrigation farm", name: "Solar Water Pump 1HP", desc: "Pump water from river or borehole. No diesel." },
  { id: 3, basePrice: 240000, img: "❄️", keywords: "freezer cold fish solar", name: "Solar Freezer 200L", desc: "Keep fish cold with no NEPA. Solar + battery 24hrs." },
  { id: 4, basePrice: 2200000, img: "⚡", keywords: "home system mini grid light", name: "Solar Mini-Grid Home System", desc: "Light, TV, fan, phone charge. No darkness." },
  { id: 5, basePrice: 3400000, img: "🚜", keywords: "tractor solar farm", name: "Solar Tractor 25HP", desc: "Farm with sun, no diesel." },
  { id: 6, basePrice: 130000, img: "☀️", keywords: "dryer tomatoes pepper solar", name: "Solar Dryer 100kg", desc: "Dry tomatoes, pepper, fish with sun." },
  { id: 7, basePrice: 160000, img: "🛶", keywords: "boat engine solar fishing", name: "Solar Boat Engine", desc: "Fishing boat engine with solar. No fuel." },
  { id: 8, basePrice: 1050000, img: "🚤", keywords: "ferry 12 seater solar", name: "Solar Ferry 12 Seater", desc: "Carry 12 people with sun. No fuel." },
  { id: 9, basePrice: 250000, img: "🚲‍♂️", keywords: "e-bike collapsible solar", name: "Solar E-Bike Collapsible", desc: "Fold and carry. Solar charge." },
]

function calcTotal(base: number) {
  const competitivePrice = Math.round(base * 0.98)
  const vat = Math.round(competitivePrice * 0.075)
  const escrow = Math.round(competitivePrice * 0.01)
  return competitivePrice + vat + escrow
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState(productsMeta)
  const [greenPoints, setGreenPoints] = useState(0)

  useEffect(() => {
    localStorage.setItem('nicham_lang', 'en')
    const pts = localStorage.getItem('green_points')
    if (pts) setGreenPoints(parseInt(pts))
  }, [])

  useEffect(() => {
    if (!searchTerm) { setFiltered(productsMeta); return }
    const low = searchTerm.toLowerCase()
    setFiltered(productsMeta.filter(p=> p.keywords.includes(low) || p.name.toLowerCase().includes(low) ))
  }, [searchTerm])

  const speakWelcome = () => {
    try {
      window.speechSynthesis.cancel()
      const text = "Welcome to Nicham Solar Market. Sun shining on Nigeria. Type the product you want in the search box then click search, or click the microphone and say the name of the product you want. You can order without typing by voice. Agents can help those who cannot read or write."
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-NG'
      u.rate = 0.85
      window.speechSynthesis.speak(u)
    } catch {}
  }

  return (
    <main className="min-h-screen bg-[#f6f7e8]">
      <header className="bg-black text-white p-4">
        <div className="flex items-center justify-center gap-3">
          <img src="/logo.png" alt="NiChAm Solar Market - Sun shining on Nigeria badge" className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-full bg-white p-1" />
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-wide">NiChAm Solar Market</h1>
            <div className="text-yellow-300 text-[10px] md:text-xs">Sun Shining on Nigeria | GSPI/NiChAm Platform | AfricanIES Delivers Nationwide</div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-2 text-[11px]">
          <a href="/orders" className="text-white underline">My Orders</a>
          <a href="/agent" className="text-yellow-300 underline font-bold">Agent Dashboard</a>
          <span className="text-green-300">🌱 Green Points: {greenPoints.toLocaleString()}</span>
        </div>
      </header>

      <div className="bg-green-700 text-white text-center py-2 text-xs font-bold">
        🌱 Green Points on Every Solar Purchase | Voice Ordering Enabled | Zero Budget - No Typing Needed | Platform: GSPI/NiChAm
      </div>

      <div className="max-w-5xl mx-auto p-4 text-center">
        <h2 className="text-lg font-bold text-gray-800 mt-4">Everything Solar - Solar Cargo Bikes, Pumps, Freezers, Mini-Grids, Tractors e.t.c.</h2>
        <div className="text-sm text-gray-600 mt-1">Buyer orders → Escrow with MTN MoMo → AfricanIES collects & delivers → Buyer confirms → MoMo pays manufacturer</div>

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 max-w-2xl mx-auto">
          <div className="font-bold text-sm">Welcome - Voice Ordering - No Typing Needed</div>
          <div className="text-[11px] text-gray-600 mt-1">Click microphone 🎤 and say product name. Or click YES to order by voice. For those who cannot read/write English, ask Agent to help you.</div>
          <button onClick={speakWelcome} className="mt-2 px-5 py-2 bg-black text-white rounded-full text-xs font-bold">🔊 Hear Welcome</button>
        </div>

        <div className="mt-4 flex justify-center gap-2 max-w-xl mx-auto">
          <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Type or speak product e.g. Solar Bike, Pump..." className="flex-1 px-4 py-2.5 rounded-full border-2 border-black text-sm" />
          <button className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold">🔍 Search</button>
          <SearchMic lang="en" onResult={(txt:string)=>setSearchTerm(txt)} />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8 text-left">
          {filtered.map(p=>{
            const total = calcTotal(p.basePrice)
            return (
              <a key={p.id} href={`/product/${p.id}`} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition border-2 border-transparent hover:border-green-500">
                <div className="text-4xl">{p.img}</div>
                <div className="font-black mt-2 text-sm">{p.name}</div>
                <div className="text-[11px] text-gray-600 mt-1 line-clamp-3">{p.desc}</div>
                <div className="text-green-700 font-black mt-3 text-base">₦{total.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500">+ {Math.round(total*0.01).toLocaleString()} Green Points | VAT+Escrow included</div>
              </a>
            )
          })}
        </div>

        <div className="mt-10 bg-black text-white rounded-2xl p-4 text-left max-w-2xl mx-auto">
          <div className="font-black text-sm">🤝 Agent Model - For those who cannot read/write</div>
          <div className="text-xs mt-1 text-gray-300">Village agent with smartphone helps farmer: Farmer says what he wants → Agent clicks YES & pays with farmer MoMo → Farmer gets SMS Order ID → AfricanIES delivers → Agent earns Green Points (1% of order). Zero budget, no typing needed.</div>
          <a href="/agent" className="mt-2 inline-block px-4 py-1.5 bg-yellow-400 text-black rounded-full text-xs font-black">Open Agent Dashboard</a>
        </div>
      </div>
    </main>
  )
}
