"use client"
import { useEffect, useState } from 'react'
export default function ProductPage({params}:{params:{id:string}}){
  const [p,setP]=useState<any>(null)
  useEffect(()=>{
    const saved=localStorage.getItem('nicham_v103_products')
    if(saved){
      try{
        const list=JSON.parse(saved)
        setP(list.find((x:any)=>x.id===params.id))
      }catch{}
    }
  },[])
  if(!p) return <div className="p-4 text-sm">Loading...</div>
  return <div className="max-w-2xl mx-auto p-4">
    <a href="/" className="text-xs border px-3 py-1 rounded">← Home</a>
    <h1 className="mt-4 font-black text-xl">{p.name}</h1>
    <div className="text-xs opacity-60">{p.manufacturer} • {p.category} • {p.sourcedBy}</div>
    <div className="mt-3 border rounded-xl p-3 bg-white">
      <div className="text-sm">Factory: ${p.factoryPrice} → App: ${p.appPrice?.toFixed(2)}</div>
      <div className="text-xs mt-1">Logistics: {p.logisticsStatus} • Status: {p.status}</div>
      <div className="text-xs mt-1">Proofs: {Object.values(p.proofs||{}).filter(Boolean).length}/5</div>
      <div className="mt-3 space-y-1 text-xs">
        {p.euLink && <div>EU: <a href={p.euLink} className="underline" target="_blank">{p.euLink}</a></div>}
        {p.bizLink && <div>Biz: <a href={p.bizLink} className="underline" target="_blank">{p.bizLink}</a></div>}
        {p.videoLink && <div>Video: <a href={p.videoLink} className="underline" target="_blank">{p.videoLink}</a></div>}
      </div>
    </div>
  </div>
}
