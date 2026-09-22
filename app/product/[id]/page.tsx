"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const DATA:any = {
  '1': {name:'Solar Incubator 500 Eggs', cat:'Farm & Agro'},
  '2': {name:'Solar Corn Sheller', cat:'Farm & Agro'},
  '9': {name:'Cutlass + Shovel Set', cat:'Hand Tools'},
  '10': {name:'Solar Welding Machine', cat:'Hand Tools'},
}

export default function ProductPage({params}:{params:{id:string}}){
  const p = DATA[params.id] || {name:'Product '+params.id, cat:'Hand Tools'}
  const [qty,setQty]=useState(1)
  const [state,setState]=useState('')
  const [warehouse,setWarehouse]=useState('')
  const [phone,setPhone]=useState('')
  const [agentCode,setAgentCode]=useState('')
  const [affCode,setAffCode]=useState('')
  const [includeCustoms,setIncludeCustoms]=useState(true)
  const [includeDelivery,setIncludeDelivery]=useState(true)
  const [visitFeePaid,setVisitFeePaid]=useState(false)

  useEffect(()=>{
    const ref = new URLSearchParams(window.location.search).get('ref')
    if(ref) setAffCode(ref)
    else {
      const saved = localStorage.getItem('nicham_affiliate')
      if(saved) setAffCode(saved)
    }
  },[])

  const requestQuote=()=>{
    if(!phone ||!state){ alert('Phone + State required'); return }
    if(!visitFeePaid){ alert('Please pay N10,000 factory visit fee to AfricanIES first (deductible from shipping). Covers factory visit in China.'); return }

    const rfq = {
      id: 'RFQ'+Date.now().toString().slice(-6),
      productId: params.id,
      productName: p.name,
      qty, state, warehouse, phone, agentCode, affiliateCode: affCode,
      includeCustoms, includeDelivery,
      visitFeePaid: 10000,
      visitFeeDeductible: true,
      sourcingType: 'Discovery Engine -> Accepted by AfricanIES/QIMA (Platform earns 3%)',
      status: 'Quote Requested - Awaiting AfricanIES',
      date: new Date().toLocaleString(),
      flags: {
        isAffiliateInvolved:!!affCode,
        isFieldAgentInvolved:!!agentCode,
        isDiscoveryEngineSourcing: true,
        isFactoryVisitFeePaid: true
      },
      breakdown: {
        platformGross: '5% (shared)',
        affiliate: affCode? `1% perpetual from platform 5% (Platform net 4%)` : 'None -> Platform keeps full 5%',
        fieldAgent: agentCode? `2% per order from platform 5% (Platform net 3% if no affiliate, 2% if both)` : 'None -> Platform keeps full 5%',
        sourcingAgent: '3% - Platform earns (Discovery Engine -> Accepted by AfricanIES/QIMA)',
        escrow: '1%',
        insurance: '1%',
        totalMarkup: '10% total to buyer (affiliate/field deducted from platform 5%, not extra)',
        factoryVisitFee: 'N10,000 per item type paid, deductible from shipping'
      }
    }

    const rfqs = JSON.parse(localStorage.getItem('nicham_rfqs')||'[]')
    rfqs.unshift(rfq)
    localStorage.setItem('nicham_rfqs', JSON.stringify(rfqs))

    const msgAfricanIES = `New RFQ ${rfq.id}: ${p.name} x${qty} -> ${state}. Phone ${phone}. Warehouse:${warehouse}. Include Customs:${includeCustoms} (must be part of AfricanIES quote), Include Delivery:${includeDelivery} (must be part). Affiliate:${affCode||'None'} 1% perpetual from platform 5%, Field Agent:${agentCode||'None'} 2% from platform 5%. Factory Visit Fee N10k paid (deductible). Sourcing: Discovery Engine -> Platform earns 3% (accepted by AfricanIES/QIMA). Need Factory + Shipping + Customs + Delivery quote.`
    window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(msgAfricanIES)}`,'_blank')
    alert(`RFQ ${rfq.id} created! Affiliate ${affCode||'None'} 1% from platform 5%, Field ${agentCode||'None'} 2% from platform 5%, Sourcing: Platform earns 3% (Discovery). Visit Fee N10k deductible. Sent to AfricanIES via WhatsApp. Check Orders/RFQs.`)
  }

  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b sticky top-0 z-10"><div className="max-w-4xl mx-auto px-4 py-3 flex justify-between"><Link href="/" className="text-xs border px-4 py-2 rounded-full">← Marketplace</Link><Link href="/orders" className="text-xs bg-black text-white px-4 py-2 rounded-full">Orders/RFQs</Link></div></header>

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-2xl p-6 border">
            <div className="w-full h-40 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl flex items-center justify-center text-4xl font-black">RFQ</div>
            <div className="mt-4 text-xs bg-gray-50 rounded-xl p-3">
              <div className="font-bold">How Nicham knows who is involved:</div>
              <div className="mt-2 text- space-y-1">
                <div>• Affiliate: {affCode? `CODE ${affCode} from?ref= → 1% perpetual from platform 5% (Platform net 4%)` : 'None (no?ref=) → Platform keeps full 5%'}</div>
                <div>• Field Agent: {agentCode? `CODE ${agentCode} entered → 2% from platform 5% (Platform net 3%)` : 'None (Agent Code empty) → Platform keeps full 5%'}</div>
                <div>• Sourcing: Discovery Engine → Accepted → Platform earns 3% (not external). If External China/America (not AfricanIES/Betterluck) → External earns 3% (their charges NOT all-in). AfricanIES/Betterluck all-in → No extra 3%.</div>
                <div>• Visit Fee: N10,000 per item type to AfricanIES, deductible from shipping. Covers factory visit in China.</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border">
            <div className="font-black text-xl">{p.name}</div><div className="text-xs text-gray-500 mt-1">{p.cat} • Product Discovery Engine • No price — RFQ only</div>

            <div className="mt-4 space-y-2">
              <div className="flex gap-2"><input type="number" value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="w-1/2 border rounded px-2 py-1.5 text-sm" placeholder="Qty"/><input value={phone} onChange={e=>setPhone(e.target.value)} className="w-1/2 border rounded px-2 py-1.5 text-sm" placeholder="Phone *"/></div>
              <input value={state} onChange={e=>setState(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="State * (Kano, Lagos...)"/>
              <input value={warehouse} onChange={e=>setWarehouse(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="Warehouse Address"/>

              <div className="border rounded p-2 bg-yellow-50 text-xs">
                <div className="font-bold">AfricanIES Full Landed Quote (must include by default):</div>
                <label className="flex gap-2 mt-1"><input type="checkbox" checked={includeCustoms} onChange={e=>setIncludeCustoms(e.target.checked)}/> Include Customs clearing (default checked, must be part of AfricanIES quote)</label>
                <label className="flex gap-2 mt-1"><input type="checkbox" checked={includeDelivery} onChange={e=>setIncludeDelivery(e.target.checked)}/> Include Delivery to warehouse (default checked, must be part)</label>
                <div className="text- text-gray-500 mt-1">AfricanIES responsible for Customs + Delivery unless buyer declines, but initially must be part of quote.</div>
              </div>

              <div className="border rounded p-2 text-xs">
                <div className="font-bold">Agent Tracking — How Nicham knows:</div>
                <input value={agentCode} onChange={e=>setAgentCode(e.target.value)} placeholder="Field Agent Code AGENT-4567 (optional, 2% from platform 5%)" className="w-full border rounded px-2 py-1 text-xs mt-1"/>
                <div className="text- mt-1">{agentCode?`Field Agent ${agentCode} involved → 2% from platform 5% (Platform net 3% if no affiliate)`:'No field agent code → No field agent involved → Platform keeps full 5%'}</div>
                <input value={affCode} onChange={e=>setAffCode(e.target.value)} placeholder="Affiliate Code AFF123 (auto from?ref=, 1% perpetual from platform 5%)" className="w-full border rounded px-2 py-1 text-xs mt-2"/>
                <div className="text- mt-1">{affCode?`Affiliate ${affCode} involved → 1% perpetual from platform 5% (Platform net 4%)`:'No affiliate code → No affiliate involved → Platform keeps full 5%'}</div>
                <div className="text- bg-blue-50 p-2 rounded mt-2">Sourcing Agent 3%: Platform earns if Discovery Engine → Accepted by AfricanIES/QIMA. External China/America agent (not AfricanIES/Betterluck) earns 3% if they sourced (their charges NOT all-in). AfricanIES/Betterluck all-in → No extra 3% (charges all-in). Affiliate 1% + Field 2% deducted from platform 5%, not extra to buyer.</div>
              </div>

              <div className="border rounded p-2 bg-green-50 text-xs">
                <div className="font-bold">Factory Visit Fee:</div>
                <div>N10,000 per item type to AfricanIES for factory visit (deductible from shipping)</div>
                <label className="flex gap-2 mt-2"><input type="checkbox" checked={visitFeePaid} onChange={e=>setVisitFeePaid(e.target.checked)}/> I paid/will pay N10k visit fee (required to request quote)</label>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 text-">
                <div className="font-bold">Quote Breakdown (10% total to buyer always):</div>
                <div>Base = Factory + AfricanIES Full Landed (Shipping+Customs+Delivery - N10k) + QIMA PSI (via WhatsApp quote)</div>
                <div>App = Base * 1.10 = Platform 5% shared (-1% affiliate -2% field) + Sourcing 3% (Platform if Discovery) + Escrow 1% + Insurance 1%</div>
                <div className="font-bold mt-1">Total always 10% — affiliate/field deducted from platform 5%, not extra</div>
              </div>
            </div>

            <button onClick={requestQuote} className="mt-4 w-full bg-green-600 text-white py-3 rounded-full font-bold text-sm">Request for Quote via WhatsApp + Save RFQ</button>
            <div className="text- text-center text-gray-500 mt-2">Secure via MTN Escrow • QIMA inspected • Sourced and delivered by AfricanIES • Factory visit fee deductible</div>
          </div>
        </div>
      </div>
    </div>
  )
}
