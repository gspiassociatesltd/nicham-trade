'use client'
import { useState } from 'react'
export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  async function handleSubmit(e:any){
    e.preventDefault()
    setLoading(true); setMsg('')
    try{
      const res=await fetch('/api/auth/signup',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, phone, password }) })
      const data=await res.json()
      if(data.success){
        localStorage.setItem('nicham_user', JSON.stringify(data.user))
        setMsg(data.message + ' – Redirecting...')
        setTimeout(()=>{ window.location.href = data.user.role==='admin' ? '/admin' : '/' }, 1000)
      }else{ setMsg(data.error) }
    }catch{ setMsg('Failed') } finally{ setLoading(false) }
  }
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8fafc', padding:20 }}>
      <div style={{ background:'#fff', borderRadius:16, padding:32, maxWidth:420, width:'100%', border:'1px solid #e2e8f0' }}>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ width:56, height:56, background:'#0f172a', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}><span style={{ color:'#fff', fontWeight:900, fontSize:24 }}>N</span></div>
          <div style={{ fontWeight:900, fontSize:22 }}>Create Account – NiChAm Trade</div>
          <div style={{ fontSize:12, color:'#64748b', marginTop:6 }}>New users sign up – First user becomes admin – Admin page not accessible to non admin</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginTop:12 }}><label style={{ fontSize:11, fontWeight:800 }}>Full Name *</label><input value={name} onChange={e=>setName(e.target.value)} required style={{ width:'100%', marginTop:6, padding:'12px', borderRadius:10, border:'1px solid #e2e8f0' }} placeholder='Your full name' /></div>
          <div style={{ marginTop:12 }}><label style={{ fontSize:11, fontWeight:800 }}>Email *</label><input type='email' value={email} onChange={e=>setEmail(e.target.value)} required style={{ width:'100%', marginTop:6, padding:'12px', borderRadius:10, border:'1px solid #e2e8f0' }} placeholder='your@email.com' /></div>
          <div style={{ marginTop:12 }}><label style={{ fontSize:11, fontWeight:800 }}>Phone / WhatsApp *</label><input value={phone} onChange={e=>setPhone(e.target.value)} required style={{ width:'100%', marginTop:6, padding:'12px', borderRadius:10, border:'1px solid #e2e8f0' }} placeholder='080...' /></div>
          <div style={{ marginTop:12 }}><label style={{ fontSize:11, fontWeight:800 }}>Password *</label><input type='password' value={password} onChange={e=>setPassword(e.target.value)} required style={{ width:'100%', marginTop:6, padding:'12px', borderRadius:10, border:'1px solid #e2e8f0' }} placeholder='Create password' /></div>
          {msg && <div style={{ marginTop:16, padding:10, borderRadius:10, background: msg.includes('admin')||msg.includes('Created')||msg.includes('Redirect')?'#f0fdf4':'#fef2f2', border: `1px solid ${msg.includes('admin')||msg.includes('Created')||msg.includes('Redirect')?'#bbf7d0':'#fecaca'}`, fontSize:12 }}>{msg}</div>}
          <button disabled={loading} type='submit' style={{ width:'100%', marginTop:20, background:'#0f172a', color:'#fff', padding:'14px', borderRadius:10, fontWeight:800, border:'none', cursor:'pointer', opacity: loading?0.6:1 }}>{loading?'Creating...':'Sign Up – First user is admin'}</button>
          <div style={{ textAlign:'center', marginTop:12, fontSize:11 }}>Already have account? <a href='/login' style={{ fontWeight:800, color:'#0f172a' }}>Login</a> • <a href='/' style={{ fontWeight:800 }}>Back to marketplace</a></div>
        </form>
      </div>
    </div>
  )
}
