'use client';
import { useState, useEffect } from 'react';

export default function QuotePage() {
  const [quote, setQuote] = useState<any>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qId = params.get('id') || 'demo';
    setId(qId);
    if (qId === 'demo') {
      setQuote({ buyer: 'Demo Buyer', whatsapp: '+234 803...', product: 'M68PW PRO - 200Ah 25.6V 5.12kWh', quotePrice: '1,250,000', date: new Date().toLocaleString() });
    } else {
      const saved = localStorage.getItem(`quote_${qId}`);
      if (saved) setQuote(JSON.parse(saved));
    }
  }, []);

  const handleOrder = () => {
    setOrderPlaced(true);
    // Update RFQ status to Ordered
    const rfqs = JSON.parse(localStorage.getItem('nicham_rfqs') || '[]');
    const updated = rfqs.map((r: any) => r.id === id ? { ...r, status: 'Ordered' } : r);
    localStorage.setItem('nicham_rfqs', JSON.stringify(updated));
  };

  const handlePayment = () => {
    const msg = `*PAYMENT – NiChAm Trade*%0A%0ABuyer: ${quote?.buyer}%0AProduct: ${quote?.product}%0APrice: ₦${quote?.quotePrice}%0A%0AI want to make payment. Please send account details.%0AOrder ID: ${id}`;
    window.open(`https://wa.me/2347050477950?text=${msg}`, '_blank');
  };

  if (!quote) return <div style={{ padding: 40, textAlign: 'center' }}>Loading quote... If not loading, quote may have expired. Contact 07050477950</div>;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <div style={{ maxWidth: 520, margin: '0 auto', background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ background: 'linear-gradient(135deg,#0f172a,#059669)', color: 'white', padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>NiChAm Trade</div>
          <div style={{ fontSize: 11, letterSpacing: 1, marginTop: 4, opacity: 0.9 }}>POWERING NIGERIA – OFFICIAL QUOTATION</div>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}><span>Quote ID: {id.slice(0,8)}</span><span>{quote.date}</span></div>
          <div style={{ marginTop: 16, background: '#f8fafc', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Buyer</div>
            <div style={{ fontWeight: 800, marginTop: 4 }}>{quote.buyer} – {quote.whatsapp}</div>
          </div>
          <div style={{ marginTop: 12, background: '#f8fafc', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Product</div>
            <div style={{ fontWeight: 800, marginTop: 4, lineHeight: 1.3 }}>{quote.product}</div>
            <div style={{ marginTop: 10, display: 'inline-block', background: '#dcfce7', color: '#065f46', padding: '6px 12px', borderRadius: 999, fontWeight: 900, fontSize: 18 }}>₦ {quote.quotePrice}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>DDP Lagos – Includes clearing & delivery to Lagos. Minna/Abuja/Lagos delivery available.</div>
          </div>

          {!orderPlaced ? (
            <>
              <button onClick={handleOrder} style={{ width: '100%', marginTop: 20, background: '#0f172a', color: 'white', border: 'none', padding: '16px', borderRadius: 14, fontWeight: 900, fontSize: 16, cursor: 'pointer' }}>🛒 ORDER NOW – Confirm Order</button>
              <div style={{ marginTop: 12, fontSize: 11, color: '#64748b', textAlign: 'center' }}>Click Order to confirm, then Make Payment</div>
            </>
          ) : (
            <>
              <div style={{ marginTop: 20, background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 14, padding: 14, textAlign: 'center' }}>
                <div style={{ fontWeight: 900, color: '#065f46', fontSize: 16 }}>✅ Order Placed!</div>
                <div style={{ fontSize: 12, marginTop: 6, color: '#065f46' }}>Order ID: {id} – Now make payment to complete.</div>
              </div>
              <button onClick={handlePayment} style={{ width: '100%', marginTop: 16, background: '#059669', color: 'white', border: 'none', padding: '16px', borderRadius: 14, fontWeight: 900, fontSize: 16, cursor: 'pointer' }}>💳 MAKE PAYMENT – Get Account Details</button>
              
              <div style={{ marginTop: 16, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 13 }}>Payment Instructions (Account to be supplied)</div>
                <div style={{ fontSize: 11, marginTop: 8, lineHeight: 1.6, color: '#92400e' }}>
                  Boss will supply account details later.<br/>
                  Placeholder:<br/>
                  Bank: <b>To be updated</b><br/>
                  Account Name: <b>NiChAm Trade / GSPI Associates</b><br/>
                  Account Number: <b>To be updated</b><br/><br/>
                  After payment, send proof to WhatsApp 07050477950 with Order ID {id}
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button onClick={handlePayment} style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '12px', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>💬 Send Payment Proof via WhatsApp</button>
                <a href="/" style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '12px', borderRadius: 10, fontWeight: 800, fontSize: 12, textDecoration: 'none', color: '#0f172a', textAlign: 'center' }}>← Back to Store</a>
              </div>
            </>
          )}

          <div style={{ marginTop: 20, borderTop: '1px solid #e2e8f0', paddingTop: 12, fontSize: 10, color: '#94a3b8', textAlign: 'center' }}>
            NiChAm Trade – Minna • Abuja • Lagos<br/>WhatsApp Channel: whatsapp.com/channel/0029Vb97CjmKgsNjyCGUWS3r<br/>FB: abaniwog | IG: @gspiassociatesltd | YouTube: @godwinabaniwo6755
          </div>
        </div>
      </div>
    </div>
  );
}
