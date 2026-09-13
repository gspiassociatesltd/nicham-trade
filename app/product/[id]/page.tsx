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
  const [orderIdState, setOrderIdState] = useState("")
  const [confirmed, setConfirmed] = useState(false)

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

  const speakFull = (orderId: string) => {
    try {
      if (typeof window === 'undefined' || !window.speechSynthesis) return
      window.speechSynthesis.cancel()
      // Small delay to ensure cancel completes
      setTimeout(() => {
        const sentences = [
          "Order confirmed.",
          "Your Order ID is " + orderId + ".",
          "Thank you for using NiChAm Solar Market.",
          "Your order is now in escrow with MTN MoMo.",
          "AfricanIES will collect and deliver nationwide.",
          "You will be notified."
        ]
        let i = 0
        const next = () => {
          if (i >= sentences.length) return
          const u = new SpeechSynthesisUtterance(sentences[i])
          u.lang = "en-NG"
          u.rate = 0.85
          u.volume = 1
          u.onend = () => { i++; setTimeout(next, 250) }
          u.onerror = () => { i++; setTimeout(next, 250) }
          window.speechSynthesis.speak(u)
        }
        next()
      }, 300)
    } catch {}
  }

  const handleConfirm = () => {
    const orderId = "NCH-" + Date.now().toString().slice(-6)
    setOrderIdState(orderId)
    setConfirmed(true)
    const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    orders.unshift({ productName: meta.name, total, orderId, date: new Date().toLocaleString() })
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    setMsg("Order confirmed! Your Order ID is " + orderId + " - Thank you for using NiChAm Solar Market. Your order is now in escrow with MTN MoMo. AfricanIES will collect and deliver nationwide.")
    speakFull(orderId)
    try {
      const dataset = JSON.parse(localStorage.getItem('nicham_voice_dataset') || '[]')
      dataset.push({ type: 'order', product: meta.name, lang, time: new Date().toISOString() })
      localStorage.setItem('nicham_voice_dataset', JSON.stringify(dataset.slice(-100)))
    } catch {}
    // NO AUTO REDIRECT - user stays to hear full message, clicks Back manually
  }

  const orderText: any = {
    en: { title: "Order Page - Click YES - Confirm below", desc: `You are on order page for ${meta.name}. Total ${total.toLocaleString()} naira. Click YES - Confirm button below to place order. No typing needed.` },
    pidgin: { title: "Order Page - Click YES - Confirm", desc: `You dey order page for ${meta.name}. Total ${total.toLocaleString()} naira. Click YES - Confirm to order.` },
    ha: { title: "Shafin Oda - Danna YES - Confirm", desc: `Kana shafin oda na ${meta.name}. Jimilla ${total.toLocaleString()} naira.` },
    ig: { title: "Peeji Iwu - Pia YES - Confirm", desc: `I no na peeji iwu maka ${meta.name}. Onu ego ${total.toLocaleString()} naira.` },
    yo: { title: "Oju-iwe Ase - Te YES - Confirm", desc: `O wa lori oju-iwe ase fun ${meta.name}. Lapapo ${total.toLocaleString()} naira.` }
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
          
          {!confirmed ? (
            lang === 'en' || lang === 'pidgin' ? (
              <OrderMic onYES={handleConfirm} />
            ) : (
              <div className="mt-3">
                <button onClick={handleConfirm} className="w-full py-3 bg-green-600 text-white rounded-full font-black text-sm hover:bg-green-700">
                  YES - Confirm
                </button>
              </div>
            )
          ) : (
            <div className="mt-3 p-3 bg-green-50 border-2 border-green-300 rounded-xl">
              <div className="text-center font-black text-green-700">✅ {msg}</div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => orderIdState && speakFull(orderIdState)} className="flex-1 py-2 bg-black text-white rounded-full text-xs font-bold">🔊 Replay Full Message</button>
                <a href={`/?lang=${lang}`} className="flex-1 py-2 bg-green-600 text-white rounded-full text-xs font-black text-center">Back to Market</a>
              </div>
              <div className="text-[10px] text-gray-500 mt-2 text-center">No auto-back - Hear full voice first, then click Back to Market when ready</div>
            </div>
          )}

          {msg && !confirmed && <div className="mt-3 text-center text-sm font-bold text-green-700 bg-green-50 p-2 rounded">{msg}</div>}
        </div>

        <div className="mt-6 bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-600">Total</div>
          <div className="text-3xl font-black text-green-700">₦{total.toLocaleString()}</div>
          <div className="text-[10px] text-gray-500 mt-1">No typing needed - Just click YES or say YES via mic</div>
        </div>
      </div>
    </main>
  )
}
