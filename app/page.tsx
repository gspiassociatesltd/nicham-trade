'use client';
import { useState } from 'react';

type Product = {
  id: string;
  brand: 'MOTOMA' | 'MUST';
  model: string;
  image: string;
  capacity: string;
  voltage: string;
  energy: string;
  cycles: string;
  features: string[];
  manufacturer: string;
};

const products: Product[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Grade A+ LiFePO4','SOC Display','WiFi Monitoring'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V', image: '/products/motoma/M69PW_PRO.png', capacity: '300Ah', voltage: '25.6V', energy: '7.68kWh', cycles: '8000 Cycles', features: ['Grade A+ Cells','Touch Screen','7Y Warranty'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah', voltage: '51.2V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Wall Mount','Fresh LiFePO4','60°C Resilience'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah', voltage: '51.2V', energy: '10.24kWh', cycles: '8000 Cycles', features: ['10kWh Power Wall','150A Continuous','WiFi + Touch'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V Rack', image: '/products/motoma/M90_PRO.png', capacity: '320Ah', voltage: '51.2V', energy: '16.38kWh', cycles: '8000 Cycles', features: ['19" Rack Mount','Commercial','200A Peak'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO - 280Ah 51.2V', image: '/products/motoma/M91_PRO.png', capacity: '280Ah', voltage: '51.2V', energy: '14.33kWh', cycles: '8000 Cycles', features: ['High Capacity','Lifetime Support','Smart BMS'], manufacturer: 'MOTOMA Dubai' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid Inverter', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', voltage: '48V', energy: 'MPPT 100A', cycles: 'Pure Sine', features: ['WiFi Monitoring','Parallel 9','LiFePO4 Ready'], manufacturer: 'MUST Factory' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', voltage: '48V', energy: 'MPPT 120A', cycles: 'On/Off Grid', features: ['Dual MPPT','High PV 500V','BMS Comm'], manufacturer: 'MUST Factory' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V Wall Battery', image: '/products/must/MUST_3_656x684.png', capacity: '200Ah', voltage: '48V', energy: '10.24kWh', cycles: '6000 Cycles', features: ['Wall Mount','Grade A Cells','6000 Cycles'], manufacturer: 'MUST Factory' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V Battery', image: '/products/must/MUST_4_526x684.png', capacity: '100Ah', voltage: '48V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['Compact Wall','5kWh Module','Parallel 16'], manufacturer: 'MUST Factory' },
  { id: 'MUST-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V Off-Grid', image: '/products/must/MUST_5_584x553.png', capacity: '5kW', voltage: '48V', energy: 'MPPT 80A', cycles: 'Transformer', features: ['Heavy Duty','Pure Sine','LCD Display'], manufacturer: 'MUST Factory' },
  { id: 'MUST-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', image: '/products/must/MUST_6_472x684.png', capacity: '3kW', voltage: '24V', energy: 'MPPT 60A', cycles: 'Hybrid', features: ['Best Seller','WiFi Opt','Lithium Ready'], manufacturer: 'MUST Factory' },
  { id: 'MUST-24200', brand: 'MUST', model: 'LP16-24200 200Ah 24V', image: '/products/must/MUST_10_446x553.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['24V Large','5kWh','Heavy Duty BMS'], manufacturer: 'MUST Factory' },
  { id: 'MUST-10148', brand: 'MUST', model: 'PV18-10148 10kW 48V 3-Phase', image: '/products/must/MUST_11_433x519.png', capacity: '10kW', voltage: '48V', energy: 'MPPT 2x100A', cycles: '3 Phase', features: ['10kW Hybrid','Dual MPPT','Parallel 9'], manufacturer: 'MUST Factory' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL' | 'MOTOMA' | 'MUST'>('ALL');
  const [toast, setToast] = useState<string | null>(null);
  const filtered = products.filter(p => filter === 'ALL' || p.brand === filter);

  const handleRFQ = (p: Product) => {
    const msg = `Hello NiChAm Trade%0A%0A*RFQ Request*%0AModel: ${p.model}%0ABrand: ${p.brand}%0ACapacity: ${p.capacity} ${p.voltage} (${p.energy})%0AManufacturer: ${p.manufacturer}%0A%0APlease send proforma + availability.`;
    window.open(`https://wa.me/2347050477950?text=${msg}`, '_blank');
    setToast(`RFQ sent for ${p.model}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        *{box-sizing:border-box} body{margin:0}
        .container{max-width:1280px; margin:0 auto; padding:0 20px}
        .header{position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.92); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0; padding:14px 0}
        .logo{display:flex; align-items:center; gap:12px}
        .logo-icon{width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#059669,#eab308); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:22px}
        .badge{display:inline-flex; background:#ecfdf5; color:#047857; padding:6px 12px; border-radius:999px; font-size:12px; font-weight:800}
        .hero{padding:48px 0 24px; text-align:center; max-width:820px; margin:0 auto}
        .hero h1{font-size:46px; line-height:1.05; font-weight:900; margin:14px 0; color:#0f172a; letter-spacing:-1px}
        .btn{padding:11px 22px; border-radius:12px; font-weight:800; font-size:14px; border:none; cursor:pointer; transition:all 0.2s}
        .btn:hover{transform:translateY(-1px)}
        .btn-primary{background:#059669; color:white; box-shadow:0 4px 14px rgba(5,150,105,0.35)}
        .btn-dark{background:#0f172a; color:white}
        .btn-light{background:white; border:1px solid #e2e8f0; color:#0f172a}
        .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:20px; padding:24px 0 80px}
        .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; transition:all 0.25s; display:flex; flex-direction:column}
        .card:hover{transform:translateY(-8px); box-shadow:0 24px 48px rgba(0,0,0,0.13); border-color:#cbd5e1}
        .card-img{height:220px; background:linear-gradient(180deg,#f8fafc 0%,#ffffff 100%); display:flex; align-items:center; justify-content:center; position:relative; padding:16px; border-bottom:1px solid #f1f5f9}
        .card-img img{max-height:180px; max-width:100%; object-fit:contain; transition:transform 0.35s}
        .card:hover .card-img img{transform:scale(1.08)}
        .pill{position:absolute; font-size:10px; font-weight:900; padding:5px 10px; border-radius:999px; letter-spacing:0.5px; text-transform:uppercase; box-shadow:0 2px 8px rgba(0,0,0,0.08)}
        .pill-brand{top:12px; left:12px}
        .pill-moq{top:12px; right:12px; background:#0f172a; color:white}
        .spec{font-size:10px; background:#f1f5f9; padding:4px 9px; border-radius:999px; font-weight:600; color:#334155; border:1px solid #e2e8f0}
        .spec-green{background:#ecfdf5; color:#047857; border-color:#a7f3d0}
        @media(max-width:1100px){.grid4{grid-template-columns:repeat(3,1fr)} .hero h1{font-size:38px}}
        @media(max-width:700px){.grid4{grid-template-columns:repeat(2,1fr)} .hero h1{font-size:32px}}
        @media(max-width:500px){.grid4{grid-template-columns:1fr}}
      `}</style>

      {toast && <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: '#059669', color: 'white', padding: '12px 22px', borderRadius: 14, boxShadow: '0 12px 32px rgba(0,0,0,0.2)', fontWeight: 800, fontSize: 13 }}>✅ {toast}</div>}

      <div className="header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo">
            <div className="logo-icon">N</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 19, lineHeight: 1, color: '#0f172a' }}>NiChAm Trade</div>
              <div style={{ fontSize: 11, color: '#059669', fontWeight: 800, marginTop: 2 }}>Powering Nigeria – Solar & Storage</div>
            </div>
          </div>
          <span style={{ fontSize: 12, background: '#f1f5f9', padding: '7px 12px', borderRadius: 999, fontWeight: 600, color: '#334155', border: '1px solid #e2e8f0' }}>MOTOMA Dubai + MUST Factory</span>
        </div>
      </div>

      <div className="container">
        <div className="hero">
          <div className="badge">⚡ 20 Products Ready – Real Photos Extracted</div>
          <h1>MOTOMA Grade A+ <span style={{ color: '#059669' }}>8000 Cycles</span> & MUST Hybrid Inverters</h1>
          <p style={{ color: '#475569', marginTop: 14, lineHeight: 1.65, fontSize: 15, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            Wall mount, rack mount, hybrid inverters. Professional solar & storage solutions for Nigeria. MOQ mix policy available. All RFQ via WhatsApp.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('MOTOMA')} className={`btn ${filter === 'MOTOMA' ? 'btn-primary' : 'btn-dark'}`}>MOTOMA 6</button>
            <button onClick={() => setFilter('MUST')} className={`btn ${filter === 'MUST' ? 'btn-primary' : 'btn-light'}`}>MUST 14</button>
            <button onClick={() => setFilter('ALL')} className={`btn ${filter === 'ALL' ? 'btn-dark' : 'btn-light'}`}>All 20</button>
          </div>
        </div>

        <div className="grid4">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <div className="card-img">
                <span className="pill pill-brand" style={{ background: p.brand === 'MOTOMA' ? '#059669' : '#eab308', color: p.brand === 'MOTOMA' ? 'white' : 'black' }}>{p.brand}</span>
                <span className="pill pill-moq">Mix Allowed</span>
                <img src={p.image} alt={p.model} onError={(e) => { (e.target as HTMLImageElement).src = '/products/must/RENDER_PAGE_1.png'; }} />
              </div>
              <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 850, fontSize: 13.5, lineHeight: 1.35, minHeight: 36, color: '#0f172a' }}>{p.model}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                  <span className="spec">{p.capacity}</span>
                  <span className="spec">{p.voltage}</span>
                  <span className="spec">{p.energy}</span>
                  <span className="spec spec-green">{p.cycles}</span>
                </div>
                <div style={{ marginTop: 12 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ fontSize: 11.5, color: '#475569', display: 'flex', gap: 7, marginBottom: 4, lineHeight: 1.4 }}>
                      <span style={{ color: '#059669', fontWeight: 900 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Manufacturer</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginTop: 2 }}>{p.manufacturer}</div>
                </div>
                <button onClick={() => handleRFQ(p)} style={{ marginTop: 14, width: '100%', background: '#059669', color: 'white', border: 'none', padding: '13px', borderRadius: 12, fontWeight: 900, fontSize: 13, cursor: 'pointer', letterSpacing: 0.3, boxShadow: '0 4px 14px rgba(5,150,105,0.3)' }}>Request RFQ</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ background: '#0f172a', color: 'white', padding: '28px 0', borderTop: '1px solid #1e293b' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: 13 }}>
          <div><div style={{ fontWeight: 900 }}>NiChAm Trade – Powering Nigeria</div><div style={{ color: '#94a3b8', marginTop: 4, fontSize: 12 }}>MOTOMA Dubai + MUST Factory | GSPI Associates Ltd</div></div>
          <div style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>Professional Solar & Storage Solutions<br />Minna • Abuja • Lagos – Nigeria</div>
        </div>
      </footer>
    </div>
  );
}
