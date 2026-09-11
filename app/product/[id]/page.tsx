'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { translations, productTranslations } from '../../../lib/i18n'
import VoiceOrder from '../../../components/VoiceOrder'

const basePrices: any = {1:400000,2:280000,3:240000,4:2200000,5:3400000,6:130000,7:160000,8:1050000,9:250000}
const co2Vals: any = {1:2.2,2:3.0,3:4.0,4:8.5,5:6.0,6:1.5,7:5.0,8:5.5,9:1.8}

const orderConfirmedPrompts: any = {
  en: { title: "Order Confirmed! 🎉", orderId: "Your Order ID is", nextSteps: "What happens next:", step1: "1. Money held in MTN MoMo Escrow", step2: "2. AfricanIES sources & inspects", step3: "3. Ships to Nigeria & delivers", step4: "4. SMS tracking + OTP confirm", step5: "5. MoMo releases funds after OTP", voiceConfirm: "Order confirmed! Order ID {orderId}. Money safe in MoMo Escrow. AfricanIES will deliver. You will get SMS. Thank you.", greenSaved: "Saved {co2} tons CO2 = {co2} Credits!" },
  pcm: { title: "Order Don Enter! 🎉", orderId: "Your Order ID na", nextSteps: "Wetin go happen next:", step1: "1. Money dey for MoMo Escrow", step2: "2. AfricanIES go find & check am", step3: "3. Dem go ship come Nigeria & deliver", step4: "4. SMS tracking + OTP confirm", step5: "5. MoMo go release money after OTP", voiceConfirm: "Order don enter! Order ID na {orderId}. Money safe for MoMo. AfricanIES go deliver. You go get SMS. Thank you.", greenSaved: "You save {co2} tons CO2 = {co2} Credits!" },
  ha: { title: "An Tabbatar da Oda! 🎉", orderId: "ID na Oda", nextSteps: "Abin da zai faru:", step1: "1. Kudi a MoMo Escrow", step2: "2. AfricanIES zai samo", step3: "3. Zai jigila zuwa Najeriya", step4: "4. SMS + OTP", step5: "5. MoMo zai saki kudi", voiceConfirm: "An tabbatar! ID {orderId}", greenSaved: "Ka ajiye {co2} tan CO2" },
  ig: { title: "Ekwenyela Iwu! 🎉", orderId: "ID Iwu", nextSteps: "Ihe ga-eme:", step1: "1. Ego na MoMo Escrow", step2: "2. AfricanIES ga-achota", step3: "3. Ga-ebufe na Naijiria", step4: "4. SMS + OTP", step5: "5. MoMo ga-ahapụ ego", voiceConfirm: "Ekwenyela! ID {orderId}", greenSaved: "Chekwara {co2} tọn CO2" },
  yo: { title: "A Ti Jẹrisi Paṣẹ! 🎉", orderId: "ID Paṣẹ", nextSteps: "Ohun to n bo:", step1: "1. Owo wa ni MoMo Escrow", step2: "2. AfricanIES yoo wa", step3: "3. Yoo gbe wa Naijiria", step4: "4. SMS + OTP", step5: "5. MoMo yoo tu owo", voiceConfirm: "A ti jẹrisi! ID {orderId}", greenSaved: "Fipamọ {co2} toonu CO2" }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const urlLang = searchParams.get('lang')
  const voiceParam = searchParams.get('voice')
  const [lang, setLang] = useState(urlLang || 'en')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderId, setOrderId] = useState('')
  
  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (urlLang) { setLang(urlLang); localStorage.setItem('nicham_lang', urlLang) }
    else if (saved) setLang(saved)
    setOrderId(Math.floor(1000 + Math.random() * 9000).toString())
  }, [urlLang])

  const t = translations[lang] || translations.en
  const pT = productTranslations[lang] || productTranslations.en
  const prodTrans = pT[params.id] || pT[1]
  const oc = orderConfirmedPrompts[lang] || orderConfirmedPrompts.en
  
  const base = basePrices[params.id] || 400000
  const total = (() => { const pf=Math.round(base*0.10); const vat=Math.round(pf*0.075); const esc=Math.round(base*0.02); const gp=Math.round(base*0.01); return base+pf+vat+esc+gp })()
  const platformFee = Math.round(base * 0.10)
  const vat = Math.round(platformFee * 0.075)
  const escrowFee = Math.round(base * 0.02)
  const greenPoints = Math.round(base * 0.01)
  
  const voiceProducts = [{ id: parseInt(params.id), name: prodTrans.name, intro: prodTrans.intro, basePrice: base }]

  const confirmOrder = () => {
    setOrderConfirmed(true)
    const fullOrderId = `NiChAm-2026-${orderId}`
    const voiceMsg = oc.voiceConfirm.replace('{orderId}', fullOrderId)
    const orderData = { product_id: params.id, product_name: prodTrans.name, total_naira: total, user_language: lang, voice_order: true, voice_transcript: `User said YES to order ${prodTrans.name} in ${lang}`, order_id: fullOrderId, timestamp: new Date().toISOString() }
    localStorage.setItem(`order_${fullOrderId}`, JSON.stringify(orderData))
    if ('speechSynthesis' in window && (lang === 'en' || lang === 'pcm')) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(voiceMsg.replace(/NiChAm/g, 'Nicham'))
      u.lang = 'en-NG'; u.rate = 0.85; window.speechSynthesis.speak(u)
    }
  }

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return
    if (orderConfirmed) return
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const rec = new SpeechRecognition()
    rec.lang = 'en-NG'; rec.continuous = false
    rec.onresult = (e: any) => {
      const txt = e.results[0][0].transcript.toLowerCase()
      if (txt.includes('yes') || txt.includes('yeah') || txt.includes('confirm') || txt.includes('order')) confirmOrder()
    }
    if (voiceParam === 'ready' || voiceParam === 'auto') {
      const timer = setTimeout(() => { try { rec.start() } catch {} }, 2500)
      // Also speak order page ready message - DESCRIBES product, not welcome repeat
      if (lang === 'en' || lang === 'pcm') {
        const readyMsg = lang === 'pcm'
          ? `You dey order page for ${prodTrans.name} now. ${prodTrans.intro} Total price na ${total.toLocaleString()} naira. You ready to place order? Talk yes to confirm.`
          : `You are on order page for ${prodTrans.name}. ${prodTrans.intro} Total price ${total.toLocaleString()} naira. Ready to place order? Say yes to confirm.`
        setTimeout(() => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            const u = new SpeechSynthesisUtterance(readyMsg.replace(/NiChAm/g, 'Nicham'))
            u.lang = 'en-NG'; u.rate = 0.88; window.speechSynthesis.speak(u)
          }
        }, 800)
      }
      return () => clearTimeout(timer)
    }
  }, [lang, voiceParam, orderConfirmed, prodTrans.name, prodTrans.intro, total])

  if (orderConfirmed) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6 mt-4 border-4 border-green-500">
          <h1 className="text-3xl font-black text-green-700 text-center">{oc.title}</h1>
          <div className="mt-6 p-4 bg-green-100 rounded-xl text-center">
            <div className="text-sm text-gray-600">{oc.orderId} NiChAm-2026-{orderId}</div>
            <div className="text-2xl font-black">NiChAm-2026-{orderId}</div>
            <div className="mt-2 text-sm">{prodTrans.name} - ₦{total.toLocaleString()}</div>
          </div>
          <div className="mt-6">
            <h3 className="font-bold">{oc.nextSteps}</h3>
            <div className="mt-3 space-y-2 text-sm bg-gray-50 p-4 rounded-xl">
              <div>{oc.step1}</div><div>{oc.step2}</div><div>{oc.step3}</div><div>{oc.step4}</div><div>{oc.step5}</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl text-center"><div className="font-bold">🌱 {oc.greenSaved.replace('{co2}', (co2Vals[params.id]||2.2).toString())}</div></div>
          <a href={`/?lang=${lang}`} className="mt-6 block w-full bg-black text-white py-3 rounded-full font-bold text-center">← Back to Market</a>
        </div>
      </main>
    )
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <a href={`/?lang=${lang}`} className="text-sm">← {t.btnSolar}</a>
      <div className="bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-2xl font-black">{prodTrans.name}</h1>
        <p className="mt-2 text-sm text-gray-700 font-medium">{prodTrans.intro}</p>
        <p className="mt-1 text-xs text-gray-400">{prodTrans.sourced} • This intro shown ONCE here, not repeated welcome</p>
        
        <div className="mt-4 bg-yellow-400 text-black p-4 rounded-xl border-2 border-black">
          <div className="font-black text-sm">🎤 VOICE ORDER PAGE - {lang.toUpperCase()} {voiceParam ? `(Came from voice: ${voiceParam})` : ''}</div>
          <div className="mt-2 text-sm">
            {voiceParam === 'ready' || voiceParam === 'auto'
              ? `You said ${prodTrans.name} on listing page. Here on order page: ${prodTrans.intro} Total ₦${total.toLocaleString()}. Ready? Say YES to confirm order.`
              : `You are on order page for ${prodTrans.name}. ${prodTrans.intro} Price ₦${total.toLocaleString()} total. Tap YES button or say YES with voice to confirm.`
            }
          </div>
          <button onClick={confirmOrder} className="mt-3 w-full bg-green-600 text-white py-3 rounded-full font-black text-sm">✅ YES - Confirm Order ₦{total.toLocaleString()} - Voice or Tap</button>
          <div className="mt-2 text-[10px]">No repeat of Welcome to NiChAm Solar Market - this is order page specific prompt per your feedback</div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
          <div className="text-sm text-gray-500">{t.priceTotal}</div>
          <div className="text-3xl font-black text-green-700">₦{total.toLocaleString()}</div>
          <button onClick={() => setShowBreakdown(!showBreakdown)} className="mt-2 text-xs text-blue-600 underline">{showBreakdown ? 'Hide breakdown' : 'Show breakdown (MTN/AfricanIES internal)'}</button>
        </div>

        {showBreakdown && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm border-2 border-dashed">
            <div className="space-y-2">
              <div className="flex justify-between"><span>{t.priceSourced}</span><span>₦{base.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.pricePlatform} 10% → GSPI</span><span>₦{platformFee.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.priceVAT}</span><span>₦{vat.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>{t.priceEscrow}</span><span>₦{escrowFee.toLocaleString()}</span></div>
              <div className="flex justify-between text-green-600"><span>{t.priceGreen}</span><span>₦{greenPoints.toLocaleString()}</span></div>
              <div className="flex justify-between font-black border-t pt-2"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
            </div>
          </div>
        )}
      </div>
      <VoiceOrder lang={lang} products={voiceProducts} />
    </main>
  )
}
