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
  const [step, setStep] = useState<'order'|'confirmed'|'paying'|'success'|'insufficient'>('order')
  const [orderId, setOrderId] = useState('')
  const [momoNumber, setMomoNumber] = useState('0803 123 4567')
  const [balance, setBalance] = useState(50000)

  useEffect(() => {
    const saved = localStorage.getItem('nicham_lang')
    if (saved) setLang(saved)
    const b = localStorage.getItem('momo_balance')
    if (b) setBalance(parseInt(b))
    else { localStorage.setItem('momo_balance', '50000'); setBalance(50000) }
    const num = localStorage.getItem('momo_number')
    if (num) setMomoNumber(num)
  }, [])

  const id = parseInt(params.id)
  const meta = productsMeta[id] || productsMeta[3]
  const total = calcTotal(meta.price)

  const speak = (textArr: string[]) => {
    try {
      if (!window.speechSynthesis) return
      window.speechSynthesis.cancel()
      setTimeout(() => {
        let i=0
        const next = () => {
          if (i>=textArr.length) return
          const u = new SpeechSynthesisUtterance(textArr[i])
          u.lang='en-NG'; u.rate=0.85; u.volume=1
          u.onend = () => { i++; setTimeout(next,250) }
          u.onerror = () => { i++; setTimeout(next,250) }
          window.speechSynthesis.speak(u)
        }
        next()
      },300)
    } catch {}
  }

  const handleYES = () => {
    const oid = "NCH-" + Date.now().toString().slice(-6)
    setOrderId(oid)
    setStep('confirmed')
    const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    orders.unshift({ productName: meta.name, total, orderId: oid, status:'awaiting_payment', date: new Date().toLocaleString() })
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    speak([
      "Order confirmed.",
      "Order ID " + oid + ".",
      "Total " + total.toLocaleString() + " naira.",
      "Please click Pay with MTN MoMo to secure your payment in escrow."
    ])
  }

  const handlePay = () => {
    setStep('paying')
    setTimeout(() => {
      if (balance < total) {
        setStep('insufficient')
        speak([
          "Insufficient MoMo wallet balance.",
          "Required " + total.toLocaleString() + " naira.",
          "Your balance is " + balance.toLocaleString() + " naira.",
          "Please top up or save order to pay later."
        ])
      } else {
        const newBal = balance - total
        setBalance(newBal)
        localStorage.setItem('momo_balance', newBal.toString())
        // Update order status
        const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
        const idx = orders.findIndex((o:any)=>o.orderId===orderId)
        if (idx>=0){ orders[idx].status='paid_escrow'; orders[idx].momoTxn='MOMO-'+Date.now().toString().slice(-6); localStorage.setItem('nicham_orders', JSON.stringify(orders)) }
        // Hidden admin log for AfricanIES stages (buyer doesn't see)
        const admin = JSON.parse(localStorage.getItem('nicham_admin_escrow') || '[]')
        admin.unshift({ orderId, total, stage1:'30% on collection to AfricanIES pending', stage2:'70% on delivery pending', hidden:true, date:new Date().toISOString() })
        localStorage.setItem('nicham_admin_escrow', JSON.stringify(admin))
        setStep('success')
        speak([
          "Payment secured.",
          "Your payment of " + total.toLocaleString() + " naira is now secured in escrow with MTN MoMo.",
          "Transaction ID MoMo " + Date.now().toString().slice(-6) + ".",
          "AfricanIES will collect and deliver nationwide.",
          "You will receive NiChAm order receipt and MoMo payment receipt."
        ])
      }
    }, 1200)
  }

  const handleTopUp = () => {
    const add = total - balance + 10000
    const newBal = balance + add
    setBalance(newBal)
    localStorage.setItem('momo_balance', newBal.toString())
    alert("MoMo wallet topped up by ₦" + add.toLocaleString() + ". New balance ₦" + newBal.toLocaleString())
    setStep('confirmed')
  }

  const orderText: any = {
    en: { title: "Order Page - Click YES - Confirm", desc: "You are on order page for "+meta.name+". Total "+total.toLocaleString()+" naira. Click YES to place order." },
    pidgin: { title: "Order Page - Click YES", desc: "You dey order page for "+meta.name+". Total "+total.toLocaleString()+" naira." }
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

          {step==='order' && (
            lang==='en' || lang==='pidgin' ? <OrderMic onYES={handleYES} /> : 
            <button onClick={handleYES} className="mt-3 w-full py-3 bg-green-600 text-white rounded-full font-black text-sm">YES - Confirm</button>
          )}

          {step==='confirmed' && (
            <div className="mt-3 p-3 bg-blue-50 border-2 border-blue-300 rounded-xl">
              <div className="font-black text-center text-blue-800">✅ Order ID: {orderId}</div>
              <div className="text-center text-sm mt-1">Total ₦{total.toLocaleString()}</div>
              <div className="text-[11px] text-center text-gray-600 mt-1">MoMo: {momoNumber} | Balance: ₦{balance.toLocaleString()}</div>
              <button onClick={handlePay} className="mt-3 w-full py-3 bg-black text-white rounded-full font-black text-sm animate-pulse">💳 Pay with MTN MoMo - Deduct from Wallet</button>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>speak(["Order ID "+orderId+". Total "+total.toLocaleString()+" naira. Please click Pay with MTN MoMo to secure your payment in escrow."])} className="flex-1 py-2 bg-white border rounded-full text-xs font-bold">🔊 Replay</button>
                <a href={`/?lang=${lang}`} className="flex-1 py-2 bg-gray-200 rounded-full text-xs font-bold text-center">Save for Later</a>
              </div>
            </div>
          )}

          {step==='paying' && <div className="mt-3 text-center py-6"><div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div><div className="text-sm mt-2 font-bold">Checking MoMo wallet & securing escrow...</div></div>}

          {step==='success' && (
            <div className="mt-3 p-3 bg-green-50 border-2 border-green-400 rounded-xl">
              <div className="text-center font-black text-green-700 text-sm">✅ Payment Secured in Escrow</div>
              <div className="text-[11px] text-center mt-2 leading-snug">Your payment of <b>₦{total.toLocaleString()}</b> is now secured in escrow with MTN MoMo.<br/>MoMo Txn: MOMO-{orderId.slice(-6)}<br/>AfricanIES will collect and deliver nationwide.<br/>You will receive NiChAm Order Receipt + MoMo Payment Receipt.</div>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>speak(["Payment secured. Your payment of "+total.toLocaleString()+" naira is now secured in escrow with MTN MoMo. AfricanIES will collect and deliver nationwide."])} className="flex-1 py-2 bg-black text-white rounded-full text-xs font-bold">🔊 Replay Full</button>
                <a href={`/?lang=${lang}`} className="flex-1 py-2 bg-green-600 text-white rounded-full text-xs font-black text-center">Back to Market</a>
              </div>
              <div className="text-[9px] text-gray-500 mt-2 text-center">Hidden admin: 30% to AfricanIES on collection, 70% on delivery confirmation (buyer doesn't see stages)</div>
            </div>
          )}

          {step==='insufficient' && (
            <div className="mt-3 p-3 bg-red-50 border-2 border-red-300 rounded-xl">
              <div className="text-center font-black text-red-700 text-sm">❌ Insufficient MoMo Wallet Balance</div>
              <div className="text-xs text-center mt-1">Required: ₦{total.toLocaleString()} | Balance: ₦{balance.toLocaleString()}</div>
              <div className="grid gap-2 mt-3">
                <button onClick={handleTopUp} className="w-full py-2.5 bg-green-600 text-white rounded-full font-bold text-xs">➕ Top Up MoMo Wallet (+₦{(total-balance+10000).toLocaleString()})</button>
                <button onClick={()=>{ const n=prompt('Enter different MoMo number'); if(n){setMomoNumber(n); localStorage.setItem('momo_number',n); setStep('confirmed')} }} className="w-full py-2 bg-white border rounded-full font-bold text-xs">📱 Pay with Different Number</button>
                <a href={`/?lang=${lang}`} className="w-full py-2 bg-gray-800 text-white rounded-full font-bold text-xs text-center">💾 Save Order - Pay Later (24hrs)</a>
              </div>
              <div className="text-[10px] text-gray-500 mt-2 text-center">Order saved, not cancelled. Top up and return to pay.</div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-600">Total (VAT 7.5% + Escrow 1% included)</div>
          <div className="text-3xl font-black text-green-700">₦{total.toLocaleString()}</div>
        </div>
      </div>
    </main>
  )
}
