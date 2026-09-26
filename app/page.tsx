"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Product = { id: string, title: string, description: string, category?: string }

const getIcon = (t:string,c?:string)=>{
  const s=(t+' '+(c||'')).toLowerCase()
  if(s.includes('panel')) return '☀️'
  if(s.includes('battery')) return '🔋'
  if(s.includes('inverter')) return '⚡'
  if(s.includes('street')) return '💡'
  if(s.includes('pump')) return '🚿'
  return '📦'
}

// CONFIG: Change this to your AfricanIES WhatsApp number
const AFRICANIES_WHATSAPP = "2347050477950" // Replace with real number, no + sign
const GSPI_WHATSAPP = "2347050477950" // Your own backup

export default function Home(){
  const [products,setProducts]=useState<Product[]>([])
  const [loading,setLoading]=useState(true)
  const [showQuote,setShowQuote]=useState(false)
  const [selectedProduct,setSelectedProduct]=useState<Product|null>(null)
  const [quoteForm,setQuoteForm]=useState({name:'',phone:'',quantity:'1',location:'Enugu'})
  const [quoteSent,setQuoteSent]=useState(false)

  useEffect(()=>{
    (async()=>{
      const {data}=await supabase.from('products').select('*').limit(20)
      if(data) setProducts(data)
      setLoading(false)
    })()
  },[])

  const openQuote=(p?:Product)=>{setSelectedProduct(p||null);setShowQuote(true);setQuoteSent(false)}
  
  const submitQuote=async()=>{
    if(!quoteForm.name||!quoteForm.phone){alert('Enter name and phone');return}
    
    // 1. Save to Supabase (your 13 tables)
    try{
      await supabase.from('africanies_quotes').insert([{
        product_title: selectedProduct?.title || 'General Inquiry',
        customer_name: quoteForm.name,
        customer_phone: quoteForm.phone,
        quantity: quoteForm.quantity,
        location: quoteForm.location,
        status: 'pending_whatsapp'
      }])
    }catch(e){console.log('Save failed but continue',e)}

    // 2. Build WhatsApp message for AfricanIES
    const productText = selectedProduct ? `${selectedProduct.title}` : 'General Solar Products'
    const msg = `*New NiChAm Trade Quote Request*%0A%0A`+
                `*Product:* ${productText}%0A`+
                `*Qty:* ${quoteForm.quantity}%0A`+
                `*Customer:* ${quoteForm.name}%0A`+
                `*Phone:* ${quoteForm.phone}%0A`+
                `*Location:* ${quoteForm.location}%0A%0A`+
                `_From nicham-trade.vercel.app - 5 products live_%0A%0A`+
                `*Action needed:* Send Dual Quote (FOB + 72hr Naira)`

    // 3. PLACEHOLDER FOR FUTURE API - when ready, replace this block
    // TODO: Africanies 72hr API integration
    // const apiResponse = await fetch('/api/africanies-quote', {method:'POST', body: JSON.stringify({...})})
    // For now, we use WhatsApp
    
    setQuoteSent(true)
    
    // 4. Open WhatsApp to AfricanIES (after 1.5 sec so user sees success)
    setTimeout(()=>{
      const waUrl = `https://wa.me/${AFRICANIES_WHATSAPP}?text=${msg}`
      window.open(waUrl,'_blank')
    },1500)
  }

  return(
    <>
      <style>{`*{margin:0;padding:0;box-sizing:border-box} body{font-family:system-ui,sans-serif;background:#fff;color:#111} .wrap{max-width:1160px;margin:0 auto;padding:0 24px} .hero{background:linear-gradient(135deg,#0a3d1f 0%,#0f5a2e 100%);color:white;padding:72px 0} .hero-grid{display:grid;grid-template-columns:1.2fr 0.8fr;gap:40px;align-items:center} .badge{background:#f4b400;color:#0a3d1f;font-weight:800;font-size:11px;padding:8px 14px;border-radius:100px} .h1{font-size:48px;line-height:1.05;font-weight:900;margin-top:18px} .sub{color:rgba(255,255,255,0.8);margin-top:18px;font-size:18px} .btn{padding:14px 24px;border-radius:12px;font-weight:700;border:0;cursor:pointer} .btn-gold{background:#f4b400;color:#0a3d1f} .btn-ghost{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.25);color:white} .quote-card{background:white;color:#0a3d1f;border-radius:20px;padding:28px} .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px} .pcard{border:1px solid #eee;border-radius:20px;padding:24px;background:white;cursor:pointer} .pcard:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,0.1)} .pill{display:inline-block;background:#e6f4ea;color:#137333;font-size:11px;font-weight:700;padding:6px 12px;border-radius:100px} .icon{font-size:32px;margin-bottom:14px} .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:100;display:flex;align-items:center;justifyContent:center;padding:20px} .modal{background:white;border-radius:20px;padding:28px;max-width:480px;width:100%} .input{width:100%;padding:12px 14px;border:1px solid #ddd;border-radius:10px;margin-top:6px} .label{font-size:12px;font-weight:700;color:#333;margin-top:14px;display:block} @media(max-width:900px){.hero-grid{grid-template-columns:1fr}.grid3{grid-template-columns:1fr}.h1{font-size:34px}}`}</style>
      
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:68,borderBottom:'1px solid #f0f0f0',background:'white',position:'sticky',top:0,zIndex:50}} className="wrap">
        <div style={{fontWeight:900,fontSize:22,color:'#0a3d1f'}}>NiChAm Trade <span style={{color:'#f4b400'}}>.</span></div>
        <button onClick={()=>openQuote()} className="btn btn-gold" style={{padding:'10px 18px',fontSize:13}}>Get Quote →</button>
      </div>

      <div className="hero"><div className="wrap hero-grid"><div>
        <span className="badge">DUAL-QUOTE LIVE • {products.length} PRODUCTS • WHATSAPP CONNECTED</span>
        <h1 className="h1">Source Solar & EV Direct from China - With Honest Naira Landed Cost</h1>
        <p className="sub">Ex-China FOB + AfricanIES 72hr Naira Quote + Tax. CE/TUV Verified. WhatsApp response in 2 hours.</p>
        <div style={{display:'flex',gap:12,marginTop:28}}><button onClick={()=>openQuote()} className="btn btn-gold">Request Quote in 30s →</button><button onClick={()=>document.getElementById('how')?.scrollIntoView({behavior:'smooth'})} className="btn btn-ghost">How It Works</button></div>
      </div><div className="quote-card">
        <div style={{fontWeight:800,fontSize:12,marginBottom:18}}>SAMPLE DUAL QUOTE • LIVE VIA WHATSAPP</div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px dashed #e5e5e5',fontSize:14}}><span>Ex-China (Factory)</span><strong>$1,200 FOB</strong></div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px dashed #e5e5e5',fontSize:14}}><span>AfricanIES (72hr NGN)</span><strong>₦1,850,000</strong></div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'16px 0',fontWeight:900,fontSize:16}}><span>Landed Lagos</span><span>₦2,050,000 inc. Tax</span></div>
        <div style={{marginTop:12,fontSize:11,background:'#f0faf0',padding:10,borderRadius:8,color:'#0a3d1f'}}>💬 Via WhatsApp now, API later (placeholder ready)</div>
        <button onClick={()=>openQuote()} style={{width:'100%',marginTop:12}} className="btn btn-gold">Get Your Own Quote →</button>
      </div></div></div>

      <div className="wrap" style={{padding:'56px 24px'}}>
        <h2 style={{fontSize:28,fontWeight:900,color:'#0a3d1f'}}>Products - Direct from Factory</h2>
        <p style={{color:'#666',marginTop:8}}>{products.length} products • Click to quote via WhatsApp</p>
        <div className="grid3" style={{marginTop:32}}>
          {products.map(p=>(<div key={p.id} className="pcard" onClick={()=>openQuote(p)}><div className="icon">{getIcon(p.title,p.category)}</div><span className="pill">{(p.category||'solar').replace(/_/g,' ')}</span><h3 style={{fontWeight:800,marginTop:14}}>{p.title}</h3><p style={{fontSize:13,color:'#666',marginTop:8}}>{p.description}</p><div style={{marginTop:12,fontSize:12,fontWeight:700,color:'#0a3d1f'}}>💬 Quote via WhatsApp →</div></div>))}
        </div>
      </div>

      <footer style={{background:'#0a3d1f',color:'rgba(255,255,255,0.7)',padding:'24px 0'}}><div className="wrap" style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span>© 2026 NiChAm Trade • GSPI Associates Ltd • AfricanIES</span><span>WhatsApp Connected • API Placeholder Ready</span></div></footer>

      {showQuote&&(<div className="modal-bg" onClick={()=>setShowQuote(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
        {!quoteSent?(<><h3 style={{fontWeight:900,fontSize:20,color:'#0a3d1f'}}>Get Dual Quote via WhatsApp</h3><p style={{fontSize:13,color:'#666',marginTop:6}}>We will send FOB + 72hr Naira quote to your WhatsApp in 2 hours. AfricanIES API coming soon.</p>
        <label className="label">YOUR NAME *</label><input className="input" value={quoteForm.name} onChange={e=>setQuoteForm({...quoteForm,name:e.target.value})} placeholder="Godwin"/>
        <label className="label">PHONE (WhatsApp) *</label><input className="input" value={quoteForm.phone} onChange={e=>setQuoteForm({...quoteForm,phone:e.target.value})} placeholder="0803..."/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}><div><label className="label">QTY</label><input className="input" value={quoteForm.quantity} onChange={e=>setQuoteForm({...quoteForm,quantity:e.target.value})}/></div><div><label className="label">LOCATION</label><input className="input" value={quoteForm.location} onChange={e=>setQuoteForm({...quoteForm,location:e.target.value})}/></div></div>
        <button onClick={submitQuote} className="btn btn-gold" style={{width:'100%',marginTop:18,padding:'16px'}}>Send to AfricanIES WhatsApp →</button>
        <div style={{fontSize:10,color:'#999',marginTop:8,textAlign:'center'}}>Placeholder: /api/africanies-quote will replace WhatsApp later</div>
        </>):(<div style={{textAlign:'center',padding:'20px 0'}}><div style={{fontSize:48}}>✅</div><h3 style={{fontWeight:900,marginTop:12}}>Opening WhatsApp...</h3><p style={{fontSize:13,color:'#666',marginTop:8}}>Your request for {selectedProduct?.title||'products'} is saved. You will be redirected to AfricanIES WhatsApp with pre-filled details.</p><div style={{marginTop:12,fontSize:11,background:'#e6f4ea',padding:8,borderRadius:8}}>If WhatsApp didn't open, click: <a href={`https://wa.me/${AFRICANIES_WHATSAPP}`} target="_blank">Open WhatsApp</a></div></div>)}
      </div></div>)}
    </>
  )
}
