'use client'
import { useState, useEffect } from 'react'
export default function AffiliatePage(){
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [code,setCode]=useState('')
  const [earnings,setEarnings]=useState(0)
  const [buyers,setBuyers]=useState<any[]>([])
  const [orders,setOrders]=useState<any[]>([])
  useEffect(()=>{
    setName(localStorage.getItem('aff_name')||'')
    setPhone(localStorage.getItem('aff_phone')||'')
    let c=localStorage.getItem('aff_code')
    if(!c){ c='AFF'+Math.floor(1000+Math.random()*9000); localStorage.setItem('aff_code', c) }
    setCode(c)
    const allOrders=JSON.parse(localStorage.getItem('nicham_orders')||'[]')
    const myOrders=allOrders.filter((o:any)=>o.affiliateCode===c)
    setOrders(myOrders)
    const buyersMap: any = {}
    myOrders.forEach((o:any)=>{ buyersMap[o.buyerPhone||'direct'] = (buyersMap[o.buyerPhone||'direct']||0)+1 })
    setBuyers(Object.keys(buyersMap))
    const earn=myOrders.reduce((s:any,o:any)=> s + Math.round(o.total*0.01),0)
    setEarnings(earn)
  },[])
  const save=()=>{ localStorage.setItem('aff_name', name); localStorage.setItem('aff_phone', phone); alert('Profile saved') }
  const refLink=typeof window!=='undefined' ? `${window.location.origin}?ref=${code}` : `?ref=${code}`
  const shareWA=`https://wa.me/?text=${encodeURIComponent(`Buy solar and chemicals on NiChAm Trade - Marketplace for Manufacturers to sell, farmers and traders to buy. Use my link: ${refLink}`)}`
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold">← Back to NiChAm Trade</a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-xl font-black">Affiliate Dashboard</h1>
        <div className="text-xs text-gray-600 mt-1">Earn lifetime commission when people you bring buy. No stock, just share your link.</div>
        <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3">
          <div className="text-xs font-bold">Your Profile</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" className="px-3 py-2 rounded-full border text-xs" />
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="MoMo Number for payout" className="px-3 py-2 rounded-full border text-xs" />
          </div>
          <button onClick={save} className="mt-2 w-full py-2 bg-black text-white rounded-full text-xs font-bold">Save & Generate Link</button>
        </div>
        <div className="mt-4 bg-green-50 border rounded-xl p-3">
          <div className="text-xs font-bold">Your Referral Link (Perpetual)</div>
          <div className="text-xs mt-1 bg-white p-2 rounded border break-all">{refLink}</div>
          <div className="flex gap-2 mt-2">
            <button onClick={()=>{navigator.clipboard.writeText(refLink); alert('Link copied')}} className="px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold">Copy Link</button>
            <a href={shareWA} target="_blank" className="px-4 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold">Share WhatsApp</a>
          </div>
          <div className="text-[10px] text-gray-600 mt-2">Anyone who buys through your link is tagged to you forever. You earn each time they buy themselves. If agent helps them place order, that order pays agent only (no double pay same order).</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-blue-50 p-3 rounded-xl text-center"><div className="text-[10px]">Buyers Tagged</div><div className="font-black">{buyers.length}</div></div>
          <div className="bg-green-50 p-3 rounded-xl text-center"><div className="text-[10px]">Orders</div><div className="font-black">{orders.length}</div></div>
          <div className="bg-yellow-50 p-3 rounded-xl text-center"><div className="text-[10px]">Earnings</div><div className="font-black">N{earnings.toLocaleString()}</div></div>
        </div>
        <div className="mt-4 text-[10px] text-gray-500">Platform is marketplace for Manufacturers to sell, farmers and traders to buy. Platform holds no stock. Earnings paid to your MoMo.</div>
      </div>
    </main>
  )
}
