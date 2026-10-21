'use client';
import { useState, useEffect } from 'react';

type Buyer = { name: string; whatsapp: string; company: string; channel: boolean; date: string };
type RFQ = { id: string; buyer: string; whatsapp: string; product: string; status: 'New RFQ' | 'Quoted' | 'Ordered'; date: string; manufacturer?: string; phone?: string };

const SOCIALS = {
  whatsappChannel: 'https://whatsapp.com/channel/0029Vb97CjmKgsNjyCGUWS3r',
  whatsappChannelId: '0029Vb97CjmKgsNjyCGUWS3r',
  facebook: 'https://web.facebook.com/abaniwog',
  instagram: 'https://instagram.com/gspiassociatesltd',
  youtube: 'https://youtube.com/@godwinabaniwo6755',
  tiktok: 'https://tiktok.com/@user4981039143171',
  x: 'https://x.com/AbaniwoGodwin',
};

const productsList = [
  'M68PW PRO - 200Ah 25.6V 5.12kWh',
  'M69PW PRO - 300Ah 25.6V 7.68kWh',
  'M87PW PRO - 100Ah 51.2V 5.12kWh',
  'M88PW PRO - 200Ah 51.2V 10.24kWh',
  'M90 PRO - 320Ah 51.2V 16.38kWh Rack',
  'MUST PV18-5248 PRO 5.2kW Hybrid Inverter',
  'MUST PV18-8048 PRO 8kW Hybrid Inverter',
  'MUST LP16-48200 200Ah 48V 10.24kWh Wall',
  'Paracetamol Powder BP/USP',
  'Caustic Soda Flakes 99%',
  'Hydrochloric Acid 30-33%',
  'Natrosol (HEC) 250 HBR',
  'Soda Ash Dense Light',
  'Calcium Hypochlorite 65-70%',
];

