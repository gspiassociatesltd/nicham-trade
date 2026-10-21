'use client';
import { useState } from 'react';

type Product = {
  id: string;
  brand: 'MOTOMA' | 'MUST';
  model: string;
  image: string;
  manufacturer: string;
  phone: string;
  platform: string;
};

type Chemical = {
  id: string;
  category: string;
  name: string;
  manufacturer: string;
  phone: string;
  platform: string;
  grade: string;
  icon: string;
};

const solarProducts: Product[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V 5.12kWh', image: '/products/motoma/M68PW_PRO.png', manufacturer: 'MOTOMA Factory Shenzhen China', phone: '+86 135 7082 3914', platform: 'Factory Direct China' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V 7.68kWh', image: '/products/motoma/M69PW_PRO.png', manufacturer: 'MOTOMA Factory Shenzhen China', phone: '+86 135 7082 3914', platform: 'Factory Direct China' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V 5.12kWh', image: '/products/motoma/M87PW_PRO.png', manufacturer: 'MOTOMA Factory Shenzhen China', phone: '+86 135 7082 3914', platform: 'Factory Direct China' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V 10.24kWh', image: '/products/motoma/M88PW_PRO.png', manufacturer: 'MOTOMA Factory Shenzhen China', phone: '+86 135 7082 3914', platform: 'Factory Direct China' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V 16.38kWh Rack', image: '/products/motoma/M90_PRO.png', manufacturer: 'MOTOMA Factory Shenzhen China', phone: '+86 135 7082 3914', platform: 'Factory Direct China' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO - 280Ah 51.2V 14.33kWh', image: '/products/motoma/M91_PRO.png', manufacturer: 'MOTOMA Factory Shenzhen China', phone: '+86 135 7082 3914', platform: 'Factory Direct China' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid', image: '/products/must/MUST_1_916x1268.png', manufacturer: 'MUST Power Factory Guangdong China', phone: '+86 189 2434 3876', platform: 'Factory Direct China' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid', image: '/products/must/MUST_2_685x950.png', manufacturer: 'MUST Power Factory Guangdong China', phone: '+86 189 2434 3876', platform: 'Factory Direct China' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V 10.24kWh', image: '/products/must/MUST_3_656x684.png', manufacturer: 'MUST Power Factory Guangdong China', phone: '+86 189 2434 3876', platform: 'Factory Direct China' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V 5.12kWh', image: '/products/must/MUST_4_526x684.png', manufacturer: 'MUST Power Factory Guangdong China', phone: '+86 189 2434 3876', platform: 'Factory Direct China' },
];

