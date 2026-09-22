"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRODUCTS: any = {
  '1': {name:'Solar Incubator 500 Eggs', cat:'Farm & Agro', manufacturer:'SolarTech China', sourcedBy:'Discovery Engine -> Accepted by AfricanIES/QIMA (Platform earns 3%)'},
  '2': {name:'Solar Corn Sheller', cat:'Farm & Agro', manufacturer:'FarmPower China', sourcedBy:'Discovery Engine -> Accepted by AfricanIES/QIMA (Platform earns 3%)'},
  '4': {name:'Glyphosate 360SL Herbicide 20L', cat:'Chemicals', manufacturer:'ChemChina', sourcedBy:'External China Agent (3% to external)'},
  '5': {name:'NPK 20-10-10 Fertilizer 50kg', cat:'Chemicals', manufacturer:'ChemChina', sourcedBy:'AfricanIES all-in (charges all-in, no extra 3%)'},
  '6': {name:'Caustic Soda Flakes 25kg', cat:'Chemicals', manufacturer:'ChemIndustrial', sourcedBy:'External China Agent (3% to external)'},
  '9': {name:'Cutlass + Shovel Set', cat:'Hand Tools', manufacturer:'ToolMaster', sourcedBy:'AfricanIES all-in (charges all-in, no extra 3%)'},
  '10': {name:'Solar Welding Machine 200A', cat:'Hand Tools', manufacturer:'WeldSolar', sourcedBy:'Discovery Engine -> Accepted by AfricanIES/QIMA (Platform earns 3%)'},
}

