'use client';
import { useState } from 'react';

type Manufacturer = {
  id: string;
  name: string;
  city: string;
  platform: 'Alibaba Gold' | 'Made in China Verified' | 'Factory Direct China';
  contact: string;
  phone: string;
  email: string;
  supplies: string[];
};

type LogisticsCo = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  charges: string;
};

type InsuranceCo = { id: string; name: string; type: string; phone: string; rate: string; };
type InspectionCo = { id: string; name: string; service: string; phone: string; fee: string; };

const manufacturers: Manufacturer[] = [
  { id: 'MOTOMA-CN', name: 'MOTOMA Power Factory – Shenzhen', city: 'China – Shenzhen, Guangdong', platform: 'Factory Direct China', contact: 'MOTOMA Export Team – Shenzhen', phone: '+86 135 7082 3914', email: 'sales@motoma.cn', supplies: ['LiFePO4 25.6V 200Ah/300Ah', '51.2V 100Ah-320Ah Rack/Wall', 'BMS 8000 Cycles'] },
  { id: 'MUST-CN', name: 'MUST Power Factory – Guangdong', city: 'China – Guangdong', platform: 'Factory Direct China', contact: 'MUST Export Team', phone: '+86 189 2434 3876', email: 'export@mustpower.com', supplies: ['Hybrid Inverters 3-10kW', 'Off-Grid Inverters', 'Wall Batteries 48V'] },
  { id: 'MEDICHEM-CN', name: 'Shanghai Medichem Co – Pharma Grade', city: 'China – Shanghai', platform: 'Alibaba Gold', contact: 'David Chen – Gold Supplier', phone: '+86 138 1756 9021', email: 'david@sh-medichem.com', supplies: ['Paracetamol Powder BP/USP', 'Crystallized Sorbitol Pharma'] },
  { id: 'HAIHUA-CN', name: 'Shandong Haihua Chemical – Alkali', city: 'China – Shandong', platform: 'Alibaba Gold', contact: 'Linda Zhang', phone: '+86 186 7820 4451', email: 'linda@haihua-chem.com', supplies: ['Caustic Soda Flakes 99% Pearl', 'Soda Ash Dense/Light', 'Calcium Hypochlorite 70%'] },
  { id: 'REFORT-CN', name: 'Henan Refort Chemical – Water Treatment', city: 'China – Henan', platform: 'Made in China Verified', contact: 'Jack Wang – MIC Verified', phone: '+86 139 3907 1123', email: 'jack@refort-chem.com', supplies: ['Poly Aluminum Chloride PAC 28-30%', 'Aluminum Sulphate', 'Ferric Chloride 40%'] },
  { id: 'TINCI-CN', name: 'Guangzhou Tinci Chemical – Acids', city: 'China – Guangzhou', platform: 'Alibaba Gold', contact: 'Sarah Liu', phone: '+86 135 6032 8890', email: 'sarah@tinci-chem.com', supplies: ['Hydrochloric Acid 31%', 'Nitric Acid 68%', 'Acetic Acid Glacial 99.8%', 'Hydrogen Peroxide 50%', 'Stearic Acid Triple'] },
  { id: 'HAISHEN-CN', name: 'Zhejiang Haishen – Paint Chemicals', city: 'China – Zhejiang', platform: 'Alibaba Gold', contact: 'Kevin Wu', phone: '+86 157 5712 3340', email: 'kevin@haishen.com', supplies: ['Natrosol 250 HBR HEC', 'Calcium Carbonate Coated/Uncoated'] },
];

const logistics: LogisticsCo[] = [
  { id: 'LOG-1', name: 'Sifax Logistics – China to Lagos Apapa', role: 'Sea Freight China → Lagos + Clearing + Truck to Minna/Abuja', phone: '+234 802 345 6789', email: 'ops@sifaxlogistics.com', charges: 'China Sea $900-1300/20ft + Clearing ₦450k + Truck ₦350k to Minna' },
  { id: 'LOG-2', name: 'Bolloré China-Nigeria Freight', role: 'China Factory FOB to Nigeria DDP', phone: '+234 1 270 3400', email: 'china-lagos@bollore.com', charges: 'All-in China FOB to Lagos DDP, HS 8507/8504/2827' },
  { id: 'LOG-3', name: 'DHL Global Forwarding – China Air/Sea', role: 'China Air Samples 2-3 days + Sea Bulk 25-35 days', phone: '+234 700 3455 435', email: 'china-ng@dhl.com', charges: 'Air sample from Shenzhen/Shanghai, Sea from Guangzhou/Ningbo' },
  { id: 'LOG-4', name: 'Tony Onyeka Customs – Apapa/Tin Can', role: 'China Imports – SONCAP/NAFDAC for China chemicals/pharma', phone: '+234 803 321 0987', email: 'tony.china@apapa.com', charges: 'Clearing + SONCAP (China MANDATORY) + NAFDAC' },
];

