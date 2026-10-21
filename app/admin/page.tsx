'use client';
import { useState } from 'react';

type Manufacturer = {
  id: string;
  name: string;
  country: string;
  platform: 'Alibaba' | 'Made in China' | 'Direct Dubai' | 'Factory Direct';
  contactPerson: string;
  phone: string;
  email: string;
  wechat?: string;
  categories: string[];
  moqNote: string;
  payment: string;
  verified: boolean;
};

type RFQ = {
  id: string;
  date: string;
  buyer: string;
  whatsapp: string;
  product: string;
  qty: string;
  targetManufacturer: string;
  status: 'New' | 'Forwarded' | 'Quote Received' | 'Priced + Charges' | 'Sent to Buyer';
  buyerPrice?: string;
};

type Buyer = {
  id: string;
  name: string;
  whatsapp: string;
  company: string;
  location: string;
  registered: string;
  channelRequested: boolean;
  channelJoined: boolean;
};

const manufacturers: Manufacturer[] = [
  { id: 'MOTOMA', name: 'MOTOMA Dubai FZE', country: 'UAE – Dubai', platform: 'Direct Dubai', contactPerson: 'Sales Dept – MOTOMA', phone: '+971 52 580 3914', email: 'sales@motoma.ae', wechat: '-', categories: ['LiFePO4 25.6V 200Ah', '51.2V 100-320Ah Rack', 'BMS'], moqNote: 'Mix Allowed – 1 Unit Sample', payment: 'T/T 30/70', verified: true },
  { id: 'MUST', name: 'MUST Power Factory Guangdong', country: 'China – Guangdong', platform: 'Factory Direct', contactPerson: 'MUST Export Team', phone: '+86 189 2434 3876', email: 'export@mustpower.com', wechat: 'MUSTPower_Export', categories: ['Hybrid Inverters 3-10kW', 'Off-Grid Inverters', 'MPPT Controllers', 'LiFePO4 Wall Battery'], moqNote: '3-10 Units per model', payment: 'T/T, L/C', verified: true },
  { id: 'ALI-CHEM-1', name: 'Shanghai Medichem Co – Sorbitol & Paracetamol', country: 'China – Shanghai', platform: 'Alibaba', contactPerson: 'David Chen – Alibaba Gold Supplier', phone: '+86 138 1756 9021', email: 'david@sh-medichem.alibaba.com', categories: ['Paracetamol Powder BP/USP', 'Crystallized Sorbitol', 'Pharma Excipients'], moqNote: '1 MT / 500kg', payment: 'T/T, Alibaba Trade Assurance', verified: true },
  { id: 'ALI-CHEM-2', name: 'Shandong Haihua – Soda Ash & Caustic Soda', country: 'China – Shandong', platform: 'Alibaba', contactPerson: 'Linda Zhang', phone: '+86 186 7820 4451', email: 'linda@haihua-chem.com', categories: ['Caustic Soda Flakes 99%', 'Soda Ash Dense', 'Calcium Hypochlorite 70%'], moqNote: '25 MT – Container', payment: 'T/T, D/P', verified: true },
  { id: 'MIC-CHEM-1', name: 'Henan Refort – Water Treatment Chemicals', country: 'China – Henan', platform: 'Made in China', contactPerson: 'Jack Wang – MIC Verified', phone: '+86 139 3907 1123', email: 'jack@refort-chem.com', categories: ['Poly Aluminum Chloride PAC', 'Aluminum Sulphate', 'Ferric Chloride 40%', 'Soda Ash Light'], moqNote: '20 MT', payment: 'T/T', verified: true },
  { id: 'ALI-CHEM-3', name: 'Guangzhou Tinci – Acids & Peroxide', country: 'China – Guangzhou', platform: 'Alibaba', contactPerson: 'Sarah Liu', phone: '+86 135 6032 8890', email: 'sarah@tinci-chem.com', categories: ['Hydrochloric Acid 31%', 'Nitric Acid 68%', 'Acetic Acid Glacial', 'Hydrogen Peroxide 50%', 'Stearic Acid'], moqNote: '10 MT / IBC', payment: 'T/T', verified: true },
  { id: 'ALI-PAINT-1', name: 'Zhejiang Haishen – Natrosol & Carbonate', country: 'China – Zhejiang', platform: 'Alibaba', contactPerson: 'Kevin Wu', phone: '+86 157 5712 3340', email: 'kevin@haishen-paintchem.com', categories: ['Natrosol 250 HBR (HEC)', 'Calcium Carbonate Coated'], moqNote: '1 MT / 500kg', payment: 'Trade Assurance', verified: true },
];

