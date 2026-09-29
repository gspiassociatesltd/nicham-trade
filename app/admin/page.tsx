'use client'
import { useState, useEffect } from 'react'

export default function AdminPage(){
  const [loggedIn, setLoggedIn] = useState(false)
  const [pwd, setPwd] = useState('')
  const [tab, setTab] = useState<'quotes'|'scout'|'products'>('scout')
  const [scouts, setScouts] = useState<any[]>([])
  const [quotes, setQuotes] = useState<any[]>([])
  const [keyword, setKeyword] = useState('3kva hybrid inverter')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    if(loggedIn){
      loadScouts()
      loadQuotes()
    }
  },[loggedIn])

  async function loadScouts(){
    try{
      const r = await fetch('/api/scout1688/list')
      const j = await r.json()
      if(j.data) setScouts(j.data)
    }catch{}
  }
  async function loadQuotes(){
    try{
      const r = await fetch('/api/quotes/list')
      const j = await r.json()
      if(j.data) setQuotes(j.data)
    }catch{}
  }

  async function handleScout(){
    setLoading(true)
    setMsg('Scouting 1688 for: '+keyword)
    try{
      const r = await fetch('/api/scout1688', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ keyword, weightKg: 15 })
      })
      const j = await r.json()
      setMsg('✅ Scout done: '+ (j.sr_id||j.message||'Created draft - check Scouting tab'))
      loadScouts()
    }catch(e:any){
      setMsg('❌ Error: '+e.message)
    }
    setLoading(false)
  }

  if(!loggedIn){
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8fafc', fontFamily:'Inter, sans-serif' }}>
        <div style={{ background:'#fff', padding:24, borderRadius:16, border:'1px solid #e2e8f0', width:320 }}>
          <h2 style={{ fontWeight:900, margin:'0 0 12px' }}>NiChAm Admin - GSPI 10% Fee</h2>
          <input type="password" placeholder="Password GSPI2026" value={pwd} onChange={e=>setPwd(e.target.value)} style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid #e2e8f0' }} />
          <button onClick={()=>{ if(pwd==='GSPI2026') setLoggedIn(true); else alert('Wrong - GSPI2026') }} style={{ width:'100%', marginTop:10, padding:'10px', background:'#0f172a', color:'#fff', borderRadius:8, border:0, fontWeight:800, cursor:'pointer' }}>Login</button>
          <div style={{ fontSize:11, color:'#64748b', marginTop:10 }}>Master Doc v2.2 - AI Price Check vs Jumia/Kara before forward. Tiered 10%/8%/12%</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily:'Inter, sans-serif', background:'#f8fafc', minHeight:'100vh' }}>
      <header style={{ padding:'12px 20px', background:'#fff', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontWeight:900 }}>NiChAm Admin • 10% Fee • AI Compare</div>
        <div style={{ display:'flex', gap:8 }}>
          <a href="/" style={{ fontSize:12, padding:'6px 12px', border:'1px solid #e2e8f0', borderRadius:100, textDecoration:'none', color:'#0f172a' }}>Home World-Class</a>
          <button onClick={()=>setLoggedIn(false)} style={{ fontSize:12, padding:'6px 12px', borderRadius:100, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer' }}>Logout</button>
        </div>
      </header>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:20 }}>
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          <button onClick={()=>setTab('scout')} style={{ padding:'8px 16px', borderRadius:100, border:'1px solid #e2e8f0', background: tab==='scout'?'#0f172a':'#fff', color: tab==='scout'?'#fff':'#0f172a', fontWeight:700, cursor:'pointer' }}>Import 1688 🤖 ({scouts.length})</button>
          <button onClick={()=>setTab('quotes')} style={{ padding:'8px 16px', borderRadius:100, border:'1px solid #e2e8f0', background: tab==='quotes'?'#0f172a':'#fff', color: tab==='quotes'?'#fff':'#0f172a', fontWeight:700, cursor:'pointer' }}>Quotes AI Compare ({quotes.length})</button>
          <button onClick={()=>setTab('products')} style={{ padding:'8px 16px', borderRadius:100, border:'1px solid #e2e8f0', background: tab==='products'?'#0f172a':'#fff', color: tab==='products'?'#fff':'#0f172a', fontWeight:700, cursor:'pointer' }}>Products Live</button>
        </div>

        {tab==='scout' && (
          <div>
            <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:16, marginBottom:16 }}>
              <h3 style={{ margin:'0 0 8px', fontWeight:800 }}>🤖 Scout 1688 - List Companies Products for Now</h3>
              <p style={{ fontSize:12, color:'#64748b', margin:'0 0 12px' }}>Enter keyword → Scrapes m-search.1688.com (no API key) → Creates draft SR-xxx with real factory image (white bg) → You approve → Shows homepage world-class</p>
              <div style={{ display:'flex', gap:8 }}>
                <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="e.g. 3kva hybrid inverter, 200ah lithium battery" style={{ flex:1, padding:'10px 12px', borderRadius:8, border:'1px solid #e2e8f0' }} />
                <button onClick={handleScout} disabled={loading} style={{ padding:'10px 18px', background:'#0f172a', color:'#fff', borderRadius:8, border:0, fontWeight:800, cursor:'pointer' }}>{loading?'Scouting...':'Scout 1688 Live'}</button>
              </div>
              {msg && <div style={{ marginTop:10, fontSize:12, background:'#f0fdf4', border:'1px solid #bbf7d0', padding:'8px 12px', borderRadius:8 }}>{msg}</div>}
              <div style={{ marginTop:12, display:'flex', gap:8, flexWrap:'wrap' }}>
                {['3kva hybrid inverter','200ah lithium battery 48v','550w solar panel bifacial','solar water pump 2hp','canoe solar outboard'].map(k=>(
                  <button key={k} onClick={()=>setKeyword(k)} style={{ fontSize:11, padding:'6px 10px', borderRadius:100, border:'1px solid #e2e8f0', background:'#f8fafc', cursor:'pointer' }}>{k}</button>
                ))}
              </div>
            </div>

            <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:16 }}>
              <h4 style={{ margin:'0 0 12px' }}>Scouting Drafts Awaiting Approval - {scouts.length}</h4>
              {scouts.length===0 ? <div style={{ fontSize:12, color:'#94a3b8' }}>No drafts yet - Scout above or check Supabase scout_requests table</div> : scouts.map((s:any)=>(
                <div key={s.id} style={{ border:'1px solid #e2e8f0', borderRadius:12, padding:12, marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontWeight:800, fontSize:13 }}>{s.id} - {s.keyword || s.product_name}</div>
                    <div style={{ fontSize:11, color:'#64748b' }}>{s.status} • {s.supplier_name || '1688 Supplier'} • FOB ¥{s.fob_price_yuan || s.price_cny}</div>
                  </div>
                  <button onClick={async()=>{
                    const r = await fetch('/api/scout1688/approve', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: s.id }) })
                    const j = await r.json()
                    setMsg('Approved: '+(j.message||'Product now live homepage!'))
                    loadScouts()
                  }} style={{ padding:'8px 14px', background:'#16a34a', color:'#fff', borderRadius:100, border:0, fontWeight:700, cursor:'pointer', fontSize:12 }}>Approve → Live</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='quotes' && (
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:16 }}>
            <h3 style={{ margin:'0 0 12px' }}>Quotes - AI Price Compare vs Jumia/Kara per Master Doc 13F</h3>
            {quotes.length===0 ? <div style={{ fontSize:12, color:'#94a3b8' }}>No quotes yet - Get Quote from homepage</div> : quotes.map((q:any)=>(
              <div key={q.id} style={{ border:'1px solid #e2e8f0', borderRadius:12, padding:12, marginBottom:8 }}>
                <div style={{ fontWeight:700, fontSize:13 }}>{q.product_title || q.product_id} - ₦{Number(q.landed_price||0).toLocaleString()} • {q.customer_name}</div>
                <div style={{ display:'flex', gap:8, marginTop:8 }}>
                  <button onClick={async()=>{
                    const r = await fetch(`/api/compare-price?title=${encodeURIComponent(q.product_title||'')}&base=${q.landed_price||0}`)
                    const j = await r.json()
                    setMsg(`AI Compare: Market ₦${j.market_low?.toLocaleString()} vs Your ₦${Number(q.landed_price).toLocaleString()} - ${j.verdict} (${j.overpricing_pct}% over) - ${j.flag_15pct?'⚠️ FLAG 15%':'✅ Competitive'}`)
                  }} style={{ padding:'6px 12px', background:'#0f172a', color:'#fff', borderRadius:100, border:0, fontSize:11, cursor:'pointer' }}>🤖 AI Compare Price</button>
                  <a href={`https://wa.me/234${String(q.customer_phone||'').replace(/\D/g,'').slice(-10)}?text=${encodeURIComponent(`Quote ${q.id}: ${q.product_title} Landed ₦${q.landed_price} Valid 3 Days - GSPI`)}`} target="_blank" style={{ padding:'6px 12px', background:'#16a34a', color:'#fff', borderRadius:100, textDecoration:'none', fontSize:11 }}>WhatsApp Forward</a>
                </div>
              </div>
            ))}
            {msg && <div style={{ marginTop:12, fontSize:12, background:'#fffbeb', border:'1px solid #fde68a', padding:'10px', borderRadius:8 }}>{msg}</div>}
          </div>
        )}

        {tab==='products' && (
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:16 }}>
            <h3 style={{ margin:'0 0 12px' }}>Live Products - Homepage World-Class</h3>
            <div style={{ fontSize:11, color:'#64748b' }}>Products come from Supabase products table or fallback 1688 demo. Approve scouts to make real 1688 images live.</div>
            <a href="/" style={{ display:'inline-block', marginTop:10, padding:'8px 16px', background:'#0f172a', color:'#fff', borderRadius:100, textDecoration:'none', fontSize:12 }}>View World-Class Homepage →</a>
          </div>
        )}
      </div>
    </div>
  )
}
