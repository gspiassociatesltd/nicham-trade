'use client'
import { useState } from 'react'

const PRODUCTS = [
  { id:1, name:'3KVA Hybrid Inverter', sub:'Pure Sine Wave - 24V', price:280000, oldPrice:320000, category:'Inverters', emoji:'⚡', gradient:'linear-gradient(135deg,#fef3c7,#fde68a)', badge:'Best Seller' },
  { id:2, name:'5KVA Must Inverter', sub:'Hybrid - 48V MPPT', price:450000, oldPrice:520000, category:'Inverters', emoji:'⚡', gradient:'linear-gradient(135deg,#e0e7ff,#c7d2fe)', badge:'Hot' },
  { id:3, name:'200Ah Lithium Battery', sub:'48V - 10 Year Warranty', price:650000, oldPrice:750000, category:'Batteries', emoji:'🔋', gradient:'linear-gradient(135deg,#dcfce7,#bbf7d0)', badge:'New' },
  { id:4, name:'220Ah Tubular Battery', sub:'12V Deep Cycle', price:185000, oldPrice:210000, category:'Batteries', emoji:'🔋', gradient:'linear-gradient(135deg,#f3f4f6,#e5e7eb)', badge:'' },
  { id:5, name:'450W Solar Panel', sub:'Monocrystalline', price:95000, oldPrice:110000, category:'Panels', emoji:'☀️', gradient:'linear-gradient(135deg,#fef9c3,#fde047)', badge:'Save 15%' },
  { id:6, name:'550W Bifacial Panel', sub:'Dual Glass', price:125000, oldPrice:145000, category:'Panels', emoji:'☀️', gradient:'linear-gradient(135deg,#ffedd5,#fed7aa)', badge:'' },
  { id:7, name:'60A MPPT Controller', sub:'Bluetooth App', price:85000, oldPrice:95000, category:'Controllers', emoji:'🎛️', gradient:'linear-gradient(135deg,#ede9fe,#ddd6fe)', badge:'' },
  { id:8, name:'Complete 3KVA Kit', sub:'Home - Full Installation', price:1450000, oldPrice:1650000, category:'Kits', emoji:'🏠', gradient:'linear-gradient(135deg,#d1fae5,#6ee7b7)', badge:'Complete' },
]

