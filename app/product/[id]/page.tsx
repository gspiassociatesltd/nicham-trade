"use client"
import { useEffect, useState } from 'react'
export default function ProductPage({params}:{params:{id:string}}){
  const [p,setP]=useState<any>(null)
  useEffect(()=>{
    const saved=localStorage.getItem('nicham_v103_products')
    if(saved){
      try{
        const list=JSON.parse(saved)
        const found=list.find((x:any)=>x.id===params.id)
        if(found) setP(found)
      }catch{}
    }
    // fallback default
    if(!p){
      const defaults: any = {
        '1':{name:'Solar Incubator 500 Eggs', manufacturer:'AfricanIES', category:'Farm & Agro', factoryPrice:281, appPrice:450000, desc:'Hatch 500 chicks with sun. No NEPA. Hatchery business.'},
        '2':{name:'Solar Corn Sheller', manufacturer:'AfricanIES', category:'Farm & Agro', factoryPrice:112, appPrice:180000},
        '3':{name:'Solar Oil Press Machine', manufacturer:'AfricanIES', category:'Farm & Agro', factoryPrice:137, appPrice:220000},
        '4':{name:'Solar Vegetable & Meat Dryer 100kg', manufacturer:'AfricanIES', category:'Farm & Agro', factoryPrice:93, appPrice:150000},
      }
      if(defaults[params.id]) setP(defaults[params.id])
    }
  },[params.id])
  if(!p) return <div className="p-4 text-sm">Loading... <a href="/" className="underline">Home</a></div>
  return <div className="min-h-screen bg-[#fefce8] p-4">
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-4 border">
      <a href="/" className="text-xs border px-3 py-1 rounded-full">← Back to Marketplace</a>
      <h1 className="mt-4 font-black text-xl">{p.name || p.name_en}</h1>
      <div className="text-xs opacity-60">{p.manufacturer} • {p.category}</div>
      <div className="mt-3 border rounded-xl p-3">
        <div className="text-sm font-bold">Price: N{(p.appPrice||p.price||0).toLocaleString()}</div>
        <div className="text-xs mt-1">Factory: ${p.factoryPrice||0} → App: ${p.appPrice?.toFixed?.(2)||p.appPrice}</div>
        <div className="text-xs mt-2 opacity-70">Secure trading via MTN Escrow. QIMA inspected. AfricanIES guarantor.</div>
      </div>
      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-full font-bold text-sm">Order via WhatsApp</button>
    </div>
  </div>
}
