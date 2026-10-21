'use client';
import { useState } from 'react';

type Product = {
  id: string;
  brand: 'MOTOMA' | 'MUST';
  model: string;
  image: string;
  capacity: string;
  _manufacturer: string;
  _phone: string;
  _platform: string;
};

type Chemical = {
  id: string;
  category: string;
  name: string;
  grade: string;
  icon: string;
  _manufacturer: string;
  _phone: string;
  _platform: string;
};

const solarProducts: Product[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V 5.12kWh', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah 25.6V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct China' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V 7.68kWh', image: '/products/motoma/M69PW_PRO.png', capacity: '300Ah 25.6V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct China' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V 5.12kWh', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct China' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V 10.24kWh', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct China' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V 16.38kWh Rack', image: '/products/motoma/M90_PRO.png', capacity: '320Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct China' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO - 280Ah 51.2V 14.33kWh', image: '/products/motoma/M91_PRO.png', capacity: '280Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct China' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid Inverter', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', _manufacturer: 'MUST Power Factory Guangdong China', _phone: '+86 189 2434 3876', _platform: 'Factory Direct China' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid Inverter', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', _manufacturer: 'MUST Power Factory Guangdong China', _phone: '+86 189 2434 3876', _platform: 'Factory Direct China' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V 10.24kWh Wall', image: '/products/must/MUST_3_656x684.png', capacity: '200Ah 48V', _manufacturer: 'MUST Power Factory Guangdong China', _phone: '+86 189 2434 3876', _platform: 'Factory Direct China' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V 5.12kWh', image: '/products/must/MUST_4_526x684.png', capacity: '100Ah 48V', _manufacturer: 'MUST Power Factory Guangdong China', _phone: '+86 189 2434 3876', _platform: 'Factory Direct China' },
  { id: 'MUST-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V', image: '/products/must/MUST_5_584x553.png', capacity: '5kW', _manufacturer: 'MUST Power Factory Guangdong China', _phone: '+86 189 2434 3876', _platform: 'Factory Direct China' },
  { id: 'MUST-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', image: '/products/must/MUST_6_472x684.png', capacity: '3kW', _manufacturer: 'MUST Power Factory Guangdong China', _phone: '+86 189 2434 3876', _platform: 'Factory Direct China' },
];

