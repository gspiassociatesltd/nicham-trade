'use client'
import { useState, useEffect } from 'react'
export default function QuoteModal({ product, onClose }: { product: any, onClose: () => void }){
  const [user, setUser] = useState<any>(null)
  const [qty, setQty] = useState('')
  const [loc, setLoc] = useState('Lagos')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  useEffect(()=>{ const s=localStorage.getItem('nicham_user'); if(s){ const u=JSON.parse(s); setUser(u); setEmail(u.email); setName(u.name); setPhone(u.phone||'') } },[])
  async function submit(e:any){
    e.preventDefault()
    if(!qty||!loc){ alert('Quantity and location required'); return }
    if(!user && (!email||!name||!phone)){ window.location.href='/signup'; return }
    setLoading(true)
    try{
      const res=await fetch('/api/quotes',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ product, user, quantity: qty, location: loc, phone, email, name }) })
      const data=await res.json()
      if(data.success) setOk(true); else alert(data.error)
    }catch{ alert('Failed') } finally{ setLoading(false) }
  }
  if(ok){
    return (<div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:20 }}>
      <div style={{ background:'#fff', borderRadius:16, padding:32, maxWidth:480, width:'100%', textAlign:'center' }}>
        <div style={{ width:64, height:64, background:'#22c55e', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color:'#fff', fontSize:32 }}>✓</div>
        <div style={{ fontWeight:900, fontSize:20 }}>Quote Request Sent</div>
        <div style={{ fontSize:13, color:'#475569', marginTop:12 }}>Your DDP quote for {product.model} sent to {product.sourceCompany}. Valid 3 Days. We will contact you at {email} / {phone} within 24h.</div>
        <button onClick={onClose} style={{ marginTop:20, background:'#0f172a', color:'#fff', padding:'10px 20px', borderRadius:10, fontWeight:800, border:'none', cursor:'pointer' }}>Close</button>
      </div>
    </div>)
  }
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:20 }}>
      <div style={{ background:'#fff', borderRadius:16, maxWidth:520, width:'100%', maxHeight:'90vh', overflow:'auto' }}>
        <div style={{ padding:20, borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between' }}>
          <div><div style={{ fontWeight:900, fontSize:18 }}>Get Exact DDP to Premises Quote</div><div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>{product.model} • MOQ: {product.moq} • Valid 3 Days</div></div>
          <button onClick={onClose} style={{ background:'#f1f5f9', border:'none', width:36, height:36, borderRadius:'50%', cursor:'pointer' }}>×</button>
        </div>
        <div style={{ padding:20 }}>
          <div style={{ display:'flex', gap:12, marginBottom:16 }}>
            <img src={product.image} alt={product.name} style={{ width:80, height:80, objectFit:'contain', border:'1px solid #e2e8f0', borderRadius:12, padding:8 }} />
            <div><div style={{ fontWeight:800, fontSize:14 }}>{product.name}</div><div style={{ fontSize:11, color:'#64748b', marginTop:4 }}>{product.desc}</div><div style={{ fontSize:10, color:'#166534', marginTop:6, background:'#f0fdf4', padding:'4px 8px', borderRadius:100, display:'inline-block' }}>{product.standards?.[0]} • {product.grade}</div></div>
          </div>
          {!user && <div style={{ background:'#fef3c7', border:'1px solid #fcd34d', padding:12, borderRadius:10, marginBottom:16, fontSize:12 }}><b>Please sign up</b> – <a href='/login' style={{ fontWeight:800 }}>login here</a> or fill below.</div>}
          <form onSubmit={submit}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div><label style={{ fontSize:11, fontWeight:800 }}>Quantity *</label><input value={qty} onChange={e=>setQty(e.target.value)} placeholder={`Min ${product.moq}`} required style={{ width:'100%', marginTop:6, padding:'10px 12px', borderRadius:10, border:'1px solid #e2e8f0' }} /></div>
              <div><label style={{ fontSize:11, fontWeight:800 }}>Location *</label><select value={loc} onChange={e=>setLoc(e.target.value)} style={{ width:'100%', marginTop:6, padding:'10px 12px', borderRadius:10, border:'1px solid #e2e8f0' }}><option>Lagos</option><option>Abuja</option><option>Kano</option><option>Port Harcourt</option><option>Enugu</option><option>Ibadan</option><option>Other</option></select></div>
            </div>
            <div style={{ marginTop:12 }}><label style={{ fontSize:11, fontWeight:800 }}>Full Name *</label><input value={name} onChange={e=>setName(e.target.value)} required style={{ width:'100%', marginTop:6, padding:'10px 12px', borderRadius:10, border:'1px solid #e2e8f0' }} placeholder='Your full name' /></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12 }}>
              <div><label style={{ fontSize:11, fontWeight:800 }}>Email *</label><input type='email' value={email} onChange={e=>setEmail(e.target.value)} required style={{ width:'100%', marginTop:6, padding:'10px 12px', borderRadius:10, border:'1px solid #e2e8f0' }} placeholder='your@email.com' /></div>
              <div><label style={{ fontSize:11, fontWeight:800 }}>Phone *</label><input value={phone} onChange={e=>setPhone(e.target.value)} required style={{ width:'100%', marginTop:6, padding:'10px 12px', borderRadius:10, border:'1px solid #e2e8f0' }} placeholder='080...' /></div>
            </div>
            <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', padding:12, borderRadius:10, marginTop:16, fontSize:11, color:'#475569' }}><b>DDP to Premises – Valid 3 Days – Only DDP</b><br/>Quote for {product.model} sent to {product.sourceCompany}. Exact DDP to {loc} locked 3 Days. Source URL saved internally.</div>
            <button disabled={loading} type='submit' style={{ width:'100%', marginTop:16, background:'#0f172a', color:'#fff', padding:'14px', borderRadius:10, fontWeight:800, border:'none', cursor:'pointer', opacity: loading?0.6:1 }}>{loading?'Sending...':`Request DDP Quote to ${loc} • MOQ ${product.moq}`}</button>
            {!user && <div style={{ textAlign:'center', marginTop:12, fontSize:11 }}>Already have account? <a href='/login' style={{ fontWeight:800 }}>Login</a> • New? <a href='/signup' style={{ fontWeight:800 }}>Sign up</a></div>}
          </form>
        </div>
      </div>
    </div>
  )
}
