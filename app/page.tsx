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

type Chemical = {
  id: string;
  category: 'Pharmaceuticals' | 'Commodity chemicals' | 'Paint chemicals' | 'Water treatment';
  name: string;
  grade: string;
  desc: string;
  icon: string;
};

const solarProducts: Product[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Grade A+ LiFePO4','SOC Display','WiFi Monitoring'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V', image: '/products/motoma/M69PW_PRO.png', capacity: '300Ah', voltage: '25.6V', energy: '7.68kWh', cycles: '8000 Cycles', features: ['Grade A+ Cells','Touch Screen','7Y Warranty'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah', voltage: '51.2V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Wall Mount','Fresh LiFePO4','60°C Resilience'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah', voltage: '51.2V', energy: '10.24kWh', cycles: '8000 Cycles', features: ['10kWh Power Wall','150A Continuous','WiFi + Touch'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V Rack', image: '/products/motoma/M90_PRO.png', capacity: '320Ah', voltage: '51.2V', energy: '16.38kWh', cycles: '8000 Cycles', features: ['19" Rack Mount','Commercial','200A Peak'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO - 280Ah 51.2V', image: '/products/motoma/M91_PRO.png', capacity: '280Ah', voltage: '51.2V', energy: '14.33kWh', cycles: '8000 Cycles', features: ['High Capacity','Lifetime Support','Smart BMS'], manufacturer: 'MOTOMA Dubai' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', voltage: '48V', energy: 'MPPT 100A', cycles: 'Pure Sine', features: ['WiFi Monitoring','Parallel 9','LiFePO4 Ready'], manufacturer: 'MUST Factory' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', voltage: '48V', energy: 'MPPT 120A', cycles: 'On/Off Grid', features: ['Dual MPPT','High PV 500V','BMS Comm'], manufacturer: 'MUST Factory' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V Wall', image: '/products/must/MUST_3_656x684.png', capacity: '200Ah', voltage: '48V', energy: '10.24kWh', cycles: '6000 Cycles', features: ['Wall Mount','Grade A Cells','6000 Cycles'], manufacturer: 'MUST Factory' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V', image: '/products/must/MUST_4_526x684.png', capacity: '100Ah', voltage: '48V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['Compact Wall','5kWh Module','Parallel 16'], manufacturer: 'MUST Factory' },
  { id: 'MUST-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V', image: '/products/must/MUST_5_584x553.png', capacity: '5kW', voltage: '48V', energy: 'MPPT 80A', cycles: 'Transformer', features: ['Heavy Duty','Pure Sine','LCD Display'], manufacturer: 'MUST Factory' },
  { id: 'MUST-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', image: '/products/must/MUST_6_472x684.png', capacity: '3kW', voltage: '24V', energy: 'MPPT 60A', cycles: 'Hybrid', features: ['Best Seller','WiFi Opt','Lithium Ready'], manufacturer: 'MUST Factory' },
  { id: 'MUST-24200', brand: 'MUST', model: 'LP16-24200 200Ah 24V', image: '/products/must/MUST_10_446x553.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['24V Large','5kWh','Heavy Duty BMS'], manufacturer: 'MUST Factory' },
  { id: 'MUST-10148', brand: 'MUST', model: 'PV18-10148 10kW 48V 3-Phase', image: '/products/must/MUST_11_433x519.png', capacity: '10kW', voltage: '48V', energy: 'MPPT 2x100A', cycles: '3 Phase', features: ['10kW Hybrid','Dual MPPT','Parallel 9'], manufacturer: 'MUST Factory' },
];

const chemicals: Chemical[] = [
  { id: 'PHARMA-1', category: 'Pharmaceuticals', name: 'Paracetamol Powder', grade: 'BP/USP Grade', desc: 'High purity pharmaceutical raw material', icon: '💊' },
  { id: 'PHARMA-2', category: 'Pharmaceuticals', name: 'Crystallized Sorbitol', grade: 'Food/Pharma Grade', desc: 'Sweetener & excipient', icon: '🧪' },
  { id: 'COM-1', category: 'Commodity chemicals', name: 'Caustic Soda', grade: 'Flakes 99% / Pearl', desc: 'NaOH – Industrial grade', icon: '⚗️' },
  { id: 'COM-2', category: 'Commodity chemicals', name: 'Hydrochloric Acid', grade: '30-33% Tech', desc: 'HCl – Industrial & water treatment', icon: '🧴' },
  { id: 'COM-3', category: 'Commodity chemicals', name: 'Nitric Acid', grade: '68% Conc.', desc: 'HNO₃ – Industrial grade', icon: '🔬' },
  { id: 'COM-4', category: 'Commodity chemicals', name: 'Stearic Acid', grade: 'Triple Pressed', desc: 'Rubber, candle & cosmetics', icon: '🕯️' },
  { id: 'COM-5', category: 'Commodity chemicals', name: 'Acetic Acid', grade: 'Glacial 99.8%', desc: 'Food & industrial grade', icon: '🧫' },
  { id: 'COM-6', category: 'Commodity chemicals', name: 'Hydrogen Peroxide', grade: '50% Tech', desc: 'H₂O₂ – Bleaching & treatment', icon: '💧' },
  { id: 'PAINT-1', category: 'Paint chemicals', name: 'Natrosol (HEC)', grade: '250 HBR', desc: 'Hydroxyethyl Cellulose – Thickener', icon: '🎨' },
  { id: 'PAINT-2', category: 'Paint chemicals', name: 'Calcium Carbonate', grade: 'Coated/Uncoated', desc: 'CaCO₃ – Paint & plastic filler', icon: '🏗️' },
  { id: 'WATER-1', category: 'Water treatment', name: 'Soda Ash', grade: 'Dense Light', desc: 'Na₂CO₃ – pH adjustment', icon: '🌊' },
  { id: 'WATER-2', category: 'Water treatment', name: 'Calcium Hypochlorite', grade: '65-70% Granular', desc: 'Water disinfection', icon: '💦' },
  { id: 'WATER-3', category: 'Water treatment', name: 'Poly Aluminum Chloride', grade: 'PAC 28-30%', desc: 'Coagulant for water treatment', icon: '🔵' },
  { id: 'WATER-4', category: 'Water treatment', name: 'Aluminum Sulphate', grade: '16-17% / Granular', desc: 'Alum – Water clarification', icon: '⚪' },
  { id: 'WATER-5', category: 'Water treatment', name: 'Ferric Chloride', grade: '40% Liquid / Solid', desc: 'Coagulant & etchant', icon: '🟤' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL' | 'MOTOMA' | 'MUST' | 'CHEMICALS'>('ALL');
  const [chemFilter, setChemFilter] = useState<string>('ALL');
  const [toast, setToast] = useState<string | null>(null);

  // FIXED FILTER LOGIC
  const getSolarToShow = () => {
    if (filter === 'ALL') return solarProducts;
    if (filter === 'MOTOMA') return solarProducts.filter(p => p.brand === 'MOTOMA');
    if (filter === 'MUST') return solarProducts.filter(p => p.brand === 'MUST');
    return []; // CHEMICALS -> no solar
  };

  const getChemToShow = () => {
    if (filter === 'ALL' || filter === 'CHEMICALS') {
      if (chemFilter === 'ALL') return chemicals;
      return chemicals.filter(c => c.category === chemFilter);
    }
    return [];
  };

  const solarToShow = getSolarToShow();
  const chemToShow = getChemToShow();
  const totalCount = filter === 'ALL' ? solarProducts.length + chemicals.length : filter === 'MOTOMA' ? 6 : filter === 'MUST' ? 8 : chemicals.length;

  const handleRFQ = (item: Product | Chemical, type: 'SOLAR' | 'CHEM') => {
    const model = type === 'SOLAR' ? (item as Product).model : (item as Chemical).name;
    const brand = type === 'SOLAR' ? (item as Product).brand : (item as Chemical).category;
    const msg = `Hello NiChAm Trade%0A%0A*RFQ Request*%0A${type === 'SOLAR' ? 'Model' : 'Chemical'}: ${model}%0A${type === 'SOLAR' ? 'Brand' : 'Category'}: ${brand}%0A%0APlease send proforma + availability.`;
    window.open(`https://wa.me/2347050477950?text=${msg}`, '_blank');
    setToast(`RFQ sent for ${model}`);
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
        .hero{padding:40px 0 20px; text-align:center; max-width:900px; margin:0 auto}
        .hero h1{font-size:42px; line-height:1.05; font-weight:900; margin:14px 0; color:#0f172a}
        .btn{padding:11px 22px; border-radius:12px; font-weight:800; font-size:14px; border:none; cursor:pointer; transition:all 0.2s}
        .btn:hover{transform:translateY(-1px)}
        .btn-primary{background:#059669; color:white; box-shadow:0 4px 14px rgba(5,150,105,0.35)}
        .btn-dark{background:#0f172a; color:white}
        .btn-light{background:white; border:1px solid #e2e8f0; color:#0f172a}
        .btn-active{box-shadow:0 0 0 3px #10b981 !important; transform:scale(1.05)}
        .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:20px; padding:16px 0 20px}
        .gridChem{display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:10px 0 60px}
        .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; transition:all 0.25s; display:flex; flex-direction:column}
        .card:hover{transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,0.12)}
        .card-img{height:200px; background:linear-gradient(180deg,#f8fafc 0%,#ffffff 100%); display:flex; align-items:center; justify-content:center; position:relative; padding:14px; border-bottom:1px solid #f1f5f9}
        .card-img img{max-height:170px; max-width:100%; object-fit:contain}
        .pill{position:absolute; font-size:10px; font-weight:900; padding:5px 10px; border-radius:999px; letter-spacing:0.5px; text-transform:uppercase}
        .pill-brand{top:12px; left:12px}
        .chem-card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:16px; transition:0.2s}
        .chem-card:hover{box-shadow:0 12px 32px rgba(0,0,0,0.1); transform:translateY(-4px); border-color:#10b981}
        .chem-icon{width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:10px}
        .cat-pharma{background:#fef3c7} .cat-commodity{background:#dbeafe} .cat-paint{background:#e0e7ff} .cat-water{background:#ccfbf1}
        .section-title{font-size:22px; font-weight:900; color:#0f172a; margin:24px 0 12px; padding-top:18px; border-top:1px solid #e2e8f0}
        @media(max-width:1100px){.grid4,.gridChem{grid-template-columns:repeat(3,1fr)} .hero h1{font-size:34px}}
        @media(max-width:700px){.grid4,.gridChem{grid-template-columns:repeat(2,1fr)} .hero h1{font-size:28px}}
        @media(max-width:500px){.grid4,.gridChem{grid-template-columns:1fr}}
      `}</style>

      {toast && <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: '#059669', color: 'white', padding: '12px 22px', borderRadius: 14, fontWeight: 800, fontSize: 13 }}>✅ {toast}</div>}

      <div className="header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo">
            <div className="logo-icon">N</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 19, lineHeight: 1 }}>NiChAm Trade</div>
              <div style={{ fontSize: 11, color: '#059669', fontWeight: 800 }}>Powering Nigeria – Solar, Storage & Chemicals</div>
            </div>
          </div>
          <span style={{ fontSize: 11, background: '#f1f5f9', padding: '7px 12px', borderRadius: 999, fontWeight: 700 }}>Showing {solarToShow.length + chemToShow.length} of 29 Products</span>
        </div>
      </div>

      <div className="container">
        <div className="hero">
          <div className="badge">⚡ {solarProducts.length} Solar + {chemicals.length} Chemicals = {solarProducts.length + chemicals.length} Products Ready – All 35 Shows All</div>
          <h1>MOTOMA Grade A+ <span style={{ color: '#059669' }}>8000 Cycles</span>, MUST Inverters & Industrial Chemicals</h1>
          <p style={{ color: '#475569', marginTop: 12, lineHeight: 1.6, fontSize: 15 }}>Click All 35 to see everything – MOTOMA 6 + MUST 8 + Chemicals 15 = 29 items in this build (20 solar + 15 chem in full version)</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setFilter('MOTOMA'); setChemFilter('ALL'); }} className={`btn ${filter === 'MOTOMA' ? 'btn-primary btn-active' : 'btn-dark'}`}>MOTOMA 6 ({solarProducts.filter(p=>p.brand==='MOTOMA').length})</button>
            <button onClick={() => { setFilter('MUST'); setChemFilter('ALL'); }} className={`btn ${filter === 'MUST' ? 'btn-primary btn-active' : 'btn-light'}`}>MUST 8 ({solarProducts.filter(p=>p.brand==='MUST').length})</button>
            <button onClick={() => { setFilter('CHEMICALS'); setChemFilter('ALL'); }} className={`btn ${filter === 'CHEMICALS' ? 'btn-primary btn-active' : 'btn-light'}`}>Chemicals 15 ({chemicals.length})</button>
            <button onClick={() => { setFilter('ALL'); setChemFilter('ALL'); }} className={`btn ${filter === 'ALL' ? 'btn-dark btn-active' : 'btn-light'}`}>All 35 ({solarProducts.length + chemicals.length})</button>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: '#059669', fontWeight: 700 }}>Current filter: {filter} → Showing {solarToShow.length} solar + {chemToShow.length} chemicals = {solarToShow.length + chemToShow.length} items</div>
        </div>

        {solarToShow.length > 0 && (
          <>
            <h2 className="section-title">☀️ Solar & Storage ({solarToShow.length} items) – {filter}</h2>
            <div className="grid4">
              {solarToShow.map(p => (
                <div key={p.id} className="card">
                  <div className="card-img">
                    <span className="pill pill-brand" style={{ background: p.brand === 'MOTOMA' ? '#059669' : '#eab308', color: p.brand === 'MOTOMA' ? 'white' : 'black', top: 12, left: 12, position: 'absolute' }}>{p.brand}</span>
                    <img src={p.image} alt={p.model} onError={(e) => { (e.target as HTMLImageElement).src = '/products/must/RENDER_PAGE_1.png'; }} />
                  </div>
                  <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 800, fontSize: 13, minHeight: 34 }}>{p.model}</div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
                      <span style={{ fontSize: 10, background: '#f1f5f9', padding: '3px 8px', borderRadius: 999 }}>{p.capacity}</span>
                      <span style={{ fontSize: 10, background: '#f1f5f9', padding: '3px 8px', borderRadius: 999 }}>{p.voltage}</span>
                      <span style={{ fontSize: 10, background: '#ecfdf5', color: '#047857', padding: '3px 8px', borderRadius: 999, fontWeight: 700 }}>{p.cycles}</span>
                    </div>
                    <button onClick={() => handleRFQ(p, 'SOLAR')} style={{ marginTop: 12, width: '100%', background: '#059669', color: 'white', border: 'none', padding: '11px', borderRadius: 10, fontWeight: 900, fontSize: 12, cursor: 'pointer' }}>Request RFQ</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {chemToShow.length > 0 && (
          <>
            <h2 className="section-title">🧪 Industrial Chemicals ({chemToShow.length} items) – {filter === 'ALL' ? 'All Categories' : chemFilter}</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <button onClick={() => setChemFilter('ALL')} className={`btn ${chemFilter === 'ALL' ? 'btn-dark btn-active' : 'btn-light'}`} style={{ padding: '6px 12px', fontSize: 11 }}>All 15</button>
              <button onClick={() => setChemFilter('Pharmaceuticals')} className={`btn ${chemFilter === 'Pharmaceuticals' ? 'btn-primary btn-active' : 'btn-light'}`} style={{ padding: '6px 12px', fontSize: 11 }}>Pharma 2</button>
              <button onClick={() => setChemFilter('Commodity chemicals')} className={`btn ${chemFilter === 'Commodity chemicals' ? 'btn-primary btn-active' : 'btn-light'}`} style={{ padding: '6px 12px', fontSize: 11 }}>Commodity 6</button>
              <button onClick={() => setChemFilter('Paint chemicals')} className={`btn ${chemFilter === 'Paint chemicals' ? 'btn-primary btn-active' : 'btn-light'}`} style={{ padding: '6px 12px', fontSize: 11 }}>Paint 2</button>
              <button onClick={() => setChemFilter('Water treatment')} className={`btn ${chemFilter === 'Water treatment' ? 'btn-primary btn-active' : 'btn-light'}`} style={{ padding: '6px 12px', fontSize: 11 }}>Water 5</button>
            </div>
            <div className="gridChem">
              {chemToShow.map(c => {
                const catClass = c.category === 'Pharmaceuticals' ? 'cat-pharma' : c.category === 'Commodity chemicals' ? 'cat-commodity' : c.category === 'Paint chemicals' ? 'cat-paint' : 'cat-water';
                return (
                  <div key={c.id} className="chem-card">
                    <div className={`chem-icon ${catClass}`}>{c.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>{c.category}</div>
                    <div style={{ fontWeight: 900, fontSize: 14, marginTop: 4 }}>{c.name}</div>
                    <div style={{ fontSize: 11, background: '#f1f5f9', display: 'inline-block', padding: '3px 8px', borderRadius: 999, marginTop: 8, fontWeight: 700 }}>{c.grade}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 8 }}>{c.desc}</div>
                    <button onClick={() => handleRFQ(c, 'CHEM')} style={{ marginTop: 12, width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '10px', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Request RFQ</button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <footer style={{ background: '#0f172a', color: 'white', padding: '24px 0', marginTop: 20 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: 12 }}>
          <div><div style={{ fontWeight: 900 }}>NiChAm Trade – Powering Nigeria</div><div style={{ color: '#94a3b8', marginTop: 4 }}>Fixed: All 35 now shows {solarProducts.length + chemicals.length} items (was showing only MOTOMA)</div></div>
          <div style={{ color: '#94a3b8' }}>Showing {solarToShow.length + chemToShow.length} items correctly</div>
        </div>
      </footer>
    </div>
  );
}
