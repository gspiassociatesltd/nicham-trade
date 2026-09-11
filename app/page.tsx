'use client'
import { useState } from 'react'
import { translations } from '../lib/i18n'
import LangToggle from '../components/LangToggle'

const products = [
  { id: 1, name: "Solar Cargo Bike 500W", basePrice: 400000, co2: 2.2, img: "🚲", category: "Mobility", desc: "Sourced & Delivered by AfricanIES" },
  { id: 2, name: "Solar Water Pump 1HP", basePrice: 280000, co2: 3.0, img: "💧", category: "Irrigation", desc: "Sourced & Delivered by AfricanIES" },
  { id: 3, name: "Solar Freezer 200L", basePrice: 240000, co2: 4.0, img: "❄️", category: "Cold Chain", desc: "Sourced & Delivered by AfricanIES" },
  { id: 4, name: "Mini-Grid 5kW", basePrice: 2200000, co2: 8.5, img: "⚡", category: "Energy", desc: "Sourced & Delivered by AfricanIES" },
  { id: 5, name: "Solar Tractor 15HP", basePrice: 3400000, co2: 6.0, img: "🚜", category: "Mechanization", desc: "Sourced & Delivered by AfricanIES" },
  { id: 6, name: "Solar Dryer", basePrice: 130000, co2: 1.5, img: "☀️", category: "Processing", desc: "Sourced & Delivered by AfricanIES" },
  { id: 7, name: "Solar Retrofit Kit for Canoe", basePrice: 160000, co2: 5.0, img: "🛶", category: "Marine", desc: "For Fishermen - Sourced by AfricanIES" },
  { id: 8, name: "Solar Powered Boat 2kW", basePrice: 1050000, co2: 5.5, img: "🚤", category: "Marine Logistics", desc: "For Marine Logistics - Sourced by AfricanIES" },
  { id: 9, name: "Collapsible Electric Bike 350W", basePrice: 250000, co2: 1.8, img: "🚲‍♂️", category: "Mobility", desc: "Foldable - Sourced by AfricanIES" },
]

function calcPricing(base: number) {
  const platformFee = Math.round(base * 0.10)
  const vat = Math.round(platformFee * 0.075)
  const escrowFee = Math.round(base * 0.02)
  const greenPoints = Math.round(base * 0.01)
  const total = base + platformFee + vat + escrowFee + greenPoints
  return { base, platformFee, vat, escrowFee, greenPoints, total }
}

