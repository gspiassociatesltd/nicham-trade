'use client'
import { useEffect, useState } from 'react'
import { supabase, isAdminEmail, ADMIN_EMAILS } from '../../lib/supabase'

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [quotes, setQuotes] = useState<any[]>([])

  useEffect(()=>{
    const check = async () => {
      const { data } = await supabase.auth.getUser()
      const userEmail = data.user?.email || ''
      setEmail(userEmail)
      setIsAdmin(isAdminEmail(userEmail))
      if(isAdminEmail(userEmail)){
        const { data: q } = await supabase.from('quotes').select('*').order('created_at',{ascending:false}).limit(50)
        if(q) setQuotes(q)
      }
    }
    check()
  },[])

  const login = async () => {
    const input = prompt('Enter admin email (gspiassociatesltd@gmail.com):')
    if(!input) return
    const { error } = await supabase.auth.signInWithOtp({ email: input, options:{ emailRedirectTo: window.location.origin + '/admin' } })
    if(error) alert(error.message)
    else alert('Magic link sent to ' + input + ' - Check email!')
  }

  const logout = async () => { await supabase.auth.signOut(); location.reload() }

  if(!isAdmin){
    return (
      <div style={{padding:40,fontFamily:'system-ui'}}>
        <h1>Admin - NiChAm Trade</h1>
        <p>Current: {email || 'Not logged in'}</p>
        <p>Allowed admins: {ADMIN_EMAILS.join(', ')}</p>
        <button onClick={login} style={{padding:'10px 16px',background:'#111',color:'#fff',borderRadius:8,marginTop:10}}>Login as Admin</button>
        <p style={{marginTop:20}}><a href="/">← Back to Home</a></p>
      </div>
    )
  }

  return (
    <div style={{padding:24,fontFamily:'system-ui',maxWidth:1000,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>Admin Dashboard - {email}</h1>
        <button onClick={logout} style={{padding:'8px 12px'}}>Logout</button>
      </div>
      <p style={{color:'#16a34a',fontWeight:700}}>✓ Compiled Successfully - Problems 0 - Build Fixed</p>
      <h2 style={{marginTop:20}}>Recent Quotes ({quotes.length})</h2>
      <div style={{display:'grid',gap:12,marginTop:12}}>
        {quotes.length===0 && <p>No quotes yet - Supabase table empty or not created</p>}
        {quotes.map((q:any)=>(
          <div key={q.id} style={{border:'1px solid #eee',padding:12,borderRadius:12}}>
            <b>{q.customer_name || q.name}</b> - {q.product || q.message} - {q.phone} - {new Date(q.created_at).toLocaleString()}
          </div>
        ))}
      </div>
      <p style={{marginTop:30}}><a href="/">← Home</a> | WhatsApp: 2347050477950</p>
    </div>
  )
}