export default function Home(){
  const [filter, setFilter] = useState('All')
  const filtered = filter==='All' ? PRODUCTS : PRODUCTS.filter(p=>p.category===filter)

  return (
    <div style={{fontFamily:"'Geist', 'Inter', system-ui, -apple-system, sans-serif", background:'#ffffff', minHeight:'100vh', color:'#111'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        *{font-family:Inter,system-ui}
        .card:hover{transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,0.08)}
        .card{transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}
        .shimmer{background:linear-gradient(90deg,#111 0%,#333 50%,#111 100%); background-size:200% 100%; animation:shimmer 3s infinite}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      `}</style>

      {/* BEAUTIFUL HEADER - Glassmorphism */}
      <header style={{background:'rgba(255,255,255,0.8)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:20}}>
        <div style={{maxWidth:1240, margin:'0 auto', padding:'16px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{width:32, height:32, background:'#111', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:900, fontSize:14}}>N</div>
            <div style={{fontWeight:900, fontSize:20, letterSpacing:'-0.8px'}}>NiChAm Trade<span style={{color:'#16a34a'}}>.</span></div>
            <div style={{marginLeft:12, background:'#f3f4f6', padding:'4px 10px', borderRadius:100, fontSize:10, fontWeight:700, letterSpacing:'0.5px'}}>SOLAR MARKETPLACE</div>
          </div>
          <div style={{display:'flex', gap:10, alignItems:'center'}}>
            <div style={{width:36, height:36, background:'#f9fafb', border:'1px solid #f0f0f0', borderRadius:100, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14}}>🛒</div>
            <a href="https://wa.me/2347050477950" target="_blank" style={{background:'#111', color:'#fff', padding:'10px 18px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:700, letterSpacing:'-0.2px'}}>WhatsApp</a>
          </div>
        </div>
      </header>

      {/* BEAUTIFUL HERO - Gradient + Glass */}
      <section style={{maxWidth:1240, margin:'0 auto', padding:'28px 24px', display:'grid', gridTemplateColumns:'1.15fr 0.85fr', gap:20}}>
        <div style={{background:'radial-gradient(120% 120% at 10% 10%, #1a1a1a 0%, #0f0f0f 50%, #000 100%)', color:'#fff', borderRadius:32, padding:36, position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', top:-80, right:-80, width:280, height:280, background:'radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)', borderRadius:'50%'}}></div>
          <div style={{position:'absolute', bottom:-60, left:-40, width:200, height:200, background:'radial-gradient(circle, rgba(132,204,2,0.15) 0%, transparent 70%)', borderRadius:'50%'}}></div>
          
          <div style={{position:'relative'}}>
            <div style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', padding:'6px 12px', borderRadius:100, fontSize:11, fontWeight:700, letterSpacing:'0.5px'}}>
              <span style={{width:6, height:6, background:'#22c55e', borderRadius:'50%', boxShadow:'0 0 0 3px rgba(34,197,94,0.2)'}}></span> PAYSTACK SECURED & INSURED
            </div>
            <h1 style={{fontSize:44, fontWeight:900, marginTop:18, lineHeight:0.95, letterSpacing:'-1.8px'}}>
              Power Your<br/>
              Home With<br/>
              <span style={{background:'linear-gradient(90deg,#86efac,#22c55e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Sunshine.</span>
            </h1>
            <p style={{marginTop:16, color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.6, maxWidth:380, fontWeight:400}}>
              Premium inverters, lithium batteries & solar panels. Pay securely via Paystack. Insured escrow until delivery confirmation.
            </p>
            <div style={{marginTop:26, display:'flex', gap:12}}>
              <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} style={{background:'#fff', color:'#111', border:0, padding:'14px 24px', borderRadius:100, fontWeight:800, fontSize:14, cursor:'pointer', letterSpacing:'-0.2px'}}>Shop Collection →</button>
              <button style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)', color:'#fff', padding:'14px 22px', borderRadius:100, fontWeight:600, fontSize:14, cursor:'pointer'}}>How it works</button>
            </div>
            <div style={{marginTop:24, display:'flex', gap:18, fontSize:11, color:'rgba(255,255,255,0.4)', fontWeight:600, letterSpacing:'0.5px'}}>
              <span>✓ NATIONWIDE</span><span>✓ INSURED</span><span>✓ SECURE</span>
            </div>
          </div>
        </div>
        
        {/* BEAUTIFUL TRUST CARD */}
        <div style={{background:'#fcfcf9', border:'1px solid #f0f0e8', borderRadius:32, padding:26, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontWeight:800, fontSize:14, letterSpacing:'-0.3px'}}>How it works</div>
              <div style={{fontSize:10, background:'#111', color:'#fff', padding:'4px 8px', borderRadius:100, fontWeight:700}}>SIMPLE & SAFE</div>
            </div>
            <div style={{marginTop:20, display:'grid', gap:16}}>
              {[
                {n:'01', t:'Order & Pay Secure', d:'Pay 100% via Paystack. Funds held safe & insured.', c:'#dcfce7'},
                {n:'02', t:'We Deliver', d:'AfricanIES logistics to your doorstep with tracking.', c:'#fef3c7'},
                {n:'03', t:'Scan to Confirm', d:'Scan QR inside package to confirm delivery.', c:'#dbeafe'},
              ].map(s=>(
                <div key={s.n} style={{display:'flex', gap:12, alignItems:'flex-start'}}>
                  <div style={{minWidth:32, height:32, background:s.c, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900}}>{s.n}</div>
                  <div><div style={{fontWeight:700, fontSize:13, letterSpacing:'-0.2px'}}>{s.t}</div><div style={{fontSize:11.5, color:'#6b7280', marginTop:2, lineHeight:1.4}}>{s.d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:20, background:'#fff', border:'1px solid #f0f0f0', borderRadius:16, padding:12, display:'flex', alignItems:'center', gap:10}}>
            <div style={{width:36, height:36, background:'#f3f4f6', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center'}}>🔒</div>
            <div style={{flex:1}}><div style={{fontSize:12, fontWeight:700}}>Paystack Secured</div><div style={{fontSize:10, color:'#888'}}>Your money is safe & insured</div></div>
            <div style={{fontSize:16}}>✓</div>
          </div>
        </div>
      </section>

      {/* BEAUTIFUL FILTERS - Pill */}
      <div style={{maxWidth:1240, margin:'0 auto', padding:'4px 24px 0', display:'flex', gap:8, flexWrap:'wrap'}}>
        {['All','Inverters','Batteries','Panels','Controllers','Kits'].map(c=>(
          <button key={c} onClick={()=>setFilter(c)} style={{padding:'9px 16px', borderRadius:100, border: filter===c?'1px solid #111':'1px solid #eaeaea', background: filter===c?'#111':'#fff', color: filter===c?'#fff':'#555', fontSize:13, fontWeight: filter===c?700:500, cursor:'pointer', transition:'all 0.2s'}}>{c}</button>
        ))}
      </div>

      {/* BEAUTIFUL PRODUCTS - Glass + Gradient */}
      <section id="products" style={{maxWidth:1240, margin:'0 auto', padding:'18px 24px 80px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:16}}>
        {filtered.map(p=>(
          <div key={p.id} className="card" style={{background:'#fff', border:'1px solid #f0f0f0', borderRadius:24, overflow:'hidden', cursor:'pointer'}}>
            <div style={{background:p.gradient, height:160, display:'flex', alignItems:'center', justifyContent:'center', fontSize:56, position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:12, left:12, display:'flex', gap:6}}>
                <span style={{background:'rgba(255,255,255,0.9)', backdropFilter:'blur(10px)', fontSize:10, fontWeight:800, padding:'5px 9px', borderRadius:100, letterSpacing:'0.3px'}}>{p.category.toUpperCase()}</span>
                {p.badge && <span style={{background:'#111', color:'#fff', fontSize:10, fontWeight:700, padding:'5px 9px', borderRadius:100}}>{p.badge}</span>}
              </div>
              <span style={{filter:'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'}}>{p.emoji}</span>
            </div>
            <div style={{padding:16}}>
              <div style={{fontWeight:800, fontSize:14, letterSpacing:'-0.3px', lineHeight:1.2}}>{p.name}</div>
              <div style={{fontSize:12, color:'#888', marginTop:2}}>{p.sub}</div>
              <div style={{marginTop:12, display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                <div><span style={{fontWeight:900, fontSize:18, letterSpacing:'-0.5px'}}>₦{p.price.toLocaleString()}</span> <span style={{fontSize:11, color:'#aaa', textDecoration:'line-through', marginLeft:6}}>₦{p.oldPrice.toLocaleString()}</span></div>
                <div style={{width:28, height:28, background:'#111', borderRadius:100, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12}}>→</div>
              </div>
              <button onClick={(e)=>{e.stopPropagation(); window.open(`https://wa.me/2347050477950?text=Hello NiChAm Trade, I want to buy ${encodeURIComponent(p.name)}`, '_blank')}} style={{marginTop:14, width:'100%', background:'#111', color:'#fff', border:0, padding:'12px', borderRadius:14, fontSize:13, fontWeight:700, cursor:'pointer', letterSpacing:'-0.2px'}}>Buy Now</button>
            </div>
          </div>
        ))}
      </section>

      <footer style={{borderTop:'1px solid #f0f0f0', padding:'32px 24px', textAlign:'center'}}>
        <div style={{maxWidth:1240, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{width:28, height:28, background:'#111', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:900, fontSize:12}}>N</div>
            <span style={{fontWeight:800, fontSize:13}}>NiChAm Trade • GSPI Associates Ltd • Honest & Insured</span>
          </div>
          <div style={{fontSize:11, color:'#999'}}>© 2026 • No fake claims • Real escrow • Paystack secured</div>
        </div>
      </footer>
    </div>
  )
}
