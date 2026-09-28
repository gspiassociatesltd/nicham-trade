'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Admin(){
  const [auth, setAuth] = useState(false)
  const [pwd, setPwd] = useState('')
  const [tab, setTab] = useState<'quotes'|'waitlists'|'scouting'>('quotes')
  const [quotes, setQuotes] = useState<any[]>([])
  const [waitlists, setWaitlists] = useState<any[]>([])
  const [scouts, setScouts] = useState<any[]>([])

  function login(){
    if(pwd==='GSPI2026'){ setAuth(true); load() } else alert('Wrong password')
  }
  async function load(){
    const { data: q } = await supabase.from('africanies_quotes').select('*').order('created_at',{ascending:false}).limit(50)
    if(q) setQuotes(q)
    const { data: w } = await supabase.from('waitlists').select('*').order('created_at',{ascending:false}).limit(50)
    if(w) setWaitlists(w)
    const { data: s } = await supabase.from('scout_requests').select('*').order('created_at',{ascending:false})
    if(s) setScouts(s)
  }

  if(!auth){
    return (
      <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f9fafb'}}>
        <div style={{background:'#fff', padding:28, borderRadius:20, border:'1px solid #eee', width:340}}>
          <div style={{fontWeight:900, fontSize:18}}>NiChAm Admin</div>
          <div style={{fontSize:12, color:'#666', marginTop:4}}>Enter password from PRD</div>
          <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Password" style={{marginTop:14, width:'100%', padding:'12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          <button onClick={login} style={{marginTop:12, width:'100%', background:'#111', color:'#fff', padding:'12px', borderRadius:12, fontWeight:700, border:0, cursor:'pointer'}}>Login</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{fontFamily:'Inter', background:'#fff', minHeight:'100vh', padding:24}}>
      <div style={{maxWidth:1100, margin:'0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1 style={{fontWeight:900}}>Admin - GSPI2026</h1>
          <div style={{display:'flex', gap:8}}>
            <button onClick={()=>setTab('quotes')} style={{padding:'8px 14px', borderRadius:100, background: tab==='quotes'?'#111':'#fff', color: tab==='quotes'?'#fff':'#111', border:'1px solid #eee', cursor:'pointer'}}>Quotes ({quotes.length})</button>
            <button onClick={()=>setTab('waitlists')} style={{padding:'8px 14px', borderRadius:100, background: tab==='waitlists'?'#111':'#fff', color: tab==='waitlists'?'#fff':'#111', border:'1px solid #eee', cursor:'pointer'}}>Waitlists</button>
            <button onClick={()=>setTab('scouting')} style={{padding:'8px 14px', borderRadius:100, background: tab==='scouting'?'#111':'#fff', color: tab==='scouting'?'#fff':'#111', border:'1px solid #eee', cursor:'pointer'}}>Scouting</button>
          </div>
        </div>

        {tab==='quotes' && (
          <div style={{marginTop:20, display:'grid', gap:10}}>
            {quotes.map(q=>(
              <div key={q.id} style={{border:'1px solid #eee', borderRadius:14, padding:14, display:'flex', justifyContent:'space-between'}}>
                <div>
                  <b>{q.product_title}</b> <span style={{fontSize:11, background:'#dcfce7', padding:'3px 8px', borderRadius:100}}>{q.status}</span>
                  <div style={{fontSize:12, color:'#555', marginTop:4}}>{q.customer_name} • {q.phone} • Qty {q.quantity} • {q.location}</div>
                  <div style={{fontSize:11, color:'#b45309', marginTop:4, background:'#fffbeb', display:'inline-block', padding:'3px 8px', borderRadius:100}}>Hidden Fee: ₦{Number(q.platform_fee_ngn).toLocaleString()} • Self-clear: {q.self_clear?'Yes 35k':'No 85k'} • ID: {q.id.slice(0,8)}</div>
                </div>
                <a href={`https://wa.me/${q.phone.replace('+','')}?text=Your landed cost for ${q.product_title} is ready`} target="_blank" style={{background:'#16a34a', color:'#fff', padding:'8px 14px', borderRadius:100, textDecoration:'none', fontSize:12, height:'fit-content'}}>WhatsApp</a>
              </div>
            ))}
            {quotes.length===0 && <div style={{color:'#999', fontSize:13}}>No quotes yet - test from homepage</div>}
          </div>
        )}

        {tab==='scouting' && (
          <div style={{marginTop:20, display:'grid', gap:10}}>
            {scouts.map(s=>(
              <div key={s.id} style={{border:'1px solid #eee', borderRadius:14, padding:14}}>
                <b>{s.request_code} - {s.title}</b> <span style={{fontSize:11, background:'#111', color:'#fff', padding:'3px 8px', borderRadius:100}}>{s.status}</span>
                <div style={{fontSize:12, color:'#555', marginTop:4}}>Waitlist: {s.waitlist_count} • Target: ₦{Number(s.target_landed_price_ngn||0).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}

        {tab==='waitlists' && <div style={{marginTop:20, fontSize:13, color:'#999'}}>Waitlists table: {waitlists.length} entries</div>}
      </div>
    </div>
  )
}
