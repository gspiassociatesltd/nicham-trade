
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import QuoteModal from './components/QuoteModal'

const SOLAR_GROUPS: Record<string, string[]> = {
  "Agro Processing": ["Solar Grain Dryer", "Palm Oil Press", "Cassava Grater", "Rice Thresher"],
  "Power Systems": ["Solar Panel", "Inverter", "Battery", "Lithium Battery"],
  "Water Systems": ["Solar Water Pump", "Irrigation Pump"],
  "New Inventions": ["Canoe Engine", "Solar Fridge"]
}
const CHEMICAL_GROUPS: Record<string, string[]> = {
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
  const [openSolar, setOpenSolar] = useState<string|null>(null)
  const [openChem, setOpenChem] = useState<string|null>(null)
  useEffect(()=>{ loadSolarAgri() },[])
  async function loadSolarAgri(){
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at',{ascending:false}).limit(100)
    let list = data || []
    const filtered = list.filter((p:any)=> {
      const title = (p.title||'').toLowerCase()
      return ALL_SOLAR_KEYWORDS.some(k => title.includes(k.toLowerCase())) || title.includes('solar') || title.includes('dryer') || p.is_new_invention
    })
    setProducts(filtered.length>0 ? filtered : list.slice(0,16))
    setLoading(false)
  }
  async function handleChemicalSearch(){
    if(!search.trim()) { setSearchMode(false); return }
    setSearchMode(true); setScoutLoading(true); setScoutMsg('')
    const { data } = await supabase.from('products').select('*').ilike('title', `%${search}%`).limit(20)
    if(data && data.length>0){ setSearchResults(data); setScoutMsg(`Found ${data.length} chemical(s) in catalog`); setScoutLoading(false); return }
    try{
      const r = await fetch('/api/scout1688', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ keyword: `industrial chemical ${search}`, weightKg: 25, source: 'chemical_search_engine' }) })
      const j = await r.json()
      setScoutMsg(j.sr_id ? `Chemical Scout: Draft ${j.sr_id} for "${search}" - Admin verifies & WhatsApp quote in 24h` : `Chemical Scout triggered for "${search}"`)
      setSearchResults([])
    }catch(e:any){ setScoutMsg(`Chemical Search: Request logged for "${search}" - Admin will source in 24h`) }
    setScoutLoading(false)
  }
  const classFiltered = selectedClass === 'All' ? products : products.filter((p:any)=>{ const t=(p.title||'').toLowerCase(); const c=(p.category||'').toLowerCase(); const s=selectedClass.toLowerCase(); return t.includes(s)||c.includes(s) })
  const displayList = searchMode ? searchResults : classFiltered
  return (
    <div style={{ fontFamily:'Inter, system-ui, sans-serif', background:'#f8fafc', minHeight:'100vh' }}>
      <header style={{ padding:'12px 20px', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'#ffffff', zIndex:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <img src="/logo.png" alt="NiChAm Trade Logo" style={{ width:60, height:60, objectFit:'contain', borderRadius:'50%' }} />
          <div>
            <div style={{ fontWeight:900, fontSize:28, lineHeight:1, letterSpacing:'-0.5px', color:'#0f172a' }}>NiChAm Trade</div>
            <div style={{ fontWeight:700, fontSize:12, color:'#15803d', letterSpacing:'0.3px', marginTop:3 }}>☀ Solar + Agri Grouped + Chemical Search • 07050477950</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <a href="/admin" style={{ fontSize:12, padding:'8px 16px', border:'1px solid #e2e8f0', borderRadius:100, textDecoration:'none', color:'#0f172a', background:'#fff', fontWeight:700 }}>Admin</a>
          <a href="https://wa.me/2347050477950" target="_blank" style={{ background:'#16a34a', color:'#fff', padding:'10px 20px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900 }}>WhatsApp</a>
        </div>
      </header>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px' }}>
        <div style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', borderRadius:20, padding:'20px', color:'#fff' }}>
          <h1 style={{ fontSize:22, fontWeight:900, margin:'0 0 6px' }}>Solar & Agri Displayed. Chemicals via Search Engine.</h1>
          <p style={{ fontSize:12, color:'#cbd5e1', margin:'0 0 18px' }}>Click a dropdown to filter Solar & Agri or search Chemicals. We scout 1688.com + USA factories in 24h. Valid 3 Days.</p>
          <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:16, padding:16, border:'1px solid rgba(255,255,255,0.12)', marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div style={{ fontSize:12, fontWeight:900, color:'#38bdf8' }}>☀ SOLAR & AGRI DISPLAY - Select Category</div>
              <button onClick={()=>setSelectedClass('All')} style={{ fontSize:10, padding:'5px 12px', borderRadius:100, border:0, background: selectedClass==='All' ? '#fff' : 'rgba(255,255,255,0.15)', color: selectedClass==='All' ? '#0f172a' : '#fff', cursor:'pointer', fontWeight:800 }}>Show All ({products.length})</button>
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {Object.entries(SOLAR_GROUPS).map(([group, items])=>{
                const isOpen = openSolar === group
                return (
                  <div key={group} style={{ position:'relative' }}>
                    <button onClick={()=>setOpenSolar(isOpen ? null : group)} style={{ fontSize:11, padding:'8px 14px', borderRadius:100, border:'1px solid rgba(255,255,255,0.15)', background: isOpen ? '#38bdf8' : 'rgba(0,0,0,0.3)', color: isOpen ? '#0f172a' : '#fff', cursor:'pointer', fontWeight:700, display:'flex', alignItems:'center', gap:6 }}>{group} <span style={{ fontSize:10 }}>{isOpen ? '▲' : '▼'}</span></button>
                    {isOpen && (
                      <div style={{ position:'absolute', top:'38px', left:0, background:'#fff', borderRadius:12, padding:8, minWidth:200, boxShadow:'0 10px 30px rgba(0,0,0,0.3)', zIndex:10, border:'1px solid #e2e8f0' }}>
                        {items.map(item=>{ const active=selectedClass===item; return (<button key={item} onClick={()=>{ setSelectedClass(item); setSearchMode(false); setOpenSolar(null); setScoutMsg('') }} style={{ display:'block', width:'100%', textAlign:'left', fontSize:11, padding:'7px 10px', borderRadius:8, border:0, background: active ? '#0f172a' : 'transparent', color: active ? '#fff' : '#0f172a', cursor:'pointer', marginBottom:2, fontWeight: active ? 800 : 400 }}>{item}</button>) })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            {selectedClass !== 'All' && <div style={{ marginTop:10, fontSize:11, color:'#38bdf8' }}>Filtering: <b>{selectedClass}</b></div>}
          </div>
          <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:16, padding:16, border:'1px dashed rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize:12, fontWeight:900, marginBottom:10, color:'#facc15' }}>🧪 INDUSTRIAL CHEMICAL SEARCH ENGINE - Grouped by Use</div>
            <div style={{ display:'flex', gap:8, maxWidth:700, marginBottom:12 }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleChemicalSearch()} placeholder="Search chemical: e.g. Caustic Soda, Paracetamol..." style={{ flex:1, padding:'12px 16px', borderRadius:100, border:0, fontSize:13, outline:'none' }} />
              <button onClick={handleChemicalSearch} disabled={scoutLoading} style={{ padding:'12px 20px', borderRadius:100, border:0, background:'#facc15', color:'#0f172a', fontWeight:900, cursor:'pointer', fontSize:13 }}>{scoutLoading?'Scouting...':'Search'}</button>
              {searchMode && <button onClick={()=>{ setSearchMode(false); setSearch(''); setSearchResults([]); setScoutMsg('') }} style={{ padding:'12px 16px', borderRadius:100, border:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', cursor:'pointer', fontSize:12 }}>Show Solar & Agri</button>}
            </div>
            {scoutMsg && <div style={{ marginBottom:12, background:'rgba(255,255,255,0.1)', padding:'10px 14px', borderRadius:12, fontSize:12 }}>{scoutMsg}</div>}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {Object.entries(CHEMICAL_GROUPS).map(([group, chemicals])=>{
                const isOpen = openChem === group
                return (
                  <div key={group} style={{ position:'relative' }}>
                    <button onClick={()=>setOpenChem(isOpen ? null : group)} style={{ fontSize:11, padding:'8px 14px', borderRadius:100, border:'1px solid rgba(255,255,255,0.15)', background: isOpen ? '#facc15' : 'rgba(0,0,0,0.3)', color: isOpen ? '#0f172a' : '#fff', cursor:'pointer', fontWeight:700, display:'flex', alignItems:'center', gap:6 }}>{group} <span style={{ fontSize:10 }}>{isOpen ? '▲' : '▼'}</span></button>
                    {isOpen && (
                      <div style={{ position:'absolute', top:'38px', left:0, background:'#fff', borderRadius:12, padding:8, minWidth:220, boxShadow:'0 10px 30px rgba(0,0,0,0.3)', zIndex:10, border:'1px solid #e2e8f0' }}>
                        {chemicals.map(chem=>(<button key={chem} onClick={()=>{ setSearch(chem); setOpenChem(null); setTimeout(()=>handleChemicalSearch(),100) }} style={{ display:'block', width:'100%', textAlign:'left', fontSize:11, padding:'7px 10px', borderRadius:8, border:0, background:'transparent', color:'#0f172a', cursor:'pointer', marginBottom:2 }}>{chem}</button>))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div style={{ marginTop:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontSize:16, fontWeight:900, margin:0 }}>{searchMode ? `Chemical Results for "${search}"` : `Solar & Agri Displayed - ${selectedClass} (${classFiltered.length})`}</h2>
          <span style={{ fontSize:11, color:'#64748b', background:'#fff', border:'1px solid #e2e8f0', padding:'4px 10px', borderRadius:100 }}>{searchMode ? `${searchResults.length} found` : 'Solar + Agri Only'}</span>
        </div>
        {loading ? <div style={{ padding:40, textAlign:'center', color:'#94a3b8' }}>Loading...</div> : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16, marginTop:14 }}>
            {displayList.map((p:any)=>{
              const base = Number(p.price_ngn||280000)
              const rate = p.is_new_invention ? 0.12 : base>2000000 ? 0.08 : 0.10
              const landed = Math.round(base*(1+rate))
              return (
              <div key={p.id} style={{ border:'1px solid #e2e8f0', borderRadius:18, overflow:'hidden', background:'#fff', display:'flex', flexDirection:'column' }}>
                <div style={{ height:220, background:'#fff', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid #f1f5f9' }}>
                  <img src={p.image_url} alt={p.title} style={{ maxWidth:'90%', maxHeight:'90%', objectFit:'contain' }} />
                  <div style={{ position:'absolute', top:8, left:8 }}>{p.is_verified && <span style={{ background:'#0f172a', color:'#fff', fontSize:9, padding:'3px 7px', borderRadius:100, fontWeight:800 }}>VERIFIED 1688</span>}</div>
                </div>
                <div style={{ padding:12, flex:1, display:'flex', flexDirection:'column' }}>
                  <div style={{ fontWeight:800, fontSize:13, minHeight:34 }}>{p.title}</div>
                  <div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>{p.supplier_name || '1688 Verified'} - {p.category}</div>
                  <div style={{ marginTop:'auto', paddingTop:10, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                    <div><div style={{ fontWeight:900, fontSize:17 }}>NGN {landed.toLocaleString()}</div><div style={{ fontSize:9, background:'#dcfce7', color:'#166534', padding:'2px 6px', borderRadius:100, display:'inline-block', marginTop:2 }}>Valid 3 Days - {Math.round(rate*100)}% fee</div></div>
                    <button onClick={()=>setSelected(p)} style={{ background:'#0f172a', color:'#fff', padding:'10px 14px', borderRadius:100, border:0, cursor:'pointer', fontWeight:800, fontSize:11 }}>Get Quote AI</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
      {selected && <QuoteModal product={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}

