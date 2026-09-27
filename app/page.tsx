
"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// CONFIG - Replace before deploy
const AFRICANIES_WHATSAPP = "2347050477950" // Real AfricanIES WhatsApp, no +
const PLATFORM_FEE_FULL = 85000
const PLATFORM_FEE_SELF_CLEAR = 35000

type Product = { id:string, title:string, description:string, category?:string, landed_cost_ngn?:number, is_new_invention?:boolean, image_url?:string }
type Scout = { id:string, request_code:string, title:string, description:string, waitlist_count:number, target_landed_price_ngn:number, status:string }

const getIcon = (t:string)=>{
  const s=t.toLowerCase()
  if(s.includes('panel')) return '☀️'
  if(s.includes('battery')) return '🔋'
  if(s.includes('inverter')) return '⚡'
  if(s.includes('street')) return '💡'
  if(s.includes('pump')) return '🚿'
  if(s.includes('canoe')||s.includes('outboard')) return '🛥️'
  if(s.includes('drone')) return '🚁'
  return '📦'
}

export default function Home(){
  const [products,setProducts]=useState<Product[]>([])
  const [scouts,setScouts]=useState<Scout[]>([])
  const [tab,setTab]=useState<'china'|'usa'>('china')
  const [search,setSearch]=useState('')
  const [loading,setLoading]=useState(true)
  const [showQuote,setShowQuote]=useState(false)
  const [selected,setSelected]=useState<Product|null>(null)
  const [form,setForm]=useState({ name:'', phone:'', qty:'1', location:'Enugu', selfClear:false })
  const [sent,setSent]=useState(false)
  const [error,setError]=useState('')

  useEffect(()=>{
    (async()=>{
      try{
        setLoading(true)
        const { data:p, error:e } = await supabase.from('products').select('*').limit(20)
        if(e) setError(e.message)
        if(p) setProducts(p)
        const { data:s } = await supabase.from('scout_requests').select('*').in('status',['scouting','quoted','available']).limit(3)
        if(s) setScouts(s)
      }catch(err:any){ setError(err.message) } finally{ setLoading(false) }
    })()
  },[])

  const filtered = products.filter(p=>{
    const q=(p.title+p.description).toLowerCase().includes(search.toLowerCase())
    const t=tab==='china' ? p.category!=='usa' : p.category==='usa'
    return q && t
  })

  const openQuote=(p?:Product)=>{ setSelected(p||null); setShowQuote(true); setSent(false) }

  const submit=async()=>{
    if(!form.name.trim() || !form.phone.trim()){ alert('Please enter your name and WhatsApp number'); return }
    if(form.phone.replace(/\D/g,'').length < 11){ alert('Please enter valid Nigerian phone number'); return }
    const fee = form.selfClear ? PLATFORM_FEE_SELF_CLEAR : PLATFORM_FEE_FULL
    const delivery = form.selfClear ? 'SELF-CLEARING (Port Only)' : 'FULL DOOR DELIVERY'
    try{
      await supabase.from('africanies_quotes').insert([{
        product_title: selected?.title||'General Inquiry',
        customer_name: form.name.trim(), customer_phone: form.phone.trim(),
        quantity: form.qty, location: form.location.trim(),
        self_clear: form.selfClear, platform_fee_ngn: fee,
        delivery_type: delivery, status:'pending'
      }])
      await supabase.from('whatsapp_logs').insert([{ phone: form.phone.trim(), message_type:'quote_request', self_clear: form.selfClear }])
      // If scout, add to waitlist
      if(selected){
        const { data: sc } = await supabase.from('scout_requests').select('id,waitlist_count').eq('title',selected.title).maybeSingle()
        if(sc){
          await supabase.from('waitlists').insert([{ scout_request_id: sc.id, customer_name: form.name.trim(), customer_phone: form.phone.trim(), location: form.location.trim() }])
          await supabase.from('scout_requests').update({ waitlist_count: (sc.waitlist_count||0)+1 }).eq('id', sc.id)
        }
      }
    }catch(e){ console.log('DB save failed but continue to WhatsApp', e) }

    const text = `*NiChAm Trade - New Quote Valid for 3 Days Only*%0A`+
      `Product: ${encodeURIComponent(selected?.title||'General')}%0AQty: ${form.qty}%0AName: ${encodeURIComponent(form.name)}%0APhone: ${form.phone}%0ALocation: ${encodeURIComponent(form.location)}%0ADelivery: ${encodeURIComponent(delivery)}%0ASelf-Clear: ${form.selfClear?'YES - Customer handles clearing':'NO - Full service'}%0APlatform Fee internal do NOT show buyer: ₦${fee.toLocaleString()}%0ANeed final landed cost Valid for 3 Days Only`

    const waUrl = `https://wa.me/${AFRICANIES_WHATSAPP}?text=${text}`
    setSent(true)
    setTimeout(()=>{ window.open(waUrl,'_blank') }, 600)
    setTimeout(()=>{ setShowQuote(false); setSent(false); setForm({ name:'', phone:'', qty:'1', location:'Enugu', selfClear:false }) }, 3200)
  }

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#fff;color:#111;-webkit-font-smoothing:antialiased}
        .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
        .header{height:68px;border-bottom:1px solid #f0f2f0;background:rgba(255,255,255,.92);backdrop-filter:saturate(180%) blur(12px);position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between}
        .logo{font-weight:900;font-size:21px;color:#0a3d1f;letter-spacing:-0.02em} .logo span{color:#f4b400}
        .hero{background: radial-gradient(1200px 600px at 20% -10%, #1a6b3a 0%, #0a3d1f 60%), linear-gradient(135deg,#0a3d1f 0%,#0f5a2e 100%);color:#fff;padding:80px 0 64px;position:relative;overflow:hidden}
        .hero::after{content:'';position:absolute;right:-10%;top:-20%;width:60%;height:140%;background:radial-gradient(closest-side, rgba(244,180,0,.15), transparent);pointer-events:none}
        .hero-grid{display:grid;grid-template-columns:1.25fr .85fr;gap:40px;align-items:center;position:relative;z-index:1}
        .badge{background:#f4b400;color:#0a3d1f;font-weight:800;font-size:11px;letter-spacing:.04em;padding:8px 14px;border-radius:100px;display:inline-flex;gap:8px;align-items:center}
        .dot{width:8px;height:8px;background:#0a3d1f;border-radius:50%;animation:pulse 2s infinite} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        .h1{font-size:48px;line-height:.98;font-weight:900;letter-spacing:-0.03em;margin-top:18px} .sub{color:rgba(255,255,255,.82);margin-top:18px;font-size:18px;line-height:1.6;max-width:52ch}
        .btn{padding:14px 22px;border-radius:12px;font-weight:700;border:0;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .2s;font-size:14.5px;letter-spacing:-0.01em} .btn-gold{background:#f4b400;color:#0a3d1f;box-shadow:0 6px 18px rgba(244,180,0,.35)} .btn-gold:hover{transform:translateY(-1px);box-shadow:0 10px 24px rgba(244,180,0,.45)} .btn-ghost{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);color:#fff} .btn-ghost:hover{background:rgba(255,255,255,.12)}
        .card{border:1px solid #eee;border-radius:20px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.04)} .quote-card{background:#fff;color:#0a3d1f;border-radius:20px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.28);border:1px solid rgba(0,0,0,.06)}
        .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px} .pcard{border:1px solid #eceee9;border-radius:20px;padding:18px;background:#fff;transition:all .22s;cursor:pointer;position:relative;overflow:hidden} .pcard:hover{transform:translateY(-5px);box-shadow:0 16px 36px rgba(0,0,0,.08);border-color:#e0e2de}
        .pill{font-size:10.5px;font-weight:700;padding:5px 10px;border-radius:100px;background:#e6f4ea;color:#137333;text-transform:uppercase;letter-spacing:.04em} .tab{padding:9px 16px;border-radius:100px;font-weight:700;cursor:pointer;border:1px solid #e8eae6;background:#fff;font-size:13px;transition:.2s} .tab.active{background:#0a3d1f;color:#fff;border-color:#0a3d1f;box-shadow:0 4px 12px rgba(10,61,31,.25)}
        .skel{height:14px;background:linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 37%,#f0f0f0 63%);background-size:400% 100%;animation:shim 1.4s ease infinite;border-radius:8px} @keyframes shim{0%{background-position:100% 50%}100%{background-position:0 50%}}
        .modal-bg{position:fixed;inset:0;background:rgba(8,20,12,.55);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:center;justifyContent:center;padding:16px}
        .modal{background:#fff;border-radius:20px;padding:24px;max-width:480px;width:100%;max-height:90vh;overflow:auto;box-shadow:0 24px 64px rgba(0,0,0,.35);border:1px solid #eee}
        .input{width:100%;padding:12px 14px;border:1px solid #dde1db;border-radius:12px;margin-top:6px;font-size:14px;transition:.2s;background:#fbfcfa} .input:focus{outline:none;border-color:#0a3d1f;box-shadow:0 0 0 3px rgba(10,61,31,.12);background:#fff} .label{font-size:11px;font-weight:700;color:#3a3f3c;margin-top:14px;display:block;letter-spacing:.03em;text-transform:uppercase}
        .trust{display:flex;gap:14px;flex-wrap:wrap;margin-top:18px} .trust-item{font-size:11px;color:rgba(255,255,255,.7);display:flex;gap:6px;alignItems:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);padding:6px 10px;border-radius:100px}
        .scout-card{border:1px dashed #e6c84d;background:linear-gradient(180deg,#fffef0 0%,#fffbe6 100%);border-radius:16px;padding:18px}
        .how{display:grid;grid-template-columns:repeat(3,1fr);gap:18px} .how-card{background:#fff;border:1px solid #eceee9;border-radius:16px;padding:18px}
        .num{width:32px;height:32px;border-radius:100px;background:#f4b400;display:flex;align-items:center;justifyContent:center;font-weight:900;color:#0a3d1f;font-size:13px}
        @media(max-width:960px){.hero-grid{grid-template-columns:1fr}.grid3{grid-template-columns:1fr}.how{grid-template-columns:1fr}.h1{font-size:36px}}
      `}</style>

      <div className="header wrap">
        <div className="logo">NiChAm Trade<span>.</span></div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search solar, inverter..." style={{padding:'10px 14px',border:'1px solid #e8eae6',borderRadius:100,background:'#f6f7f5',fontSize:13,width:200}} />
          <button onClick={()=>openQuote()} className="btn btn-gold" style={{padding:'10px 16px',fontSize:13}}>Get Quote →</button>
        </div>
      </div>

      <div className="hero"><div className="wrap hero-grid">
        <div>
          <span className="badge"><span className="dot"></span> LIVE • CE/TUV VERIFIED • LANDED COST VALID FOR 3 DAYS</span>
          <h1 className="h1">Source Solar & EV Direct from China — One Honest Landed Price</h1>
          <p className="sub">No breakdown games. You see single competitive Naira price delivered to your location in Nigeria — valid for 3 days only. We handle sourcing, freight, customs & delivery. Platform fee included.</p>
          <div style={{display:'flex',gap:12,marginTop:24,flexWrap:'wrap'}}>
            <button onClick={()=>openQuote()} className="btn btn-gold">Request Landed Price in 30s →</button>
            <button onClick={()=>document.getElementById('how')?.scrollIntoView({behavior:'smooth'})} className="btn btn-ghost">See How It Works</button>
          </div>
          <div className="trust">
            <span className="trust-item">✓ CAC Registered • GSPI Associates Ltd</span>
            <span className="trust-item">✓ Platform Fee Included — No Hidden Charges</span>
            <span className="trust-item">✓ Valid for 3 Days Only — Exchange-Proof</span>
          </div>
        </div>
        <div className="quote-card">
          <div style={{fontWeight:800,fontSize:11,letterSpacing:.06em,color:'#5a6b60'}}>SAMPLE QUOTE • VALID FOR 3 DAYS ONLY</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}><div style={{display:'flex',gap:10,alignItems:'center'}}><div style={{width:44,height:44,borderRadius:12,background:'#f6f7f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>☀️</div><div><div style={{fontWeight:800,fontSize:14}}>550W Mono Solar Panel</div><div style={{fontSize:11,color:'#6b7a70'}}>Tier 1 • 25yr Warranty</div></div></div></div>
          <div style={{marginTop:16,padding:'14px 14px',background:'#f8faf7',borderRadius:12,border:'1px dashed #dde1db'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#6b7a70'}}><span>Quantity</span><span>10 pcs</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontWeight:900,fontSize:18,marginTop:10,color:'#0a3d1f'}}><span>Landed to Enugu</span><span>₦2,050,000</span></div>
            <div style={{marginTop:10}}><span style={{fontSize:11,fontWeight:700,background:'#e6f4ea',color:'#137333',padding:'5px 10px',borderRadius:20}}>✓ VALID FOR 3 DAYS ONLY • All Inclusive</span></div>
          </div>
          <div style={{marginTop:12,fontSize:11,color:'#6b7a70',lineHeight:1.5}}>All charges included — shipping, customs, delivery. Price expires in 3 days due to FX. No FOB breakdown — competitive price guaranteed by AI check.</div>
          <button onClick={()=>openQuote()} className="btn btn-gold" style={{width:'100%',marginTop:14,justifyContent:'center'}}>Get Your Own Landed Price →</button>
          <div style={{marginTop:10,fontSize:10,color:'#8a9a90',textAlign:'center'}}>Trusted by installers in Enugu • Lagos • Abuja • Kano</div>
        </div>
      </div></div>

      <div className="wrap" style={{padding:'28px 24px 12px'}}>
        <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
          <div className={`tab ${tab==='china'?'active':''}`} onClick={()=>setTab('china')}>Shop China 🇨🇳 • Solar & EV</div>
          <div className={`tab ${tab==='usa'?'active':''}`} onClick={()=>setTab('usa')}>Shop USA 🇺🇸 • Coming Soon</div>
          <span style={{fontSize:12,color:'#8a9a90',marginLeft:6}}>{loading ? 'Loading...' : `${filtered.length} verified products`}</span>
        </div>
        {error && <div style={{marginTop:12,padding:10,background:'#ffeaea',borderRadius:10,fontSize:12,color:'#a00'}}>Error: {error}</div>}
      </div>

      <div className="wrap" style={{padding:'8px 24px 36px'}}>
        {loading ? <div className="grid3">{[1,2,3,4,5,6].map(i=><div key={i} className="card" style={{padding:18}}><div className="skel" style={{width:'60%',height:18}}/><div className="skel" style={{width:'90%',marginTop:10}}/><div className="skel" style={{width:'40%',marginTop:18,height:24}}/></div>)}</div> :
        filtered.length===0 ? <div style={{textAlign:'center',padding:40,border:'1px dashed #e0e0e0',borderRadius:16,background:'#fbfcfa'}}><div style={{fontSize:28}}>🔍</div><h3 style={{marginTop:8}}>No products found</h3><p style={{fontSize:13,color:'#666',marginTop:4}}>Try search "panel" or switch tab</p></div> :
        <div className="grid3">
          {filtered.map(p=>(
            <div key={p.id} className="pcard" onClick={()=>openQuote(p)}>
              {p.is_new_invention && <div style={{position:'absolute',top:10,right:10,background:'#0a3d1f',color:'#f4b400',fontSize:10,fontWeight:900,padding:'5px 8px',borderRadius:100,letterSpacing:.04em}}>🔥 NEW INVENTION</div>}
              {p.image_url ? <img src={p.image_url} alt={p.title} style={{width:'100%',height:140,objectFit:'cover',borderRadius:12,background:'#f6f7f5'}} loading="lazy" /> : <div style={{width:'100%',height:140,borderRadius:12,background:'linear-gradient(135deg,#f6f7f5 0%,#eef1ed 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36}}>{getIcon(p.title)}</div>}
              <span className="pill" style={{marginTop:12,display:'inline-block'}}>{(p.category||'solar').replace(/_/g,' ')}</span>
              <h3 style={{fontWeight:800,marginTop:10,fontSize:15.5,lineHeight:1.25,letterSpacing:-0.01em}}>{p.title}</h3>
              <p style={{fontSize:12.5,color:'#6b7a70',marginTop:6,lineHeight:1.5}}>{p.description.slice(0,88)}...</p>
              <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                {p.landed_cost_ngn ? <><div><div style={{fontSize:11,color:'#6b7a70'}}>Landed • Valid 3 Days</div><div style={{fontWeight:900,fontSize:16,color:'#0a3d1f'}}>₦{Number(p.landed_cost_ngn).toLocaleString()}</div></div><div style={{fontSize:11,fontWeight:700,background:'#e6f4ea',color:'#137333',padding:'5px 9px',borderRadius:20}}>✓ In Stock</div></> : <><div style={{fontWeight:700,fontSize:13,color:'#0a3d1f'}}>Get Landed Price →</div><div style={{fontSize:10,color:'#8a9a90'}}>30s quote</div></>}
              </div>
            </div>
          ))}
        </div>}
      </div>

      {scouts.length>0 && (
        <div style={{background:'linear-gradient(180deg,#fffef3 0%,#fffbe6 100%)',borderTop:'1px solid #f4e5a0',borderBottom:'1px solid #f4e5a0',padding:'36px 0'}}>
          <div className="wrap">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:12}}>
              <div><h2 style={{fontWeight:900,color:'#0a3d1f',fontSize:22,letterSpacing:-0.02em}}>🔍 Scouting Board — New Inventions for Nigeria</h2><p style={{fontSize:13,color:'#6b5a1f',marginTop:6,maxWidth:60+'ch'}}>Admin scouts China for Nigerian problems. Public sees how many are waiting (social proof). You join waitlist — admin sees your phone and gives you first priority + discount when available.</p></div>
              <span style={{fontSize:11,fontWeight:700,background:'#0a3d1f',color:'#f4b400',padding:'7px 12px',borderRadius:100}}>FOREFRONT INNOVATION</span>
            </div>
            <div className="grid3" style={{marginTop:18}}>
              {scouts.map(s=>(
                <div key={s.id} className="scout-card">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:10,fontWeight:800,color:'#8a7a40',letterSpacing:.05em}}>{s.request_code} • {s.status.toUpperCase()}</span><span style={{fontSize:11}}>👥 {s.waitlist_count} waiting</span></div>
                  <div style={{fontSize:26,marginTop:10}}>{getIcon(s.title)}</div>
                  <h4 style={{fontWeight:800,marginTop:8,fontSize:14.5,lineHeight:1.3}}>{s.title}</h4>
                  <p style={{fontSize:12,color:'#6b5e2f',marginTop:6,lineHeight:1.5}}>{s.description.slice(0,92)}...</p>
                  <div style={{marginTop:12,display:'flex',gap:8}}><div style={{flex:1,background:'#fff',border:'1px solid #f0e5a8',borderRadius:10,padding:'8px 10px'}}><div style={{fontSize:10,color:'#8a7a40'}}>Target Landed</div><div style={{fontWeight:900,fontSize:13}}>₦{Number(s.target_landed_price_ngn||0).toLocaleString()}</div></div><div style={{flex:1,background:'#0a3d1f',color:'#fff',borderRadius:10,padding:'8px 10px',textAlign:'center'}}><div style={{fontSize:10,color:'rgba(255,255,255,.7)'}}>Valid</div><div style={{fontWeight:800,fontSize:12}}>3 Days Only</div></div></div>
                  <button onClick={()=>openQuote({id:s.id,title:s.title,description:s.description} as Product)} className="btn btn-gold" style={{width:'100%',marginTop:12,justifyContent:'center'}}>Join Waitlist — First Priority →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="how" style={{background:'#f8faf7',borderTop:'1px solid #eceee9',padding:'44px 0'}}><div className="wrap">
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',color:'#0a3d1f',letterSpacing:-0.02em}}>How It Works — 3 Simple Steps</h2>
        <div className="how" style={{marginTop:20}}>
          <div className="how-card"><div className="num">1</div><div style={{fontWeight:700,marginTop:12,fontSize:14}}>Browse Verified Products</div><div style={{fontSize:12.5,color:'#5a6b60',marginTop:6,lineHeight:1.6}}>Shop China or USA, search, click card. You see ONLY single landed price valid for 3 days — no FOB games. CE/TUV verified by GSPI Associates Ltd.</div><div style={{marginTop:10,fontSize:11,color:'#8a9a90'}}>✓ No breakdown • ✓ Competitive AI check</div></div>
          <div className="how-card"><div className="num">2</div><div style={{fontWeight:700,marginTop:12,fontSize:14}}>Get Landed Price in 30s</div><div style={{fontSize:12.5,color:'#5a6b60',marginTop:6,lineHeight:1.6}}>Fill name, WhatsApp, qty, location. Tick self-clear if you will clear at Lagos port yourself (lower fee ₦35k vs ₦85k full door). Auto-opens WhatsApp to AfricanIES.</div><div style={{marginTop:10,fontSize:11,color:'#8a9a90'}}>✓ Auto WhatsApp • ✓ Admin sees all requests</div></div>
          <div className="how-card"><div className="num">3</div><div style={{fontWeight:700,marginTop:12,fontSize:14}}>We Deliver — You Save</div><div style={{fontSize:12.5,color:'#5a6b60',marginTop:6,lineHeight:1.6}}>AfricanIES replies within 2hrs with final landed cost valid for 3 days only. You pay via MTN MoMo. Full door to Enugu or port docs if self-clearing.</div><div style={{marginTop:10,fontSize:11,color:'#8a9a90'}}>✓ 2hr reply SLA • ✓ MTN MoMo • ✓ Door or Port</div></div>
        </div>
        <div style={{marginTop:24,background:'#fff',border:'1px solid #eceee9',borderRadius:14,padding:16,display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
          <div style={{fontSize:20}}>🛡️</div><div style={{fontSize:12.5,color:'#3a4a44',lineHeight:1.5}}><strong>Why single landed cost?</strong> Breakdown triggers negotiation of platform fee. We show only final competitive price valid for 3 days. Platform fee (service, verification, guarantee) included but hidden. Admin and AfricanIES know fee internally — buyer sees only honest final price.</div>
        </div>
      </div></div>

      <footer style={{background:'#0a3d1f',color:'rgba(255,255,255,.72)',padding:'28px 0'}}>
        <div className="wrap" style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr',gap:20}}>
          <div><div style={{fontWeight:900,color:'#fff',fontSize:14}}>NiChAm Trade<span style={{color:'#f4b400'}}>.</span></div><div style={{fontSize:12,marginTop:8,lineHeight:1.6,maxWidth:36+'ch'}}>Direct sourcing from China factories to Nigeria. GSPI Associates Ltd — trusted sourcing partner since 2018. CAC registered. Enugu, Nigeria.</div><div style={{marginTop:12,fontSize:11}}>© 2026 NiChAm Trade • GSPI Associates Ltd • AfricanIES • Landed Cost Valid for 3 Days Only</div></div>
          <div><div style={{fontWeight:700,color:'#fff',fontSize:12}}>Support</div><div style={{fontSize:12,marginTop:8,lineHeight:1.9}}>WhatsApp Quote: 30s<br/>Reply SLA: 2 hours<br/>Delivery: Lagos → Enugu • Abuja • Kano<br/>Payment: MTN MoMo • Bank Transfer</div></div>
          <div><div style={{fontWeight:700,color:'#fff',fontSize:12}}>Trust</div><div style={{fontSize:12,marginTop:8,lineHeight:1.9}}>✓ CE / TUV Verified<br/>✓ Platform Fee Included<br/>✓ No Hidden Charges<br/>✓ Valid for 3 Days Only</div></div>
        </div>
      </footer>

      {showQuote && (
        <div className="modal-bg" onClick={()=>setShowQuote(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
          {!sent ? <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}><div><h3 style={{fontWeight:900,fontSize:18,color:'#0a3d1f',letterSpacing:-0.02em}}>Get Landed Price</h3><p style={{fontSize:12.5,color:'#5a6b60',marginTop:4}}>Single competitive price valid for 3 days only. All inclusive — we handle everything.</p></div><div style={{fontSize:11,background:'#e6f4ea',color:'#137333',padding:'5px 9px',borderRadius:20,fontWeight:700}}>30s • Valid 3 Days</div></div>
            {selected && <div style={{marginTop:12,display:'flex',gap:10,alignItems:'center',background:'#f8faf7',border:'1px solid #eceee9',borderRadius:12,padding:10}}><div style={{fontSize:20}}>{getIcon(selected.title)}</div><div><div style={{fontWeight:700,fontSize:13}}>{selected.title}</div><div style={{fontSize:11,color:'#6b7a70'}}>Landed cost • Valid 3 Days Only</div></div></div>}
            <label className="label">Your Name *</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Chinedu Okoro" />
            <label className="label">WhatsApp Number *</label><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="0803 123 4567" />
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><div><label className="label">Quantity</label><input className="input" value={form.qty} onChange={e=>setForm({...form,qty:e.target.value})} placeholder="10" /></div><div><label className="label">Delivery Location</label><input className="input" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Enugu" /></div></div>
            <label style={{display:'flex',gap:10,alignItems:'flex-start',marginTop:14,fontSize:12.5,background:'#f8faf7',padding:'12px',borderRadius:12,border:'1px solid #eceee9',cursor:'pointer'}}><input type="checkbox" checked={form.selfClear} onChange={e=>setForm({...form,selfClear:e.target.checked})} style={{marginTop:2}} /><span><strong>Self-clearing at Lagos port</strong> — I will handle clearing & transport myself. Lower platform fee (<span style={{fontWeight:800}}>₦35k vs ₦85k</span> full door delivery). You get port documents (BL, invoice, packing list).</span></label>
            <div style={{marginTop:12,fontSize:11,color:'#5a6b60',background:'#fffbe6',padding:'10px 12px',borderRadius:10,border:'1px dashed #e6c84d',lineHeight:1.5}}>🔒 <strong>All inclusive, no surprises:</strong> Your final price includes shipping, customs, platform service fee and door delivery. Valid for 3 days only due to FX. No breakdown shown — competitive price guaranteed.</div>
            <button onClick={submit} className="btn btn-gold" style={{width:'100%',marginTop:14,justifyContent:'center',padding:'14px',fontSize:15}}>Get My Landed Price — Valid 3 Days →</button>
            <p style={{fontSize:10.5,color:'#8a9a90',textAlign:'center',marginTop:10}}>Clicking opens WhatsApp to AfricanIES • Admin is in the know • Reply within 2hrs</p>
          </> : <div style={{textAlign:'center',padding:'16px 0'}}><div style={{width:56,height:56,background:'#e6f4ea',borderRadius:100,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto',fontSize:28}}>✅</div><h3 style={{fontWeight:900,marginTop:12,fontSize:18,color:'#0a3d1f'}}>Opening WhatsApp to AfricanIES...</h3><p style={{fontSize:13,color:'#5a6b60',marginTop:8,lineHeight:1.5}}>Thanks {form.name}! Your request for <strong>{selected?.title||'General'}</strong> is opening. AfricanIES will reply within 2hrs with final landed cost valid for 3 days only.</p><div style={{marginTop:14,fontSize:11,color:'#8a9a90',background:'#f8faf7',padding:10,borderRadius:10}}>Admin is in the know — your request is saved securely. You will also receive confirmation via WhatsApp.</div></div>}
        </div></div>
      )}
    </>
  )
}

