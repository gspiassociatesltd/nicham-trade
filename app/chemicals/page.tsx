'use client'
import { useState, useEffect } from 'react'

const chemicals = [{"name": "Paracetamol Powder BP/USP", "cat": "Pharmaceuticals", "price": "$5.5/kg MOQ 500kg", "spec": "99% purity 25kg drum COA NAFDAC needed", "use": "Pharma factories", "img": "\ud83d\udc8a"}, {"name": "Crystallized Sorbitol", "cat": "Pharmaceuticals", "price": "$0.85/kg MOQ 1000kg", "spec": "Food grade 25kg bag", "use": "Pharma food toothpaste", "img": "\ud83c\udf6c"}, {"name": "Caustic Soda Flakes 99%", "cat": "Commodity", "price": "$420/ton MOQ 5 tons", "spec": "NaOH 99% 25kg bag Shandong China", "use": "Soap detergent textile", "img": "\ud83e\uddfc"}, {"name": "Hydrochloric Acid 31%", "cat": "Commodity", "price": "$180/ton MOQ 10 tons", "spec": "HCl 31% 30kg jerry can", "use": "Steel cleaning water", "img": "\ud83e\uddea"}, {"name": "Nitric Acid 68%", "cat": "Commodity", "price": "$380/ton MOQ 5 tons", "spec": "HNO3 68% 35kg can", "use": "Fertilizer etching", "img": "\u2697\ufe0f"}, {"name": "Stearic Acid Triple Pressed", "cat": "Commodity", "price": "$1100/ton MOQ 3 tons", "spec": "C18 25kg bag rubber grade", "use": "Rubber candle cosmetics", "img": "\ud83d\udd6f\ufe0f"}, {"name": "Acetic Acid Glacial 99.8%", "cat": "Commodity", "price": "$650/ton MOQ 5 tons", "spec": "CH3COOH 30kg drum", "use": "Textile vinegar", "img": "\ud83e\uddf4"}, {"name": "Hydrogen Peroxide 50%", "cat": "Commodity", "price": "$520/ton MOQ 5 tons", "spec": "H2O2 50% 30kg drum", "use": "Bleaching water treatment", "img": "\ud83d\udca7"}, {"name": "Natrosol 250 HHR (HEC)", "cat": "Paint", "price": "$3200/ton MOQ 1 ton", "spec": "HEC 25kg bag thickener", "use": "Paint building", "img": "\ud83c\udfa8"}, {"name": "Calcium Carbonate Powder", "cat": "Paint", "price": "$85/ton MOQ 20 tons", "spec": "CaCO3 98% 50kg bag 800-1250 mesh", "use": "Paint PVC paper", "img": "\ud83c\udff3\ufe0f"}, {"name": "Soda Ash Light", "cat": "Water Treatment", "price": "$280/ton MOQ 10 tons", "spec": "Na2CO3 99.2% 50kg bag", "use": "Water detergent glass", "img": "\ud83c\udf0a"}, {"name": "Calcium Hypochlorite 65-70%", "cat": "Water Treatment", "price": "$1450/ton MOQ 3 tons", "spec": "Ca(ClO)2 70% 45kg drum", "use": "Water treatment pools", "img": "\ud83c\udfca"}, {"name": "Poly Aluminum Chloride PAC 30%", "cat": "Water Treatment", "price": "$350/ton MOQ 10 tons", "spec": "PAC 30% Yellow White 25kg bag", "use": "Water coagulant high demand", "img": "\ud83d\udeb0"}, {"name": "Aluminum Sulphate 17%", "cat": "Water Treatment", "price": "$190/ton MOQ 15 tons", "spec": "Al2(SO4)3 17% 50kg bag", "use": "Water paper coagulant", "img": "\ud83e\uddeb"}, {"name": "Ferric Chloride 40% Liquid", "cat": "Water Treatment", "price": "$320/ton MOQ 10 tons", "spec": "FeCl3 40% liquid 30kg jerry can", "use": "Water etching coagulant", "img": "\ud83d\udd2c"}]

export default function ChemicalsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [ref, setRef] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const r = urlParams.get('ref') || ''
    if (r) setRef(r)
  }, [])

  const getWhatsAppLink = (chem: any) => {
    const myRef = ref || ''
    const text = `NiChAm-Trade Chemical RFQ: Product: ${chem.name} Spec: ${chem.spec} Price: ${chem.price} Ref: ${myRef} I want bulk. Send Proforma + SDS + COA.`
    const yourNumber = "2348031234567"
    return `https://wa.me/${yourNumber}?text=${encodeURIComponent(text)}`
  }

  const shareAgentLink = () => {
    const myCode = typeof window !== 'undefined' ? (localStorage.getItem('nicham_buyer_code') || 'NICHAM-BUYER-DEMO') : 'NICHAM-BUYER-DEMO'
    const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/chemicals?ref=${myCode}`
    const text = `NiChAm-Trade Industrial Chemicals - 15 Items China Sourcing: Caustic Soda $420/ton, Soda Ash $280/ton, PAC $350/ton, Hypochlorite $1450/ton, Paracetamol $5.5/kg, Natrosol $3200/ton etc Buy via my link: ${link} Perpetual commission on re-orders.`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const filtered = chemicals.filter((c:any) => {
    if (catFilter !== 'All' && c.cat !== catFilter) return false
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold">← NiChAm-Trade</a>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-5 mt-3">
        <h1 className="text-xl font-black">Industrial Chemicals - 15 Items - China Sourcing</h1>
        <div className="text-xs text-gray-600 mt-1">Pharma, Commodity, Paint, Water Treatment via AfricanIES + China Friend. Buyer Agent perpetual commission. {ref ? 'Ref: ' + ref : ''}</div>
        <div className="mt-3 bg-blue-50 border-2 border-blue-300 rounded-xl p-3">
          <div className="font-bold text-xs">Buyer Agent Perpetual: Share link /chemicals?ref=YOURCODE with bulk buyers. Earn 3-5% lifetime on re-orders.</div>
          <div className="mt-2 flex gap-2">
            <button onClick={shareAgentLink} className="px-4 py-2 bg-green-600 text-white rounded-full text-xs font-black">Share Chemicals WhatsApp with Perpetual Link</button>
            <a href="/industrial-agent" className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold">Join as Buyer Agent</a>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search paracetamol, caustic soda, PAC..." className="flex-1 px-4 py-2 rounded-full border-2 border-black text-sm" />
          <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} className="px-3 py-2 rounded-full border text-xs">
            <option value="All">All</option><option value="Pharmaceuticals">Pharmaceuticals</option><option value="Commodity">Commodity</option><option value="Paint">Paint</option><option value="Water Treatment">Water Treatment</option>
          </select>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {filtered.map((chem:any, i:number)=>(
            <div key={i} className="border-2 border-gray-200 rounded-xl p-3">
              <div className="flex gap-2"><div className="text-xl">{chem.img}</div><div className="font-black text-[12px]">{chem.name}</div></div>
              <div className="text-[10px] mt-1"><b>Spec:</b> {chem.spec}</div>
              <div className="text-[10px] mt-1"><b>Price:</b> <span className="font-black text-green-700">{chem.price}</span></div>
              <div className="text-[10px] mt-1"><b>Use:</b> {chem.use}</div>
              <a href={getWhatsAppLink(chem)} target="_blank" className="mt-2 block py-2 bg-blue-600 text-white rounded-full text-[11px] font-black text-center">Get Quote WhatsApp</a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
