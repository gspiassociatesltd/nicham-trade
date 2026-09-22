"use client"
import { useState } from 'react'

export default function Admin(){
  const [form,setForm]=useState({
    name:'', category:'Farm & Agro', manufacturer:'',
    sourcedBy:'Discovery Engine -> Accepted by AfricanIES/QIMA (Platform earns 3%)',
    factoryPrice:0, shipping:0, customs:0, delivery:0, visitFee:10000, qima:0,
    affiliateCode:'', fieldAgentCode:'', sourcingAgentCode:'', status:'Discovery'
  })

  const calc = (f:number,s:number,c:number,d:number,vf:number,q:number,sb:string,aff:string,field:string)=>{
    const total = s + c + d
    const net = Math.max(0, total - vf/1600)
    const base = f + net + q
    const app = base * 1.10
    const platNet = 0.05 - (aff?0.01:0) - (field?0.02:0)
    const isDisc = sb.includes('Discovery')
    const isExt = sb.includes('External')
    const isAllIn = sb.includes('AfricanIES') || sb.includes('Betterluck')
    let sourcingEarn = ''
    if(isDisc) sourcingEarn = 'Platform earns 3% (Discovery Engine -> Accepted by AfricanIES/QIMA)'
    else if(isExt) sourcingEarn = `External ${form.sourcingAgentCode||'Agent'} earns 3% (not AfricanIES/Betterluck, their charges all-in)`
    else if(isAllIn) sourcingEarn = 'No extra 3% (AfricanIES/Betterluck all-in, charges all-in)'
    return {total, net, base, app, platNet, sourcingEarn}
  }

  const c = calc(form.factoryPrice,form.shipping,form.customs,form.delivery,form.visitFee,form.qima,form.sourcedBy,form.affiliateCode,form.fieldAgentCode)

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border rounded-xl p-3 flex justify-between items-center">
          <div><h1 className="font-black text-sm">Admin Vault V114 — RFQ Tracking</h1><p className="text-xs opacity-60">How Nicham knows: Affiliate?ref= -> localStorage, Field Agent Code field, SourcedBy dropdown</p></div>
          <a href="/" className="text-xs border px-3 py-1 rounded">Marketplace</a>
        </div>

        <div className="bg-white border rounded-xl p-3 mt-3">
          <h2 className="font-bold text-sm">Add Product — V114 Tracking</h2>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Product Name * (from Discovery Engine)" className="border rounded px-2 py-1.5 col-span-2 text-sm"/>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="border rounded px-2 py-1.5 text-sm"><option>Farm & Agro</option><option>Home & Kitchen</option><option>Industrial Chemicals</option><option>Hand Tools</option></select>
            <input value={form.manufacturer} onChange={e=>setForm({...form,manufacturer:e.target.value})} placeholder="Manufacturer * (from Discovery)" className="border rounded px-2 py-1.5 text-sm"/>
            <select value={form.sourcedBy} onChange={e=>setForm({...form,sourcedBy:e.target.value})} className="border rounded px-2 py-1.5 col-span-2 text-sm">
              <option>Discovery Engine -> Accepted by AfricanIES/QIMA (Platform earns 3%)</option>
              <option>AfricanIES all-in (charges all-in, no extra 3%)</option>
              <option>Betterluck all-in (charges all-in, no extra 3%)</option>
              <option>External China Agent (3% to external, not AfricanIES/Betterluck)</option>
              <option>External America Agent (3% to external)</option>
            </select>
            <input type="number" value={form.factoryPrice} onChange={e=>setForm({...form,factoryPrice:parseFloat(e.target.value)||0})} placeholder="Factory Price USD (from AfricanIES quote)" className="border rounded px-2 py-1.5 text-sm"/>
            <input type="number" value={form.shipping} onChange={e=>setForm({...form,shipping:parseFloat(e.target.value)||0})} placeholder="AfricanIES Shipping USD" className="border rounded px-2 py-1.5 text-sm"/>
            <input type="number" value={form.customs} onChange={e=>setForm({...form,customs:parseFloat(e.target.value)||0})} placeholder="AfricanIES Customs USD (must be part)" className="border rounded px-2 py-1.5 text-sm"/>
            <input type="number" value={form.delivery} onChange={e=>setForm({...form,delivery:parseFloat(e.target.value)||0})} placeholder="AfricanIES Delivery to warehouse USD (must be part)" className="border rounded px-2 py-1.5 text-sm"/>
            <input type="number" value={form.visitFee} onChange={e=>setForm({...form,visitFee:parseFloat(e.target.value)||0})} placeholder="Factory Visit Fee Naira (10000 per item type, deductible)" className="border rounded px-2 py-1.5 text-sm"/>
            <input type="number" value={form.qima} onChange={e=>setForm({...form,qima:parseFloat(e.target.value)||0})} placeholder="QIMA PSI Cost USD (via WhatsApp)" className="border rounded px-2 py-1.5 text-sm"/>
            <input value={form.affiliateCode} onChange={e=>setForm({...form,affiliateCode:e.target.value})} placeholder="Affiliate Code (from?ref=, 1% perpetual from platform 5%)" className="border rounded px-2 py-1.5 text-sm"/>
            <input value={form.fieldAgentCode} onChange={e=>setForm({...form,fieldAgentCode:e.target.value})} placeholder="Field Agent Code (from RFQ form, 2% from platform 5%)" className="border rounded px-2 py-1.5 text-sm"/>
            <input value={form.sourcingAgentCode} onChange={e=>setForm({...form,sourcingAgentCode:e.target.value})} placeholder="Sourcing Agent Code (if external China/America, 3%)" className="border rounded px-2 py-1.5 text-sm col-span-2"/>
          </div>

          <div className="mt-3 text-xs bg-gray-50 p-3 rounded">
            <div>AfricanIES Total: ${c.total} (Ship ${form.shipping}+Customs ${form.customs}+Delivery ${form.delivery}) — Must include Customs+Delivery by default</div>
            <div>Less Visit Fee: N{form.visitFee} = ${(form.visitFee/1600).toFixed(2)} deductible → Net AfricanIES: ${c.net.toFixed(2)}</div>
            <div>Base = Factory ${form.factoryPrice} + AfricanIES Net ${c.net.toFixed(2)} + QIMA ${form.qima} = ${c.base.toFixed(2)}</div>
            <div className="font-bold">App Price = Base ${c.base.toFixed(2)} * 1.10 (10% total) = ${c.app.toFixed(2)}</div>
            <div className="mt-2 font-bold">Breakdown (Always 10% total to buyer — affiliate/field deducted from platform 5%, not extra):</div>
            <div>• Platform Gross 5% → Net {(c.platNet*100).toFixed(0)}% after deducting Affiliate {form.affiliateCode?'1%':''} Field {form.fieldAgentCode?'2%':''} from 5%</div>
            <div>• Affiliate: {form.affiliateCode?`${form.affiliateCode} 1% perpetual from platform 5% (Platform net ${(c.platNet*100).toFixed(0)}%)`:'None → Platform keeps full 5%'}</div>
            <div>• Field Agent: {form.fieldAgentCode?`${form.fieldAgentCode} 2% per order from platform 5% (Platform net ${(c.platNet*100).toFixed(0)}%)`:'None → Platform keeps full 5%'}</div>
            <div>• Sourcing Agent 3%: {c.sourcingEarn}</div>
            <div>• Escrow 1% + Insurance 1%</div>
            <div>• Total: 10% always — affiliate 1% + field 2% removed from platform 5%, not charged differently to buyer</div>
          </div>
        </div>
      </div>
    </div>
  )
}