const chemicals: Chemical[] = [
  { id: 'PHARMA-1', category: 'Pharmaceuticals', name: 'Paracetamol Powder', manufacturer: 'Shanghai Medichem China – Alibaba Gold', phone: '+86 138 1756 9021', platform: 'Alibaba Gold', grade: 'BP/USP', icon: '💊' },
  { id: 'PHARMA-2', category: 'Pharmaceuticals', name: 'Crystallized Sorbitol', manufacturer: 'Shanghai Medichem China – Alibaba Gold', phone: '+86 138 1756 9021', platform: 'Alibaba Gold', grade: 'Food/Pharma', icon: '🧪' },
  { id: 'COM-1', category: 'Commodity chemicals', name: 'Caustic Soda', manufacturer: 'Shandong Haihua China – Alibaba Gold', phone: '+86 186 7820 4451', platform: 'Alibaba Gold', grade: 'Flakes 99%', icon: '⚗️' },
  { id: 'COM-2', category: 'Commodity chemicals', name: 'Hydrochloric Acid', manufacturer: 'Guangzhou Tinci China – Alibaba Gold', phone: '+86 135 6032 8890', platform: 'Alibaba Gold', grade: '30-33%', icon: '🧴' },
  { id: 'COM-3', category: 'Commodity chemicals', name: 'Nitric Acid', manufacturer: 'Guangzhou Tinci China – Alibaba Gold', phone: '+86 135 6032 8890', platform: 'Alibaba Gold', grade: '68%', icon: '🔬' },
  { id: 'COM-4', category: 'Commodity chemicals', name: 'Stearic Acid', manufacturer: 'Guangzhou Tinci China – Alibaba Gold', phone: '+86 135 6032 8890', platform: 'Alibaba Gold', grade: 'Triple Pressed', icon: '🕯️' },
  { id: 'COM-5', category: 'Commodity chemicals', name: 'Acetic Acid', manufacturer: 'Guangzhou Tinci China – Alibaba Gold', phone: '+86 135 6032 8890', platform: 'Alibaba Gold', grade: 'Glacial 99.8%', icon: '🧫' },
  { id: 'COM-6', category: 'Commodity chemicals', name: 'Hydrogen Peroxide', manufacturer: 'Guangzhou Tinci China – Alibaba Gold', phone: '+86 135 6032 8890', platform: 'Alibaba Gold', grade: '50% Tech', icon: '💧' },
  { id: 'PAINT-1', category: 'Paint chemicals', name: 'Natrosol (HEC)', manufacturer: 'Zhejiang Haishen China – Alibaba Gold', phone: '+86 157 5712 3340', platform: 'Alibaba Gold', grade: '250 HBR', icon: '🎨' },
  { id: 'PAINT-2', category: 'Paint chemicals', name: 'Calcium Carbonate', manufacturer: 'Zhejiang Haishen China – Alibaba Gold', phone: '+86 157 5712 3340', platform: 'Alibaba Gold', grade: 'Coated/Uncoated', icon: '🏗️' },
  { id: 'WATER-1', category: 'Water treatment', name: 'Soda Ash', manufacturer: 'Shandong Haihua China – Alibaba Gold', phone: '+86 186 7820 4451', platform: 'Alibaba Gold', grade: 'Dense Light', icon: '🌊' },
  { id: 'WATER-2', category: 'Water treatment', name: 'Calcium Hypochlorite', manufacturer: 'Shandong Haihua China – Alibaba Gold', phone: '+86 186 7820 4451', platform: 'Alibaba Gold', grade: '65-70%', icon: '💦' },
  { id: 'WATER-3', category: 'Water treatment', name: 'Poly Aluminum Chloride', manufacturer: 'Henan Refort China – Made in China Verified', phone: '+86 139 3907 1123', platform: 'Made in China Verified', grade: 'PAC 28-30%', icon: '🔵' },
  { id: 'WATER-4', category: 'Water treatment', name: 'Aluminum Sulphate', manufacturer: 'Henan Refort China – Made in China Verified', phone: '+86 139 3907 1123', platform: 'Made in China Verified', grade: '16-17%', icon: '⚪' },
  { id: 'WATER-5', category: 'Water treatment', name: 'Ferric Chloride', manufacturer: 'Henan Refort China – Made in China Verified', phone: '+86 139 3907 1123', platform: 'Made in China Verified', grade: '40% Liquid', icon: '🟤' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL' | 'MOTOMA' | 'MUST' | 'CHEMICALS'>('ALL');
  const [toast, setToast] = useState<string | null>(null);
  const [showReg, setShowReg] = useState(false);
  const [buyer, setBuyer] = useState({ name: '', whatsapp: '', company: '', channel: true });

  const solarToShow = filter === 'ALL' ? solarProducts : filter === 'MOTOMA' ? solarProducts.filter(p => p.brand === 'MOTOMA') : filter === 'MUST' ? solarProducts.filter(p => p.brand === 'MUST') : [];
  const chemToShow = filter === 'ALL' || filter === 'CHEMICALS' ? chemicals : [];

  const handleRFQ = (item: Product | Chemical, type: 'SOLAR' | 'CHEM') => {
    if (!buyer.whatsapp) { setShowReg(true); setToast('Register WhatsApp first – China suppliers only'); setTimeout(()=>setToast(null),3000); return; }
    const model = type === 'SOLAR' ? (item as Product).model : (item as Chemical).name;
    const mfg = type === 'SOLAR' ? (item as Product).manufacturer : (item as Chemical).manufacturer;
    const phone = type === 'SOLAR' ? (item as Product).phone : (item as Chemical).phone;
    const plat = type === 'SOLAR' ? (item as Product).platform : (item as Chemical).platform;
    const msg = `*NEW RFQ – NiChAm China Only*%0A%0ABuyer: ${buyer.name}%0AWhatsApp: ${buyer.whatsapp}%0ACompany: ${buyer.company}%0A%0AProduct: ${model}%0A%0ATARGET CHINA MANUFACTURER (Admin to forward to):%0A${mfg}%0APlatform: ${plat}%0APhone: ${phone}%0ACountry: China Only%0A%0AAdmin will forward to China factory and send priced quote (factory + China→Lagos logistics + insurance + platform) ONLY to buyer WhatsApp, NOT to channel. Channel only for adverts/new products.`;
    window.open(`https://wa.me/2347050477950?text=${msg}`, '_blank');
    setToast(`RFQ to Admin – China MFG ${mfg} specified`);
    setTimeout(()=>setToast(null),4000);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{` *{box-sizing:border-box} body{margin:0} .container{max-width:1280px; margin:0 auto; padding:0 20px} .header{position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.96); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0} .header-inner{display:flex; justify-content:center; align-items:center; flex-direction:column; padding:18px 0 14px; text-align:center} .logo-icon{width:64px; height:64px; border-radius:16px; background:linear-gradient(135deg,#DC2626,#eab308); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:32px} .brand-name{font-size:42px; font-weight:900; letter-spacing:-1.5px; color:#0f172a; line-height:1; margin-top:8px} .brand-sub{font-size:13px; font-weight:800; color:#DC2626; letter-spacing:1px; text-transform:uppercase; margin-top:4px} .hero{padding:28px 0 18px; text-align:center; max-width:900px; margin:0 auto} .hero-subtitle{font-size:18px; line-height:1.4; font-weight:600; color:#334155; margin:10px auto} .hero-desc{color:#64748b; font-size:14px; line-height:1.5; margin-top:6px} .btn{padding:12px 22px; border-radius:12px; font-weight:800; font-size:13px; border:none; cursor:pointer; transition:all 0.2s} .btn:hover{transform:translateY(-1px)} .btn-primary{background:#DC2626; color:white} .btn-dark{background:#0f172a; color:white} .btn-light{background:white; border:1px solid #e2e8f0; color:#0f172a} .btn-active{box-shadow:0 0 0 3px #fca5a5 !important; transform:scale(1.05)} .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:20px; padding:18px 0 20px} .gridChem{display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:10px 0 60px} .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; transition:0.25s; display:flex; flex-direction:column} .card:hover{transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,0.12)} .card-img{height:200px; background:linear-gradient(180deg,#f8fafc 0%,#ffffff 100%); display:flex; align-items:center; justify-content:center; position:relative; padding:14px; border-bottom:1px solid #f1f5f9} .card-img img{max-height:170px; max-width:100%; object-fit:contain} .pill{position:absolute; top:12px; left:12px; font-size:10px; font-weight:900; padding:5px 10px; border-radius:999px; text-transform:uppercase} .chem-card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:16px; transition:0.2s} .chem-card:hover{box-shadow:0 12px 32px rgba(0,0,0,0.1); transform:translateY(-4px); border-color:#DC2626} .chem-icon{width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:10px} .cat-pharma{background:#fef3c7} .cat-commodity{background:#dbeafe} .cat-paint{background:#e0e7ff} .cat-water{background:#ccfbf1} .section-title{font-size:20px; font-weight:900; color:#0f172a; margin:28px 0 14px; padding-top:20px; border-top:1px solid #e2e8f0} @media(max-width:1100px){.grid4,.gridChem{grid-template-columns:repeat(3,1fr)} .brand-name{font-size:36px}} @media(max-width:700px){.grid4,.gridChem{grid-template-columns:repeat(2,1fr)} .brand-name{font-size:32px}} @media(max-width:500px){.grid4,.gridChem{grid-template-columns:1fr} .brand-name{font-size:28px}} `}</style>

      {toast && <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: '#DC2626', color: 'white', padding: '12px 22px', borderRadius: 14, fontWeight: 800 }}>✅ {toast}</div>}

      <div className="header"><div className="container"><div className="header-inner"><div className="logo-icon">N</div><div className="brand-name">NiChAm Trade</div><div className="brand-sub">China Suppliers Only – Powering Nigeria</div></div></div></div>

      <div className="container">
        <div className="hero">
          <div style={{ display: 'inline-flex', background: '#fef2f2', color: '#DC2626', padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800, border: '1px solid #fecaca' }}>🇨🇳 CHINA ONLY – All 7 Suppliers From China Alone – Alibaba Gold / MIC Verified / Factory Direct China</div>
          <div className="hero-subtitle">MOTOMA Factory Shenzhen China Grade A+ <span style={{ color: '#DC2626', fontWeight: 900 }}>8000 Cycles</span>, MUST Factory Guangdong China & China Industrial Chemicals</div>
          <div className="hero-desc">All products sourced from China alone – No Dubai/UAE – RFQ shows China manufacturer so admin knows where to forward – Quote ONLY to buyer WhatsApp, channel ONLY for adverts/new products/announcements.</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('MOTOMA')} className={`btn ${filter === 'MOTOMA' ? 'btn-primary btn-active' : 'btn-dark'}`}>MOTOMA – China</button>
            <button onClick={() => setFilter('MUST')} className={`btn ${filter === 'MUST' ? 'btn-primary btn-active' : 'btn-light'}`}>MUST – China</button>
            <button onClick={() => setFilter('CHEMICALS')} className={`btn ${filter === 'CHEMICALS' ? 'btn-primary btn-active' : 'btn-light'}`}>Industrial Chemicals – China</button>
            <button onClick={() => setFilter('ALL')} className={`btn ${filter === 'ALL' ? 'btn-dark btn-active' : 'btn-light'}`}>All – China Only</button>
            <button onClick={() => setShowReg(true)} className="btn" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', fontSize: 11 }}>📱 Register WhatsApp</button>
          </div>
          {buyer.whatsapp && <div style={{ marginTop: 10, fontSize: 12, background: '#fef2f2', color: '#991b1b', display: 'inline-block', padding: '6px 12px', borderRadius: 999, fontWeight: 700, border: '1px solid #fecaca' }}>🇨🇳 Registered: {buyer.name} – {buyer.whatsapp} – China Sourcing Only</div>}
        </div>

        {showReg && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: 'white', borderRadius: 20, padding: 24, width: '100%', maxWidth: 400 }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>Register – China Suppliers Only – WhatsApp Required</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>All suppliers from China alone – MOTOMA Shenzhen China, MUST Guangdong China + 5 China chemical factories. Channel ONLY for adverts/new products/announcements, NOT for quotes. Quotes ONLY to your WhatsApp.</div>
              <input placeholder="Full Name" value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} style={{ width: '100%', marginTop: 14, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              <input placeholder="WhatsApp Number" value={buyer.whatsapp} onChange={e => setBuyer({ ...buyer, whatsapp: e.target.value })} style={{ width: '100%', marginTop: 10, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              <input placeholder="Company" value={buyer.company} onChange={e => setBuyer({ ...buyer, company: e.target.value })} style={{ width: '100%', marginTop: 10, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              <label style={{ display: 'flex', gap: 8, marginTop: 12, fontSize: 12, alignItems: 'center' }}><input type="checkbox" checked={buyer.channel} onChange={e => setBuyer({ ...buyer, channel: e.target.checked })} /> Request to join WhatsApp Channel (adverts/new products only – NOT quotes)</label>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}><button onClick={() => { if(!buyer.name || !buyer.whatsapp) { alert('Name & WhatsApp required'); return;} setShowReg(false); setToast(`Registered ${buyer.name} – China Only`); setTimeout(()=>setToast(null),3000); }} style={{ flex: 1, background: '#DC2626', color: 'white', padding: '12px', borderRadius: 10, fontWeight: 800, border: 'none', cursor: 'pointer' }}>Register – China Only</button><button onClick={() => setShowReg(false)} style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '12px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>Cancel</button></div>
            </div>
          </div>
        )}

        {solarToShow.length > 0 && (
          <>
            <h2 className="section-title">☀️ Solar & Storage – China Factories Only – RFQ Shows China Manufacturer</h2>
            <div className="grid4">
              {solarToShow.map(p => (
                <div key={p.id} className="card">
                  <div className="card-img"><span className="pill" style={{ background: p.brand === 'MOTOMA' ? '#DC2626' : '#eab308', color: p.brand === 'MOTOMA' ? 'white' : 'black' }}>{p.brand} – CHINA</span><img src={p.image} alt={p.model} /></div>
                  <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 800, fontSize: 13, minHeight: 34 }}>{p.model}</div>
                    <div style={{ marginTop: 8, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 8 }}><div style={{ fontSize: 10, fontWeight: 800, color: '#991b1b' }}>🇨🇳 CHINA MANUFACTURER – Shown in RFQ</div><div style={{ fontSize: 11, fontWeight: 700, marginTop: 2 }}>{p.manufacturer}</div><div style={{ fontSize: 10, color: '#64748b' }}>{p.platform} • {p.phone}</div></div>
                    <button onClick={() => handleRFQ(p, 'SOLAR')} style={{ marginTop: 12, width: '100%', background: '#DC2626', color: 'white', border: 'none', padding: '11px', borderRadius: 10, fontWeight: 900, fontSize: 12, cursor: 'pointer' }}>Request RFQ – China MFG</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {chemToShow.length > 0 && (
          <>
            <h2 className="section-title">🧪 Industrial Chemicals – China Factories Only – RFQ Shows China Manufacturer</h2>
            <div className="gridChem">
              {chemToShow.map(c => {
                const catClass = c.category === 'Pharmaceuticals' ? 'cat-pharma' : c.category === 'Commodity chemicals' ? 'cat-commodity' : c.category === 'Paint chemicals' ? 'cat-paint' : 'cat-water';
                return (
                  <div key={c.id} className="chem-card">
                    <div className={`chem-icon ${catClass}`}>{c.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#DC2626', textTransform: 'uppercase' }}>{c.category} – CHINA</div>
                    <div style={{ fontWeight: 900, fontSize: 14, marginTop: 4 }}>{c.name}</div>
                    <div style={{ marginTop: 8, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 8 }}><div style={{ fontSize: 10, fontWeight: 800, color: '#991b1b' }}>🇨🇳 CHINA MFG – Shown in RFQ</div><div style={{ fontSize: 11, fontWeight: 700, marginTop: 2 }}>{c.manufacturer}</div><div style={{ fontSize: 10, color: '#64748b' }}>{c.platform} • {c.phone}</div></div>
                    <div style={{ fontSize: 11, background: '#f1f5f9', display: 'inline-block', padding: '3px 8px', borderRadius: 999, marginTop: 8, fontWeight: 700 }}>{c.grade}</div>
                    <button onClick={() => handleRFQ(c, 'CHEM')} style={{ marginTop: 10, width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '10px', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Request RFQ – China MFG</button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <footer style={{ background: '#0f172a', color: 'white', padding: '24px 0', marginTop: 20 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 12, textAlign: 'center' }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>NiChAm Trade – China Suppliers Only – Powering Nigeria</div>
          <div style={{ color: '#fca5a5' }}>🇨🇳 All 7 Suppliers From China Alone – No Dubai/UAE – RFQ Shows China Manufacturer – Quote ONLY to Buyer WhatsApp – Channel ONLY Adverts/New Products</div>
        </div>
      </footer>
    </div>
  );
}
