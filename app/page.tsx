
'use client'
import { useState } from 'react'
import { translations } from '../lib/i18n'
import LangToggle from '../components/LangToggle'
import { supabase } from '../lib/supabase'

const products = [
  { id: 1, name: "Solar Cargo Bike 500W", price: 450000, state: "Niger", img: "🚲", category: "Mobility" },
  { id: 2, name: "Solar Water Pump 1HP", price: 320000, state: "Kano", img: "💧", category: "Irrigation" },
  { id: 3, name: "Solar Freezer 200L", price: 280000, state: "Lagos", img: "❄️", category: "Cold Chain" },
  { id: 4, name: "Mini-Grid 5kW", price: 2500000, state: "FCT", img: "⚡", category: "Energy" },
  { id: 5, name: "Solar Tractor 15HP", price: 3800000, state: "Kaduna", img: "🚜", category: "Mechanization" },
  { id: 6, name: "Solar Dryer", price: 150000, state: "Benue", img: "☀️", category: "Processing" },
]

export default function Home() {
  const [lang, setLang] = useState('en')
  const t = translations[lang] || translations.en
  return (
    <main className="min-h-screen">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black">☀️ {t.title}</h1>
          <p className="text-xs text-yellow-300">AfricanIES Logistics + MTN MoMo + Ayoba | 36 States</p>
        </div>
        <LangToggle lang={lang} setLang={setLang} />
      </header>

      <div className="bg-green-600 text-white text-center p-2 text-sm font-bold">
        🌱 {t.green} | Zero Budget Built: GitHub + Vercel + Render + Supabase + Ubuntu
      </div>

      <section className="p-6 text-center bg-gradient-to-br from-yellow-50 to-green-50">
        <h2 className="text-3xl font-black mb-2">{t.subtitle}</h2>
        <p className="text-gray-600 mb-4">Escrow by MTN MoMo • Chat via Ayoba • Delivered by AfricanIES (Last-mile + Cold-chain)</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {['All','Mobility','Irrigation','Cold Chain','Energy','Mechanization'].map(c=>(
            <span key={c} className="px-3 py-1 bg-white border rounded-full text-xs">{c}</span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 max-w-6xl mx-auto">
        {products.map(p=>(
          <a key={p.id} href={`/product/${p.id}`} className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition">
            <div className="text-5xl mb-3">{p.img}</div>
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-xs text-gray-500">{p.state} State • {p.category}</p>
            <p className="mt-2 font-black text-green-700">₦{p.price.toLocaleString()}</p>
            <button className="mt-3 w-full bg-black text-white py-2 rounded-full text-sm">{t.cta}</button>
          </a>
        ))}
      </section>

      <footer className="text-center p-6 text-xs text-gray-500">
        Built by Godwin Abaniwo • GSPIA • Minna - Abuja • Powered by MTN • Logistics: AfricanIES
      </footer>
    </main>
  )
}
