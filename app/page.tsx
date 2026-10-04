'use client'
import { useState } from 'react'
import QuoteModal from './components/QuoteModal'

const MOTOMA_PRODUCTS = [
  { id: 'M68PW', model: 'M68PW PRO', name: 'M68PW PRO - 200Ah 25.6V', capacity: '5.12kWh', voltage: '25.6V Residential', moq: '12 pcs', image: 'https://motoma.com/web/userfiles/product/middle/Residential-energy-storage%20battery-68-2.jpg', desc: '200Ah 25.6V • Grade A+ Cells • 8000 Cycles • Smart BMS • 5.12kWh' },
  { id: 'M69PW', model: 'M69PW PRO', name: 'M69PW PRO - 280Ah 25.6V', capacity: '7.16kWh', voltage: '25.6V High Cap', moq: '12 pcs', image: 'https://motoma.com/web/userfiles/product/middle/LiFePO4-BESS-Battery-25.6V-280Ah-M69PW-PRO.jpg', desc: '280Ah High Capacity • 15+ Years • Factory Verified • 7.16kWh' },
  { id: 'M87PW', model: 'M87PW PRO', name: 'M87PW PRO - 100Ah 51.2V', capacity: '5.12kWh', voltage: '51.2V Compact', moq: '12 pcs', image: 'https://motoma.com/web/userfiles/product/middle/Wall-mount-LiFePO4-battery-51.2V-100AH-M87PW-PRO.jpg', desc: '100Ah 51.2V • 8000 cycles • Smart BMS • Compact Wall-Mounted' },
  { id: 'M88PW', model: 'M88PW PRO', name: 'M88PW PRO - 200Ah 51.2V', capacity: '10.24kWh', voltage: '51.2V Popular', moq: '12 pcs', image: 'https://motoma.com/web/userfiles/product/middle/Solar-ESS-storage-battery-51.2V-200AH-M88PW-PRO.jpg', desc: '200Ah 51.2V • High Cycle Efficiency • 16 Parallel • 10.24kWh' },
  { id: 'M90', model: 'M90 PRO', name: 'M90 PRO - 320Ah 51.2V', capacity: '16.38kWh', voltage: '51.2V Large', moq: '12 pcs', image: 'https://motoma.com/web/userfiles/product/middle/Solar-systems-battery-LiFePO4-51.2V-320AH-M90-PRO.jpg', desc: '320Ah 51.2V • Smart BMS • 15 pcs Parallel • 16.38kWh' },
  { id: 'M91', model: 'M91 PRO', name: 'M91 PRO - 400Ah 51.2V', capacity: '20.48kWh', voltage: '51.2V Flagship', moq: '8 pcs', image: 'https://motoma.com/web/userfiles/product/middle/Energy-backup-UPS-LiFePo4-battery-m91-3.jpg', desc: '400Ah 51.2V • Largest Residential • 20.48kWh • MOQ 8 pcs' },
  { id: 'HV40', model: 'HV-M 40~61', name: 'HV-M 40~61 - High Voltage', capacity: '40-61kWh', voltage: 'High Voltage', moq: '40.96kWh min', image: 'https://motoma.com/web/userfiles/product/middle/High-Voltage-Battery-40-61kWh.jpg', desc: 'High Voltage • Stackable • LiFePO4 • 40-61kWh • Up to 5MWh' },
  { id: 'HV92', model: 'HV-M 92-193', name: 'HV-M 92-193 - 92.16kWh', capacity: '92-193kWh', voltage: 'HV 92-193', moq: '40.96kWh min', image: 'https://motoma.com/web/userfiles/product/middle/HV-M-92-193-92kWh.jpg', desc: '150Ah Module • 92-193kWh • Scalable • High Voltage' },
  { id: 'ESS161', model: 'ESS-MHV PRO 161', name: 'ESS-MHV PRO 161kWh C&I', capacity: '161kWh', voltage: 'C&I 161kWh', moq: '40.96kWh min', image: 'https://motoma.com/web/userfiles/product/middle/ESS-MHV-PRO-161kWh.jpg', desc: 'C&I ESS • 161kWh • Commercial & Industrial • Outdoor Cabinet' },
  { id: 'ESS209', model: 'ESS-MHV PRO 209', name: 'ESS-MHV PRO 209kWh C&I', capacity: '209kWh', voltage: 'C&I 209kWh', moq: '40.96kWh min', image: 'https://motoma.com/web/userfiles/product/middle/ESS-MHV-PRO-209kWh.jpg', desc: 'C&I ESS • 209kWh • High Capacity • 3-Phase' },
  { id: 'M50', model: 'M50-100', name: 'M50-100 - All-in-One', capacity: '100kWh', voltage: 'All-in-One', moq: '40.96kWh min', image: 'https://motoma.com/web/userfiles/product/middle/M50-100-All-in-One-100kWh.jpg', desc: 'All-in-One Cabinet • Hybrid Inverter • 100kWh • C&I' },
  { id: 'BESS', model: 'BESS-500kW/1045kWh', name: 'BESS-500kW/1045kWh', capacity: '1045kWh', voltage: 'BESS 1045kWh', moq: 'Up to 5MWh', image: 'https://motoma.com/web/userfiles/product/middle/BESS-500kW-1045kWh.jpg', desc: 'BESS • 500kW/1045kWh • Containerized • Utility Scale' },
  { id: 'M2500', model: 'M2500-5015', name: 'M2500-5015 - 2.5MW/5MWh', capacity: '5MWh', voltage: 'Container 5MWh', moq: 'Up to 5MWh', image: 'https://motoma.com/web/userfiles/product/middle/M2500-5015-2.5MW-5MWh-Container.jpg', desc: 'Container ESS • 2.5MW/5.015MWh • 40ft Container • Grid Scale' },
  { id: 'FT25', model: 'FT25-690V3450KW', name: 'FT25 Converter', capacity: '3450KW', voltage: 'Converter', moq: '50 pcs', image: 'https://motoma.com/web/userfiles/product/middle/FT25-690V3450KW-Converter.jpg', desc: 'Converter • 3450KW • 690V • High Efficiency • PCS • MOQ 50 pcs' },
  { id: 'M77U', model: 'M77U Series', name: 'Telecom M77U 48V', capacity: '9.6kWh', voltage: 'Telecom 48V', moq: '16 pcs', image: 'https://motoma.com/web/userfiles/product/middle/Telecom-M77U-48V-Rack-Battery.jpg', desc: 'Telecom Battery • 48V • 9.6kWh • 19 inch Rack • MOQ 16 pcs' },
]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [totalCount] = useState(MOTOMA_PRODUCTS.length)

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ background: '#ffffff', borderBottom: '2px solid #0f172a', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #0f172a 0%, #22c55e 100%)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 28, letterSpacing: -1 }}>M</span>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 28, lineHeight: 1, letterSpacing: -0.5, color: '#0f172a' }}>
                NiChAm Trade
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginTop: 2, letterSpacing: 0.5 }}>
                GRADE A+ • 8000 CYCLES • 15+ YEARS • DDP LAGOS • VALID 3 DAYS
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: '#0f172a', color: '#fff', padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 800 }}>
              {totalCount} MODELS • DDP LAGOS
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 20px 16px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#334155', margin: 0, letterSpacing: -0.3 }}>
            Powering Nigeria with MOTOMA Energy Storage
          </h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '8px auto 0', maxWidth: 720, lineHeight: 1.5 }}>
            Lithium Iron Phosphate Batteries • 25.6V & 51.2V Residential • High Voltage & C&I ESS • BESS & Container • Telecom • Grade A+ Cells • 8000 Cycles • 15+ Years • DDP Lagos All Inclusive • Valid 3 Days
          </p>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>✓ Grade A+ Cells</span>
            <span style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>✓ 8000 Cycles</span>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: '#64748b' }}>
            Batteries: 12 pcs Pro Series (M91 Pro 8 pcs) • Other models 16 pcs • Inverters 50 pcs • HV Projects 40.96kWh min up to 5MWh • Solar panel 40HQ container
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {MOTOMA_PRODUCTS.map(p => (
            <div key={p.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 200, background: '#ffffff', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }} onError={(e:any)=>{e.currentTarget.src='https://motoma.com/web/userfiles/product/middle/Residential-energy-storage%20battery-68-2.jpg'}} />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(15,23,42,0.9)', color: '#fff', padding: '5px 10px', borderRadius: 100, fontSize: 10, fontWeight: 800 }}>{p.voltage} • {p.capacity}</div>
                <div style={{ position: 'absolute', top: 10, right: 10, background: '#22c55e', color: '#fff', padding: '5px 10px', borderRadius: 100, fontSize: 10, fontWeight: 800 }}>MOQ: {p.moq}</div>
              </div>
              <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: 0.5 }}>{p.voltage} {p.capacity} MOQ: {p.moq}</div>
                <div style={{ fontWeight: 900, fontSize: 15, marginTop: 4, color: '#0f172a' }}>{p.model}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#334155', marginTop: 2 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>{p.desc}</div>
                <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '3px 8px', borderRadius: 100, fontWeight: 700 }}>Grade A+ Cells MOQ {p.moq}</span>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', gap: 8 }}>
                  <button onClick={() => setSelectedProduct(p)} style={{ flex: 1, background: '#0f172a', color: '#fff', border: 0, padding: '11px', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Get DDP Quote →</button>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 10px', borderRadius: 10, fontSize: 10, fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center' }}>Valid 3 Days</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center', padding: 16, color: '#94a3b8', fontSize: 11 }}>
          NiChAm Trade • DDP Lagos All Inclusive • Valid 3 Days • {totalCount} MODELS • Grade A+ Cells • 8000 Cycles • MOTOMA Factory Verified
        </div>
      </div>

      {selectedProduct && <QuoteModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
