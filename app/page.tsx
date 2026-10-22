'use client';
import { useState, useEffect } from 'react';

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
  _manufacturer: string;
  _phone: string;
  _platform: string;
};

type Chemical = {
  id: string;
  category: 'Pharmaceuticals' | 'Commodity chemicals' | 'Paint chemicals' | 'Water treatment';
  name: string;
  grade: string;
  desc: string;
  icon: string;
  supplier: string;
  website: string;
  image?: string;
  _manufacturer: string;
  _phone: string;
  _platform: string;
};

const solarProducts: Product[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V 5.12kWh', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Grade A+'], _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V 7.68kWh', image: '/products/motoma/M69PW_PRO.png', capacity: '300Ah', voltage: '25.6V', energy: '7.68kWh', cycles: '8000 Cycles', features: ['Grade A+'], _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V 5.12kWh', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah', voltage: '51.2V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Wall Mount'], _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V 10.24kWh', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah', voltage: '51.2V', energy: '10.24kWh', cycles: '8000 Cycles', features: ['10kWh'], _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V 16.38kWh Rack', image: '/products/motoma/M90_PRO.png', capacity: '320Ah', voltage: '51.2V', energy: '16.38kWh', cycles: '8000 Cycles', features: ['Rack'], _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO - 280Ah 51.2V 14.33kWh', image: '/products/motoma/M91_PRO.png', capacity: '280Ah', voltage: '51.2V', energy: '14.33kWh', cycles: '8000 Cycles', features: ['14kWh'], _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid Inverter', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', voltage: '48V', energy: 'MPPT 100A', cycles: 'Hybrid', features: ['WiFi'], _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid Inverter', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', voltage: '48V', energy: 'MPPT 120A', cycles: 'On/Off Grid', features: ['Dual MPPT'], _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V 10.24kWh Wall', image: '/products/must/MUST_3_656x684.png', capacity: '200Ah', voltage: '48V', energy: '10.24kWh', cycles: '6000 Cycles', features: ['Wall'], _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V 5.12kWh', image: '/products/must/MUST_4_526x684.png', capacity: '100Ah', voltage: '48V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['Compact'], _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V', image: '/products/must/MUST_5_584x553.png', capacity: '5kW', voltage: '48V', energy: 'MPPT 80A', cycles: 'Transformer', features: ['Heavy Duty'], _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', image: '/products/must/MUST_6_472x684.png', capacity: '3kW', voltage: '24V', energy: 'MPPT 60A', cycles: 'Hybrid', features: ['Best Seller'], _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-24200', brand: 'MUST', model: 'LP16-24200 200Ah 24V 5.12kWh', image: '/products/must/MUST_10_446x553.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['24V'], _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-10148', brand: 'MUST', model: 'PV18-10148 10kW 48V 3-Phase', image: '/products/must/MUST_11_433x519.png', capacity: '10kW', voltage: '48V', energy: 'MPPT 2x100A', cycles: '3 Phase', features: ['10kW'], _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
];

