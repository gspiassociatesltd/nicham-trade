'use client'
import { useState } from 'react'

const PRODUCTS = [
  { id:1, name:'3KVA Hybrid Inverter - Pure Sine Wave', price:280000, oldPrice:320000, category:'Inverters', emoji:'⚡', badge:'Best Seller' },
  { id:2, name:'5KVA Must Hybrid Inverter', price:450000, oldPrice:520000, category:'Inverters', emoji:'⚡', badge:'Hot' },
  { id:3, name:'200Ah Lithium Battery - 48V', price:650000, oldPrice:750000, category:'Batteries', emoji:'🔋', badge:'New' },
  { id:4, name:'220Ah Tubular Battery - 12V', price:185000, oldPrice:210000, category:'Batteries', emoji:'🔋' },
  { id:5, name:'450W Monocrystalline Solar Panel', price:95000, oldPrice:110000, category:'Panels', emoji:'☀️', badge:'Save 15%' },
  { id:6, name:'550W Bifacial Solar Panel', price:125000, oldPrice:145000, category:'Panels', emoji:'☀️' },
  { id:7, name:'60A MPPT Charge Controller', price:85000, oldPrice:95000, category:'Controllers', emoji:'🎛️' },
  { id:8, name:'Complete 3KVA Solar Kit - Home', price:1450000, oldPrice:1650000, category:'Kits', emoji:'🏠', badge:'Complete' },
]

