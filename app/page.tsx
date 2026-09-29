
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import QuoteModal from './components/QuoteModal'

type Product = any

const SOLAR_CATEGORIES = ['Solar Panel','Inverter','Battery','Solar Water Pump','New Invention','Solar']

export default function HomeMasterAligned(){
  const [products, setProducts] = useState<Product[]>([])
  const [selected, setSelected] = useState<Product|null>(null)
  const [search, setSearch] = useState('')
  const [searchMode, setSearchMode] = useState(false)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [scoutLoading, setScoutLoading] = useState(false)
  const [scoutMsg, setScoutMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ loadSolarOnly() },[])

  async function loadSolarOnly(){
    setLoading(true)
    // Per Master Doc: Solar items displayed homepage - curated
    const { data } = await supabase.from('products').select('*').order('created_at',{ascending:false}).limit(100)
    let list = data || []
    // Filter to solar-related for display, fallback to all if table empty then show demo solar
    const solar = list.filter((p:any)=> 
      SOLAR_CATEGORIES.some(c => (p.category||'').toLowerCase().includes(c.toLowerCase())) ||
      (p.title||'').toLowerCase().includes('solar') ||
      (p.title||'').toLowerCase().includes('inverter') ||
      (p.title||'').toLowerCase().includes('battery') ||
      (p.title||'').toLowerCase().includes('lithium') ||
      p.is_new_invention
    )
    if(solar.length>0) setProducts(solar)
    else if(list.length>0) setProducts(list.slice(0,8)) // show first 8 if not categorized yet
    else {
      // Fallback demo solar from 1688 (white bg) - per master doc
      setProducts([
        { id:'s1', title:'3KVA Hybrid Inverter 24V MPPT 80A - Must Factory', price_ngn:280000, landed_price_ngn:308000, image_url:'https://images.unsplash.com/photo-1558446750-4d33c8a4d3e8?w=500', origin:'china', category:'Inverter', is_verified:true, supplier_name:'Foshan Snadi Energy - 1688', description:'CE/TUV Verified' },
        { id:'s2', title:'5KVA Solar Must Hybrid 48V - Top Seller NG', price_ngn:450000, landed_price_ngn:495000, image_url:'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500', origin:'china', category:'Inverter', is_verified:true, supplier_name:'Shenzhen Must Power - 1688' },
        { id:'s3', title:'200Ah 48V LiFePO4 Lithium 10kWh 6000 Cycles', price_ngn:680000, landed_price_ngn:748000, image_url:'https://images.unsplash.com/photo-1565608087341-404b25492fee?w=500', origin:'china', category:'Battery', is_verified:true, supplier_name:'Shenzhen LEMAX - 1688' },
        { id:'s4', title:'550W Mono Bifacial Solar Panel - 25yr Warranty', price_ngn:85000, landed_price_ngn:93500, image_url:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500', origin:'china', category:'Solar Panel', is_verified:true, supplier_name:'Anhui Longsun - 1688' },
        { id:'s5', title:'2HP Solar Water Pump - Irrigation', price_ngn:320000, landed_price_ngn:352000, image_url:'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500', origin:'china', category:'Solar Water Pump', is_verified:true, supplier_name:'Zhejiang Solar Pump - 1688' },
        { id:'s6', title:'Canoe Solar Outboard 5HP Electric 🔥 NEW INVENTION', price_ngn:450000, landed_price_ngn:504000, image_url:'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', origin:'china', category:'New Invention', is_new_invention:true, supplier_name:'Scouting Board - AfricanIES' },
      ])
    }
    setLoading(false)
  }

  async function handleSearch(){
    if(!search.trim()) { setSearchMode(false); return }
    setSearchMode(true)
    setScoutLoading(true)
    setScoutMsg('')
    // 1. Search existing products table
    const { data } = await supabase.from('products').select('*').ilike('title', `%${search}%`).limit(20)
    if(data && data.length>0){
      setSearchResults(data)
      setScoutMsg(`Found ${data.length} in catalog`)
      setScoutLoading(false)
      return
    }
    // 2. No catalog result -> Trigger 1688 Scout Engine per Master Doc (others via search engine)
    try{
      const r = await fetch('/api/scout1688', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ keyword: search, weightKg: 10, source: 'homepage_search_engine' })
      })
      const j = await r.json()
      setScoutMsg(j.sr_id ? `✅ Scout Engine: Created draft ${j.sr_id} for "${search}" - Admin will verify factory & forward quote in 24h (Valid 3 Days)` : `Scout Engine triggered for "${search}" - You will get WhatsApp quote after admin verification`)
      setSearchResults([])
    }catch(e:any){
      setScoutMsg(`Search Engine: Request logged for "${search}" - Admin will source from 1688.com & USA factories`)
    }
    setScoutLoading(false)
  }

  function feeInfo(base:number, isNew?:boolean){
    let rate = 0.10
    if(isNew) rate=0.12
    else if(base>2000000) rate=0.08
    return { rate, landed: Math.round(base*(1+rate)) }
  }

  const displayList = searchMode ? searchResults : products

  return (
    <div style={{ fontFamily:'Inter, system-ui, sans-serif', background:'#f8fafc', minHeight:'100vh' }}>
      <header style={{ padding:'12px 20px', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(10px)', zIndex:20 }}>
        <div style={{ fontWeight:900, fontSize:18 }}>NiChAm Trade <span style={{ fontWeight:400, fontSize:11, color:'#64748b' }}>• Solar Display + Search Engine for Others - Master Doc v2.2</span></div>
        <div style={{ display:'flex', gap:8 }}>
          <a href="/admin" style={{ fontSize:11, padding:'6px 12px', border:'1px solid #e2e8f0', borderRadius:100, textDecoration:'none', color:'#0f172a', background:'#fff' }}>Admin</a>
          <a href="https://wa.me/2347050477950" target="_blank" style={{ background:'#16a34a', color:'#fff', padding:'7px 14px', borderRadius:100, textDecoration:'none', fontSize:11, fontWeight:800 }}>07050477950</a>
        </div>
      </header>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'20px' }}>
        {/* SEARCH ENGINE - Per Master Doc */}
        <div style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', borderRadius:20, padding:'20px', color:'#fff' }}>
          <h1 style={{ fontSize:24, fontWeight:900, margin:'0 0 6px', letterSpacing:'-0.5px' }}>Solar Displayed. Others via Search Engine.</h1>
          <p style={{ fontSize:12, color:'#cbd5e1', margin:'0 0 14px' }}>Per Master Doc: Homepage shows curated solar items (inverters, batteries, panels, pumps, canoe engine). <b>For any other product</b> (phones, machines, tools), use Search Engine below - We scout 1688.com + USA factories in 24h. Valid 3 Days.</p>
          <div style={{ display:'flex', gap:8, maxWidth:700 }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSearch()} placeholder="Search any product: e.g. iphone 15, hydraulic pump, welding machine, furniture..." style={{ flex:1, padding:'12px 16px', borderRadius:100, border:0, fontSize:13, outline:'none' }} />
            <button onClick={handleSearch} disabled={scoutLoading} style={{ padding:'12px 20px', borderRadius:100, border:0, background:'#fff', color:'#0f172a', fontWeight:900, cursor:'pointer', fontSize:13 }}>{scoutLoading?'Scouting...':'🔍 Search Engine'}</button>
            {searchMode && <button onClick={()=>{ setSearchMode(false); setSearch(''); setSearchResults([]); setScoutMsg('') }} style={{ padding:'12px 16px', borderRadius:100, border:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', cursor:'pointer', fontSize:12 }}>Show Solar Only</button>}
          </div>
          {scoutMsg && <div style={{ marginTop:12, background:'rgba(255,255,255,0.1)', padding:'10px 14px', borderRadius:12, fontSize:12 }}>{scoutMsg}</div>}
          <div style={{ marginTop:10, display:'flex', gap:6, flexWrap:'wrap' }}>
            {['iphone 15 pro max','hydraulic jack 10 ton','solar fridge','welding machine','furniture sofa'].map(k=>(
              <button key={k} onClick={()=>{ setSearch(k); setTimeout(()=>handleSearch(),100) }} style={{ fontSize:10, padding:'5px 10px', borderRadius:100, border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.1)', color:'#e2e8f0', cursor:'pointer' }}>{k}</button>
            ))}
          </div>
        </div>

        {/* Solar Section */}
        <div style={{ marginTop:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontSize:16, fontWeight:900, margin:0 }}>{searchMode ? `Search Results for "${search}" - Others via Search Engine` : `☀️ Solar Items Displayed - Curated 1688 Verified (${products.length})`}</h2>
          <span style={{ fontSize:11, color:'#64748b', background:'#fff', border:'1px solid #e2e8f0', padding:'4px 10px', borderRadius:100 }}>{searchMode ? `${searchResults.length} found` : 'Master Doc 4.1 - Solar Only Homepage'}</span>
        </div>

        {loading ? <div style={{ padding:40, textAlign:'center', color:'#94a3b8' }}>Loading solar curated...</div> : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16, marginTop:14 }}>
            {displayList.map((p:any)=>{
              const base = Number(p.price_ngn||280000)
              const { rate, landed } = feeInfo(base, p.is_new_invention)
              return (
              <div key={p.id} style={{ border:'1px solid #e2e8f0', borderRadius:18, overflow:'hidden', background:'#fff' }}>
                <div style={{ height:190, background:'#fff', position:'relative', borderBottom:'1px solid #f1f5f9' }}>
                  <img src={p.image_url} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'contain', padding:12, background:'#fff' }} onError={(e:any)=>{ e.currentTarget.src='https://images.unsplash.com/photo-1558446750-4d33c8a4d3e8?w=400' }} />
                  <div style={{ position:'absolute', top:8, left:8, display:'flex', gap:4 }}>
                    {p.is_verified && <span style={{ background:'#0f172a', color:'#fff', fontSize:9, padding:'3px 7px', borderRadius:100, fontWeight:800 }}>✓ VERIFIED 1688</span>}
                    {p.is_new_invention && <span style={{ background:'#facc15', color:'#0f172a', fontSize:9, padding:'3px 7px', borderRadius:100, fontWeight:900 }}>🔥 NEW</span>}
                  </div>
                  <div style={{ position:'absolute', top:8, right:8, background:'rgba(255,255,255,0.9)', border:'1px solid #e2e8f0', fontSize:9, padding:'3px 7px', borderRadius:100 }}>{(p.origin||'china').toUpperCase()}</div>
                </div>
                <div style={{ padding:12 }}>
                  <div style={{ fontWeight:800, fontSize:13, lineHeight:1.3, minHeight:34 }}>{p.title}</div>
                  <div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>{p.supplier_name || '1688 Verified'} • {p.category}</div>
                  <div style={{ marginTop:10, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                    <div>
                      <div style={{ fontWeight:900, fontSize:17 }}>₦{landed.toLocaleString()}</div>
                      <div style={{ fontSize:9, background:'#dcfce7', color:'#166534', padding:'2px 6px', borderRadius:100, display:'inline-block', marginTop:2 }}>Valid 3 Days • {(rate*100).toFixed(0)}% fee</div>
                    </div>
                    <button onClick={()=>setSelected(p)} style={{ background:'#0f172a', color:'#fff', padding:'10px 14px', borderRadius:100, border:0, cursor:'pointer', fontWeight:800, fontSize:11 }}>Get Quote AI</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {searchMode && searchResults.length===0 && !scoutLoading && (
          <div style={{ marginTop:16, background:'#fff', border:'1px dashed #cbd5e1', borderRadius:16, padding:20, textAlign:'center' }}>
            <div style={{ fontWeight:800, fontSize:14 }}>No catalog match for "{search}" - Scout Engine triggered</div>
            <div style={{ fontSize:12, color:'#64748b', marginTop:6 }}>Per Master Doc, non-solar items are NOT displayed homepage. We scout 1688.com + USA for you. Admin will verify factory (CE/TUV) and send WhatsApp quote in 24h - Valid 3 Days Only with 10%/8%/12% fee.</div>
            <button onClick={()=>setSelected({ id:'search-'+search, title: search, price_ngn: 100000, landed_price_ngn: 110000, category:'Sourcing Request' } as any)} style={{ marginTop:12, padding:'10px 18px', background:'#0f172a', color:'#fff', borderRadius:100, border:0, fontWeight:800, cursor:'pointer' }}>Request Quote for "{search}" Now</button>
          </div>
        )}

        <div style={{ marginTop:20, background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:14, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:12, fontSize:11 }}>
          <div><b>Master Doc Alignment</b><div style={{color:'#64748b', marginTop:4}}>Solar displayed homepage (curated 1688 verified). Others via Search Engine - Not displayed by default to keep marketplace focused.</div></div>
          <div><b>Search Engine Flow</b><div style={{color:'#64748b', marginTop:4}}>User searches "iphone" → No catalog → Scout 1688 draft SR-xxx → Admin verifies → WhatsApp quote Valid 3 Days</div></div>
          <div><b>World-Class White Bg</b><div style={{color:'#64748b', marginTop:4}}>All product images uniform white background (contain, not cover) + Verified badge + Supplier name - Like Alibaba/Jumia</div></div>
        </div>
      </div>
      {selected && <QuoteModal product={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}

