'use client'
import { useState, useEffect } from 'react'
export default function Admin(){
  const [user, setUser] = useState<any>(null)
  const [quotes, setQuotes] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  useEffect(()=>{
    const s = localStorage.getItem('nicham_user')
    if(!s){ window.location.href='/login'; return }
    const u = JSON.parse(s)
    if(u.role!=='admin'){ alert('Admin page not accessible to non admin – Only admin can access – You are ' + u.role); window.location.href='/'; return }
    setUser(u)
    setAuthChecked(true)
    fetch('/api/quotes').then(r=>r.json()).then(d=>setQuotes(d.quotes||[]))
    fetch('/api/auth/signup').then(r=>r.json()).then(d=>setUsers(d.users||[]))
    setLoading(false)
  },[])
  function logout(){ localStorage.removeItem('nicham_user'); window.location.href='/login' }
  if(!authChecked) return <div style={{ padding:40, textAlign:'center' }}>Checking admin access... Admin page not accessible to non admin</div>
  if(loading) return <div style={{ padding:40, textAlign:'center' }}>Loading admin dashboard...</div>
  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:'Inter, sans-serif' }}>
      <header style={{ background:'#fff', borderBottom:'2px solid #0f172a', padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <div style={{ width:48, height:48, background:'#0f172a', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ color:'#fff', fontWeight:900 }}>N</span></div>
          <div><div style={{ fontWeight:900, fontSize:18 }}>Admin Dashboard – NiChAm Trade</div><div style={{ fontSize:11, color:'#64748b' }}>Only admin can access – {user?.name} ({user?.role}) – {user?.email}</div></div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <a href='/' style={{ background:'#f1f5f9', padding:'8px 16px', borderRadius:100, fontWeight:700, fontSize:12, textDecoration:'none', color:'#0f172a' }}>Marketplace</a>
          <button onClick={logout} style={{ background:'#ef4444', color:'#fff', padding:'8px 16px', borderRadius:100, fontWeight:700, fontSize:12, border:'none', cursor:'pointer' }}>Logout</button>
        </div>
      </header>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:20 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginBottom:24 }}>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:20 }}><div style={{ fontSize:12, color:'#64748b' }}>Total Quotes</div><div style={{ fontSize:28, fontWeight:900, marginTop:8 }}>{quotes.length}</div><div style={{ fontSize:11, color:'#22c55e', marginTop:4 }}>DDP to premises – Valid 3 Days – Source URL saved</div></div>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:20 }}><div style={{ fontSize:12, color:'#64748b' }}>Total Users</div><div style={{ fontSize:28, fontWeight:900, marginTop:8 }}>{users.length}</div><div style={{ fontSize:11, color:'#22c55e', marginTop:4 }}>First user is admin – New users sign up – Admin protected</div></div>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:20 }}><div style={{ fontSize:12, color:'#64748b' }}>5 Categories</div><div style={{ fontSize:28, fontWeight:900, marginTop:8 }}>Solar + Chemical</div><div style={{ fontSize:11, color:'#22c55e', marginTop:4 }}>EU/US standards only – Grade A+ – DDP Lagos</div></div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:20 }}>
            <div style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>Quote Requests – DDP to Premises – Valid 3 Days – Only DDP – Source URL saved</div>
            {quotes.length===0 ? <div style={{ textAlign:'center', padding:20, color:'#64748b' }}>No quotes yet – Buyer requests for quote – No price display on marketplace</div> : (
              <div style={{ display:'flex', flexDirection:'column', gap:12, maxHeight:600, overflow:'auto' }}>
                {quotes.map((q:any)=>(
                  <div key={q.id} style={{ border:'1px solid #e2e8f0', borderRadius:12, padding:12 }}>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                      <div style={{ fontWeight:800, fontSize:13 }}>{q.productModel} – {q.quantity} – {q.location}</div>
                      <div style={{ background: q.status==='pending'?'#fef3c7':'#f0fdf4', padding:'2px 8px', borderRadius:100, fontSize:10, fontWeight:800 }}>{q.status}</div>
                    </div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:6 }}>Buyer: {q.name} – {q.email} – {q.phone} – MOQ: {q.moq} – Source: {q.sourceCompany} – {q.sourcePlatform}</div>
                    <div style={{ fontSize:10, color:'#94a3b8', marginTop:4, wordBreak:'break-all' }}>Source URL saved: {q.sourceUrl} – Quote delivered to company from whose page item and picture pulled – Created: {new Date(q.createdAt).toLocaleString()} – Valid until: {new Date(q.validUntil).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:20 }}>
            <div style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>Users – New users sign up – Admin protected</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, maxHeight:600, overflow:'auto' }}>
              {users.map((u:any)=>(
                <div key={u.id} style={{ border:'1px solid #e2e8f0', borderRadius:10, padding:10 }}>
                  <div style={{ fontWeight:800, fontSize:12 }}>{u.name} – <span style={{ background: u.role==='admin'?'#0f172a':'#f1f5f9', color: u.role==='admin'?'#fff':'#0f172a', padding:'2px 6px', borderRadius:100, fontSize:10 }}>{u.role}</span></div>
                  <div style={{ fontSize:11, color:'#475569', marginTop:4 }}>{u.email} – {u.phone}</div>
                  <div style={{ fontSize:10, color:'#94a3b8', marginTop:4 }}>Created: {new Date(u.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16, background:'#f0fdf4', border:'1px solid #bbf7d0', padding:12, borderRadius:10, fontSize:11 }}>
              <b>Admin protection:</b> Admin page not accessible to non admin – This page checks localStorage role – If role !== admin, redirects to / – Only admin can access admin dashboard – First user to sign up becomes admin – Rest are users – New users sign up via /signup
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