export default function ProductPage({params}:{params:{id:string}}){
  const p = PRODUCTS[params.id] || {name:'Product '+params.id, cat:'Farm & Agro', manufacturer:'Unknown', sourcedBy:'Discovery Engine -> Accepted by AfricanIES/QIMA (Platform earns 3%)'}
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
    else { const saved = localStorage.getItem('nicham_affiliate'); if(saved) setAffCode(saved) }
  },[])

  const requestQuote=()=>{
    if(!phone||!state){alert('Phone + State required');return}
    if(!visitFeePaid){alert('Please pay N10,000 factory visit fee to AfricanIES first (deductible)');return}
    const rfqId='RFQ'+Date.now().toString().slice(-6)
    const isFactoryVisited = localStorage.getItem(`factory_visited_${p.manufacturer}`) === 'true'
    const isDiscovery = p.sourcedBy.includes('Discovery')

    const rfq={id:rfqId, productId:params.id, productName:p.name, qty, state, warehouse, phone, agentCode, affiliateCode:affCode, includeCustoms, includeDelivery, visitFeePaid:10000, status:'Quote Requested', date:new Date().toLocaleString()}
    const rfqs=JSON.parse(localStorage.getItem('nicham_rfqs')||'[]')
    rfqs.unshift(rfq)
    localStorage.setItem('nicham_rfqs',JSON.stringify(rfqs))
    localStorage.setItem(`factory_visited_${p.manufacturer}`,'true')

    let africanMsg = `NEW RFQ ${rfqId}: ${p.name} x${qty} to ${state}, Warehouse: ${warehouse}. Phone ${phone}.%0A%0AQUOTE NEEDED:%0A`
    if(!isFactoryVisited) africanMsg += `- Factory Visit N10k (except if previously done) to ${p.manufacturer} - FIRST VISIT%0A`
    else africanMsg += `- Factory Visit: Previously done (skip fee)%0A`
    if(!isDiscovery) africanMsg += `- Sourcing Fee (except done through discovery engine) - ${p.sourcedBy}%0A`
    else africanMsg += `- Sourcing: Discovery Engine -> Platform earns 3% (no external)%0A`
    africanMsg += `- Logistics: Shipping + Customs ${includeCustoms?'INCLUDED':'EXCLUDED'} + Delivery ${includeDelivery?'INCLUDED':'EXCLUDED'} to ${warehouse}, ${state}%0A`
    africanMsg += `- Visit Fee N10k deductible from shipping%0A%0AAffiliate:${affCode||'None'} 1% from platform 5%, Field:${agentCode||'None'} 2% from platform 5%`

    const qimaMsg = `NEW PSI REQUEST ${rfqId}: ${p.name} from ${p.manufacturer} x${qty}. Factory ${p.manufacturer}. QIMA to quote for Pre-Shipment Inspection PSI. Customer ${phone}, ${state}.%0A5 Proofs Gate required: EU Cert, License, Video, Test, Export`

    window.open(`https://wa.me/2348012345678?text=${africanMsg}`,'_blank')
    setTimeout(()=> window.open(`https://wa.me/2348098765432?text=${qimaMsg}`,'_blank'), 1200)
    alert(`RFQ ${rfqId} created! Sent to AfricanIES (Factory visit ${isFactoryVisited?'Previously done':'N10k first time'} + Sourcing + Logistics + Customs + Delivery) + QIMA (PSI quote). Affiliate ${affCode||'None'}, Field ${agentCode||'None'}`)
  }

  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b sticky top-0 z-10"><div className="max-w-4xl mx-auto px-4 py-3 flex justify-between"><Link href="/" className="text-xs border px-4 py-2 rounded-full font-bold">← Marketplace</Link><Link href="/orders" className="text-xs bg-black text-white px-4 py-2 rounded-full font-bold">Orders/RFQs</Link></div></header>
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-2xl p-6 border"><div className="w-full h-40 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl flex items-center justify-center text-4xl font-black text-green-800">RFQ</div><div className="mt-4 text-xs bg-gray-50 rounded-xl p-3"><div className="font-bold">Dual WhatsApp Routing:</div><div className="mt-2 text- space-y-1"><div>• AfricanIES: Factory visit (except if previously done) + Sourcing (except discovery) + Logistics + Customs + Delivery</div><div>• QIMA: PSI quote only — No API needed yet, WhatsApp MVP</div></div></div></div>
          <div className="bg-white rounded-2xl p-5 border"><div className="font-black text-xl">{p.name}</div><div className="text-xs text-gray-500 mt-1">{p.cat} • {p.manufacturer} • {p.sourcedBy}</div><div className="mt-4 space-y-2"><div className="flex gap-2"><input type="number" value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="w-1/2 border rounded-xl px-3 py-2 text-sm" placeholder="Qty"/><input value={phone} onChange={e=>setPhone(e.target.value)} className="w-1/2 border rounded-xl px-3 py-2 text-sm" placeholder="Phone *"/></div><input value={state} onChange={e=>setState(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="State * (e.g. Niger, Lagos)"/><input value={warehouse} onChange={e=>setWarehouse(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm" placeholder="Warehouse address"/><div className="border rounded-xl p-3 bg-yellow-50 text-xs"><label className="flex gap-2"><input type="checkbox" checked={includeCustoms} onChange={e=>setIncludeCustoms(e.target.checked)}/> Include Customs (default)</label><label className="flex gap-2 mt-1"><input type="checkbox" checked={includeDelivery} onChange={e=>setIncludeDelivery(e.target.checked)}/> Include Delivery to warehouse (default)</label></div><div className="border rounded-xl p-3 text-xs"><input value={agentCode} onChange={e=>setAgentCode(e.target.value)} placeholder="Field Agent Code AGENT-4567 (optional, 2% from platform 5%)" className="w-full border rounded-lg px-3 py-2 text-xs"/><input value={affCode} onChange={e=>setAffCode(e.target.value)} placeholder="Affiliate Code AFF123 (auto from?ref=, 1% from 5%)" className="w-full border rounded-lg px-3 py-2 text-xs mt-2"/></div><div className="border rounded-xl p-3 bg-green-50 text-xs">Factory Visit Fee: N10,000 per item type to AfricanIES (deductible)<label className="flex gap-2 mt-2 font-bold"><input type="checkbox" checked={visitFeePaid} onChange={e=>setVisitFeePaid(e.target.checked)}/> I paid/will pay N10k (required)</label></div></div><button onClick={requestQuote} className="mt-4 w-full bg-green-700 text-white py-3 rounded-full font-bold text-sm hover:bg-black">Request for Quote via WhatsApp (Dual: AfricanIES + QIMA)</button></div>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams(){
  return [{id:'1'},{id:'2'},{id:'4'},{id:'5'},{id:'6'},{id:'9'},{id:'10'}]
}