export default function Home() {
  const [lang, setLang] = useState('en')
  const t = translations[lang] || translations.en

  const shareText = (p: any) => `Check this ${p.name} - Saves ${p.co2} tons CO2/yr! Solar market:`

  return (
    <main className="min-h-screen">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black">☀️ {t.title}</h1>
          <p className="text-xs text-yellow-300">Platform: GSPI Associates Ltd | Sourcing & Logistics: AfricanIES | 36 States</p>
        </div>
        <LangToggle lang={lang} setLang={setLang} />
      </header>

      <div className="bg-green-700 text-white text-center p-2 text-sm font-bold">
        🌱 Green Points on Solar Purchases | Platform: GSPI/NiChAm | Sourcing & Delivery: AfricanIES
      </div>

      <div className="bg-black text-yellow-300 text-center p-2 text-xs">
        🔊 Voice: EN + Pidgin active now | HA • IG • YO text ready, native voice - funding needed
      </div>

      <section className="p-6 text-center bg-gradient-to-br from-yellow-50 to-green-50">
        <h2 className="text-3xl font-black mb-2">{t.subtitle}</h2>
        <p className="text-gray-600 mb-2">{t.desc}</p>
        <p className="text-xs text-gray-500 max-w-3xl mx-auto">Buyer orders on platform → Escrow → AfricanIES sources from manufacturers & delivers → Buyer confirms. GSPI owns platform only.</p>
        
        <div className="flex gap-2 justify-center flex-wrap mt-4">
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-bold">☀️ NiChAm Solar Market</button>
          <button className="px-4 py-2 bg-white border-2 border-black rounded-full text-sm font-bold">🛒 AfricanIES Catalog (Via API)</button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 max-w-6xl mx-auto">
        {products.map(p=>{
          const pr = calcPricing(p.basePrice)
          return (
          <div key={p.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition border">
            <a href={`/product/${p.id}`}>
              <div className="text-5xl mb-3">{p.img}</div>
              <h3 className="font-bold text-sm">{p.name}</h3>
              <p className="text-xs text-gray-500">{p.desc} • {p.category}</p>
              <div className="mt-2 bg-gray-50 rounded-xl p-2 text-xs">
                <div className="flex justify-between"><span>AfricanIES Sourced Price</span><span>₦{pr.base.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Platform Fee</span><span>₦{pr.platformFee.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>VAT on fee</span><span>₦{pr.vat.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Escrow Fee</span><span>₦{pr.escrowFee.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Green Points</span><span>₦{pr.greenPoints.toLocaleString()}</span></div>
                <div className="flex justify-between font-black border-t mt-1 pt-1"><span>Total</span><span className="text-green-700">₦{pr.total.toLocaleString()}</span></div>
              </div>
              <div className="mt-2 text-xs bg-green-50 text-green-800 p-2 rounded-lg">
                🌱 Saves {p.co2} tons CO₂/yr = {p.co2} Carbon Credits | Delivered by AfricanIES
              </div>
            </a>
            <div className="mt-3 flex gap-1 flex-wrap">
              <a href={`/product/${p.id}`} className="flex-1 bg-black text-white py-2 rounded-full text-xs text-center font-bold">{t.cta}</a>
            </div>
            <div className="mt-2 flex gap-1">
              <span className="text-[10px] text-gray-400">Share:</span>
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText(p))}`} target="_blank" className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">WhatsApp</a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://nicham.com')}`} target="_blank" className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">FB</a>
              <a href={`https://www.youtube.com/@godwinabaniwo6755`} target="_blank" className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">YouTube</a>
            </div>
          </div>
        )})}
      </section>

      <section className="bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-bold text-center mb-4">📱 Connect & Mission</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-gray-900 rounded-xl p-4">
              <h4 className="font-bold mb-2">🛒 Marketplace Model</h4>
              <div className="space-y-1">
                <div>GSPI/NiChAm: Platform owner only</div>
                <div>AfricanIES: Sources from manufacturers & delivers</div>
                <div>Even GSPI own products via AfricanIES</div>
                <div>36 States coverage</div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4">
              <h4 className="font-bold mb-2">🔗 Follow Us</h4>
              <div className="space-y-1">
                <a href="https://facebook.com/abaniwog" target="_blank" className="block hover:text-yellow-300">Facebook: abaniwog</a>
                <a href="https://instagram.com/gspiassociatesltd" target="_blank" className="block hover:text-yellow-300">Instagram: gspiassociatesltd</a>
                <a href="https://threads.net/@gspiassociatesltd" target="_blank" className="block hover:text-yellow-300">Threads: @gspiassociatesltd</a>
                <a href="https://www.youtube.com/@godwinabaniwo6755" target="_blank" className="block hover:text-red-400">YouTube: @godwinabaniwo6755 - Solar demos</a>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4">
              <h4 className="font-bold mb-2">🌍 Carbon Mission</h4>
              <div className="space-y-1">
                <div>Mission: Remove Nigerians from fossil fuel</div>
                <div>#NiChAmGreen #SolarNigeria</div>
                <div>Carbon Credits tracked per product</div>
                <div>Green Points on solar purchases</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 text-[10px] text-gray-500">
            © GSPI Associates Limited • Platform: GSPI/NiChAm | Sourcing & Delivery: AfricanIES • Mission: Clean energy for 36 States
          </div>
        </div>
      </section>
    </main>
  )
}
