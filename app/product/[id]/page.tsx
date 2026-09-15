'use client'
import { useState, useEffect } from 'react'
import OrderMic from '../../../components/OrderMic'

const productsMeta: any = {
  1: { name: "Solar Incubator 500 Eggs", price: 450000, earn: "Earn N80k-120k per batch hatching chicks", desc: "Hatch 500 chicks with sun. No NEPA. Start hatchery business. Earn per batch." },
  2: { name: "Solar Corn Sheller", price: 180000, earn: "Earn N3k per day shelling for farmers", desc: "Shell 500kg corn per hour with solar. No diesel." },
  3: { name: "Solar Oil Press Machine", price: 220000, earn: "Earn N5k daily pressing groundnut oil", desc: "Press groundnut, palm kernel oil with solar. No fuel." },
  4: { name: "Solar Vegetable & Meat Dryer", price: 150000, earn: "Buy cheap, dry, sell 3x price", desc: "Dry tomatoes, pepper, meat, fish clean. Sell at higher price." },
  5: { name: "Solar Mini Tractor 12HP Low Price", price: 850000, earn: "Save N500k diesel yearly + hire to others", desc: "Low price solar tractor for small farms. No diesel." },
  6: { name: "Solar Animal & Pest Repellant", price: 95000, earn: "Protect N200k crops from rats/birds", desc: "Repel pests with solar sound. No chemicals." },
  7: { name: "Solar Water Pump 1HP", price: 280000, earn: "Farm 2 hectares dry season", desc: "Pump water with sun. No diesel." },
  8: { name: "Solar Cargo Bike 500W", price: 400000, earn: "Save N500k fuel yearly", desc: "Carry 200kg produce to market." },
  9: { name: "Solar Cooker + Blender", price: 75000, earn: "Save N15k gas monthly", desc: "Cook and blend with sun. No gas, no NEPA." },
  10: { name: "Solar Blender 1.5L", price: 65000, earn: "For home & small restaurant", desc: "Blend pepper, tomatoes with solar battery." },
  11: { name: "Solar Hair Dryer", price: 45000, earn: "Earn N2k per customer - no NEPA stop", desc: "Salon dryer with solar. Work anytime." },
  12: { name: "Solar Clippers Rechargeable", price: 35000, earn: "Barb 20 heads daily, no NEPA", desc: "Barbing clipper solar charging." },
  13: { name: "Solar Hair Blower + Straightener", price: 85000, earn: "Salon income even with no light", desc: "Salon tools powered by sun." },
  14: { name: "Solar Sewing + Embroidery Machine", price: 320000, earn: "Earn N5k daily sewing with solar", desc: "Sew and embroider without NEPA." },
  15: { name: "Solar Grinder / Grinding Mill", price: 120000, earn: "Earn N4k daily grinding", desc: "Grind pepper, corn, beans with solar." },
}

