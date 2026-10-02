'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import QuoteModal from './components/QuoteModal'

const MOTOMA_ALL = [
  {
    "model": "M68PW PRO",
    "title": "MOTOMA M68PW PRO Lithium Iron Phosphate Battery 200Ah 25.6V \u2013 5.12kWh",
    "specs": "200Ah 25.6V 5.12kWh, Grade A+ Cells, 8000 cycles, Smart BMS, Wi-Fi",
    "capacity": "5.12kWh",
    "voltage": "25.6V",
    "ah": "200Ah",
    "source": "M68PW_PRO_Motoma.pdf"
  },
  {
    "model": "M69PW PRO",
    "title": "MOTOMA M69PW PRO Lithium Iron Phosphate Battery 280Ah 25.6V \u2013 7.16kWh",
    "specs": "280Ah 25.6V 7.16kWh, 15+ years life, Touch Screen",
    "capacity": "7.16kWh",
    "voltage": "25.6V",
    "ah": "280Ah",
    "source": "M69PW_PRO_Motoma.pdf"
  },
  {
    "model": "M87PW PRO",
    "title": "MOTOMA M87PW PRO Lithium Iron Phosphate Battery 100Ah 51.2V \u2013 5.12kWh",
    "specs": "100Ah 51.2V 5.12kWh, Grade A+ Cells, 8000 cycles @80% DoD, Touch Screen, Wi-Fi",
    "capacity": "5.12kWh",
    "voltage": "51.2V",
    "ah": "100Ah",
    "source": "M87PW_PRO_Motoma.pdf"
  },
  {
    "model": "M88PW PRO",
    "title": "MOTOMA M88PW PRO Lithium Iron Phosphate Battery 200Ah 51.2V \u2013 10.24kWh",
    "specs": "200Ah 51.2V 10.24kWh, High Cycle Efficiency",
    "capacity": "10.24kWh",
    "voltage": "51.2V",
    "ah": "200Ah",
    "source": "M88PW_PRO_Motoma.pdf"
  },
  {
    "model": "M90 PRO",
    "title": "MOTOMA M90 PRO Lithium Iron Phosphate Battery 320Ah 51.2V \u2013 16.38kWh",
    "specs": "320Ah 51.2V 16.38kWh, Compatible Deye Growatt Solis",
    "capacity": "16.38kWh",
    "voltage": "51.2V",
    "ah": "320Ah",
    "source": "M90_PRO_Motoma.pdf"
  },
  {
    "model": "M91 PRO",
    "title": "MOTOMA M91 PRO Lithium Iron Phosphate Battery 400Ah 51.2V \u2013 20.48kWh",
    "specs": "400Ah 51.2V 20.48kWh, Largest Residential, 15 pcs parallel",
    "capacity": "20.48kWh",
    "voltage": "51.2V",
    "ah": "400Ah",
    "source": "M91_PRO_Motoma.pdf"
  },
  {
    "model": "HV-M 40~61",
    "title": "MOTOMA High Voltage Battery HV-M 40-61",
    "specs": "40-61kWh High Voltage LiFePO4",
    "capacity": "40-61kWh",
    "voltage": "High Voltage",
    "source": "BROCHURE_2026"
  },
  {
    "model": "HV-M 92-193",
    "title": "MOTOMA High Voltage Battery HV-M 92-193 \u2013 92.16kWh",
    "specs": "92-193kWh 150Ah 51.2V module",
    "capacity": "92-193kWh",
    "voltage": "HV",
    "source": "BROCHURE_2026"
  },
  {
    "model": "ESS-MHV PRO 161",
    "title": "MOTOMA ESS-MHV PRO 161kWh C&I ESS",
    "specs": "161kWh Compact Outdoor C&I",
    "capacity": "161kWh",
    "voltage": "C&I",
    "source": "BROCHURE_2026"
  },
  {
    "model": "ESS-MHV PRO 209",
    "title": "MOTOMA ESS-MHV PRO 209kWh C&I ESS",
    "specs": "209kWh Scalable",
    "capacity": "209kWh",
    "voltage": "C&I",
    "source": "BROCHURE_2026"
  },
  {
    "model": "M50-100",
    "title": "MOTOMA Smart ESS Unit M50-100 All-in-One 50kW/100kWh",
    "specs": "Hybrid inverter 50kW/100kWh",
    "capacity": "100kWh",
    "voltage": "All-in-One",
    "source": "BROCHURE_2026"
  },
  {
    "model": "BESS-500kW/1045kWh",
    "title": "MOTOMA BESS-500kW/1045kWh Battery System",
    "specs": "500kW/1045kWh Centralized",
    "capacity": "1045kWh",
    "voltage": "BESS",
    "source": "BROCHURE_2026"
  },
  {
    "model": "M2500-5015",
    "title": "MOTOMA M2500-5015 Liquid-cooling Container ESS 2.5MW/5MWh",
    "specs": "2.5MW/5.015MWh Liquid cooling",
    "capacity": "5MWh",
    "voltage": "2.5MW",
    "source": "BROCHURE_2026"
  },
  {
    "model": "FT25-690V3450KW",
    "title": "MOTOMA FT25-690V3450KW Medium-Voltage Converter 3450KW",
    "specs": "3450KW 690V Medium Voltage",
    "capacity": "3450KW",
    "voltage": "690V",
    "source": "BROCHURE_2026"
  },
  {
    "model": "M77U/M72U/M78U",
    "title": "MOTOMA Telecom Battery M77U 48V 100AH/150AH/200AH",
    "specs": "48V Telecom 100/150/200Ah LiFePO4",
    "capacity": "10kWh",
    "voltage": "48V",
    "source": "BROCHURE_2026"
  }
]

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState<'all'|'china'|'usa'|'motoma'>('all')
  const [loading, setLoading] = useState(true)
  const [showEngine, setShowEngine] = useState(true)
  const [engineApproved, setEngineApproved] = useState(false)
  const [authView, setAuthView] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await supabase.from('products').select('*').eq('status','available').order('created_at',{ascending:false})
      if (data) setProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  const motomaForDisplay = MOTOMA_ALL.map((e:any)=> ({
    id: `motoma-${e.model}`,
    title: e.title,
    origin: 'china',
    category: 'MOTOMA Authorized – 15 Products Extraction Engine',
    price_ngn: 0,
    landed_price_ngn: 0,
    status: 'available',
    supplier_name: 'MOTOMA Power – Authorized (Public Display Safe)',
    supplier_model: e.model,
    is_motoma: true,
    specs: e.specs,
    capacity: e.capacity,
    source: e.source,
    image_url: null
  }))

  const combined = engineApproved ? [...motomaForDisplay, ...products] : products
  const filtered = combined.filter((p:any) => {
    if (filter==='all') return true
    if (filter==='motoma') return p.is_motoma
    return (p.origin||'china').toLowerCase() === filter
  })

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <header style={{ padding: '14px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position:'sticky', top:0, background:'#fff', zIndex:10 }}>
        <div style={{ fontWeight: 900, fontSize: 20 }}>NiChAm Trade <span style={{ fontSize:11, background:'#dcfce7', border:'1px solid #bbf7d0', padding:'2px 8px', borderRadius:100, marginLeft:8, color:'#166534' }}>15 MOTOMA – Engine Fixed</span></div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={()=>setShowEngine(!showEngine)} style={{ fontSize:11, padding:'6px 12px', borderRadius:100, border:'1px solid #111', background: showEngine ? '#111' : '#fff', color: showEngine ? '#fff' : '#111', cursor:'pointer', fontWeight:700 }}>{showEngine ? 'Hide Engine' : 'Show 15 MOTOMA Engine'}</button>
          <a href="/admin" style={{ fontSize: 12, color: '#666', textDecoration: 'none', border:'1px solid #eee', padding:'6px 12px', borderRadius:100 }}>Admin</a>
          <a href={`https://wa.me/2347050477950`} target="_blank" style={{ background: '#16a34a', color: '#fff', padding: '8px 14px', borderRadius: 100, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>WhatsApp</a>
        </div>
      </header>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        {showEngine && (
          <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:20, padding:18, marginBottom:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12, alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:900, fontSize:16 }}>🔋 MOTOMA Extraction Engine – 15 Products – FIXED BUILD – All Listed At Once</div>
                <div style={{ fontSize:11, color:'#166534', marginTop:4 }}>Fixed TS2339 error: source_file → source – New: M68PW PRO 200Ah, M69PW PRO 280Ah, M87PW PRO 100Ah, M88PW PRO 200Ah, M90 PRO 320Ah, M91 PRO 400Ah + Brochure 9 – AfricanIES interested • Waiting Made-in-China</div>
              </div>
              <button onClick={()=>setEngineApproved(true)} disabled={engineApproved} style={{ background: engineApproved ? '#16a34a' : '#111', color:'#fff', padding:'12px 22px', borderRadius:100, border:0, fontWeight:900, fontSize:13, cursor:'pointer' }}>{engineApproved ? '✓ 15 MOTOMA Listed' : 'Approve & List All 15 MOTOMA Now'}</button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:8, marginTop:14 }}>
              {MOTOMA_ALL.map((e:any)=>(
                <div key={e.model} style={{ border:'1px solid #bbf7d0', background:'#fff', borderRadius:12, padding:10 }}>
                  <div style={{ fontWeight:800, fontSize:11 }}>{e.title}</div>
                  <div style={{ fontSize:10, color:'#666', marginTop:3 }}>{e.model} • {e.capacity} • {e.specs} • Source: {e.source}</div>
                  <div style={{ marginTop:6, display:'flex', gap:4, flexWrap:'wrap' }}><span style={{ fontSize:8, background:'#dcfce7', border:'1px solid #bbf7d0', padding:'2px 6px', borderRadius:100, fontWeight:800, color:'#166534' }}>MOTOMA Authorized – Public Safe</span><span style={{ fontSize:8, background:'#fef9c3', padding:'2px 6px', borderRadius:100 }}>{e.capacity}</span></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:12, display:'flex', gap:8, flexWrap:'wrap' }}>
              <button onClick={()=>setAuthView(!authView)} style={{ fontSize:11, padding:'6px 12px', borderRadius:100, border:'1px solid #bbf7d0', background:'#fff', cursor:'pointer' }}>{authView ? 'Hide' : 'View'} Public Authorization</button>
              <span style={{ fontSize:10, color:'#166534', padding:'6px' }}>Build Fixed – TS2339 resolved – Ready to deploy</span>
            </div>
          </div>
        )}
        <div style={{ background: '#f9fafb', borderRadius: 20, padding: 20, border: '1px solid #eee' }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Shop China & USA – 15 MOTOMA Products – Build Fixed – Valid 3 Days</h1>
          <p style={{ fontSize: 13, color: '#666', marginTop: 6 }}>All 15 MOTOMA – Build error TS2339 fixed – Ready to deploy</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap:'wrap' }}>
            <button onClick={() => setFilter('all')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='all'?'#111':'#fff', color: filter==='all'?'#fff':'#111', cursor: 'pointer', fontWeight:700 }}>All ({combined.length})</button>
            <button onClick={() => setFilter('motoma')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #bbf7d0', background: filter==='motoma'?'#166534':'#dcfce7', color: filter==='motoma'?'#fff':'#166534', cursor: 'pointer', fontWeight:700 }}>MOTOMA 15 {engineApproved ? '✓' : ''}</button>
            <button onClick={() => setFilter('china')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='china'?'#111':'#fff', color: filter==='china'?'#fff':'#111', cursor: 'pointer' }}>Shop China</button>
            <button onClick={() => setFilter('usa')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='usa'?'#111':'#fff', color: filter==='usa'?'#fff':'#111', cursor: 'pointer' }}>Shop USA</button>
          </div>
        </div>
        {loading ? <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>Loading...</div> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginTop: 20 }}>
            {filtered.map((p:any) => (
              <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 16, overflow: 'hidden', background: '#fff' }}>
                <div style={{ height: 160, background: p.is_motoma ? '#f0fdf4' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, position:'relative' }}>
                  {p.is_motoma ? '🔋' : '📦'}
                  {p.is_motoma && <span style={{ position:'absolute', top:8, left:8, fontSize:8, background:'#dcfce7', border:'1px solid #bbf7d0', padding:'3px 7px', borderRadius:100, fontWeight:800, color:'#166534' }}>MOTOMA Authorized</span>}
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, lineHeight: '1.3' }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{p.supplier_name} • {p.supplier_model} • {p.specs} • {p.source}</div>
                  <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 16 }}>{p.price_ngn===0 ? 'DDP Quote Pending' : `₦${Number(p.price_ngn || 0).toLocaleString()}`}</div>
                      <div style={{ fontSize: 10, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 100, display: 'inline-block', marginTop: 2 }}>Public Auth • Waiting DDP Quote</div>
                    </div>
                    <button onClick={() => setSelected(p)} style={{ background: '#111', color: '#fff', padding: '10px 14px', borderRadius: 100, border: 0, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>Get Quote</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selected && <QuoteModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
