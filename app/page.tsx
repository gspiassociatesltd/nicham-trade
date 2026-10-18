
"use client"
import { useState, useEffect } from 'react'

// BEST CHOICE: Industrial Chemicals PRIMARY + Solar Secondary – All RFQ to +234 705 047 7950
const CHEMICALS = [
  { id: 101, brand: 'CHEMICAL', name: 'Caustic Soda Flakes 99%', cat: 'Industrial Chemical', desc: '99% Purity – 25KG Bags – Drums – High Grade', moq: 'MOQ 5 MT', price: '$420/400/380/MT', manufacturer: '' },
  { id: 102, brand: 'CHEMICAL', name: 'Soda Ash Light', cat: 'Industrial Chemical', desc: '99.2% – Dense & Light – 50KG Bags', moq: 'MOQ 10 MT', price: '$280/265/250/MT', manufacturer: '' },
  { id: 103, brand: 'CHEMICAL', name: 'Hydrogen Peroxide 50%', cat: 'Industrial Chemical', desc: '50% Food Grade – IBC 1000L – Drum 30KG', moq: 'MOQ 5 MT', price: '$550/530/510/MT', manufacturer: '' },
  { id: 104, brand: 'CHEMICAL', name: 'Sodium Hypochlorite 12%', cat: 'Industrial Chemical', desc: '12% – Bleach – Water Treatment – IBC', moq: 'MOQ 5 MT', price: '$180/170/160/MT', manufacturer: '' },
  { id: 105, brand: 'CHEMICAL', name: 'Citric Acid Anhydrous', cat: 'Industrial Chemical', desc: 'Food Grade – 25KG Bags – BP/USP', moq: 'MOQ 2 MT', price: '$850/820/790/MT', manufacturer: '' },
  { id: 106, brand: 'CHEMICAL', name: 'Poly Aluminium Chloride PAC 30%', cat: 'Water Treatment', desc: '30% – Yellow – Water Purification – 25KG Bags', moq: 'MOQ 5 MT', price: '$320/300/280/MT', manufacturer: '' },
  { id: 107, brand: 'CHEMICAL', name: 'Aluminium Sulphate 17%', cat: 'Water Treatment', desc: '17% – Granular – Water Treatment – 50KG Bags', moq: 'MOQ 10 MT', price: '$210/195/180/MT', manufacturer: '' },
  { id: 108, brand: 'CHEMICAL', name: 'Sodium Metabisulphite', cat: 'Industrial Chemical', desc: '97% – Food Grade – 25KG Bags – Preservative', moq: 'MOQ 3 MT', price: '$480/460/440/MT', manufacturer: '' },
]

