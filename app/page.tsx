'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import QuoteModal from './components/QuoteModal'

const SOLAR_GROUPS = {
  "Agro Processing": ["Solar Grain Dryer", "Palm Oil Press", "Cassava Grater", "Rice Thresher"],
  "Power Systems": ["Solar Panel", "Inverter", "Battery", "Lithium Battery"],
  "Water Systems": ["Solar Water Pump", "Irrigation Pump"],
  "New Inventions": ["Canoe Engine", "Solar Fridge"]
}

const CHEMICAL_GROUPS = {
  "Pharmaceuticals": ["Paracetamol Powder", "Crystallized Sorbitol"],
  "Commodity Chemicals": ["Caustic Soda", "Hydrochloric Acid", "Nitric Acid", "Stearic Acid", "Acetic Acid", "Hydrogen Peroxide"],
  "Paint Chemicals": ["Natrosol", "Calcium Carbonate"],
  "Water Treatment": ["Soda Ash", "Calcium Hypochlorite", "Poly Aluminum Chloride", "Aluminum Sulphate", "Ferric Chloride"]
}

const ALL_SOLAR_KEYWORDS = ["Solar Grain Dryer","Palm Oil Press","Cassava Grater","Rice Thresher","Solar Panel","Inverter","Battery","Solar Water Pump","Canoe Engine"]

export default function HomeMasterAligned(){
  const [products, setProducts] = useState<any[]>([])
  const [selected, setSelected] = useState<any|null>(null)
  const [search, setSearch] = useState('')
  const [selectedClass, setSelectedClass] = useState('All')
  const [searchMode, setSearchMode] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [scoutLoading, setScoutLoading] = useState(false)
  const [scoutMsg, setScoutMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ loadSolarAgri() },[])

  async function loadSolarAgri(){
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at',{ascending:false}).limit(100)
    let list = data || []
    const filtered = list.filter((p:any)=> 
      ALL_SOLAR_KEYWORDS.some(k => (p.title||'').toLowerCase().includes(k.toLowerCase())) ||
      (p.title||'').toLowerCase().includes('solar') ||
      (p.title||'').toLowerCase().includes('dryer') ||
      p.is_new_invention
    )
    setProducts(filtered.length>0 ? filtered : list.slice(0,16))
    setLoading(false)
  }

  async function handleChemicalSearch(){
    if(!search.trim()) { setSearchMode(false); return }
    setSearchMode(true); setScoutLoading(true); setScoutMsg('')
    const { data } = await supabase.from('products').select('*').ilike('title', `%${search}%`).limit(20)
    if(data && data.length>0){
      setSearchResults(data)
      setScoutMsg(`Found ${data.length} chemical(s) in catalog`)
      setScoutLoading(false); return
    }
    try{
      const r = await fetch('/api/scout1688', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ keyword: `industrial chemical ${search}`, weightKg: 25, source: 'chemical_search_engine' })
      })
      const j = await r.json()
      setScoutMsg(j.sr_id ? `✅ Chemical Scout: Draft ${j.sr_id} for "${search}" - Admin verifies & WhatsApp quote in 24h` : `Chemical Scout triggered for "${search}"`)
      setSearchResults([])
    }catch(e:any){
      setScoutMsg(`Chemical Search: Request logged for "${search}" - Admin will source in 24h`)
    }
    setScoutLoading(false)
  }

  function feeInfo(base:number, isNew?:boolean){
    let rate = base>2000000 ? 0.08 : 0.10
    if(isNew) rate=0.12
    return { rate, landed: Math.round(base*(1+rate)) }
  }

  const classFiltered = selectedClass === 'All' ? products : products.filter((p:any)=>
    (p.title||'').toLowerCase().includes(selectedClass.toLowerCase()) ||
    (p.category||'').toLowerCase().includes(selectedClass.toLowerCase())
  )
  const displayList = searchMode ? searchResults : classFiltered

  return (
    <div style={{ fontFamily:'Inter, system-ui, sans-serif', background:'#f8fafc', minHeight:'100vh' }}>
      <header style={{ padding:'12px 20px', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(10px)', zIndex:20 }}>
        <div style={{ fontWeight:900, fontSize:18 }}>NiChAm Trade <span style={{ fontWeight:400, fontSize:11, color:'#64748b' }}>• Solar + Agri Grouped + Chemical Search</span></div>
        <div style={{ display:'flex', gap:8 }}>
          <a href="/admin" style={{ fontSize:11, padding:'6px 12px', border:'1px solid #e2e8f0', borderRadius:100, textDecoration:'none', color:'#0f172a', background:'#fff' }}>Admin</a>
          <a href="https://wa.me/2347050477950" target="_blank" style={{ background:'#16a34a', color:'#fff', padding:'7px 14px', borderRadius:100, textDecoration:'none', fontSize:11, fontWeight:800 }}>07050477950</a>
        </div>
      </header>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px' }}>
        <div style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', borderRadius:20, padding:'20px', color:'#fff' }}>
          <h1 style={{ fontSize:24, fontWeight:900, margin:'0 0 6px' }}>Solar & Agri Displayed. Chemicals via Search Engine.</h1>
          <p style={{ fontSize:12, color:'#cbd5e1', margin:'0 0 18px' }}>Homepage shows <b>Solar & Agri Equipment grouped by use</b>. Industrial Chemicals grouped by use via Search Engine - We scout 1688.com + USA factories in 24h. Valid 3 Days.</p>
          
          {/* SOLAR GROUPING - SAME STYLE AS CHEMICALS */}
          <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:16, padding:16, border:'1px solid rgba(255,255,255,0.12)', marginBottom:14 }}>
            <div style={{ fontSize:12, fontWeight:900, marginBottom:10, color:'#38bdf8', letterSpacing:'0.5px', display:'flex', justifyContent:'space-between' }}>
              <span>☀ SOLAR & AGRI DISPLAY - Grouped by Use</span>
              <button onClick={()=>setSelectedClass('All')} style={{ fontSize:10, padding:'3px 8px', borderRadius:100, border:0, background: selectedClass==='All' ? '#fff' : 'rgba(255,255,255,0.15)', color: selectedClass==='All' ? '#0f172a' : '#fff', cursor:'pointer', fontWeight:800 }}>Show All ({products.length})</button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:12 }}>
              {Object.entries(SOLAR_GROUPS).map(([group, items])=>(
                <div key={group} style={{ background:'rgba(0,0,0,0.25)', borderRadius:12, padding:10, border:'1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize:10, fontWeight:900, color:'#38bdf8', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.8px' }}>{group}</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {items.map((item:any)=>(
                      <button key={item} onClick={()=>{ setSelectedClass(item); setSearchMode(false); setScoutMsg('') }} style={{ fontSize:10, padding:'4px 8px', borderRadius:100, border:'1px solid rgba(255,255,255,0.12)', background: selectedClass===item ? '#fff' : 'rgba(255,255,255,0.07)', color: selectedClass===item ? '#0f172a' : '#e2e8f0', cursor:'pointer', fontWeight: selectedClass===item ? 800