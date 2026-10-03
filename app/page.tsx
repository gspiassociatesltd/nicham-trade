'use client'
import { useState, useEffect } from 'react'
import QuoteModal from './components/QuoteModal'

type MotomaProduct = {
  id: string
  model: string
  name: string
  kwh: string
  v: string
  desc: string
  tag: string
  color: string
  img: string
  moq: string
}

const MOTOMA: MotomaProduct[] = [
  {"id":"M68PW","model":"M68PW PRO","name":"M68PW PRO – 200Ah 25.6V","kwh":"5.12kWh","v":"25.6V","desc":"Grade A+ Cells • 8000 Cycles • Smart BMS","tag":"25.6V Residential","color":"#f0fdf4","img":"/motoma/M68PW_PRO.png","moq":"12 pcs"},
  {"id":"M69PW","model":"M69PW PRO","name":"M69PW PRO – 280Ah 25.6V","kwh":"7.16kWh","v":"25.6V","desc":"280Ah High Capacity • 15+ Years","tag":"25.6V High Cap","color":"#fefce8","img":"/motoma/M69PW_PRO.png","moq":"12 pcs"},
  {"id":"M87PW","model":"M87PW PRO","name":"M87PW PRO – 100Ah 51.2V","kwh":"5.12kWh","v":"51.2V","desc":"100Ah 51.2V • 8000 cycles • Smart BMS","tag":"51.2V Compact","color":"#eff6ff","img":"/motoma/M87PW_PRO.png","moq":"12 pcs"},
  {"id":"M88PW","model":"M88PW PRO","name":"M88PW PRO – 200Ah 51.2V","kwh":"10.24kWh","v":"51.2V","desc":"200Ah 51.2V • High Cycle Efficiency","tag":"51.2V Popular","color":"#f0fdf4","img":"/motoma/M88PW_PRO.png","moq":"12 pcs"},
  {"id":"M90","model":"M90 PRO","name":"M90 PRO – 320Ah 51.2V","kwh":"16.38kWh","v":"51.2V","desc":"320Ah 51.2V • Smart BMS • 15 pcs Parallel","tag":"51.2V Large","color":"#f5f3ff","img":"/motoma/M90_PRO.png","moq":"12 pcs"},
  {"id":"M91","model":"M91 PRO","name":"M91 PRO – 400Ah 51.2V","kwh":"20.48kWh","v":"51.2V","desc":"400Ah 51.2V • Largest Residential","tag":"51.2V Flagship","color":"#fff7ed","img":"/motoma/M91_PRO.png","moq":"8 pcs"},
  {"id":"HV40","model":"HV-M 40-61","name":"HV-M 40~61 – High Voltage","kwh":"40-61kWh","v":"High Voltage","desc":"High Voltage • Stackable • LiFePO4","tag":"High Voltage","color":"#f8fafc","img":"/motoma/HV-M.png","moq":"40.96kWh min"},
  {"id":"HV92","model":"HV-M 92-193","name":"HV-M 92-193 – 92.16kWh","kwh":"92-193kWh","v":"HV","desc":"150Ah Module • 92-193kWh • Scalable","tag":"HV 92-193","color":"#f8fafc","img":"/motoma/HV-M.png","moq":"40.96kWh min"},
  {"id":"MHV161","model":"ESS-MHV PRO 161","name":"ESS-MHV PRO 161kWh C&I","kwh":"161kWh","v":"C&I","desc":"C&I ESS • 161kWh","tag":"C&I 161kWh","color":"#f0fdf4","img":"/motoma/ESS-MHV.png","moq":"40.96kWh min"},
  {"id":"MHV209","model":"ESS-MHV PRO 209","name":"ESS-MHV PRO 209kWh C&I","kwh":"209kWh","v":"C&I","desc":"C&I ESS • 209kWh","tag":"C&I 209kWh","color":"#f0fdf4","img":"/motoma/ESS-MHV.png","moq":"40.96kWh min"},
  {"id":"M50","model":"M50-100","name":"M50-100 – All-in-One","kwh":"100kWh","v":"50kW","desc":"All-in-One Cabinet • Hybrid Inverter","tag":"All-in-One","color":"#eff6ff","img":"/motoma/M50-100.png","moq":"40.96kWh min"},
  {"id":"BESS","model":"BESS-500kW/1045kWh","name":"BESS-500kW/1045kWh","kwh":"1045kWh","v":"500kW","desc":"BESS • 500kW/1045kWh","tag":"BESS","color":"#f5f3ff","img":"/motoma/BESS.png","moq":"Up to 5MWh"},
  {"id":"M2500","model":"M2500-5015","name":"M2500-5015 – 2.5MW/5MWh","kwh":"5MWh","v":"2.5MW","desc":"Container ESS • 2.5MW/5.015MWh","tag":"Container 5MWh","color":"#fff7ed","img":"/motoma/M2500.png","moq":"Up to 5MWh"},
  {"id":"FT25","model":"FT25-690V3450KW","name":"FT25 Converter","kwh":"3450KW","v":"690V","desc":"Converter • 3450KW • 690V","tag":"Converter","color":"#f8fafc","img":"/motoma/FT25.png","moq":"50 pcs"},
  {"id":"M77U","model":"M77U Series","name":"Telecom M77U 48V","kwh":"9.6kWh","v":"48V","desc":"Telecom Battery • 48V","tag":"Telecom 48V","color":"#f0fdf4","img":"/motoma/M77U.png","moq":"16 pcs"}
]

