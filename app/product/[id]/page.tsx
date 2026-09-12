'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { translations, productTranslations } from '../../../lib/i18n'
import VoiceOrder from '../../../components/VoiceOrder'

const basePrices: any = {1:400000,2:280000,3:240000,4:2200000,5:3400000,6:130000,7:160000,8:1050000,9:250000}
const co2Vals: any = {1:2.2,2:3.0,3:4.0,4:8.5,5:6.0,6:1.5,7:5.0,8:5.5,9:1.8}

const confirmedPrompts: any = {
  en: { title: "Order Confirmed! 🎉", orderId: "Order ID", next: "What happens next:", s1: "1. Money held in MTN MoMo Escrow - safe", s2: "2. logistics partner sources from manufacturer & inspects", s3: "3. Ships China/USA → Nigeria, clears customs, delivers", s4: "4. SMS with tracking, you confirm with OTP", s5: "5. MoMo releases money after OTP", voice: "Order confirmed! ID {orderId}. Money safe in MoMo Escrow. logistics partner will deliver. You will get SMS. Thank you.", green: "Saved {co2} tons CO2 = {co2} Carbon Credits" },
  pcm: { title: "Order Don Enter! 🎉", orderId: "Order ID na", next: "Wetin go happen next:", s1: "1. Money dey for MoMo Escrow - safe", s2: "2. logistics partner go find & check am", s3: "3. Dem go ship come Nigeria & deliver", s4: "4. SMS tracking + OTP confirm", s5: "5. MoMo go release money after OTP", voice: "Order don enter! ID na {orderId}. Money safe for MoMo. logistics partner go deliver. You go get SMS. Thank you.", green: "You save {co2} tons CO2" }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const urlLang = searchParams.get('lang')
  const voiceParam = searchParams.get('voice')
  const [lang, setLang] = useState(urlLang || 'en')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [orderId, setOrderId] = useState('')
  
  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (urlLang) { setLang(urlLang); localStorage.setItem('nicham_lang', urlLang) }
    else if (saved) setLang(saved)
    setOrderId(Math.floor(1000 + Math.random() * 9000).toString())
    const handler = () => confirmOrder()
    window.addEventListener('voiceYesOrder', handler)
    return () => window.removeEventListener('voiceYesOrder', handler)
  }, [urlLang])

  const t = translations[lang] || translations.en
  const pT = productTranslations[lang] || productTranslations.en
  const prod = pT[params.id] || pT[1]
  const oc = confirmedPrompts[lang] || confirmedPrompts.en
  
  const base = basePrices[params.id] || 400000
  const total = (() => { const pf=Math.round(base*0.10); const vat=Math.round(pf*0.075); const esc=Math.round(base*0.02); const gp=Math.round(base*0.01); return base+pf+vat+esc+gp })()
  const pf = Math.round(base * 0.10); const vat = Math.round(pf * 0.075); const esc = Math.round(base * 0.02); const gp = Math.round(base * 0.01)
  
  const confirmOrder = () => {
    setConfirmed(true)
    const fullId = `NiChAm-2026-${orderId}`
    const msg = oc.voice.replace('{orderId}', fullId)
    localStorage.setItem(`order_${fullId}`, JSON.stringify({ product_id: params.id, product_name: prod.name, total, lang, voice: true, transcript: `YES confirmed ${prod.name} in ${lang}`, order_id: fullId, time: new Date().toISOString() }))
    if ('speechSynthesis' in window && (lang === 'en' || lang === 'pcm')) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(msg.replace(/NiChAm/g, 'Nicham'))
      u.lang = 'en-NG'; u.rate = 0.85; window.speechSynthesis.speak(u)
    }
  }

  if (confirmed) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6 mt-4 border-4 border-green-500">
          <h1 className="text-3xl font-black text-green-700 text-center">{oc.title}</h1>
          <div className="mt-6 p-4 bg-green-100 rounded-xl text-center">
            <div className="text-sm text-gray-600">{oc.orderId}: NiChAm-2026-{orderId}</div>
            <div className="text-2xl font-black">NiChAm-2026-{orderId}</div>
            <div className="mt-2">{prod.name} - ₦{total.toLocaleString()}</div>
            <div className="mt-2 text-xs text-green-700">✅ Voice YES confirmed - No repeat welcome, only confirmation</div>
          </div>
          <div className="mt-6"><h3 className="font-bold">{oc.next}</h3><div className="mt-3 space-y-2 text-sm bg-gray-50 p-4 rounded-xl"><div>{oc.s1}</div><div>{oc.s2}</div><div>{oc.s3}</div><div>{oc.s4}</div><div>{oc.s5}</div></div></div>
          <div className="mt-6 p-3 bg-black text-yellow-300 rounded-xl text-xs">Voice transcript saved: Lang {lang} | Product {prod.name} | Said YES twice (open + confirm) | Order NiChAm-2026-{orderId} | For Nigerian LLM data</div>
          <div className="mt-4 p-3 bg-green-50 rounded-xl text-center font-bold">🌱 {oc.green.replace('{co2}', (co2Vals[params.id]||2.2).toString())}</div>
          <a href={`/?lang=${lang}`} className="mt-6 block w-full bg-black text-white py-3 rounded-full font-bold text-center">← Back to Market</a>
        </div>
      </main>
    )
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <a href={`/?lang=${lang}`} className="text-sm">← {t.btnSolar}</a>
      <div className="bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-2xl font-black">{prod.name}</h1>
        <p className="mt-2 text-sm font-medium">{prod.intro}</p>
        <p className="mt-1 text-xs text-gray-500">{prod.sourced} - {prod.co2Text.replace('{co2}', (co2Vals[params.id]||2.2).toString())}</p>
        
        <div className="mt-4 bg-yellow-300 text-black p-4 rounded-xl border-2 border-black">
          <div className="font-black">🎤 ORDER PAGE - Press Mic Then Say YES</div>
          <div className="mt-2 text-sm leading-relaxed">
            {voiceParam === 'ready'
              ? `You said "${prod.name}" on market page, then said YES to open order page. You are now here. ${prod.intro} Total price ₦${total.toLocaleString()}. To confirm order, press microphone button below and say YES, or tap green YES button. Or choose another product or go back to the market page.`
              : `You are on order page for ${prod.name}. ${prod.intro} Price ₦${total.toLocaleString()} total. To confirm, press microphone button and say YES, or tap YES button below. Or choose another product or go back to the market page.`
            }
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button onClick={confirmOrder} className="bg-green-600 text-white py-3 rounded-full font-black">✅ TAP YES - Confirm</button>
            <button onClick={() => { if ('speechSynthesis' in window) { const u=new SpeechSynthesisUtterance(`Press microphone button and say YES to confirm order for ${prod.name}. Total ${total.toLocaleString()} naira.`); u.lang='en-NG'; window.speechSynthesis.speak(u) } }} className="bg-black text-yellow-300 py-3 rounded-full font-bold">🔊 Hear Instruction</button>
          </div>
          <div className="mt-2 text-[10px] bg-black text-yellow-300 p-2 rounded">FIXED: Previously said "I didn't hear product name" when you said YES - because code expected product name again. Now correctly awaits YES to confirm order. Must press mic before YES!</div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
          <div className="text-sm text-gray-500">{t.priceTotal}</div>
          <div className="text-3xl font-black text-green-700">₦{total.toLocaleString()}</div>
          <button onClick={() => setShowBreakdown(!showBreakdown)} className="mt-2 text-xs text-blue-600 underline">{showBreakdown ? 'Hide breakdown' : 'Show breakdown (MTN/logistics partner internal only)'}</button>
        </div>

        {showBreakdown && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm border-2 border-dashed">
            <div className="space-y-2">
              <div className="flex justify-between"><span>{t.priceSourced}</span><span>₦{base.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.pricePlatform} 10% → GSPI</span><span>₦{pf.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.priceVAT}</span><span>₦{vat.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.priceEscrow}</span><span>₦{esc.toLocaleString()}</span></div>
              <div className="flex justify-between text-green-600"><span>{t.priceGreen}</span><span>₦{gp.toLocaleString()}</span></div>
              <div className="flex justify-between font-black border-t pt-2"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      </div>
      <VoiceOrder lang={lang} currentMode="order" />
    </main>
  )
}
