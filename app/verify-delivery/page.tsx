'use client'
import { useState } from 'react'
export default function VerifyDelivery(){
  const [orderId, setOrderId] = useState('')
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')
  async function submit(e:any){
    e.preventDefault()
    setMsg('Verifying...')
    const res = await fetch('/api/escrow/verify-delivery', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ order_id: orderId, identifier: code }) }).then(r=>r.json())
    if(res.success){ setMsg('✓ Delivery verified! Final 40% auto to AfricanIES + platform fee auto to NiChAm Trade - Insured!') } else { setMsg('Error') }
  }
  return (
    <div style={{maxWidth:400, margin:'40px auto', padding:20, fontFamily:'system-ui'}}>
      <h2>Customer - Scan Delivery QR</h2>
      <p style={{fontSize:12, color:'#666'}}>Enter Order ID + QR code inside package</p>
      <form onSubmit={submit} style={{display:'grid', gap:12, marginTop:16}}>
        <input value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="Order ID" style={{padding:10, borderRadius:8, border:'1px solid #ddd'}} required/>
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Delivery QR Code" style={{padding:10, borderRadius:8, border:'1px solid #ddd'}} required/>
        <button type="submit" style={{background:'#16a34a', color:'#fff', padding:12, borderRadius:8, border:0}}>Confirm Delivery - Auto Release Final</button>
      </form>
      <div style={{marginTop:12, fontSize:13}}>{msg}</div>
    </div>
  )
}
