'use client'
import { useState } from 'react'
import QuoteModal from './components/QuoteModal'

const MOTOMA_PRODUCTS = [
  { model: "M68PW PRO", title: "M68PW PRO – 200Ah 25.6V", subtitle: "Lithium Iron Phosphate Battery • 5.12kWh • Grade A+ Cells • 8000 Cycles", capacity: "5.12kWh", voltage: "25.6V", ah: "200Ah", badge: "25.6V Residential", image: "🔋", color: "#f0fdf4", accent: "#16a34a" },
  { model: "M69PW PRO", title: "M69PW PRO – 280Ah 25.6V", subtitle: "Lithium Iron Phosphate Battery • 7.16kWh • 15+ Years Life • Advanced Touch Screen", capacity: "7.16kWh", voltage: "25.6V", ah: "280Ah", badge: "25.6V High Capacity", image: "🔋", color: "#fef9c3", accent: "#ca8a04" },
  { model: "M87PW PRO", title: "M87PW PRO – 100Ah 51.2V", subtitle: "5.12kWh • 8000 cycles @80% DoD • Smart BMS • Wi-Fi • Touch Screen", capacity: "5.12kWh", voltage: "51.2V", ah: "100Ah", badge: "51.2V Compact", image: "⚡", color: "#f0fdf4", accent: "#16a34a" },
  { model: "M88PW PRO", title: "M88PW PRO – 200Ah 51.2V", subtitle: "10.24kWh • High Cycle Efficiency • Extended Durability • Grade A+ Cells", capacity: "10.24kWh", voltage: "51.2V", ah: "200Ah", badge: "51.2V Popular", image: "⚡", color: "#eff6ff", accent: "#2563eb" },
  { model: "M90 PRO", title: "M90 PRO – 320Ah 51.2V", subtitle: "16.38kWh • Compatible Deye • Growatt • Solis • Smart BMS", capacity: "16.38kWh", voltage: "51.2V", ah: "320Ah", badge: "51.2V Large", image: "🔋", color: "#f5f3ff", accent: "#7c3aed" },
  { model: "M91 PRO", title: "M91 PRO – 400Ah 51.2V", subtitle: "20.48kWh • Largest Residential • 15 pcs Parallel • Wi-Fi & Bluetooth", capacity: "20.48kWh", voltage: "51.2V", ah: "400Ah", badge: "51.2V Flagship", image: "🔋", color: "#fff7ed", accent: "#ea580c" },
  { model: "HV-M 40~61", title: "HV-M 40~61 – High Voltage Battery", subtitle: "40-61kWh • High Voltage • LiFePO4 • Stackable • C&I Ready", capacity: "40-61kWh", voltage: "High Voltage", ah: "", badge: "High Voltage", image: "🏢", color: "#f8fafc", accent: "#0f172a" },
  { model: "HV-M 92-193", title: "HV-M 92-193 – 92.16kWh", subtitle: "150Ah • 51.2V Module • 92-193kWh • High Voltage • Scalable", capacity: "92-193kWh", voltage: "HV", ah: "150Ah", badge: "HV 92-193", image: "🏢", color: "#f8fafc", accent: "#0f172a" },
  { model: "ESS-MHV PRO 161", title: "ESS-MHV PRO 161kWh", subtitle: "C&I Energy Storage System • Compact • Outdoor-Ready • 161kWh", capacity: "161kWh", voltage: "C&I ESS", ah: "", badge: "C&I 161kWh", image: "🏭", color: "#f0fdf4", accent: "#16a34a" },
  { model: "ESS-MHV PRO 209", title: "ESS-MHV PRO 209kWh", subtitle: "C&I Energy Storage System • 209kWh • Scalable • Outdoor", capacity: "209kWh", voltage: "C&I ESS", ah: "", badge: "C&I 209kWh", image: "🏭", color: "#f0fdf4", accent: "#16a34a" },
  { model: "M50-100", title: "M50-100 – All-in-One 50kW/100kWh", subtitle: "Smart ESS Unit • Hybrid Inverter • Battery Cluster • All-in-One Cabinet", capacity: "100kWh", voltage: "50kW", ah: "", badge: "All-in-One", image: "🔌", color: "#eff6ff", accent: "#2563eb" },
  { model: "BESS-500kW/1045kWh", title: "BESS-500kW/1045kWh", subtitle: "Battery Energy Storage System • 1045kWh • 500kW • Centralized", capacity: "1045kWh", voltage: "500kW", ah: "", badge: "BESS", image: "🏗️", color: "#f5f3ff", accent: "#7c3aed" },
  { model: "M2500-5015", title: "M2500-5015 – Container ESS 2.5MW/5MWh", subtitle: "Liquid-Cooling Container ESS • 2.5MW/5.015MWh • Utility Scale", capacity: "5MWh", voltage: "2.5MW", ah: "", badge: "Container 5MWh", image: "🚛", color: "#fff7ed", accent: "#ea580c" },
  { model: "FT25-690V3450KW", title: "FT25-690V3450KW Converter", subtitle: "Centralized Medium-Voltage Converter System • 3450KW • 690V", capacity: "3450KW", voltage: "690V", ah: "", badge: "Converter", image: "⚙️", color: "#f8fafc", accent: "#0f172a" },
  { model: "M77U Series", title: "Telecom Battery M77U – 48V", subtitle: "100AH/150AH/200AH • 48V Telecom • M77U/M72U/M78U • LiFePO4", capacity: "9.6kWh", voltage: "48V", ah: "200Ah", badge: "Telecom 48V", image: "📡", color: "#f0fdf4", accent: "#16a34a" },
]

