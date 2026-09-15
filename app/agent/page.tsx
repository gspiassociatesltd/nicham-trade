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
  const save=()=>{ localStorage.setItem('agent_name', agentName); localStorage.setItem('agent_phone', agentPhone); alert('Saved '+agentName+' MoMo '+agentPhone) }
  const paid=orders.filter((o:any)=>o.status==='paid_escrow')
  const cash=paid.reduce((s:number,o:any)=>s+Math.round(o.total*0.02),0)
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold">← Back to NiChAm Trade</a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="font-black text-xl">Agent Dashboard - Cash + Points</h1>
        <div className="mt-3 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3">
          <div className="text-xs font-bold">Agent Profile - MoMo Cash Receiver</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input value={agentName} onChange={e=>setAgentName(e.target.value)} placeholder="Name" className="px-3 py-2 rounded-full border text-xs" />
            <input value={agentPhone} onChange={e=>setAgentPhone(e.target.value)} placeholder="MoMo Phone" className="px-3 py-2 rounded-full border text-xs" />
          </div>
          <button onClick={save} className="mt-2 w-full py-2 bg-black text-white rounded-full text-xs font-bold">Save - MTN will pay this MoMo</button>
          <div className="text-[10px] mt-1">Earns 2% cash via MTN Disbursement + Points same time seller paid 30/40/30%.</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-green-50 p-3 rounded-xl text-center"><div className="text-[10px]">Orders</div><div className="font-black">{orders.length}</div></div>
          <div className="bg-yellow-50 p-3 rounded-xl text-center"><div className="text-[10px]">Cash 2%</div><div className="font-black">N{cash}</div></div>
          <div className="bg-blue-50 p-3 rounded-xl text-center"><div className="text-[10px]">Paid Escrow</div><div className="font-black">{paid.length}</div></div>
        </div>
        <div className="mt-4 bg-gray-50 p-3 rounded-xl text-[11px]">
          MTN MoMo Disbursement API pays Agent MoMo instantly on AfricanIES stage confirm. Platform 5% → Flutterwave. Sourcing China 3% → Juicyway Naira→CNY Alipay. USA → Grey Naira→USD. Solves forex CBN block.
        </div>
      </div>
    </main>
  )
}
