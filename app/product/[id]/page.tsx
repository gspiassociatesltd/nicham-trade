'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { translations, productTranslations } from '../../../lib/i18n'
import VoiceOrder from '../../../components/VoiceOrder'

const basePrices: any = {1:400000,2:280000,3:240000,4:2200000,5:3400000,6:130000,7:160000,8:1050000,9:250000}
const co2Vals: any = {1:2.2,2:3.0,3:4.0,4:8.5,5:6.0,6:1.5,7:5.0,8:5.5,9:1.8}

export default function ProductPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const urlLang = searchParams.get('lang')
  const [lang, setLang] = useState(urlLang || 'en')
  
  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (urlLang) {
      setLang(urlLang)
      localStorage.setItem('nicham_lang', urlLang)
    } else if (saved) {
      setLang(saved)
    }
  }, [urlLang])

  const t = translations[lang] || translations.en
  const pT = productTranslations[lang] || productTranslations.en
  const prodTrans = pT[params.id] || pT[1]
  
  const base = basePrices[params.id] || 400000
  const platformFee = Math.round(base * 0.10)
  const vat = Math.round(platformFee * 0.075)
  const escrowFee = Math.round(base * 0.02)
  const greenPoints = Math.round(base * 0.01)
  const total = base + platformFee + vat + escrowFee + greenPoints
  
  const voiceProducts = [{ id: parseInt(params.id), name: prodTrans.name, intro: prodTrans.intro, basePrice: base }]

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <a href={`/?lang=${lang}`} className="text-sm">← {t.btnSolar}</a>
      <div className="bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-2xl font-black">{prodTrans.name}</h1>
        <p className="mt-2 text-sm italic text-gray-700">{prodTrans.intro}</p>
        <p className="mt-2 text-sm text-gray-600">{prodTrans.sourced}</p>
        
        <div className="mt-6 p-4 bg-black text-yellow-300 rounded-xl text-xs">
          🔊 {t.voiceBar} - {lang.toUpperCase()} voice active
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm border border-blue-200">
          <h3 className="font-bold">{t.footerMarket}</h3>
          <p className="mt-2">{t.howItWorks}</p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm">
          <h3 className="font-bold mb-2">{t.priceTotal} Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between"><span>{t.priceSourced}</span><span>₦{base.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>{t.pricePlatform} (10%)</span><span>₦{platformFee.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>{t.priceVAT}</span><span>₦{vat.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>{t.priceEscrow} (2%)</span><span>₦{escrowFee.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>{t.priceGreen} (1%)</span><span>₦{greenPoints.toLocaleString()}</span></div>
            <div className="flex justify-between font-black text-lg border-t pt-2"><span>{t.priceTotal}</span><span>₦{total.toLocaleString()}</span></div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <h3 className="font-bold">🌱 {t.footerMission}</h3>
          <p className="text-sm mt-2">{prodTrans.co2Text.replace('{co2}', (co2Vals[params.id]||2.2).toString())}</p>
          <p className="text-xs mt-1 italic">{prodTrans.intro}</p>
        </div>

        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-full font-bold">{t.cta} - ₦{total.toLocaleString()}</button>
        <div className="mt-2 text-center text-xs text-gray-500">🎤 Say YES in {lang.toUpperCase()} to order with voice - no typing needed</div>
      </div>
      <VoiceOrder lang={lang} products={voiceProducts} />
    </main>
  )
}
