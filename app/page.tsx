"use client"
import { useState } from 'react'

const PRODUCTS = [
  { id: 1, brand: 'MOTOMA', name: 'M68PW PRO - 200Ah 25.6V', cat: '25.6V Residential', desc: '200Ah 25.6V Grade A+ 8000 Cycles', moq: 'MOQ 12 pcs', price: '$880/860/840', wa: '971525803914' },
  { id: 2, brand: 'MOTOMA', name: 'M69PW PRO - 280Ah 25.6V', cat: '25.6V High Cap', desc: '280Ah High Capacity 15+ Years', moq: 'MOQ 12 pcs', price: '$1150/1120/1090', wa: '971525803914' },
  { id: 3, brand: 'MOTOMA', name: 'M87PW PRO - 100Ah 51.2V', cat: '51.2V Compact', desc: '100Ah 51.2V 8000 cycles Compact', moq: 'MOQ 12 pcs', price: '$590/570/550', wa: '971525803914' },
  { id: 4, brand: 'MOTOMA', name: 'M88PW PRO - 200Ah 51.2V', cat: '51.2V Popular', desc: '200Ah 51.2V 16 Parallel', moq: 'MOQ 12 pcs', price: '$1080/1050/1020', wa: '971525803914' },
  { id: 5, brand: 'MUST', name: 'PV18-3224 VPMII', cat: 'High Frequency', desc: '3.2KW 24V 60A MPPT 160V VOC', moq: 'MOQ Mix 1/5/20', price: '$180/168/159', wa: '8618924343876' },
  { id: 6, brand: 'MUST', name: 'PV18-3624 PRO', cat: 'High Frequency', desc: '3.6KW 24V 100A MPPT 400V VOC', moq: 'MOQ Mix 1/5/20', price: '$180/168/159', wa: '8618924343876' },
  { id: 7, brand: 'MUST', name: 'PV18-6048 PRO', cat: 'High Frequency', desc: '6KW 48V 100A MPPT 450V VOC 7.83KGS', moq: 'MOQ Mix 1/5/20', price: '$270/240/227', wa: '8618924343876' },
  { id: 8, brand: 'MUST', name: 'PV19-10048EXP', cat: 'High Frequency', desc: '10KW 48V 150A MPPT 500V VOC WIFI Parallel 17.4KGS', moq: 'MOQ Mix 1/5/20', price: '$520/496/469', wa: '8618924343876' },
  { id: 9, brand: 'MUST', name: 'PH11-10KL1-EU', cat: 'IP65 230V', desc: '10KW 48V IP65 ON/OFF GRID 230V', moq: 'MOQ Mix 1/5/20', price: '$1200/1195/1129', wa: '8618924343876' },
  { id: 10, brand: 'MUST', name: 'PH11-15KL3-EU', cat: 'IP65 380V', desc: '15KW 48V IP65 ON/OFF GRID 380V', moq: 'MOQ Mix 1/5/20', price: '$1580/1572/1484', wa: '8618924343876' },
  { id: 11, brand: 'MUST', name: 'LP16-24200', cat: 'Li 25.6V', desc: '25.6V 200AH 5.12KWH BMS', moq: 'MOQ Mix 1/5/20', price: '$670/642/607', wa: '8618924343876' },
  { id: 12, brand: 'MUST', name: 'LP16-24300', cat: 'Wall Mounted', desc: '25.6V 300AH 7.68KWH WALL MOUNTED', moq: 'MOQ Mix 1/5/20', price: '$880/856/809', wa: '8618924343876' },
  { id: 13, brand: 'MUST', name: 'LP16-48100 SE', cat: '51.2V', desc: '51.2V 100AH 5.12KWH No WiFi kit', moq: 'MOQ Mix 1/5', price: '$630/610/590', wa: '8618924343876' },
  { id: 14, brand: 'MUST', name: 'LP16-48200', cat: '51.2V', desc: '51.2V 200AH 10.24KWH BMS', moq: 'MOQ Mix 1/5/20', price: '$1160/1120/1080', wa: '8618924343876' },
  { id: 15, brand: 'MUST', name: 'LP16-48300', cat: '51.2V High', desc: '51.2V 300AH 15.36KWH BMS', moq: 'MOQ Mix 1/5/20', price: '$1550/1510/1470', wa: '8618924343876' },
  { id: 16, brand: 'MUST', name: 'HBP15-1012', cat: 'ALL IN ONE', desc: '1KW WITH 1.28KWH LITHIUM ALL IN ONE ESS', moq: 'MOQ Mix 1/5', price: '$390/370/350', wa: '8618924343876' },
  { id: 17, brand: 'MUST', name: 'HBP18-3024 OS', cat: 'HBP Series', desc: '3KW 3KWH ALL IN ONE', moq: 'MOQ Mix 1/5/20', price: '$650/620/590', wa: '8618924343876' },
  { id: 18, brand: 'MUST', name: 'HBP18-5548 ES', cat: 'HBP Series', desc: '5.5KW 10.24KWH ESS', moq: 'MOQ Mix 1/5/20', price: '$1572/1520/1480', wa: '8618924343876' },
]

