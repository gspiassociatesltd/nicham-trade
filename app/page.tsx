'use client'
import { useState, useEffect } from 'react'
import SearchMic from '../components/SearchMic'

const categories = ["All", "Trending Today", "Solar Fans & Power", "Industrial Chemicals"]

const productsMeta = [
  { id: 101, cat: "Trending Today", basePrice: 58900, img: "🌀", keywords: "solar fan", name: "Rechargeable Solar Fan 16 - TRENDING", desc: "Sun King 16 20W Panel 18Hrs. Hottest now.", earn: "Commission N5.3k", affiliate: "https://www.jumia.com.ng/miratec-16-inches-acdc-solar-rechargeable-fan-25w-panel-a-bulb-121549172.html" },
  { id: 102, cat: "Trending Today", basePrice: 135000, img: "📹", keywords: "solar cctv street light", name: "Solar CCTV + Street Light 4G 3in1", desc: "4G SIM no WiFi. Security fear high.", earn: "Commission N13.5k", affiliate: "https://www.jumia.com.ng/generic-v380-pro-solar-street-light-with-cctv-camera-450w-123.html" },
  { id: 1, cat: "Solar Fans & Power", basePrice: 58000, img: "🌀", keywords: "tinmo solar fan", name: "TINMO 18 Solar Fan + Panel", desc: "12 months warranty + 2 bulbs", earn: "N5k", affiliate: "https://www.jumia.com.ng/tinmo-18-inches-rechargeable-standing-fan-12-months-warranty-solar-panel-2-bulbs-401703906.html" },
  { id: 2, cat: "Solar Fans & Power", basePrice: 60999, img: "☀️", keywords: "solar panel", name: "Jinko 300W Solar Panel", desc: "Monocrystalline FAST charging", earn: "Panels boom", affiliate: "https://www.jumia.com.ng/jinko-300watts-24v3648v-monocrystalline-solar-123.html" },
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCat, setSelectedCat] = useState('All')
  const [filtered, setFiltered] = useState(productsMeta)
  const [ref, setRef] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const r = urlParams.get('ref')
    if (r) {
      setRef(r)
      localStorage.setItem('nicham_ref', r)
    }
  }, [])

  useEffect(() => {
    if (selectedCat === 'Industrial Chemicals') { window.location.href = '/chemicals' + (ref ? '?ref='+ref : ''); return }
    let f = productsMeta
    if (selectedCat !== 'All') f = f.filter(p=>p.cat===selectedCat)
    if (searchTerm) {
      const low = searchTerm.toLowerCase()
      f = f.filter(p=> p.keywords.includes(low) || p.name.toLowerCase().includes(low))
    }
    setFiltered(f)
  }, [searchTerm, selectedCat, ref])

  return (
    <main className="min-h-screen bg-[#f6f7e8]">
      <header className="bg-black text-white p-3 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-10 rounded-full bg-white p-1" />
            <div><h1 className="text-base font-black">NiChAm-Trade</h1><div className="text-yellow-300 text-[8px]">Global Trade, Local Delivery</div></div>
          </div>
          <div className="flex gap-1.5 text-[9px] items-center">
            <a href="/chemicals" className="bg-blue-600 text-white px-2.5 py-1.5 rounded-full font-black">Chemicals 15</a>
            <a href="/supplier" className="bg-green-600 text-white px-2.5 py-1.5 rounded-full font-bold">China Supplier</a>
            <a href="/industrial-agent" className="bg-yellow-400 text-black px-2.5 py-1.5 rounded-full font-black animate-pulse">Buyer Agent Perpetual</a>
            <a href="/affiliate" className="bg-white text-black px-2.5 py-1.5 rounded-full font-bold">Affiliate</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex gap-2 mt-2 overflow-x-auto text-[10px]">
          {categories.map(c=>(
            <button key={c} onClick={()=>setSelectedCat(c)} className={`px-3 py-1 rounded-full whitespace-nowrap font-bold border ${selectedCat===c ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300'}`}>{c}</button>
          ))}
        </div>
      </header>
      <div className="bg-blue-700 text-white text-center py-2 text-[11px] font-black">
        NiChAm-Trade: Solar + 15 Industrial Chemicals - China via AfricanIES - Buyer Agent Perpetual {ref ? ' | Ref: ' + ref : ''}
      </div>
      <div className="max-w-6xl mx-auto p-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white border-2 border-yellow-300 rounded-2xl p-4"><div className="font-black text-sm">Solar Market - Earn TODAY</div><div className="text-[11px] mt-1">Fans, CCTV 3in1, Power Stations LiFePO4, Panels, Street Lights. Jumia 9-13% commission.</div></div>
          <div className="bg-white border-2 border-blue-300 rounded-2xl p-4"><div className="font-black text-sm">Industrial Chemicals - 15 Items</div><div className="text-[11px] mt-1">Pharma: Paracetamol, Sorbitol | Commodity: Caustic Soda, HCl, Nitric, Stearic, Acetic, H2O2 | Paint: Natrosol, Calcium Carbonate | Water: Soda Ash, Hypochlorite, PAC, Aluminium Sulphate, Ferric Chloride</div><a href="/chemicals" className="mt-2 inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-[11px] font-black">View Chemicals - WhatsApp Quote</a></div>
        </div>
        <div className="mt-4 flex gap-2 max-w-xl mx-auto">
          <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search fan, CCTV, caustic soda, PAC..." className="flex-1 px-4 py-2.5 rounded-full border-2 border-black text-sm" />
          <SearchMic lang="en" onResult={(txt:string)=>setSearchTerm(txt)} />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-2xl shadow p-3 flex flex-col">
              <div className="text-2xl">{p.img}</div><div className="font-black text-[11px] mt-2">{p.name}</div><div className="text-[10px] text-gray-600">{p.desc}</div><div className="text-green-700 font-black text-sm mt-2">₦{p.basePrice.toLocaleString()}</div><a href={p.affiliate} target="_blank" className="mt-1 block w-full py-1.5 bg-black text-white rounded-full text-[10px] font-bold text-center">Buy via Affiliate</a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
