'use client'
import { useState, useEffect } from 'react'
import SearchMic from '../components/SearchMic'

const categories = ["All", "Farm & Agro", "Home & Kitchen", "Salon & Beauty", "Tailoring & Workshop"]

const productsMeta = [
  // Farm & Agro - Your new list
  { id: 1, cat: "Farm & Agro", basePrice: 450000, img: "🥚", keywords: "solar incubator egg hatching chicken", name: "Solar Incubator 500 Eggs", desc: "Hatch 500 chicks with sun. No NEPA. Hatchery business. Earn N100k per batch.", earn: "Earn N80k-120k/month hatching chicks" },
  { id: 2, cat: "Farm & Agro", basePrice: 180000, img: "🌽", keywords: "corn sheller maize thresher solar", name: "Solar Corn Sheller", desc: "Shell corn fast with solar. 500kg per hour. No diesel. For farmers cooperatives.", earn: "Earn N3k per day shelling for farmers" },
  { id: 3, cat: "Farm & Agro", basePrice: 220000, img: "🫒", keywords: "oil press groundnut palm kernel solar", name: "Solar Oil Press Machine", desc: "Press groundnut, palm kernel oil with solar. No fuel. Oil sellers love it.", earn: "Earn N5k daily pressing oil" },
  { id: 4, cat: "Farm & Agro", basePrice: 150000, img: "🌶️", keywords: "vegetable meat dryer solar tomato", name: "Solar Vegetable & Meat Dryer 100kg", desc: "Dry tomatoes, pepper, meat, fish clean. No dust. Sell at 3x price in off-season.", earn: "Buy cheap, dry, sell 3x price" },
  { id: 5, cat: "Farm & Agro", basePrice: 850000, img: "🚜", keywords: "tractor low price solar mini 12hp", name: "Solar Mini Tractor 12HP Low Price", desc: "Low price solar tractor for small farms. Plough, till, carry. Charge with sun. No diesel.", earn: "Save N500k diesel yearly + hire to others" },
  { id: 6, cat: "Farm & Agro", basePrice: 95000, img: "🐀", keywords: "animal pest repellant solar farm rat", name: "Solar Animal & Pest Repellant", desc: "Repel rats, birds, pests from farm with solar sound. No chemicals. Protect crops.", earn: "Protect N200k crops loss" },
  { id: 7, cat: "Farm & Agro", basePrice: 280000, img: "💧", keywords: "water pump solar irrigation", name: "Solar Water Pump 1HP", desc: "Pump water with sun. Farm all year. No diesel.", earn: "Farm 2 hectares dry season" },
  { id: 8, cat: "Farm & Agro", basePrice: 400000, img: "🚲", keywords: "cargo bike solar", name: "Solar Cargo Bike 500W", desc: "Carry 200kg farm produce to market. No fuel.", earn: "Save N500k fuel yearly" },
  
  // Home & Kitchen
  { id: 9, cat: "Home & Kitchen", basePrice: 75000, img: "🍳", keywords: "cooker solar electric cooking", name: "Solar Cooker + Blender", desc: "Cook and blend with sun. No gas. No NEPA. For homes, restaurants.", earn: "Save N15k gas monthly" },
  { id: 10, cat: "Home & Kitchen", basePrice: 65000, img: "🥤", keywords: "blender solar kitchen", name: "Solar Blender 1.5L", desc: "Blend pepper, tomatoes with solar battery. No NEPA needed.", earn: "For home & small restaurant" },
  
  // Salon & Beauty
  { id: 11, cat: "Salon & Beauty", basePrice: 45000, img: "💇", keywords: "hair dryer solar salon", name: "Solar Hair Dryer", desc: "Dry hair with solar. Salon no need NEPA. Work anytime.", earn: "Earn N2k per customer - no NEPA stop" },
  { id: 12, cat: "Salon & Beauty", basePrice: 35000, img: "✂️", keywords: "clipper solar barbing", name: "Solar Clippers Rechargeable", desc: "Barbing clipper with solar charging. Barbers work 24hrs. No NEPA.", earn: "Barb 20 heads daily, no NEPA" },
  { id: 13, cat: "Salon & Beauty", basePrice: 85000, img: "💨", keywords: "hair dryer blower solar", name: "Solar Hair Blower + Straightener", desc: "Salon tools powered by sun. Makeup & hair business.", earn: "Salon income even with no light" },
  
  // Tailoring & Workshop
  { id: 14, cat: "Tailoring & Workshop", basePrice: 320000, img: "🧵", keywords: "sewing embroidery machine solar tailoring", name: "Solar Sewing + Embroidery Machine", desc: "Sew and embroider with solar. Tailors work without NEPA. Fashion business.", earn: "Earn N5k daily sewing with solar" },
  { id: 15, cat: "Tailoring & Workshop", basePrice: 120000, img: "⚙️", keywords: "grinder solar grinding mill", name: "Solar Grinder / Grinding Mill", desc: "Grind pepper, corn, beans with solar. Market grinder business.", earn: "Earn N4k daily grinding" },
]

