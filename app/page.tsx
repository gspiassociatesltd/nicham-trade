'use client';
import { useState, useEffect } from 'react';

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
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V 5.12kWh', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah 25.6V', _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V 5.12kWh', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V 10.24kWh', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V 16.38kWh Rack', image: '/products/motoma/M90_PRO.png', capacity: '320Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid Inverter', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid Inverter', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', _manufacturer: 'MUST Power Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
];

const chemicals: Chemical[] = [
  { id: 'PHARMA-1', category: 'Pharmaceuticals', name: 'Paracetamol Powder', grade: 'BP/USP Grade', icon: '💊', _manufacturer: 'Shanghai Medichem', _phone: '+86 138 1756 9021', _platform: 'Alibaba Gold' },
  { id: 'PAINT-1', category: 'Paint chemicals', name: 'HPMC – Double Bulls', grade: '5-200000 mPa.s', icon: '🎨', _manufacturer: 'Hebei Double Bulls – shuangniu888.en.made-in-china.com', _phone: '+86 311 6666 8888', _platform: 'Made-in-China Gold' },
  { id: 'WATER-1', category: 'Water treatment', name: 'Soda Ash', grade: 'Dense Light', icon: '🌊', _manufacturer: 'Shandong Haihua', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL' | 'MOTOMA' | 'MUST' | 'CHEMICALS'>('ALL');
  const [toast, setToast] = useState<string | null>(null);
  const [showRFQ, setShowRFQ] = useState(false);
  const [pendingItem, setPendingItem] = useState<Product | Chemical | null>(null);
  const [buyer, setBuyer] = useState({ name: '', whatsapp: '', company: '', shipping: '', channel: false, ddpType: 'DDP Lagos' as 'DDP Lagos' | 'DDP Premises' });

  useEffect(() => {
    const saved = localStorage.getItem('nicham_buyer_profile');
    if (saved) setBuyer(JSON.parse(saved));
  }, []);

  const getBtnClass = (isActive: boolean) => isActive ? 'btn btn-primary btn-active' : 'btn btn-light';
  const filteredSolar = filter === 'ALL' ? solarProducts : solarProducts.filter(p => p.brand === filter);
  const filteredChem = filter === 'ALL' || filter === 'CHEMICALS' ? chemicals : [];

  const openRFQ = (item: Product | Chemical) => {
    setPendingItem(item);
    setShowRFQ(true);
  };

  const submitRFQ = () => {
    if (!buyer.name || !buyer.whatsapp || !buyer.shipping) { alert('Full Name, WhatsApp & Shipping Address required – DDP to Premises needs address'); return; }
    if (!pendingItem) return;
    const model = (pendingItem as any).model || (pendingItem as any).name;
    const mfg = (pendingItem as any)._manufacturer;
    const phone = (pendingItem as any)._phone;
    const plat = (pendingItem as any)._platform;

    localStorage.setItem('nicham_buyer_profile', JSON.stringify(buyer));
    const rfqs = JSON.parse(localStorage.getItem('nicham_rfqs') || '[]');
    const newRFQ = {
      id: Date.now().toString(),
      buyer: buyer.name,
      whatsapp: buyer.whatsapp,
      company: buyer.company,
      shipping: buyer.shipping,
      ddpType: buyer.ddpType,
      product: model,
      status: 'New RFQ – Shipping Address Included',
      date: new Date().toLocaleString(),
      manufacturer: mfg,
      phone,
      platform: plat,
      itemId: pendingItem.id,
      // Full DDP message like in your screenshot image_003c13.png
      ddpMessage: `${buyer.ddpType}, Nigeria – DDP to Premises ${buyer.shipping} – From: NiChAm Trade – Customer RFQ – Product: ${model} – Time: ${new Date().toLocaleString()} – Please quote DDP Lagos with shipping & docs.`
    };
    localStorage.setItem('nicham_rfqs', JSON.stringify([newRFQ, ...rfqs]));
    setShowRFQ(false);
    setToast(`Request for quote sent – ${model} – DDP to ${buyer.shipping} – Admin will quote with shipping & docs`);
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{` *{box-sizing:border-box} .container{max-width:1280px; margin:0 auto; padding:0 20px} .header{position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.97); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0} .header-inner{display:flex; justify-content:center; align-items:center; flex-direction:column; padding:24px 0 18px; text-align:center} .logo-icon{width:72px; height:72px; border-radius:18px; background:linear-gradient(135deg,#0f172a,#059669,#eab308); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:36px} .brand-name{font-size:52px; font-weight:900; letter-spacing:-2px; color:#0f172a; line-height:1; margin-top:12px} .brand-sub{font-size:13px; font-weight:800; color:#059669; letter-spacing:1.3px; text-transform:uppercase; margin-top:8px} .hero{padding:32px 0 20px; text-align:center; max-width:760px; margin:0 auto} .hero-subtitle{font-size:22px; line-height:1.3; font-weight:800; color:#0f172a; margin:14px auto} .hero-desc{color:#64748b; font-size:14px; line-height:1.6; margin-top:10px} .btn{padding:12px 24px; border-radius:12px; font-weight:800; font-size:13px; border:none; cursor:pointer} .btn-primary{background:#059669; color:white; box-shadow:0 0 0 3px #10b981} .btn-light{background:white; border:1px solid #e2e8f0; color:#0f172a} .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:22px; padding:20px 0 24px} .gridChem{display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px 0 40px} .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; display:flex; flex-direction:column} .card-img{height:210px; background:#f8fafc; display:flex; align-items:center; justify-content:center; position:relative; padding:14px; border-bottom:1px solid #f1f5f9} .card-img img{max-height:180px; max-width:100%; object-fit:contain} .pill{position:absolute; top:12px; left:12px; font-size:10px; font-weight:900; padding:5px 10px; border-radius:999px; text-transform:uppercase} .chem-card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:18px} .chem-icon{width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:12px} .cat-pharma{background:#fef3c7} .cat-paint{background:#e0e7ff} .cat-water{background:#ccfbf1} .section-title{font-size:21px; font-weight:900; color:#0f172a; margin:32px 0 16px; padding-top:22px; border-top:1px solid #e2e8f0} @media(max-width:1100px){.grid4,.gridChem{grid-template-columns:repeat(3,1fr)}} @media(max-width:700px){.grid4,.gridChem{grid-template-columns:repeat(2,1fr)} .brand-name{font-size:36px}} @media(max-width:500px){.grid4,.gridChem{grid-template-columns:1fr}} `}</style>

      {toast && <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: '#059669', color: 'white', padding: '14px 20px', borderRadius: 14, fontWeight: 800, maxWidth: 560, textAlign: 'center' }}>✅ {toast}</div>}

      <div className="header"><div className="container"><div className="header-inner"><div className="logo-icon">N</div><div className="brand-name">NiChAm Trade</div><div className="brand-sub">Powering Nigeria – Solar, Storage & Chemicals</div></div></div></div>

      <div className="container">
        <div className="hero">
          <div className="hero-subtitle">MOTOMA Grade A+ <span style={{ color: '#059669' }}>8000 Cycles</span>, MUST Inverters & Chemicals</div>
          <div className="hero-desc">Request a quote with shipping address – Receive DDP Lagos or DDP Premises (Minna, Abuja, Kano etc) pricing with shipping & docs.</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('MOTOMA')} className={getBtnClass(filter === 'MOTOMA')}>MOTOMA</button>
            <button onClick={() => setFilter('MUST')} className={getBtnClass(filter === 'MUST')}>MUST</button>
            <button onClick={() => setFilter('CHEMICALS')} className={getBtnClass(filter === 'CHEMICALS')}>Chemicals</button>
            <button onClick={() => setFilter('ALL')} className={getBtnClass(filter === 'ALL')}>All {solarProducts.length + chemicals.length}</button>
          </div>
        </div>

        {showRFQ && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: 'white', borderRadius: 20, padding: 28, width: '100%', maxWidth: 460, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>Request for quote – {(pendingItem as any)?.model || (pendingItem as any)?.name}</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 8 }}>Enter shipping address for DDP quote – Example: Premises Minna, Lagos Warehouse, Kano etc – Like your MOTOMA message in screenshot.</div>
              <input placeholder="Full Name *" value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} style={{ width: '100%', marginTop: 16, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <input placeholder="WhatsApp Number * +234..." value={buyer.whatsapp} onChange={e => setBuyer({ ...buyer, whatsapp: e.target.value })} style={{ width: '100%', marginTop: 10, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <input placeholder="Company Name" value={buyer.company} onChange={e => setBuyer({ ...buyer, company: e.target.value })} style={{ width: '100%', marginTop: 10, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }} />
              
              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 800 }}>DDP Type *</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <button onClick={() => setBuyer({ ...buyer, ddpType: 'DDP Lagos' })} style={{ flex: 1, padding: '10px', borderRadius: 10, border: buyer.ddpType === 'DDP Lagos' ? '2px solid #059669' : '1px solid #e2e8f0', background: buyer.ddpType === 'DDP Lagos' ? '#ecfdf5' : 'white', fontWeight: 800, fontSize: 12 }}>DDP Lagos</button>
                  <button onClick={() => setBuyer({ ...buyer, ddpType: 'DDP Premises' })} style={{ flex: 1, padding: '10px', borderRadius: 10, border: buyer.ddpType === 'DDP Premises' ? '2px solid #059669' : '1px solid #e2e8f0', background: buyer.ddpType === 'DDP Premises' ? '#ecfdf5' : 'white', fontWeight: 800, fontSize: 12 }}>DDP Premises</button>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 800 }}>Shipping Address * – DDP to Premises Minna etc</label>
                <textarea placeholder="Example: 123 Tunga Road, Minna, Niger State – Warehouse, or Lagos Port etc" value={buyer.shipping} onChange={e => setBuyer({ ...buyer, shipping: e.target.value })} style={{ width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0', minHeight: 70 }} />
                <div style={{ fontSize: 10, color: '#059669', marginTop: 4 }}>Used for exact quote: DDP Lagos, Nigeria – DDP to Premises {buyer.shipping || 'Minna'} – From screenshot image_003c13.png format</div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <button onClick={submitRFQ} style={{ flex: 1, background: '#059669', color: 'white', padding: '14px', borderRadius: 12, fontWeight: 900, border: 'none', cursor: 'pointer' }}>Request for quote</button>
                <button onClick={() => setShowRFQ(false)} style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '14px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <h2 className="section-title">☀️ Solar & Storage</h2>
        <div className="grid4">
          {filteredSolar.map(p => (
            <div key={p.id} className="card">
              <div className="card-img"><span className="pill" style={{ background: p.brand === 'MOTOMA' ? '#059669' : '#eab308', color: p.brand === 'MOTOMA' ? 'white' : 'black' }}>{p.brand}</span><img src={p.image} alt={p.model} /></div>
              <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{p.model}</div>
                <button onClick={() => openRFQ(p)} style={{ marginTop: 14, width: '100%', background: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: 12, fontWeight: 900, cursor: 'pointer' }}>Request for quote</button>
              </div>
            </div>
          ))}
        </div>

        {filteredChem.length > 0 && (
          <>
            <h2 className="section-title">🧪 Industrial Chemicals – Double Bulls</h2>
            <div className="gridChem">
              {filteredChem.map(c => (
                <div key={c.id} className="chem-card">
                  <div className={`chem-icon ${c.category === 'Pharmaceuticals' ? 'cat-pharma' : c.category === 'Paint chemicals' ? 'cat-paint' : 'cat-water'}`}>{c.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: 14 }}>{c.name}</div>
                  <button onClick={() => openRFQ(c)} style={{ marginTop: 12, width: '100%', background: '#0f172a', color: 'white', border: 'none', padding: '11px', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>Request for quote</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
