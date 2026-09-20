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
  status: string
  proofs: {eu:boolean,biz:boolean,video:boolean,test:boolean,export:boolean}
}

export default function Admin(){
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState({name:'', category:'Solar Inverter', manufacturer:'', sourcedBy:'AfricanIES', factoryPrice:1000, euLink:'', bizLink:'', videoLink:'', testLink:'', exportLink:'', logisticsStatus:'Pending', status:'Draft'})
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

  const calcApp = (f:number)=> f + f*0.15 + f*0.05 + f*0.03 + f*0.01

  const handleAdd = ()=>{
    if(!form.name || !form.manufacturer){ alert('Name + Manufacturer required'); return }
    const appPrice = calcApp(form.factoryPrice)
    const newProd: Product = {
      id: editingId || Date.now().toString(),
      name: form.name, category: form.category, manufacturer: form.manufacturer, sourcedBy: form.sourcedBy,
      factoryPrice: form.factoryPrice, appPrice,
      euLink: form.euLink, bizLink: form.bizLink, videoLink: form.videoLink, testLink: form.testLink, exportLink: form.exportLink,
      logisticsStatus: form.logisticsStatus, status: form.status, proofs: {...proofs}
    }
    const list = editingId ? products.map(p=> p.id===editingId ? newProd : p) : [newProd, ...products]
    save(list)
    setForm({name:'', category:'Solar Inverter', manufacturer:'', sourcedBy:'AfricanIES', factoryPrice:1000, euLink:'', bizLink:'', videoLink:'', testLink:'', exportLink:'', logisticsStatus:'Pending', status:'Draft'})
    setProofs({eu:false,biz:false,video:false,test:false,export:false})
    setEditingId(null)
  }

  return <div className="min-h-screen bg-gray-50 p-3">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white border rounded-xl p-3 flex justify-between items-center">
        <div><h1 className="font-black text-sm">Admin Vault</h1><p className="text-xs opacity-60">{products.length} products</p></div>
        <div className="flex gap-2"><a href="/" className="text-xs border px-3 py-1 rounded">Home</a><button onClick={()=>{ const blob=new Blob([JSON.stringify(products,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='products.json'; a.click() }} className="text-xs bg-black text-white px-3 py-1 rounded">Export</button></div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-3">
        <div className="md:col-span-2 bg-white border rounded-xl p-3">
          <h2 className="font-bold text-sm">{editingId ? 'Edit' : 'Add'} Product</h2>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Product Name *" className="border rounded px-2 py-1.5 col-span-2 text-sm"/>
            <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="border rounded px-2 py-1.5 text-sm"><option>Solar Inverter</option><option>Solar Panel</option><option>Battery</option><option>Agro Chemicals</option><option>Industrial Chemicals</option></select>
            <input value={form.manufacturer} onChange={e=>setForm({...form, manufacturer:e.target.value})} placeholder="Manufacturer *" className="border rounded px-2 py-1.5 text-sm"/>
            <select value={form.sourcedBy} onChange={e=>setForm({...form, sourcedBy:e.target.value})} className="border rounded px-2 py-1.5 text-sm"><option>AfricanIES</option><option>Betterluck</option><option>External</option></select>
            <input type="number" value={form.factoryPrice} onChange={e=>setForm({...form, factoryPrice: parseFloat(e.target.value)||0})} className="border rounded px-2 py-1.5 text-sm"/>
            <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})} className="border rounded px-2 py-1.5 text-sm"><option>Draft</option><option>Approved</option><option>Rejected</option><option>Blacklisted</option></select>
          </div>

          <div className="mt-3 border rounded p-2">
            <p className="text-xs font-bold">5 Proofs Gate</p>
            <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
              <label className="flex gap-1"><input type="checkbox" checked={proofs.eu} onChange={e=>setProofs({...proofs, eu:e.target.checked})}/> EU Cert</label>
              <label className="flex gap-1"><input type="checkbox" checked={proofs.biz} onChange={e=>setProofs({...proofs, biz:e.target.checked})}/> Business License</label>
              <label className="flex gap-1"><input type="checkbox" checked={proofs.video} onChange={e=>setProofs({...proofs, video:e.target.checked})}/> Factory Video</label>
              <label className="flex gap-1"><input type="checkbox" checked={proofs.test} onChange={e=>setProofs({...proofs, test:e.target.checked})}/> Test Report</label>
              <label className="flex gap-1"><input type="checkbox" checked={proofs.export} onChange={e=>setProofs({...proofs, export:e.target.checked})}/> Export History</label>
            </div>
            <div className="grid grid-cols-1 gap-1 mt-2">
              <input value={form.euLink} onChange={e=>setForm({...form, euLink:e.target.value})} placeholder="EU cert TUV link" className="border rounded px-2 py-1 text-xs"/>
              <input value={form.bizLink} onChange={e=>setForm({...form, bizLink:e.target.value})} placeholder="Business license link" className="border rounded px-2 py-1 text-xs"/>
              <input value={form.videoLink} onChange={e=>setForm({...form, videoLink:e.target.value})} placeholder="Factory video link" className="border rounded px-2 py-1 text-xs"/>
            </div>
          </div>

          <div className="mt-2">
            <select value={form.logisticsStatus} onChange={e=>setForm({...form, logisticsStatus:e.target.value})} className="w-full border rounded px-2 py-1.5 text-sm">
              <option>Pending</option><option>Approved by AfricanIES</option><option>Rejected by AfricanIES</option>
            </select>
          </div>

          <div className="mt-2 text-xs bg-gray-50 p-2 rounded">App Price: ${calcApp(form.factoryPrice).toFixed(2)} (Factory ${form.factoryPrice} + 15% logistics + 5% + 3% + 1%)</div>

          <button onClick={handleAdd} className="mt-3 bg-black text-white px-4 py-1.5 rounded text-sm">{editingId ? 'Update' : 'Add Product'}</button>
        </div>

        <div className="bg-white border rounded-xl p-3">
          <h3 className="font-bold text-sm">Products ({products.length}) — Add / Remove</h3>
          <div className="mt-2 space-y-2 max-h-[700px] overflow-auto">
            {products.map(p=><div key={p.id} className="border rounded p-2 text-xs">
              <div className="font-bold">{p.name}</div>
              <div>{p.manufacturer} • {p.category}</div>
              <div>${p.factoryPrice} → ${p.appPrice.toFixed(2)}</div>
              <div>{p.logisticsStatus} • {p.status} • {Object.values(p.proofs).filter(Boolean).length}/5 proofs</div>
              <div className="flex gap-1 mt-1">
                <button onClick={()=>{ setForm({name:p.name, category:p.category, manufacturer:p.manufacturer, sourcedBy:p.sourcedBy, factoryPrice:p.factoryPrice, euLink:p.euLink, bizLink:p.bizLink, videoLink:p.videoLink, testLink:p.testLink, exportLink:p.exportLink, logisticsStatus:p.logisticsStatus, status:p.status}); setProofs(p.proofs); setEditingId(p.id)}} className="border px-2 py-0.5 rounded">Edit</button>
                <button onClick={()=> save(products.filter(x=>x.id!==p.id))} className="bg-red-600 text-white px-2 py-0.5 rounded">Remove</button>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>
}
