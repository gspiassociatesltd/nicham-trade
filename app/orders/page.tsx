'use client'
import { useState, useEffect } from 'react'

export default function OrdersPage({ searchParams }: { searchParams: { lang?: string } }) {
  const lang = searchParams?.lang || 'en'
  const [orders, setOrders] = useState<any[]>([])
  const [balance, setBalance] = useState(0)
  const [momoNumber, setMomoNumber] = useState('')
  const [payingId, setPayingId] = useState('')

  useEffect(() => {
    const o = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    setOrders(o)
    setBalance(parseInt(localStorage.getItem('momo_balance')||'50000'))
    setMomoNumber(localStorage.getItem('momo_number')||'0803 123 4567')
  }, [])

  const topUp = () => {
    const amount = parseInt(prompt('Enter top up amount ₦')||'0')
    if (amount>0){ const nb=balance+amount; setBalance(nb); localStorage.setItem('momo_balance', nb.toString()); alert('Topped up! New balance ₦'+nb.toLocaleString()) }
  }

  const handlePay = (orderId: string) => {
    const order = orders.find(o=>o.orderId===orderId)
    if (!order) return
    setPayingId(orderId)
    setTimeout(()=>{
      if (balance < order.total){
        alert('Still insufficient. Balance ₦'+balance.toLocaleString()+' Required ₦'+order.total.toLocaleString()+' Please top up.')
        setPayingId('')
        return
      }
      const nb = balance - order.total
      setBalance(nb)
      localStorage.setItem('momo_balance', nb.toString())
      const updated = orders.map(o=> o.orderId===orderId ? {...o, status:'paid_escrow', momoTxn:'MOMO-'+Date.now().toString().slice(-6), paidAt:new Date().toLocaleString()} : o)
      setOrders(updated)
      localStorage.setItem('nicham_orders', JSON.stringify(updated))
      // admin hidden stages
      const admin = JSON.parse(localStorage.getItem('nicham_admin_escrow')||'[]')
      admin.unshift({orderId, total:order.total, stage1:'30% AfricanIES collection', stage2:'70% delivery', hidden:true})
      localStorage.setItem('nicham_admin_escrow', JSON.stringify(admin))
      setPayingId('')
      // speak
      try{
        const u=new SpeechSynthesisUtterance('Payment of '+order.total.toLocaleString()+' naira secured in escrow with MTN MoMo for order '+orderId+'. AfricanIES will deliver.')
        u.lang='en-NG'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u)
      }catch{}
    },1000)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href={`/?lang=${lang}`} className="text-sm">&lt;- Back to Market</a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-xl font-black">📦 My Orders - Saved & Paid</h1>
        <div className="mt-3 bg-yellow-50 border rounded-xl p-3 text-xs">
          <div>MoMo: {momoNumber} | Balance: <b>₦{balance.toLocaleString()}</b></div>
          <button onClick={topUp} className="mt-2 px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold">➕ Top Up MoMo Wallet</button>
        </div>

        {orders.length===0 && <div className="mt-6 text-center text-gray-500 text-sm">No saved orders yet. Place order and click Save - Pay Later.</div>}

        {orders.map(o=>(
          <div key={o.orderId} className="mt-4 border-2 rounded-xl p-3 flex justify-between items-center">
            <div>
              <div className="font-bold text-sm">{o.productName}</div>
              <div className="text-xs text-gray-600">ID: {o.orderId} | {o.date}</div>
              <div className="text-sm font-black">₦{o.total?.toLocaleString()}</div>
              <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 ${o.status==='paid_escrow'?'bg-green-100 text-green-700':'bg-orange-100 text-orange-700'}`}>{o.status}</div>
              {o.momoTxn && <div className="text-[10px] text-gray-500">MoMo Txn: {o.momoTxn}</div>}
            </div>
            <div>
              {o.status==='awaiting_payment' ? (
                <button disabled={payingId===o.orderId} onClick={()=>handlePay(o.orderId)} className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold">
                  {payingId===o.orderId ? 'Paying...' : '💳 Pay Now with MoMo'}
                </button>
              ) : (
                <div className="text-xs text-green-600 font-bold">✅ Secured in Escrow</div>
              )}
            </div>
          </div>
        ))}

        <div className="mt-6 bg-gray-50 p-3 rounded-xl text-[10px] text-gray-500">
          <b>Flow for insufficient → top up → pay:</b><br/>
          1. Order saved as awaiting_payment (24hrs)<br/>
          2. User tops up MoMo wallet anywhere (Top Up button or MoMo app)<br/>
          3. Return to /orders → Click Pay Now → Balance checked again → If sufficient, deducts, moves to paid_escrow, admin logs 30%/70% stages (hidden from buyer)<br/>
          4. Buyer only sees "Payment secured, AfricanIES will deliver"
        </div>
      </div>
    </main>
  )
}
