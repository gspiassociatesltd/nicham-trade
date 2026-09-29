'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import QuoteModal from './components/QuoteModal'

type Product = {
  id: string
  title: string
  description?: string
  price_ngn: number
  landed_price_ngn?: number
  image_url?: string
  origin?: string
  category?: string
  is_new_invention?: boolean
  is_verified?: boolean
  supplier_name?: string
}

const FALLBACK_1688_PRODUCTS: Product[] = [
  { id: '1688-1', title: '3KVA Hybrid Inverter 24V MPPT 80A Pure Sine', description: 'Must / Srne Factory - CE/TUV Verified', price_ngn: 280000, landed_price_ngn: 308000, image_url: 'https://cbu01.alicdn.com/img/ibank/2023/999/123/123456789_123456.jpg', origin: 'china', category: 'Inverter', is_verified: true, supplier_name: 'Foshan Snadi Energy Co.' },
  { id: '1688-2', title: '5KVA Solar Must Hybrid Inverter 48V', description: 'EU Export History - 5 Units Sold Nigeria', price_ngn: 450000, landed_price_ngn: 495000, image_url: 'https://cbu01.alicdn.com/img/ibank/2024/001/222/222333444_111.jpg', origin: 'china', category: 'Inverter', is_verified: true, supplier_name: 'Shenzhen Must Power' },
  { id: '1688-3', title: '200Ah 48V LiFePO4 Lithium Battery 10kWh', description: 'Lithium - 6000 Cycles - UN38.3 Cert', price_ngn: 680000, landed_price_ngn: 748000, image_url: 'https://cbu01.alicdn.com/img/ibank/O1CN01xxx.jpg', origin: 'china', category: 'Battery', is_verified: true, supplier_name: 'Shenzhen LEMAX' },
  { id: '1688-4', title: '550W Mono Solar Panel - Bifacial', description: 'Grade A - 25yr Warranty - Pallet Price', price_ngn: 85000, landed_price_ngn: 93500, image_url: 'https://cbu01.alicdn.com/img/ibank/2023/555/555666777.jpg', origin: 'china', category: 'Solar Panel', is_verified: true, supplier_name: 'Anhui Longsun Green' },
  { id: '1688-5', title: 'Canoe Solar Outboard 5HP - 5kW Electric 🔥 NEW INVENTION', description: 'New Scouting Board - For Fishermen - 5kW Brushless', price_ngn: 450000, landed_price_ngn: 504000, image_url: 'https://via.placeholder.com/400x300/0f172a/ffffff?text=Canoe+Solar+5HP', origin: 'china', category: 'New Invention', is_new_invention: true, is_verified: false, supplier_name: 'Scouting - AfricanIES Sourcing' },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selected, setSelected] = useState<Product | null>(null)
  const [filter, setFilter] = useState<'all'|'china'|'usa'|'new'>('all')
  const [loading, setLoading] = useState(true)
  const [importing1688, setImporting1688] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at',{ascending:false}).limit(50)
    if (data && data.length>0) {
      // Use real DB if exists, else fallback to 1688 demo
      const mapped = data.map((p:any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price_ngn: Number(p.price_ngn || 280000),
        landed_price_ngn: Number(p.landed_price_ngn || p.price_ngn*1.1),
        image_url: p.image_url,
        origin: p.origin || 'china',
        category: p.category || 'Solar',
        is_new_invention: p.is_new_invention,
        is_verified: p.is_verified,
        supplier_name: p.supplier_name
      }))
      setProducts(mapped)
    } else {
      setProducts(FALLBACK_1688_PRODUCTS)
    }
    setLoading(false)
  }

  async function import1688Live(){
    setImporting1688(true)
    try{
      const keywords = ['3kva hybrid inverter', '200ah lithium battery 48v', '550w solar panel bifacial', '5kva solar inverter must', 'solar water pump 2hp']
      for (const kw of keywords.slice(0,2)) {
        await fetch('/api/scout1688', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ keyword: kw, weightKg: 15 }) })
      }
      alert('1688 Scout triggered for 2 products - Check /admin -> Scouting tab for drafts awaiting approval!')
    }catch(e:any){ alert(e.message) }
    setImporting1688(false)
  }

  const filtered = products.filter(p => {
    if(filter==='all') return true
    if(filter==='new') return p.is_new_invention
    return (p.origin||'china').toLowerCase()===filter
  })

  function feeInfo(base:number, isNew?:boolean){
    let rate = 0.10
    if(isNew) rate=0.12
    else if(base>2000000) rate=0.08
    return { rate, fee: Math.round(base*rate), landed: Math.round(base*(1+rate)) }
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background:'#f8fafc', minHeight:'100vh' }}>
      <header style={{ padding:'14px 24px', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'rgba(255,255,255,0.9)', backdropFilter:'blur(12px)', zIndex:20 }}>
        <div style={{ fontWeight:900, fontSize:20, letterSpacing:'-0.5px' }}>NiChAm Trade <span style={{fontWeight:400, fontSize:13, color:'#64748b', marginLeft:6}}>• GSPI Associates • AfricanIES</span></div>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <a href="/admin" style={{ fontSize:12, color:'#0f172a', textDecoration:'none', border:'1px solid #e2e8f0', padding:'7px 14px', borderRadius:100, background:'#fff', fontWeight:700 }}>Admin AI Compare</a>
          <a href={`https://wa.me/2347050477950`} target="_blank" style={{ background:'#16a34a', color:'#fff', padding:'8px 16px', borderRadius:100, textDecoration:'none', fontSize:12, fontWeight:800, boxShadow:'0 2px 8px rgba(22,163,74,0.3)' }}>WhatsApp: 07050477950</a>
        </div>
      </header>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'24px' }}>
        {/* Hero */}
        <div style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', borderRadius:24, padding:'28px 24px', color:'#fff', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'relative', zIndex:1, maxWidth:720 }}>
            <div style={{ display:'inline-flex', background:'rgba(255,255,255,0.1)', padding:'4px 12px', borderRadius:100, fontSize:11, fontWeight:700, letterSpacing:'0.5px' }}>🔥 LIVE FROM 1688.com • AFRICANIES LOGISTICS • VALID 3 DAYS</div>
            <h1 style={{ fontSize:32, fontWeight:900, margin:'14px 0 8px', lineHeight:1.1, letterSpacing:'-1px' }}>Shop Verified China & USA Factories - Landed to Enugu, Lagos, PH</h1>
            <p style={{ fontSize:14, color:'#cbd5e1', margin:0, lineHeight:1.5 }}>Per Master Build Doc v2.2: Real 1688 supplier products, AI price-checked vs Jumia/Kara/Konga. 10% platform fee (8% {'>'}₦2M, 12% new inventions). No breakdown shown to buyer. Admin approves before forward. Valid 3 Days Only.</p>
            <div style={{ display:'flex', gap:8, marginTop:18, flexWrap:'wrap' }}>
              <button onClick={()=>setFilter('all')} style={{ padding:'10px 18px', borderRadius:100, border:0, background: filter==='all'?'#fff':'rgba(255,255,255,0.15)', color: filter==='all'?'#0f172a':'#fff', cursor:'pointer', fontWeight:800, fontSize:13 }}>All ({products.length})</button>
              <button onClick={()=>setFilter('china')} style={{ padding:'10px 18px', borderRadius:100, border:0, background: filter==='china'?'#fff':'rgba(255,255,255,0.15)', color: filter==='china'?'#0f172a':'#fff', cursor:'pointer', fontWeight:700, fontSize:13 }}>Shop China 1688</button>
              <button onClick={()=>setFilter('usa')} style={{ padding:'10px 18px', borderRadius:100, border:0, background: filter==='usa'?'#fff':'rgba(255,255,255,0.15)', color: filter==='usa'?'#0f172a':'#fff', cursor:'pointer', fontWeight:700, fontSize:13 }}>Shop USA</button>
              <button onClick={()=>setFilter('new')} style={{ padding:'10px 18px', borderRadius:100, border:0, background: filter==='new'?'#facc15':'rgba(250,204,21,0.2)', color: filter==='new'?'#0f172a':'#facc15', cursor:'pointer', fontWeight:800, fontSize:13 }}>🔥 New Inventions</button>
              <button onClick={import1688Live} disabled={importing1688} style={{ padding:'10px 18px', borderRadius:100, border:'1px solid rgba(255,255,255,0.2)', background:'transparent', color:'#fff', cursor:'pointer', fontWeight:700, fontSize:12 }}>{importing1688?'Scouting 1688...':'🤖 Scout 1688 Live'}</button>
            </div>
          </div>
          <div style={{ position:'absolute', right:-40, top:-40, width:300, height:300, background:'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)' }} />
        </div>

        {/* Trust bar */}
        <div style={{ display:'flex', gap:12, marginTop:16, flexWrap:'wrap', fontSize:11, color:'#475569' }}>
          <span style={{ background:'#fff', border:'1px solid #e2e8f0', padding:'6px 12px', borderRadius:100 }}>✅ CE/TUV Verified Factories</span>
          <span style={{ background:'#fff', border:'1px solid #e2e8f0', padding:'6px 12px', borderRadius:100 }}>🤖 AI Price vs Jumia/Kara - 15% Flag</span>
          <span style={{ background:'#fff', border:'1px solid #e2e8f0', padding:'6px 12px', borderRadius:100 }}>📦 AfricanIES Freight + Customs + Door Delivery</span>
          <span style={{ background:'#fffbeb', border:'1px solid #fde68a', padding:'6px 12px', borderRadius:100, color:'#92400e' }}>⏰ Landed Price Valid 3 Days - Admin Approval Required</span>
        </div>

        {loading ? <div style={{ padding:60, textAlign:'center', color:'#94a3b8' }}>Loading 1688 verified products...</div> : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:18, marginTop:20 }}>
            {filtered.map(p => {
              const base = Number(p.price_ngn)
              const { rate, fee, landed } = feeInfo(base, p.is_new_invention)
              return (
              <div key={p.id} style={{ border:'1px solid #e2e8f0', borderRadius:20, overflow:'hidden', background:'#fff', boxShadow:'0 1px 2px rgba(0,0,0,0.04)', transition:'all 0.2s', cursor:'pointer' }}>
                <div style={{ height:200, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', borderBottom:'1px solid #f1f5f9' }}>
                  {/* World-class: uniform white background + real image */}
                  {p.image_url && !p.image_url.includes('via.placeholder') ? (
                    <img src={p.image_url} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'contain', padding:12, background:'#fff' }} onError={(e:any)=>{ e.currentTarget.style.display='none' }} />
                  ) : (
                    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#f8fafc,#fff)', fontSize:52 }}>{p.category==='Battery'?'🔋':p.category==='Solar Panel'?'☀️':p.is_new_invention?'🛶':'⚡'}</div>
                  )}
                  <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:6 }}>
                    {p.is_verified && <span style={{ background:'#0f172a', color:'#fff', fontSize:10, padding:'4px 8px', borderRadius:100, fontWeight:800 }}>✓ VERIFIED</span>}
                    {p.is_new_invention && <span style={{ background:'#facc15', color:'#0f172a', fontSize:10, padding:'4px 8px', borderRadius:100, fontWeight:900 }}>🔥 NEW</span>}
                  </div>
                  <div style={{ position:'absolute', top:10, right:10, background:'rgba(255,255,255,0.9)', backdropFilter:'blur(6px)', border:'1px solid #e2e8f0', fontSize:10, padding:'4px 8px', borderRadius:100, fontWeight:700 }}>{(p.origin||'china').toUpperCase()} • 1688</div>
                </div>
                <div style={{ padding:14 }}>
                  <div style={{ fontWeight:800, fontSize:13.5, lineHeight:'1.35', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', minHeight:36 }}>{p.title}</div>
                  <div style={{ fontSize:11, color:'#64748b', marginTop:6, lineHeight:1.3 }}>{p.description?.slice(0,60)} • {p.supplier_name || 'Verified Supplier'}</div>
                  <div style={{ marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                    <div>
                      <div style={{ fontSize:10, color:'#64748b', textDecoration:'line-through' }}>Base ₦{base.toLocaleString()}</div>
                      <div style={{ fontWeight:900, fontSize:18, letterSpacing:'-0.5px' }}>₦{landed.toLocaleString()}</div>
                      <div style={{ display:'flex', gap:4, marginTop:4 }}>
                        <span style={{ fontSize:9, background:'#dcfce7', color:'#166534', padding:'3px 7px', borderRadius:100, fontWeight:700 }}>Valid 3 Days</span>
                        <span style={{ fontSize:9, background:'#f1f5f9', color:'#475569', padding:'3px 7px', borderRadius:100 }}>{(rate*100).toFixed(0)}% fee ₦{fee.toLocaleString()}</span>
                      </div>
                    </div>
                    <button onClick={() => setSelected(p)} style={{ background:'#0f172a', color:'#fff', padding:'11px 16px', borderRadius:100, border:0, cursor:'pointer', fontWeight:800, fontSize:12, boxShadow:'0 4px 12px rgba(15,23,42,0.2)' }}>Get Quote • AI</button>
                  </div>
                  <div style={{ marginTop:10, fontSize:10, color:'#94a3b8', background:'#f8fafc', padding:'6px 10px', borderRadius:8, border:'1px solid #f1f5f9' }}>🤖 AI will compare vs Jumia/Kara before admin forwards - Master Doc 13F</div>
                </div>
              </div>
            )})}
          </div>
        )}

        {filtered.length===0 && !loading && (
          <div style={{ padding:40, textAlign:'center', background:'#fff', border:'1px dashed #cbd5e1', borderRadius:20, marginTop:20 }}>
            No products for {filter} - Click Scout 1688 Live to import from 1688.com or add in Supabase products table
          </div>
        )}

        {/* How it works - World class trust */}
        <div style={{ marginTop:28, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:12 }}>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:14 }}><b style={{fontSize:12}}>1. Scout 1688</b><div style={{fontSize:11, color:'#64748b', marginTop:4}}>Admin requests → AfricanIES finds 3 suppliers with CE/TUV → App drafts SR-xxx</div></div>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:14 }}><b style={{fontSize:12}}>2. AI Price Check</b><div style={{fontSize:11, color:'#64748b', marginTop:4}}>Before forwarding, AI compares landed vs Jumia/Kara. Flags 15%+ above market per Rule 13F</div></div>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:14 }}><b style={{fontSize:12}}>3. Admin Approves</b><div style={{fontSize:11, color:'#64748b', marginTop:4}}>Admin sees comparison table in /admin → Approves & Forwards via WhatsApp • Valid 3 Days</div></div>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:14 }}><b style={{fontSize:12}}>4. AfricanIES Delivers</b><div style={{fontSize:11, color:'#64748b', marginTop:4}}>Naira to AfricanIES → Pays factory USD/Yuan → Inspection video → Ship → Apapa → Door delivery</div></div>
        </div>
      </div>

      {selected && <QuoteModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
