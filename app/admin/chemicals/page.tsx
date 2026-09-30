'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminChemicalVerify(){
  const [auth, setAuth] = useState(false)
  const [pwd, setPwd] = useState('')
  const [tab, setTab] = useState<'quotes'|'chemicals'|'scouting'>('chemicals')
  const [quotes, setQuotes] = useState<any[]>([])
  const [scouts, setScouts] = useState<any[]>([])
  const [approving, setApproving] = useState<any>(null)
  const [form, setForm] = useState({ title:'', price_ngn:'', supplier_name:'1688 Chemical Supplier', image_url:'', category:'chemical' })
  const [msg, setMsg] = useState('')

  function login(){ if(pwd==='GSPI2026'){ setAuth(true); load() } else alert('Wrong password - GSPI2026') }
  async function load(){
    const { data: q } = await supabase.from('africanies_quotes').select('*').order('created_at',{ascending:false}).limit(100)
    if(q) setQuotes(q)
    const { data: s } = await supabase.from('scout_requests').select('*').order('created_at',{ascending:false}).limit(100)
    if(s) setScouts(s)
  }

  async function openApprove(s:any){
    setApproving(s)
    setForm({ title: s.title.replace('industrial chemical','').trim(), price_ngn: String(s.target_landed_price_ngn||45000), supplier_name:'1688 Chemical Verified', image_url:'', category:'chemical' })
  }

  async function approveToCatalog(){
    if(!approving) return
    setMsg('Approving...')
    try{
      const price = Number(form.price_ngn)
      // 1. Insert into products as verified chemical
      const { data: prod, error } = await supabase.from('products').insert({
        title: form.title,
        price_ngn: price,
        supplier_name: form.supplier_name,
        image_url: form.image_url || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400',
        category: form.category,
        is_verified: true,
        description: `Chemical verified from 1688 search: ${approving.title}. Scout ${approving.request_code}. Valid 3 Days.`
      }).select().single()
      if(error) throw error

      // 2. Update scout to approved
      await supabase.from('scout_requests').update({ status:'approved', description: approving.description + `\nAPPROVED -> Product ID ${prod.id} Price NGN ${price}` }).eq('id', approving.id)

      // 3. Log WhatsApp for admin to send quote
      const waMsg = `NiChAm Chemical Quote Ready (Valid 3 Days)\nChemical: ${form.title}\nPrice: NGN ${price.toLocaleString()} (25kg)\nSupplier: ${form.supplier_name}\nScout: ${approving.request_code}\nProduct now in catalog: ${prod.id}\nWhatsApp 07050477950 to order`
      await supabase.from('whatsapp_logs').insert({ quote_id: prod.id, phone:'2347050477950', message: waMsg, wa_url:`https://wa.me/2347050477950?text=${encodeURIComponent(waMsg)}` })

      setMsg(`✅ Approved! ${form.title} added to catalog NGN ${price.toLocaleString()} - Now searchable`)
      setApproving(null)
      load()
    }catch(e:any){ setMsg('Error: '+e.message) }
  }

  if(!auth){
    return (
      <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f9fafb'}}>
        <div style={{background:'#fff', padding:28, borderRadius:20, border:'1px solid #eee', width:360}}>
          <div style={{fontWeight:900, fontSize:18}}>NiChAm Admin - Chemicals</div>
          <div style={{fontSize:12, color:'#666', marginTop:4}}>Password GSPI2026</div>
          <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Password" style={{marginTop:14, width:'100%', padding:'12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          <button onClick={login} style={{marginTop:12, width:'100%', background:'#111', color:'#fff', padding:'12px', borderRadius:12, fontWeight:700, border:0, cursor:'pointer'}}>Login</button>
        </div>
      </div>
    )
  }

  const chemicalScouts = scouts.filter((s:any)=> s.title.toLowerCase().includes('chemical') || s.description?.includes('industrial chemical') || s.title.toLowerCase().includes('caustic') || s.title.toLowerCase().includes('acid') || s.title.toLowerCase().includes('soda') || s.title.toLowerCase().includes('paracetamol'))

  return (
    <div style={{fontFamily:'Inter, sans-serif', background:'#f8fafc', minHeight:'100vh', padding:20}}>
      <div style={{maxWidth:1100, margin:'0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fff', padding:'14px 18px', borderRadius:16, border:'1px solid #e2e8f0'}}>
          <h1 style={{fontWeight:900, margin:0, fontSize:18}}>🧪 Chemical Verify • GSPI2026 • 07050477950</h1>
          <div style={{display:'flex', gap:8}}>
            <button onClick={()=>setTab('chemicals')} style={{padding:'8px 14px', borderRadius:100, background: tab==='chemicals'?'#0f172a':'#fff', color: tab==='chemicals'?'#fff':'#111', border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:800}}>Chemicals ({chemicalScouts.length})</button>
            <button onClick={()=>setTab('quotes')} style={{padding:'8px 14px', borderRadius:100, background: tab==='quotes'?'#0f172a':'#fff', color: tab==='quotes'?'#fff':'#111', border:'1px solid #e2e8f0', cursor:'pointer'}}>Quotes ({quotes.length})</button>
            <button onClick={()=>setTab('scouting')} style={{padding:'8px 14px', borderRadius:100, background: tab==='scouting'?'#0f172a':'#fff', color: tab==='scouting'?'#fff':'#111', border:'1px solid #e2e8f0', cursor:'pointer'}}>All Scouts ({scouts.length})</button>
          </div>
        </div>

        {msg && <div style={{marginTop:14, background:'#dcfce7', border:'1px solid #bbf7d0', padding:'12px 16px', borderRadius:12, fontSize:13, fontWeight:700}}>{msg}</div>}

        {tab==='chemicals' && (
          <div style={{marginTop:18, display:'grid', gap:12}}>
            <div style={{fontSize:12, color:'#64748b'}}>Chemical search engine scouts — approve to add to catalog. Valid 3 Days logic applies. After approval, customer search will find it instantly.</div>
            {chemicalScouts.map(s=>(
              <div key={s.id} style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:16, display:'flex', justifyContent:'space-between', gap:12}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:900, fontSize:14}}>{s.request_code} • {s.title} <span style={{fontSize:10, background: s.status==='scouting'?'#fef3c7':'#dcfce7', padding:'3px 8px', borderRadius:100, marginLeft:8}}>{s.status}</span></div>
                  <div style={{fontSize:12, color:'#475569', marginTop:6, whiteSpace:'pre-wrap'}}>{s.description?.slice(0,400)}</div>
                  <div style={{fontSize:11, color:'#64748b', marginTop:8}}>Target ₦{Number(s.target_landed_price_ngn||0).toLocaleString()} • Valid until {s.valid_until? new Date(s.valid_until).toLocaleDateString(): '3 Days'} • {new Date(s.created_at).toLocaleString()}</div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:8}}>
                  <button onClick={()=>openApprove(s)} style={{background:'#0f172a', color:'#fff', padding:'10px 16px', borderRadius:100, border:0, cursor:'pointer', fontWeight:800, fontSize:12}}>Verify & Add to Catalog</button>
                  <a href={`https://wa.me/2347050477950?text=${encodeURIComponent(`Chemical Scout ${s.request_code}: ${s.title} - Ready for verification`)}`} target="_blank" style={{background:'#fff', border:'1px solid #e2e8f0', padding:'8px 14px', borderRadius:100, textAlign:'center', textDecoration:'none', color:'#0f172a', fontSize:11, fontWeight:700}}>WhatsApp Admin</a>
                </div>
              </div>
            ))}
            {chemicalScouts.length===0 && <div style={{background:'#fff', border:'1px dashed #cbd5e1', padding:24, borderRadius:16, textAlign:'center', color:'#94a3b8', fontSize:13}}>No chemical scouts yet — search a chemical on homepage (e.g. Caustic Soda) to create one</div>}
          </div>
        )}

        {approving && (
          <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:16}}>
            <div style={{background:'#fff', borderRadius:20, padding:20, width:'100%', maxWidth:440, border:'1px solid #e2e8f0'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:900}}>Verify Chemical — Add to Catalog</div>
                <button onClick={()=>setApproving(null)} style={{border:0, background:'#f1f5f9', width:28, height:28, borderRadius:100, cursor:'pointer'}}>✕</button>
              </div>
              <div style={{fontSize:11, color:'#64748b', marginTop:4}}>Scout: {approving.request_code} • {approving.title}</div>
              <div style={{marginTop:14, display:'grid', gap:10}}>
                <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Chemical Title e.g. Caustic Soda 25kg" style={{padding:'12px', borderRadius:12, border:'1px solid #e2e8f0', fontSize:13}} />
                <input value={form.price_ngn} onChange={e=>setForm({...form, price_ngn:e.target.value})} placeholder="Landed Price NGN e.g. 45000" type="number" style={{padding:'12px', borderRadius:12, border:'1px solid #e2e8f0'}} />
                <input value={form.supplier_name} onChange={e=>setForm({...form, supplier_name:e.target.value})} placeholder="Supplier" style={{padding:'12px', borderRadius:12, border:'1px solid #e2e8f0'}} />
                <input value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})} placeholder="Image URL (optional)" style={{padding:'12px', borderRadius:12, border:'1px solid #e2e8f0', fontSize:12}} />
                <div style={{fontSize:10, color:'#64748b', background:'#f8fafc', padding:'8px 12px', borderRadius:10}}>After approval, product will be VERIFIED 1688, searchable, valid 3 days, fee auto-calculated (8-12%)</div>
                <button onClick={approveToCatalog} style={{background:'#16a34a', color:'#fff', padding:'14px', borderRadius:12, border:0, cursor:'pointer', fontWeight:900}}>✅ Approve & Add to Catalog + WhatsApp Log</button>
              </div>
            </div>
          </div>
        )}

        {tab==='quotes' && (
          <div style={{marginTop:18, display:'grid', gap:10}}>
            {quotes.map(q=>(
              <div key={q.id} style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:14, display:'flex', justifyContent:'space-between'}}>
                <div><b>{q.product_title}</b> <span style={{fontSize:11, background:'#dcfce7', padding:'3px 8px', borderRadius:100}}>{q.status}</span><div style={{fontSize:12, color:'#555', marginTop:4}}>{q.customer_name} • {q.phone} • Qty {q.quantity} • {q.location}</div></div>
                <a href={`https://wa.me/${q.phone.replace(/[^0-9]/g,'')}`} target="_blank" style={{background:'#16a34a', color:'#fff', padding:'8px 14px', borderRadius:100, textDecoration:'none', fontSize:12, fontWeight:700, height:'fit-content'}}>WhatsApp</a>
              </div>
            ))}
          </div>
        )}

        {tab==='scouting' && (
          <div style={{marginTop:18, display:'grid', gap:10}}>
            {scouts.map(s=>(
              <div key={s.id} style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:14}}>
                <b>{s.request_code} - {s.title}</b> <span style={{fontSize:11, background:'#0f172a', color:'#fff', padding:'3px 8px', borderRadius:100, marginLeft:6}}>{s.status}</span>
                <div style={{fontSize:12, color:'#555', marginTop:4}}>Target ₦{Number(s.target_landed_price_ngn||0).toLocaleString()} • Valid {s.valid_until? new Date(s.valid_until).toLocaleDateString(): ''}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
