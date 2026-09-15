'use client'
import { useState, useEffect } from 'react'

const productsMeta = [
  { id: 1, cat: "Farm & Agro", basePrice: 450000, img: "🥚", keywords: "incubator egg 500 hatching chicken solar", name: "Solar Incubator 500 Eggs", desc: "Hatch 500 chicks with sun. No NEPA. Hatchery business.", type: "solar" },
  { id: 2, cat: "Farm & Agro", basePrice: 180000, img: "🌽", keywords: "corn sheller maize thresher solar", name: "Solar Corn Sheller", desc: "Shell corn fast with solar. 500kg per hour. No diesel.", type: "solar" },
  { id: 3, cat: "Farm & Agro", basePrice: 220000, img: "🫒", keywords: "oil press groundnut palm kernel solar", name: "Solar Oil Press Machine", desc: "Press groundnut, palm kernel oil with solar. No fuel.", type: "solar" },
  { id: 4, cat: "Farm & Agro", basePrice: 150000, img: "🌶️", keywords: "vegetable meat dryer tomato solar", name: "Solar Vegetable & Meat Dryer 100kg", desc: "Dry tomatoes, pepper, meat, fish clean. No dust.", type: "solar" },
  { id: 5, cat: "Farm & Agro", basePrice: 850000, img: "🚜", keywords: "tractor solar mini 12hp low price", name: "Solar Mini Tractor 12HP Low Price", desc: "Low price solar tractor for small farms. No diesel.", type: "solar" },
  { id: 6, cat: "Farm & Agro", basePrice: 95000, img: "🐀", keywords: "animal pest repellant solar farm rat", name: "Solar Animal & Pest Repellant", desc: "Repel rats, birds, pests from farm with solar sound.", type: "solar" },
  { id: 7, cat: "Farm & Agro", basePrice: 280000, img: "💧", keywords: "water pump solar irrigation", name: "Solar Water Pump 1HP", desc: "Pump water with sun. Farm all year.", type: "solar" },
  { id: 8, cat: "Farm & Agro", basePrice: 400000, img: "🚲", keywords: "cargo bike solar 500w", name: "Solar Cargo Bike 500W", desc: "Carry 200kg farm produce to market. No fuel.", type: "solar" },
  { id: 9, cat: "Farm & Agro", basePrice: 120000, img: "⚙️", keywords: "grinder solar grinding mill", name: "Solar Grinder / Grinding Mill", desc: "Grind pepper, corn, beans with solar.", type: "solar" },
  { id: 10, cat: "Home & Kitchen", basePrice: 75000, img: "🍳", keywords: "cooker solar electric cooking blender", name: "Solar Cooker + Blender", desc: "Cook and blend with sun. No gas. No NEPA.", type: "solar" },
  { id: 11, cat: "Home & Kitchen", basePrice: 65000, img: "🥤", keywords: "blender solar kitchen", name: "Solar Blender 1.5L", desc: "Blend pepper, tomatoes with solar battery.", type: "solar" },
  { id: 12, cat: "Home & Kitchen", basePrice: 58900, img: "🌀", keywords: "rechargeable solar fan tinmo miratec trending affiliate", name: "Rechargeable Solar Fan 16\"+ Panel + 2 Bulbs", desc: "TINMO 18\"+ 12 Months Warranty + Panel 2 Bulbs. Best seller.", type: "affiliate", affiliate: "https://www.jumia.com.ng/tinmo-18-inches-rechargeable-standing-fan-12-months-warranty-solar-panel-2-bulbs-401703906.html" },
  { id: 13, cat: "Home & Kitchen", basePrice: 25000, img: "💡", keywords: "solar rechargeable bulb lamp emergency home lighting kit", name: "Solar Rechargeable Bulbs 4pcs + Panel", desc: "YOBOLIFE Mini DC Solar Kit 4 Bulbs + Panel + FM.", type: "affiliate", affiliate: "https://www.jumia.com.ng/solar-home-lighting-system-kit-led-solar-flood-light-3-hanging-bulbs-rechargeable-303045678.html" },
  { id: 14, cat: "Home & Kitchen", basePrice: 60999, img: "☀️", keywords: "solar panel jinko 300w affiliate", name: "Jinko 300W Solar Panel", desc: "Monocrystalline FAST charging", type: "affiliate", affiliate: "https://www.jumia.com.ng/jinko-300watts-24v3648v-monocrystalline-solar-123.html" },
  { id: 15, cat: "Home & Kitchen", basePrice: 18000, img: "🔋", keywords: "solar power bank usb charger affiliate", name: "Solar Power Bank 20000mAh", desc: "Charge phone with sun. No NEPA.", type: "affiliate", affiliate: "https://www.jumia.com.ng/solar-power-bank-20000mah-123.html" },
  { id: 16, cat: "Salon & Beauty", basePrice: 45000, img: "💇", keywords: "hair dryer solar salon", name: "Solar Hair Dryer", desc: "Dry hair with solar. Salon no need NEPA.", type: "solar" },
  { id: 17, cat: "Salon & Beauty", basePrice: 35000, img: "✂️", keywords: "clipper solar barbing rechargeable", name: "Solar Clippers Rechargeable", desc: "Barbing clipper with solar charging. Barbers work 24hrs.", type: "solar" },
  { id: 18, cat: "Salon & Beauty", basePrice: 85000, img: "💨", keywords: "hair dryer blower solar", name: "Solar Hair Blower + Straightener", desc: "Salon tools powered by sun.", type: "solar" },
  { id: 19, cat: "Tailoring & Workshop", basePrice: 320000, img: "🧵", keywords: "sewing embroidery machine solar tailoring", name: "Solar Sewing + Embroidery Machine", desc: "Sew and embroider with solar. Tailors work without NEPA.", type: "solar" },
  { id: 201, cat: "Industrial Chemicals", basePrice: 8500, img: "💊", keywords: "paracetamol powder pharma", name: "Paracetamol Powder BP/USP", desc: "Pharma grade 99% purity 25kg drum COA. NAFDAC permit required.", type: "chemical", chemPrice: "$5.5/kg MOQ 500kg" },
  { id: 202, cat: "Industrial Chemicals", basePrice: 6500, img: "🍬", keywords: "sorbitol crystallized", name: "Crystallized Sorbitol", desc: "Food grade 25kg bag sweetener. Pharma, food, toothpaste.", type: "chemical", chemPrice: "$0.85/kg MOQ 1000kg" },
  { id: 203, cat: "Industrial Chemicals", basePrice: 420000, img: "🧼", keywords: "caustic soda flakes", name: "Caustic Soda Flakes 99%", desc: "NaOH 99% 25kg bag Shandong China. Soap, detergent, textile.", type: "chemical", chemPrice: "$420/ton MOQ 5 tons" },
  { id: 204, cat: "Industrial Chemicals", basePrice: 180000, img: "🧪", keywords: "hydrochloric acid", name: "Hydrochloric Acid 31-33%", desc: "HCl 31% 30kg jerry can industrial grade.", type: "chemical", chemPrice: "$180/ton MOQ 10 tons" },
  { id: 205, cat: "Industrial Chemicals", basePrice: 380000, img: "⚗️", keywords: "nitric acid", name: "Nitric Acid 68%", desc: "HNO3 68% 35kg can. Fertilizer, etching, lab.", type: "chemical", chemPrice: "$380/ton MOQ 5 tons" },
  { id: 206, cat: "Industrial Chemicals", basePrice: 1100000, img: "🕯️", keywords: "stearic acid", name: "Stearic Acid Triple Pressed", desc: "C18 25kg bag rubber grade. Rubber, candle, cosmetics.", type: "chemical", chemPrice: "$1100/ton MOQ 3 tons" },
  { id: 207, cat: "Industrial Chemicals", basePrice: 650000, img: "🧴", keywords: "acetic acid", name: "Acetic Acid Glacial 99.8%", desc: "CH3COOH 99.8% 30kg drum. Textile, vinegar.", type: "chemical", chemPrice: "$650/ton MOQ 5 tons" },
  { id: 208, cat: "Industrial Chemicals", basePrice: 520000, img: "💧", keywords: "hydrogen peroxide", name: "Hydrogen Peroxide 50%", desc: "H2O2 50% 30kg drum industrial. Bleaching, water treatment.", type: "chemical", chemPrice: "$520/ton MOQ 5 tons" },
  { id: 209, cat: "Industrial Chemicals", basePrice: 3200000, img: "🎨", keywords: "natrosol", name: "Natrosol 250 HHR (HEC)", desc: "Hydroxyethyl Cellulose 25kg bag thickener. Paint, building.", type: "chemical", chemPrice: "$3200/ton MOQ 1 ton" },
  { id: 210, cat: "Industrial Chemicals", basePrice: 85000, img: "🏳️", keywords: "calcium carbonate", name: "Calcium Carbonate Powder", desc: "CaCO3 98% 50kg bag 800-1250 mesh. Paint, PVC, paper.", type: "chemical", chemPrice: "$85/ton MOQ 20 tons" },
  { id: 211, cat: "Industrial Chemicals", basePrice: 280000, img: "🌊", keywords: "soda ash", name: "Soda Ash Light", desc: "Na2CO3 99.2% 50kg bag. Water treatment, detergent, glass.", type: "chemical", chemPrice: "$280/ton MOQ 10 tons" },
  { id: 212, cat: "Industrial Chemicals", basePrice: 1450000, img: "🏊", keywords: "calcium hypochlorite", name: "Calcium Hypochlorite 65-70%", desc: "Ca(ClO)2 70% 45kg drum water treatment grade.", type: "chemical", chemPrice: "$1450/ton MOQ 3 tons" },
  { id: 213, cat: "Industrial Chemicals", basePrice: 350000, img: "🚰", keywords: "poly aluminum chloride pac", name: "Poly Aluminum Chloride PAC 30%", desc: "PAC 30% Yellow/White 25kg bag. Water treatment coagulant.", type: "chemical", chemPrice: "$350/ton MOQ 10 tons" },
  { id: 214, cat: "Industrial Chemicals", basePrice: 190000, img: "🧫", keywords: "aluminum sulphate", name: "Aluminum Sulphate 17%", desc: "Al2(SO4)3 17% 50kg bag. Water treatment, paper.", type: "chemical", chemPrice: "$190/ton MOQ 15 tons" },
  { id: 215, cat: "Industrial Chemicals", basePrice: 320000, img: "🔬", keywords: "ferric chloride", name: "Ferric Chloride 40% Liquid", desc: "FeCl3 40% liquid 30kg jerry can. Water treatment.", type: "chemical", chemPrice: "$320/ton MOQ 10 tons" },
  { id: 301, cat: "Trending Affiliate", basePrice: 74984, img: "🌀", keywords: "miratec solar fan trending", name: "Miratec 16 AC/DC Solar Fan + 25W Panel", desc: "46% off N74,984 from N140k. 757 reviews. Best seller.", type: "affiliate", affiliate: "https://www.jumia.com.ng/miratec-16-inches-acdc-solar-rechargeable-fan-25w-panel-a-bulb-121549172.html" },
  { id: 302, cat: "Trending Affiliate", basePrice: 96800, img: "📹", keywords: "v380 solar street light cctv", name: "V380 Pro Solar Street Light + CCTV 450W", desc: "3in1: Solar Panel + Street Light + CCTV Camera. 100% solar.", type: "affiliate", affiliate: "https://www.jumia.com.ng/generic-v380-pro-solar-street-light-with-cctv-camera-450w-123.html" },
  { id: 303, cat: "Trending Affiliate", basePrice: 263000, img: "🔋", keywords: "power station lifepo4", name: "Power Tank 500W + 1KWh LiFePO4", desc: "All-in-One Solar Power Station. itel Energy booming 2026.", type: "affiliate", affiliate: "https://www.jumia.com.ng/power-tank-500w-inverter-1kwh-lifepo4-battery-all-in-one-solar-power-station-123.html" },
]