const SOLAR = [
  { id: 1, brand: 'MOTOMA', name: 'M68PW PRO - 200Ah 25.6V', cat: '25.6V Residential', desc: '200Ah 25.6V Grade A+ 8000 Cycles', moq: 'MOQ 12 pcs', price: '$880/860/840', manufacturer: 'Motoma' },
  { id: 2, brand: 'MOTOMA', name: 'M69PW PRO - 280Ah 25.6V', cat: '25.6V High Cap', desc: '280Ah High Capacity 15+ Years', moq: 'MOQ 12 pcs', price: '$1150/1120/1090', manufacturer: 'Motoma' },
  { id: 3, brand: 'MOTOMA', name: 'M87PW PRO - 100Ah 51.2V', cat: '51.2V Compact', desc: '100Ah 51.2V 8000 cycles Compact', moq: 'MOQ 12 pcs', price: '$590/570/550', manufacturer: 'Motoma' },
  { id: 4, brand: 'MOTOMA', name: 'M88PW PRO - 200Ah 51.2V', cat: '51.2V Popular', desc: '200Ah 51.2V 16 Parallel', moq: 'MOQ 12 pcs', price: '$1080/1050/1020', manufacturer: 'Motoma' },
  { id: 5, brand: 'MUST', name: 'PV18-3224 VPMII', cat: 'High Frequency', desc: '3.2KW 24V 60A MPPT 160V VOC', moq: 'MOQ Mix 1/5/20', price: '$180/168/159', manufacturer: 'Must Power' },
  { id: 6, brand: 'MUST', name: 'PV18-3624 PRO', cat: 'High Frequency', desc: '3.6KW 24V 100A MPPT 400V VOC', moq: 'MOQ Mix 1/5/20', price: '$180/168/159', manufacturer: 'Must Power' },
  { id: 7, brand: 'MUST', name: 'PV18-6048 PRO', cat: 'High Frequency', desc: '6KW 48V 100A MPPT 450V VOC 7.83KGS', moq: 'MOQ Mix 1/5/20', price: '$270/240/227', manufacturer: 'Must Power' },
  { id: 8, brand: 'MUST', name: 'PV19-10048EXP', cat: 'High Frequency', desc: '10KW 48V 150A MPPT 500V VOC WIFI Parallel 17.4KGS', moq: 'MOQ Mix 1/5/20', price: '$520/496/469', manufacturer: 'Must Power' },
  { id: 9, brand: 'MUST', name: 'PH11-10KL1-EU', cat: 'IP65 230V', desc: '10KW 48V IP65 ON/OFF GRID 230V', moq: 'MOQ Mix 1/5/20', price: '$1200/1195/1129', manufacturer: 'Must Power' },
  { id: 10, brand: 'MUST', name: 'PH11-15KL3-EU', cat: 'IP65 380V', desc: '15KW 48V IP65 ON/OFF GRID 380V', moq: 'MOQ Mix 1/5/20', price: '$1580/1572/1484', manufacturer: 'Must Power' },
]

const ALL_PRODUCTS = [...CHEMICALS, ...SOLAR]

