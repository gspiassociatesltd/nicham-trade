'use client'
import { useState, useEffect } from 'react'
import OrderMic from '../../../components/OrderMic'

const productsMeta: any = {
  1: { name: "Solar Cargo Bike 500W", price: 400000, desc: "Carry 200kg load without fuel. Save N500k fuel per year. Perfect for market women and farmers in Nigeria." },
  2: { name: "Solar Water Pump 1HP", price: 280000, desc: "Pump water from river, well or borehole with sunshine. No diesel needed. Farm 2 hectares daily." },
  3: { name: "Solar Freezer 200L", price: 240000, desc: "Keep fish, meat cold 24hrs with solar + battery. No NEPA needed. For fish sellers, cold rooms." },
  4: { name: "Solar Mini-Grid Home System 5kW", price: 2200000, desc: "Power your home - light, TV, fan, fridge. No more blackout." },
  5: { name: "Solar Tractor 25HP", price: 3400000, desc: "Farm with sun, no diesel. Plough, till with solar power." },
  6: { name: "Solar Dryer 100kg", price: 130000, desc: "Dry tomatoes, pepper, fish clean and fast with solar heat. Sell at higher price." },
  7: { name: "Solar Boat Engine 2HP", price: 160000, desc: "Fishing boat engine powered by sun. No fuel cost on water." },
  8: { name: "Solar Ferry 12 Seater", price: 1050000, desc: "Transport 12 people across river with solar power. Transport business." },
  9: { name: "Solar E-Bike Collapsible", price: 250000, desc: "Foldable electric bike with solar charging. Easy to carry." },
}