const sampleRFQs: RFQ[] = [
  { id: 'RFQ-20261021-001', date: '2026-10-21 01:55', buyer: 'Aminu Kano', whatsapp: '+234 803 123 4567', product: 'M88PW PRO 200Ah 51.2V 10.24kWh', qty: '4 Units DDP Lagos', targetManufacturer: 'MOTOMA Dubai FZE', status: 'New' },
  { id: 'RFQ-20261021-002', date: '2026-10-21 01:40', buyer: 'Bello Minna', whatsapp: '+234 705 047 7950', product: 'Caustic Soda Flakes 99% + Soda Ash', qty: '25 MT each', targetManufacturer: 'Shandong Haihua', status: 'Forwarded' },
  { id: 'RFQ-20261021-003', date: '2026-10-20 18:30', buyer: 'Chidi Lagos', whatsapp: '+234 812 987 6543', product: 'LP16-48200 200Ah 48V', qty: '2 Units', targetManufacturer: 'MUST Power Factory', status: 'Quote Received', buyerPrice: 'Quote $1480 + $420 Logistics/Insurance/Platform = $1900 DDP' },
];

const sampleBuyers: Buyer[] = [
  { id: 'B-001', name: 'Aminu Kano', whatsapp: '+234 803 123 4567', company: 'Kano Solar Solutions', location: 'Kano', registered: '2026-10-21', channelRequested: true, channelJoined: false },
  { id: 'B-002', name: 'Bello Minna', whatsapp: '+234 705 047 7950', company: 'GSPI Associates Ltd', location: 'Minna', registered: '2026-10-20', channelRequested: true, channelJoined: true },
  { id: 'B-003', name: 'Chidi Lagos', whatsapp: '+234 812 987 6543', company: 'Lagos Energy Hub', location: 'Lagos', registered: '2026-10-20', channelRequested: true, channelJoined: false },
];

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<'manufacturers' | 'rfqs' | 'buyers' | 'pricing'>('manufacturers');
  const [chargeCalc, setChargeCalc] = useState({ factory: 1480, logistics: 220, insurance: 80, platform: 120 });

  const handleLogin = () => {
    if (pass === 'nicham2026' || pass === 'admin') setAuthed(true);
    else alert('Wrong password – Use nicham2026');
  };

  const totalWithCharges = chargeCalc.factory + chargeCalc.logistics + chargeCalc.insurance + chargeCalc.platform;

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', fontFamily: 'Inter, sans-serif', padding: 20 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 28, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#059669,#eab308)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 22 }}>N</div>
          <h1 style={{ fontWeight: 900, fontSize: 20, marginTop: 12, color: '#0f172a' }}>NiChAm Trade – Admin</h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>Manufacturer Hub: Alibaba, Made in China, Dubai. No product list – RFQ forwarding desk. Buyer WhatsApp registry + channel.</p>
          <input type="password" placeholder="Password: nicham2026" value={pass} onChange={e => setPass(e.target.value)} style={{ marginTop: 16, width: '100%', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 16px', fontSize: 14 }} />
          <button onClick={handleLogin} style={{ marginTop: 12, width: '100%', background: '#0f172a', color: 'white', padding: '12px', borderRadius: 12, fontWeight: 800, border: 'none', cursor: 'pointer' }}>Unlock Manufacturer Hub</button>
          <a href="/" style={{ display: 'block', marginTop: 12, textAlign: 'center', background: '#f1f5f9', color: '#0f172a', padding: '10px', borderRadius: 10, fontWeight: 700, fontSize: 12, textDecoration: 'none', border: '1px solid #e2e8f0' }}>👁️ User View (Customer Site)</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{` *{box-sizing:border-box} body{margin:0} .tab{padding:10px 18px; border-radius:999px; font-weight:800; font-size:12px; border:1px solid #e2e8f0; cursor:pointer; background:white} .tab-active{background:#0f172a; color:white; border-color:#0f172a} .card{background:white; border:1px solid #e2e8f0; border-radius:14px; padding:14px} `}</style>

      <div style={{ background: '#0f172a', color: 'white', padding: '14px 0', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>NiChAm Trade – Manufacturer Hub & RFQ Desk</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>No product list – Manufacturers (Alibaba / Made in China / Dubai) + RFQ Forwarding + Buyer WhatsApp Registry</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/" style={{ background: 'white', color: '#0f172a', padding: '8px 16px', borderRadius: 999, fontWeight: 800, fontSize: 12, textDecoration: 'none' }}>👁️ User View</a>
            <button onClick={() => setAuthed(false)} style={{ background: '#1e293b', color: 'white', border: '1px solid #334155', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', gap: 10, flexWrap: 'wrap', position: 'sticky', top: 64, zIndex: 10, background: '#f8fafc' }}>
        <button onClick={() => setTab('manufacturers')} className={`tab ${tab === 'manufacturers' ? 'tab-active' : ''}`}>🏭 Manufacturers ({manufacturers.length}) – Alibaba / MIC / Dubai</button>
        <button onClick={() => setTab('rfqs')} className={`tab ${tab === 'rfqs' ? 'tab-active' : ''}`}>📩 RFQ Inbox ({sampleRFQs.length}) – Forward to Manufacturer</button>
        <button onClick={() => setTab('buyers')} className={`tab ${tab === 'buyers' ? 'tab-active' : ''}`}>👥 Buyers Registry ({sampleBuyers.length}) – WhatsApp + Channel</button>
        <button onClick={() => setTab('pricing')} className={`tab ${tab === 'pricing' ? 'tab-active' : ''}`}>💰 Quote Builder – Add Logistics + Insurance + Platform</button>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 40px' }}>

        {tab === 'manufacturers' && (
          <div>
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 15 }}>Manufacturer Directory – Names & Contacts (Not Products)</div>
                <span style={{ background: '#ecfdf5', color: '#047857', padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{manufacturers.length} Manufacturers – Alibaba Gold, MIC Verified, Direct</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: 0 }}>
                {manufacturers.map(m => (
                  <div key={m.id} style={{ padding: 18, borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 900, fontSize: 14, color: '#0f172a', lineHeight: 1.3 }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{m.country} • <span style={{ background: m.platform === 'Alibaba' ? '#ff6a00' : m.platform === 'Made in China' ? '#e4002b' : m.platform === 'Direct Dubai' ? '#059669' : '#0f172a', color: 'white', padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 800 }}>{m.platform}</span> {m.verified && <span style={{ background: '#ecfdf5', color: '#047857', padding: '2px 6px', borderRadius: 999, fontSize: 10, marginLeft: 4 }}>✓ Verified</span>}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, display: 'grid', gap: 6 }}>
                      <div style={{ fontSize: 12 }}><b style={{ color: '#475569' }}>Contact:</b> {m.contactPerson}</div>
                      <div style={{ fontSize: 12 }}><b style={{ color: '#475569' }}>Phone:</b> <span style={{ color: '#059669', fontWeight: 800 }}>{m.phone}</span> {m.wechat && m.wechat !== '-' && <span style={{ fontSize: 11, color: '#64748b' }}> • WeChat: {m.wechat}</span>}</div>
                      <div style={{ fontSize: 11, color: '#334155', wordBreak: 'break-all' }}><b>Email:</b> {m.email}</div>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Supplies</div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                        {m.categories.map(cat => (
                          <span key={cat} style={{ fontSize: 10, background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: 999 }}>{cat}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>
                      <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8 }}><div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 700 }}>MOQ</div><div style={{ fontWeight: 700 }}>{m.moqNote}</div></div>
                      <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8 }}><div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 700 }}>Payment</div><div style={{ fontWeight: 700 }}>{m.payment}</div></div>
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <a href={`https://wa.me/${m.phone.replace(/[^0-9]/g,'')}`} target="_blank" style={{ background: '#25D366', color: 'white', padding: '8px 12px', borderRadius: 10, fontWeight: 800, fontSize: 11, textDecoration: 'none', flex: 1, textAlign: 'center' }}>WhatsApp Manufacturer</a>
                      <button onClick={() => alert(`Copy email: ${m.email}`)} style={{ background: 'white', border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: 10, fontWeight: 700, fontSize: 11, flex: 1 }}>Copy Email</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 14, background: '#f0fdf4', borderTop: '1px solid #bbf7d0', fontSize: 11, color: '#166534' }}>
                💡 Flow: Buyer RFQ (User View) → Admin sees in RFQ Inbox → Admin forwards via WhatsApp/Email to manufacturer above → Manufacturer replies with factory price → Admin adds charges in Quote Builder tab → Sends final DDP to buyer.
              </div>
            </div>
          </div>
        )}

        {tab === 'rfqs' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 900, fontSize: 15 }}>RFQ Inbox – Buyer Requests to Forward</div>
              <a href="/" style={{ background: '#059669', color: 'white', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, textDecoration: 'none' }}>👁️ User View – See Customer Site</a>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', fontSize: 11, textTransform: 'uppercase', color: '#475569' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Date / RFQ ID</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Buyer & WhatsApp</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Product Requested</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Target Manufacturer</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRFQs.map(r => (
                    <tr key={r.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px', fontSize: 12 }}><div style={{ fontWeight: 800 }}>{r.id}</div><div style={{ fontSize: 11, color: '#64748b' }}>{r.date}</div></td>
                      <td style={{ padding: '12px', fontSize: 12 }}><div style={{ fontWeight: 700 }}>{r.buyer}</div><div style={{ color: '#059669', fontWeight: 700, fontSize: 11 }}>{r.whatsapp}</div></td>
                      <td style={{ padding: '12px', fontSize: 12 }}><div style={{ fontWeight: 600 }}>{r.product}</div><div style={{ fontSize: 11, color: '#64748b' }}>{r.qty}</div></td>
                      <td style={{ padding: '12px', fontSize: 12 }}>{r.targetManufacturer}</td>
                      <td style={{ padding: '12px' }}><span style={{ background: r.status === 'New' ? '#fef3c7' : r.status === 'Forwarded' ? '#dbeafe' : r.status === 'Quote Received' ? '#e0e7ff' : '#ecfdf5', color: r.status === 'New' ? '#92400e' : r.status === 'Forwarded' ? '#1e40af' : '#4338ca', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{r.status}</span>{r.buyerPrice && <div style={{ fontSize: 10, marginTop: 4, color: '#475569' }}>{r.buyerPrice}</div>}</td>
                      <td style={{ padding: '12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <button style={{ background: '#0f172a', color: 'white', padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none' }}>Forward to MFG</button>
                        <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>Add Charges</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: 14, background: '#fffbeb', fontSize: 11, color: '#92400e', borderTop: '1px solid #fde68a' }}>RFQ flow: New → Forwarded (to manufacturer via WhatsApp/Email) → Quote Received (factory price) → Priced + Charges (logistics/insurance/platform added) → Sent to Buyer (via WhatsApp +234)</div>
          </div>
        )}

        {tab === 'buyers' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 900, fontSize: 15 }}>Buyer Registry – WhatsApp & Channel Requests</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Buyers register at inception with WhatsApp number + request to join WhatsApp channel. No product prices visible to them – only RFQ button.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 0 }}>
              {sampleBuyers.map(b => (
                <div key={b.id} style={{ padding: 16, borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{b.company} • {b.location} • Registered {b.registered}</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: 999, fontWeight: 800, fontSize: 12 }}>📱 {b.whatsapp}</span>
                    <a href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g,'')}`} target="_blank" style={{ background: '#25D366', color: 'white', padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 800, textDecoration: 'none' }}>Chat</a>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8, fontSize: 11 }}>
                    <span style={{ background: b.channelRequested ? '#fef3c7' : '#f1f5f9', padding: '4px 10px', borderRadius: 999, fontWeight: 700 }}>{b.channelRequested ? '✓ Wants Channel' : 'No Channel Req'}</span>
                    <span style={{ background: b.channelJoined ? '#ecfdf5' : '#fee2e2', color: b.channelJoined ? '#047857' : '#991b1b', padding: '4px 10px', borderRadius: 999, fontWeight: 700 }}>{b.channelJoined ? '✓ Joined Channel' : 'Not Joined'}</span>
                  </div>
                  {!b.channelJoined && b.channelRequested && <button style={{ marginTop: 10, width: '100%', background: '#0f172a', color: 'white', padding: '8px', borderRadius: 10, fontWeight: 700, fontSize: 11, border: 'none' }}>Send WhatsApp Channel Invite Link</button>}
                </div>
              ))}
            </div>
            <div style={{ padding: 14, background: '#f0fdf4', fontSize: 11 }}>
              <div style={{ fontWeight: 800 }}>Registration Requirement (to implement on User View):</div>
              <div style={{ marginTop: 6, color: '#334155', lineHeight: 1.6 }}>• On first visit to nicham-trade.vercel.app, popup: "Register with WhatsApp number to request quote" – Fields: Name, WhatsApp, Company, Location, Tick: "Request to join WhatsApp Channel for price updates"<br/>• Save to Buyers Registry tab here.<br/>• Channel: Create WhatsApp Channel "NiChAm Trade Updates" – Admin invites after registration.</div>
            </div>
          </div>
        )}

        {tab === 'pricing' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <div style={{ fontWeight: 900, fontSize: 14 }}>Quote Builder – Add Charges</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Factory quote from manufacturer + add Logistics + Insurance + Platform fee = DDP Buyer Price</div>
              <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
                <div><label style={{ fontSize: 11, fontWeight: 800 }}>Factory Price (from Manufacturer)</label><input type="number" value={chargeCalc.factory} onChange={e => setChargeCalc({ ...chargeCalc, factory: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} /></div>
                <div><label style={{ fontSize: 11, fontWeight: 800 }}>Logistics (Shipping + Customs + Transport to Lagos)</label><input type="number" value={chargeCalc.logistics} onChange={e => setChargeCalc({ ...chargeCalc, logistics: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} /></div>
                <div><label style={{ fontSize: 11, fontWeight: 800 }}>Insurance</label><input type="number" value={chargeCalc.insurance} onChange={e => setChargeCalc({ ...chargeCalc, insurance: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} /></div>
                <div><label style={{ fontSize: 11, fontWeight: 800 }}>Platform Fee (NiChAm Trade Margin)</label><input type="number" value={chargeCalc.platform} onChange={e => setChargeCalc({ ...chargeCalc, platform: Number(e.target.value) })} style={{ width: '100%', marginTop: 4, padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} /></div>
              </div>
              <div style={{ marginTop: 16, background: '#0f172a', color: 'white', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 11, opacity: 0.7 }}>TOTAL DDP LAGOS TO BUYER</div>
                <div style={{ fontSize: 24, fontWeight: 900, marginTop: 4 }}>${totalWithCharges}</div>
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>${chargeCalc.factory} factory + ${chargeCalc.logistics} logistics + ${chargeCalc.insurance} insurance + ${chargeCalc.platform} platform</div>
                <button style={{ marginTop: 12, width: '100%', background: '#25D366', color: 'white', padding: '10px', borderRadius: 10, fontWeight: 800, border: 'none' }}>Send Priced Quote to Buyer via WhatsApp</button>
              </div>
            </div>
            <div className="card">
              <div style={{ fontWeight: 900, fontSize: 14 }}>How It Works – Buyer → Admin → Manufacturer → Buyer</div>
              <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.7, color: '#334155' }}>
                <div><b>1. Buyer Registration (User View):</b> Popup on site: Name, WhatsApp, Company, Tick "Join WhatsApp Channel". Saved in Buyers tab.</div>
                <div style={{ marginTop: 8 }}><b>2. Buyer RFQ (User View):</b> Buyer clicks Request RFQ on any product (Solar or Chemical). RFQ comes to Admin RFQ Inbox with buyer WhatsApp.</div>
                <div style={{ marginTop: 8 }}><b>3. Admin Forwards:</b> In Manufacturers tab, copy manufacturer phone/email. Forward RFQ via WhatsApp/Email with manufacturer name.</div>
                <div style={{ marginTop: 8 }}><b>4. Manufacturer Quote:</b> Factory replies with FOB price. Admin enters in Quote Builder factory price.</div>
                <div style={{ marginTop: 8 }}><b>5. Admin Adds Charges:</b> Logistics (sea freight + customs + trucking to Minna/Abuja/Lagos), Insurance, Platform margin → Total DDP.</div>
                <div style={{ marginTop: 8 }}><b>6. Send to Buyer:</b> Admin sends priced quote via WhatsApp to buyer number + via WhatsApp Channel.</div>
                <div style={{ marginTop: 12, background: '#fef3c7', padding: 10, borderRadius: 10, fontSize: 11 }}><b>WhatsApp Channel:</b> Create channel "NiChAm Trade – Solar & Chemicals Price Updates". Invite buyers who ticked request. Post weekly price updates, new arrivals, promo.</div>
              </div>
              <a href="/" style={{ display: 'block', marginTop: 16, background: 'white', border: '1px solid #e2e8f0', padding: '10px', borderRadius: 10, textAlign: 'center', fontWeight: 800, fontSize: 12, textDecoration: 'none', color: '#0f172a' }}>👁️ User View – See What Buyer Sees (No Prices, RFQ Only)</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
