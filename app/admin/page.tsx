'use client';
import { useState } from 'react';

type AdminProduct = {
  id: string;
  brand: string;
  model: string;
  ddp: number;
  cost: number;
  supplier: string;
  phone: string;
  manufacturer: string;
  moq: string;
};

const products: AdminProduct[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO 200Ah 25.6V 5.12kWh', ddp: 1150, cost: 890, supplier: 'MOTOMA Dubai FZE', phone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO 300Ah 25.6V 7.68kWh', ddp: 1650, cost: 1280, supplier: 'MOTOMA Dubai FZE', phone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO 100Ah 51.2V 5.12kWh', ddp: 1180, cost: 920, supplier: 'MOTOMA Dubai FZE', phone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO 200Ah 51.2V 10.24kWh', ddp: 2250, cost: 1750, supplier: 'MOTOMA Dubai FZE', phone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO 320Ah 51.2V 16.38kWh Rack', ddp: 3450, cost: 2680, supplier: 'MOTOMA Dubai FZE', phone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: '2 Units' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO 280Ah 51.2V 14.33kWh', ddp: 2950, cost: 2290, supplier: 'MOTOMA Dubai FZE', phone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid', ddp: 580, cost: 420, supplier: 'MUST Power Factory', phone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '5 Units' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid', ddp: 780, cost: 560, supplier: 'MUST Power Factory', phone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '3 Units' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V 10.24kWh', ddp: 1950, cost: 1480, supplier: 'MUST Power Factory', phone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: 'Mix Allowed' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V 5.12kWh', ddp: 1080, cost: 820, supplier: 'MUST Power Factory', phone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: 'Mix Allowed' },
  { id: 'MUST-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V Off-Grid', ddp: 520, cost: 380, supplier: 'MUST Power Factory', phone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '10 Units' },
  { id: 'MUST-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', ddp: 310, cost: 220, supplier: 'MUST Power Factory', phone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '10 Units' },
  { id: 'MUST-10148', brand: 'MUST', model: 'PV18-10148 10kW 48V 3-Phase', ddp: 1450, cost: 1050, supplier: 'MUST Power Factory', phone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '2 Units' },
];

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);

  const handleLogin = () => {
    if (pass === 'nicham2026' || pass === 'admin') setAuthed(true);
    else alert('Wrong password – Use nicham2026');
  };

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', fontFamily: 'Inter, sans-serif', padding: 20 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 28, width: '100%', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#059669,#eab308)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 22 }}>N</div>
          <h1 style={{ fontWeight: 900, fontSize: 20, marginTop: 12, color: '#0f172a' }}>NiChAm Admin</h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Supplier numbers hidden from customers. Login to view margins.</p>
          <input type="password" placeholder="Password: nicham2026" value={pass} onChange={e => setPass(e.target.value)} style={{ marginTop: 16, width: '100%', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 16px', fontSize: 14 }} />
          <button onClick={handleLogin} style={{ marginTop: 12, width: '100%', background: '#0f172a', color: 'white', padding: '12px', borderRadius: 12, fontWeight: 800, border: 'none', cursor: 'pointer' }}>Unlock Admin</button>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <a href="/" style={{ flex: 1, textAlign: 'center', background: '#f1f5f9', color: '#0f172a', padding: '10px', borderRadius: 10, fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #e2e8f0' }}>👁️ User View</a>
            <span style={{ flex: 1, textAlign: 'center', background: '#ecfdf5', color: '#047857', padding: '10px', borderRadius: 10, fontWeight: 700, fontSize: 11 }}>RFQ → +234 705 047 7950</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{` *{box-sizing:border-box} body{margin:0} table{border-collapse:collapse; width:100%} th{font-size:11px; text-transform:uppercase; letter-spacing:0.5px; background:#f1f5f9; padding:12px 10px; text-align:left; color:#475569; font-weight:800} td{padding:10px; font-size:12px; border-top:1px solid #e2e8f0; vertical-align:top} tr:hover{background:#f8fafc} `}</style>

      <div style={{ background: '#0f172a', color: 'white', padding: '16px 0', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>NiChAm Trade – Admin Panel</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>MOTOMA Dubai + MUST Factory – Cost vs DDP – No images – User View button below</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/" style={{ background: 'white', color: '#0f172a', padding: '8px 16px', borderRadius: 999, fontWeight: 800, fontSize: 12, textDecoration: 'none' }}>👁️ User View</a>
            <button onClick={() => setAuthed(false)} style={{ background: '#1e293b', color: 'white', border: '1px solid #334155', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12, marginBottom: 20 }}>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Customer Facing RFQ</div>
            <div style={{ fontWeight: 900, color: '#059669', marginTop: 4 }}>+234 705 047 7950</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>WhatsApp only – you forward to supplier</div>
          </div>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>MOTOMA Supplier</div>
            <div style={{ fontWeight: 900, marginTop: 4 }}>+971 52 580 3914</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>MOTOMA Dubai FZE – Manufacturer: MOTOMA Dubai</div>
          </div>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>MUST Supplier</div>
            <div style={{ fontWeight: 900, marginTop: 4 }}>+86 189 2434 3876</div>
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>MUST Factory Guangdong</div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: 15 }}>20 Products – Cost vs DDP Margin – NO IMAGES</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="/" style={{ background: '#059669', color: 'white', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, textDecoration: 'none' }}>👁️ User View</a>
              <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{products.length} items</span>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Product Model</th>
                  <th>Brand</th>
                  <th>DDP Lagos</th>
                  <th>Cost</th>
                  <th>Margin</th>
                  <th>Supplier & Phone</th>
                  <th>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const margin = p.ddp - p.cost;
                  const pct = Math.round((margin / p.cost) * 100);
                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{p.model}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{p.manufacturer}</div>
                      </td>
                      <td><span style={{ background: p.brand === 'MOTOMA' ? '#059669' : '#eab308', color: p.brand === 'MOTOMA' ? 'white' : 'black', padding: '4px 8px', borderRadius: 999, fontSize: 10, fontWeight: 900 }}>{p.brand}</span></td>
                      <td style={{ fontWeight: 800 }}>${p.ddp}</td>
                      <td>${p.cost}</td>
                      <td><span style={{ background: '#ecfdf5', color: '#047857', padding: '4px 8px', borderRadius: 999, fontWeight: 800, fontSize: 11 }}>+${margin} ({pct}%)</span></td>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: 11 }}>{p.supplier}</div>
                        <div style={{ color: '#059669', fontWeight: 800, fontSize: 11, marginTop: 2 }}>{p.phone}</div>
                      </td>
                      <td style={{ fontSize: 11 }}>{p.moq}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: 14, background: '#fefce8', borderTop: '1px solid #fde68a', fontSize: 11, color: '#854d0e' }}>
            ⚠️ No images in admin – Clean table only – User View button links to / – Customer never sees supplier phones – RFQ flow: Customer WhatsApp → +234 705 047 7950 → You forward to supplier with manufacturer tag
          </div>
        </div>
      </div>
    </div>
  );
}