export default function Page() {
  const [filter, setFilter] = useState('All')
  const [toast, setToast] = useState('')

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.brand === filter)

  const handleRFQ = (p: any) => {
    const isMotoma = p.brand === 'MOTOMA'
    const phone = p.wa
    const factory = isMotoma ? 'MOTOMA Dubai Team 🇦🇪' : 'MUST Factory Team 🇨🇳'
    const msg = `Hi ${factory}\n\nRFQ for ${p.name}\n${p.desc}\nPrice: ${p.price}\n\n- DDP Lagos, Nigeria\n- DDP to Premises Minna, Niger State\n- NiChAm Trade\n- Qty: Please quote Tier 1/5/20 (Mix 3 inverters + 2 batteries = 5 units)\n\nAdmin notified – Please send DDP price with shipping & delivery time.`
    setToast(`✅ Admin notified – RFQ for ${p.name} logged – DDP Lagos – Opening WhatsApp ${isMotoma ? '+971 52 580 3914' : '+86 189 2434 3876'}`)
    setTimeout(() => setToast(''), 5000)
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
      `}</style>

      <div style={{minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'}}>
        {/* HEADER – Beautiful Dark Premium */}
        <header style={{background: '#0f172a', color: 'white', padding: '32px 24px'}}>
          <div style={{maxWidth: '1400px', margin: '0 auto'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{width: '48px', height: '48px', background: 'linear-gradient(135deg, #f59e0b, #eab308)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>☀️</div>
              <div>
                <h1 style={{fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em'}}>NiChAm Trade – Powering Nigeria</h1>
                <p style={{color: '#94a3b8', fontSize: '14px', marginTop: '6px', lineHeight: 1.5}}>Source MUSTNG.pdf 14 models + MOTOMA 4 models – Mix MOQ Policy: 3 inverters + 2 batteries = 5 units price – DDP Lagos, Nigeria – Valid 3 Days – Only EU/US Standards</p>
              </div>
            </div>
            
            <div style={{marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
              {[
                {key: 'All', label: 'All 18', count: ''},
                {key: 'MOTOMA', label: 'MOTOMA Dubai 🇦🇪', count: '(4)'},
                {key: 'MUST', label: 'MUST Factory 🇨🇳', count: '(14)'}
              ].map(f => (
                <button 
                  key={f.key} 
                  onClick={() => setFilter(f.key)} 
                  style={{
                    padding: '10px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                    background: filter === f.key ? '#f59e0b' : '#1e293b',
                    color: filter === f.key ? 'black' : 'white',
                    transition: 'all 0.2s'
                  }}
                >
                  {f.label} {f.count}
                </button>
              ))}
            </div>
          </div>
        </header>

        {toast && (
          <div style={{
            position: 'fixed', top: '20px', right: '20px', background: '#16a34a', color: 'white',
            padding: '14px 20px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            zIndex: 9999, fontWeight: 700, fontSize: '13px', maxWidth: '400px'
          }}>
            {toast}
          </div>
        )}

        {/* GRID – Keeps your good 4-column character but beautiful */}
        <main style={{
          maxWidth: '1400px', margin: '0 auto', padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {filtered.map(p => {
            const isMotoma = p.brand === 'MOTOMA'
            return (
              <div 
                key={p.id} 
                className="card"
                style={{
                  background: 'white', borderRadius: '20px', padding: '20px',
                  border: `1px solid ${isMotoma ? '#dbeafe' : '#fef3c7'}`,
                  borderLeft: `4px solid ${isMotoma ? '#3b82f6' : '#f59e0b'}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
                  <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
                    <span style={{
                      fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '20px',
                      background: isMotoma ? '#eff6ff' : '#fffbeb', color: isMotoma ? '#1d4ed8' : '#b45309',
                      border: `1px solid ${isMotoma ? '#bfdbfe' : '#fde68a'}`
                    }}>
                      {p.brand} {isMotoma ? '🇦🇪' : '🇨🇳'}
                    </span>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '20px',
                      background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0'
                    }}>
                      {p.moq}
                    </span>
                  </div>
                </div>

                <div style={{fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'}}>
                  {p.cat}
                </div>

                <h3 style={{fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', lineHeight: 1.3}}>
                  {p.name}
                </h3>

                <p style={{fontSize: '12px', color: '#64748b', marginBottom: '12px', minHeight: '32px', lineHeight: 1.4}}>
                  {p.desc}
                </p>

                <div style={{
                  background: '#f8fafc', borderRadius: '10px', padding: '10px 12px',
                  fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '14px',
                  border: '1px solid #f1f5f9', letterSpacing: '-0.01em'
                }}>
                  {p.price}
                </div>

                <button 
                  onClick={() => handleRFQ(p)} 
                  style={{
                    width: '100%', background: '#0f172a', color: 'white', borderRadius: '12px',
                    padding: '12px', fontSize: '13px', fontWeight: 700, border: 'none',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = 'black')}
                  onMouseOut={e => (e.currentTarget.style.background = '#0f172a')}
                >
                  Request for Quote – DDP Lagos
                </button>

                <div style={{fontSize: '10px', textAlign: 'center', marginTop: '8px', color: '#94a3b8', fontWeight: 600}}>
                  WhatsApp {isMotoma ? '+971 52 580 3914' : '+86 189 2434 3876'}
                </div>
              </div>
            )
          })}
        </main>

        <footer style={{textAlign: 'center', padding: '24px', fontSize: '12px', color: '#94a3b8'}}>
          NiChAm Trade – Minna, Niger State – DDP to Premises – MOTOMA Dubai 🇦🇪 +971 52 580 3914 | MUST Factory 🇨🇳 +86 189 2434 3876 – Admin notified on all RFQs – DDP Lagos, Nigeria
        </footer>
      </div>
    </>
  )
}
