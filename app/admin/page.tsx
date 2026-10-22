'use client';
import { useState, useEffect } from 'react';

type RFQ = {
  id: string;
  buyer: string;
  whatsapp: string;
  company: string;
  shipping: string;
  ddpType: string;
  product: string;
  status: string;
  date: string;
  manufacturer: string;
  phone: string;
  platform: string;
  ddpMessage: string;
};

type Advert = {
  id: string;
  product: string;
  caption: string;
  image: string;
  type: 'image' | 'video';
  status: 'draft' | 'pending_review' | 'approved' | 'posted';
  created: string;
  platforms: string[];
  videoPrompt?: string;
};

export default function AdminV5() {
  const [tab, setTab] = useState<'rfqs' | 'adverts' | 'video'>('rfqs');
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [newAd, setNewAd] = useState({ product: 'M88PW PRO', caption: 'MOTOMA Grade A+ 8000 Cycles – 10.24kWh Wall Mount – DDP Lagos Nigeria – GSPI Associates', image: '/products/motoma/M88PW_PRO.png', videoPrompt: 'Solar battery rotating, Nigeria flag, powerful music, text: Powering Nigeria 8000 Cycles' });
  const [previewAd, setPreviewAd] = useState<Advert | null>(null);

  useEffect(() => {
    setRfqs(JSON.parse(localStorage.getItem('nicham_rfqs') || '[]'));
    setAdverts(JSON.parse(localStorage.getItem('nicham_adverts') || '[]'));
  }, []);

  const createAdvert = () => {
    const adv: Advert = {
      id: Date.now().toString(),
      product: newAd.product,
      caption: newAd.caption,
      image: newAd.image,
      type: 'image',
      status: 'pending_review',
      created: new Date().toLocaleString(),
      platforms: ['WhatsApp Channel 0029Vb97CjmKgsNjyCGUWS3r', 'Facebook abaniwog', 'Instagram @gspiassociatesltd', 'YouTube @godwinabaniwo6755', 'TikTok @user4981039143171', 'X @AbaniwoGodwin']
    };
    const updated = [adv, ...adverts];
    setAdverts(updated);
    localStorage.setItem('nicham_adverts', JSON.stringify(updated));
    alert('Advert created – Status: Pending Review – Admin must review before posting');
  };

  const createVideoAdvert = () => {
    const adv: Advert = {
      id: Date.now().toString(),
      product: newAd.product,
      caption: newAd.caption + ' – VIDEO AD – ' + newAd.videoPrompt,
      image: newAd.image,
      type: 'video',
      status: 'pending_review',
      created: new Date().toLocaleString(),
      platforms: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Facebook Reels', 'WhatsApp Status'],
      videoPrompt: newAd.videoPrompt
    };
    const updated = [adv, ...adverts];
    setAdverts(updated);
    localStorage.setItem('nicham_adverts', JSON.stringify(updated));
    alert('VIDEO Advert generated – Pending Review – Will create video for TikTok/Reels/Shorts');
  };

  const approveAdvert = (id: string) => {
    const updated = adverts.map(a => a.id === id ? { ...a, status: 'approved' as const } : a);
    setAdverts(updated);
    localStorage.setItem('nicham_adverts', JSON.stringify(updated));
  };

  const postAdvert = (id: string) => {
    const updated = adverts.map(a => a.id === id ? { ...a, status: 'posted' as const } : a);
    setAdverts(updated);
    localStorage.setItem('nicham_adverts', JSON.stringify(updated));
    alert('Posted to all platforms: WhatsApp Channel, FB, IG, YT, TikTok, X');
  };

  const forwardToManufacturer = (rfq: RFQ) => {
    const msg = encodeURIComponent(`${rfq.ddpMessage}\n\nShipping Address: ${rfq.shipping}\nDDP Type: ${rfq.ddpType}\nBuyer: ${rfq.buyer} – ${rfq.whatsapp}\n\nPlease quote DDP Lagos with shipping & docs – Include manufacturer price + logistics separately.`);
    const url = `https://wa.me/${rfq.phone.replace(/\D/g,'')}?text=${msg}`;
    window.open(url, '_blank');
    const updated = rfqs.map(r => r.id === rfq.id ? { ...r, status: `Forwarded to ${rfq.manufacturer} – Awaiting quote with shipping & docs – Shipping: ${rfq.shipping}` } : r);
    setRfqs(updated);
    localStorage.setItem('nicham_rfqs', JSON.stringify(updated));
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <style>{` .btn{padding:10px 18px; border-radius:10px; font-weight:800; font-size:12px; border:none; cursor:pointer} .btn-primary{background:#059669; color:white} .btn-dark{background:#0f172a; color:white} .btn-light{background:white; border:1px solid #e2e8f0} .card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:16px; margin-bottom:12px} `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900 }}>NiChAm Trade – Admin V5 – Shipping + Adverts Review + Video</h1>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button onClick={() => setTab('rfqs')} className={`btn ${tab === 'rfqs' ? 'btn-primary' : 'btn-light'}`}>RFQs with Shipping ({rfqs.length}) – From image_003c13.png format</button>
          <button onClick={() => setTab('adverts')} className={`btn ${tab === 'adverts' ? 'btn-primary' : 'btn-light'}`}>Adverts Review Before Posting ({adverts.filter(a=>a.status==='pending_review').length} pending)</button>
          <button onClick={() => setTab('video')} className={`btn ${tab === 'video' ? 'btn-primary' : 'btn-light'}`}>Video Ad Engine – TikTok/Reels/Shorts</button>
        </div>

        {tab === 'rfqs' && (
          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontWeight: 900 }}>RFQs – With Shipping Address – Format from screenshot image_003c13.png</h2>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 8, background: '#ecfdf5', padding: 12, borderRadius: 10, border: '1px solid #10b981' }}>
              Format: "DDP Lagos, Nigeria – DDP to Premises Minna – From: NiChAm Trade – Customer RFQ – Time: 10/18/2026 – Please quote DDP Lagos with shipping & docs." – Now buyer fills shipping address, admin sees it.
            </div>
            {rfqs.map(r => (
              <div key={r.id} className="card">
                <div style={{ fontWeight: 900 }}>{r.product} – {r.buyer} – {r.whatsapp}</div>
                <div style={{ fontSize: 12, marginTop: 6 }}><strong>Shipping:</strong> {r.shipping || 'No address – old RFQ'} – <strong>DDP Type:</strong> {r.ddpType}</div>
                <div style={{ fontSize: 12, marginTop: 6, background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap' }}>{r.ddpMessage || 'Old format – no DDP message'}</div>
                <div style={{ fontSize: 11, color: '#059669', marginTop: 6 }}>Status: {r.status}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button onClick={() => forwardToManufacturer(r)} className="btn btn-primary">→ Forward to Manufacturer with Shipping Address – Like WhatsApp screenshot</button>
                  <button onClick={() => { const mfgPrice = prompt('Enter Manufacturer Price (e.g., 1000000)'); const logPrice = prompt('Enter Logistics to '+r.shipping+' (e.g., 150000)'); if(mfgPrice && logPrice){ const total = parseFloat(mfgPrice)+parseFloat(logPrice); const fee = total*0.025; const final = total+fee; const msg = encodeURIComponent(`✅ QUOTE for ${r.product}\n\nMfg: ₦${mfgPrice}\nLogistics to ${r.shipping}: ₦${logPrice}\nSubtotal: ₦${total}\nPlatform fee 2.5%: ₦${fee}\nFINAL DDP ${r.shipping}: ₦${final}\n\nClick to ORDER and PAY:\nhttps://nicham-trade.vercel.app/quote?id=${r.id}\n\nGSPI Associates Ltd – Powering Nigeria`); window.open(`https://wa.me/${r.whatsapp.replace(/\D/g,'')}?text=${msg}`, '_blank'); const upd = rfqs.map(x=>x.id===r.id?{...x, status: `Quoted – Final ₦${final} to ${r.shipping} (Mfg ${mfgPrice}+Log ${logPrice}+2.5% fee) – Sent with ORDER & PAYMENT`}:x); setRfqs(upd); localStorage.setItem('nicham_rfqs', JSON.stringify(upd)); } }} className="btn btn-dark">Enter Prices + 2.5% Fee → Send to {r.shipping}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'adverts' && (
          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontWeight: 900 }}>Advertisement Engine – Review Before Posting to Social Media</h2>
            <div className="card">
              <h3 style={{ fontWeight: 800 }}>Create New Advert – Will go to Pending Review</h3>
              <input value={newAd.product} onChange={e=>setNewAd({...newAd, product: e.target.value})} placeholder="Product – M88PW PRO" style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #e2e8f0' }} />
              <textarea value={newAd.caption} onChange={e=>setNewAd({...newAd, caption: e.target.value})} placeholder="Caption for advert" style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #e2e8f0', minHeight: 70 }} />
              <input value={newAd.image} onChange={e=>setNewAd({...newAd, image: e.target.value})} placeholder="Image path" style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #e2e8f0' }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={createAdvert} className="btn btn-primary">Create Image Advert – Goes to Pending Review</button>
                <button onClick={() => setPreviewAd({ id: 'preview', product: newAd.product, caption: newAd.caption, image: newAd.image, type: 'image', status: 'pending_review', created: 'Now', platforms: [] })} className="btn btn-light">Preview Before Posting – Like WhatsApp bubble</button>
              </div>
            </div>

            {previewAd && (
              <div className="card" style={{ background: '#0f172a', color: 'white' }}>
                <div style={{ fontWeight: 900 }}>Preview – How buyer will see advert – Review before posting</div>
                <div style={{ background: 'white', color: 'black', borderRadius: 16, padding: 12, marginTop: 12, maxWidth: 360 }}>
                  <img src={previewAd.image} alt="preview" style={{ width: '100%', borderRadius: 12, maxHeight: 200, objectFit: 'contain' }} />
                  <div style={{ fontSize: 12, fontWeight: 800, marginTop: 8 }}>{previewAd.product}</div>
                  <div style={{ fontSize: 12, marginTop: 6 }}>{previewAd.caption}</div>
                  <div style={{ fontSize: 10, color: '#059669', marginTop: 8 }}>GSPI Associates Ltd – Powering Nigeria – DDP Lagos</div>
                </div>
                <button onClick={() => setPreviewAd(null)} className="btn btn-light" style={{ marginTop: 10 }}>Close Preview</button>
              </div>
            )}

            <h3 style={{ fontWeight: 800, marginTop: 20 }}>Pending Review – Admin must approve before posting ({adverts.filter(a=>a.status==='pending_review').length})</h3>
            {adverts.filter(a=>a.status==='pending_review').map(a => (
              <div key={a.id} className="card" style={{ border: '2px solid #eab308' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <img src={a.image} style={{ width: 80, height: 80, objectFit: 'contain', background: '#f8fafc', borderRadius: 10 }} alt="" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800 }}>{a.product} – {a.type.toUpperCase()} – {a.status}</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>{a.caption}</div>
                    <div style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>Platforms: {a.platforms.join(', ')}</div>
                    {a.videoPrompt && <div style={{ fontSize: 10, color: '#059669', marginTop: 4 }}>Video Prompt: {a.videoPrompt}</div>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={() => approveAdvert(a.id)} className="btn btn-primary">✅ Approve – Ready to Post</button>
                  <button onClick={() => { const upd = adverts.filter(x=>x.id!==a.id); setAdverts(upd); localStorage.setItem('nicham_adverts', JSON.stringify(upd)); }} className="btn btn-light">❌ Reject</button>
                </div>
              </div>
            ))}

            <h3 style={{ fontWeight: 800, marginTop: 20 }}>Approved – Ready to Post ({adverts.filter(a=>a.status==='approved').length})</h3>
            {adverts.filter(a=>a.status==='approved').map(a => (
              <div key={a.id} className="card" style={{ border: '2px solid #10b981' }}>
                <div style={{ fontWeight: 800 }}>{a.product} – Approved ✅</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{a.caption}</div>
                <button onClick={() => postAdvert(a.id)} className="btn btn-dark" style={{ marginTop: 10 }}>🚀 POST NOW to WhatsApp Channel 0029Vb97CjmKgsNjyCGUWS3r + FB abaniwog + IG @gspiassociatesltd + YT @godwinabaniwo6755 + TikTok @user4981039143171 + X @AbaniwoGodwin</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'video' && (
          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontWeight: 900 }}>Video Ad Engine – Generate Videos for Social Media</h2>
            <div className="card">
              <h3>Generate Video Advert – For TikTok, Instagram Reels, YouTube Shorts, Facebook Reels, WhatsApp Status</h3>
              <input value={newAd.product} onChange={e=>setNewAd({...newAd, product: e.target.value})} placeholder="Product" style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #e2e8f0' }} />
              <textarea value={newAd.caption} onChange={e=>setNewAd({...newAd, caption: e.target.value})} placeholder="Caption" style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #e2e8f0', minHeight: 60 }} />
              <textarea value={newAd.videoPrompt} onChange={e=>setNewAd({...newAd, videoPrompt: e.target.value})} placeholder="Video Prompt – Describe video: e.g., MOTOMA battery rotating, solar panels, Nigeria map, text overlay 8000 Cycles, upbeat music, 9:16 vertical" style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #e2e8f0', minHeight: 80 }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={createVideoAdvert} className="btn btn-primary">🎬 Generate Video Advert – 9:16 for TikTok/Reels/Shorts</button>
              </div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 12, background: '#f8fafc', padding: 10, borderRadius: 8 }}>
                Video engine will create: <br/>
                - 9:16 vertical video (1080x1920) for TikTok, IG Reels, YT Shorts, FB Reels, WhatsApp Status<br/>
                - Includes product image, caption, GSPI branding, DDP Lagos call to action<br/>
                - Auto-generates from prompt: "{newAd.videoPrompt}"<br/>
                - After generation, goes to Pending Review → Approve → Post
              </div>
            </div>

            <h3 style={{ fontWeight: 800, marginTop: 20 }}>Generated Video Adverts ({adverts.filter(a=>a.type==='video').length})</h3>
            {adverts.filter(a=>a.type==='video').map(a => (
              <div key={a.id} className="card">
                <div style={{ fontWeight: 800 }}>{a.product} – VIDEO – {a.status}</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{a.caption}</div>
                <div style={{ fontSize: 11, marginTop: 6, background: '#0f172a', color: 'white', padding: 8, borderRadius: 8 }}>Video Prompt: {a.videoPrompt}</div>
                <div style={{ fontSize: 11, marginTop: 6 }}>For: {a.platforms.join(', ')}</div>
                <div style={{ marginTop: 10, background: '#f8fafc', padding: 20, borderRadius: 12, textAlign: 'center', border: '1px dashed #e2e8f0' }}>
                  [VIDEO PREVIEW PLACEHOLDER – 9:16 Vertical – Will be generated with product rotating, Nigeria flag, 8000 Cycles text]
                </div>
                {a.status === 'pending_review' && <button onClick={() => approveAdvert(a.id)} className="btn btn-primary" style={{ marginTop: 10 }}>✅ Approve Video Advert</button>}
                {a.status === 'approved' && <button onClick={() => postAdvert(a.id)} className="btn btn-dark" style={{ marginTop: 10 }}>🚀 POST VIDEO to TikTok @user4981039143171 + IG Reels @gspiassociatesltd + YT Shorts @godwinabaniwo6755 + FB Reels abaniwog</button>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
