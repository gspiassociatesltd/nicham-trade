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

type Buyer = { name: string; whatsapp: string; company: string; channel: boolean; date: string };
type RFQ = { id: string; buyer: string; whatsapp: string; product: string; status: 'New RFQ' | 'Quoted' | 'Ordered'; date: string };

const SOCIALS = {
  whatsappChannel: 'https://whatsapp.com/channel/0029Vb97CjmKgsNjyCGUWS3r',
  whatsappChannelId: '0029Vb97CjmKgsNjyCGUWS3r',
  facebook: 'https://web.facebook.com/abaniwog',
  instagram: 'https://instagram.com/gspiassociatesltd',
  youtube: 'https://youtube.com/@godwinabaniwo6755',
  tiktok: 'https://tiktok.com/@user4981039143171',
  x: 'https://x.com/AbaniwoGodwin',
};

const solarProducts: Product[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V 5.12kWh', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah 25.6V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V 7.68kWh', image: '/products/motoma/M69PW_PRO.png', capacity: '300Ah 25.6V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V 5.12kWh', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V 10.24kWh', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah 51.2V', _manufacturer: 'MOTOMA Factory Shenzhen China', _phone: '+86 135 7082 3914', _platform: 'Factory Direct' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid Inverter', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', _manufacturer: 'MUST Power Factory Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid Inverter', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', _manufacturer: 'MUST Power Factory Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V 10.24kWh Wall', image: '/products/must/MUST_3_656x684.png', capacity: '200Ah 48V', _manufacturer: 'MUST Power Factory Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V 5.12kWh', image: '/products/must/MUST_4_526x684.png', capacity: '100Ah 48V', _manufacturer: 'MUST Power Factory Guangdong', _phone: '+86 189 2434 3876', _platform: 'Factory Direct' },
];