export default function Home(){
  const [filter, setFilter] = useState('All')
  const filtered = filter==='All' ? PRODUCTS : PRODUCTS.filter(p=>p.category===filter)

  return (
    <div style={{fontFamily:'system-ui', background:'#ffffff', minHeight:'100vh'}}>
      {/* CLEAN HEADER - NO ADMIN LINK - Chief Designer Choice */}
      <header style={{background:'#fff', borderBottom:'1px solid #f0f0f0', position:'sticky', top:0, zIndex:10}}>
        <div style={{maxWidth:1200, margin:'0 auto', padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontWeight:900, fontSize:22, letterSpacing:'-0.5px'}}>NiChAm Trade<span style={{color:'#16a34a'}}>.</span></div>
          <nav style={{display:'flex', gap:24, fontSize:14, fontWeight:500, color:'#333'}}>
            <span style={{cursor:'pointer'}}>Shop</span>
            <span style={{cursor:'pointer'}}>About</span>
            <span style={{cursor:'pointer'}}>Contact</span>
          </nav>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <span style={{fontSize:13, color:'#666'}}>🛒 0</span>
            <a href="https://wa.me/2347050477950" target="_blank" style={{background:'#16a34a', color:'#fff', padding:'9px 16px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:700}}>WhatsApp Us</a>
          </div>
        </div>
      </header>

      {/* HERO - CUSTOMER FACING ONLY - NO 20/40/40 BRAINSTORMING DETAILS */}
      <section style={{maxWidth:1200, margin:'0 auto', padding:'36px 20px', display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:20}}>
        <div style={{background:'#0f0f0f', color:'#fff', borderRadius:24, padding:32, position:'relative', overflow:'hidden'}}>
          <div style={{background:'#16a34a', display:'inline-block', padding:'5px 12px', borderRadius:100, fontSize:11, fontWeight:800, letterSpacing:'0.5px'}}>✓ PAYSTACK SECURED & INSURED</div>
          <h1 style={{fontSize:38, fontWeight:900, marginTop:16, lineHeight:1.05, letterSpacing:'-1px'}}>Power Your Home<br/>With <span style={{color:'#86efac'}}>Sunshine</span></h1>
          <p style={{marginTop:14, color:'#9ca3af', fontSize:15, lineHeight:1.5, maxWidth:420}}>Nigeria's trusted solar marketplace. Pay 100% securely. We deliver nationwide via AfricanIES. Your money is safe and insured until you confirm delivery.</p>
          <div style={{marginTop:22, display:'flex', gap:12}}>
            <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} style={{background:'#fff', color:'#111', border:0, padding:'12px 22px', borderRadius:100, fontWeight:800, fontSize:14, cursor:'pointer'}}>Shop Solar Kits →</button>
            <button style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'#fff', padding:'12px 22px', borderRadius:100, fontWeight:600, fontSize:14, cursor:'pointer'}}>How It Works</button>
          </div>
          <div style={{marginTop:20, display:'flex', gap:16, fontSize:11, color:'#6b7280'}}>
            <span>✓ 36 States Delivery</span><span>✓ Insured Payment</span><span>✓ 24/7 Support</span>
          </div>
        </div>
        
        {/* TRUST CARD - CUSTOMER FACING - NO INTERNAL MILESTONES */}
        <div style={{background:'#f9fafb', border:'1px solid #f0f0f0', borderRadius:24, padding:22}}>
          <div style={{fontWeight:800, fontSize:14}}>Why Buy From NiChAm Trade?</div>
          <div style={{marginTop:16, display:'grid', gap:14}}>
            <div style={{display:'flex', gap:12}}>
              <div style={{width:32, height:32, background:'#dcfce7', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16}}>🔒</div>
              <div><div style={{fontWeight:700, fontSize:13}}>100% Secure Payment</div><div style={{fontSize:11, color:'#6b7280', marginTop:2}}>Pay via Paystack. Money held safe until delivery.</div></div>
            </div>
            <div style={{display:'flex', gap:12}}>
              <div style={{width:32, height:32, background:'#fef3c7', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16}}>🚚</div>
              <div><div style={{fontWeight:700, fontSize:13}}>Nationwide Delivery</div><div style={{fontSize:11, color:'#6b7280', marginTop:2}}>AfricanIES logistics to all 36 states with tracking.</div></div>
            </div>
            <div style={{display:'flex', gap:12}}>
              <div style={{width:32, height:32, background:'#dbeafe', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16}}>🛡️</div>
              <div><div style={{fontWeight:700, fontSize:13}}>Insured & Guaranteed</div><div style={{fontSize:11, color:'#6b7280', marginTop:2}}>Your payment insured. Scan QR on delivery to confirm.</div></div>
            </div>
          </div>
          <div style={{marginTop:18, background:'#fff', border:'1px dashed #e5e7eb', borderRadius:12, padding:10, fontSize:11, color:'#6b7280', textAlign:'center'}}>
            📞 2347050477950 • Minna, Niger State • Trusted by 500+ homes
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div style={{maxWidth:1200, margin:'0 auto', padding:'0 20px', display:'flex', gap:8, flexWrap:'wrap'}}>
        {['All','Inverters','Batteries','Panels','Controllers','Kits'].map(c=>(
          <button key={c} onClick={()=>setFilter(c)} style={{padding:'8px 16px', borderRadius:100, border: filter===c?'1px solid #111':'1px solid #eee', background: filter===c?'#111':'#fff', color: filter===c?'#fff':'#555', fontSize:13, fontWeight: filter===c?700:500, cursor:'pointer'}}>{c}</button>
        ))}
      </div>

      {/* PRODUCTS - CLEAN CUSTOMER FACING */}
      <section id="products" style={{maxWidth:1200, margin:'0 auto', padding:'16px 20px 60px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:14}}>
        {filtered.map(p=>(
          <div key={p.id} style={{background:'#fff', border:'1px solid #f0f0f0', borderRadius:18, overflow:'hidden', transition:'all 0.2s'}}>
            <div style={{background:'#f9fafb', height:140, display:'flex', alignItems:'center', justifyContent:'center', fontSize:52, position:'relative'}}>
              {p.emoji}
              {p.badge && <span style={{position:'absolute', top:10, left:10, background:'#111', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 8px', borderRadius:100}}>{p.badge}</span>}
            </div>
            <div style={{padding:14}}>
              <div style={{fontSize:11, color:'#9ca3af', fontWeight:600, textTransform:'uppercase'}}>{p.category}</div>
              <div style={{fontWeight:700, fontSize:13, marginTop:4, lineHeight:1.3}}>{p.name}</div>
              <div style={{marginTop:8, display:'flex', alignItems:'baseline', gap:8}}>
                <span style={{fontWeight:900, fontSize:16}}>₦{p.price.toLocaleString()}</span>
                <span style={{fontSize:11, color:'#9ca3af', textDecoration:'line-through'}}>₦{p.oldPrice.toLocaleString()}</span>
              </div>
              <button onClick={()=>window.open(`https://wa.me/2347050477950?text=Hello NiChAm Trade, I want to buy ${encodeURIComponent(p.name)} for ₦${p.price}`, '_blank')} style={{marginTop:12, width:'100%', background:'#111', color:'#fff', border:0, padding:'11px', borderRadius:12, fontSize:13, fontWeight:700, cursor:'pointer'}}>Buy Now - Pay Securely</button>
              <div style={{marginTop:8, fontSize:10, color:'#9ca3af', textAlign:'center'}}>🔒 Paystack secured • Insured delivery</div>
            </div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS - CUSTOMER SIMPLE - NO 20/40/40 */}
      <section style={{background:'#f9fafb', borderTop:'1px solid #f0f0f0', padding:'40px 20px'}}>
        <div style={{maxWidth:1200, margin:'0 auto'}}>
          <h2 style={{fontSize:20, fontWeight:900, textAlign:'center'}}>How It Works - Simple & Safe</h2>
          <div style={{marginTop:24, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, maxWidth:800, margin:'24px auto 0'}}>
            <div style={{textAlign:'center'}}><div style={{width:48, height:48, background:'#111', color:'#fff', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', fontWeight:900}}>1</div><div style={{fontWeight:700, fontSize:13, marginTop:10}}>Order & Pay 100% Secure</div><div style={{fontSize:11, color:'#6b7280', marginTop:4}}>Pay via Paystack. Money held safely, fully insured.</div></div>
            <div style={{textAlign:'center'}}><div style={{width:48, height:48, background:'#111', color:'#fff', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', fontWeight:900}}>2</div><div style={{fontWeight:700, fontSize:13, marginTop:10}}>We Deliver Nationwide</div><div style={{fontSize:11, color:'#6b7280', marginTop:4}}>AfricanIES delivers to your door. Track shipment.</div></div>
            <div style={{textAlign:'center'}}><div style={{width:48, height:48, background:'#16a34a', color:'#fff', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', fontWeight:900}}>3</div><div style={{fontWeight:700, fontSize:13, marginTop:10}}>Scan QR to Confirm</div><div style={{fontSize:11, color:'#6b7280', marginTop:4}}>Scan QR inside package to confirm delivery. Done!</div></div>
          </div>
        </div>
      </section>

      <footer style={{background:'#0f0f0f', color:'#9ca3af', padding:'28px 20px', textAlign:'center', fontSize:11}}>
        <div style={{fontWeight:900, color:'#fff', fontSize:14}}>NiChAm Trade.</div>
        <div style={{marginTop:6}}>© 2026 GSPI Associates Ltd • Minna, Niger State • 2347050477950 • Paystack Secured & Insured</div>
        {/* Admin hidden - only via direct /admin URL - Chief Designer choice */}
      </footer>
    </div>
  )
}
