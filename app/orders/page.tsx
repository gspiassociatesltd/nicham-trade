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
    setMomoNumber(localStorage.getItem('momo_number')||'0803 123 4567')
  }, [])
  const topUp = () => {
    const val = prompt('Enter top up amount')
    const amount = parseInt(val||'0')
    if (amount>0){ const nb=balance+amount; setBalance(nb); localStorage.setItem('momo_balance', nb.toString()) }
  }
  const getSplit = (o:any)=>{
    const total=o.total
    const hasAgent = !!o.agentPhone
    const sourcedBy = o.sourcedBy || 'AFRICANIES'
    const isAfricanSourced = sourcedBy==='AFRICANIES' || sourcedBy.includes('AFRICAN')
    // Conditional: if no agent, agent commission goes to platform. If no external sourcing or AfricanIES sourced, sourcing goes to AfricanIES or Platform
    let platform = Math.round(total*0.05)
    let african = Math.round(total*0.15)
    let seller = Math.round(total*0.75)
    let agentNG = hasAgent ? Math.round(total*0.02) : 0
    let sourcing = 0
    if(!hasAgent){ platform += Math.round(total*0.02) }
    if(isAfricanSourced){
      african += Math.round(total*0.03) // Sourcing 3% -> AfricanIES = 18%
    } else {
      sourcing = Math.round(total*0.03) // External sourcing agent
    }
    // If no external sourcing and not AfricanIES? Then sourcing goes to platform
    if(!isAfricanSourced && !o.sourcingAgentId){ 
      // If no sourcing agent identified, goes to platform
      // But if we have sourcing agent ID, it stays as sourcing
      if(!o.sourcingAgentId && sourcedBy==='AFRICANIES'){ /* already handled */ }
    }
    // If no agent and no sourcing agent, platform gets both
    if(!hasAgent && !sourcing){ /* platform already got agent */ }
    if(!hasAgent && isAfricanSourced){ /* platform 7%, african 18%, seller 75% =100% */ }
    if(!hasAgent && !isAfricanSourced){ /* platform 7%, african 15%, seller 75%, sourcing 3% =100% */ }
    return { platform, african, seller, agentNG, sourcing, hasAgent, isAfricanSourced, sourcedBy }
  }
  const handlePay = (orderId: string) => {
    const order = orders.find((o:any)=>o.orderId===orderId)
    if (!order) return
    setPayingId(orderId)
    setTimeout(()=>{
      if (balance < order.total){ alert('Insufficient balance'); setPayingId(''); return }
      const nb = balance - order.total
      setBalance(nb); localStorage.setItem('momo_balance', nb.toString())
      const updated = orders.map((o:any)=> o.orderId===orderId ? {...o, status:'paid_escrow', momoTxn:'MOMO-'+Date.now().toString().slice(-6)} : o)
      setOrders(updated); localStorage.setItem('nicham_orders', JSON.stringify(updated))
      const admin = JSON.parse(localStorage.getItem('nicham_admin_escrow')||'[]')
      admin.unshift({orderId, total:order.total, status:'held_escrow'})
      localStorage.setItem('nicham_admin_escrow', JSON.stringify(admin))
      setPayingId('')
    },1000)
  }
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold flex items-center gap-2">← Back to NiChAm Trade <img src="/logo.png" className="w-6 h-6 rounded-full" /></a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-xl font-black">My Orders</h1>
        <div className="mt-3 bg-yellow-50 border rounded-xl p-3 text-xs">
          <div>MoMo: {momoNumber} | Balance: <b>N{balance.toLocaleString()}</b></div>
          <button onClick={topUp} className="mt-2 px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold">Top Up</button>
        </div>
        {orders.length===0 && <div className="mt-4 text-sm text-gray-500">No orders yet. Marketplace for traders to sell, farmers and traders to buy. Platform holds no stock.</div>}
        {orders.map((o:any)=>{
          const s=getSplit(o)
          return (
          <div key={o.orderId} className="mt-4 border-2 rounded-xl p-3">
            <div className="flex justify-between"><div><div className="font-bold text-sm">{o.productName}</div><div className="text-xs">ID: {o.orderId} | {o.date}</div><div className="font-black">N{o.total?.toLocaleString()}</div><div className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 inline-block">{o.status}</div></div><div>{o.status==='awaiting_payment'&&<button onClick={()=>handlePay(o.orderId)} disabled={!!payingId} className="px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold">{payingId===o.orderId?'Processing...':'Pay via MoMo'}</button>}</div></div>
            <div className="mt-3 bg-gray-50 rounded-xl p-2 text-[10px]">
              <div>Order type: {o.type==='chemical' ? `Chemical - Sourced by ${s.sourcedBy}` : 'Solar - Direct from trader'} | Agent: {s.hasAgent ? o.agentPhone : 'None (direct buyer)'}</div>
              {o.status==='paid_escrow' && <div className="mt-1">Payment secured in MTN MoMo escrow. Delivery by AfricanIES logistics.</div>}
            </div>
          </div>
        )})}
      </div>
    </main>
  )
}
