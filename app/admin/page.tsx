"use client"
import { useState, useEffect } from 'react'

type Product = { id:string; name:string; category:string; manufacturer:string; status:string; source:string }

export default function Admin(){
  const [products,setProducts]=useState<Product[]>([])
  const [sourcedBy,setSourcedBy]=useState('Discovery Engine → Accepted by AfricanIES/QIMA (Platform earns 3%)')
  const [sourcedByApp,setSourcedByApp]=useState(true)
  const [buyerByApp,setBuyerByApp]=useState(true)
  const [affiliateInvolved,setAffiliateInvolved]=useState(false)
  const [affiliateCode,setAffiliateCode]=useState('')
  const [fieldAgentInvolved,setFieldAgentInvolved]=useState(false)
  const [fieldAgentCode,setFieldAgentCode]=useState('')
  const [factoryVisitDone,setFactoryVisitDone]=useState(false)
  // Placeholders for Post-MVP — 0% in MVP
  const [escrowEnabled,setEscrowEnabled]=useState(false) // Placeholder: false MVP, true post-MVP with MTN MoMo license
  const [insuranceEnabled,setInsuranceEnabled]=useState(false) // Placeholder: false MVP, true post-MVP with MTN
  const [factoryPrice,setFactoryPrice]=useState('1000')
  const [shipping,setShipping]=useState('300')
  const [customs,setCustoms]=useState('200')
  const [delivery,setDelivery]=useState('50')
  const [qimaCost,setQimaCost]=useState('20')
  const [qty,setQty]=useState('1')
  const [localPrice,setLocalPrice]=useState('')
  const [finalCalc,setFinalCalc]=useState<any>(null)

  useEffect(()=>{
    const saved=localStorage.getItem('nicham_v103_products'); if(saved) try{ setProducts(JSON.parse(saved)) }catch{}
    // Read placeholders from env if set
    if(typeof window!=='undefined'){
      // @ts-ignore
      const esc = (window as any).NEXT_PUBLIC_ENABLE_ESCROW; const ins = (window as any).NEXT_PUBLIC_ENABLE_INSURANCE;
      // For MVP, env false — placeholders 0%
    }
  },[])

  const calculateFinal=()=>{
    const f=parseFloat(factoryPrice)||0; const s=parseFloat(shipping)||0; const c=parseFloat(customs)||0; const d=parseFloat(delivery)||0; const q=parseFloat(qimaCost)||0; const qTy=parseFloat(qty)||1
    const productCost=f*qTy; const transport=s+c+d; const ratio=transport/productCost
    let economyAdvice=''; let makesSense=true; let minQty=1
    if(productCost>0 && transport>productCost){ makesSense=false; minQty=Math.ceil(50000/f); economyAdvice=`⚠️ Too small: Product $${productCost} < Transport $${transport}. Advise MOQ ${minQty} units.` }
    else if(ratio>0.3){ makesSense=false; economyAdvice=`⚠️ Transport ${Math.round(ratio*100)}% of product — advise MOQ.` }
    else { economyAdvice=`✅ Economical: Transport ${Math.round(ratio*100)}%` }

    const visitFee = factoryVisitDone?0:10000/1500
    const africanIESNet = s+c+d+visitFee
    const base = f*qTy + q
    const landed = base + africanIESNet
    let sourcingFee=0; let sourcingTo='';
    if(sourcedBy.includes('Discovery')){ sourcingFee=landed*0.03; sourcingTo='Platform (Discovery Engine)'; }
    else if(sourcedBy.includes('External')){ sourcingFee=landed*0.03; sourcingTo=sourcedBy; }
    else { sourcingFee=0; sourcingTo='All-in (no extra 3%)' }
    const platform5=landed*0.05; const affiliate1=affiliateInvolved?landed*0.01:0; const field2=fieldAgentInvolved?landed*0.02:0; const platformNet=platform5-affiliate1-field2
    // PLACEHOLDERS — 0% MVP, 1% post-MVP with MTN MoMo license
    const escrow = escrowEnabled? landed*0.01 : 0 // Placeholder: Escrow 1% post-MVP
    const insurance = insuranceEnabled? landed*0.01 : 0 // Placeholder: Insurance 1% post-MVP MTN
    const appPrice=landed+platform5+sourcingFee+escrow+insurance

    const local=parseFloat(localPrice)||0; let competitiveness=''; if(local>0){ const diff=((appPrice-local)/local)*100; competitiveness=appPrice<local?`✅ ${Math.abs(diff).toFixed(1)}% CHEAPER than local`:`⚠️ ${diff.toFixed(1)}% MORE than local` }

    setFinalCalc({
      productCost, transport, ratio:(ratio*100).toFixed(1)+'%', economyAdvice, makesSense, minQty,
      base, landed, appPrice, visitFee, escrowEnabled, insuranceEnabled,
      breakdown:{ factory:f*qTy, africanIESNet, qima:q, platformNet, affiliate1, field2, sourcingFee, sourcingTo, escrow, insurance, platform5 },
      competitiveness, sourcedBy
    })
  }

  return <div className="min-h-screen bg-black p-4"><div className="max-w-6xl mx-auto">
    <div className="bg-white rounded- p-6 flex justify-between items-center">
      <div><h1 className="font-black">Admin Vault — MVP with Placeholders (Escrow + Insurance for Post-MVP)</h1><p className="text-xs text-gray-500 mt-1">MVP: No escrow holding (0%), No insurance (0%) — No license risk — Post-MVP: Flip flags to 1%+1% with MTN MoMo</p></div>
      <a href="/" className="bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold">Marketplace (No Admin Link)</a>
    </div>

    <div className="bg-yellow-50 border-2 border-yellow-400 rounded- p-5 mt-4">
      <h2 className="font-black text-sm">🔧 Placeholders for Post-MVP — Escrow + Insurance (0% Now, 1%+1% Later)</h2>
      <p className="text-xs mt-2"><b>Escrow 1% Placeholder:</b> In MVP, platform never holds fund — Buyer pays AfricanIES directly via Paystack split (Factory+Shipping+Customs+Delivery → AfricanIES wallet → AfricanIES pays manufacturer before pickup). No escrow license needed. Post-MVP with MTN MoMo license: Escrow 1% activates — Platform holds in MTN MoMo escrow wallet until delivery confirmed.</p>
      <p className="text-xs mt-2"><b>Insurance 1% Placeholder:</b> In MVP, 0% — MTN not yet part of platform. Post-MVP: Insurance 1% activates via MTN MoMo insurance product.</p>
      <p className="text-xs mt-2"><b>.env.local MVP:</b> NEXT_PUBLIC_ENABLE_ESCROW=false, NEXT_PUBLIC_ENABLE_INSURANCE=false → 0%+0% = 8% total (5% platform + 3% sourcing)</p>
      <p className="text-xs mt-2"><b>.env.local Post-MVP:</b> NEXT_PUBLIC_ENABLE_ESCROW=true, NEXT_PUBLIC_ENABLE_INSURANCE=true → 1%+1% = 10% total (5% + 3% + 1% + 1%) — No code rewrite, just flip flags.</p>
    </div>

    <div className="bg-white rounded- p-6 mt-4">
      <h2 className="font-black">Admin Checkboxes — Guide App Before Calculating Final Price + Placeholders</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-xs font-bold">Who Sourced?</label>
          {['Discovery Engine → Accepted by AfricanIES/QIMA (Platform earns 3%)','AfricanIES all-in (charges all-in, no extra 3%)','Betterluck all-in (charges all-in, no extra 3%)','External China Agent (3% to external)','External America Agent (3% to external)'].map(opt=><label key={opt} className="flex gap-2 text-xs mt-2"><input type="radio" name="sourcedBy" checked={sourcedBy===opt} onChange={()=>setSourcedBy(opt)} />{opt}</label>)}
        </div>
        <div className="space-y-3">
          <label className="flex gap-2 text-xs"><input type="checkbox" checked={sourcedByApp} onChange={e=>setSourcedByApp(e.target.checked)} /> Sourcing done by app? (Discovery?)</label>
          <label className="flex gap-2 text-xs"><input type="checkbox" checked={buyerByApp} onChange={e=>setBuyerByApp(e.target.checked)} /> Buyer discovered by app?</label>
          <label className="flex gap-2 text-xs"><input type="checkbox" checked={affiliateInvolved} onChange={e=>setAffiliateInvolved(e.target.checked)} /> Affiliate involved? 1% → <input value={affiliateCode} onChange={e=>setAffiliateCode(e.target.value)} placeholder="AFF123" className="border rounded px-2 py-1 text-xs w-20" /></label>
          <label className="flex gap-2 text-xs"><input type="checkbox" checked={fieldAgentInvolved} onChange={e=>setFieldAgentInvolved(e.target.checked)} /> Field agent involved? 2% → <input value={fieldAgentCode} onChange={e=>setFieldAgentCode(e.target.value)} placeholder="FIELD123" className="border rounded px-2 py-1 text-xs w-20" /></label>
          <label className="flex gap-2 text-xs"><input type="checkbox" checked={factoryVisitDone} onChange={e=>setFactoryVisitDone(e.target.checked)} /> Factory visit previously done? → Skip N10k if checked</label>
          <label className="flex gap-2 text-xs font-bold text-green-700"><input type="checkbox" checked={true} readOnly /> AfricanIES pays manufacturer before pickup (Always)</label>
          <div className="border-2 border-dashed border-yellow-400 rounded-xl p-3 mt-3 bg-yellow-50">
            <div className="font-bold text-xs">Placeholders for Post-MVP (0% Now, 1% Later — Flip Flags, No Rewrite)</div>
            <label className="flex gap-2 text-xs mt-2"><input type="checkbox" checked={escrowEnabled} onChange={e=>setEscrowEnabled(e.target.checked)} /> Escrow 1% Placeholder — MVP: OFF (0%, no holding, no license) — Post-MVP with MTN MoMo license: ON (1% — platform holds in escrow)</label>
            <label className="flex gap-2 text-xs mt-2"><input type="checkbox" checked={insuranceEnabled} onChange={e=>setInsuranceEnabled(e.target.checked)} /> Insurance 1% Placeholder — MVP: OFF (0%, MTN not yet) — Post-MVP: ON (1% — MTN MoMo insurance)</label>
            <p className="text- mt-2 text-gray-600">When MTN MoMo joins: Set NEXT_PUBLIC_ENABLE_ESCROW=true, NEXT_PUBLIC_ENABLE_INSURANCE=true in.env.local — Calculation auto adds 1%+1% — No code change.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3 mt-6">
        <input value={factoryPrice} onChange={e=>setFactoryPrice(e.target.value)} placeholder="Factory $1000" className="border rounded-xl px-3 py-2 text-sm" />
        <input value={shipping} onChange={e=>setShipping(e.target.value)} placeholder="Shipping $300" className="border rounded-xl px-3 py-2 text-sm" />
        <input value={customs} onChange={e=>setCustoms(e.target.value)} placeholder="Customs $200" className="border rounded-xl px-3 py-2 text-sm" />
        <input value={delivery} onChange={e=>setDelivery(e.target.value)} placeholder="Delivery $50" className="border rounded-xl px-3 py-2 text-sm" />
        <input value={qimaCost} onChange={e=>setQimaCost(e.target.value)} placeholder="QIMA PSI $20" className="border rounded-xl px-3 py-2 text-sm" />
        <input value={qty} onChange={e=>setQty(e.target.value)} placeholder="Qty 1" className="border rounded-xl px-3 py-2 text-sm" />
        <input value={localPrice} onChange={e=>setLocalPrice(e.target.value)} placeholder="Local verifiable ₦18000" className="border rounded-xl px-3 py-2 text-sm col-span-2" />
      </div>

      <button onClick={calculateFinal} className="w-full bg-black text-white rounded-full py-3 text-sm font-bold mt-4">Calculate Final Price (MVP 8% with Placeholders 0%, Post-MVP 10%) + Economy Check</button>

      {finalCalc && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl text-xs">
          <div className={`font-bold ${finalCalc.makesSense?'text-green-700':'text-red-600'}`}>{finalCalc.economyAdvice}</div>
          <div className="mt-3">Landed: ${finalCalc.landed.toFixed(2)} = Base (${finalCalc.base.toFixed(2)}) + AfricanIES Net</div>
          <div className="mt-2">App Price: ${finalCalc.landed.toFixed(2)} + Platform 5% (${finalCalc.breakdown.platform5.toFixed(2)}) + Sourcing 3% (${finalCalc.breakdown.sourcingFee.toFixed(2)} to {finalCalc.breakdown.sourcingTo}) + Escrow {finalCalc.escrowEnabled?'1%':'0% (Placeholder MVP OFF, Post-MVP ON)'} ${finalCalc.breakdown.escrow.toFixed(2)} + Insurance {finalCalc.insuranceEnabled?'1%':'0% (Placeholder MVP OFF, Post-MVP ON)'} ${finalCalc.breakdown.insurance.toFixed(2)} = <b>${finalCalc.appPrice.toFixed(2)}</b></div>
          <div className="mt-2 font-bold">{finalCalc.competitiveness}</div>
          <div className="mt-2 text- text-gray-500">MVP: {finalCalc.escrowEnabled?'Escrow 1% ON':'Escrow 0% OFF (no holding, no license)'} • {finalCalc.insuranceEnabled?'Insurance 1% ON':'Insurance 0% OFF (MTN not yet)'} • Post-MVP flip flags in.env.local to enable — no rewrite.</div>
        </div>
      )}
    </div>
  </div></div>
}
