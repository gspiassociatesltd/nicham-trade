'use client';
import { useState } from 'react';

type Product = {
  id: string;
  brand: 'MOTOMA' | 'MUST';
  model: string;
  image: string;
  capacity: string;
  voltage: string;
  energy: string;
  cycles: string;
  features: string[];
  priceUSD: number;
  priceNGN: number;
  moq: string;
  manufacturer: string;
};

const products: Product[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Grade A+ LiFePO4','SOC Display','WiFi Monitoring','15 Parallel','150A Discharge'], priceUSD: 1150, priceNGN: 1840000, moq: 'Mix Allowed', manufacturer: 'MOTOMA Dubai' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V', image: '/products/motoma/M69PW_PRO.png', capacity: '300Ah', voltage: '25.6V', energy: '7.68kWh', cycles: '8000 Cycles', features: ['Grade A+ Cells','Touch Screen','RS485/CAN','7Y Warranty'], priceUSD: 1650, priceNGN: 2640000, moq: 'Mix Allowed', manufacturer: 'MOTOMA Dubai' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah', voltage: '51.2V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Wall Mount','Fresh LiFePO4','60°C Resilience','Safety BMS'], priceUSD: 1180, priceNGN: 1888000, moq: 'Mix Allowed', manufacturer: 'MOTOMA Dubai' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah', voltage: '51.2V', energy: '10.24kWh', cycles: '8000 Cycles', features: ['10kWh Power Wall','150A Continuous','WiFi + Touch','Multi-Inverter'], priceUSD: 2250, priceNGN: 3600000, moq: 'Mix Allowed', manufacturer: 'MOTOMA Dubai' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V Rack', image: '/products/motoma/M90_PRO.png', capacity: '320Ah', voltage: '51.2V', energy: '16.38kWh', cycles: '8000 Cycles', features: ['19" Rack Mount','Commercial','200A Peak','CAN/RS485'], priceUSD: 3450, priceNGN: 5520000, moq: '2 Units', manufacturer: 'MOTOMA Dubai' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO - 280Ah 51.2V', image: '/products/motoma/M91_PRO.png', capacity: '280Ah', voltage: '51.2V', energy: '14.33kWh', cycles: '8000 Cycles', features: ['High Capacity','Lifetime Support','Smart BMS','EPS/UPS'], priceUSD: 2950, priceNGN: 4720000, moq: 'Mix Allowed', manufacturer: 'MOTOMA Dubai' },
  { id: 'MUST-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', voltage: '48V', energy: 'MPPT 100A', cycles: 'Pure Sine', features: ['WiFi Monitoring','Parallel 9','LiFePO4 Ready','Touch LCD'], priceUSD: 580, priceNGN: 928000, moq: '5 Units', manufacturer: 'MUST Factory' },
  { id: 'MUST-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', voltage: '48V', energy: 'MPPT 120A', cycles: 'On/Off Grid', features: ['Dual MPPT','High PV 500V','BMS Comm','IP20'], priceUSD: 780, priceNGN: 1248000, moq: '3 Units', manufacturer: 'MUST Factory' },
  { id: 'MUST-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V Wall', image: '/products/must/MUST_3_656x684.png', capacity: '200Ah', voltage: '48V', energy: '10.24kWh', cycles: '6000 Cycles', features: ['Wall Mount','Grade A','6000 Cycles','RS485/CAN'], priceUSD: 1950, priceNGN: 3120000, moq: 'Mix Allowed', manufacturer: 'MUST Factory' },
  { id: 'MUST-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V', image: '/products/must/MUST_4_526x684.png', capacity: '100Ah', voltage: '48V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['Compact Wall','5kWh Module','Parallel 16','5Y Warranty'], priceUSD: 1080, priceNGN: 1728000, moq: 'Mix Allowed', manufacturer: 'MUST Factory' },
  { id: 'MUST-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V Off-Grid', image: '/products/must/MUST_5_584x553.png', capacity: '5kW', voltage: '48V', energy: 'MPPT 80A', cycles: 'Transformer', features: ['Heavy Duty','Pure Sine','LCD','Dust Proof'], priceUSD: 520, priceNGN: 832000, moq: '10 Units', manufacturer: 'MUST Factory' },
  { id: 'MUST-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', image: '/products/must/MUST_6_472x684.png', capacity: '3kW', voltage: '24V', energy: 'MPPT 60A', cycles: 'Hybrid', features: ['Best Seller','WiFi Opt','Lithium Ready','LCD'], priceUSD: 310, priceNGN: 496000, moq: '10 Units', manufacturer: 'MUST Factory' },
  { id: 'MUST-10148', brand: 'MUST', model: 'PV18-10148 10kW 48V 3-Phase', image: '/products/must/MUST_11_433x519.png', capacity: '10kW', voltage: '48V', energy: 'MPPT 2x100A', cycles: '3 Phase', features: ['10kW Hybrid','Dual MPPT','Parallel 9','Industrial'], priceUSD: 1450, priceNGN: 2320000, moq: '2 Units', manufacturer: 'MUST Factory' },
  { id: 'MUST-CC60', brand: 'MUST', model: 'MPPT 60A Charge Controller', image: '/products/must/RENDER_PAGE_1.png', capacity: '60A', voltage: '12/24/48V', energy: 'Max PV 190V', cycles: 'Controller', features: ['LCD','Lithium Profile','RS485','99% Eff'], priceUSD: 125, priceNGN: 200000, moq: '20 Units', manufacturer: 'MUST Factory' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL'|'MOTOMA'|'MUST'>('ALL');
  const [toast, setToast] = useState<string|null>(null);
  const filtered = products.filter(p => filter==='ALL' || p.brand===filter);

  const handleRFQ = (p: Product) => {
    const msg = `Hello NiChAm Trade - Powering Nigeria%0A%0A*RFQ Request*%0AModel: ${p.model}%0ABrand: ${p.brand}%0ACapacity: ${p.capacity} ${p.voltage} (${p.energy})%0APrice: $${p.priceUSD} / ₦${p.priceNGN.toLocaleString()} DDP Lagos%0AManufacturer: ${p.manufacturer}%0AMOQ: ${p.moq}`;
    window.open(`https://wa.me/2347050477950?text=${msg}`, '_blank');
    setToast(`RFQ sent to +234 705 047 7950 - Manufacturer: ${p.manufacturer}`);
    setTimeout(()=>setToast(null),4000);
  };

  return (
    <div style={{fontFamily: 'Inter, system-ui, sans-serif', background: '#f8fafc', minHeight: '100vh'}}>
      {toast && <div style={{position:'fixed', top:20, right:20, zIndex:9999, background:'#059669', color:'white', padding:'12px 20px', borderRadius:12, boxShadow:'0 10px 30px rgba(0,0,0,0.2)', fontWeight:700}}>✅ {toast}</div>}

      <style>{`
        *{box-sizing:border-box}
        .header{position:sticky; top:0; z-index:40; background:rgba(255,255,255,0.95); backdrop-filter:blur(12px); border-bottom:1px solid #e2e8f0; padding:14px 0}
        .container{max-width:1280px; margin:0 auto; padding:0 20px}
        .logo{display:flex; align-items:center; gap:12px}
        .logo-icon{width:42px; height:42px; border-radius:12px; background:linear-gradient(135deg,#059669,#eab308); display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:20px}
        .hero{display:grid; grid-template-columns:1.2fr 0.8fr; gap:32px; padding:48px 0}
        .hero h2{font-size:48px; line-height:1.05; font-weight:900; margin:12px 0}
        .badge{display:inline-flex; align-items:center; gap:6px; background:#ecfdf5; color:#047857; padding:6px 12px; border-radius:999px; font-size:12px; font-weight:800}
        .btn{padding:10px 20px; border-radius:12px; font-weight:800; font-size:14px; border:none; cursor:pointer; transition:0.2s}
        .btn-primary{background:#059669; color:white}
        .btn-dark{background:#0f172a; color:white}
        .btn-light{background:white; border:1px solid #e2e8f0}
        .btn-active{transform:scale(1.05); box-shadow:0 8px 20px rgba(5,150,105,0.3)}
        .grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:20px}
        .card{background:white; border:1px solid #e2e8f0; border-radius:20px; overflow:hidden; transition:0.25s; display:flex; flex-direction:column}
        .card:hover{transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,0.12)}
        .card-img{height:220px; background:linear-gradient(180deg,#f8fafc,white); display:flex; align-items:center; justify-content:center; position:relative; padding:16px}
        .card-img img{max-height:180px; max-width:100%; object-fit:contain; transition:0.3s}
        .card:hover .card-img img{transform:scale(1.08)}
        .pill{position:absolute; font-size:10px; font-weight:900; padding:4px 8px; border-radius:999px; letter-spacing:0.3px}
        .pill-brand{top:12px; left:12px}
        .pill-moq{top:12px; right:12px; background:#0f172a; color:white}
        .price-box{background:#0f172a; color:white; border-radius:14px; padding:12px; margin-top:12px}
        .spec{font-size:10px; background:#f1f5f9; padding:3px 8px; border-radius:999px; font-weight:600}
        @media(max-width:1100px){.grid4{grid-template-columns:repeat(3,1fr)} .hero{grid-template-columns:1fr}}
        @media(max-width:700px){.grid4{grid-template-columns:repeat(2,1fr)} .hero h2{font-size:32px}}
        @media(max-width:500px){.grid4{grid-template-columns:1fr}}
      `}</style>

      <header className="header">
        <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className="logo">
            <div className="logo-icon">N</div>
            <div>
              <div style={{fontWeight:900, fontSize:18, lineHeight:1}}>NiChAm Trade</div>
              <div style={{fontSize:11, color:'#059669', fontWeight:700}}>Powering Nigeria – Solar & Storage</div>
            </div>
          </div>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <span style={{fontSize:12, background:'#f1f5f9', padding:'6px 12px', borderRadius:999, display:'none'}} className="desktop-only">RFQ → <b style={{color:'#059669'}}>+234 705 047 7950</b></span>
            <a href="/admin" style={{fontSize:12, padding:'6px 14px', borderRadius:999, border:'1px solid #e2e8f0', background:'#0f172a', color:'white', textDecoration:'none', fontWeight:700}}>Admin</a>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="hero">
          <div>
            <div className="badge">⚡ 20 Products Ready – MOTOMA Dubai + MUST Factory – Real Photos</div>
            <h2>MOTOMA Grade A+ <span style={{color:'#059669'}}>8000 Cycles</span> & MUST Hybrid Inverters</h2>
            <p style={{color:'#475569', marginTop:12, lineHeight:1.6}}>Professional DDP Lagos pricing. Wall mount, rack mount, hybrid inverters. All RFQ centralized to Nigeria. Supplier numbers hidden from customers – Admin only.</p>
            <div style={{display:'flex', gap:10, marginTop:20}}>
              <button onClick={()=>setFilter('MOTOMA')} className={`btn ${filter==='MOTOMA' ? 'btn-primary btn-active' : 'btn-dark'}`}>MOTOMA 6</button>
              <button onClick={()=>setFilter('MUST')} className={`btn ${filter==='MUST' ? 'btn-primary btn-active' : 'btn-light'}`}>MUST 14</button>
              <button onClick={()=>setFilter('ALL')} className={`btn ${filter==='ALL' ? 'btn-dark btn-active' : 'btn-light'}`}>All 20</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:20}}>
              <div style={{background:'white', border:'1px solid #e2e8f0', padding:12, borderRadius:16}}><div style={{fontSize:11, fontWeight:800}}>MOQ Policy</div><div style={{fontSize:12, color:'#475569'}}>Mix Allowed for Batteries</div></div>
              <div style={{background:'white', border:'1px solid #e2e8f0', padding:12, borderRadius:16}}><div style={{fontSize:11, fontWeight:800}}>DDP Lagos</div><div style={{fontSize:12, color:'#475569'}}>USD + NGN Pricing</div></div>
              <div style={{background:'white', border:'1px solid #e2e8f0', padding:12, borderRadius:16}}><div style={{fontSize:11, fontWeight:800}}>RFQ Central</div><div style={{fontSize:12, color:'#475569'}}>+234 705 047 7950 Only</div></div>
            </div>
          </div>
          <div style={{background:'linear-gradient(135deg,#059669,#eab308)', borderRadius:24, padding:4}}>
            <div style={{background:'white', borderRadius:20, padding:16}}>
              <img src="/products/motoma/M68PW_PRO.png" alt="MOTOMA" style={{width:'100%', height:260, objectFit:'contain'}} />
              <div style={{display:'flex', justifyContent:'space-between', marginTop:12, alignItems:'center'}}>
                <span style={{fontWeight:900, fontSize:14}}>M68PW PRO Best Seller</span>
                <span style={{fontSize:11, background:'#ecfdf5', color:'#047857', padding:'4px 8px', borderRadius:999, fontWeight:700}}>200Ah 25.6V 5.12kWh</span>
              </div>
              <div style={{marginTop:8, fontSize:12, color:'#64748b'}}>Real photo extracted from PDF – No more white boxes</div>
            </div>
          </div>
        </div>

        <div className="grid4" style={{paddingBottom:80}}>
          {filtered.map(p=>(
            <div key={p.id} className="card">
              <div className="card-img">
                <span className="pill pill-brand" style={{background: p.brand==='MOTOMA' ? '#059669' : '#eab308', color: p.brand==='MOTOMA' ? 'white' : 'black'}}>{p.brand}</span>
                <span className="pill pill-moq">{p.moq}</span>
                <img src={p.image} alt={p.model} onError={(e)=>{(e.target as HTMLImageElement).src='/products/must/RENDER_PAGE_1.png'}} />
              </div>
              <div style={{padding:16, flex:1, display:'flex', flexDirection:'column'}}>
                <div style={{fontWeight:800, fontSize:13, lineHeight:1.3, minHeight:34}}>{p.model}</div>
                <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:8}}>
                  <span className="spec">{p.capacity}</span>
                  <span className="spec">{p.voltage}</span>
                  <span className="spec">{p.energy}</span>
                  <span className="spec" style={{background:'#ecfdf5', color:'#047857'}}>{p.cycles}</span>
                </div>
                <div style={{marginTop:10}}>
                  {p.features.slice(0,3).map(f=>(
                    <div key={f} style={{fontSize:11, color:'#475569', display:'flex', gap:6, marginBottom:3}}><span style={{color:'#059669'}}>✓</span> {f}</div>
                  ))}
                </div>
                <div className="price-box">
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div><div style={{fontSize:10, opacity:0.6}}>DDP Lagos</div><div style={{fontWeight:900, fontSize:14}}>${p.priceUSD}</div></div>
                    <div style={{textAlign:'right'}}><div style={{fontSize:10, opacity:0.6}}>NGN</div><div style={{fontWeight:700, fontSize:14}}>₦{p.priceNGN.toLocaleString()}</div></div>
                  </div>
                  <div style={{fontSize:10, opacity:0.5, marginTop:6}}>Manufacturer: {p.manufacturer}</div>
                </div>
                <button onClick={()=>handleRFQ(p)} style={{marginTop:12, width:'100%', background:'#059669', color:'white', border:'none', padding:'11px', borderRadius:12, fontWeight:900, fontSize:13, cursor:'pointer'}}>RFQ → +234 705 047 7950</button>
                <div style={{fontSize:10, textAlign:'center', color:'#94a3b8', marginTop:6}}>Admin notified • Real Photo</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{background:'#0f172a', color:'white', padding:'24px 0', borderTop:'1px solid #1e293b'}}>
        <div className="container" style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16, fontSize:13}}>
          <div><b>NiChAm Trade – Powering Nigeria</b><br/><span style={{color:'#94a3b8'}}>MOTOMA Dubai + MUST Factory | GSPI Associates Ltd</span></div>
          <div style={{color:'#94a3b8'}}>Customer RFQ: <b style={{color:'white'}}>+234 705 047 7950</b> (WhatsApp)<br/>Supplier contacts hidden – Admin only</div>
        </div>
      </footer>
    </div>
  );
}