export default function Home() {
  const [selected, setSelected] = useState<MotomaProduct | null>(null)
  const [filter, setFilter] = useState('all')
  const [micProducts, setMicProducts] = useState<any[]>([])

  const totalCount = MOTOMA.length + micProducts.length

  const filtered = MOTOMA.filter((p) => {
    if (filter === 'all') return true
    if (filter === '25v') return p.v === '25.6V'
    if (filter === '51v') return p.v === '51.2V'
    if (filter === 'hv') return p.v.includes('High') || p.v.includes('HV') || p.tag.includes('C&I')
    if (filter === 'utility') return p.tag.includes('BESS') || p.tag.includes('Container') || p.tag.includes('Converter') || p.tag.includes('Telecom')
    return true
  })

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <header style={{ padding: '18px 28px', background: '#fff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 26 }}>M</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#0f172a' }}>NiChAm Trade × <span style={{ color: '#16a34a' }}>MOTOMA</span></div>
            <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 800 }}>{totalCount} PRODUCTS • GRADE A+ • DDP LAGOS • VALID 3 DAYS</div>
          </div>
        </div>
        <a href="https://wa.me/2347050477950" target="_blank" style={{ background: '#0f172a', color: '#fff', padding: '14px 28px', borderRadius: 100, textDecoration: 'none', fontSize: 14, fontWeight: 800 }}>Get Quote →</a>
      </header>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '24px 28px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'inline-flex', background: '#0f172a', color: '#fff', padding: '8px 16px', borderRadius: 100, fontSize: 11, fontWeight: 800 }}>{totalCount} MODELS • DDP LAGOS • VALID 3 DAYS</div>
          <h1 style={{ fontSize: 40, fontWeight: 900, margin: '16px 0 12px', color: '#0f172a' }}>Powering Nigeria with <span style={{ color: '#16a34a' }}>MOTOMA</span> Energy Storage</h1>
          <p style={{ fontSize: 14, color: '#475569', maxWidth: 720 }}>Lithium Iron Phosphate Batteries • 25.6V & 51.2V Residential • High Voltage & C&I ESS • BESS & Container • Telecom • Grade A+ Cells • 8000 Cycles • 15+ Years • DDP Lagos All Inclusive • Valid 3 Days</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
            <button onClick={()=>setFilter('all')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='all'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='all'?'#0f172a':'#fff', color: filter==='all'?'#fff':'#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>All {totalCount} Products</button>
            <button onClick={()=>setFilter('25v')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='25v'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='25v'?'#0f172a':'#fff', color: filter==='25v'?'#fff':'#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>25.6V (2)</button>
            <button onClick={()=>setFilter('51v')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='51v'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='51v'?'#0f172a':'#fff', color: filter==='51v'?'#fff':'#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>51.2V (4)</button>
            <button onClick={()=>setFilter('hv')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='hv'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='hv'?'#0f172a':'#fff', color: filter==='hv'?'#fff':'#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>High Voltage & C&I</button>
            <button onClick={()=>setFilter('utility')} style={{ padding: '10px 18px', borderRadius: 100, border: filter==='utility'?'1px solid #0f172a':'1px solid #e2e8f0', background: filter==='utility'?'#0f172a':'#fff', color: filter==='utility'?'#fff':'#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>BESS & Container</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
          {filtered.map((p)=>(
            <div key={p.id} style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ height: 280, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: 16 }}>
                <img src={p.img} alt={p.name} style={{ maxWidth: '88%', maxHeight: '88%', objectFit: 'contain' }} />
                <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                  <span style={{ background: '#fff', border: '1px solid #e2e8f0', fontSize: 10, padding: '5px 11px', borderRadius: 100, fontWeight: 800 }}>{p.tag}</span>
                  <span style={{ background: '#0f172a', color: '#fff', fontSize: 10, padding: '5px 11px', borderRadius: 100, fontWeight: 800 }}>{p.kwh}</span>
                  <span style={{ background: '#16a34a', color: '#fff', fontSize: 10, padding: '5px 11px', borderRadius: 100, fontWeight: 800 }}>MOQ: {p.moq}</span>
                </div>
                <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.92)', border: '1px solid #e2e8f0', fontSize: 10, padding: '5px 11px', borderRadius: 100, fontWeight: 700 }}>{p.model}</div>
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontWeight: 900, fontSize: 15, color: '#0f172a' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>{p.desc}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  <span style={{ fontSize: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '4px 10px', borderRadius: 100, fontWeight: 700 }}>Grade A+ Cells</span>
                  <span style={{ fontSize: 10, background: '#0f172a', color: '#fff', padding: '4px 10px', borderRadius: 100, fontWeight: 700 }}>MOQ {p.moq}</span>
                </div>
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700 }}>DDP Lagos • MOQ {p.moq}</div>
                    <div style={{ fontWeight: 900, fontSize: 15, marginTop: 2 }}>Quote Pending</div>
                    <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 700, marginTop: 2 }}>Valid 3 Days • All Inclusive</div>
                  </div>
                  <button onClick={()=>setSelected(p)} style={{ background: '#0f172a', color: '#fff', padding: '12px 20px', borderRadius: 100, border: 0, cursor: 'pointer', fontWeight: 800, fontSize: 12 }}>Get DDP Quote →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && <QuoteModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
