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
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '8000 Cycles', manufacturer: 'MOTOMA Dubai' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V', image: '/products/motoma/M69PW_PRO.png', capacity: '300Ah', voltage: '25.6V', energy: '7.68kWh', cycles: '8000 Cycles', manufacturer: 'MOTOMA Dubai' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah', voltage: '51.2V', energy: '5.12kWh', cycles: '8000 Cycles', manufacturer: 'MOTOMA Dubai' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah', voltage: '51.2V', energy: '10.24kWh', cycles: '8000 Cycles', manufacturer: 'MOTOMA Dubai' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V Rack', image: '/products/motoma/M90_PRO.png', capacity: '320Ah', voltage: '51.2V', energy: '16.38kWh', cycles: '8000 Cycles', manufacturer: 'MOTOMA Dubai' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO - 280Ah 51.2V', image: '/products/motoma/M91_PRO.png', capacity: '280Ah', voltage: '51.2V', energy: '14.33kWh', cycles: '8000 Cycles', manufacturer: 'MOTOMA Dubai' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', voltage: '48V', energy: 'MPPT 100A', cycles: 'Pure Sine', manufacturer: 'MUST Factory' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', voltage: '48V', energy: 'MPPT 120A', cycles: 'On/Off Grid', manufacturer: 'MUST Factory' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V Wall', image: '/products/must/MUST_3_656x684.png', capacity: '200Ah', voltage: '48V', energy: '10.24kWh', cycles: '6000 Cycles', manufacturer: 'MUST Factory' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V', image: '/products/must/MUST_4_526x684.png', capacity: '100Ah', voltage: '48V', energy: '5.12kWh', cycles: '6000 Cycles', manufacturer: 'MUST Factory' },
  { id: 'MUST-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V', image: '/products/must/MUST_5_584x553.png', capacity: '5kW', voltage: '48V', energy: 'MPPT 80A', cycles: 'Transformer', manufacturer: 'MUST Factory' },
  { id: 'MUST-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', image: '/products/must/MUST_6_472x684.png', capacity: '3kW', voltage: '24V', energy: 'MPPT 60A', cycles: 'Hybrid', manufacturer: 'MUST Factory' },
  { id: 'MUST-24200', brand: 'MUST', model: 'LP16-24200 200Ah 24V', image: '/products/must/MUST_10_446x553.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '6000 Cycles', manufacturer: 'MUST Factory' },
  { id: 'MUST-10148', brand: 'MUST', model: 'PV18-10148 10kW 48V 3-Phase', image: '/products/must/MUST_11_433x519.png', capacity: '10kW', voltage: '48V', energy: 'MPPT 2x100A', cycles: '3 Phase', manufacturer: 'MUST Factory' },
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
  const [toast, setToast] = useState<string | null>(null);

  const solarToShow = filter === 'ALL' ? solarProducts : filter === 'MOTOMA' ? solarProducts.filter(p => p.brand === 'MOTOMA') : filter === 'MUST' ? solarProducts.filter(p => p.brand === 'MUST') : [];
  const chemToShow = filter === 'ALL' || filter === 'CHEMICALS' ? chemicals : [];

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
        .header{position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.96); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0}
        .header-inner{display:flex; justify-content:center; align-items:center; flex-direction:column; padding:18px 0 14px; text-align:center}
        .logo-icon{width:64px; height:64px; border-radius:16px; background:linear-gradient(135deg,#059669,#10b981,#eab308); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:32px; box-shadow:0 8px 24px rgba(5,150,105,0.35)}
        .brand-name{font-size:42px; font-weight:900; letter-spacing:-1.5px; color:#0f172a; line-height:1; margin-top:8px}
        .brand-sub{font-size:13px; font-weight:800; color:#059669; letter-spacing:1px; text-transform:uppercase; margin-top:4px}
        .hero{padding:28px 0 18px; text-align:center; max-width:900px; margin:0 auto}
        .hero-subtitle{font-size:18px; line-height:1.4; font-weight:600; color:#334155; margin:10px auto; max-width:720px}
        .hero-desc{color:#64748b; font-size:14px; line-height:1.5; margin-top:6px}
        .btn{padding:12px 22px; border-radius:12px; font-weight:800; font-size:13px; border:none; cursor:pointer; transition:all 0.2s}
        .btn:hover{transform:translateY(-1px); box-shadow:0 6px 18px rgba(0,0,0,0.12)}
        .btn-primary{background:#059669; color:white; box-shadow:0 4px 14px rgba(5,150,105,0.35)}
        .btn-dark{background:#0f172a; color:white}
        .btn-light{background:white; border:1px solid #e2e8f0; color:#0f172a}
        .btn-active{box-shadow:0 0 0 3px #10b981 !important; transform:scale(1.05)}
        .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:20px; padding:18px 0 20px}
        .gridChem{display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:10px 0 60px}
        .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; transition:all 0.25s; display:flex; flex-direction:column}
        .card:hover{transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,0.12)}
        .card-img{height:200px; background:linear-gradient(180deg,#f8fafc 0%,#ffffff 100%); display:flex; align-items:center; justify-content:center; position:relative; padding:14px; border-bottom:1px solid #f1f5f9}
        .card-img img{max-height:170px; max-width:100%; object-fit:contain}
        .pill{position:absolute; font-size:10px; font-weight:900; padding:5px 10px; border-radius:999px; text-transform:uppercase; top:12px; left:12px}
        .chem-card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:16px; transition:0.2s}
        .chem-card:hover{box-shadow:0 12px 32px rgba(0,0,0,0.1); transform:translateY(-4px); border-color:#10b981}
        .chem-icon{width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:10px}
        .cat-pharma{background:#fef3c7} .cat-commodity{background:#dbeafe} .cat-paint{background:#e0e7ff} .cat-water{background:#ccfbf1}
        .section-title{font-size:20px; font-weight:900; color:#0f172a; margin:28px 0 14px; padding-top:20px; border-top:1px solid #e2e8f0}
        @media(max-width:1100px){.grid4,.gridChem{grid-template-columns:repeat(3,1fr)} .brand-name{font-size:36px}}
        @media(max-width:700px){.grid4,.gridChem{grid-template-columns:repeat(2,1fr)} .brand-name{font-size:32px} .hero-subtitle{font-size:16px}}
        @media(max-width:500px){.grid4,.gridChem{grid-template-columns:1fr} .brand-name{font-size:28px}}
      `}</style>

      {toast && <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: '#059669', color: 'white', padding: '12px 22px', borderRadius: 14, fontWeight: 800 }}>✅ {toast}</div>}

      <div className="header">
        <div className="container">
          <div className="header-inner">
            <div className="logo-icon">N</div>
            <div className="brand-name">NiChAm Trade</div>
            <div className="brand-sub">Powering Nigeria – Solar, Storage & Chemicals</div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero">
          <div className="hero-subtitle">MOTOMA Grade A+ <span style={{ color: '#059669', fontWeight: 900 }}>8000 Cycles</span>, MUST Inverters & Industrial Chemicals</div>
          <div className="hero-desc">Wall mount, rack mount, hybrid inverters + Pharmaceuticals, commodity chemicals, paint chemicals & water treatment solutions for Nigeria.</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('MOTOMA')} className={`btn ${filter === 'MOTOMA' ? 'btn-primary btn-active' : 'btn-dark'}`}>MOTOMA</button>
            <button onClick={() => setFilter('MUST')} className={`btn ${filter === 'MUST' ? 'btn-primary btn-active' : 'btn-light'}`}>MUST</button>
            <button onClick={() => setFilter('CHEMICALS')} className={`btn ${filter === 'CHEMICALS' ? 'btn-primary btn-active' : 'btn-light'}`}>Industrial Chemicals</button>
            <button onClick={() => setFilter('ALL')} className={`btn ${filter === 'ALL' ? 'btn-dark btn-active' : 'btn-light'}`}>All</button>
          </div>
        </div>

        {solarToShow.length > 0 && (
          <>
            <h2 className="section-title">☀️ Solar & Storage – MOTOMA Dubai + MUST Factory</h2>
            <div className="grid4">
              {solarToShow.map(p => (
                <div key={p.id} className="card">
                  <div className="card-img">
                    <span className="pill" style={{ background: p.brand === 'MOTOMA' ? '#059669' : '#eab308', color: p.brand === 'MOTOMA' ? 'white' : 'black' }}>{p.brand}</span>
                    <img src={p.image} alt={p.model} />
                  </div>
                  <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 800, fontSize: 13, minHeight: 34 }}>{p.model}</div>
                    <button onClick={() => handleRFQ(p, 'SOLAR')} style={{ marginTop: 12, width: '100%', background: '#059669', color: 'white', border: 'none', padding: '11px', borderRadius: 10, fontWeight: 900, fontSize: 12, cursor: 'pointer' }}>Request RFQ</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {chemToShow.length > 0 && (
          <>
            <h2 className="section-title">🧪 Industrial Chemicals</h2>
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
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 12, textAlign: 'center' }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>NiChAm Trade – Powering Nigeria</div>
          <div style={{ color: '#94a3b8' }}>MOTOMA Dubai + MUST Factory | Industrial Chemicals | GSPI Associates Ltd</div>
        </div>
      </footer>
    </div>
  );
}
