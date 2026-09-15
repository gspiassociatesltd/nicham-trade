'use client'
import { useState, useEffect } from 'react'

export default function AgentPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [points, setPoints] = useState(0)
  const [agentName, setAgentName] = useState('')
  const [agentPhone, setAgentPhone] = useState('')

  useEffect(() => {
    const o = JSON.parse(localStorage.getItem('nicham_orders') || '[]')
    setOrders(o)
    const p = localStorage.getItem('green_points')
    if (p) setPoints(parseInt(p))
    setAgentName(localStorage.getItem('agent_name') || '')
    setAgentPhone(localStorage.getItem('agent_phone') || '')
  }, [])

  const saveAgent = () => {
    localStorage.setItem('agent_name', agentName)
    localStorage.setItem('agent_phone', agentPhone)
    alert('Agent profile saved: ' + agentName)
  }

  const totalCommission = orders.filter((o:any)=>o.status==='paid_escrow').reduce((sum:number,o:any)=> sum + (o.points || 0), 0)

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold flex items-center gap-2 mb-4"><img src="/logo.png" className="w-8 h-8 rounded-full" /> Back to Market</a>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-12 h-12 rounded-full" />
          <div>
            <h1 className="text-xl font-black">Agent Dashboard - Zero Budget</h1>
            <div className="text-xs text-gray-600">Help those who cannot read/write English to order</div>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3">
          <div className="text-xs font-bold">Agent Profile (Village Youth / Extension Worker)</div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input value={agentName} onChange={e=>setAgentName(e.target.value)} placeholder="Agent Name e.g. Musa" className="px-3 py-2 rounded-full border text-xs" />
            <input value={agentPhone} onChange={e=>setAgentPhone(e.target.value)} placeholder="Agent Phone e.g. 0803..." className="px-3 py-2 rounded-full border text-xs" />
          </div>
          <button onClick={saveAgent} className="mt-2 w-full py-2 bg-black text-white rounded-full text-xs font-bold">Save Agent Profile</button>
          <div className="text-[10px] text-gray-600 mt-1">Agent earns 1% Green Points on every order placed for farmer. Farmer gets SMS Order ID.</div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-green-50 rounded-xl p-3 text-center"><div className="text-[10px] text-gray-600">Green Points</div><div className="font-black text-green-700">{points.toLocaleString()}</div></div>
          <div className="bg-blue-50 rounded-xl p-3 text-center"><div className="text-[10px] text-gray-600">Orders Helped</div><div className="font-black text-blue-700">{orders.length}</div></div>
          <div className="bg-yellow-50 rounded-xl p-3 text-center"><div className="text-[10px] text-gray-600">Commission Points</div><div className="font-black text-yellow-700">{totalCommission.toLocaleString()}</div></div>
        </div>

        <div className="mt-4">
          <div className="font-bold text-sm">How Agent Helps Illiterate Farmer (Zero Budget Flow):</div>
          <div className="text-[11px] text-gray-700 mt-1 bg-gray-50 p-3 rounded-xl">
            1. Farmer tells Agent: I want Solar Bike<br/>
            2. Agent opens NiChAm Market, clicks product, clicks YES (voice confirms)<br/>
            3. Agent enters Farmer Name + Phone in checkout note (or tells farmer Order ID)<br/>
            4. Agent pays with Farmer MoMo number or collects cash and pays<br/>
            5. Farmer gets SMS: Order ID NCH-xxx - Paid Escrow<br/>
            6. AfricanIES delivers to village<br/>
            7. Farmer confirms with Agent → MoMo pays manufacturer → Agent Green Points credited
          </div>
        </div>

        <div className="mt-4">
          <div className="font-bold text-sm">Recent Orders (For Farmers You Helped):</div>
          {orders.length===0 ? <div className="text-xs text-gray-500 mt-2">No orders yet. Help a farmer place order - go to market and click YES.</div> : orders.map((o:any, i:number)=>(
            <div key={i} className="mt-2 p-2 bg-gray-50 rounded-xl text-xs flex justify-between">
              <div><b>{o.productName}</b><br/>{o.orderId} - N{o.total.toLocaleString()} - {o.status}</div>
              <div className="text-right"><div className="text-green-600 font-bold">+{o.points || 0} pts</div><div className="text-[10px]">{o.date}</div></div>
            </div>
          ))}
        </div>

        <a href="/" className="mt-6 block w-full py-3 bg-green-600 text-white rounded-full font-black text-center text-sm">Go to Market - Help Farmer Order</a>
      </div>
    </main>
  )
}