function calcTotal(base: number) {
  const competitivePrice = Math.round(base * 0.98)
  const vat = Math.round(competitivePrice * 0.075)
  const escrow = Math.round(competitivePrice * 0.01)
  return competitivePrice + vat + escrow
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCat, setSelectedCat] = useState('All')
  const [filtered, setFiltered] = useState(productsMeta)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    localStorage.setItem('nicham_lang', 'en')
    const p = localStorage.getItem('green_points')
    if (p) setPoints(parseInt(p))
  }, [])

  useEffect(() => {
    let f = productsMeta
    if (selectedCat !== 'All') f = f.filter(p=>p.cat===selectedCat)
    if (searchTerm) {
      const low = searchTerm.toLowerCase()
      f = f.filter(p=> p.keywords.includes(low) || p.name.toLowerCase().includes(low))
    }
    setFiltered(f)
  }, [searchTerm, selectedCat])

  const speakWelcome = () => {
    try {
      window.speechSynthesis.cancel()
      const t = "Welcome to NiChAm Solar Market - Sun shining on Nigeria. We sell solar machines that make money: incubator, grinder, oil press, corn sheller, dryer, sewing embroidery machine, hair dryer, clippers, blender, cooker and low price tractor. All work with sun, no NEPA, no fuel. Click microphone and say what you want."
      const u = new SpeechSynthesisUtterance(t)
      u.lang = 'en-NG'
      u.rate = 0.85
      window.speechSynthesis.speak(u)
    } catch {}
  }

  return (
    <main className="min-h-screen bg-[#f6f7e8]">
      <header className="bg-black text-white p-3 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="NiChAm logo sun on Nigeria" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white p-1" />
            <div>
              <h1 className="text-lg md:text-xl font-black leading-none">NiChAm Solar Market</h1>
              <div className="text-yellow-300 text-[9px]">Sun Shining on Nigeria - Marketing + Market</div>
            </div>
          </div>
          <div className="flex gap-2 text-[10px] items-center">
            <a href="/orders" className="bg-white text-black px-3 py-1.5 rounded-full font-bold">Orders</a>
            <a href="/agent" className="bg-yellow-400 text-black px-3 py-1.5 rounded-full font-bold">Agent</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex gap-2 mt-2 overflow-x-auto text-[10px]">
          {categories.map(c=>(
            <button key={c} onClick={()=>setSelectedCat(c)} className={`px-3 py-1 rounded-full whitespace-nowrap font-bold border ${selectedCat===c ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-300'}`}>{c}</button>
          ))}
        </div>
      </header>

      <div className="bg-green-700 text-white text-center py-1.5 text-[11px] font-bold">
        🌱 Green Points on Every Purchase | {points.toLocaleString()} Points | Marketing App + Marketplace | Voice Ordering
      </div>

      <div className="max-w-6xl mx-auto p-3">
        <div className="bg-gradient-to-r from-yellow-50 to-green-50 border-2 border-green-200 rounded-2xl p-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <img src="/logo.png" className="w-20 h-20 rounded-full" />
            <div className="flex-1 text-left">
              <div className="font-black text-sm">NiChAm Solar Market doubles as Marketing App - Solar Machines That Make Money</div>
              <div className="text-[11px] text-gray-700 mt-1">Incubator, Grinder, Oil Press, Corn Sheller, Dryer (vegetable & meat), Low Price Solar Tractor, Pest Repellant, Sewing Embroidery, Hair Dryer, Clippers, Blender, Cooker... All with SUN, no NEPA, no fuel. <b>Each product shows how much you can EARN.</b></div>
              <button onClick={speakWelcome} className="mt-2 px-4 py-1.5 bg-black text-white rounded-full text-[11px] font-bold">🔊 Hear All Products - Voice</button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2 max-w-xl mx-auto">
          <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search incubator, grinder, tractor, clippers..." className="flex-1 px-4 py-2.5 rounded-full border-2 border-black text-sm" />
          <SearchMic lang="en" onResult={(txt:string)=>setSearchTerm(txt)} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
          {filtered.map(p=>{
            const total = calcTotal(p.basePrice)
            return (
              <a key={p.id} href={`/product/${p.id}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg border-2 border-transparent hover:border-green-500 text-left flex flex-col">
                <div className="flex justify-between items-start"><div className="text-3xl">{p.img}</div><div className="text-[8px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">{p.cat}</div></div>
                <div className="font-black mt-2 text-[12px] leading-tight">{p.name}</div>
                <div className="text-[10px] text-gray-600 mt-1 line-clamp-2">{p.desc}</div>
                <div className="mt-2 bg-yellow-50 rounded-lg p-1.5"><div className="text-[9px] text-green-800 font-bold">💰 {p.earn}</div></div>
                <div className="mt-auto pt-2"><div className="text-green-700 font-black text-sm">₦{total.toLocaleString()}</div><div className="text-[8px] text-gray-500">+{Math.round(total*0.01).toLocaleString()} Green Points</div></div>
              </a>
            )
          })}
        </div>

        <div className="mt-8 bg-black text-white rounded-2xl p-4 grid md:grid-cols-3 gap-3">
          <div><div className="font-black text-xs text-yellow-300">🌾 Farm & Agro</div><div className="text-[11px] mt-1 text-gray-300">Incubator, Corn Sheller, Oil Press, Dryer, Mini Tractor, Pest Repellant, Water Pump. Make money farming & processing.</div></div>
          <div><div className="font-black text-xs text-yellow-300">✂️ Salon & Tailoring</div><div className="text-[11px] mt-1 text-gray-300">Sewing Embroidery, Hair Dryer, Clippers, Blower. Salons & tailors work without NEPA, earn daily.</div></div>
          <div><div className="font-black text-xs text-yellow-300">🏠 Home & Kitchen</div><div className="text-[11px] mt-1 text-gray-300">Blender, Cooker, Grinder. Homes & restaurants save gas, save NEPA.</div></div>
        </div>

        <div className="mt-4 text-center text-[10px] text-gray-500">
          Platform: GSPI/NiChAm | Escrow MTN MoMo | Logistics AfricanIES (Delivery Fee Separate) | Affiliate Fast-Moving Items - No Discount Needed - Commission from Manufacturer
        </div>
      </div>
    </main>
  )
}