function calcTotal(base: number) {
  const competitivePrice = Math.round(base * 0.98)
  const vat = Math.round(competitivePrice * 0.075)
  const escrow = Math.round(competitivePrice * 0.01)
  return competitivePrice + vat + escrow
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState<'order'|'confirmed'|'paying'|'success'|'insufficient'>('order')
  const [orderId, setOrderId] = useState('')
  const [momoNumber, setMomoNumber] = useState('0803 123 4567')
  const [balance, setBalance] = useState(50000)

  useEffect(() => {
    const b = localStorage.getItem('momo_balance')
    if (b) setBalance(parseInt(b))
    const num = localStorage.getItem('momo_number')
    if (num) setMomoNumber(num)
  }, [])

  const id = parseInt(params.id)
  const meta = productsMeta[id] || productsMeta[4]
  const total = calcTotal(meta.price)

  const speak = (textArr: string[]) => {
    try {
      if (!window.speechSynthesis) return
      window.speechSynthesis.cancel()
      setTimeout(() => {
        let i = 0
        const next = () => {
          if (i >= textArr.length) return
          const u = new SpeechSynthesisUtterance(textArr[i])
          u.lang = 'en-NG'
          u.rate = 0.8
          u.onend = () => { i++; setTimeout(next, 300) }
          u.onerror = () => { i++; setTimeout(next, 300) }
          window.speechSynthesis.speak(u)
        }
        next()
      }, 400)
    } catch {}
  }

  const ot = {
    title: "Order Page - Click YES or Say YES",
    desc: meta.name + " - Total " + total.toLocaleString() + " naira. Click YES to place order. Voice ordering enabled - say YES.",
    confirm: ["Order confirmed.", "Order ID " + (orderId || 'NCH-000000') + ".", "Total " + total.toLocaleString() + " naira.", "Please click Pay with MTN MoMo to secure your payment in escrow."],
    success: ["Payment secured.", "Your payment of " + total.toLocaleString() + " naira is now secured in escrow with MTN MoMo.", "AfricanIES will collect from manufacturer and deliver nationwide."],
    insufficient: ["Insufficient MoMo wallet balance.", "Required " + total.toLocaleString() + " naira.", "Your balance is " + balance.toLocaleString() + " naira.", "Please top up or save order to pay later."]
  }

  const handleYES = () => {
    const oid = "NCH-" + Date.now().toString().slice(-6)
    setOrderId(oid)
    setStep('confirmed')
    const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    orders.unshift({ productName: meta.name, total, orderId: oid, status:'awaiting_payment', date: new Date().toLocaleString() })
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    speak(["Order confirmed.", "Order ID " + oid + ".", "Total " + total.toLocaleString() + " naira.", "Please click Pay with MTN MoMo to secure your payment in escrow."])
  }

  const handlePay = () => {
    setStep('paying')
    setTimeout(() => {
      if (balance < total) {
        setStep('insufficient')
        speak(["Insufficient MoMo wallet balance.", "Required " + total.toLocaleString() + " naira.", "Your balance is " + balance.toLocaleString() + " naira.", "Please top up or save order."])
      } else {
        const newBal = balance - total
        setBalance(newBal)
        localStorage.setItem('momo_balance', newBal.toString())
        const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
        const idx = orders.findIndex((o:any)=>o.orderId===orderId)
        if (idx>=0){ orders[idx].status='paid_escrow'; orders[idx].momoTxn='MOMO-'+Date.now().toString().slice(-6); localStorage.setItem('nicham_orders', JSON.stringify(orders)) }
        setStep('success')
        speak(["Payment secured.", "Your payment of " + total.toLocaleString() + " naira is now secured in escrow with MTN MoMo.", "AfricanIES will collect and deliver nationwide."])
      }
    }, 1200)
  }

  const handleTopUp = () => {
    const add = total - balance + 10000
    const newBal = balance + add
    setBalance(newBal)
    localStorage.setItem('momo_balance', newBal.toString())
    alert("MoMo wallet topped up by N" + add.toLocaleString() + ". New balance N" + newBal.toLocaleString())
    setStep('confirmed')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm mb-4 inline-block font-bold">{"<-"} NiChAm Solar Market - Back to Market</a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="text-4xl">{id===1?'🚲':id===2?'💧':id===3?'❄️':id===4?'⚡':id===5?'🚜':'☀️'}</div>
        <h1 className="text-2xl font-black mt-2">{meta.name}</h1>
        <p className="text-sm text-gray-600 mt-2 leading-snug">{meta.desc}</p>
        
        <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
          <div className="font-bold text-sm">{ot.title}</div>
          <div className="text-xs mt-1 text-gray-700">{ot.desc}</div>
          <div className="text-[11px] mt-1 text-green-700 font-bold">✓ Voice Ordering: Say YES or click YES - No typing needed</div>
          {step==='order' && <OrderMic onYES={handleYES} />}
          {step==='confirmed' && (
            <div className="mt-3 p-3 bg-blue-50 border-2 border-blue-300 rounded-xl">
              <div className="font-black text-center text-blue-800">Order ID: {orderId}</div>
              <div className="text-center text-sm mt-1">Total N{total.toLocaleString()}</div>
              <div className="text-[11px] text-center text-gray-600 mt-1">MoMo: {momoNumber} | Balance: N{balance.toLocaleString()}</div>
              <button onClick={handlePay} className="mt-3 w-full py-3 bg-black text-white rounded-full font-black text-sm">Pay with MTN MoMo - Deduct from Wallet</button>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>speak(ot.confirm)} className="flex-1 py-2 bg-white border-2 border-black rounded-full text-xs font-bold">🔊 Replay Voice</button>
                <a href="/orders" className="flex-1 py-2 bg-gray-200 rounded-full text-xs font-bold text-center">Save for Later</a>
              </div>
            </div>
          )}
          {step==='paying' && <div className="mt-3 text-center py-6"><div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div><div className="text-sm mt-2 font-bold">Checking MoMo wallet and securing escrow...</div></div>}
          {step==='success' && (
            <div className="mt-3 p-3 bg-green-50 border-2 border-green-400 rounded-xl">
              <div className="text-center font-black text-green-700 text-sm">✓ Payment Secured in Escrow</div>
              <div className="text-[11px] text-center mt-2 leading-snug">Your payment of <b>N{total.toLocaleString()}</b> is now secured in escrow with MTN MoMo.<br/>MoMo Txn: MOMO-{orderId.slice(-6)}<br/>AfricanIES will collect from manufacturer and deliver nationwide.<br/>Buyer confirms → MoMo pays manufacturer.</div>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>speak(ot.success)} className="flex-1 py-2 bg-black text-white rounded-full text-xs font-bold">🔊 Replay</button>
                <a href="/" className="flex-1 py-2 bg-green-600 text-white rounded-full text-xs font-black text-center">Back to Market</a>
              </div>
            </div>
          )}
          {step==='insufficient' && (
            <div className="mt-3 p-3 bg-red-50 border-2 border-red-300 rounded-xl">
              <div className="text-center font-black text-red-700 text-sm">Insufficient MoMo Wallet Balance</div>
              <div className="text-xs text-center mt-1">Required: N{total.toLocaleString()} | Balance: N{balance.toLocaleString()}</div>
              <div className="text-[10px] text-center mt-1 text-gray-600">Bulk buyer? MoMo Tier 3 limit is N5M/day. For &gt;N5M, split across days or use bank escrow.</div>
              <div className="grid gap-2 mt-3">
                <button onClick={handleTopUp} className="w-full py-2.5 bg-green-600 text-white rounded-full font-bold text-xs">Top Up MoMo Wallet (+N{(total-balance+10000).toLocaleString()})</button>
                <a href="/orders" className="w-full py-2 bg-gray-800 text-white rounded-full font-bold text-xs text-center">Save Order - Pay Later (24hrs)</a>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-600">Total (Competitive Price -2% + VAT 7.5% + Escrow 1%)</div>
          <div className="text-3xl font-black text-green-700">N{total.toLocaleString()}</div>
          <div className="text-[10px] text-gray-500 mt-1">Escrow with MTN MoMo | Delivered by AfricanIES | Platform by GSPI/NiChAm</div>
        </div>
      </div>
    </main>
  )
}