const chemicals: Chemical[] = [
  { id: 'PHARMA-1', category: 'Pharmaceuticals', name: 'Paracetamol Powder', grade: 'BP/USP Grade', icon: '💊', _manufacturer: 'Shanghai Medichem China', _phone: '+86 138 1756 9021', _platform: 'Alibaba Gold' },
  { id: 'PHARMA-2', category: 'Pharmaceuticals', name: 'Crystallized Sorbitol', grade: 'Food/Pharma Grade', icon: '🧪', _manufacturer: 'Shanghai Medichem China', _phone: '+86 138 1756 9021', _platform: 'Alibaba Gold' },
  { id: 'COM-1', category: 'Commodity chemicals', name: 'Caustic Soda', grade: 'Flakes 99%', icon: '⚗️', _manufacturer: 'Shandong Haihua China', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'COM-2', category: 'Commodity chemicals', name: 'Hydrochloric Acid', grade: '30-33% Tech', icon: '🧴', _manufacturer: 'Guangzhou Tinci China', _phone: '+86 135 6032 8890', _platform: 'Alibaba Gold' },
  { id: 'COM-3', category: 'Commodity chemicals', name: 'Nitric Acid', grade: '68% Conc.', icon: '🔬', _manufacturer: 'Guangzhou Tinci China', _phone: '+86 135 6032 8890', _platform: 'Alibaba Gold' },
  { id: 'COM-4', category: 'Commodity chemicals', name: 'Stearic Acid', grade: 'Triple Pressed', icon: '🕯️', _manufacturer: 'Guangzhou Tinci China', _phone: '+86 135 6032 8890', _platform: 'Alibaba Gold' },
  { id: 'COM-5', category: 'Commodity chemicals', name: 'Acetic Acid', grade: 'Glacial 99.8%', icon: '🧫', _manufacturer: 'Guangzhou Tinci China', _phone: '+86 135 6032 8890', _platform: 'Alibaba Gold' },
  { id: 'COM-6', category: 'Commodity chemicals', name: 'Hydrogen Peroxide', grade: '50% Tech', icon: '💧', _manufacturer: 'Guangzhou Tinci China', _phone: '+86 135 6032 8890', _platform: 'Alibaba Gold' },
  { id: 'PAINT-1', category: 'Paint chemicals', name: 'Natrosol (HEC)', grade: '250 HBR', icon: '🎨', _manufacturer: 'Zhejiang Haishen China', _phone: '+86 157 5712 3340', _platform: 'Alibaba Gold' },
  { id: 'PAINT-2', category: 'Paint chemicals', name: 'Calcium Carbonate', grade: 'Coated/Uncoated', icon: '🏗️', _manufacturer: 'Zhejiang Haishen China', _phone: '+86 157 5712 3340', _platform: 'Alibaba Gold' },
  { id: 'WATER-1', category: 'Water treatment', name: 'Soda Ash', grade: 'Dense Light', icon: '🌊', _manufacturer: 'Shandong Haihua China', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'WATER-2', category: 'Water treatment', name: 'Calcium Hypochlorite', grade: '65-70% Granular', icon: '💦', _manufacturer: 'Shandong Haihua China', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'WATER-3', category: 'Water treatment', name: 'Poly Aluminum Chloride', grade: 'PAC 28-30%', icon: '🔵', _manufacturer: 'Henan Refort China', _phone: '+86 139 3907 1123', _platform: 'Made in China Verified' },
  { id: 'WATER-4', category: 'Water treatment', name: 'Aluminum Sulphate', grade: '16-17% Granular', icon: '⚪', _manufacturer: 'Henan Refort China', _phone: '+86 139 3907 1123', _platform: 'Made in China Verified' },
  { id: 'WATER-5', category: 'Water treatment', name: 'Ferric Chloride', grade: '40% Liquid/Solid', icon: '🟤', _manufacturer: 'Henan Refort China', _phone: '+86 139 3907 1123', _platform: 'Made in China Verified' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL' | 'MOTOMA' | 'MUST' | 'CHEMICALS'>('ALL');
  const [toast, setToast] = useState<string | null>(null);
  const [showReg, setShowReg] = useState(false);
  const [buyer, setBuyer] = useState({ name: '', whatsapp: '', company: '', channel: true });

  const solarToShow = filter === 'ALL' ? solarProducts : filter === 'MOTOMA' ? solarProducts.filter(p => p.brand === 'MOTOMA') : filter === 'MUST' ? solarProducts.filter(p => p.brand === 'MUST') : [];
  const chemToShow = filter === 'ALL' || filter === 'CHEMICALS' ? chemicals : [];

  const handleRFQ = (item: Product | Chemical) => {
    if (!buyer.whatsapp) { setShowReg(true); setToast('Please register WhatsApp first'); setTimeout(()=>setToast(null),3000); return; }
    const model = (item as any).model || (item as any).name;
    const mfg = (item as any)._manufacturer;
    const phone = (item as any)._phone;
    const plat = (item as any)._platform;
    const msg = `*NEW RFQ – NiChAm Trade*%0A%0ABuyer: ${buyer.name}%0AWhatsApp: ${buyer.whatsapp}%0ACompany: ${buyer.company}%0A%0AProduct: ${model}%0A%0ATARGET MANUFACTURER (Internal):%0A${mfg}%0APlatform: ${plat}%0APhone: ${phone}`;
    window.open(`https://wa.me/2347050477950?text=${msg}`, '_blank');
    setToast(`RFQ sent – Admin will respond with DDP pricing`);
    setTimeout(()=>setToast(null),4000);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{` *{box-sizing:border-box} body{margin:0} .container{max-width:1280px; margin:0 auto; padding:0 20px} .header{position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.97); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0} .header-inner{display:flex; justify-content:center; align-items:center; flex-direction:column; padding:24px 0 18px; text-align:center} .logo-icon{width:72px; height:72px; border-radius:18px; background:linear-gradient(135deg,#0f172a,#059669,#eab308); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:36px; box-shadow:0 10px 28px rgba(0,0,0,0.18)} .brand-name{font-size:52px; font-weight:900; letter-spacing:-2px; color:#0f172a; line-height:1; margin-top:12px} .brand-sub{font-size:13px; font-weight:800; color:#059669; letter-spacing:1.3px; text-transform:uppercase; margin-top:8px} .hero{padding:32px 0 20px; text-align:center; max-width:860px; margin:0 auto} .hero-subtitle{font-size:22px; line-height:1.3; font-weight:800; color:#0f172a; margin:14px auto; max-width:720px} .hero-desc{color:#64748b; font-size:14px; line-height:1.6; margin-top:10px; max-width:660px; margin-left:auto; margin-right:auto} .btn{padding:12px 24px; border-radius:12px; font-weight:800; font-size:13px; border:none; cursor:pointer; transition:all 0.2s} .btn:hover{transform:translateY(-1px); box-shadow:0 6px 18px rgba(0,0,0,0.12)} .btn-primary{background:#059669; color:white} .btn-dark{background:#0f172a; color:white} .btn-light{background:white; border:1px solid #e2e8f0; color:#0f172a} .btn-active{box-shadow:0 0 0 3px #10b981 !important; transform:scale(1.05)} .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:22px; padding:20px 0 24px} .gridChem{display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px 0 60px} .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; transition:0.25s; display:flex; flex-direction:column} .card:hover{transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,0.12)} .card-img{height:210px; background:linear-gradient(180deg,#f8fafc 0%,#ffffff 100%); display:flex; align-items:center; justify-content:center; position:relative; padding:14px; border-bottom:1px solid #f1f5f9} .card-img img{max-height:180px; max-width:100%; object-fit:contain} .pill{position:absolute; top:12px; left:12px; font-size:10px; font-weight:900; padding:5px 10px; border-radius:999px; text-transform:uppercase} .chem-card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:18px; transition:0.2s} .chem-card:hover{box-shadow:0 12px 32px rgba(0,0,0,0.1); transform:translateY(-4px); border-color:#10b981} .chem-icon{width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:12px} .cat-pharma{background:#fef3c7} .cat-commodity{background:#dbeafe} .cat-paint{background:#e0e7ff} .cat-water{background:#ccfbf1} .section-title{font-size:21px; font-weight:900; color:#0f172a; margin:32px 0 16px; padding-top:22px; border-top:1px solid #e2e8f0} @media(max-width:1100px){.grid4,.gridChem{grid-template-columns:repeat(3,1fr)} .brand-name{font-size:42px}} @media(max-width:700px){.grid4,.gridChem{grid-template-columns:repeat(2,1fr)} .brand-name{font-size:36px} .hero-subtitle{font-size:18px}} @media(max-width:500px){.grid4,.gridChem{grid-template-columns:1fr} .brand-name{font-size:32px}} `}</style>

      {toast && <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: '#059669', color: 'white', padding: '12px 22px', borderRadius: 14, fontWeight: 800 }}>✅ {toast}</div>}

      <div className="header"><div className="container"><div className="header-inner"><div className="logo-icon">N</div><div className="brand-name">NiChAm Trade</div><div className="brand-sub">Powering Nigeria – Solar, Storage & Chemicals</div></div></div></div>

      <div className="container">
        <div className="hero">
          <div className="hero-subtitle">MOTOMA Grade A+ <span style={{ color: '#059669', fontWeight: 900 }}>8000 Cycles</span>, MUST Inverters & Industrial Chemicals</div>
          <div className="hero-desc">High-performance energy storage and industrial chemicals for Nigeria. Request a quote and receive DDP Lagos pricing directly to your WhatsApp.</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 22, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('MOTOMA')} className={`btn ${filter === 'MOTOMA' ? 'btn-primary btn-active' : 'btn-dark'}`}>MOTOMA</button>
            <button onClick={() => setFilter('MUST')} className={`btn ${filter === 'MUST' ? 'btn-primary btn-active' : 'btn-light'}`}>MUST</button>
            <button onClick={() => setFilter('CHEMICALS')} className={`btn ${filter === 'CHEMICALS' ? 'btn-primary btn-active' : 'btn-light'}`}>Industrial Chemicals</button>
            <button onClick={() => setFilter('ALL')} className={`btn ${filter === 'ALL' ? 'btn-dark btn-active' : 'btn-light'}`}>All</button>
            <button onClick={() => setShowReg(true)} className="btn" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', fontSize: 11 }}>📱 Register WhatsApp</button>
          </div>
          {buyer.whatsapp && <div style={{ marginTop: 12, fontSize: 12, background: '#ecfdf5', color: '#047857', display: 'inline-block', padding: '6px 14px', borderRadius: 999, fontWeight: 700 }}>Registered: {buyer.name} – {buyer.whatsapp}</div>}
        </div>

        {showReg && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: 'white', borderRadius: 20, padding: 28, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
              <div style={{ fontWeight: 900, fontSize: 20, color: '#0f172a' }}>Register – WhatsApp Required for RFQ</div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 8, lineHeight: 1.5 }}>Enter your details to request quotes. You will receive pricing directly on your WhatsApp.</div>
              <input placeholder="Full Name" value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} style={{ width: '100%', marginTop: 18, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14 }} />
              <input placeholder="WhatsApp Number e.g. +234 803..." value={buyer.whatsapp} onChange={e => setBuyer({ ...buyer, whatsapp: e.target.value })} style={{ width: '100%', marginTop: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14 }} />
              <input placeholder="Company Name" value={buyer.company} onChange={e => setBuyer({ ...buyer, company: e.target.value })} style={{ width: '100%', marginTop: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14 }} />
              <label style={{ display: 'flex', gap: 10, marginTop: 14, fontSize: 12, alignItems: 'flex-start', lineHeight: 1.4, color: '#334155' }}><input type="checkbox" checked={buyer.channel} onChange={e => setBuyer({ ...buyer, channel: e.target.checked })} style={{ marginTop: 2 }} /> <span>Join WhatsApp Channel for new arrivals and special offers</span></label>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}><button onClick={() => { if(!buyer.name || !buyer.whatsapp) { alert('Name & WhatsApp required'); return;} setShowReg(false); setToast(`Registered ${buyer.name}`); setTimeout(()=>setToast(null),3000); }} style={{ flex: 1, background: '#059669', color: 'white', padding: '13px', borderRadius: 12, fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: 14 }}>Register</button><button onClick={() => setShowReg(false)} style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '13px', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Cancel</button></div>
            </div>
          </div>
        )}

        {solarToShow.length > 0 && (
          <>
            <h2 className="section-title">☀️ Solar & Storage – MOTOMA & MUST</h2>
            <div className="grid4">
              {solarToShow.map(p => (
                <div key={p.id} className="card">
                  <div className="card-img"><span className="pill" style={{ background: p.brand === 'MOTOMA' ? '#059669' : '#eab308', color: p.brand === 'MOTOMA' ? 'white' : 'black' }}>{p.brand}</span><img src={p.image} alt={p.model} /></div>
                  <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 800, fontSize: 14, minHeight: 40, lineHeight: 1.3 }}>{p.model}</div>
                    <div style={{ marginTop: 10 }}><span style={{ fontSize: 11, background: '#f1f5f9', padding: '5px 10px', borderRadius: 999, fontWeight: 600 }}>{p.capacity}</span></div>
                    <button onClick={() => handleRFQ(p)} style={{ marginTop: 14, width: '100%', background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: 12, fontWeight: 900, fontSize: 13, cursor: 'pointer' }}>Request RFQ</button>
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
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: 0.5 }}>{c.category}</div>
                    <div style={{ fontWeight: 900, fontSize: 15, marginTop: 6, lineHeight: 1.3 }}>{c.name}</div>
                    <div style={{ fontSize: 12, background: '#f1f5f9', display: 'inline-block', padding: '5px 10px', borderRadius: 999, marginTop: 10, fontWeight: 700 }}>{c.grade}</div>
                    <button onClick={() => handleRFQ(c)} style={{ marginTop: 14, width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '11px', borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Request RFQ</button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <footer style={{ background: '#0f172a', color: 'white', padding: '32px 0', marginTop: 20 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
          <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>NiChAm Trade – Powering Nigeria</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Solar • Storage • Industrial Chemicals • Minna • Abuja • Lagos</div>
        </div>
      </footer>
    </div>
  );
}
