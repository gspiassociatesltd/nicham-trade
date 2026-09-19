"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type ProductDraft = {
  id?: string
  name_en: string
  category: string
  manufacturer: string
  sourced_by: string
  factory_price_usd: number
  eu_cert_link: string
  business_license_link: string
  factory_video_link: string
  test_report_link: string
  export_history_link: string
  logistics_status: string
  logistics_reason: string
  guarantor: boolean
  qima_audit: string
  qima_psi: string
  description_en: string
  moq: number
  stock: number
  status: string
}

const empty: ProductDraft = {
  name_en: "",
  category: "Solar Inverter",
  manufacturer: "",
  sourced_by: "AfricanIES",
  factory_price_usd: 1000,
  eu_cert_link: "",
  business_license_link: "",
  factory_video_link: "",
  test_report_link: "",
  export_history_link: "",
  logistics_status: "Pending",
  logistics_reason: "",
  guarantor: true,
  qima_audit: "Pending",
  qima_psi: "Pending",
  description_en: "",
  moq: 1,
  stock: 100,
  status: "Draft"
}

export default function Admin(){
  const [draft, setDraft] = useState<ProductDraft>(empty)
  const [products, setProducts] = useState<any[]>([])
  const [checks, setChecks] = useState({eu:false, biz:false, video:false, test:false, export:false})

  useEffect(()=>{
    // load from supabase
    supabase.from('products').select('*').order('created_at',{ascending:false}).limit(50).then(({data})=> setProducts(data||[]))
    const saved = localStorage.getItem('nicham_drafts')
    if(saved){ try{ setProducts(JSON.parse(saved)) }catch{} }
  },[])

  const allChecked = checks.eu && checks.biz && checks.video && checks.test && checks.export
  const factory = draft.factory_price_usd || 0
  const logisticsPool = factory * 0.15
  const platformFee = factory * 0.05
  const sourcingFee = factory * 0.03
  const insuranceFee = factory * 0.01
  const appPrice = factory + logisticsPool + platformFee + sourcingFee + insuranceFee

  const canApprove = allChecked && draft.logistics_status.includes('Approved')
  const isBlacklisted = (draft as any).rating !== undefined && (draft as any).rating < 2

  const addProduct = async ()=>{
    if(!draft.name_en || !draft.manufacturer){
      alert('Add product name + manufacturer')
      return
    }
    if(!canApprove && draft.status === 'Approved'){
      alert('Cannot approve: Need 5 proofs + Logistics Approved by AfricanIES')
      return
    }
    const newProd = {
      id: Date.now().toString(),
      ...draft,
      name_en: draft.name_en,
      price_usd: factory,
      price_ngn_sea: Math.round(appPrice * 1500),
      price_ngn_air: Math.round(appPrice * 1.2 * 1500),
      app_price_usd: appPrice,
      logistics_pool: logisticsPool,
      checks,
      rating: 3.0,
      created_at: new Date().toISOString(),
      status: draft.status
    }
    const updated = [newProd, ...products]
    setProducts(updated)
    localStorage.setItem('nicham_drafts', JSON.stringify(updated))
    // Try supabase insert (if table exists)
    try{
      await supabase.from('products').insert({
        name_en: draft.name_en,
        category: draft.category,
        description_en: draft.description_en,
        price_usd: factory,
        manufacturer: draft.manufacturer,
        status: draft.status === 'Approved' ? 'approved' : 'draft',
        price_ngn_sea: newProd.price_ngn_sea,
        price_ngn_air: newProd.price_ngn_air
      })
    }catch(e){ console.log('supabase insert skipped', e) }
    alert(`Product added: ${draft.name_en} - App Price $${appPrice.toFixed(2)} inclusive (Factory $${factory} + Logistics 15% $${logisticsPool} + Platform 5% $${platformFee} + Sourcing 3% $${sourcingFee} + Insurance 1% $${insuranceFee})`)
    setDraft(empty)
    setChecks({eu:false,biz:false,video:false,test:false,export:false})
  }

  return <div className="max-w-7xl mx-auto p-4">
    <header className="flex justify-between items-center border-b pb-3 mb-4">
      <div>
        <h1 className="text-2xl font-black">NiChAm Admin Vault — V103</h1>
        <p className="text-xs opacity-70">Add Products | 5 Proofs Gate | Logistics Guarantor | AfricanIES ₦10k sourcing + 5% procurement</p>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>{
          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
          const a = document.createElement('a'); a.href = dataStr; a.download = 'nicham_products_export.json'; a.click();
        }} className="px-3 py-2 border rounded-lg text-sm">Export JSON for Vercel</button>
        <a href="/" className="px-3 py-2 bg-black text-white rounded-lg text-sm">View Marketplace</a>
      </div>
    </header>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 border rounded-xl p-4 bg-white">
        <h2 className="font-bold mb-3">Add / Edit Product</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <input value={draft.name_en} onChange={e=>setDraft({...draft, name_en: e.target.value})} placeholder="Product Name e.g., Deye 5kW Hybrid Inverter" className="border rounded-lg px-3 py-2 col-span-2"/>
          <select value={draft.category} onChange={e=>setDraft({...draft, category: e.target.value})} className="border rounded-lg px-3 py-2">
            <option>Solar Inverter</option><option>Solar Panel</option><option>Battery</option><option>Agro Chemicals</option><option>Industrial Chemicals</option><option>Charge Controller</option>
          </select>
          <input value={draft.manufacturer} onChange={e=>setDraft({...draft, manufacturer: e.target.value})} placeholder="Manufacturer e.g., Deye Solar" className="border rounded-lg px-3 py-2"/>
          <select value={draft.sourced_by} onChange={e=>setDraft({...draft, sourced_by: e.target.value})} className="border rounded-lg px-3 py-2">
            <option>AfricanIES</option><option>Betterluck</option><option>External - Buyer Sourced</option><option>External - You Sourced</option>
          </select>
          <input type="number" value={draft.factory_price_usd} onChange={e=>setDraft({...draft, factory_price_usd: parseFloat(e.target.value)||0})} placeholder="Factory Price USD" className="border rounded-lg px-3 py-2"/>
          <input value={draft.moq} type="number" onChange={e=>setDraft({...draft, moq: parseInt(e.target.value)||1})} placeholder="MOQ" className="border rounded-lg px-3 py-2"/>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-sm">Background Check Gate — 5 Mandatory Proofs (MTN Requirement)</h3>
          <p className="text-xs opacity-70 mb-2">All 5 must be checked + Logistics Approved before you can set status Approved</p>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <label className="flex gap-2 items-center"><input type="checkbox" checked={checks.eu} onChange={e=>setChecks({...checks, eu: e.target.checked})}/> EU/US Cert (CE/UL/IEC/ISO/EPA) + TUV verification link</label>
            <input value={draft.eu_cert_link} onChange={e=>setDraft({...draft, eu_cert_link: e.target.value})} placeholder="Paste TUV/UL verification link e.g., https://www.tuv.com/..." className="border rounded-lg px-3 py-1.5 text-xs"/>
            
            <label className="flex gap-2 items-center"><input type="checkbox" checked={checks.biz} onChange={e=>setChecks({...checks, biz: e.target.checked})}/> Business License (China + USA if available)</label>
            <input value={draft.business_license_link} onChange={e=>setDraft({...draft, business_license_link: e.target.value})} placeholder="Link to license doc" className="border rounded-lg px-3 py-1.5 text-xs"/>

            <label className="flex gap-2 items-center"><input type="checkbox" checked={checks.video} onChange={e=>setChecks({...checks, video: e.target.checked})}/> Factory Photos/Video + Company Visit Report</label>
            <input value={draft.factory_video_link} onChange={e=>setDraft({...draft, factory_video_link: e.target.value})} placeholder="Video link" className="border rounded-lg px-3 py-1.5 text-xs"/>

            <label className="flex gap-2 items-center"><input type="checkbox" checked={checks.test} onChange={e=>setChecks({...checks, test: e.target.checked})}/> Sample Test Report</label>
            <input value={draft.test_report_link} onChange={e=>setDraft({...draft, test_report_link: e.target.value})} placeholder="Test report link" className="border rounded-lg px-3 py-1.5 text-xs"/>

            <label className="flex gap-2 items-center"><input type="checkbox" checked={checks.export} onChange={e=>setChecks({...checks, export: e.target.checked})}/> Export History Proof (past shipments to USA/EU)</label>
            <input value={draft.export_history_link} onChange={e=>setDraft({...draft, export_history_link: e.target.value})} placeholder="Export history proof" className="border rounded-lg px-3 py-1.5 text-xs"/>
          </div>
          <div className="mt-2 text-xs font-bold">Gate: {Object.values(checks).filter(Boolean).length}/5 {allChecked ? '✅ Ready' : '❌ Not ready'}</div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-bold text-sm">Logistics Guarantor — AfricanIES ₦10k Sourcing + 5% Procurement</h3>
          <select value={draft.logistics_status} onChange={e=>setDraft({...draft, logistics_status: e.target.value})} className="border rounded-lg px-3 py-2 w-full mt-2 text-sm">
            <option>Pending</option>
            <option>Approved by AfricanIES — Guarantor YES — bears failed inspection</option>
            <option>Rejected by AfricanIES — App must reject</option>
            <option>Approved by Betterluck — Shipping only, no guarantor</option>
            <option>Rejected by Betterluck</option>
          </select>
          <input value={draft.logistics_reason} onChange={e=>setDraft({...draft, logistics_reason: e.target.value})} placeholder="Reason if rejected (e.g., No ISO, fake CE)" className="border rounded-lg px-3 py-2 w-full mt-2 text-sm"/>
          <label className="flex gap-2 items-center mt-2 text-sm"><input type="checkbox" checked={draft.guarantor} onChange={e=>setDraft({...draft, guarantor: e.target.checked})}/> AfricanIES bears failed inspection cost from pool (auto if AfricanIES approved)</label>
          {draft.logistics_status.includes('Rejected') && <div className="mt-2 text-xs text-red-600 font-bold">⚠️ App will auto-hide this product (per your rule: if logistics rejects, app rejects)</div>}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="border rounded-lg p-2">
            <label className="text-xs">QIMA Supplier Audit (one-time per factory $500)</label>
            <select value={draft.qima_audit} onChange={e=>setDraft({...draft, qima_audit: e.target.value})} className="border rounded-lg px-2 py-1 w-full text-sm">
              <option>Pending</option><option>Pass</option><option>Fail</option>
            </select>
          </div>
          <div className="border rounded-lg p-2">
            <label className="text-xs">QIMA PSI per shipment $350</label>
            <select value={draft.qima_psi} onChange={e=>setDraft({...draft, qima_psi: e.target.value})} className="border rounded-lg px-2 py-1 w-full text-sm">
              <option>Pending</option><option>Pass</option><option>Fail — AfricanIES bears cost</option>
            </select>
          </div>
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <h3 className="font-bold text-sm">Built-in Pricing (Buyer sees 1 price)</h3>
          <div className="text-xs mt-1">
            Factory: ${factory} <br/>
            + Logistics Pool 15% (AfricanIES ₦10k sourcing + 5% procurement + shipping/clearing/delivery): ${logisticsPool.toFixed(2)} <br/>
            + Platform 5%: ${platformFee.toFixed(2)} <br/>
            + Sourcing 3%: ${sourcingFee.toFixed(2)} <br/>
            + Insurance 1% (goods + MoMo escrow): ${insuranceFee.toFixed(2)} <br/>
            <div className="font-black text-sm mt-1">App Price Inclusive: ${appPrice.toFixed(2)} = ₦{(appPrice*1500).toLocaleString()}</div>
          </div>
        </div>

        <textarea value={draft.description_en} onChange={e=>setDraft({...draft, description_en: e.target.value})} placeholder="Description" className="border rounded-lg px-3 py-2 w-full mt-4 h-20 text-sm"/>

        <div className="mt-4 flex gap-2">
          <select value={draft.status} onChange={e=>setDraft({...draft, status: e.target.value})} className="border rounded-lg px-3 py-2 text-sm">
            <option>Draft</option><option>Pending Logistics Approval</option><option>Approved</option><option>Rejected</option><option>Blacklisted</option>
          </select>
          <button onClick={addProduct} className={`px-4 py-2 rounded-lg text-sm font-bold ${canApprove || draft.status !== 'Approved' ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Add Product to Vault</button>
        </div>
        {!canApprove && draft.status === 'Approved' && <p className="text-xs text-red-600 mt-2">Cannot approve: Need 5 proofs checked + Logistics Approved by AfricanIES</p>}
      </div>

      <div className="border rounded-xl p-4 bg-white h-fit">
        <h3 className="font-bold">Vault ({products.length})</h3>
        <div className="mt-3 space-y-2 max-h-[800px] overflow-auto">
          {products.map((p,i)=><div key={i} className={`border rounded-lg p-2 text-xs ${p.status==='Blacklisted' || p.status==='Rejected' ? 'bg-red-50 border-red-200' : p.status==='Approved' ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
            <div className="font-bold">{p.name_en}</div>
            <div>{p.manufacturer} — {p.category}</div>
            <div>Factory ${p.factory_price_usd} → App ${p.app_price_usd?.toFixed(2)} inclusive</div>
            <div>Sourced By: {p.sourced_by} | Logistics: {p.logistics_status}</div>
            <div>QIMA Audit: {p.qima_audit} | PSI: {p.qima_psi}</div>
            <div>Status: <span className="font-bold">{p.status}</span> {p.status==='Blacklisted' && '— Hidden from app'}</div>
            <div className="mt-1 flex gap-1">
              <button onClick={()=>{setDraft(p); setChecks(p.checks||checks)}} className="px-2 py-1 border rounded text-[10px]">Edit</button>
              <button onClick={()=>{
                const upd = products.filter((_,idx)=>idx!==i)
                setProducts(upd)
                localStorage.setItem('nicham_drafts', JSON.stringify(upd))
              }} className="px-2 py-1 border rounded text-[10px]">Delete</button>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  </div>
}
