'use client'
import { useState, useEffect } from 'react'
export default function AgentPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [agentName, setAgentName] = useState('')
  const [agentPhone, setAgentPhone] = useState('')
  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('nicham_orders') || '[]'))
    setAgentName(localStorage.getItem('agent_name') || '')
    setAgentPhone(localStorage.getItem('agent_phone') || '')
  }, [])
  const save=()=>{ localStorage.setItem('agent_name', agentName); localStorage.setItem('agent_phone', agentPhone); localStorage.setItem('momo_number', agentPhone); alert('Saved: '+agentName+' - '+agentPhone) }
  const paid=orders.filter((o:any)=>o.status==='paid_escrow' || o.status==='paid')
  const myOrders=orders.filter((o:any)=>o.agentPhone===agentPhone)
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold">← Back to NiChAm Trade</a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="font-black text-xl">Agent Dashboard</h1>
        <div className="text-xs text-gray-600 mt-1">Helping farmers and traders who cannot read or write English to place orders.</div>
        <div className="mt-3 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3">
          <div className="text-xs font-bold">Agent Profile</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input value={agentName} onChange={e=>setAgentName(e.target.value)} placeholder="Your Name" className="px-3 py-2 rounded-full border text-xs" />
            <input value={agentPhone} onChange={e=>setAgentPhone(e.target.value)} placeholder="MoMo Phone Number" className="px-3 py-2 rounded-full border text-xs" />
          </div>
          <button onClick={save} className="mt-2 w-full py-2 bg-black text-white rounded-full text-xs font-bold">Save Profile</button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-green-50 p-3 rounded-xl text-center"><div className="text-[10px]">Total Orders</div><div className="font-black">{orders.length}</div></div>
          <div className="bg-yellow-50 p-3 rounded-xl text-center"><div className="text-[10px]">My Orders</div><div className="font-black">{myOrders.length}</div></div>
          <div className="bg-blue-50 p-3 rounded-xl text-center"><div className="text-[10px]">Paid</div><div className="font-black">{paid.length}</div></div>
        </div>
        <div className="mt-4 text-xs">Platform is marketplace for traders to sell. Farmers and traders can buy. Platform holds no stock. If no agent for transaction, commission goes to platform.</div>
        <div className="mt-2 text-[10px] text-gray-500">Affiliate marketing is admin only and will stand alone later - not shown to users.</div>
      </div>
    </main>
  )
}