export default function Home() {
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState('all')
  const [authOpen, setAuthOpen] = useState(false)

  const filtered = MOTOMA_PRODUCTS.filter(p => {
    if (filter === 'all') return true
    if (filter === '25v') return p.voltage === '25.6V'
    if (filter === '51v') return p.voltage === '51.2V'
    if (filter === 'hv') return p.voltage.includes('High') || p.voltage.includes('HV') || p.voltage.includes('C&I') || p.capacity.includes('kWh') && parseInt(p.capacity) > 30
    if (filter === 'bess') return p.badge.includes('BESS') || p.badge.includes('Container') || p.badge.includes('Converter') || p.badge.includes('Telecom')
    return true
  })

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', background: '#fcfcfd', minHeight: '100vh' }}>
      {/* WORLD CLASS HEADER */}
      <header style={{ padding: '16px 28px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18 }}>M</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.5px', color: '#0f172a' }}>NiChAm Trade <span style={{ fontWeight: 400, color: '#64748b' }}>×</span> MOTOMA</div>
            <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Authorized • 15 Products • Public Display Safe</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={()=>setAuthOpen(!authOpen)} style={{ fontSize: 12, padding: '8px 16px', borderRadius: 100, border: '1px solid #e2e8f0', background: '#fff', fontWeight: 600, cursor: 'pointer' }}>{authOpen ? 'Hide Auth' : 'View Authorization'}</button>
          <a href="https://wa.me/2347050477950" target="_blank" style={{ background: '#0f172a', color: '#fff', padding: '10px 20px', borderRadius: 100, textDecoration: 'none', fontSize: 13, fontWeight: 800, letterSpacing: '0.2px' }}>Get DDP Quote →</a>
        </div>
      </header>

      {/* HERO – WORLD CLASS */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 28px 24px' }}>
        {authOpen && (
          <div style={{ background: '#fff', border: '1px solid #dcfce7', borderRadius: 16, padding: 16, marginBottom: 20, fontSize: 12, lineHeight: 1.6 }}>
            <b style={{ color: '#166534' }}>MOTOMA AUTHORIZATION – Public Display Safe (No Secrets)</b><br/>Date: 02/10/2026 • Ref: MOTOMA/NiChAm/PUBLIC/2026 • From: MOTOMA Power Technology Co., Ltd – China • To: NiChAm Trade – https://nicham-trade.vercel.app<br/>MOTOMA authorizes NiChAm Trade to list 15 MOTOMA products, use official images/specs/logo, collect RFQs – Nigeria non-exclusive – 12 months renewable – Private commercial terms separate.
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20, marginBottom: 28 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 800, color: '#166534', letterSpacing: '0.5px' }}><span style={{ width: 6, height: 6, background: '#16a34a', borderRadius: 10, display: 'inline-block' }}></span>MOTOMA AUTHORIZED • 15 PRODUCTS • GRADE A+ CELLS • 8000 CYCLES</div>
            <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 0.95, margin: '14px 0 12px', color: '#0f172a' }}>Powering Nigeria with <span style={{ color: '#16a34a' }}>MOTOMA</span> Energy Storage</h1>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.5, maxWidth: 560, margin: 0 }}>Lithium Iron Phosphate Batteries • 25.6V & 51.2V Residential • High Voltage & C&I ESS • BESS & Container • Telecom • DDP Lagos Quote Pending • Valid 3 Days</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <button onClick={()=>setFilter('all')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='all'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='all'?'#0f172a':'#fff', color: filter==='all'?'#fff':'#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>All 15 Products</button>
              <button onClick={()=>setFilter('25v')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='25v'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='25v'?'#0f172a':'#fff', color: filter==='25v'?'#fff':'#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>25.6V (2)</button>
              <button onClick={()=>setFilter('51v')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='51v'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='51v'?'#0f172a':'#fff', color: filter==='51v'?'#fff':'#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>51.2V (4)</button>
              <button onClick={()=>setFilter('hv')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='hv'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='hv'?'#0f172a':'#fff', color: filter==='hv'?'#fff':'#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>High Voltage & C&I</button>
              <button onClick={()=>setFilter('bess')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='bess'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='bess'?'#0f172a':'#fff', color: filter==='bess'?'#fff':'#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>BESS & Container</button>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', borderRadius: 20, padding: 20, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '1px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>DDP Lagos • Valid 3 Days • AfricanIES Protection</div>
              <div style={{ fontSize: 20, fontWeight: 900, marginTop: 8, lineHeight: 1.2 }}>Factory Verified • PSI by SGS/BV • 110% Insurance • GIG Last-Mile 36 States</div>
              <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 8, lineHeight: 1.5 }}>AfricanIES visits factory BEFORE paying – bears risk – Safest for buyer. GIG handles Lagos→36 States delivery. Made-in-China affiliate pending – Bind-z2tiU1 – alex@made-in-china.com</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '8px 12px', fontSize: 11 }}><div style={{ color: '#94a3b8', fontSize: 10 }}>Products</div><div style={{ fontWeight: 900, fontSize: 14 }}>15 Models</div></div>
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '8px 12px', fontSize: 11 }}><div style={{ color: '#94a3b8', fontSize: 10 }}>Cells</div><div style={{ fontWeight: 900, fontSize: 14 }}>Grade A+ • 8000 Cycles</div></div>
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '8px 12px', fontSize: 11 }}><div style={{ color: '#94a3b8', fontSize: 10 }}>Warranty</div><div style={{ fontWeight: 900, fontSize: 14 }}>15+ Years</div></div>
            </div>
          </div>
        </div>

        {/* WORLD CLASS PRODUCT GRID – ONLY MOTOMA – NO EXTRACTION MACHINE TEXT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {filtered.map((p:any)=>(
            <div key={p.model} style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <div style={{ height: 200, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: 64, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>{p.image}</div>
                <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                  <span style={{ background: '#fff', border: '1px solid #e2e8f0', fontSize: 10, padding: '4px 10px', borderRadius: 100, fontWeight: 800, color: '#0f172a', letterSpacing: '0.3px' }}>{p.badge}</span>
                  <span style={{ background: p.accent, color: '#fff', fontSize: 10, padding: '4px 10px', borderRadius: 100, fontWeight: 800 }}>{p.capacity}</span>
                </div>
                <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 10, padding: '5px 10px', borderRadius: 100, fontWeight: 700 }}>{p.voltage} • {p.ah || p.model}</div>
              </div>
              <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 900, fontSize: 15, lineHeight: 1.2, color: '#0f172a', letterSpacing: '-0.3px' }}>{p.title}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>{p.subtitle}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '4px 10px', borderRadius: 100, fontWeight: 700 }}>Grade A+ Cells</span>
                  <span style={{ fontSize: 10, background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: 100, fontWeight: 600 }}>8000 Cycles @80% DoD</span>
                  <span style={{ fontSize: 10, background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: 100, fontWeight: 600 }}>15+ Years</span>
                  <span style={{ fontSize: 10, background: '#0f172a', color: '#fff', padding: '4px 10px', borderRadius: 100, fontWeight: 700 }}>MOTOMA Authorized</span>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>DDP Lagos Quote</div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: '#0f172a', marginTop: 2 }}>Pending MOTOMA</div>
                    <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 700, marginTop: 2 }}>Valid 3 Days • Public Safe</div>
                  </div>
                  <button onClick={()=>setSelected({ title: p.title, supplier_model: p.model, category: p.badge, ...p })} style={{ background: '#0f172a', color: '#fff', padding: '12px 20px', borderRadius: 100, border: 0, cursor: 'pointer', fontWeight: 800, fontSize: 12, letterSpacing: '0.3px' }}>Get DDP Quote →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, background: '#fff', border: '1px solid #f1f5f9', borderRadius: 20, padding: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 14, color: '#0f172a' }}>15 MOTOMA Models – World Class Energy Storage – Authorized Reseller Nigeria</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>M68PW PRO 200Ah • M69PW PRO 280Ah • M87PW PRO 100Ah • M88PW PRO 200Ah • M90 PRO 320Ah • M91 PRO 400Ah • HV-M • ESS-MHV PRO • M50-100 • BESS • M2500-5015 • FT25 • M77U Telecom • Grade A+ Cells • Smart BMS • Wi-Fi • Touch Screen</div>
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>AfricanIES factory visit before payment – bears risk • GIG Lagos→36 States • PSI SGS/BV/Intertek • 110% Insurance • Flutterwave Escrow Option A+ Protected</div>
        </div>
      </div>
      {selected && <QuoteModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
