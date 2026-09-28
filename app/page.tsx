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
    <div style={{fontFamily:'system-ui', background:'#fbfcfa', minHeight:'100vh'}}>
      <header style={{background:'#fff', borderBottom:'1px solid #eee', position:'sticky', top:0, zIndex:10}}>
        <div style={{maxWidth:1200, margin:'0 auto', padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontWeight:900, fontSize:22}}>NiChAm Trade<span style={{color:'#16a34a'}}>.</span></div>
          <div style={{display:'flex', gap:12, fontSize:13}}>
            <a href="/admin" style={{color:'#16a34a', fontWeight:700, textDecoration:'none'}}>Admin</a>
            <a href="/admin/escrow" style={{color:'#111', fontWeight:700, textDecoration:'none'}}>Escrow (Auto Insured)</a>
            <a href="https://wa.me/2347050477950" target="_blank" style={{background:'#16a34a', color:'#fff', padding:'8px 14px', borderRadius:100, textDecoration:'none', fontWeight:700}}>WhatsApp</a>
          </div>
        </div>
      </header>
      <section style={{maxWidth:1200, margin:'0 auto', padding:'30px 20px', display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:20}}>
        <div style={{background:'#111', color:'#fff', borderRadius:24, padding:28}}>
          <div style={{background:'#16a34a', display:'inline-block', padding:'4px 10px', borderRadius:100, fontSize:11, fontWeight:700}}>NIGERIA #1 SOLAR MARKETPLACE - INSURED ESCROW</div>
          <h1 style={{fontSize:34, fontWeight:900, marginTop:12}}>Pay 100% Secure<br/><span style={{color:'#86efac'}}>Auto Escrow</span> - No Manual Pay</h1>
          <p style={{color:'#aaa', fontSize:14, marginTop:10}}>Client pays 100% upfront via Paystack (insured). 20% auto to AfricanIES on payment, 40% auto on Bill of Lading upload, 40% auto on customer QR scan + platform fee auto to you. License safe - no manual instruction.</p>
        </div>
        <div style={{background:'#fff', border:'1px solid #eee', borderRadius:24, padding:18, fontSize:13}}>
          <b>How Escrow Works (Auto - Insured)</b><br/>
          <div style={{marginTop:10}}>✓ 20% auto → Payment confirmed (Paystack webhook)<br/>✓ 40% auto → AfricanIES uploads BOL<br/>✓ 40% auto → Customer scans QR delivery code<br/>✓ 10% platform fee auto to NiChAm Trade<br/>✓ Funds insured via Paystack + Leadway</div>
        </div>
      </section>
      <div style={{maxWidth:1200, margin:'0 auto', padding:'0 20px', display:'flex', gap:8, flexWrap:'wrap'}}>
        {['All','Inverters','Batteries','Panels','Controllers','Kits'].map(c=>(
          <button key={c} onClick={()=>setFilter(c)} style={{padding:'8px 14px', borderRadius:100, border: filter===c?'1px solid #111':'1px solid #eee', background: filter===c?'#111':'#fff', color: filter===c?'#fff':'#111', fontSize:13}}>{c}</button>
        ))}
      </div>
      <section style={{maxWidth:1200, margin:'0 auto', padding:'16px 20px 60px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:14}}>
        {filtered.map(p=>(
          <div key={p.id} style={{background:'#fff', border:'1px solid #eee', borderRadius:18, overflow:'hidden'}}>
            <div style={{background:'#f6f7f5', height:120, display:'flex', alignItems:'center', justifyContent:'center', fontSize:48}}>{p.emoji}</div>
            <div style={{padding:12}}>
              <div style={{fontSize:11, color:'#888'}}>{p.category} {p.badge ? `• ${p.badge}` : ''}</div>
              <div style={{fontWeight:700, fontSize:13, marginTop:4}}>{p.name}</div>
              <div style={{marginTop:6}}><b>₦{p.price.toLocaleString()}</b> <span style={{fontSize:11, color:'#999', textDecoration:'line-through'}}>₦{p.oldPrice.toLocaleString()}</span></div>
              <button onClick={()=>window.open('https://wa.me/2347050477950?text=I want '+encodeURIComponent(p.name), '_blank')} style={{marginTop:10, width:'100%', background:'#111', color:'#fff', border:0, padding:'10px', borderRadius:10, fontSize:12, fontWeight:700}}>Order via WhatsApp - Pay 100% Secure</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
