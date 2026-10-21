'use client';
import { useState, useEffect } from 'react';

type Buyer = { name: string; whatsapp: string; company: string; channel: boolean; date: string };
type RFQ = { id: string; buyer: string; whatsapp: string; product: string; status: 'New RFQ' | 'Quoted' | 'Ordered'; date: string; manufacturer?: string; phone?: string; quotePrice?: string; quoteLink?: string };

const SOCIALS = {
  whatsappChannel: 'https://whatsapp.com/channel/0029Vb97CjmKgsNjyCGUWS3r',
  facebook: 'https://web.facebook.com/abaniwog',
  instagram: 'https://instagram.com/gspiassociatesltd',
  youtube: 'https://youtube.com/@godwinabaniwo6755',
  tiktok: 'https://tiktok.com/@user4981039143171',
  x: 'https://x.com/AbaniwoGodwin',
};

const productsList = [
  { name: 'M68PW PRO - 200Ah 25.6V 5.12kWh', img: '/products/motoma/M68PW_PRO.png', brand: 'MOTOMA' },
  { name: 'M69PW PRO - 300Ah 25.6V 7.68kWh', img: '/products/motoma/M69PW_PRO.png', brand: 'MOTOMA' },
  { name: 'M87PW PRO - 100Ah 51.2V 5.12kWh', img: '/products/motoma/M87PW_PRO.png', brand: 'MOTOMA' },
  { name: 'M88PW PRO - 200Ah 51.2V 10.24kWh', img: '/products/motoma/M88PW_PRO.png', brand: 'MOTOMA' },
  { name: 'MUST PV18-5248 PRO 5.2kW Hybrid Inverter', img: '/products/must/MUST_1_916x1268.png', brand: 'MUST' },
  { name: 'MUST LP16-48200 200Ah 48V Wall Battery', img: '/products/must/MUST_3_656x684.png', brand: 'MUST' },
  { name: 'Paracetamol Powder BP/USP', img: '', brand: 'CHEM' },
  { name: 'Caustic Soda Flakes 99%', img: '', brand: 'CHEM' },
];

