'use client'
import { useState, useEffect } from 'react'
import { translations, productTranslations } from '../lib/i18n'
import LangToggle from '../components/LangToggle'
import VoiceOrder from '../components/VoiceOrder'

const productsMeta = [
  { id: 1, basePrice: 400000, co2: 2.2, img: "🚲", category: "Mobility" },
  { id: 2, basePrice: 280000, co2: 3.0, img: "💧", category: "Irrigation" },
  { id: 3, basePrice: 240000, co2: 4.0, img: "❄️", category: "Cold Chain" },
  { id: 4, basePrice: 2200000, co2: 8.5, img: "⚡", category: "Energy" },
  { id: 5, basePrice: 3400000, co2: 6.0, img: "🚜", category: "Mechanization" },
  { id: 6, basePrice: 130000, co2: 1.5, img: "☀️", category: "Processing" },
  { id: 7, basePrice: 160000, co2: 5.0, img: "🛶", category: "Marine" },
  { id: 8, basePrice: 1050000, co2: 5.5, img: "🚤", category: "Marine Logistics" },
  { id: 9, basePrice: 250000, co2: 1.8, img: "🚲‍♂️", category: "Mobility" },
]

function calcTotal(base: number) {
  const platformFee = Math.round(base * 0.10)
  const vat = Math.round(platformFee * 0.075)
  const escrowFee = Math.round(base * 0.02)
  const greenPoints = Math.round(base * 0.01)
  return base + platformFee + vat + escrowFee + greenPoints
}

export default function Home() {
  const [lang, setLang] = useState('en')
  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (saved) setLang(saved)
  }, [])
  const handleLang = (l: string) => {
    setLang(l)
    localStorage.setItem('nicham_lang', l)
  }

  const t = translations[lang] || translations.en
  const pT = productTranslations[lang] || productTranslations.en
  const voiceProducts = productsMeta.map(m => ({ 
    id: m.id, 
    name: (productTranslations[lang] || productTranslations.en)[m.id].name, 
    intro: (productTranslations[lang] || productTranslations.en)[m.id].intro, 
    basePrice: m.basePrice 
  }))

  return (
    <main className="min-h-screen">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black">☀️ {t.title}</h1>
          <p className="text-xs text-yellow-300">{t.headerSub}</p>
        </div>
        <LangToggle lang={lang} setLang={handleLang} />
      </header>

      <div className="bg-green-700 text-white text-center p-2 text-sm font-bold">
        🌱 {t.greenBar}
      </div>

      <div className="bg-black text-yellow-300 text-center p-2 text-xs">
        {t.voiceBar}
      </div>

      <section className="p-6 text-center bg-gradient-to-br from-yellow-50 to-green-50">
        <h2 className="text-3xl font-black mb-2">{t.subtitle}</h2>
        <p className="text-gray-600 mb-2">{t.desc}</p>
        <p className="text-xs text-gray-500 max-w-3xl mx-auto">{t.howItWorks}</p>
        <div className="flex gap-2 justify-center flex-wrap mt-4">
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm font-bold">☀️ {t.btnSolar}</button>
          <button className="px-4 py-2 bg-white border-2 border-black rounded-full text-sm font-bold">🛒 {t.btnSolar}</button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 max-w-6xl mx-auto">
        {productsMeta.map(meta=>{
          const total = calcTotal(meta.basePrice)
          const prod = pT[meta.id]
          return (
          <div id={`product-${meta.id}`} key={meta.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition border scroll-mt-20">
            <a href={`/product/${meta.id}?lang=${lang}`}>
              <div className="text-5xl mb-3">{meta.img}</div>
              <h3 className="font-bold text-sm">{prod.name}</h3>
              <p className="text-xs text-gray-500 mt-1 italic line-clamp-3">{prod.intro}</p>
              <p className="text-[10px] text-gray-400 mt-1">{prod.sourced} • {meta.category}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">{t.priceTotal}</span>
                <span className="text-lg font-black text-green-700">₦{total.toLocaleString()}</span>
              </div>
              <div className="mt-2 text-xs bg-green-50 text-green-800 p-2 rounded-lg">
                🌱 {prod.co2Text.replace('{co2}', meta.co2.toString())}
              </div>
            </a>
            <div className="mt-3">
              <a href={`/product/${meta.id}?lang=${lang}`} className="block bg-black text-white py-2 rounded-full text-xs text-center font-bold">{t.cta}</a>
            </div>
          </div>
        )})}
      </section>

      <section className="bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-bold text-center mb-4">{t.footerTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-gray-900 rounded-xl p-4">
              <h4 className="font-bold mb-2">{t.footerMarket}</h4>
              <div className="space-y-1">
                <div>{t.footerMarket1}</div><div>{t.footerMarket2}</div><div>{t.footerMarket3}</div><div>{t.footerMarket4}</div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4">
              <h4 className="font-bold mb-2">{t.footerFollow}</h4>
              <div className="space-y-1">
                <a href="https://facebook.com/abaniwog" target="_blank" className="block hover:text-yellow-300">Facebook: abaniwog</a>
                <a href="https://instagram.com/gspiassociatesltd" target="_blank" className="block hover:text-yellow-300">Instagram: gspiassociatesltd</a>
                <a href="https://www.youtube.com/@godwinabaniwo6755" target="_blank" className="block hover:text-red-400">YouTube: @godwinabaniwo6755</a>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4">
              <h4 className="font-bold mb-2">{t.footerMission}</h4>
              <div className="space-y-1">
                <div>{t.footerMission1}</div><div>{t.footerMission2}</div><div>{t.footerMission3}</div><div>{t.footerMission4}</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 text-[10px] text-gray-500">{t.copyright}</div>
        </div>
      </section>

      <VoiceOrder lang={lang} currentMode="listing" />
    </main>
  )
}