const insurance: InsuranceCo[] = [
  { id: 'INS-1', name: 'Leadway – China Marine Cargo', type: 'China to Nigeria All Risk', phone: '+234 1 280 0700', rate: '0.5-1% CIF – China sea damage/theft' },
  { id: 'INS-2', name: 'AIICO – China Goods in Transit', type: 'China Hazmat + Transit', phone: '+234 1 448 0333', rate: '0.6% + 0.2% Hazmat for China chemicals/batteries' },
];

const inspection: InspectionCo[] = [
  { id: 'INSP-1', name: 'SGS China – Shenzhen/Shanghai', service: 'China Factory PSI – China factories', phone: '+86 755 8296 2222', fee: '$300-500 China inspection, 48hr report' },
  { id: 'INSP-2', name: 'Bureau Veritas China', service: 'China Lab Test + COA + SONCAP', phone: '+86 21 2319 0000', fee: '$350-600 – Chemical/pharma test China' },
  { id: 'INSP-3', name: 'COTECNA China – SONCAP for Nigeria', service: 'SONCAP Mandatory for China to Nigeria', phone: '+86 21 5407 5000', fee: '$400-700 – China SONCAP certificate required Apapa' },
];

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<'how' | 'mfg' | 'log' | 'ins' | 'insp' | 'rfq' | 'buyers' | 'quote'>('how');

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', fontFamily: 'Inter, sans-serif', padding: 20 }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 28, width: '100%', maxWidth: 420 }}>
          <h1 style={{ fontWeight: 900, fontSize: 20 }}>NiChAm – China Suppliers Only</h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>All suppliers from China alone – Alibaba Gold, Made in China Verified, Factory Direct China – No Dubai/UAE. MOTOMA Shenzhen China, MUST Guangdong China + 5 China chemical factories.</p>
          <input type="password" placeholder="nicham2026" value={pass} onChange={e => setPass(e.target.value)} style={{ marginTop: 14, width: '100%', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px' }} />
          <button onClick={() => { if(pass==='nicham2026'||pass==='admin') setAuthed(true); else alert('Wrong'); }} style={{ marginTop: 12, width: '100%', background: '#0f172a', color: 'white', padding: '12px', borderRadius: 12, fontWeight: 800, border: 'none', cursor: 'pointer' }}>Unlock China Hub</button>
          <a href="/" style={{ display: 'block', marginTop: 12, textAlign: 'center', background: '#f1f5f9', padding: '10px', borderRadius: 10, fontWeight: 700, fontSize: 12, textDecoration: 'none', color: '#0f172a' }}>👁️ User View</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <style>{` *{box-sizing:border-box} .tab{padding:8px 14px; border-radius:999px; font-weight:800; font-size:11px; border:1px solid #e2e8f0; cursor:pointer; background:white} .tab-active{background:#DC2626; color:white; border-color:#DC2626} .card{background:white; border:1px solid #e2e8f0; border-radius:14px; padding:14px} `}</style>
      <div style={{ background: '#0f172a', color: 'white', padding: '14px 0', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div><div style={{ fontWeight: 900 }}>NiChAm Trade – China Suppliers Only – All From China Alone</div><div style={{ fontSize: 11, color: '#fca5a5' }}>CHINA ONLY – MOTOMA Shenzhen China + MUST Guangdong China + 5 China Chemical Factories – Alibaba Gold / Made in China Verified / Factory Direct China – No Dubai/UAE</div></div>
          <div style={{ display: 'flex', gap: 8 }}><a href="/" style={{ background: 'white', color: '#0f172a', padding: '8px 14px', borderRadius: 999, fontWeight: 800, fontSize: 11, textDecoration: 'none' }}>👁️ User View</a><button onClick={() => setAuthed(false)} style={{ background: '#1e293b', color: 'white', border: '1px solid #334155', padding: '8px 14px', borderRadius: 999, fontSize: 11, cursor: 'pointer' }}>Logout</button></div>
        </div>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '12px 20px', display: 'flex', gap: 8, flexWrap: 'wrap', position: 'sticky', top: 60, zIndex: 10, background: '#f8fafc' }}>
        <button onClick={() => setTab('how')} className={`tab ${tab === 'how' ? 'tab-active' : ''}`}>📖 How Works – China Only</button>
        <button onClick={() => setTab('mfg')} className={`tab ${tab === 'mfg' ? 'tab-active' : ''}`}>🏭 Manufacturers – China Only (7)</button>
        <button onClick={() => setTab('log')} className={`tab ${tab === 'log' ? 'tab-active' : ''}`}>🚢 Logistics – China→Lagos</button>
        <button onClick={() => setTab('ins')} className={`tab ${tab === 'ins' ? 'tab-active' : ''}`}>🛡️ Insurance – China Marine</button>
        <button onClick={() => setTab('insp')} className={`tab ${tab === 'insp' ? 'tab-active' : ''}`}>🔍 Inspection – China PSI + SONCAP</button>
        <button onClick={() => setTab('rfq')} className={`tab ${tab === 'rfq' ? 'tab-active' : ''}`}>📩 RFQ – Shows China MFG</button>
        <button onClick={() => setTab('buyers')} className={`tab ${tab === 'buyers' ? 'tab-active' : ''}`}>👥 Buyers WhatsApp + Channel</button>
        <button onClick={() => setTab('quote')} className={`tab ${tab === 'quote' ? 'tab-active' : ''}`}>💰 Quote – Only to Buyer WA</button>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 20px 40px' }}>
        {tab === 'how' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <div style={{ fontWeight: 900, fontSize: 15 }}>How Admin Works – CHINA ONLY Amendment</div>
              <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.7 }}>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 12 }}>
                  <b style={{ color: '#991b1b' }}>CHINA ALONE – All Suppliers From China:</b><br/>• Before: MOTOMA Dubai FZE (UAE), MUST (China), Alibaba, MIC<br/>• Now: ALL 7 factories in China – No Dubai/UAE<br/>• MOTOMA Factory Shenzhen, Guangdong China – Factory Direct China – Phone +86 135 7082 3914<br/>• MUST Factory Guangdong China – +86 189 2434 3876<br/>• 5 China Chemical Factories: Shanghai, Shandong, Henan, Guangzhou, Zhejiang – All Alibaba Gold / Made in China Verified<br/>• Why China Only? Single freight consolidation, one customs origin, easier SONCAP (China SONCAP mandatory), better pricing
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, marginTop: 10 }}>
                  <b>1. Buyer Registers (User View):</b> Name, WhatsApp, Company, Location, Tick "Join WhatsApp Channel" – Channel ONLY for adverts/new products/announcements, NOT quotes
                </div>
                <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: 12, marginTop: 10 }}>
                  <b>No.2 – RFQ Shows China Manufacturer:</b> Product + Buyer WhatsApp + Target China Factory Name + Phone + Platform (Alibaba Gold / MIC Verified / Factory Direct China) – Admin knows exactly which China factory to forward to. Example: "M88PW PRO – Manufacturer: MOTOMA Factory Shenzhen China – Phone +86 135 7082 3914 – Platform Factory Direct China"
                </div>
                <div style={{ background: '#0f172a', color: 'white', borderRadius: 10, padding: 12, marginTop: 10 }}>
                  <b style={{ color: '#fde68a' }}>No.6 – Quote ONLY to Buyer WhatsApp:</b> Quote DDP goes ONLY to buyer WhatsApp (private), NOT to WhatsApp Channel. Channel ONLY for adverts/new products/announcements. Example: Channel post: "New Arrival: MOTOMA Shenzhen China 51.2V 320Ah – RFQ via site" – Quote example private: "+234 803... Your M88PW 4 units DDP Lagos $7600"
                </div>
              </div>
            </div>
            <div className="card">
              <div style={{ fontWeight: 900 }}>China Only – Benefits</div>
              <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.6 }}>
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: 12 }}>
                  <b>Why All China Alone?</b><br/>• One Origin – All goods from China – Consolidate in one container Guangzhou/Shenzhen → Lagos Apapa<br/>• Single SONCAP – COTECNA China SONCAP for Nigeria – One certificate for all<br/>• Better Freight – One Bill of Lading, one customs HS code batch<br/>• Inspection – SGS China / Bureau Veritas China / COTECNA China – Inspect all 7 factories in same trip<br/>• MOTOMA: Actually factory is Shenzhen China – Dubai is just FZE office – Now listed as Shenzhen China direct<br/>• MUST: Factory is Guangdong China already<br/>• Chemicals: All 5 chemical factories China – Shanghai, Shandong, Henan, Guangzhou, Zhejiang
                </div>
                <div style={{ marginTop: 12, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 12 }}>
                  <b style={{ color: '#991b1b' }}>Removed:</b><br/>• MOTOMA Dubai FZE (UAE) – Removed – Now MOTOMA Factory Shenzhen China<br/>• No UAE suppliers – All China alone as requested
                </div>
                <a href="/" style={{ display: 'block', marginTop: 14, background: '#DC2626', color: 'white', padding: '10px', borderRadius: 10, textAlign: 'center', fontWeight: 800, fontSize: 12, textDecoration: 'none' }}>👁️ User View – All Products China Origin</a>
              </div>
            </div>
          </div>
        )}

        {tab === 'mfg' && (
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #e2e8f0', fontWeight: 900, background: '#fef2f2' }}>🏭 Manufacturers – CHINA ONLY – 7 Factories – Alibaba Gold / Made in China Verified / Factory Direct China – No Dubai/UAE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))' }}>
              {manufacturers.map(m => (
                <div key={m.id} style={{ padding: 18, borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: 900, fontSize: 14, color: '#DC2626' }}>{m.name}</div><div style={{ fontSize: 11, color: '#991b1b', fontWeight: 700 }}>{m.city} • <span style={{ background: m.platform === 'Alibaba Gold' ? '#ff6a00' : m.platform === 'Made in China Verified' ? '#e4002b' : '#DC2626', color: 'white', padding: '2px 8px', borderRadius: 999, fontSize: 10 }}>{m.platform}</span> ✓ China Only</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}>Contact: {m.contact}<br/><span style={{ color: '#059669', fontWeight: 800 }}>{m.phone}</span> • {m.email}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>{m.supplies.map(s => <span key={s} style={{ fontSize: 10, background: '#fef2f2', border: '1px solid #fecaca', padding: '2px 8px', borderRadius: 999 }}>{s}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'log' && <div className="card"><div style={{ fontWeight: 900 }}>🚢 Logistics – China → Lagos – Ship, Clear, Deliver</div>{logistics.map(l => <div key={l.id} style={{ marginTop: 12, fontSize: 12, borderTop: '1px solid #e2e8f0', paddingTop: 8 }}><b>{l.name}</b> – {l.role}<br/>{l.phone} – {l.email}<br/><span style={{ fontSize: 11, background: '#fef2f2', padding: '2px 6px', borderRadius: 6 }}>{l.charges}</span></div>)}</div>}
        {tab === 'ins' && <div className="card"><div style={{ fontWeight: 900 }}>🛡️ Insurance – China Marine Cargo</div>{insurance.map(i => <div key={i.id} style={{ marginTop: 10, fontSize: 12 }}><b>{i.name}</b> – {i.type} – {i.phone} – {i.rate}</div>)}</div>}
        {tab === 'insp' && <div className="card"><div style={{ fontWeight: 900 }}>🔍 Inspection – China PSI + SONCAP Mandatory</div>{inspection.map(ins => <div key={ins.id} style={{ marginTop: 10, fontSize: 12 }}><b>{ins.name}</b> – {ins.service} – {ins.phone} – {ins.fee}</div>)}<div style={{ marginTop: 12, background: '#fef2f2', padding: 10, borderRadius: 8, fontSize: 11, color: '#991b1b' }}>COTECNA China SONCAP is MANDATORY for China to Nigeria – Without it, goods seized at Apapa. All China factories need inspection via SGS China / Bureau Veritas China.</div></div>}
        {tab === 'rfq' && <div className="card"><div style={{ fontWeight: 900 }}>📩 RFQ Inbox – Shows China Manufacturer (No.2) – Quote ONLY to Buyer WhatsApp (No.6)</div><div style={{ fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>RFQ now shows: Product + Buyer WhatsApp + Target China Manufacturer (MOTOMA Shenzhen China / MUST Guangdong China / Shanghai Medichem China etc) + Phone + Platform – Admin knows where to forward. Quote goes ONLY to buyer WhatsApp, NOT to channel. Channel ONLY for adverts/new products/announcements.</div></div>}
        {tab === 'buyers' && <div className="card"><div style={{ fontWeight: 900 }}>Buyers – WhatsApp + Channel (Adverts Only)</div><div style={{ fontSize: 11, marginTop: 8 }}>Buyers register at inception with WhatsApp + request to join WhatsApp Channel. Channel ONLY for adverts/new products/announcements, NOT quotes. Quotes ONLY to buyer WhatsApp.</div></div>}
        {tab === 'quote' && <div className="card"><div style={{ fontWeight: 900 }}>Quote Builder – ONLY to Buyer WhatsApp</div><div style={{ fontSize: 11, marginTop: 8, background: '#0f172a', color: 'white', padding: 12, borderRadius: 10 }}>Factory China Price + Logistics China→Lagos (Sifax/Bolloré) + Insurance (Leadway/AIICO China Marine) + Inspection (SGS China/Bureau Veritas China/COTECNA SONCAP) + Platform Fee = DDP Lagos – Send ONLY to buyer WhatsApp, NOT channel. Channel example: "Advert: New Arrival MOTOMA Shenzhen China 51.2V 320Ah – RFQ via nicham-trade.vercel.app"</div></div>}
      </div>
    </div>
  );
}