export default function AdminMarketingV2() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [advertText, setAdvertText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(productsList[0]);
  const [quotePrice, setQuotePrice] = useState('');
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);

  useEffect(() => {
    const b = localStorage.getItem('nicham_buyers');
    const r = localStorage.getItem('nicham_rfqs');
    if (b) setBuyers(JSON.parse(b));
    if (r) setRfqs(JSON.parse(r));
    generateAdvert(productsList[0]);
  }, []);

  const generateAdvert = (product: typeof productsList[0]) => {
    setSelectedProduct(product);
    const text = `🔥 *NEW ARRIVAL – NiChAm Trade – Powering Nigeria* 🔥

*${product.name}*

✅ Grade A+ 8000 Cycles / Factory Direct
✅ DDP Lagos Pricing Available
✅ Nationwide Delivery – Minna • Abuja • Lagos

📲 Request Quote on Website Now!
👉 nicham-trade-qgl0mwrqz-kpata-academy.vercel.app

🔗 Follow Us:
📢 WhatsApp Channel: ${SOCIALS.whatsappChannel}
📘 Facebook: ${SOCIALS.facebook}
📸 Instagram: @gspiassociatesltd
🎥 YouTube: @godwinabaniwo6755
🎵 TikTok: @user4981039143171
🐦 X: @AbaniwoGodwin

#NiChAmTrade #SolarNigeria #IndustrialChemicals #8000Cycles #${product.brand}`;
    setAdvertText(text);
  };

  const generateQuoteLink = (rfq: RFQ) => {
    if (!quotePrice) { alert('Enter quote price first'); return; }
    const price = quotePrice;
    const quoteMsg = `*NiChAm Trade – QUOTATION*%0A%0ADear ${rfq.buyer},%0A%0AProduct: ${rfq.product}%0A%0A*DDP Lagos Price: ₦${price}*%0A(Includes clearing & delivery to Lagos)%0A%0A✅ Stock: Factory Direct%0A✅ Warranty: Manufacturer Warranty%0A✅ Delivery: 2-4 weeks after payment%0A%0A*Next Steps:*%0A1. Click ORDER button below%0A2. Click MAKE PAYMENT%0A3. Send proof to 07050477950%0A%0AQuote Link: https://nicham-trade-qgl0mwrqz-kpata-academy.vercel.app/quote?id=${rfq.id}%0A%0AWhatsApp Channel for updates: ${SOCIALS.whatsappChannel}`;
    
    // Update RFQ with price and link
    const updated = rfqs.map(r => r.id === rfq.id ? { ...r, quotePrice: price, quoteLink: `quote?id=${rfq.id}`, status: 'Quoted' as const } : r);
    setRfqs(updated);
    localStorage.setItem('nicham_rfqs', JSON.stringify(updated));
    localStorage.setItem(`quote_${rfq.id}`, JSON.stringify({ ...rfq, quotePrice: price, date: new Date().toLocaleString() }));

    window.open(`https://wa.me/${rfq.whatsapp.replace(/[^0-9]/g,'')}?text=${quoteMsg}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <style>{` .card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:18px} .btn{padding:10px 16px; border-radius:10px; font-weight:800; border:none; cursor:pointer; font-size:12px} .whatsapp-preview{background:#e5ddd5; border-radius:16px; padding:16px; position:relative} .wa-bubble{background:white; border-radius:8px 0 8px 8px; padding:12px; box-shadow:0 1px 2px rgba(0,0,0,0.15); max-width:95%} `}</style>
      
      <div style={{ maxWidth: 1250, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div><h1 style={{ fontSize: 26, fontWeight: 900, margin: 0 }}>🛠️ Admin Console V2 – Marketing Engine + Quotes</h1><div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Preview ads before posting • Quotes with ORDER & PAYMENT buttons</div></div>
          <div style={{ display: 'flex', gap: 8 }}><a href="/" className="btn" style={{ background: 'white', border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a' }}>← Customer Site (Clean)</a><a href="/quote?id=demo" className="btn" style={{ background: '#0f172a', color: 'white', textDecoration: 'none' }}>Preview Buyer Quote Page</a></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 22 }}>
          <div className="card" style={{ borderLeft: '4px solid #25D366' }}><div style={{ fontWeight: 900, fontSize: 13 }}>1. WhatsApp Channel – {SOCIALS.whatsappChannel.split('/').pop()}</div><div style={{ fontSize: 11, marginTop: 6 }}>Adverts ONLY – No quotes to channel</div><a href={SOCIALS.whatsappChannel} target="_blank" className="btn" style={{ display: 'block', marginTop: 10, background: '#25D366', color: 'white', textAlign: 'center', textDecoration: 'none' }}>Open Channel ↗</a></div>
          <div className="card" style={{ borderLeft: '4px solid #eab308' }}><div style={{ fontWeight: 900 }}>2. Buyer DB – {buyers.length}</div><div style={{ fontSize: 11, maxHeight: 100, overflowY: 'auto', marginTop: 8 }}>{buyers.map((b,i)=><div key={i} style={{ borderBottom: '1px solid #fef3c7', padding: '4px 0' }}>{b.name} – {b.whatsapp}</div>)}{buyers.length===0 && 'No buyers yet'}</div></div>
          <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}><div style={{ fontWeight: 900 }}>4. RFQ Tracker – {rfqs.length}</div><div style={{ fontSize: 11, maxHeight: 100, overflowY: 'auto', marginTop: 8 }}>{rfqs.map(r=><div key={r.id} style={{ padding: '4px 0', borderBottom: '1px solid #dbeafe' }}>{r.buyer} – {r.product.slice(0,20)} – <b>{r.status}</b> {r.quotePrice && `₦${r.quotePrice}`}</div>)}{rfqs.length===0 && 'No RFQs'}</div></div>
        </div>

        {/* ADVERT CREATOR V2 WITH PREVIEW */}
        <div className="card" style={{ marginTop: 18, borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>3. Product Advert Creator – WITH PREVIEW BEFORE POSTING</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <select value={selectedProduct.name} onChange={e=>{ const p = productsList.find(x=>x.name===e.target.value)!; generateAdvert(p); }} style={{ flex: 1, minWidth: 260, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', fontWeight: 700 }}>
              {productsList.map(p=><option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 8 }}>✏️ Edit Advert Text (Admin Edit):</div>
              <textarea value={advertText} onChange={e=>setAdvertText(e.target.value)} style={{ width: '100%', height: 340, borderRadius: 12, border: '1px solid #e2e8f0', padding: 12, fontSize: 12, fontFamily: 'monospace' }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(advertText)}`, '_blank')} className="btn" style={{ background: '#25D366', color: 'white', flex: 1 }}>Share WhatsApp</button>
                <button onClick={()=>window.open(SOCIALS.whatsappChannel, '_blank')} className="btn" style={{ background: '#0f172a', color: 'white', flex: 1 }}>Post to Channel</button>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 8 }}>👁️ PREVIEW – How buyer will see it (WhatsApp Style):</div>
              <div className="whatsapp-preview">
                <div style={{ position: 'absolute', top: 0, right: 20, width: 0, height: 0, borderLeft: '10px solid white', borderBottom: '10px solid transparent' }}></div>
                <div className="wa-bubble">
                  {selectedProduct.img && <img src={selectedProduct.img} alt="" style={{ width: '100%', maxHeight: 160, objectFit: 'contain', borderRadius: 8, marginBottom: 10, background: '#f8fafc' }} />}
                  <div style={{ whiteSpace: 'pre-wrap', fontSize: 12, lineHeight: 1.5, fontFamily: 'sans-serif' }}>{advertText}</div>
                  <div style={{ fontSize: 10, color: '#667781', marginTop: 8, textAlign: 'right' }}>{new Date().toLocaleTimeString()} ✓✓</div>
                </div>
                <div style={{ marginTop: 12, fontSize: 10, color: '#54656f', background: '#d9fdd3', padding: '8px 10px', borderRadius: 8, textAlign: 'center' }}>↑ This is exactly how it will appear in WhatsApp Channel – Check before posting</div>
              </div>
              <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <a href={SOCIALS.facebook} target="_blank" className="btn" style={{ background: '#1877F2', color: 'white', textAlign: 'center', textDecoration: 'none' }}>Facebook</a>
                <a href={SOCIALS.instagram} target="_blank" className="btn" style={{ background: '#E4405F', color: 'white', textAlign: 'center', textDecoration: 'none' }}>Instagram</a>
                <a href={SOCIALS.youtube} target="_blank" className="btn" style={{ background: '#FF0000', color: 'white', textAlign: 'center', textDecoration: 'none' }}>YouTube</a>
                <a href={SOCIALS.tiktok} target="_blank" className="btn" style={{ background: '#000', color: 'white', textAlign: 'center', textDecoration: 'none' }}>TikTok</a>
              </div>
            </div>
          </div>
        </div>

        {/* QUOTE GENERATOR WITH ORDER & PAYMENT */}
        <div className="card" style={{ marginTop: 18, borderLeft: '4px solid #059669' }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>💰 Quote Generator – With ORDER & MAKE PAYMENT Buttons (Buyer View)</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Select RFQ → Enter DDP Price → Generate Quote Link → Buyer gets page with Order + Payment buttons</div>
          
          {rfqs.length===0 ? (
            <div style={{ marginTop: 14, padding: 20, background: '#f1f5f9', borderRadius: 12, textAlign: 'center', fontSize: 13 }}>No RFQs yet. When buyer requests RFQ on customer site, it will appear here.</div>
          ) : (
            <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
              {rfqs.map(rfq=>(
                <div key={rfq.id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 12, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ flex: 1, minWidth: 200 }}><b>{rfq.buyer}</b> – {rfq.whatsapp}<br/><span style={{ fontSize: 11 }}>{rfq.product}</span> – <span style={{ background: rfq.status==='New RFQ'?'#fef3c7':'#dcfce7', padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 800 }}>{rfq.status}</span>{rfq.quotePrice && <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 800 }}>₦{rfq.quotePrice}</span>}</div>
                  <input placeholder="DDP Price ₦ e.g. 1,250,000" value={selectedRFQ?.id===rfq.id ? quotePrice : rfq.quotePrice||''} onFocus={()=>{ setSelectedRFQ(rfq); setQuotePrice(rfq.quotePrice||''); }} onChange={e=>setQuotePrice(e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, width: 160 }} />
                  <button onClick={()=>generateQuoteLink(rfq)} className="btn" style={{ background: '#059669', color: 'white' }}>Generate Quote + Order Link</button>
                  {rfq.quoteLink && <a href={`/${rfq.quoteLink}`} target="_blank" className="btn" style={{ background: 'white', border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a' }}>Preview Buyer Page</a>}
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 14, fontSize: 11, background: '#ecfdf5', padding: 10, borderRadius: 8, border: '1px solid #a7f3d0' }}>
            <b>Buyer Quote Page includes:</b> ✅ Product + Price + DDP Lagos • <b>🛒 ORDER BUTTON</b> (creates order) • <b>💳 MAKE PAYMENT BUTTON</b> (account to be supplied by you Boss) • Payment proof upload to WhatsApp 07050477950
          </div>
        </div>
      </div>
    </div>
  );
}