const chemicals: Chemical[] = [
  { id: 'PHARMA-1', category: 'Pharmaceuticals', name: 'Paracetamol Powder', grade: 'BP/USP Grade', icon: '💊', _manufacturer: 'Shanghai Medichem', _phone: '+86 138 1756 9021', _platform: 'Alibaba Gold' },
  { id: 'COM-1', category: 'Commodity chemicals', name: 'Caustic Soda', grade: 'Flakes 99%', icon: '⚗️', _manufacturer: 'Shandong Haihua', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'COM-2', category: 'Commodity chemicals', name: 'Hydrochloric Acid', grade: '30-33% Tech', icon: '🧴', _manufacturer: 'Guangzhou Tinci', _phone: '+86 135 6032 8890', _platform: 'Alibaba Gold' },
  { id: 'PAINT-1', category: 'Paint chemicals', name: 'Natrosol (HEC)', grade: '250 HBR', icon: '🎨', _manufacturer: 'Zhejiang Haishen', _phone: '+86 157 5712 3340', _platform: 'Alibaba Gold' },
  { id: 'WATER-1', category: 'Water treatment', name: 'Soda Ash', grade: 'Dense Light', icon: '🌊', _manufacturer: 'Shandong Haihua', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
  { id: 'WATER-2', category: 'Water treatment', name: 'Calcium Hypochlorite', grade: '65-70% Granular', icon: '💦', _manufacturer: 'Shandong Haihua', _phone: '+86 186 7820 4451', _platform: 'Alibaba Gold' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL' | 'MOTOMA' | 'MUST' | 'CHEMICALS'>('ALL');
  const [toast, setToast] = useState<string | null>(null);
  const [showReg, setShowReg] = useState(false);
  const [buyer, setBuyer] = useState({ name: '', whatsapp: '', company: '', channel: true });
  const [buyersDB, setBuyersDB] = useState<Buyer[]>([]);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [advertProduct, setAdvertProduct] = useState<Product | Chemical | null>(null);
  const [showMarketing, setShowMarketing] = useState(false);

  useEffect(() => {
    const savedBuyers = localStorage.getItem('nicham_buyers');
    const savedRfqs = localStorage.getItem('nicham_rfqs');
    if (savedBuyers) setBuyersDB(JSON.parse(savedBuyers));
    if (savedRfqs) setRfqs(JSON.parse(savedRfqs));
  }, []);

  const solarToShow = filter === 'ALL' ? solarProducts : filter === 'MOTOMA' ? solarProducts.filter(p => p.brand === 'MOTOMA') : filter === 'MUST' ? solarProducts.filter(p => p.brand === 'MUST') : [];
  const chemToShow = filter === 'ALL' || filter === 'CHEMICALS' ? chemicals : [];

  const saveBuyer = () => {
    if (!buyer.name || !buyer.whatsapp) { alert('Name & WhatsApp required'); return; }
    const newBuyer: Buyer = { ...buyer, date: new Date().toLocaleDateString() };
    const updated = [...buyersDB, newBuyer];
    setBuyersDB(updated);
    localStorage.setItem('nicham_buyers', JSON.stringify(updated));
    setShowReg(false);
    setToast(`Registered ${buyer.name} – ${buyersDB.length + 1} buyers in DB`);
    setTimeout(() => setToast(null), 4000);
  };

  const handleRFQ = (item: Product | Chemical) => {
    if (!buyer.whatsapp) { setShowReg(true); setToast('Please register WhatsApp first'); setTimeout(() => setToast(null), 3000); return; }
    const model = (item as any).model || (item as any).name;
    const mfg = (item as any)._manufacturer;
    const phone = (item as any)._phone;
    const plat = (item as any)._platform;
    const newRFQ: RFQ = { id: Date.now().toString(), buyer: buyer.name, whatsapp: buyer.whatsapp, product: model, status: 'New RFQ', date: new Date().toLocaleDateString() };
    const updated = [newRFQ, ...rfqs];
    setRfqs(updated);
    localStorage.setItem('nicham_rfqs', JSON.stringify(updated));
    const msg = `*NEW RFQ – NiChAm Trade*%0A%0ABuyer: ${buyer.name}%0AWhatsApp: ${buyer.whatsapp}%0ACompany: ${buyer.company}%0A%0AProduct: ${model}%0A%0ATARGET MANUFACTURER (Internal):%0A${mfg}%0APlatform: ${plat}%0APhone: ${phone}`;
    window.open(`https://wa.me/2347050477950?text=${msg}`, '_blank');
    setToast(`RFQ saved to tracker – Admin will respond`);
    setTimeout(() => setToast(null), 4000);
  };

  const createAdvert = (item: Product | Chemical) => {
    const name = (item as any).model || (item as any).name;
    const grade = (item as any).grade || (item as any).capacity;
    const advertText = `🔥 *NEW ARRIVAL – NiChAm Trade – Powering Nigeria* 🔥%0A%0A*${name}*%0A${grade}%0A%0A✅ Grade A+ 8000 Cycles (MOTOMA) / Factory Direct%0A✅ DDP Lagos Pricing Available%0A✅ Nationwide Delivery%0A%0A📲 Request Quote on WhatsApp Now!%0A👉 ${SOCIALS.whatsappChannel}%0A%0A#NiChAmTrade #SolarNigeria #IndustrialChemicals #Minna #Abuja #Lagos%0A%0AFB: ${SOCIALS.facebook} | IG: @gspiassociatesltd | YouTube: @godwinabaniwo6755 | TikTok: @user4981039143171 | X: @AbaniwoGodwin`;
    return advertText;
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{` *{box-sizing:border-box} body{margin:0} .container{max-width:1280px; margin:0 auto; padding:0 20px} .header{position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.97); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0} .header-inner{display:flex; justify-content:center; align-items:center; flex-direction:column; padding:24px 0 18px; text-align:center} .logo-icon{width:72px; height:72px; border-radius:18px; background:linear-gradient(135deg,#0f172a,#059669,#eab308); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:36px; box-shadow:0 10px 28px rgba(0,0,0,0.18)} .brand-name{font-size:52px; font-weight:900; letter-spacing:-2px; color:#0f172a; line-height:1; margin-top:12px} .brand-sub{font-size:13px; font-weight:800; color:#059669; letter-spacing:1.3px; text-transform:uppercase; margin-top:8px} .hero{padding:32px 0 20px; text-align:center; max-width:860px; margin:0 auto} .hero-subtitle{font-size:22px; line-height:1.3; font-weight:800; color:#0f172a; margin:14px auto; max-width:720px} .hero-desc{color:#64748b; font-size:14px; line-height:1.6; margin-top:10px; max-width:660px; margin-left:auto; margin-right:auto} .btn{padding:12px 24px; border-radius:12px; font-weight:800; font-size:13px; border:none; cursor:pointer; transition:all 0.2s} .btn:hover{transform:translateY(-1px); box-shadow:0 6px 18px rgba(0,0,0,0.12)} .btn-primary{background:#059669; color:white} .btn-dark{background:#0f172a; color:white} .btn-light{background:white; border:1px solid #e2e8f0; color:#0f172a} .btn-active{box-shadow:0 0 0 3px #10b981 !important; transform:scale(1.05)} .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:22px; padding:20px 0 24px} .gridChem{display:grid; grid-template-columns:repeat(4,1fr); gap:16px; padding:12px 0 40px} .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; transition:0.25s; display:flex; flex-direction:column} .card:hover{transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,0.12)} .card-img{height:210px; background:linear-gradient(180deg,#f8fafc 0%,#ffffff 100%); display:flex; align-items:center; justify-content:center; position:relative; padding:14px; border-bottom:1px solid #f1f5f9} .card-img img{max-height:180px; max-width:100%; object-fit:contain} .pill{position:absolute; top:12px; left:12px; font-size:10px; font-weight:900; padding:5px 10px; border-radius:999px; text-transform:uppercase} .chem-card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:18px; transition:0.2s} .chem-card:hover{box-shadow:0 12px 32px rgba(0,0,0,0.1); transform:translateY(-4px); border-color:#10b981} .chem-icon{width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:12px} .cat-pharma{background:#fef3c7} .cat-commodity{background:#dbeafe} .cat-paint{background:#e0e7ff} .cat-water{background:#ccfbf1} .section-title{font-size:21px; font-weight:900; color:#0f172a; margin:32px 0 16px; padding-top:22px; border-top:1px solid #e2e8f0} .social-btn{display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border-radius:999px; font-size:12px; font-weight:700; text-decoration:none; color:white; margin:4px} @media(max-width:1100px){.grid4,.gridChem{grid-template-columns:repeat(3,1fr)} .brand-name{font-size:42px}} @media(max-width:700px){.grid4,.gridChem{grid-template-columns:repeat(2,1fr)} .brand-name{font-size:36px} .hero-subtitle{font-size:18px}} @media(max-width:500px){.grid4,.gridChem{grid-template-columns:1fr} .brand-name{font-size:32px}} `}</style>

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
            <button onClick={() => setShowReg(true)} className="btn" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', fontSize: 11 }}>📱 Register WhatsApp ({buyersDB.length})</button>
            <button onClick={() => setShowMarketing(true)} className="btn" style={{ background: '#eab308', color: 'black', fontSize: 11 }}>📢 Marketing Engine</button>
          </div>
          {buyer.whatsapp && <div style={{ marginTop: 12, fontSize: 12, background: '#ecfdf5', color: '#047857', display: 'inline-block', padding: '6px 14px', borderRadius: 999, fontWeight: 700 }}>Registered: {buyer.name} – {buyer.whatsapp} • {rfqs.length} RFQs tracked</div>}
        </div>

        {showReg && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: 'white', borderRadius: 20, padding: 28, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
              <div style={{ fontWeight: 900, fontSize: 20, color: '#0f172a' }}>Register – WhatsApp Required for RFQ</div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 8, lineHeight: 1.5 }}>Enter your details. Your info is saved to Buyer Database (Feature 2) for marketing.</div>
              <input placeholder="Full Name" value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} style={{ width: '100%', marginTop: 18, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14 }} />
              <input placeholder="WhatsApp Number e.g. +234 803..." value={buyer.whatsapp} onChange={e => setBuyer({ ...buyer, whatsapp: e.target.value })} style={{ width: '100%', marginTop: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14 }} />
              <input placeholder="Company Name" value={buyer.company} onChange={e => setBuyer({ ...buyer, company: e.target.value })} style={{ width: '100%', marginTop: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14 }} />
              <label style={{ display: 'flex', gap: 10, marginTop: 14, fontSize: 12, alignItems: 'flex-start', lineHeight: 1.4, color: '#334155' }}><input type="checkbox" checked={buyer.channel} onChange={e => setBuyer({ ...buyer, channel: e.target.checked })} style={{ marginTop: 2 }} /> <span>Join WhatsApp Channel for new arrivals and special offers<br/><a href={SOCIALS.whatsappChannel} target="_blank" style={{ color: '#059669', fontWeight: 700 }}>https://whatsapp.com/channel/0029Vb97CjmKgsNjyCGUWS3r</a></span></label>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}><button onClick={saveBuyer} style={{ flex: 1, background: '#059669', color: 'white', padding: '13px', borderRadius: 12, fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: 14 }}>Register & Save to DB</button><button onClick={() => setShowReg(false)} style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '13px', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Cancel</button></div>
              <div style={{ marginTop: 12, fontSize: 11, color: '#059669', fontWeight: 700 }}>✓ Feature 2: Buyer DB – {buyersDB.length} buyers saved</div>
            </div>
          </div>
        )}

        {showMarketing && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
            <div style={{ background: 'white', borderRadius: 20, padding: 24, width: '100%', maxWidth: 680, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ fontWeight: 900, fontSize: 20 }}>📢 Marketing Engine – All 4 Features</div><button onClick={() => setShowMarketing(false)} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: 999, cursor: 'pointer' }}>✕</button></div>
              
              <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 14, padding: 14 }}><div style={{ fontWeight: 900, fontSize: 13, color: '#065f46' }}>1. WhatsApp Channel</div><div style={{ fontSize: 11, marginTop: 6, lineHeight: 1.4 }}>Channel: 0029Vb97CjmKgsNjyCGUWS3r<br/>Adverts only, NOT quotes</div><a href={SOCIALS.whatsappChannel} target="_blank" style={{ display: 'block', marginTop: 10, background: '#25D366', color: 'white', textAlign: 'center', padding: '8px', borderRadius: 10, fontWeight: 800, fontSize: 12, textDecoration: 'none' }}>Open Channel ↗</a></div>
                <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 14, padding: 14 }}><div style={{ fontWeight: 900, fontSize: 13, color: '#92400e' }}>2. Buyer DB</div><div style={{ fontSize: 11, marginTop: 6 }}>{buyersDB.length} buyers registered<br/>Stored in browser (Supabase-ready)</div><div style={{ marginTop: 10, fontSize: 10, background: 'white', borderRadius: 8, padding: 6, maxHeight: 80, overflowY: 'auto' }}>{buyersDB.map((b,i)=><div key={i} style={{ borderBottom: '1px solid #fef3c7', padding: '3px 0' }}>{b.name} – {b.whatsapp}</div>)}{buyersDB.length===0 && 'No buyers yet'}</div></div>
                <div style={{ background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 14, padding: 14 }}><div style={{ fontWeight: 900, fontSize: 13, color: '#1e40af' }}>4. RFQ Tracker</div><div style={{ fontSize: 11, marginTop: 6 }}>{rfqs.length} RFQs tracked</div><div style={{ marginTop: 10, fontSize: 10, background: 'white', borderRadius: 8, padding: 6, maxHeight: 80, overflowY: 'auto' }}>{rfqs.map((r)=><div key={r.id} style={{ borderBottom: '1px solid #dbeafe', padding: '3px 0', display: 'flex', justifyContent: 'space-between' }}><span>{r.buyer} – {r.product.slice(0,20)}</span><span style={{ background: r.status==='New RFQ'?'#fef3c7':'#dcfce7', padding: '2px 6px', borderRadius: 999, fontWeight: 700 }}>{r.status}</span></div>)}{rfqs.length===0 && 'No RFQs yet'}</div></div>
                <div style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', borderRadius: 14, padding: 14 }}><div style={{ fontWeight: 900, fontSize: 13, color: '#6b21a8' }}>Social Links</div><div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}><a href={SOCIALS.facebook} target="_blank" className="social-btn" style={{ background: '#1877F2' }}>Facebook</a><a href={SOCIALS.instagram} target="_blank" className="social-btn" style={{ background: '#E4405F' }}>Instagram</a><a href={SOCIALS.youtube} target="_blank" className="social-btn" style={{ background: '#FF0000' }}>YouTube</a><a href={SOCIALS.tiktok} target="_blank" className="social-btn" style={{ background: '#000' }}>TikTok</a><a href={SOCIALS.x} target="_blank" className="social-btn" style={{ background: '#000' }}>X</a></div></div>
              </div>

              <div style={{ marginTop: 18, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}><div style={{ fontWeight: 900, fontSize: 14 }}>3. Product Advert Creator (Feature 3)</div><div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Select a product → Generate advert text → Post to all socials + WhatsApp Channel</div>
                <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[...solarProducts.slice(0,2), ...chemicals.slice(0,2)].map(p=>(
                    <div key={p.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 11, fontWeight: 700 }}>{(p as any).model || (p as any).name}</div>
                      <button onClick={()=>setAdvertProduct(p)} style={{ background: '#0f172a', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 8, fontSize: 10, fontWeight: 800, cursor: 'pointer' }}>Create Advert</button>
                    </div>
                  ))}
                </div>
                {advertProduct && (
                  <div style={{ marginTop: 14, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 12 }}>Generated Advert for {(advertProduct as any).model || (advertProduct as any).name}:</div>
                    <textarea readOnly value={decodeURIComponent(createAdvert(advertProduct))} style={{ width: '100%', marginTop: 8, height: 180, borderRadius: 8, border: '1px solid #e2e8f0', padding: 10, fontSize: 11, fontFamily: 'monospace' }} />
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                      <button onClick={()=>{ const text=createAdvert(advertProduct!); window.open(`https://wa.me/?text=${text}`, '_blank'); }} style={{ background: '#25D366', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 10, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>Share to WhatsApp</button>
                      <button onClick={()=>{ const text=createAdvert(advertProduct!); window.open(SOCIALS.whatsappChannel, '_blank'); }} style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 10, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>Post to Channel</button>
                      <button onClick={()=>{ const text=createAdvert(advertProduct!); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SOCIALS.facebook)}&quote=${text}`, '_blank'); }} style={{ background: '#1877F2', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 10, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>Share to Facebook</button>
                    </div>
                  </div>
                )}
              </div>
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
                    <button onClick={() => { setAdvertProduct(p); setShowMarketing(true); }} style={{ marginTop: 8, width: '100%', background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: 10, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>📢 Create Advert</button>
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
                    <button onClick={() => { setAdvertProduct(c); setShowMarketing(true); }} style={{ marginTop: 8, width: '100%', background: 'white', border: '1px solid #e2e8f0', padding: '8px', borderRadius: 10, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>📢 Create Advert</button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <footer style={{ background: '#0f172a', color: 'white', padding: '32px 0', marginTop: 20 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: -0.5 }}>NiChAm Trade – Powering Nigeria</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 8 }}>Solar • Storage • Industrial Chemicals • Minna • Abuja • Lagos</div>
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
            <a href={SOCIALS.whatsappChannel} target="_blank" className="social-btn" style={{ background: '#25D366' }}>📢 WhatsApp Channel</a>
            <a href={SOCIALS.facebook} target="_blank" className="social-btn" style={{ background: '#1877F2' }}>Facebook: abaniwog</a>
            <a href={SOCIALS.instagram} target="_blank" className="social-btn" style={{ background: '#E4405F' }}>Instagram: @gspiassociatesltd</a>
            <a href={SOCIALS.youtube} target="_blank" className="social-btn" style={{ background: '#FF0000' }}>YouTube: @godwinabaniwo6755</a>
            <a href={SOCIALS.tiktok} target="_blank" className="social-btn" style={{ background: '#000' }}>TikTok: @user4981039143171</a>
            <a href={SOCIALS.x} target="_blank" className="social-btn" style={{ background: '#000' }}>X: @AbaniwoGodwin</a>
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: '#64748b' }}>Marketing Engine Active – Buyer DB: {buyersDB.length} | RFQ Tracker: {rfqs.length} | Channel: {SOCIALS.whatsappChannelId}</div>
        </div>
      </footer>
    </div>
  );
}
