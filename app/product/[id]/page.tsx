'use client'
import { useState, useEffect } from 'react'
import OrderMic from '../../../components/OrderMic'

const productsMeta: any = {
  1: { name: "Solar Cargo Bike 500W", price: 400000, desc: "Carry 200kg without fuel. Save N500k per year." },
  2: { name: "Solar Water Pump 1HP", price: 280000, desc: "Pump water with sunshine. No diesel." },
  3: { name: "Solar Freezer 200L", price: 240000, desc: "Keep fish cold 24hrs with solar + battery." },
  4: { name: "Solar Mini-Grid 5kW", price: 2200000, desc: "Power home - light, TV, fan, fridge." },
  5: { name: "Solar Tractor 25HP", price: 3400000, desc: "Farm with sun, no diesel." },
  6: { name: "Solar Dryer 100kg", price: 130000, desc: "Dry tomatoes, pepper, fish with sun." },
  7: { name: "Solar Boat Engine 2HP", price: 160000, desc: "Fishing boat engine with solar. No fuel." },
  8: { name: "Solar Ferry 12 Seater", price: 1050000, desc: "Transport 12 people with solar." },
  9: { name: "Solar E-Bike", price: 250000, desc: "Foldable solar bike." },
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
  const [greenPoints, setGreenPoints] = useState(0)

  useEffect(() => {
    const b = localStorage.getItem('momo_balance')
    if (b) setBalance(parseInt(b))
    const num = localStorage.getItem('momo_number')
    if (num) setMomoNumber(num)
    const pts = localStorage.getItem('green_points')
    if (pts) setGreenPoints(parseInt(pts))
  }, [])

  const id = parseInt(params.id)
  const meta = productsMeta[id] || productsMeta[4]
  const total = calcTotal(meta.price)
  const pointsEarned = Math.round(total * 0.01)

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

  const handleYES = () => {
    const oid = "NCH-" + Date.now().toString().slice(-6)
    setOrderId(oid)
    setStep('confirmed')
    const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    orders.unshift({ productName: meta.name, total, orderId: oid, status:'awaiting_payment', date: new Date().toLocaleString(), points: pointsEarned })
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    speak(["Order confirmed.", "Order ID " + oid + ".", "Total " + total.toLocaleString() + " naira.", "Please click Pay with MTN MoMo to secure your payment in escrow."])
  }

  const handlePay = () => {
    setStep('paying')
    setTimeout(() => {
      if (balance < total) {
        setStep('insufficient')
        speak(["Insufficient MoMo wallet balance.", "Required " + total.toLocaleString() + " naira.", "Your balance is " + balance.toLocaleString() + "."])
      } else {
        const newBal = balance - total
        setBalance(newBal)
        localStorage.setItem('momo_balance', newBal.toString())
        const newPoints = greenPoints + pointsEarned
        setGreenPoints(newPoints)
        localStorage.setItem('green_points', newPoints.toString())
        const orders = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
        const idx = orders.findIndex((o:any)=>o.orderId===orderId)
        if (idx>=0){ orders[idx].status='paid_escrow'; orders[idx].momoTxn='MOMO-'+Date.now().toString().slice(-6); localStorage.setItem('nicham_orders', JSON.stringify(orders)) }
        setStep('success')
        speak(["Payment secured.", "You earned " + pointsEarned.toLocaleString() + " Green Points.", "Your payment of " + total.toLocaleString() + " naira is now secured in escrow with MTN MoMo.", "AfricanIES will deliver nationwide."])
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

  const shareWhatsApp = () => {
    const text = `NiChAm Solar Market Order:%0AProduct: ${meta.name}%0AOrder ID: ${orderId}%0ATotal: N${total.toLocaleString()}%0AMoMo Txn: MOMO-${orderId.slice(-6)}%0AStatus: Paid in Escrow - AfricanIES will deliver%0AGreen Points Earned: ${pointsEarned}%0A${typeof window !== 'undefined' ? window.location.origin : ''}`
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center gap-2 mb-4">
        <a href="/" className="text-sm font-bold flex items-center gap-2"><img src="/logo.png" className="w-8 h-8 rounded-full" /> Back to Market</a>
        <span className="ml-auto text-xs bg-green-100 px-2 py-1 rounded-full">🌱 Points: {greenPoints.toLocaleString()}</span>
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-black">{meta.name}</h1>
        <p className="text-sm text-gray-600 mt-2">{meta.desc}</p>
        
        <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
          <div className="font-bold text-sm">Order Page - Click YES or Say YES - Voice Ordering</div>
          <div className="text-[11px] mt-1 text-green-700 font-bold">✓ No typing needed - Say YES - Green Points: {pointsEarned.toLocaleString()} on this order</div>
          {step==='order' && <OrderMic onYES={handleYES} />}
          {step==='confirmed' && (
            <div className="mt-3 p-3 bg-blue-50 border-2 border-blue-300 rounded-xl">
              <div className="font-black text-center text-blue-800">Order ID: {orderId}</div>
              <div className="text-center text-sm mt-1">Total N{total.toLocaleString()} + {pointsEarned} Green Points</div>
              <div className="text-[11px] text-center text-gray-600 mt-1">MoMo: {momoNumber} | Balance: N{balance.toLocaleString()}</div>
              <button onClick={handlePay} className="mt-3 w-full py-3 bg-black text-white rounded-full font-black text-sm">Pay with MTN MoMo - Earn {pointsEarned} Green Points</button>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>speak(["Order ID " + orderId + ". Total " + total.toLocaleString() + " naira"])} className="flex-1 py-2 bg-white border-2 border-black rounded-full text-xs font-bold">🔊 Replay</button>
                <a href="/orders" className="flex-1 py-2 bg-gray-200 rounded-full text-xs font-bold text-center">Save for Later</a>
              </div>
            </div>
          )}
          {step==='paying' && <div className="mt-3 text-center py-6"><div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div><div className="text-sm mt-2 font-bold">Checking MoMo wallet and securing escrow...</div></div>}
          {step==='success' && (
            <div className="mt-3 p-3 bg-green-50 border-2 border-green-400 rounded-xl">
              <div className="text-center font-black text-green-700">✓ Payment Secured + {pointsEarned} Green Points Earned!</div>
              <div className="text-[11px] text-center mt-2 leading-snug">Payment N{total.toLocaleString()} secured in escrow with MTN MoMo.<br/>MoMo Txn: MOMO-{orderId.slice(-6)}<br/>AfricanIES will collect and deliver.<br/>Total Green Points now: {(greenPoints).toLocaleString()}</div>
              <div className="grid gap-2 mt-3">
                <button onClick={shareWhatsApp} className="w-full py-2.5 bg-green-600 text-white rounded-full font-bold text-xs">📱 Share Order on WhatsApp (Free)</button>
                <div className="flex gap-2">
                  <button onClick={()=>speak(["Payment secured. You earned " + pointsEarned + " Green Points"])} className="flex-1 py-2 bg-black text-white rounded-full text-xs font-bold">🔊 Replay</button>
                  <a href="/" className="flex-1 py-2 bg-white border-2 border-green-600 text-green-700 rounded-full text-xs font-black text-center">Back to Market</a>
                </div>
              </div>
            </div>
          )}
          {step==='insufficient' && (
            <div className="mt-3 p-3 bg-red-50 border-2 border-red-300 rounded-xl">
              <div className="text-center font-black text-red-700 text-sm">Insufficient MoMo Wallet Balance</div>
              <div className="text-xs text-center mt-1">Required: N{total.toLocaleString()} | Balance: N{balance.toLocaleString()}</div>
              <div className="text-[10px] text-center mt-1 text-gray-600">MoMo Tier 3 limit N5M/day. For bulk &gt;N5M, split across days or use bank escrow.</div>
              <div className="grid gap-2 mt-3">
                <button onClick={handleTopUp} className="w-full py-2.5 bg-green-600 text-white rounded-full font-bold text-xs">Top Up MoMo (+N{(total-balance+10000).toLocaleString()})</button>
                <a href="/orders" className="w-full py-2 bg-gray-800 text-white rounded-full font-bold text-xs text-center">Save Order - Pay Later (24hrs)</a>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-600">Total (Competitive -2% + VAT 7.5% + Escrow 1%)</div>
          <div className="text-3xl font-black text-green-700">N{total.toLocaleString()}</div>
          <div className="text-xs font-bold text-green-600 mt-1">+ Earn {pointsEarned.toLocaleString()} Green Points 🌱</div>
          <div className="text-[10px] text-gray-500 mt-1">Escrow MTN MoMo | Delivered by AfricanIES | Platform GSPI/NiChAm</div>
        </div>
      </div>
    </main>
  )
}
