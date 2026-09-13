'use client'
import { useState, useEffect } from 'react'
import OrderMic from '../../../components/OrderMic'

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
  const [msg, setMsg] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (saved) setLang(saved)
    const url = new URL(window.location.href)
    const l = url.searchParams.get('lang')
    if (l) setLang(l)
  }, [])

  const id = parseInt(params.id)
  const meta = productsMeta[id] || productsMeta[2]
  const total = calcTotal(meta.price)

  const handleConfirm = () => {
    const orderId = "NCH-" + Date.now().toString().slice(-6)
    const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    orders.unshift({ productName: meta.name, total, orderId, date: new Date().toLocaleString() })
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    setMsg("Order confirmed! ID: " + orderId + " - Thank you")
    try {
      const u = new SpeechSynthesisUtterance("Order confirmed. ID " + orderId + ". Thank you for using Nicham Solar Market.")
      u.lang = "en-NG"
      u.rate = 0.85
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
    } catch {}
    // Nigeria LLM dataset: save what was ordered via voice
    try {
      const dataset = JSON.parse(localStorage.getItem('nicham_voice_dataset') || '[]')
      dataset.push({ type: 'order', product: meta.name, lang, time: new Date().toISOString() })
      localStorage.setItem('nicham_voice_dataset', JSON.stringify(dataset.slice(-100)))
    } catch {}
    setTimeout(() => { window.location.href = "/?lang=" + lang }, 2500)
  }

  const orderText: any = {
    en: { title: "Order Page - Click YES - Confirm below", desc: `You are on order page for ${meta.name}. Total ${total.toLocaleString()} naira. Click YES - Confirm button below to place order. No typing needed.` },
    pidgin: { title: "Order Page - Click YES - Confirm", desc: `You dey order page for ${meta.name}. Total ${total.toLocaleString()} naira. Click YES - Confirm to order. No need to type.` },
    ha: { title: "Shafin Oda - Danna YES - Confirm", desc: `Kana shafin oda na ${meta.name}. Jimilla ${total.toLocaleString()} naira. Danna YES - Confirm. (Voice Hausa coming V51)` },
    ig: { title: "Peeji Iwu - Pia YES - Confirm", desc: `I no na peeji iwu maka ${meta.name}. Onu ego ${total.toLocaleString()} naira. Pia YES - Confirm. (Voice Igbo coming V51)` },
    yo: { title: "Oju-iwe Ase - Te YES - Confirm", desc: `O wa lori oju-iwe ase fun ${meta.name}. Lapapo ${total.toLocaleString()} naira. Te YES - Confirm. (Voice Yoruba coming V51)` }
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
          
          {/* Committees: Content YES matches button, UI single mic, Language no English on Yoruba */}
          {lang === 'en' || lang === 'pidgin' ? (
            <OrderMic onYES={handleConfirm} />
          ) : (
            <div className="mt-3">
              <button onClick={handleConfirm} className="w-full py-3 bg-green-600 text-white rounded-full font-black text-sm hover:bg-green-700">
                YES - Confirm
              </button>
              <div className="text-[10px] text-gray-500 mt-2 text-center">Voice for {lang.toUpperCase()} coming in V51 - Text order works now</div>
            </div>
          )}

          {msg && <div className="mt-3 text-center text-sm font-bold text-green-700 bg-green-50 p-2 rounded">{msg}</div>}
        </div>

        <div className="mt-6 bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-600">Total</div>
          <div className="text-3xl font-black text-green-700">₦{total.toLocaleString()}</div>
          <div className="text-[10px] text-gray-500 mt-1">No typing needed - Just click YES or say YES via mic (English)</div>
        </div>

        <div className="mt-4 text-[11px] text-gray-500 bg-gray-50 p-2 rounded">
          <b>V50 Committees Coordinated:</b><br/>
          UI: Single mic per page - Listing mic inside search bar, Order mic inside yellow box. No floating.<br/>
          Language: Yoruba/Hausa/Igbo pages show text only, no English voice - fixes English-on-Yoruba bug.<br/>
          Content: Text says YES - Confirm, Button says YES - Confirm - YES visible.<br/>
          Voice Engine: No useEffect returns null - build passes.<br/>
          Nigeria LLM: English voice dataset collection starts.
        </div>
      </div>
    </main>
  )
}
