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
  const voiceAuto = searchParams.get('voice')
  const [lang, setLang] = useState(urlLang || 'en')
  const [showBreakdown, setShowBreakdown] = useState(false)
  
  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (urlLang) {
      setLang(urlLang)
      localStorage.setItem('nicham_lang', urlLang)
    } else if (saved) {
      setLang(saved)
    }
    if (voiceAuto) {
      setTimeout(() => {
        const msg = lang === 'pcm' ? 'You dey order page now. You ready to place order? Talk yes.' : 'You are on order page now. Ready to place order? Say yes.'
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(msg)
          u.lang = 'en-NG'
          window.speechSynthesis.speak(u)
        }
      }, 1000)
    }
  }, [urlLang, voiceAuto])

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
        <p className="mt-2 text-sm text-gray-500">{prodTrans.sourced}</p>
        
        <div className="mt-4 bg-black text-yellow-300 p-3 rounded-xl text-xs">
          <div className="font-bold">🔊 Voice Order - {lang.toUpperCase()} - Product #{params.id}</div>
          <div className="mt-1">{voiceAuto ? (lang === 'pcm' ? 'You talk product name, I carry you come here. You ready to order? Talk YES.' : 'You said product name, I brought you here. Ready to order? Say YES.') : t.voiceBar}</div>
          <div className="mt-2 bg-gray-900 p-2 rounded text-[10px]">Price breakdown visible only here on order page - internal for MTN & AfricanIES settlement, not on listing page per your instruction.</div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
          <div className="text-sm text-gray-500">{t.priceTotal}</div>
          <div className="text-3xl font-black text-green-700">₦{total.toLocaleString()}</div>
          <button onClick={() => setShowBreakdown(!showBreakdown)} className="mt-2 text-xs text-blue-600 underline">{showBreakdown ? 'Hide breakdown' : 'Show price breakdown (for MTN/AfricanIES)'} - {lang}</button>
        </div>

        {showBreakdown && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm border-2 border-dashed">
            <h3 className="font-bold mb-2">{t.priceTotal} Breakdown - Internal Settlement</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span>{t.priceSourced}</span><span>₦{base.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.pricePlatform} (10%) → GSPI</span><span>₦{platformFee.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.priceVAT} → FIRS</span><span>₦{vat.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.priceEscrow} (2%) → MTN MoMo Escrow</span><span>₦{escrowFee.toLocaleString()}</span></div>
              <div className="flex justify-between text-green-600"><span>{t.priceGreen} (1%) → Buyer Green Wallet</span><span>₦{greenPoints.toLocaleString()}</span></div>
              <div className="flex justify-between font-black text-lg border-t pt-2"><span>{t.priceTotal} Customer Pays</span><span>₦{total.toLocaleString()}</span></div>
            </div>
            <div className="mt-3 text-[10px] text-gray-500">Note: This breakdown is for internal settlement only. Listing page shows only total to avoid confusion. MTN MoMo holds funds, releases to GSPI/AfricanIES/FIRS after OTP confirmation.</div>
          </div>
        )}

        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <h3 className="font-bold">🌱 {t.footerMission}</h3>
          <p className="text-sm mt-2">{prodTrans.co2Text.replace('{co2}', (co2Vals[params.id]||2.2).toString())}</p>
        </div>

        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-full font-bold">{t.cta} - ₦{total.toLocaleString()} - {lang.toUpperCase()}</button>
        <div className="mt-2 text-center text-xs text-gray-500">🎤 Voice: Say YES to confirm order in {lang.toUpperCase()} - no typing needed. Transcript saved for LLM.</div>
      </div>
      <VoiceOrder lang={lang} products={voiceProducts} />
    </main>
  )
}
