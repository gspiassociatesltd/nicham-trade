'use client'
import { useState, useEffect } from 'react'
import SearchMic from '../components/SearchMic'

const categories = ["All", "Farm & Agro", "Home & Kitchen", "Salon & Beauty", "Tailoring & Workshop", "Industrial Chemicals", "Trending Affiliate"]

const productsMeta = [
  // Farm & Agro - from screenshot
  { id: 1, cat: "Farm & Agro", basePrice: 450000, img: "🥚", keywords: "incubator egg 500 hatching chicken solar", name: "Solar Incubator 500 Eggs", desc: "Hatch 500 chicks with sun. No NEPA. Hatchery business. Earn N100k per batch.", earn: "Earn N80k-120k/month hatching chicks", type: "solar" },
  { id: 2, cat: "Farm & Agro", basePrice: 180000, img: "🌽", keywords: "corn sheller maize thresher solar", name: "Solar Corn Sheller", desc: "Shell corn fast with solar. 500kg per hour. No diesel. For farmers cooperatives.", earn: "Earn N3k per day shelling for farmers", type: "solar" },
  { id: 3, cat: "Farm & Agro", basePrice: 220000, img: "🫒", keywords: "oil press groundnut palm kernel solar", name: "Solar Oil Press Machine", desc: "Press groundnut, palm kernel oil with solar. No fuel. Oil sellers love it.", earn: "Earn N5k daily pressing oil", type: "solar" },
  { id: 4, cat: "Farm & Agro", basePrice: 150000, img: "🌶️", keywords: "vegetable meat dryer tomato solar", name: "Solar Vegetable & Meat Dryer 100kg", desc: "Dry tomatoes, pepper, meat, fish clean. No dust. Sell at 3x price in off-season.", earn: "Buy cheap, dry, sell 3x price", type: "solar" },
  { id: 5, cat: "Farm & Agro", basePrice: 850000, img: "🚜", keywords: "tractor solar mini 12hp low price", name: "Solar Mini Tractor 12HP Low Price", desc: "Low price solar tractor for small farms. Plough, till, carry. Charge with sun. No diesel.", earn: "Save N500k diesel yearly + hire to others", type: "solar" },
  { id: 6, cat: "Farm & Agro", basePrice: 95000, img: "🐀", keywords: "animal pest repellant solar farm rat", name: "Solar Animal & Pest Repellant", desc: "Repel rats, birds, pests from farm with solar sound. No chemicals. Protect crops.", earn: "Protect N200k crops loss", type: "solar" },
  { id: 7, cat: "Farm & Agro", basePrice: 280000, img: "💧", keywords: "water pump solar irrigation", name: "Solar Water Pump 1HP", desc: "Pump water with sun. Farm all year. No diesel.", earn: "Farm 2 hectares dry season", type: "solar" },
  { id: 8, cat: "Farm & Agro", basePrice: 400000, img: "🚲", keywords: "cargo bike solar 500w", name: "Solar Cargo Bike 500W", desc: "Carry 200kg farm produce to market. No fuel.", earn: "Save N500k fuel yearly", type: "solar" },
  { id: 9, cat: "Farm & Agro", basePrice: 120000, img: "⚙️", keywords: "grinder solar grinding mill", name: "Solar Grinder / Grinding Mill", desc: "Grind pepper, corn, beans with solar. Market grinder business.", earn: "Earn N4k daily grinding", type: "solar" },

  // Home & Kitchen
  { id: 10, cat: "Home & Kitchen", basePrice: 75000, img: "🍳", keywords: "cooker solar electric cooking blender", name: "Solar Cooker + Blender", desc: "Cook and blend with sun. No gas. No NEPA. For homes, restaurants.", earn: "Save N15k gas monthly", type: "solar" },
  { id: 11, cat: "Home & Kitchen", basePrice: 65000, img: "🥤", keywords: "blender solar kitchen", name: "Solar Blender 1.5L", desc: "Blend pepper, tomatoes with solar battery. No NEPA needed.", earn: "For home & small restaurant", type: "solar" },
  { id: 12, cat: "Home & Kitchen", basePrice: 58900, img: "🌀", keywords: "rechargeable solar fan tinmo miratec trending affiliate", name: "Rechargeable Solar Fan 16\"+ Panel + 2 Bulbs", desc: "TRENDING: TINMO 18\"+ 12 Months Warranty + Panel 2 Bulbs. Best seller 4.1 stars. Fuel N800/l alternative.", earn: "Commission N5.3k - Trending", type: "affiliate", affiliate: "https://www.jumia.com.ng/tinmo-18-inches-rechargeable-standing-fan-12-months-warranty-solar-panel-2-bulbs-401703906.html" },
  { id: 13, cat: "Home & Kitchen", basePrice: 25000, img: "💡", keywords: "solar rechargeable bulb lamp emergency home lighting kit", name: "Solar Rechargeable Bulbs 4pcs + Panel + Radio", desc: "YOBOLIFE Mini DC Solar Kit 4 Bulbs + Panel + FM. Every home needs during blackout.", earn: "Cheapest entry - impulse buy", type: "affiliate", affiliate: "https://www.jumia.com.ng/solar-home-lighting-system-kit-led-solar-flood-light-3-hanging-bulbs-rechargeable-303045678.html" },
  { id: 14, cat: "Home & Kitchen", basePrice: 60999, img: "☀️", keywords: "solar panel jinko 300w affiliate", name: "Jinko 300W Solar Panel", desc: "FAST Charging 24V/36V/48V. Nigeria added 800MW solar 2025 - boom.", earn: "Panels trending", type: "affiliate", affiliate: "https://www.jumia.com.ng/jinko-300watts-24v3648v-monocrystalline-solar-123.html" },
  { id: 15, cat: "Home & Kitchen", basePrice: 18000, img: "🔋", keywords: "solar power bank usb charger affiliate", name: "Solar Power Bank 20000mAh", desc: "Charge phone with sun. Students, traders need daily. No NEPA.", earn: "Impulse buy converts today", type: "affiliate", affiliate: "https://www.jumia.com.ng/solar-power-bank-20000mah-123.html" },

  // Salon & Beauty
  { id: 16, cat: "Salon & Beauty", basePrice: 45000, img: "💇", keywords: "hair dryer solar salon", name: "Solar Hair Dryer", desc: "Dry hair with solar. Salon no need NEPA. Work anytime.", earn: "Earn N2k per customer - no NEPA stop", type: "solar" },
  { id: 17, cat: "Salon & Beauty", basePrice: 35000, img: "✂️", keywords: "clipper solar barbing rechargeable", name: "Solar Clippers Rechargeable", desc: "Barbing clipper with solar charging. Barbers work 24hrs. No NEPA.", earn: "Barb 20 heads daily, no NEPA", type: "solar" },
  { id: 18, cat: "Salon & Beauty", basePrice: 85000, img: "💨", keywords: "hair dryer blower solar", name: "Solar Hair Blower + Straightener", desc: "Salon tools powered by sun. Makeup & hair business.", earn: "Salon income even with no light", type: "solar" },

  // Tailoring & Workshop
  { id: 19, cat: "Tailoring & Workshop", basePrice: 320000, img: "🧵", keywords: "sewing embroidery machine solar tailoring", name: "Solar Sewing + Embroidery Machine", desc: "Sew and embroider with solar. Tailors work without NEPA. Fashion business.", earn: "Earn N5k daily sewing with solar", type: "solar" },

  // Industrial Chemicals - NEW but same card style
  { id: 201, cat: "Industrial Chemicals", basePrice: 8500, img: "💊", keywords: "paracetamol powder pharma pharmaceutical sorbitol", name: "Paracetamol Powder BP/USP", desc: "Pharma grade 99% purity 25kg drum COA. NAFDAC permit required. For tablet making.", earn: "Pharma factories monthly re-order", type: "chemical", chemPrice: "$5.5/kg MOQ 500kg" },
  { id: 202, cat: "Industrial Chemicals", basePrice: 6500, img: "🍬", keywords: "sorbitol crystallized pharma food", name: "Crystallized Sorbitol", desc: "Food grade 25kg bag sweetener. Pharma, food, toothpaste factories.", earn: "Food & pharma monthly", type: "chemical", chemPrice: "$0.85/kg MOQ 1000kg" },
  { id: 203, cat: "Industrial Chemicals", basePrice: 420000, img: "🧼", keywords: "caustic soda flakes 99% commodity chemical", name: "Caustic Soda Flakes 99%", desc: "NaOH 99% 25kg bag Shandong China. Soap, detergent, textile factories. Fast moving.", earn: "Earn 3-5% perpetual per re-order", type: "chemical", chemPrice: "$420/ton MOQ 5 tons" },
  { id: 204, cat: "Industrial Chemicals", basePrice: 180000, img: "🧪", keywords: "hydrochloric acid hcl 31% commodity", name: "Hydrochloric Acid 31-33%", desc: "HCl 31% 30kg jerry can industrial grade. Steel, cleaning, water treatment.", earn: "Monthly re-order", type: "chemical", chemPrice: "$180/ton MOQ 10 tons" },
  { id: 205, cat: "Industrial Chemicals", basePrice: 380000, img: "⚗️", keywords: "nitric acid 68% commodity", name: "Nitric Acid 68%", desc: "HNO3 68% 35kg can. Fertilizer, etching, lab. Oxidizer permit needed.", earn: "High margin", type: "chemical", chemPrice: "$380/ton MOQ 5 tons" },
  { id: 206, cat: "Industrial Chemicals", basePrice: 1100000, img: "🕯️", keywords: "stearic acid triple pressed commodity", name: "Stearic Acid Triple Pressed", desc: "C18 25kg bag rubber grade. Rubber, candle, cosmetics.", earn: "Monthly", type: "chemical", chemPrice: "$1100/ton MOQ 3 tons" },
  { id: 207, cat: "Industrial Chemicals", basePrice: 650000, img: "🧴", keywords: "acetic acid glacial commodity", name: "Acetic Acid Glacial 99.8%", desc: "CH3COOH 99.8% 30kg drum. Textile, vinegar, chemical.", earn: "Textile factories", type: "chemical", chemPrice: "$650/ton MOQ 5 tons" },
  { id: 208, cat: "Industrial Chemicals", basePrice: 520000, img: "💧", keywords: "hydrogen peroxide 50% commodity", name: "Hydrogen Peroxide 50%", desc: "H2O2 50% 30kg drum industrial. Bleaching, water treatment, textile.", earn: "Water treatment re-order", type: "chemical", chemPrice: "$520/ton MOQ 5 tons" },
  { id: 209, cat: "Industrial Chemicals", basePrice: 3200000, img: "🎨", keywords: "natrosol 250 hhr hec paint chemical", name: "Natrosol 250 HHR (HEC)", desc: "Hydroxyethyl Cellulose 25kg bag thickener. Paint, building.", earn: "Paint factories monthly", type: "chemical", chemPrice: "$3200/ton MOQ 1 ton" },
  { id: 210, cat: "Industrial Chemicals", basePrice: 85000, img: "🏳️", keywords: "calcium carbonate paint chemical", name: "Calcium Carbonate Powder", desc: "CaCO3 98% 50kg bag 800-1250 mesh. Paint, PVC, paper.", earn: "Bulk 20 tons", type: "chemical", chemPrice: "$85/ton MOQ 20 tons" },
  { id: 211, cat: "Industrial Chemicals", basePrice: 280000, img: "🌊", keywords: "soda ash light water treatment chemical", name: "Soda Ash Light", desc: "Na2CO3 99.2% 50kg bag. Water treatment, detergent, glass. Fast moving.", earn: "Water plants monthly", type: "chemical", chemPrice: "$280/ton MOQ 10 tons" },
  { id: 212, cat: "Industrial Chemicals", basePrice: 1450000, img: "🏊", keywords: "calcium hypochlorite 70% water treatment", name: "Calcium Hypochlorite 65-70%", desc: "Ca(ClO)2 70% 45kg drum water treatment grade. Pools, disinfection.", earn: "High margin $1450/ton", type: "chemical", chemPrice: "$1450/ton MOQ 3 tons" },
  { id: 213, cat: "Industrial Chemicals", basePrice: 350000, img: "🚰", keywords: "poly aluminum chloride pac 30% water treatment", name: "Poly Aluminum Chloride PAC 30%", desc: "PAC 30% Yellow/White 25kg bag. Water treatment coagulant - high demand.", earn: "Water treatment monthly", type: "chemical", chemPrice: "$350/ton MOQ 10 tons" },
  { id: 214, cat: "Industrial Chemicals", basePrice: 190000, img: "🧫", keywords: "aluminum sulphate 17% water treatment", name: "Aluminum Sulphate 17%", desc: "Al2(SO4)3 17% 50kg bag. Water treatment, paper, coagulant.", earn: "Monthly re-order", type: "chemical", chemPrice: "$190/ton MOQ 15 tons" },
  { id: 215, cat: "Industrial Chemicals", basePrice: 320000, img: "🔬", keywords: "ferric chloride 40% water treatment", name: "Ferric Chloride 40% Liquid", desc: "FeCl3 40% liquid 30kg jerry can. Water treatment, etching, coagulant.", earn: "Water treatment", type: "chemical", chemPrice: "$320/ton MOQ 10 tons" },

  // Trending Affiliate - extra category for trending items
  { id: 301, cat: "Trending Affiliate", basePrice: 74984, img: "🌀", keywords: "miratec solar fan rechargeable trending affiliate", name: "Miratec 16\ AC/DC Solar Fan + 25W Panel", desc: "46% off N74,984 from N140k. 757 reviews. Best seller trending.", earn: "Best seller fan - Commission N6.7k", type: "affiliate", affiliate: "https://www.jumia.com.ng/miratec-16-inches-acdc-solar-rechargeable-fan-25w-panel-a-bulb-121549172.html" },
  { id: 302, cat: "Trending Affiliate", basePrice: 96800, img: "📹", keywords: "v380 solar street light cctv camera 450w trending", name: "V380 Pro Solar Street Light + CCTV 450W", desc: "3in1: Solar Panel + Street Light + CCTV Camera. 100% solar no bill. Trending 2026.", earn: "High commission N9.6k", type: "affiliate", affiliate: "https://www.jumia.com.ng/generic-v380-pro-solar-street-light-with-cctv-camera-450w-123.html" },
  { id: 303, cat: "Trending Affiliate", basePrice: 263000, img: "🔋", keywords: "power station lifepo4 1kwh itel energy trending affiliate", name: "Power Tank 500W + 1KWh LiFePO4", desc: "All-in-One Solar Power Station. itel Energy booming 2026. Fuel N800/l replacement.", earn: "Commission N23k - High ticket", type: "affiliate", affiliate: "https://www.jumia.com.ng/power-tank-500w-inverter-1kwh-lifepo4-battery-all-in-one-solar-power-station-123.html" },
  { id: 304, cat: "Trending Affiliate", basePrice: 72000, img: "🏮", keywords: "solar street light 150w security affiliate", name: "AKT 150W Solar Street Light All-in-One", desc: "Outdoor Security Solar Street Light with inbuilt panel. For streets, compounds.", earn: "Estate & homes buying", type: "affiliate", affiliate: "https://www.jumia.com.ng/akt-150w-solar-street-light-with-inbuilt-panel-all-in-1-123.html" },
  { id: 305, cat: "Trending Affiliate", basePrice: 45000, img: "🔦", keywords: "solar flood light 200w security affiliate trending", name: "Solar Flood Light 200W Security + Remote", desc: "200W Rechargeable 5 modes USB port. Homes shops need security no NEPA.", earn: "Security cheap protection", type: "affiliate", affiliate: "https://www.jumia.com.ng/solar-flood-light-available-buy-online-best-price-123.html" },
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
      const t = "Welcome to NiChAm Solar Market - Sun shining on Nigeria. We sell solar machines that make money and industrial chemicals from China. Click microphone and say what you want."
      const u = new SpeechSynthesisUtterance(t)
      u.lang = 'en-NG'
      u.rate = 0.85
      window.speechSynthesis.speak(u)
    } catch {}
  }

  return (
    <main className="min-h-screen bg-[#f6f7e8]">
      <header className="bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="NiChAm logo" className="w-12 h-12 rounded-full bg-white p-1" />
            <div>
              <h1 className="text-xl font-black leading-none">NiChAm Solar Market</h1>
              <div className="text-yellow-300 text-[10px]">Sun Shining on Nigeria - Marketing + Market</div>
            </div>
          </div>
          <div className="flex gap-2 text-[11px]">
            <a href="/orders" className="bg-white text-black px-4 py-1.5 rounded-full font-bold">Orders</a>
            <a href="/agent" className="bg-yellow-400 text-black px-4 py-1.5 rounded-full font-bold">Agent</a>
          </div>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {categories.map(c=>(
            <button key={c} onClick={()=>setSelectedCat(c)} className={`px-4 py-1.5 rounded-full whitespace-nowrap font-bold text-[12px] border ${selectedCat===c ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-300'}`}>{c}</button>
          ))}
        </div>
      </header>

      <div className="bg-green-700 text-white text-center py-2 text-[12px] font-bold">
        🌱 Green Points on Every Purchase | {points.toLocaleString()} Points | Marketing App + Marketplace | Voice Ordering
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-[#f0f7e6] border-2 border-green-200 rounded-2xl p-4 flex gap-4 items-center">
          <img src="/logo.png" className="w-20 h-20 rounded-full bg-white p-1" />
          <div className="flex-1">
            <div className="font-black text-[14px]">NiChAm Solar Market doubles as Marketing App - Solar Machines That Make Money</div>
            <div className="text-[11px] text-gray-700 mt-1">Incubator, Grinder, Oil Press, Corn Sheller, Dryer (vegetable & meat), Low Price Solar Tractor, Pest Repellant, Sewing Embroidery, Hair Dryer, Clippers, Blender, Cooker, Solar Fans, CCTV, Power Stations, Panels + 15 Industrial Chemicals from China. All with SUN or bulk import, no NEPA, no fuel. <b>Each product shows how much you can EARN.</b></div>
            <button onClick={speakWelcome} className="mt-2 px-4 py-1.5 bg-black text-white rounded-full text-[11px] font-bold">🔊 Hear All Products - Voice</button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex gap-2 w-full max-w-xl">
            <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search incubator, grinder, tractor, clippers, caustic soda, PAC..." className="flex-1 px-4 py-3 rounded-full border-2 border-black text-sm" />
            <SearchMic lang="en" onResult={(txt:string)=>setSearchTerm(txt)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {filtered.map(p=>{
            const total = calcTotal(p.basePrice)
            const isChemical = p.type === 'chemical'
            const isAffiliate = p.type === 'affiliate'
            return (
              <a key={p.id} href={isChemical ? `/chemicals#${p.id}` : isAffiliate ? (p as any).affiliate : `/product/${p.id}`} target={isAffiliate ? '_blank' : '_self'} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg border-2 border-transparent hover:border-green-500 text-left flex flex-col">
                <div className="flex justify-between items-start"><div className="text-3xl">{p.img}</div><div className="text-[9px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-200">{p.cat}</div></div>
                <div className="font-black mt-3 text-[13px] leading-tight">{p.name}</div>
                <div className="text-[11px] text-gray-600 mt-2 line-clamp-3">{p.desc}</div>
                {isChemical && <div className="text-[10px] mt-1 font-bold text-blue-700">{(p as any).chemPrice}</div>}
                <div className="mt-3 bg-yellow-50 rounded-lg p-2"><div className="text-[10px] text-green-800 font-bold flex items-center gap-1">💰 {p.earn}</div></div>
                <div className="mt-auto pt-3">
                  <div className="text-green-700 font-black text-[15px]">₦{total.toLocaleString()}</div>
                  <div className="text-[9px] text-gray-500">{isChemical ? 'Bulk quote via WhatsApp - Perpetual agent commission' : isAffiliate ? '+ Affiliate ' + (p as any).affiliate?.includes('jumia') ? 'Jumia 9-13% commission' : 'Commission' : `+${Math.round(total*0.01).toLocaleString()} Green Points`}</div>
                </div>
              </a>
            )
          })}
        </div>

        <div className="mt-8 bg-black text-white rounded-2xl p-4 text-center">
          <div className="font-black text-sm text-yellow-300">NiChAm-Trade: Solar Machines + Industrial Chemicals - Same Clean Layout</div>
          <div className="text-[11px] mt-2 text-gray-300">Solar: Fans, CCTV 3in1, Power Stations LiFePO4, Panels, Incubator, Grinder, Oil Press, Clippers, Sewing. Chemicals: Caustic Soda, Soda Ash, PAC, Hypochlorite, Paracetamol, Sorbitol, Natrosol, etc. China Sourcing via AfricanIES + China Friend. Buyer Agent earns perpetually via WhatsApp link. All listed under same headings as screenshot.</div>
          <div className="mt-3 flex justify-center gap-2">
            <a href="/chemicals" className="px-4 py-2 bg-blue-600 text-white rounded-full font-black text-xs">View All 15 Chemicals</a>
            <a href="/industrial-agent" className="px-4 py-2 bg-yellow-400 text-black rounded-full font-black text-xs">Buyer Agent - Perpetual Link</a>
            <a href="/supplier" className="px-4 py-2 bg-green-600 text-white rounded-full font-black text-xs">China Supplier Agent</a>
          </div>
        </div>
      </div>
    </main>
  )
}
