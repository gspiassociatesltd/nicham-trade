'use client'
import { useState, useEffect } from 'react'

const productsMeta: any = {
  1: { name: "Solar Cargo Bike 500W", price: 400000, desc: "Carry 200kg with solar power" },
  2: { name: "Solar Irrigation Pump", price: 280000, desc: "Pump water with sunshine" },
  3: { name: "Solar Freezer 200L", price: 240000, desc: "Keep fish frozen without NEPA" },
  4: { name: "Solar Home System", price: 2200000, desc: "Power your home with sun" },
  5: { name: "Solar Tractor 25HP", price: 3400000, desc: "Farm with solar power" },
  6: { name: "Solar Dryer 100kg", price: 130000, desc: "Dry tomatoes with sun" },
  7: { name: "Solar Boat Engine", price: 160000, desc: "Fishing boat with solar" },
  8: { name: "Solar Ferry 12 Seater", price: 1050000, desc: "Transport people with sun" },
  9: { name: "Solar E-Bike", price: 250000, desc: "Collapsible solar bike" }
}

function calcTotal(base: number) {
  const competitivePrice = base * 0.98
  const vat = Math.round(competitivePrice * 0.075)
  const escrow = Math.round(competitivePrice * 0.01)
  return Math.round(competitivePrice + vat + escrow)
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [lang, setLang] = useState('en')
  const [isListening, setIsListening] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (saved) setLang(saved)
  }, [])

  const id = parseInt(params.id)
  const meta = productsMeta[id] || productsMeta[2]
  const total = calcTotal(meta.price)

  const handleConfirm = () => {
    const orderId = "NCH-" + Date.now().toString().slice(-6)
    const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    orders.unshift({ productName: meta.name, total, orderId, date: new Date().toLocaleString() })
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    setMsg("Order confirmed! ID: " + orderId)
    // Voice confirmation - English only for now (step 1 of Nigerian LLM)
    try {
      const u = new SpeechSynthesisUtterance("Order confirmed. ID " + orderId + ". Thank you for using Nicham Solar Market.")
      u.lang = "en-NG"
      u.rate = 0.85
      window.speechSynthesis.speak(u)
    } catch {}
    setTimeout(() => { window.location.href = "/?lang=" + lang }, 2500)
  }

  const handleVoiceYES = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    if (!SR) {
      alert("Voice not supported - click YES button")
      return
    }
    const rec = new SR()
    rec.lang = "en-NG"
    rec.onstart = () => setIsListening(true)
    rec.onend = () => setIsListening(false)
    rec.onresult = (e: any) => {
      const txt = e.results[0][0].transcript.toLowerCase()
      if (txt.includes("yes") || txt.includes("confirm")) {
        handleConfirm()
      } else {
        setMsg("Heard: " + e.results[0][0].transcript + " - Say YES to confirm")
      }
    }
    rec.start()
  }

  const handleHearInstruction = () => {
    try {
      const instruction = "You are on order page for " + meta.name + ". Total " + total.toLocaleString() + " naira. Press YES button below to confirm, or click microphone and say YES. No typing needed."
      const u = new SpeechSynthesisUtterance(instruction)
      u.lang = "en-NG"
      u.rate = 0.85
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
    } catch {}
  }

  const orderText: any = {
    en: { title: "Order Page - Click YES to confirm order", desc: `You are on order page for ${meta.name}. Total ${total.toLocaleString()} naira. Click YES button below to confirm. No typing needed.` },
    pidgin: { title: "Order Page - Click YES to confirm", desc: `You dey order page for ${meta.name}. Total ${total.toLocaleString()} naira. Click YES button to confirm. No need to type.` },
    ha: { title: "Shafin Oda - Danna YES", desc: `Kana shafin oda na ${meta.name}. Jimilla ${total.toLocaleString()} naira. Danna YES don tabbatarwa.` },
    ig: { title: "Peeji Iwu - Pia YES", desc: `I no na peeji iwu maka ${meta.name}. Onu ego ${total.toLocaleString()} naira. Pia YES iji kwado.` },
    yo: { title: "Oju-iwe Aṣẹ - Tẹ YES", desc: `O wa lori oju-iwe aṣẹ fun ${meta.name}. Lapapọ ${total.toLocaleString()} naira. Tẹ YES lati jẹrisi.` }
  }

  const ot = orderText[lang] || orderText.en

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href={`/?lang=${lang}`} className="text-sm mb-4 inline-block">&lt;- NiChAm Solar Market</a>
      
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-black">{meta.name}</h1>
        <p className="text-sm text-gray-600 mt-1">{meta.desc}</p>

        <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
          <div className="font-bold text-sm">{ot.title}</div>
          <div className="text-xs mt-1 text-gray-700">{ot.desc}</div>
          
          <div className="flex gap-2 mt-4">
            <button onClick={handleConfirm} className="flex-1 py-3 bg-green-600 text-white rounded-full font-black text-sm hover:bg-green-700">
              YES - Confirm
            </button>
            <button onClick={handleHearInstruction} className="flex-1 py-3 bg-black text-white rounded-full font-bold text-sm">
              Hear Instruction
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            <button onClick={handleVoiceYES} className={`flex-1 py-2 rounded-full text-xs font-bold border-2 ${isListening ? 'bg-red-500 text-white border-red-500 animate-pulse' : 'bg-white border-black'}`}>
              {isListening ? '🎙️ Listening... Say YES' : '🎤 Mic - Say YES'}
            </button>
          </div>

          {msg && <div className="mt-3 text-center text-sm font-bold text-green-700 bg-green-50 p-2 rounded">{msg}</div>}
        </div>

        <div className="mt-6 bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-600">Total</div>
          <div className="text-3xl font-black text-green-700">₦{total.toLocaleString()}</div>
          <div className="text-[10px] text-gray-500 mt-1">No typing needed - Just click YES or say YES via mic</div>
        </div>

        <div className="mt-4 text-[11px] text-gray-500">
          <b>Step 1 Voice (English only):</b> Nigerian English voice enabled. Pidgin + HA/IG/YO native LLM coming next after stable. Marketplace: GSPI/NiChAm platform owner | AfricanIES delivers.
        </div>
      </div>
    </main>
  )
}
