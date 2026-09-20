"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'

const DEFAULTS:any = {
  '1': {name:'Solar Incubator 500 Eggs', price:450000, desc:'Hatch 500 chicks with sun. No NEPA. Hatchery business.', cat:'Farm & Agro', emoji:'🥚', manufacturer:'AfricanIES', proofs:5},
  '2': {name:'Solar Corn Sheller', price:180000, desc:'Shell corn fast with solar. 500kg per hour. No diesel.', cat:'Farm & Agro', emoji:'🌽', manufacturer:'AfricanIES', proofs:4},
  '3': {name:'Solar Oil Press Machine', price:220000, desc:'Press groundnut, palm kernel oil with solar. No fuel.', cat:'Farm & Agro', emoji:'🫒', manufacturer:'AfricanIES', proofs:5},
  '4': {name:'Solar Vegetable & Meat Dryer 100kg', price:150000, desc:'Dry tomatoes, pepper, meat, fish clean. No dust.', cat:'Farm & Agro', emoji:'🌶️', manufacturer:'AfricanIES', proofs:3},
  '5': {name:'Caustic Soda 25kg', price:45000, desc:'Industrial grade for soap making. 99% pure. Verified by AfricanIES.', cat:'Industrial Chemicals', emoji:'🧪', manufacturer:'Betterluck', proofs:5},
  '6': {name:'Solar Fan 16 inch', price:65000, desc:'Cool your home with solar. No NEPA bill.', cat:'Home & Kitchen', emoji:'🌀', manufacturer:'AfricanIES', proofs:4},
  '7': {name:'Hammer 2kg', price:8000, desc:'Heavy duty hand tool. German steel head.', cat:'Hand Tools', emoji:'🔨', manufacturer:'Local', proofs:2},
  '8': {name:'Solar Drill Machine', price:55000, desc:'Drill without NEPA. Solar charged battery.', cat:'Hand Tools', emoji:'🔧', manufacturer:'AfricanIES', proofs:4},
  '9': {name:'Cutlass + Shovel Set', price:12000, desc:'Farm hand tools set. Strong and durable.', cat:'Hand Tools', emoji:'⛏️', manufacturer:'Local', proofs:2},
  '10':{name:'Solar Welding Machine', price:180000, desc:'Weld gates, doors with solar. 200A.', cat:'Hand Tools', emoji:'⚡', manufacturer:'AfricanIES', proofs:5},
}

export default function ProductPage({params}:{params:{id:string}}){
  const [p,setP]=useState<any>(null)
  const [qty,setQty]=useState(1)
  useEffect(()=>{
    if(DEFAULTS[params.id]) setP(DEFAULTS[params.id])
    else {
      const saved=localStorage.getItem('nicham_v103_products')
      if(saved){
        try{
          const list=JSON.parse(saved)
          const found=list.find((x:any)=>x.id===params.id)
          if(found) setP({name:found.name, price:Math.round((found.appPrice||found.factoryPrice)*1600), desc:found.manufacturer+' • '+found.category, cat:found.category, emoji:'📦', manufacturer:found.manufacturer, proofs:Object.values(found.proofs||{}).filter(Boolean).length})
        }catch{}
      }
    }
  },[params.id])
  if(!p) return <div className="min-h-screen bg-[#FFFEF5] p-6"><a href="/" className="text-xs border px-4 py-2 rounded-full bg-white">← Home</a><div className="mt-10 text-center">Loading product...</div></div>
  const vat = Math.round(p.price * 0.075)
  const total = Math.round(p.price * 1.075 * qty)
  const orderViaWhatsApp = ()=>{
    const text = `Hello NiChAm Trade, I want to order ${qty}x ${p.name} at N${p.price.toLocaleString()} each. Total N${total.toLocaleString()}`
    const url = `https://wa.me/2348012345678?text=${encodeURIComponent(text)}`
    // save to orders
    const orders = JSON.parse(localStorage.getItem('nicham_orders')||'[]')
    orders.unshift({id:Date.now().toString(), product:p.name, qty, total, date:new Date().toLocaleString(), status:'Pending - MTN Escrow'})
    localStorage.setItem('nicham_orders', JSON.stringify(orders))
    window.open(url,'_blank')
  }
  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xs border px-4 py-2 rounded-full bg-white">← Marketplace</Link>
          <div className="flex gap-2">
            <Link href="/orders" className="text-xs bg-black text-white px-4 py-2 rounded-full">Orders</Link>
            <Link href="/admin" className="text-xs border px-3 py-2 rounded-full">Admin</Link>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <div className="w-full h-48 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl flex items-center justify-center text-7xl">{p.emoji}</div>
            <div className="mt-4 flex gap-2">
              <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Verified by AfricanIES</div>
              <div className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">{p.cat}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <div className="font-black text-xl">{p.name}</div>
            <div className="text-xs text-gray-500 mt-1">{p.manufacturer} • {p.cat}</div>
            <div className="text-sm text-gray-600 mt-3">{p.desc}</div>
            
            <div className="mt-4 bg-gray-50 rounded-xl p-3">
              <div className="flex justify-between text-sm"><span>Price</span><span className="font-black">N{p.price.toLocaleString()}</span></div>
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>VAT 7.5%</span><span>N{vat.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm font-black mt-2 border-t pt-2"><span>Total per unit</span><span>N{Math.round(p.price*1.075).toLocaleString()}</span></div>
            </div>

            <div className="mt-4">
              <div className="text-xs font-bold mb-1">5 Proofs Gate: {p.proofs}/5 verified</div>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <div className={p.proofs>=1?'text-green-600':'text-gray-400'}>✓ EU Cert (TUV)</div>
                <div className={p.proofs>=2?'text-green-600':'text-gray-400'}>✓ Business License</div>
                <div className={p.proofs>=3?'text-green-600':'text-gray-400'}>✓ Factory Video</div>
                <div className={p.proofs>=4?'text-green-600':'text-gray-400'}>✓ Test Report</div>
                <div className={p.proofs>=5?'text-green-600':'text-gray-400'}>✓ Export History</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs">Qty:</span>
              <button onClick={()=>setQty(Math.max(1,qty-1))} className="border rounded-full w-8 h-8">-</button>
              <span className="font-bold">{qty}</span>
              <button onClick={()=>setQty(qty+1)} className="border rounded-full w-8 h-8">+</button>
              <span className="ml-auto font-black text-sm">Total: N{total.toLocaleString()}</span>
            </div>

            <button onClick={orderViaWhatsApp} className="mt-4 w-full bg-green-600 text-white py-3 rounded-full font-bold text-sm">Order via WhatsApp + Save to Orders</button>
            <div className="text-[10px] text-center text-gray-400 mt-2">Secure via MTN Escrow • QIMA inspected • AfricanIES guarantor</div>
          </div>
        </div>
      </div>
    </div>
  )
}
