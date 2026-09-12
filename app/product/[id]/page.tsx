'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import VoiceOrder from '../../../components/VoiceOrder'

const productsData: any = {
  1: { name: "Solar Cargo Bike 500W", intro: "Carry 300kg with solar power", basePrice: 400000 },
  2: { name: "Solar Irrigation Pump", intro: "Pump water with sunshine", basePrice: 280000 },
  3: { name: "Solar Freezer 200L", intro: "Keep fish fresh with solar", basePrice: 240000 },
  4: { name: "Solar Home System 5kW", intro: "Power your house with solar", basePrice: 2200000 },
  5: { name: "Solar Tractor 20HP", intro: "Electric tractor for plowing, hauling, tilling. Zero diesel.", basePrice: 3400000 },
  6: { name: "Solar Dryer 100kg", intro: "Dry tomatoes, pepper, fish using sun. No more waste.", basePrice: 130000 },
  7: { name: "Solar Boat Engine", intro: "Boat engine with solar", basePrice: 160000 },
  8: { name: "Solar Ferry 12 Seater", intro: "Ferry with solar power", basePrice: 1050000 },
  9: { name: "Collapsible Solar E-Bike", intro: "Foldable bike with solar charging", basePrice: 250000 },
}

function calcTotal(base: number) {
  const competitivePrice = base * 0.98
  const vat = Math.round(competitivePrice * 0.075)
  const escrow = Math.round(competitivePrice * 0.01)
  return Math.round(competitivePrice + vat + escrow)
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [lang, setLang] = useState('en')
  const prod = productsData[params.id] || productsData[6]
  const base = prod.basePrice
  const total = calcTotal(base)
  const router = useRouter()

  useEffect(() => {
    const url = new URL(window.location.href)
    const l = url.searchParams.get('lang')
    if (l) setLang(l)
  }, [])

  const handleConfirm = () => {
    const orderId = "NCH-" + Date.now().toString().slice(-6)
    const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    orders.unshift({ productName: prod.name, total, orderId, date: new Date().toLocaleString() })
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    alert("Order confirmed! ID: " + orderId)
    router.push("/?lang=" + lang)
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <a href={`/?lang=${lang}`} className="text-sm">{"<-"} NiChAm Solar Market</a>
      <div className="bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-2xl font-black">{prod.name}</h1>
        <p className="text-sm text-gray-700 mt-2">{prod.intro}</p>
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mt-4">
          <div className="font-bold text-sm">ORDER PAGE - Press YES to confirm</div>
          <div className="text-xs mt-2">You are on order page for {prod.name}. Total {total.toLocaleString()} naira. Press YES button below to confirm.</div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleConfirm} className="flex-1 bg-green-600 text-white py-3 rounded-full font-bold">TAP YES - Confirm</button>
            <button onClick={() => { const u = new SpeechSynthesisUtterance("You are on order page for " + prod.name + ". Total " + total.toLocaleString() + " naira. Press YES to confirm."); window.speechSynthesis.speak(u) }} className="flex-1 bg-black text-white py-3 rounded-full">Hear Instruction</button>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl mt-6 text-center">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-3xl font-black text-green-700">₦{total.toLocaleString()}</div>
        </div>
      </div>
      <VoiceOrder lang={lang} currentMode="order" />
    </main>
  )
}
