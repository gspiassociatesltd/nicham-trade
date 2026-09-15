'use client'
import { useState, useEffect } from 'react'
export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [balance, setBalance] = useState(50000)
  const [momoNumber, setMomoNumber] = useState('0803 123 4567')
  const [payingId, setPayingId] = useState('')
  useEffect(() => {
    try{ setOrders(JSON.parse(localStorage.getItem('nicham_orders') || '[]')) }catch{ setOrders([]) }
    setBalance(parseInt(localStorage.getItem('momo_balance')||'50000'))
  }, [])
  const topUp = () => {
    const val = prompt('Enter top up amount')
    const amount = parseInt(val||'0')
    if (amount>0){ const nb=balance+amount; setBalance(nb); localStorage.setItem('momo_balance', nb.toString()) }
  }
  const handlePay = (orderId: string) => {
    const order = orders.find((o:any)=>o.orderId===orderId)
    if (!order) return
    setPayingId(orderId)
    setTimeout(()=>{
      if (balance < order.total){ alert('Insufficient'); setPayingId(''); return }
      const nb = balance - order.total
      setBalance(nb); localStorage.setItem('momo_balance', nb.toString())
      const updated = orders.map((o:any)=> o.orderId===orderId ? {...o, status:'paid_escrow', momoTxn:'MOMO-'+Date.now().toString().slice(-6)} : o)
      setOrders(updated); localStorage.setItem('nicham_orders', JSON.stringify(updated)); setPayingId('')
    },800)
  }
  const getSplit = (total:number)=>({ platform: Math.round(total*0.05), african: Math.round(total*0.15), seller: Math.round(total*0.75), agentNG: Math.round(total*0.02), sourcing: Math.round(total*0.03) })
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold flex items-center gap-2">← Back to NiChAm Trade <img src="/logo.png" className="w-6 h-6 rounded-full" /></a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-xl font-black">My Orders - MTN Escrow</h1>
        <div className="mt-3 bg-yellow-50 border rounded-xl p-3 text-xs">
          <div>MoMo: {momoNumber} | Balance: <b>N{balance.toLocaleString()}</b></div>
          <button onClick={topUp} className="mt-2 px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold">Top Up</button>
          <div className="mt-2 text-[9px] text-gray-500">TODO MTN MoMo Collections API. Platform NOT holding money.</div>
        </div>
        {orders.map((o:any)=>{
          const s=getSplit(o.total)
          return (
          <div key={o.orderId} className="mt-4 border-2 rounded-xl p-3">
            <div className="flex justify-between"><div><div className="font-bold text-sm">{o.productName}</div><div className="text-xs">ID: {o.orderId}</div><div className="font-black">N{o.total?.toLocaleString()}</div><div className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 inline-block">{o.status}</div></div><div>{o.status==='awaiting_payment'&&<button onClick={()=>handlePay(o.orderId)} className="px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold">Pay Escrow</button>}</div></div>
            <div className="mt-3 bg-gray-50 rounded-xl p-2 text-[10px]">
              <div className="font-bold">MTN Split 30/40/30% - Platform 5% included:</div>
              <div>Platform 5%: N{s.platform} → Flutterwave | AfricanIES 15%: N{s.african} | Seller 75%: N{s.seller}</div>
              <div>Agent NG 2%: N{s.agentNG} MoMo | Sourcing 3%: N{s.sourcing} → Juicyway CN¥ Alipay / Grey US$</div>
              <div className="text-[8px] text-gray-500 mt-1">Forex: MTN cannot source USD/CNY (CBN). Use Juicyway for China, Grey for USA. MTN→Flutterwave→Fintech.</div>
            </div>
          </div>
        )})}
      </div>
    </main>
  )
}
