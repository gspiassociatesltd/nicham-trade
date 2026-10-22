'use client';
import { useState, useEffect } from 'react';

type RFQ = {
  id: string;
  buyer: string;
  whatsapp: string;
  company?: string;
  product: string;
  status: 'New RFQ' | 'Forwarded to Manufacturer' | 'Forwarded to Logistics' | 'Quote Received' | 'Quoted with Fee' | 'Ordered';
  date: string;
  manufacturer?: string;
  phone?: string;
  platform?: string;
  mfgPrice?: string; // Price from manufacturer
  logisticsPrice?: string; // Price from logistics
  totalBeforeFee?: number;
  platformFee?: number;
  finalPrice?: number;
  finalPriceStr?: string;
};

const SOCIALS = {
  whatsappChannel: 'https://whatsapp.com/channel/0029Vb97CjmKgsNjyCGUWS3r',
};

export default function AdminConsoleFeeV4() {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [inputs, setInputs] = useState<Record<string, { mfg: string; logistics: string }>>({});

  useEffect(() => {
    const r = localStorage.getItem('nicham_rfqs');
    if (r) {
      const parsed = JSON.parse(r);
      // migrate old status
      setRfqs(parsed);
      const init: Record<string, { mfg: string; logistics: string }> = {};
      parsed.forEach((x: RFQ) => {
        init[x.id] = { mfg: x.mfgPrice || '', logistics: x.logisticsPrice || '' };
      });
      setInputs(init);
    }
  }, []);

  const saveAll = (updated: RFQ[]) => {
    setRfqs(updated);
    localStorage.setItem('nicham_rfqs', JSON.stringify(updated));
  };

  const calc = (mfgStr: string, logStr: string) => {
    const mfg = parseFloat(mfgStr.replace(/,/g, '')) || 0;
    const log = parseFloat(logStr.replace(/,/g, '')) || 0;
    const total = mfg + log;
    const fee = total * 0.025;
    const final = total + fee;
    return { mfg, log, total, fee, final };
  };

  const forwardToManufacturer = (rfq: RFQ) => {
    const updated = rfqs.map(r => r.id === rfq.id ? { ...r, status: 'Forwarded to Manufacturer' as const } : r);
    saveAll(updated);
    const msg = `*RFQ FORWARD – Manufacturer*%0A%0AProduct: ${rfq.product}%0ABuyer: ${rfq.buyer} (${rfq.whatsapp})%0A%0A*Target:* ${rfq.manufacturer}%0APhone: ${rfq.phone}%0APlatform: ${rfq.platform}%0A%0APlease provide EXW price & stock. Quote will return to Admin Console for 2.5% platform fee addition before sending to customer.%0A%0ARFQ ID: ${rfq.id}`;
    window.open(`https://wa.me/${(rfq.phone || '2347050477950').replace(/[^0-9]/g,'')}?text=${msg}`, '_blank');
  };

  const forwardToLogistics = (rfq: RFQ) => {
    const updated = rfqs.map(r => r.id === rfq.id ? { ...r, status: 'Forwarded to Logistics' as const } : r);
    saveAll(updated);
    const msg = `*RFQ FORWARD – Logistics Company*%0A%0AProduct: ${rfq.product}%0ABuyer: ${rfq.buyer}%0A%0A*Manufacturer:* ${rfq.manufacturer}%0A%0ARequest: Freight + Clearing cost to Lagos for this product. Quote will return to Admin Console for 2.5% platform fee addition.%0A%0ARFQ ID: ${rfq.id}`;
    window.open(`https://wa.me/2347050477950?text=${msg}`, '_blank');
  };

  const applyPrices = (rfq: RFQ) => {
    const inp = inputs[rfq.id];
    if (!inp) return;
    const { total, fee, final } = calc(inp.mfg, inp.logistics);
    if (total === 0) { alert('Enter manufacturer price and/or logistics price'); return; }
    const updated = rfqs.map(r => r.id === rfq.id ? {
      ...r,
      mfgPrice: inp.mfg,
      logisticsPrice: inp.logistics,
      totalBeforeFee: total,
      platformFee: fee,
      finalPrice: final,
      finalPriceStr: final.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      status: 'Quote Received' as const
    } : r);
    saveAll(updated);
  };

  const sendToCustomerWithFee = (rfq: RFQ) => {
    if (!rfq.finalPriceStr) { alert('Apply prices first to calculate final with 2.5% fee'); return; }
    const updated = rfqs.map(r => r.id === rfq.id ? { ...r, status: 'Quoted with Fee' as const } : r);
    saveAll(updated);
    localStorage.setItem(`quote_${rfq.id}`, JSON.stringify({ ...rfq, quotePrice: rfq.finalPriceStr, breakdown: { mfg: rfq.mfgPrice, logistics: rfq.logisticsPrice, total: rfq.totalBeforeFee, fee: rfq.platformFee, final: rfq.finalPrice }, date: new Date().toLocaleString() }));

    const breakdownText = `Breakdown (Admin Only – Not shown to buyer in detail):%0AMfg: ₦${rfq.mfgPrice || 0}%0ALogistics: ₦${rfq.logisticsPrice || 0}%0ASubtotal: ₦${rfq.totalBeforeFee?.toLocaleString()}%0APlatform Fee 2.5%: ₦${rfq.platformFee?.toLocaleString()}%0AFinal: ₦${rfq.finalPriceStr}`;

    const customerMsg = `*NiChAm Trade – OFFICIAL QUOTATION (DDP Lagos)*%0A%0ADear ${rfq.buyer},%0A%0AProduct: ${rfq.product}%0A%0A*Final DDP Lagos Price: ₦${rfq.finalPriceStr}*%0A(Includes product, freight, clearing, duty & delivery to Lagos. Includes NiChAm service)%0A%0A✅ Factory Direct%0A✅ Manufacturer Warranty%0A✅ Delivery: 2-4 weeks after payment%0A%0A*Click to ORDER & MAKE PAYMENT:*%0Ahttps://nicham-trade-7jka6u7t9-kpata-academy.vercel.app/quote?id=${rfq.id}%0A%0AOrder Button + Payment Button inside link.%0A%0AChannel: ${SOCIALS.whatsappChannel}`;

    const buyerPhone = rfq.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${buyerPhone}?text=${customerMsg}`, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <style>{` .card{background:white; border:1px solid #e2e8f0; border-radius:16px; padding:18px} .btn{padding:10px 14px; border-radius:10px; font-weight:800; border:none; cursor:pointer; font-size:11px} .input{padding:8px 10px; border-radius:8px; border:1px solid #e2e8f0; font-size:12px; font-weight:700; width:100%} `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>🛠️ Admin Console V4 – RFQ Flow + 2.5% Platform Fee</h1>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 6, lineHeight: 1.5 }}>
          Flow: <b>Customer Request for quote</b> → Admin (here) → <b>Forward to Manufacturer / Logistics</b> → Quote returns here → <b>Add 2.5% platform fee automatically</b> → Send to Customer with ORDER + PAYMENT<br/>
          Screenshot flow: Customer clicks "Request for quote" (your image_8ec9b9.png) → Comes here → You forward → Add fee → Customer gets final price
        </div>

        <div style={{ marginTop: 18, background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, padding: 12, fontSize: 12 }}>
          <b>How it works:</b> 1. New RFQ appears → 2. Click <b>Forward to Manufacturer</b> or <b>Forward to Logistics</b> → 3. Enter prices from manufacturer & logistics → 4. System auto-calculates 2.5% fee → 5. Click <b>Send to Customer (with 2.5% fee)</b> → Buyer gets quote page with ORDER & PAYMENT buttons
        </div>

        <div style={{ marginTop: 18, display: 'grid', gap: 14 }}>
          {rfqs.length===0 && <div className="card" style={{ textAlign: 'center', padding: 40 }}><b>No RFQs yet – Customer "Request for quote" will appear here</b><div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>Test: Go to main site → Click Request for quote → Fill form → Comes here</div></div>}
          {rfqs.map(rfq=>{
            const inp = inputs[rfq.id] || { mfg: '', logistics: '' };
            const calculation = calc(inp.mfg, inp.logistics);
            return (
              <div key={rfq.id} className="card" style={{ borderLeft: '4px solid #059669' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 300 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><b>{rfq.product}</b><span style={{ background: '#fef3c7', padding: '3px 8px', borderRadius: 999, fontSize: 10, fontWeight: 800 }}>{rfq.status}</span></div>
                    <div style={{ fontSize: 11, marginTop: 6 }}>Buyer: {rfq.buyer} – {rfq.whatsapp} – {rfq.company}<br/>Date: {rfq.date} – ID: {rfq.id.slice(0,8)}</div>
                    <div style={{ marginTop: 10, background: '#f8fafc', border: '1px dashed #e2e8f0', borderRadius: 10, padding: 10, fontSize: 11 }}><b>Manufacturer (Internal):</b> {rfq.manufacturer}<br/><b>Phone:</b> {rfq.phone} | <b>Platform:</b> {rfq.platform}</div>
                    {rfq.finalPriceStr && <div style={{ marginTop: 10, background: '#ecfdf5', borderRadius: 10, padding: 10, fontSize: 11 }}><b>Final Sent to Customer:</b> ₦{rfq.finalPriceStr} (includes 2.5% fee)<br/>Breakdown: Mfg ₦{rfq.mfgPrice} + Logistics ₦{rfq.logisticsPrice} = ₦{rfq.totalBeforeFee?.toLocaleString()} + Fee ₦{rfq.platformFee?.toLocaleString()} = Final ₦{rfq.finalPriceStr}</div>}
                  </div>

                  <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div><div style={{ fontSize: 10, fontWeight: 800 }}>Manufacturer Price ₦</div><input className="input" placeholder="e.g. 1,000,000" value={inp.mfg} onChange={e=>setInputs({ ...inputs, [rfq.id]: { ...inp, mfg: e.target.value }})} /></div>
                      <div><div style={{ fontSize: 10, fontWeight: 800 }}>Logistics Price ₦</div><input className="input" placeholder="e.g. 200,000" value={inp.logistics} onChange={e=>setInputs({ ...inputs, [rfq.id]: { ...inp, logistics: e.target.value }})} /></div>
                    </div>
                    
                    {(calculation.total>0) && (
                      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: 8, fontSize: 11 }}>
                        <div>Subtotal: ₦{calculation.total.toLocaleString()} = ₦{inp.mfg || 0} + ₦{inp.logistics || 0}</div>
                        <div style={{ color: '#92400e', fontWeight: 800 }}>Platform Fee 2.5%: ₦{calculation.fee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div style={{ fontWeight: 900, color: '#065f46', fontSize: 13, marginTop: 4 }}>Final to Customer: ₦{calculation.final.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={()=>forwardToManufacturer(rfq)} className="btn" style={{ flex: 1, background: '#f59e0b', color: 'black' }}>→ MFG</button>
                      <button onClick={()=>forwardToLogistics(rfq)} className="btn" style={{ flex: 1, background: '#3b82f6', color: 'white' }}>→ Logistics</button>
                    </div>
                    <button onClick={()=>applyPrices(rfq)} className="btn" style={{ background: '#0f172a', color: 'white' }}>Calculate 2.5% Fee</button>
                    <button onClick={()=>sendToCustomerWithFee(rfq)} className="btn" style={{ background: '#059669', color: 'white', padding: '12px' }}>💬 Send to Customer (with 2.5% fee) + ORDER & PAYMENT link</button>
                    {rfq.finalPriceStr && <a href={`/quote?id=${rfq.id}`} target="_blank" className="btn" style={{ background: 'white', border: '1px solid #e2e8f0', textAlign: 'center', textDecoration: 'none', color: '#0f172a' }}>Preview Buyer Quote Page</a>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <a href="/" className="btn" style={{ background: 'white', border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a' }}>← Customer Site (Clean – Request for quote button)</a>
          <a href="/admin" className="btn" style={{ background: 'white', border: '1px solid #e2e8f0', textDecoration: 'none', color: '#0f172a', marginLeft: 8 }}>Marketing Engine</a>
        </div>
      </div>
    </div>
  );
}
