"use client"
import { useState, useEffect } from 'react'

type Product = {
  id: string
  name: string
  category: string
  manufacturer: string
  sourcedBy: string
  factoryPrice: number
  appPrice: number
  euLink: string
  bizLink: string
  videoLink: string
  testLink: string
  exportLink: string
  logisticsStatus: string
  guarantor: boolean
  qimaAudit: string
  qimaPsi: string
  status: string
  proofs: {eu:boolean,biz:boolean,video:boolean,test:boolean,export:boolean}
  createdAt: string
}

export default function AdminVault(){
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState({
    name: '', category: 'Solar Inverter', manufacturer: '', sourcedBy: 'AfricanIES',
    factoryPrice: 1000, euLink:'', bizLink:'', videoLink:'', testLink:'', exportLink:'',
    logisticsStatus:'Pending', guarantor:true, qimaAudit:'Pending', qimaPsi:'Pending', status:'Draft'
  })
  const [proofs, setProofs] = useState({eu:false,biz:false,video:false,test:false,export:false})
  const [editingId, setEditingId] = useState<string|null>(null)

  useEffect(()=>{
    const saved = localStorage.getItem('nicham_v103_products')
    if(saved) try{ setProducts(JSON.parse(saved)) }catch{}
  },[])

  const save = (list: Product[])=>{
    setProducts(list)
    localStorage.setItem('nicham_v103_products', JSON.stringify(list))
  }

  const calcApp = (factory: number)=>{
    return factory + factory*0.15 + factory*0.05 + factory*0.03 + factory*0.01
  }

  const allProofs = Object.values(proofs).every(Boolean)
  const logisticsApproved = form.logisticsStatus.includes('Approved')
  const canApprove = allProofs && logisticsApproved

  const handleAdd = ()=>{
    if(!form.name || !form.manufacturer){ alert('Add Product Name + Manufacturer'); return }
    if(form.status==='Approved' && !canApprove){ alert('Cannot Approve: Need 5 proofs + Logistics Approved by AfricanIES'); return }
    const appPrice = calcApp(form.factoryPrice)
    const newProd: Product = {
      id: editingId || Date.now().toString(),
      name: form.name,
      category: form.category,
      manufacturer: form.manufacturer,
      sourcedBy: form.sourcedBy,
      factoryPrice: form.factoryPrice,
      appPrice,
      euLink: form.euLink, bizLink: form.bizLink, videoLink: form.videoLink, testLink: form.testLink, exportLink: form.exportLink,
      logisticsStatus: form.logisticsStatus,
      guarantor: form.guarantor,
      qimaAudit: form.qimaAudit,
      qimaPsi: form.qimaPsi,
      status: form.status,
      proofs: {...proofs},
      createdAt: new Date().toISOString()
    }
    let list
    if(editingId){
      list = products.map(p=> p.id===editingId ? newProd : p)
      setEditingId(null)
    }else{
      list = [newProd, ...products]
    }
    save(list)
    setForm({ name: '', category: 'Solar Inverter', manufacturer: '', sourcedBy: 'AfricanIES', factoryPrice: 1000, euLink:'', bizLink:'', videoLink:'', testLink:'', exportLink:'', logisticsStatus:'Pending', guarantor:true, qimaAudit:'Pending', qimaPsi:'Pending', status:'Draft' })
    setProofs({eu:false,biz:false,video:false,test:false,export:false})
    alert(editingId ? 'Product updated!' : `Added: ${newProd.name} - App $${appPrice.toFixed(2)} inclusive`)
  }

  const handleEdit = (p: Product)=>{
    setForm({
      name: p.name, category: p.category, manufacturer: p.manufacturer, sourcedBy: p.sourcedBy,
      factoryPrice: p.factoryPrice, euLink: p.euLink, bizLink: p.bizLink, videoLink: p.videoLink, testLink: p.testLink, exportLink: p.exportLink,
      logisticsStatus: p.logisticsStatus, guarantor: p.guarantor, qimaAudit: p.qimaAudit, qimaPsi: p.qimaPsi, status: p.status
    })
    setProofs(p.proofs)
    setEditingId(p.id)
    window.scrollTo({top:0, behavior:'smooth'})
  }

  const handleRemove = (id: string)=>{
    if(!confirm('Delete this product? It will be hidden from app')) return
    save(products.filter(p=>p.id!==id))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border rounded-xl p-4 flex flex-col md:flex-row justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black">NiChAm Admin Vault V103 - Add / Remove Products</h1>
            <p className="text-xs opacity-60">Factory + 15% logistics (AfricanIES ₦10k + 5% procurement + shipping) + 5% platform + 3% sourcing + 1% insurance = App Price inclusive</p>
            <p className="text-xs mt-1"><span className="bg-green-100 px-2 py-0.5 rounded">Total: {products.length} products</span> <span className="bg-yellow-100 px-2 py-0.5 rounded ml-2">{Object.values(proofs).filter(Boolean).length}/5 proofs</span> {canApprove ? <span className="bg-green-600 text-white px-2 py-0.5 rounded ml-2">Ready to Approve</span> : <span className="bg-red-100 px-2 py-0.5 rounded ml-2">Not ready</span>}</p>
          </div>
          <div className="flex gap-2">
            <a href="/" className="px-3 py-2 border rounded-lg text-sm">Marketplace</a>
            <button onClick={()=>{
              const blob = new Blob([JSON.stringify(products,null,2)], {type:'application/json'})
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a'); a.href=url; a.download='nicham-products.json'; a.click()
            }} className="px-3 py-2 bg-black text-white rounded-lg text-sm">Export JSON</button>
            <button onClick={()=>{ if(confirm('Clear ALL products?')) save([]) }} className="px-3 py-2 border border-red-300 text-red-600 rounded-lg text-sm">Clear All</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2 bg-white border rounded-xl p-4">
            <h2 className="font-bold">{editingId ? 'Editing Product' : 'Add New Product'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Product Name * e.g., Deye 5kW Hybrid" className="border rounded-lg px-3 py-2 col-span-2"/>
              <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="border rounded-lg px-3 py-2">
                <option>Solar Inverter</option><option>Solar Panel</option><option>Battery</option><option>Agro Chemicals</option><option>Industrial Chemicals</option><option>Charge Controller</option>
              </select>
              <input value={form.manufacturer} onChange={e=>setForm({...form, manufacturer:e.target.value})} placeholder="Manufacturer * e.g., Deye" className="border rounded-lg px-3 py-2"/>
              <select value={form.sourcedBy} onChange={e=>setForm({...form, sourcedBy:e.target.value})} className="border rounded-lg px-3 py-2">
                <option>AfricanIES</option><option>Betterluck</option><option>External - Buyer Sourced</option><option>You Sourced</option>
              </select>
              <input type="number" value={form.factoryPrice} onChange={e=>setForm({...form, factoryPrice: parseFloat(e.target.value)||0})} placeholder="Factory Price USD" className="border rounded-lg px-3 py-2"/>
              <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})} className="border rounded-lg px-3 py-2">
                <option>Draft</option><option>Pending Logistics Approval</option><option>Approved</option><option>Rejected</option><option>Blacklisted</option>
              </select>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
              <h3 className="font-bold text-sm">5 Proofs Gate (Required for Approval)</h3>
              <div className="space-y-2 mt-2">
                <label className="flex gap-2 text-sm"><input type="checkbox" checked={proofs.eu} onChange={e=>setProofs({...proofs, eu:e.target.checked})}/> EU/US Cert + TUV Link</label>
                <input value={form.euLink} onChange={e=>setForm({...form, euLink:e.target.value})} placeholder="https://..." className="w-full border rounded px-2 py-1 text-xs"/>
                <label className="flex gap-2 text-sm"><input type="checkbox" checked={proofs.biz} onChange={e=>setProofs({...proofs, biz:e.target.checked})}/> Business License</label>
                <input value={form.bizLink} onChange={e=>setForm({...form, bizLink:e.target.value})} placeholder="License link" className="w-full border rounded px-2 py-1 text-xs"/>
                <label className="flex gap-2 text-sm"><input type="checkbox" checked={proofs.video} onChange={e=>setProofs({...proofs, video:e.target.checked})}/> Factory Video / Company Visit</label>
                <input value={form.videoLink} onChange={e=>setForm({...form, videoLink:e.target.value})} placeholder="Video link" className="w-full border rounded px-2 py-1 text-xs"/>
                <label className="flex gap-2 text-sm"><input type="checkbox" checked={proofs.test} onChange={e=>setProofs({...proofs, test:e.target.checked})}/> Test Report</label>
                <input value={form.testLink} onChange={e=>setForm({...form, testLink:e.target.value})} placeholder="Test report link" className="w-full border rounded px-2 py-1 text-xs"/>
                <label className="flex gap-2 text-sm"><input type="checkbox" checked={proofs.export} onChange={e=>setProofs({...proofs, export:e.target.checked})}/> Export History</label>
                <input value={form.exportLink} onChange={e=>setForm({...form, exportLink:e.target.value})} placeholder="Export proof link" className="w-full border rounded px-2 py-1 text-xs"/>
              </div>
            </div>

            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-bold text-sm">Logistics — AfricanIES ₦10k Sourcing + 5% Procurement</h3>
              <select value={form.logisticsStatus} onChange={e=>setForm({...form, logisticsStatus:e.target.value})} className="w-full border rounded px-3 py-2 mt-2 text-sm">
                <option>Pending</option>
                <option>Approved by AfricanIES — Guarantor YES</option>
                <option>Rejected by AfricanIES — App rejects</option>
                <option>Approved by Betterluck</option>
                <option>Rejected by Betterluck</option>
              </select>
              <label className="flex gap-2 text-sm mt-2"><input type="checkbox" checked={form.guarantor} onChange={e=>setForm({...form, guarantor:e.target.checked})}/> AfricanIES bears failed inspection cost</label>
              {form.logisticsStatus.includes('Rejected') && <p className="text-xs text-red-600 mt-1">Will be hidden from marketplace</p>}
            </div>

            <div className="mt-3 p-3 bg-green-50 rounded-lg text-xs">
              Factory ${form.factoryPrice} + Logistics 15% ${(form.factoryPrice*0.15).toFixed(2)} + Platform 5% ${(form.factoryPrice*0.05).toFixed(2)} + Sourcing 3% ${(form.factoryPrice*0.03).toFixed(2)} + Insurance 1% ${(form.factoryPrice*0.01).toFixed(2)} = <b>App ${calcApp(form.factoryPrice).toFixed(2)} inclusive</b> (~₦{(calcApp(form.factoryPrice)*1500).toLocaleString()})
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={handleAdd} className="px-5 py-2 bg-black text-white rounded-lg font-bold text-sm">{editingId ? 'Update Product' : 'Add Product'}</button>
              {editingId && <button onClick={()=>{ setEditingId(null); setForm({ name: '', category: 'Solar Inverter', manufacturer: '', sourcedBy: 'AfricanIES', factoryPrice: 1000, euLink:'', bizLink:'', videoLink:'', testLink:'', exportLink:'', logisticsStatus:'Pending', guarantor:true, qimaAudit:'Pending', qimaPsi:'Pending', status:'Draft' }); setProofs({eu:false,biz:false,video:false,test:false,export:false}) }} className="px-4 py-2 border rounded-lg text-sm">Cancel Edit</button>}
            </div>
          </div>

          <div className="bg-white border rounded-xl p-3 h-fit">
            <h3 className="font-bold text-sm">Vault — {products.length} Products (Add / Edit / Remove)</h3>
            <div className="mt-3 space-y-2 max-h-[900px] overflow-auto">
              {products.length===0 && <p className="text-xs opacity-50">No products yet. Add your first above.</p>}
              {products.map(p=>(
                <div key={p.id} className={`border rounded-lg p-2 text-xs ${p.status==='Blacklisted' || p.status.includes('Rejected') ? 'bg-red-50 border-red-200' : p.status==='Approved' ? 'bg-green-50 border-green-300' : 'bg-white'}`}>
                  <div className="font-bold">{p.name}</div>
                  <div>{p.manufacturer} • {p.category} • {p.sourcedBy}</div>
                  <div>Factory ${p.factoryPrice} → App ${p.appPrice.toFixed(2)}</div>
                  <div>Logistics: {p.logisticsStatus} {p.guarantor ? '(Guarantor)' : ''}</div>
                  <div>Status: <b>{p.status}</b> • Proofs {Object.values(p.proofs).filter(Boolean).length}/5</div>
                  <div className="flex gap-1 mt-2">
                    <button onClick={()=>handleEdit(p)} className="px-2 py-1 bg-white border rounded text-[11px]">Edit</button>
                    <button onClick={()=>handleRemove(p.id)} className="px-2 py-1 bg-red-600 text-white rounded text-[11px]">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
