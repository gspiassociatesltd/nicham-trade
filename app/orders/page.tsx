'use client'
import { useState, useEffect } from 'react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [balance, setBalance] = useState(0)
  const [momoNumber, setMomoNumber] = useState('0803 123 4567')
  const [payingId, setPayingId] = useState('')
  const [en, setLang] = useState('en')

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    setLang(sp.get('en') || localStorage.getItem('nicham_en') || 'en')
    try{ setOrders(JSON.parse(localStorage.getItem('nicham_orders') || '[]')) }catch{ setOrders([]) }
    setBalance(parseInt(localStorage.getItem('momo_balance')||'50000'))
    setMomoNumber(localStorage.getItem('momo_number')||'0803 123 4567')
  }, [])

  const topUp = () => {
    const val = prompt('Enter top up amount e.g. 300000')
    const amount = parseInt(val||'0')
    if (amount>0){ const nb=balance+amount; setBalance(nb); localStorage.setItem('momo_balance', nb.toString()); alert('Topped up! New balance N'+nb.toLocaleString()) }
  }

  const handlePay = (orderId: string) => {
    const order = orders.find((o:any)=>o.orderId===orderId)
    if (!order) return
    setPayingId(orderId)
    setTimeout(()=>{
      if (balance < order.total){
        alert('Still insufficient. Balance N'+balance.toLocaleString()+' Required N'+order.total.toLocaleString()+' Please top up.')
        setPayingId('')
        return
      }
      const nb = balance - order.total
      setBalance(nb)
      localStorage.setItem('momo_balance', nb.toString())
      const updated = orders.map((o:any)=> o.orderId===orderId ? {...o, status:'paid_escrow', momoTxn:'MOMO-'+Date.now().toString().slice(-6), paidAt:new Date().toLocaleString()} : o)
      setOrders(updated)
      localStorage.setItem('nicham_orders', JSON.stringify(updated))
      const admin = JSON.parse(localStorage.getItem('nicham_admin_escrow')||'[]')
      admin.unshift({orderId, total:order.total, stage1:'30% on collection', stage2:'70% on delivery', hidden:true})
      localStorage.setItem('nicham_admin_escrow', JSON.stringify(admin))
      setPayingId('')
      try{ const u=new SpeechSynthesisUtterance('Payment of '+order.total.toLocaleString()+' naira secured in escrow with MTN MoMo for order '+orderId+'. AfricanIES will deliver.'); u.en='en-NG'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u)}catch{}
    },1000)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href={`/?en=${en}`} className="text-sm">{"<-"} Back to Market</a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-xl font-black">My Orders - Saved and Paid</h1>
        <div className="mt-3 bg-yellow-50 border rounded-xl p-3 text-xs">
          <div>MoMo: {momoNumber} | Balance: <b>N{balance.toLocaleString()}</b></div>
          <button onClick={topUp} className="mt-2 px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold">Top Up MoMo Wallet</button>
        </div>
        {orders.length===0 && <div className="mt-6 text-center text-gray-500 text-sm">No saved orders yet. Place order and click Save - Pay Later.</div>}
        {orders.map((o:any)=>(
          <div key={o.orderId} className="mt-4 border-2 rounded-xl p-3 flex justify-between items-center">
            <div>
              <div className="font-bold text-sm">{o.productName}</div>
              <div className="text-xs text-gray-600">ID: {o.orderId} | {o.date}</div>
              <div className="text-sm font-black">N{o.total?.toLocaleString()}</div>
              <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 ${o.status==='paid_escrow'?'bg-green-100 text-green-700':'bg-orange-100 text-orange-700'}`}>{o.status}</div>
              {o.momoTxn && <div className="text-[10px] text-gray-500">MoMo Txn: {o.momoTxn}</div>}
            </div>
            <div>
              {o.status==='awaiting_payment' ? (
                <button disabled={payingId===o.orderId} onClick={()=>handlePay(o.orderId)} className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold">
                  {payingId===o.orderId ? 'Paying...' : 'Pay Now with MoMo'}
                </button>
              ) : (
                <div className="text-xs text-green-600 font-bold">Secured in Escrow</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
