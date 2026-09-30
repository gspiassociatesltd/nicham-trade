'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import QuoteModal from './components/QuoteModal'

const SOLAR_AGRI_CATEGORIES = [
  'Solar Panel','Inverter','Battery','Solar Water Pump','Solar Grain Dryer',
  'Solar Palm Oil Press','Solar Cassava Grater','Solar Rice Thresher',
  'Agro Processing','Agri Equipment','Agriculture','Solar'
]

const CLASS_BUTTONS = [
  'All','Solar Grain Dryer','Palm Oil Press','Cassava Grater',
  'Rice Thresher','Solar Water Pump','Solar Panel','Inverter','Battery'
]

const CHEMICAL_EXAMPLES = [
  'Caustic Soda Flakes','Soda Ash Light','Hydrogen Peroxide 50%',
  'Sulphuric Acid','Chlorine Powder'
]

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
      SOLAR_AGRI_CATEGORIES.some(c => (p.category||'').toLowerCase().includes(c.toLowerCase())) ||
      (p.title||'').toLowerCase().includes('solar') ||
      (p.title||'').toLowerCase().includes('dryer') ||
      (p.title||'').toLowerCase().includes('thresher') ||
      (p.title||'').toLowerCase().includes('grater') ||
      (p.title||'').toLowerCase().includes('palm oil') ||
      p.is_new_invention
    )
    if(filtered.length>0) setProducts(filtered)
    else setProducts(list.slice(0,16))
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
      setScoutMsg(j.sr_id ? `✅ Chemical Scout: Draft ${j.sr_id} for "${search}" - Admin verifies factory & WhatsApp quote in 24h` : `Chemical Scout triggered for "${search}"`)
      setSearchResults([])
    }catch(e:any){
      setScoutMsg(`Chemical Search: Request logged for "${search}" - Admin will source in 24h`)
    }
    setScoutLoading(false)
  }

  function feeInfo(base:number, isNew?:boolean){
    let rate = 0.10
    if(isNew) rate=0.12
    else if(base>2000000) rate=0.08
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
        <div style={{ fontWeight:900, fontSize:18 }}>NiChAm Trade <span style={{ fontWeight:400, fontSize:11, color:'#64748b' }}>• Solar + Agri Display + Chemical Search Engine</span></div>
        <div style={{ display:'flex', gap:8 }}>
          <a href="/admin" style={{ fontSize:11, padding:'6px 12px', border:'1px solid #e2e8f0', borderRadius:100, textDecoration:'none', color:'#0f172a', background:'#fff' }}>Admin</a>
          <a href="https://wa.me/2347050477950" target="_blank" style={{ background:'#16a34a', color:'#fff', padding:'7px 14px', borderRadius:100, textDecoration:'none', fontSize:11, fontWeight:800 }}>07050477950</a>
        </div>
      </header>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px' }}>
        <div style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', borderRadius:20, padding:'20px', color:'#fff' }}>
          <h1 style={{ fontSize:24, fontWeight:900, margin:'0 0 6px' }}>Solar & Agri Displayed. Chemicals via Search Engine.</h1>
          <p style={{ fontSize:12, color:'#cbd5e1', margin:'0 0 14px' }}>Homepage shows <b>Solar & Agri Equipment</b>. For Industrial Chemicals, use Search Engine below - We scout 1688.com + USA factories in 24h. Valid 3 Days.</p>
          
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
            {CLASS_BUTTONS.map(k=>(
              <button key={k} onClick={()=>{ setSelectedClass(k); setSearchMode(false); setSearch(''); setScoutMsg('') }} style={{ fontSize:11, padding:'6px 12px', borderRadius:100, border:'1px solid rgba(255,255,255,0.2)', background: selectedClass===k ? '#fff' : 'rgba(255,255,255,0.1)', color: selectedClass===k ? '#0f172a' : '#e2e8f0', cursor:'pointer', fontWeight: selectedClass===k ? 900 : 400 }}>{k}</button>
            ))}
          </div>

          <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:16, padding:12, border:'1px dashed rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize:11, fontWeight:800, marginBottom:6, color:'#facc15' }}>🧪 INDUSTRIAL CHEMICAL SEARCH ENGINE ONLY</div>
            <div style={{ display:'flex', gap:8, maxWidth:700 }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleChemicalSearch()} placeholder="Search industrial chemical: e.g. Caustic Soda Flakes, Soda Ash Light, Hydrogen Peroxide..." style={{ flex:1, padding:'12px 16px', borderRadius:100, border:0, fontSize:13, outline:'none' }} />
              <button onClick={handleChemicalSearch} disabled={scoutLoading} style={{ padding:'12px 20px', borderRadius:100, border:0, background:'#facc15', color:'#0f172a', fontWeight:900, cursor:'pointer', fontSize:13 }}>{scoutLoading?'Scouting...':'🔍 Search Chemical'}</button>
              {searchMode && <button onClick={()=>{ setSearchMode(false); setSearch(''); setSearchResults([]); setScoutMsg('') }} style={{ padding:'12px 16px', borderRadius:100, border:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', cursor:'pointer', fontSize:12 }}>Show Solar & Agri</button>}
            </div>
            {scoutMsg && <div style={{ marginTop:12, background:'rgba(255,255,255,0.1)', padding:'10px 14px', borderRadius:12, fontSize:12 }}>{scoutMsg}</div>}
            <div style={{ marginTop:10, display:'flex', gap:6, flexWrap:'wrap' }}>
              {CHEMICAL_EXAMPLES.map(k=>(
                <button key={k} onClick={()=>{ setSearch(k); setTimeout(()=>handleChemicalSearch(),100) }} style={{ fontSize:10, padding:'5px 10px', borderRadius:100, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.08)', color:'#e2e8f0', cursor:'pointer' }}>{k}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontSize:16, fontWeight:900, margin:0 }}>{searchMode ? `Chemical Results for "${search}"` : `☀ Solar & Agri Displayed - ${selectedClass} (${classFiltered.length})`}</h2>
          <span style={{ fontSize:11, color:'#64748b', background:'#fff', border:'1px solid #e2e8f0', padding:'4px 10px', borderRadius:100 }}>{searchMode ? `${searchResults.length} found` : 'Solar + Agri Only'}</span>
        </div>

        {loading ? <div style={{ padding:40, textAlign:'center', color:'#94a3b8' }}>Loading...</div> : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16, marginTop:14 }}>
            {displayList.map((p:any)=>{
              const base = Number(p.price_ngn||280000)
              const { rate, landed } = feeInfo(base, p.is_new_invention)
              return (
              <div key={p.id} style={{ border:'1px solid #e2e8f0', borderRadius:18, overflow:'hidden', background:'#fff', display:'flex', flexDirection:'column' }}>
                <div style={{ height:220, background:'#fff', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid #f1f5f9' }}>
                  <img src={p.image_url} alt={p.title} style={{ maxWidth:'90%', maxHeight:'90%', objectFit:'contain' }} />
                  <div style={{ position:'absolute', top:8, left:8 }}>{p.is_verified && <span style={{ background:'#0f172a', color:'#fff', fontSize:9, padding:'3px 7px', borderRadius:100, fontWeight:800 }}>✓ VERIFIED 1688</span>}</div>
                  <div style={{ position:'absolute', top:8, right:8, background:'rgba(255,255,255,0.95)', border:'1px solid #e2e8f0', fontSize:9, padding:'3px 7px', borderRadius:100 }}>{(p.origin||'china').toUpperCase()}</div>
                </div>
                <div style={{ padding:12, flex:1, display:'flex', flexDirection:'column' }}>
                  <div style={{ fontWeight:800, fontSize:13, minHeight:34 }}>{p.title}</div>
                  <div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>{p.supplier_name || '1688 Verified'} • {p.category}</div>
                  <div style={{ marginTop:'auto', paddingTop:10, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                    <div><div style={{ fontWeight:900, fontSize:17 }}>₦{landed.toLocaleString()}</div><div style={{ fontSize:9, background:'#dcfce7', color:'#166534', padding:'2px 6px', borderRadius:100, display:'inline-block', marginTop:2 }}>Valid 3 Days • {(rate*100).toFixed(0)}% fee</div></div>
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