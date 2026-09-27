
"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Quote = {
  id: string, created_at: string, product_title: string,
  customer_name: string, customer_phone: string, quantity: string,
  location: string, self_clear: boolean, platform_fee_ngn: number,
  delivery_type: string, status: string
}
type Scout = { id: string, request_code: string, title: string, status: string, waitlist_count: number, rejection_reason?: string }

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [scouts, setScouts] = useState<Scout[]>([])
  const [active, setActive] = useState<'quotes'|'scouts'>('quotes')
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')

  const checkAdmin = () => {
    if(password === 'GSPI2026') { setIsAdmin(true); loadData() }
    else alert('Wrong password - Ask Godwin for admin password')
  }

  const loadData = async () => {
    const { data: q } = await supabase.from('africanies_quotes').select('*').order('created_at',{ascending:false}).limit(100)
    if(q) setQuotes(q)
    const { data: s } = await supabase.from('scout_requests').select('*').order('created_at',{ascending:false}).limit(50)
    if(s) setScouts(s)
  }

  useEffect(()=>{ if(isAdmin) loadData() },[isAdmin])

  if(!isAdmin) {
    return (
      <div style={{maxWidth:400,margin:'100px auto',padding:24,border:'1px solid #eee',borderRadius:16}}>
        <h2 style={{fontWeight:900}}>Admin Login - NiChAm Trade</h2>
        <p style={{fontSize:13,color:'#666',marginTop:8}}>Admin must be in the know of all quote requests. Enter password to view all quotes, platform fees, self-clearing requests, and scout waitlists.</p>
        <input type="password" placeholder="Admin password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:12,marginTop:14,border:'1px solid #ddd',borderRadius:10}} />
        <button onClick={checkAdmin} style={{width:'100%',marginTop:12,padding:12,background:'#0a3d1f',color:'white',border:0,borderRadius:10,fontWeight:700}}>View All Quotes →</button>
        <p style={{fontSize:11,color:'#888',marginTop:12}}>Master Build Doc: Admin sees all requests, platform fees hidden from buyers, WhatsApp logs.</p>
      </div>
    )
  }

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'20px 24px',fontFamily:'system-ui'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{fontWeight:900,color:'#0a3d1f'}}>Admin Dashboard - All Quote Requests (In The Know)</h1>
        <button onClick={()=>setIsAdmin(false)} style={{padding:'8px 14px',border:'1px solid #eee',borderRadius:8}}>Logout</button>
      </div>
      
      <div style={{display:'flex',gap:10,marginTop:20}}>
        <button onClick={()=>setActive('quotes')} style={{padding:'10px 18px',borderRadius:10,fontWeight:700,border:0,background:active==='quotes'?'#0a3d1f':'#eee',color:active==='quotes'?'white':'#333'}}>All Quotes ({quotes.length}) - Platform Fee Visible</button>
        <button onClick={()=>setActive('scouts')} style={{padding:'10px 18px',borderRadius:10,fontWeight:700,border:0,background:active==='scouts'?'#f4b400':'#eee',color:active==='scouts'?'#0a3d1f':'#333'}}>Scout Requests ({scouts.length})</button>
        <button onClick={loadData} style={{padding:'10px 18px',borderRadius:10,border:'1px solid #eee',background:'white'}}>🔄 Refresh</button>
      </div>

      {active==='quotes' ? (
        <div style={{marginTop:20,overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
            <thead>
              <tr style={{background:'#f8faf8',textAlign:'left'}}>
                <th style={{padding:'10px',borderBottom:'1px solid #eee'}}>Date</th>
                <th style={{padding:'10px',borderBottom:'1px solid #eee'}}>Product</th>
                <th style={{padding:'10px',borderBottom:'1px solid #eee'}}>Customer</th>
                <th style={{padding:'10px',borderBottom:'1px solid #eee'}}>Phone</th>
                <th style={{padding:'10px',borderBottom:'1px solid #eee'}}>Qty/Loc</th>
                <th style={{padding:'10px',borderBottom:'1px solid #eee'}}>Delivery Type</th>
                <th style={{padding:'10px',borderBottom:'1px solid #eee',background:'#fffbe6'}}>Platform Fee (Admin Only)</th>
                <th style={{padding:'10px',borderBottom:'1px solid #eee'}}>Status</th>
                <th style={{padding:'10px',borderBottom:'1px solid #eee'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q=>(
                <tr key={q.id} style={{borderBottom:'1px solid #f0f0f0'}}>
                  <td style={{padding:10}}>{new Date(q.created_at).toLocaleString()}</td>
                  <td style={{padding:10,fontWeight:700}}>{q.product_title}</td>
                  <td style={{padding:10}}>{q.customer_name}</td>
                  <td style={{padding:10}}><a href={`https://wa.me/${q.customer_phone.replace(/\D/g,'')}`} target="_blank" style={{color:'#0a3d1f',fontWeight:700}}>{q.customer_phone}</a></td>
                  <td style={{padding:10}}>{q.quantity} / {q.location}</td>
                  <td style={{padding:10}}><span style={{padding:'4px 8px',borderRadius:20,fontSize:11,fontWeight:700,background:q.self_clear?'#e6f4ea':'#fffbe6',color:q.self_clear?'#137333':'#a37a00'}}>{q.self_clear?'SELF-CLEAR ₦35k':'FULL DOOR ₦85k'}</span><br/><span style={{fontSize:11}}>{q.delivery_type}</span></td>
                  <td style={{padding:10,background:'#fffbe6',fontWeight:900}}>₦{Number(q.platform_fee_ngn||0).toLocaleString()}<br/><span style={{fontSize:10,color:'#666',fontWeight:400}}>Hidden from buyer</span></td>
                  <td style={{padding:10}}><span style={{padding:'4px 8px',borderRadius:20,background:'#eee',fontSize:11}}>{q.status}</span></td>
                  <td style={{padding:10}}><a href={`https://wa.me/${q.customer_phone.replace(/\D/g,'')}?text=Hello ${encodeURIComponent(q.customer_name)}, your landed price for ${encodeURIComponent(q.product_title)} valid for 3 days only is...`} target="_blank" style={{padding:'6px 10px',background:'#0a3d1f',color:'white',borderRadius:8,textDecoration:'none',fontSize:11}}>Reply WhatsApp</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{fontSize:12,color:'#666',marginTop:12}}>💡 Admin is in the know of ALL requests: Customer never sees platform fee column. You see full breakdown: FOB+Freight+Customs+Fee = Landed. Self-clearing requests show lower fee.</p>
        </div>
      ) : (
        <div style={{marginTop:20}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {scouts.map(s=>(
              <div key={s.id} style={{border:'1px solid #eee',borderRadius:16,padding:16,background:s.status==='rejected'?'#ffeaea':'white'}}>
                <div style={{fontSize:11,fontWeight:800}}>{s.request_code} • {s.status.toUpperCase()}</div>
                <h4 style={{marginTop:8}}>{s.title}</h4>
                <div style={{marginTop:8,fontSize:12}}>👥 {s.waitlist_count} waiting (public sees count only)</div>
                {s.rejection_reason && <div style={{marginTop:8,fontSize:11,color:'#a00',background:'#ffeaea',padding:8,borderRadius:8}}>Rejected: {s.rejection_reason}</div>}
                <div style={{marginTop:10,display:'flex',gap:6}}>
                  <button style={{padding:'6px 10px',fontSize:11,borderRadius:8,border:'1px solid #eee'}}>View Waitlist Phones (Admin Only)</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