// Add sourcedBy for traceability - who sourced the chemical
const productsWithSource = (productsMeta as any[]).map((p:any)=>{
  if(p.type==='chemical'){
    return {...p, sourcedBy: (p as any).sourcedBy || 'AFRICANIES', sourcingAgentId: (p as any).sourcingAgentId || 'AFR-001', chemPrice: (p as any).chemPrice || `$${p.basePrice}/ton` }
  }
  return p
})

const categories = ["All", "Farm & Agro", "Home & Kitchen", "Salon & Beauty", "Tailoring & Workshop", "Industrial Chemicals"]

export default function Home(){
  const [query,setQuery]=useState('')
  const [cat,setCat]=useState('All')
  const [showOnlySolar,setShowOnlySolar]=useState(false)

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get('ref')
    if(ref){ localStorage.setItem('affiliate_ref', ref); localStorage.setItem('affiliate_tag_date', new Date().toISOString()); }

    // English only platform - agents handle non-English offline
  },[])

  const filtered = productsWithSource.filter((p:any)=>{
    const q=query.toLowerCase()
    const isAffiliate = p.cat==='Trending Affiliate' || (p.cat && p.cat.includes('Affiliate'))
    if(isAffiliate) return false // Hide affiliate from user homepage - admin only standalone later
    const matchQ=!q|| p.keywords.toLowerCase().includes(q)|| p.name.toLowerCase().includes(q)
    const matchC=cat==='All'||p.cat===cat
    return matchQ&&matchC
  })

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
          <div className="flex gap-2 mt-3 flex-wrap justify-center">
            <a href="/orders" className="px-5 py-1.5 bg-black text-white rounded-full text-xs font-bold">Orders</a>
            <a href="/agent" className="px-5 py-1.5 bg-yellow-400 text-black rounded-full text-xs font-bold">Agent Dashboard</a>
            <a href="/affiliate" className="px-5 py-1.5 bg-purple-600 text-white rounded-full text-xs font-bold">Affiliate</a>
          </div>
        </div>
        <div className="bg-green-600 text-white text-center py-1.5 text-[11px] font-bold tracking-wide">Secure Trading via MTN Escrow | Traders & Farmers Marketplace</div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white border-2 border-green-200 rounded-xl p-3 mb-3 text-center">
          <div className="text-sm font-bold text-green-800">Welcome to NiChAm Trade, type the product you want into the search box and click Search.</div>
          <div className="text-[10px] text-gray-500 mt-1">Marketplace for Manufacturers to sell, farmers and traders to buy. Agent helps those who cannot read or write English.</div>
        </div>

        <div className="bg-white rounded-2xl shadow p-3 flex gap-2 items-center">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Type product e.g. Caustic Soda, Solar Fan..." className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm outline-none" />
          <button className="px-6 py-2 bg-green-600 text-white rounded-full text-sm font-bold">Search</button>
        </div>

        <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
          {categories.map((c:any)=>(
            <button key={c} onClick={()=>setCat(c)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border ${cat===c?'bg-black text-white':'bg-white text-gray-700'}`}>{c}</button>
          ))}
        </div>
        <div className="text-xs text-gray-600 mt-2">Showing: {cat} ({filtered.length})</div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
          {filtered.map((p:any)=>{
            const isChem=p.type==='chemical'
            return (
              <a key={p.id} href={`/product/${p.id}`} className="bg-white rounded-2xl shadow p-3 hover:shadow-lg transition">
                <div className="text-4xl text-center">{p.img}</div>
                <div className="font-bold text-sm mt-2 line-clamp-2">{p.name}</div>
                <div className="text-[11px] text-gray-600 line-clamp-2">{p.desc}</div>
                {isChem ? (
                  <div className="mt-2">
                    <div className="text-sm font-black text-green-700">{p.chemPrice} <span className="text-[10px] font-normal text-gray-500">indicative</span></div>
                    <div className="text-[10px] text-gray-500">MOQ: {(p as any).moq || '1 ton'} | Request Quote for final price</div>
                  </div>
                ):(
                  <div className="mt-2">
                    <div className="text-sm font-black">N{p.basePrice.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-500">Total (VAT 7.5% inclusive) N{Math.round(p.basePrice*1.075).toLocaleString()}</div>
                  </div>
                )}
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}
