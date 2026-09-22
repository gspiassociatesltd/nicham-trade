"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Orders(){
  const [rfqs,setRfqs]=useState<any[]>([])
  useEffect(()=>{
    const saved = localStorage.getItem('nicham_rfqs')
    if(saved) try{ setRfqs(JSON.parse(saved)) }catch{}
  },[])

  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b"><div className="max-w-4xl mx-auto px-4 py-3 flex justify-between"><Link href="/" className="text-xs border px-4 py-2 rounded-full">← Marketplace</Link><button onClick={()=>{localStorage.removeItem('nicham_rfqs'); setRfqs([])}} className="text-xs border px-3 py-2 rounded-full">Clear RFQs</button></div></header>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="font-black text-xl">RFQs / Orders ({rfqs.length}) — How Nicham knows who is involved</h1>
        <div className="text-xs text-gray-500 mt-1">Factory Visit Fee N10k per item type deductible. AfricanIES responsible for Customs+Delivery unless buyer declines (must initially be part). Affiliate 1% perpetual + Field 2% deducted from platform 5%, not extra. Platform earns 3% if Discovery→Accepted. External China/America (not AfricanIES/Betterluck) earns 3% if they sourced.</div>
        {rfqs.length===0? <div className="mt-10 bg-white rounded-2xl p-10 text-center border text-sm text-gray-400">No RFQs yet.</div> :
          <div className="mt-4 space-y-3">
            {rfqs.map((r:any)=><div key={r.id} className="bg-white rounded-2xl p-4 border">
              <div className="flex justify-between"><div className="font-bold text-sm">{r.id} — {r.productName} x{r.qty}</div><div className="text-xs bg-yellow-100 px-2 py-1 rounded-full">{r.status}</div></div>
              <div className="text-xs text-gray-500 mt-1">Phone {r.phone} • {r.state} • {r.date}</div>
              <div className="mt-2 space-y-1 text-">
                <div className={r.flags?.isAffiliateInvolved?'bg-purple-50 border border-purple-200 rounded p-2':'bg-gray-50 rounded p-2'}><b>Affiliate (1% perpetual):</b> {r.affiliateCode||'None'} — {r.flags?.isAffiliateInvolved?'1% from platform 5%':'Platform keeps full 5%'} — How:?ref=CODE→localStorage</div>
                <div className={r.flags?.isFieldAgentInvolved?'bg-yellow-50 border border-yellow-200 rounded p-2':'bg-gray-50 rounded p-2'}><b>Field Agent (2%):</b> {r.agentCode||'None'} — How: Agent Code field in RFQ form</div>
                <div className="bg-green-50 border border-green-200 rounded p-2"><b>Sourcing Agent (3%):</b> {r.sourcingType} — How: Admin SourcedBy dropdown (Discovery→Platform earns 3% vs AfricanIES/Betterluck all-in vs External 3%)</div>
              </div>
            </div>)}
          </div>
        }
      </div>
    </div>
  )
}