// Chemicals with Double Bulls as supplier for paint chemicals
const chemicals: Chemical[] = [
  { id: 'PHARMA-1', category: 'Pharmaceuticals', name: 'Paracetamol Powder', grade: 'BP/USP Grade', desc: 'High purity pharma raw', icon: '💊', supplier: 'Shanghai Medichem', website: 'www.double-bulls.com', image: '', _manufacturer: 'Shanghai Medichem', _phone: '+86 138 1756 9021', _platform: 'Alibaba Gold' },
  { id: 'PHARMA-2', category: 'Pharmaceuticals', name: 'Crystallized Sorbitol', grade: 'Food/Pharma Grade', desc: 'Sweetener & excipient', icon: '🧪', supplier: 'Roquette', website: 'www.double-bulls.com', _manufacturer: 'Roquette China', _phone: '+86 138 1756 9021', _platform: 'Alibaba Gold' },
  { id: 'COM-1', category: 'Commodity chemicals', name: 'Caustic Soda', grade: 'Flakes 99% / Pearl', desc: 'NaOH – Industrial grade', icon: '⚗️', supplier: 'Shandong Haihua', website: 'www.double-bulls.com', _manufacturer: 'Shandong Haihua', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'COM-2', category: 'Commodity chemicals', name: 'Hydrochloric Acid', grade: '30-33% Tech', desc: 'HCl – Industrial & water treatment', icon: '🧴', supplier: 'Guangzhou Tinci', website: 'www.double-bulls.com', _manufacturer: 'Guangzhou Tinci', _phone: '+86 135 6032 8890', _platform: 'Alibaba Gold' },
  { id: 'COM-3', category: 'Commodity chemicals', name: 'Nitric Acid', grade: '68% Conc.', desc: 'HNO₃ – Industrial', icon: '🔬', supplier: 'Gansu Jinchang', website: 'www.double-bulls.com', _manufacturer: 'Gansu Jinchang', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'COM-4', category: 'Commodity chemicals', name: 'Stearic Acid', grade: 'Triple Pressed', desc: 'Rubber, candle & cosmetics', icon: '🕯️', supplier: 'Wilmar', website: 'www.double-bulls.com', _manufacturer: 'Wilmar Chemical', _phone: '+86 135 6032 8890', _platform: 'Alibaba Gold' },
  { id: 'COM-5', category: 'Commodity chemicals', name: 'Acetic Acid', grade: 'Glacial 99.8%', desc: 'Food & industrial', icon: '🧫', supplier: 'Sopo', website: 'www.double-bulls.com', _manufacturer: 'Jiangsu Sopo', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'COM-6', category: 'Commodity chemicals', name: 'Hydrogen Peroxide', grade: '50% Tech', desc: 'H₂O₂ – Bleaching', icon: '💧', supplier: 'Luxi Chemical', website: 'www.double-bulls.com', _manufacturer: 'Luxi Chemical', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  // Paint chemicals from Double Bulls – Main products: HPMC, RDP, CMC, HEMC, HEC
  { id: 'PAINT-1', category: 'Paint chemicals', name: 'HPMC – Hydroxy Propyl Methyl Cellulose', grade: 'Double Bulls Grade – 5-200000 mPa.s', desc: 'Tile adhesive, mortar, paint thickener – Largest HPMC Manufacturer China', icon: '🎨', supplier: 'Hebei Double Bulls Cellulose Co., Ltd.', website: 'shuangniu888.en.made-in-china.com', image: 'https://image.made-in-china.com/202f0j00vYkGZhEocRqz/Largest-HPMC-Manufacturer-in-China-Unbeatable-Prices-and-Quality.jpg', _manufacturer: 'Hebei Double Bulls Cellulose Co., Ltd. – No.9 Weisi Road, Jinzhou Economic Zone, Shijiazhuang', _phone: '+86 311 6666 8888', _platform: 'Made-in-China.com Gold – shuangniu888.en.made-in-china.com' },
  { id: 'PAINT-2', category: 'Paint chemicals', name: 'HEC – Natrosol (Hydroxyethyl Cellulose)', grade: '250 HBR – Double Bulls', desc: 'Paint thickener, protective colloid', icon: '🖌️', supplier: 'Hebei Double Bulls Cellulose Co., Ltd.', website: 'shuangniu888.en.made-in-china.com', image: 'https://image.made-in-china.com/202f0j00vYkGZhEocRqz/Largest-HPMC-Manufacturer-in-China-Unbeatable-Prices-and-Quality.jpg', _manufacturer: 'Hebei Double Bulls Cellulose Co., Ltd.', _phone: '+86 311 6666 8888', _platform: 'Made-in-China.com – Double Bulls' },
  { id: 'PAINT-3', category: 'Paint chemicals', name: 'CMC – Carboxyl Methyl Cellulose', grade: 'Thickeners, Stabilizers', desc: 'Construction, daily chemical, paint – Double Bulls', icon: '🧱', supplier: 'Hebei Double Bulls Cellulose Co., Ltd.', website: 'shuangniu888.en.made-in-china.com', _manufacturer: 'Hebei Double Bulls Cellulose Co., Ltd.', _phone: '+86 311 6666 8888', _platform: 'Made-in-China.com – Double Bulls' },
  { id: 'PAINT-4', category: 'Paint chemicals', name: 'RDP – Redispersible Polymer Powder', grade: 'Construction Grade', desc: 'Tile adhesive, exterior insulation – Double Bulls main product', icon: '🏗️', supplier: 'Hebei Double Bulls Cellulose Co., Ltd.', website: 'shuangniu888.en.made-in-china.com', _manufacturer: 'Hebei Double Bulls Cellulose Co., Ltd.', _phone: '+86 311 6666 8888', _platform: 'Made-in-China.com – Double Bulls' },
  { id: 'PAINT-5', category: 'Paint chemicals', name: 'Calcium Carbonate', grade: 'Coated/Uncoated', desc: 'CaCO₃ – Paint & plastic filler', icon: '⚪', supplier: 'Hebei Double Bulls', website: 'shuangniu888.en.made-in-china.com', _manufacturer: 'Hebei Double Bulls', _phone: '+86 311 6666 8888', _platform: 'Double Bulls' },
  { id: 'WATER-1', category: 'Water treatment', name: 'Soda Ash', grade: 'Dense Light', desc: 'Na₂CO₃ – pH adjustment', icon: '🌊', supplier: 'Shandong Haihua', website: 'www.double-bulls.com', _manufacturer: 'Shandong Haihua', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'WATER-2', category: 'Water treatment', name: 'Calcium Hypochlorite', grade: '65-70% Granular', desc: 'Water disinfection', icon: '💦', supplier: 'Shandong Haihua', website: 'www.double-bulls.com', _manufacturer: 'Shandong Haihua', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'WATER-3', category: 'Water treatment', name: 'Poly Aluminum Chloride', grade: 'PAC 28-30%', desc: 'Coagulant for water treatment', icon: '🔵', supplier: 'Henan', website: 'www.double-bulls.com', _manufacturer: 'Henan Water Chem', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'WATER-4', category: 'Water treatment', name: 'Aluminum Sulphate', grade: '16-17% / Granular', desc: 'Alum – Water clarification', icon: '⚫', supplier: 'Henan', website: 'www.double-bulls.com', _manufacturer: 'Henan Water Chem', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'WATER-5', category: 'Water treatment', name: 'Ferric Chloride', grade: '40% Liquid / Solid', desc: 'Coagulant & etchant', icon: '🟤', supplier: 'Henan', website: 'www.double-bulls.com', _manufacturer: 'Henan Water Chem', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL' | 'MOTOMA' | 'MUST' | 'CHEMICALS'>('ALL');
  const [chemFilter, setChemFilter] = useState<string>('ALL');
  const [toast, setToast] = useState<string | null>(null);
  const [showRFQ, setShowRFQ] = useState(false);
  const [pendingItem, setPendingItem] = useState<Product | Chemical | null>(null);
  const [buyer, setBuyer] = useState({ name: '', whatsapp: '', company: '', channel: false });

  useEffect(() => {
    const saved = localStorage.getItem('nicham_buyer_profile');
    if (saved) setBuyer(JSON.parse(saved));
  }, []);

  // FIXED FILTER LOGIC – Only one active
  const getBtnClass = (isActive: boolean) => isActive ? 'btn btn-primary btn-active' : 'btn btn-light';

  const showSolar = filter === 'ALL' || filter === 'MOTOMA' || filter === 'MUST';
  const showChem = filter === 'ALL' || filter === 'CHEMICALS';

  const filteredSolar = filter === 'ALL' ? solarProducts : solarProducts.filter(p => p.brand === filter);
  const filteredChem = chemFilter === 'ALL' ? chemicals : chemicals.filter(c => c.category === chemFilter);

  const openRFQ = (item: Product | Chemical) => {
    setPendingItem(item);
    setShowRFQ(true);
  };

  const submitRFQ = () => {
    if (!buyer.name || !buyer.whatsapp) { alert('Name & WhatsApp required'); return; }
    if (!pendingItem) return;
    const model = (pendingItem as any).model || (pendingItem as any).name;
    const mfg = (pendingItem as any)._manufacturer;
    const phone = (pendingItem as any)._phone;
    const plat = (pendingItem as any)._platform;

    localStorage.setItem('nicham_buyer_profile', JSON.stringify(buyer));
    const buyers = JSON.parse(localStorage.getItem('nicham_buyers') || '[]');
    if (!buyers.find((b: any) => b.whatsapp === buyer.whatsapp)) {
      buyers.push({ ...buyer, date: new Date().toLocaleDateString() });
      localStorage.setItem('nicham_buyers', JSON.stringify(buyers));
    }
    const rfqs = JSON.parse(localStorage.getItem('nicham_rfqs') || '[]');
    const newRFQ = { id: Date.now().toString(), buyer: buyer.name, whatsapp: buyer.whatsapp, company: buyer.company, product: model, status: 'New RFQ', date: new Date().toLocaleString(), manufacturer: mfg, phone, platform: plat, itemId: pendingItem.id };
    localStorage.setItem('nicham_rfqs', JSON.stringify([newRFQ, ...rfqs]));
    setShowRFQ(false);
    setToast(`Request for quote sent to Admin Console – ${model} – Will receive final price with 2.5% fee`);
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{` *{box-sizing:border-box} .container{max-width:1280px; margin:0 auto; padding:0 20px} .header{position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.97); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0} .header-inner{display:flex; justify-content:center; align-items:center; flex-direction:column; padding:24px 0 18px; text-align:center} .logo-icon{width:72px; height:72px; border-radius:18px; background:linear-gradient(135deg,#0f172a,#059669,#eab308); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:36px} .brand-name{font-size:52px; font-weight:900; letter-spacing:-2px; color:#0f172a; line-height:1; margin-top:12px} .brand-sub{font-size:13px; font-weight:800; color:#059669; letter-spacing:1.3px; text-transform:uppercase; margin-top:8px} .hero{padding:32px 0 20px; text-align:center; max-width:760px; margin:0 auto} .hero-subtitle{font-size:22px; line-height:1.3; font-weight:800; color:#0f172a; margin:14px auto} .hero-desc{color:#64748b; font-size:14px; line-height:1.6; margin-top:10px} .btn{padding:12px 24px; border-radius:12px; font-weight:800; font-size:13px; border:none; cursor:pointer} .btn-primary{background:#059669; color:white; box-shadow:0 0 0 3px #10b981} .btn-light{background:white; border:1px solid #e2e8f0; color:#0f172a} .btn-active{box-shadow:0 0 0 3px #10b981 !important} .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:22px; padding:20px 0 24px} .gridChem{display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px 0 40px} .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; display:flex; flex-direction:column} .card-img{height:210px; background:#f8fafc; display:flex; align-items:center; justify-content:center; position:relative; padding:14px; border-bottom:1px solid #f1f5f9} .card-img img{max-height:180px; max-width:100%; object-fit:contain} .pill{position:absolute; top:12px; left:12px; font-size:10px; font-weight:900; padding:5px 10px; border-radius:999px; text-transform:uppercase} .chem-card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:18px; display:flex; flex-direction:column} .chem-img{height:110px; background:#f8fafc; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; overflow:hidden} .chem-img img{max-height:100px; max-width:100%; object-fit:contain} .chem-icon{width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:12px} .cat-pharma{background:#fef3c7} .cat-commodity{background:#dbeafe} .cat-paint{background:#e0e7ff} .cat-water{background:#ccfbf1} .section-title{font-size:21px; font-weight:900; color:#0f172a; margin:32px 0 16px; padding-top:22px; border-top:1px solid #e2e8f0} @media(max-width:1100px){.grid4,.gridChem{grid-template-columns:repeat(3,1fr)}} @media(max-width:700px){.grid4,.gridChem{grid-template-columns:repeat(2,1fr)} .brand-name{font-size:36px}} @media(max-width:500px){.grid4,.gridChem{grid-template-columns:1fr}} `}</style>

      {toast && <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: '#059669', color: 'white', padding: '14px 20px', borderRadius: 14, fontWeight: 800, maxWidth: 520, textAlign: 'center' }}>✅ {toast}</div>}

      <div className="header"><div className="container"><div className="header-inner"><div className="logo-icon">N</div><div className="brand-name">NiChAm Trade</div><div className="brand-sub">Powering Nigeria – Solar, Storage & Chemicals</div></div></div></div>

      <div className="container">
        <div className="hero">
          <div className="hero-subtitle">MOTOMA Grade A+ <span style={{ color: '#059669' }}>8000 Cycles</span>, MUST Inverters & Industrial Chemicals</div>
          <div className="hero-desc">High-performance energy storage and industrial chemicals for Nigeria. Request a quote and receive DDP Lagos pricing directly to your WhatsApp. All 33 products loaded from GitHub.</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('MOTOMA')} className={getBtnClass(filter === 'MOTOMA')}>MOTOMA {solarProducts.filter(p=>p.brand==='MOTOMA').length}</button>
            <button onClick={() => setFilter('MUST')} className={getBtnClass(filter === 'MUST')}>MUST {solarProducts.filter(p=>p.brand==='MUST').length}</button>
            <button onClick={() => setFilter('CHEMICALS')} className={getBtnClass(filter === 'CHEMICALS')}>Chemicals {chemicals.length}</button>
            <button onClick={() => setFilter('ALL')} className={getBtnClass(filter === 'ALL')}>All {solarProducts.length + chemicals.length}</button>
          </div>
        </div>

        {showRFQ && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: 'white', borderRadius: 20, padding: 28, width: '100%', maxWidth: 440 }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>Request for quote – {(pendingItem as any)?.model || (pendingItem as any)?.name}</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 8 }}>You will receive DDP Lagos pricing on WhatsApp with ORDER & PAYMENT buttons. Price includes 2.5% platform fee.</div>
              <input placeholder="Full Name *" value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} style={{ width: '100%', marginTop: 16, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <input placeholder="WhatsApp Number * +234..." value={buyer.whatsapp} onChange={e => setBuyer({ ...buyer, whatsapp: e.target.value })} style={{ width: '100%', marginTop: 10, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <input placeholder="Company Name" value={buyer.company} onChange={e => setBuyer({ ...buyer, company: e.target.value })} style={{ width: '100%', marginTop: 10, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <button onClick={submitRFQ} style={{ flex: 1, background: '#059669', color: 'white', padding: '14px', borderRadius: 12, fontWeight: 900, border: 'none', cursor: 'pointer' }}>Request for quote</button>
                <button onClick={() => setShowRFQ(false)} style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '14px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showSolar && (
          <>
            <h2 className="section-title">☀️ Solar & Storage – {filteredSolar.length} Products</h2>
            <div className="grid4">
              {filteredSolar.map(p => (
                <div key={p.id} className="card">
                  <div className="card-img"><span className="pill" style={{ background: p.brand === 'MOTOMA' ? '#059669' : '#eab308', color: p.brand === 'MOTOMA' ? 'white' : 'black' }}>{p.brand}</span><img src={p.image} alt={p.model} onError={(e)=>{ (e.target as HTMLImageElement).style.display='none'; }} /></div>
                  <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 800, fontSize: 14, minHeight: 40 }}>{p.model}</div>
                    <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}><span style={{ fontSize: 11, background: '#f1f5f9', padding: '5px 10px', borderRadius: 999 }}>{p.capacity}</span><span style={{ fontSize: 11, background: '#ecfdf5', color: '#047857', padding: '5px 10px', borderRadius: 999, fontWeight: 700 }}>{p.cycles}</span></div>
                    <button onClick={() => openRFQ(p)} style={{ marginTop: 14, width: '100%', background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: 12, fontWeight: 900, cursor: 'pointer' }}>Request for quote</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showChem && (
          <>
            <h2 className="section-title">🧪 Industrial Chemicals – {filteredChem.length} Products – Double Bulls: www.double-bulls.com & shuangniu888.en.made-in-china.com</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              <button onClick={() => setChemFilter('ALL')} className={getBtnClass(chemFilter === 'ALL')} style={{ padding: '7px 14px', fontSize: 12 }}>All {chemicals.length}</button>
              <button onClick={() => setChemFilter('Pharmaceuticals')} className={getBtnClass(chemFilter === 'Pharmaceuticals')} style={{ padding: '7px 14px', fontSize: 12 }}>Pharma {chemicals.filter(c=>c.category==='Pharmaceuticals').length}</button>
              <button onClick={() => setChemFilter('Commodity chemicals')} className={getBtnClass(chemFilter === 'Commodity chemicals')} style={{ padding: '7px 14px', fontSize: 12 }}>Commodity {chemicals.filter(c=>c.category==='Commodity chemicals').length}</button>
              <button onClick={() => setChemFilter('Paint chemicals')} className={getBtnClass(chemFilter === 'Paint chemicals')} style={{ padding: '7px 14px', fontSize: 12 }}>Paint (Double Bulls) {chemicals.filter(c=>c.category==='Paint chemicals').length}</button>
              <button onClick={() => setChemFilter('Water treatment')} className={getBtnClass(chemFilter === 'Water treatment')} style={{ padding: '7px 14px', fontSize: 12 }}>Water {chemicals.filter(c=>c.category==='Water treatment').length}</button>
            </div>
            <div className="gridChem">
              {filteredChem.map(c => {
                const catClass = c.category === 'Pharmaceuticals' ? 'cat-pharma' : c.category === 'Commodity chemicals' ? 'cat-commodity' : c.category === 'Paint chemicals' ? 'cat-paint' : 'cat-water';
                return (
                  <div key={c.id} className="chem-card">
                    {c.image ? <div className="chem-img"><img src={c.image} alt={c.name} /></div> : <div className={`chem-icon ${catClass}`}>{c.icon}</div>}
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>{c.category} {c.supplier.includes('Double Bulls') ? '• Double Bulls' : ''}</div>
                    <div style={{ fontWeight: 900, fontSize: 13, marginTop: 6, lineHeight: 1.3 }}>{c.name}</div>
                    <div style={{ fontSize: 11, background: '#f1f5f9', display: 'inline-block', padding: '5px 10px', borderRadius: 999, marginTop: 8, fontWeight: 700 }}>{c.grade}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>{c.desc}</div>
                    {c.supplier.includes('Double Bulls') && <div style={{ fontSize: 9, color: '#059669', marginTop: 6, fontWeight: 800 }}>{c.website} – Main Products: HPMC, RDP, CMC, HEMC, HEC</div>}
                    <button onClick={() => openRFQ(c)} style={{ marginTop: 12, width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '11px', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>Request for quote</button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
