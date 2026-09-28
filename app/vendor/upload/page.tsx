'use client'
import { useState } from 'react'
export default function VendorUpload(){
  const [orderId, setOrderId] = useState('')
  const [bol, setBol] = useState('')
  const [msg, setMsg] = useState('')
  async function submit(e:any){
    e.preventDefault()
    setMsg('Uploading BOL...')
    const res = await fetch('/api/escrow/upload-bol', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ order_id: orderId, bol_number: bol }) }).then(r=>r.json())
    if(res.success){ setMsg('✓ BOL verified! 40% auto released to AfricanIES (insured)') } else { setMsg('Error: '+JSON.stringify(res)) }
  }
  return (
    <div style={{maxWidth:400, margin:'40px auto', padding:20, fontFamily:'system-ui'}}>
      <h2>AfricanIES - Upload Bill of Lading</h2>
      <form onSubmit={submit} style={{display:'grid', gap:12, marginTop:16}}>
        <input value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="Order ID" style={{padding:10, borderRadius:8, border:'1px solid #ddd'}} required/>
        <input value={bol} onChange={e=>setBol(e.target.value)} placeholder="BOL Number" style={{padding:10, borderRadius:8, border:'1px solid #ddd'}} required/>
        <button type="submit" style={{background:'#111', color:'#fff', padding:12, borderRadius:8, border:0}}>Upload BOL - Auto Get 40%</button>
      </form>
      <div style={{marginTop:12, fontSize:13}}>{msg}</div>
    </div>
  )
}