function calcTotal(base: number) { // FIX: VAT inclusive only as requested
  const vat = Math.round(base * 0.075)
  return base + vat
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState<'order'|'confirmed'|'paying'|'success'|'insufficient'>('order')
  const [orderId, setOrderId] = useState('')
  const [balance, setBalance] = useState(50000)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const b = localStorage.getItem('momo_balance')
    if (b) setBalance(parseInt(b))
    const pts = localStorage.getItem('green_points')
    if (pts) setPoints(parseInt(pts))
  }, [])

  const id = parseInt(params.id)
  const meta = productsMeta[id] || productsMeta[1]
  const total = calcTotal(meta.price)
  const pointsEarned = Math.round(total * 0.01)

  const speak = (arr: string[]) => {
    try {
      window.speechSynthesis.cancel()
      setTimeout(() => {
        let i=0
        const next=()=>{
          if (i>=arr.length) return
          const u=new SpeechSynthesisUtterance(arr[i])
          u.lang='en-NG'; u.rate=0.8; u.onend=()=>{i++; setTimeout(next,300)}; u.onerror=()=>{i++; setTimeout(next,300)}
          window.speechSynthesis.speak(u)
        }
        next()
      },400)
    } catch {}
  }

  const handleYES = () => {
    const oid="NCH-"+Date.now().toString().slice(-6)
    setOrderId(oid)
    setStep('confirmed')
    const orders=JSON.parse(localStorage.getItem('nicham_orders')||'[]')
    orders.unshift({ productName: meta.name, total, orderId: oid, status:'awaiting_payment', date: new Date().toLocaleString(), points: pointsEarned })
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    speak(["Order confirmed", "Order ID "+oid, meta.name + " total " + total.toLocaleString() + " naira", "Earn "+ meta.earn])
  }

  const handlePay = () => {
    setStep('paying')
    setTimeout(()=>{
      if (balance < total) { setStep('insufficient'); speak(["Insufficient MoMo balance", "Required " + total.toLocaleString()]) }
      else {
        const newBal=balance-total
        setBalance(newBal)
        localStorage.setItem('momo_balance', newBal.toString())
        const newPts=points+pointsEarned
        setPoints(newPts)
        localStorage.setItem('green_points', newPts.toString())
        const orders=JSON.parse(localStorage.getItem('nicham_orders')||'[]')
        const idx=orders.findIndex((o:any)=>o.orderId===orderId)
        if (idx>=0){ orders[idx].status='paid_escrow'; orders[idx].momoTxn='MOMO-'+Date.now().toString().slice(-6); localStorage.setItem('nicham_orders', JSON.stringify(orders)) }
        setStep('success')
        speak(["Payment secured", "You earned "+pointsEarned+" Green Points", "AfricanIES will deliver"])
      }
    },1200)
  }

  const shareWhatsApp = () => {
    const text = `NiChAm Solar Market Order:%0AProduct: ${meta.name}%0A${meta.earn}%0AOrder ID: ${orderId}%0ATotal: N${total.toLocaleString()}%0AStatus: Paid Escrow - AfricanIES will deliver%0AGreen Points: ${pointsEarned}%0A${typeof window!=='undefined'?window.location.origin:''}`
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold flex items-center gap-2"><img src="/logo.png" className="w-8 h-8 rounded-full" /> NiChAm Solar Market</a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mt-3">
        <h1 className="text-xl font-black">{meta.name}</h1>
        <p className="text-sm text-gray-600 mt-2">{meta.desc}</p>
        <div className="mt-3 bg-yellow-100 border-2 border-yellow-300 rounded-xl p-3 text-center"><div className="text-xs font-black text-green-800">💰 Marketing: {meta.earn}</div><div className="text-[10px] mt-1">This machine makes money with sun - no fuel, no NEPA</div></div>
        
        <div className="mt-4 bg-green-50 border-2 border-green-300 rounded-xl p-4">
          <div className="font-bold text-sm">Order - Click YES or Say YES - Voice Ordering</div>
          <div className="text-[11px] mt-1 text-green-700 font-bold">✓ Earn {pointsEarned} Green Points | ✓ {meta.earn}</div>
          {step==='order' && <OrderMic onYES={handleYES} />}
          {step==='confirmed' && (
            <div className="mt-3 p-3 bg-blue-50 border-2 border-blue-300 rounded-xl">
              <div className="font-black text-center">Order ID: {orderId}</div>
              <div className="text-center text-sm mt-1">Total N{total.toLocaleString()} + {pointsEarned} Points</div>
              <button onClick={handlePay} className="mt-3 w-full py-3 bg-black text-white rounded-full font-black text-sm">Pay with MTN MoMo - Earn {pointsEarned} Points</button>
            </div>
          )}
          {step==='paying' && <div className="mt-3 text-center py-6"><div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div><div className="text-sm mt-2 font-bold">Securing escrow...</div></div>}
          {step==='success' && (
            <div className="mt-3 p-3 bg-green-50 border-2 border-green-400 rounded-xl">
              <div className="text-center font-black text-green-700 text-sm">✓ Payment Secured + {pointsEarned} Green Points!</div>
              <div className="text-[11px] text-center mt-2">N{total.toLocaleString()} in escrow MoMo. AfricanIES delivers. {meta.earn}</div>
              <button onClick={shareWhatsApp} className="w-full mt-3 py-2.5 bg-green-600 text-white rounded-full font-bold text-xs">📱 Share Money-Making Machine on WhatsApp</button>
              <a href="/" className="mt-2 block text-center text-xs font-bold">Back to Market</a>
            </div>
          )}
          {step==='insufficient' && <div className="mt-3 p-3 bg-red-50 border-2 border-red-300 rounded-xl text-center"><div className="font-black text-red-700 text-sm">Insufficient MoMo Balance</div><div className="text-xs mt-1">Required N{total.toLocaleString()} | Balance N{balance.toLocaleString()}</div><button onClick={()=>{const add=total-balance+10000; setBalance(balance+add); localStorage.setItem('momo_balance',(balance+add).toString()); setStep('confirmed')}} className="mt-2 w-full py-2 bg-green-600 text-white rounded-full text-xs font-bold">Top Up MoMo</button></div>}
        </div>
        <div className="mt-4 bg-gray-50 rounded-xl p-3 text-center"><div className="text-xs text-gray-600">Total (VAT 7.5% inclusive)</div><div className="text-2xl font-black text-green-700">N{total.toLocaleString()}</div><div className="text-[10px] font-bold text-green-600 mt-1">+ {pointsEarned} Green Points + {meta.earn}</div></div>
      </div>
    </main>
  )
}