export default function AdminMarketingPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [advertText, setAdvertText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(productsList[0]);

  useEffect(() => {
    const b = localStorage.getItem('nicham_buyers');
    const r = localStorage.getItem('nicham_rfqs');
    if (b) setBuyers(JSON.parse(b));
    if (r) setRfqs(JSON.parse(r));
    generateAdvert(productsList[0]);
  }, []);

  const generateAdvert = (product: string) => {
    setSelectedProduct(product);
    const text = `🔥 *NEW ARRIVAL – NiChAm Trade – Powering Nigeria* 🔥

*${product}*

✅ Grade A+ 8000 Cycles / Factory Direct
✅ DDP Lagos Pricing Available
✅ Nationwide Delivery – Minna • Abuja • Lagos

📲 Request Quote on Website Now!
👉 nicham-trade-ovbwb0otx-kpata-academy.vercel.app

🔗 Follow Us:
📢 WhatsApp Channel: ${SOCIALS.whatsappChannel}
📘 Facebook: ${SOCIALS.facebook}
📸 Instagram: @gspiassociatesltd
🎥 YouTube: @godwinabaniwo6755
🎵 TikTok: @user4981039143171
🐦 X: @AbaniwoGodwin

#NiChAmTrade #SolarNigeria #IndustrialChemicals #8000Cycles #MOTOMA #MUST #Minna #Abuja #Lagos`;
    setAdvertText(text);
  };

  const updateRFQStatus = (id: string, status: RFQ['status']) => {
    const updated = rfqs.map(r => r.id === id ? { ...r, status } : r);
    setRfqs(updated);
    localStorage.setItem('nicham_rfqs', JSON.stringify(updated));
  };

  const shareToChannel = () => {
    window.open(SOCIALS.whatsappChannel, '_blank');
  };
  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(advertText)}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <style>{` .card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:18px} .btn{padding:10px 16px; border-radius:10px; font-weight:800; border:none; cursor:pointer; font-size:12px} `}</style>
      
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div><h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>🛠️ Admin Console – Marketing Engine</h1><div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Branch: feature/marketing_engine | Good main is locked safe</div></div>
          <div style={{ display: 'flex', gap: 8 }}><a href="/" className="btn" style={{ background: 'white', border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a' }}>← Back to Clean Customer Site</a><span className="btn" style={{ background: '#0f172a', color: 'white' }}>Admin Only – China & Nigeria Team</span></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 16, marginTop: 24 }}>
          
          {/* FEATURE 1: WhatsApp Channel */}
          <div className="card" style={{ borderLeft: '4px solid #25D366' }}>
            <div style={{ fontWeight: 900, color: '#065f46' }}>1. WhatsApp Channel (Adverts ONLY)</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 6, lineHeight: 1.5 }}>Channel ONLY for adverts, new products, announcements.<br/>Quote goes ONLY to buyer WhatsApp, NOT to channel.<br/>ID: {SOCIALS.whatsappChannelId}</div>
            <a href={SOCIALS.whatsappChannel} target="_blank" className="btn" style={{ display: 'block', textAlign: 'center', marginTop: 12, background: '#25D366', color: 'white', textDecoration: 'none' }}>Open Channel ↗</a>
            <div style={{ marginTop: 10, fontSize: 10, background: '#ecfdf5', padding: 8, borderRadius: 8 }}>Rule: Manufacturer names internal – not shown to customers. RFQ routed internally to factory.</div>
          </div>

          {/* FEATURE 2: Buyer DB */}
          <div className="card" style={{ borderLeft: '4px solid #eab308' }}>
            <div style={{ fontWeight: 900, color: '#92400e' }}>2. Buyer Database – {buyers.length} Buyers</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 6 }}>All registrations from clean customer site saved here. Supabase-ready.</div>
            <div style={{ marginTop: 10, maxHeight: 160, overflowY: 'auto', background: '#fffbeb', borderRadius: 8, padding: 8, fontSize: 11 }}>
              {buyers.length===0 && <div style={{ color: '#92400e' }}>No buyers yet – will populate when customers register on main site</div>}
              {buyers.map((b,i)=><div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #fde68a' }}><b>{b.name}</b> – {b.whatsapp}<br/><span style={{ fontSize: 10, color: '#78716c' }}>{b.company} | {b.date} | Channel: {b.channel?'Yes':'No'}</span></div>)}
            </div>
            <button onClick={()=>{ if(confirm('Clear all buyers?')) { setBuyers([]); localStorage.removeItem('nicham_buyers'); }}} className="btn" style={{ marginTop: 10, background: 'white', border: '1px solid #e2e8f0', width: '100%' }}>Clear DB</button>
          </div>

          {/* FEATURE 4: RFQ Tracker */}
          <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
            <div style={{ fontWeight: 900, color: '#1e40af' }}>4. RFQ → Quote → Order Tracker – {rfqs.length} RFQs</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 6 }}>Track status: New RFQ → Quoted → Ordered</div>
            <div style={{ marginTop: 10, maxHeight: 160, overflowY: 'auto', background: '#eff6ff', borderRadius: 8, padding: 8, fontSize: 11 }}>
              {rfqs.length===0 && <div style={{ color: '#1e40af' }}>No RFQs yet</div>}
              {rfqs.map(r=><div key={r.id} style={{ padding: '6px 0', borderBottom: '1px solid #dbeafe' }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span><b>{r.buyer}</b> – {r.product.slice(0,25)}</span><select value={r.status} onChange={e=>updateRFQStatus(r.id, e.target.value as any)} style={{ fontSize: 10, borderRadius: 6, border: '1px solid #93c5fd' }}><option>New RFQ</option><option>Quoted</option><option>Ordered</option></select></div><div style={{ fontSize: 9, color: '#64748b' }}>{r.whatsapp} | {r.date}</div></div>)}
            </div>
          </div>
        </div>

        {/* FEATURE 3: Advert Creator */}
        <div className="card" style={{ marginTop: 16, borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ fontWeight: 900, color: '#6b21a8', fontSize: 16 }}>3. Product Advert Creator – For All Socials</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Select product → Auto-generates advert with all your social links → Post to Channel, Facebook, Instagram, YouTube, TikTok, X</div>
          
          <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <select value={selectedProduct} onChange={e=>generateAdvert(e.target.value)} style={{ flex: 1, minWidth: 260, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 600 }}>
              {productsList.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
            <button onClick={shareToChannel} className="btn" style={{ background: '#25D366', color: 'white' }}>📢 Post to WhatsApp Channel</button>
            <button onClick={shareToWhatsApp} className="btn" style={{ background: '#0f172a', color: 'white' }}>Share to WhatsApp</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16 }}>
            <textarea value={advertText} onChange={e=>setAdvertText(e.target.value)} style={{ width: '100%', height: 320, borderRadius: 12, border: '1px solid #e2e8f0', padding: 14, fontSize: 12, fontFamily: 'monospace', lineHeight: 1.5 }} />
            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', padding: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 12 }}>Preview & Quick Share:</div>
              <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <a href={SOCIALS.whatsappChannel} target="_blank" className="btn" style={{ background: '#25D366', color: 'white', textAlign: 'center', textDecoration: 'none' }}>WhatsApp Channel</a>
                <a href={SOCIALS.facebook} target="_blank" className="btn" style={{ background: '#1877F2', color: 'white', textAlign: 'center', textDecoration: 'none' }}>Facebook – abaniwog</a>
                <a href={SOCIALS.instagram} target="_blank" className="btn" style={{ background: '#E4405F', color: 'white', textAlign: 'center', textDecoration: 'none' }}>Instagram – gspiassociatesltd</a>
                <a href={SOCIALS.youtube} target="_blank" className="btn" style={{ background: '#FF0000', color: 'white', textAlign: 'center', textDecoration: 'none' }}>YouTube – godwinabaniwo6755</a>
                <a href={SOCIALS.tiktok} target="_blank" className="btn" style={{ background: '#000', color: 'white', textAlign: 'center', textDecoration: 'none' }}>TikTok – user4981039143171</a>
                <a href={SOCIALS.x} target="_blank" className="btn" style={{ background: '#000', color: 'white', textAlign: 'center', textDecoration: 'none' }}>X – AbaniwoGodwin</a>
              </div>
              <div style={{ marginTop: 14, fontSize: 11, background: 'white', borderRadius: 8, padding: 10, border: '1px dashed #e2e8f0' }}>
                <b>How to use:</b><br/>1. Select product<br/>2. Edit text if needed<br/>3. Click Post to Channel – opens your channel link: <br/><span style={{ color: '#059669', wordBreak: 'break-all' }}>{SOCIALS.whatsappChannel}</span><br/>4. Paste advert in channel<br/>5. Same advert share to FB/IG/YT/TikTok/X
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 11, color: '#94a3b8' }}>Admin Console – Marketing Engine | Branch: feature/marketing_engine | Good customer version locked in main & backup/stable-v1-clean-2026-10-21 | Manufacturer names internal only – not shown to customers</div>
      </div>
    </div>
  );
}