export default function Page() {
  const [filter, setFilter] = useState('All')
  const [toast, setToast] = useState('')
  const [rfqs, setRfqs] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('nicham_rfqs')
    if (saved) setRfqs(JSON.parse(saved))
  }, [])

  const filtered = filter === 'All' ? ALL_PRODUCTS : 
                   filter === 'Chemical' ? CHEMICALS :
                   filter === 'Solar' ? SOLAR :
                   ALL_PRODUCTS.filter(p => p.brand === filter)

  const handleRFQ = (p: any) => {
    const isChemical = p.brand === 'CHEMICAL'
    const manufacturerText = isChemical ? '' : `\nManufacturer: ${p.manufacturer}`
    const msg = `🔔 NEW RFQ – NiChAm Trade\n\nProduct: ${p.name}${manufacturerText}\nCategory: ${p.cat}\nDesc: ${p.desc}\nPrice: ${p.price}\n${p.moq}\n\n📍 DDP Lagos, Nigeria\n📍 DDP to Premises Minna, Niger State\n🏢 NiChAm Trade\n\nPlease send DDP price with shipping, delivery time & docs.\n\n_Admin notified – Customer requested quote_`
    
    const newRfq = {
      id: Date.now(),
      product: p.name,
      manufacturer: isChemical ? 'Chemical – No Manufacturer' : p.manufacturer,
      brand: p.brand,
      category: p.cat,
      desc: p.desc,
      price: p.price,
      moq: p.moq,
      ddp: 'Lagos, Nigeria',
      time: new Date().toLocaleString(),
      status: 'New'
    }
    const updated = [newRfq, ...rfqs]
    setRfqs(updated)
    localStorage.setItem('nicham_rfqs', JSON.stringify(updated))
    
    setToast(`✅ RFQ sent to NiChAm Trade +234 705 047 7950 – ${p.name} ${isChemical ? '' : `– Manufacturer: ${p.manufacturer}`} – DDP Lagos – Admin notified`)
    setTimeout(() => setToast(''), 6000)
    window.open(`https://wa.me/2347050477950?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .card { transition: all 0.3s; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
      `}</style>

      <div style={{minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'}}>
        <header style={{background: '#0f172a', color: 'white', padding: '28px 24px'}}>
          <div style={{maxWidth: '1400px', margin: '0 auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{width: '44px', height: '44px', background: 'linear-gradient(135deg, #f59e0b, #eab308)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>🏭</div>
                <div>
                  <h1 style={{fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em'}}>NiChAm Trade – Powering Nigeria</h1>
                  <p style={{color: '#94a3b8', fontSize: '13px', marginTop: '4px'}}>Industrial Chemicals & Solar Solutions – Minna, Niger State – DDP Lagos, Nigeria – Valid 3 Days – EU/US Standards</p>
                </div>
              </div>
              
            </div>
            
            <div style={{marginTop: '18px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              {[
                {key: 'All', label: `All ${ALL_PRODUCTS.length}`},
                {key: 'Chemical', label: `Industrial Chemicals (${CHEMICALS.length})`},
                {key: 'Solar', label: `Solar (${SOLAR.length})`},
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)} style={{
                  padding: '9px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                  border: 'none', cursor: 'pointer',
                  background: filter === f.key ? '#f59e0b' : '#1e293b',
                  color: filter === f.key ? 'black' : 'white'
                }}>{f.label}</button>
              ))}
            </div>
          </div>
        </header>

        {toast && (
          <div style={{position: 'fixed', top: '18px', right: '18px', background: '#16a34a', color: 'white', padding: '14px 18px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', zIndex: 9999, fontWeight: 700, fontSize: '12px', maxWidth: '420px', lineHeight: 1.4}}>
            {toast}
          </div>
        )}

        <div style={{maxWidth: '1400px', margin: '0 auto', padding: '12px 24px', background: '#fffbeb', borderBottom: '1px solid #fde68a', fontSize: '12px', color: '#92400e', fontWeight: 600}}>
          💡 Best Choice: New orientation – Chemicals PRIMARY – All RFQ goes to NiChAm Trade +234 705 047 7950 only – Supplier numbers hidden – RFQ includes Manufacturer name except chemical – DDP Lagos, Nigeria
        </div>

        <main style={{maxWidth: '1400px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px'}}>
          {filtered.map(p => {
            const isChemical = p.brand === 'CHEMICAL'
            const isMotoma = p.brand === 'MOTOMA'
            return (
              <div key={p.id} className="card" style={{
                background: 'white', borderRadius: '18px', padding: '18px',
                border: `1px solid ${isChemical ? '#e0e7ff' : isMotoma ? '#dbeafe' : '#fef3c7'}`,
                borderLeft: `4px solid ${isChemical ? '#6366f1' : isMotoma ? '#3b82f6' : '#f59e0b'}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '20px', background: isChemical ? '#eef2ff' : isMotoma ? '#eff6ff' : '#fffbeb', color: isChemical ? '#4f46e5' : isMotoma ? '#1d4ed8' : '#b45309'}}>
                    {isChemical ? 'CHEMICAL' : `${p.brand} – ${p.manufacturer}`} {isChemical ? '🧪' : isMotoma ? '🇦🇪' : '🇨🇳'}
                  </span>
                  <span style={{fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '20px', background: '#dcfce7', color: '#166534'}}>{p.moq}</span>
                </div>
                <div style={{fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '5px'}}>{p.cat}</div>
                <h3 style={{fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '5px', lineHeight: 1.3}}>{p.name}</h3>
                <p style={{fontSize: '11px', color: '#64748b', marginBottom: '12px', minHeight: '28px', lineHeight: 1.4}}>{p.desc}</p>
                <div style={{background: '#f8fafc', borderRadius: '10px', padding: '9px 12px', fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', border: '1px solid #f1f5f9'}}>{p.price}</div>
                <button onClick={() => handleRFQ(p)} style={{width: '100%', background: '#0f172a', color: 'white', borderRadius: '10px', padding: '11px', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer'}}>
                  Request for Quote – DDP Lagos
                </button>
                <div style={{fontSize: '10px', textAlign: 'center', marginTop: '7px', color: '#94a3b8', fontWeight: 600}}>
                  RFQ → NiChAm Trade +234 705 047 7950 {isChemical ? '' : `– Mfg: ${p.manufacturer}`}
                </div>
              </div>
            )
          })}
        </main>
      </div>
    </>
  )
}

