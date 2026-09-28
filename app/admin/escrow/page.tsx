'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function EscrowPage(){
  const [orders, setOrders] = useState<any[]>([])
  const [releases, setReleases] = useState<any[]>([])
  useEffect(()=>{ load() },[])
  async function load(){
    const { data: o } = await supabase.from('orders').select('*').order('created_at',{ascending:false}).limit(20)
    const { data: r } = await supabase.from('escrow_releases').select('*').order('created_at',{ascending:false}).limit(50)
    if(o) setOrders(o); if(r) setReleases(r)
  }
  return (
    <div style={{padding:20, maxWidth:1100, margin:'0 auto', fontFamily:'system-ui'}}>
      <h1 style={{fontSize:22, fontWeight:900}}>Auto Insured Escrow - License Safe</h1>
      <p style={{fontSize:13, color:'#666'}}>No manual pay buttons. System auto pays based on docs. Client pays 100% - Paystack holds insured.</p>
      <div style={{marginTop:16, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, fontSize:12}}>
        <div style={{border:'2px solid #16a34a', borderRadius:10, padding:12, background:'#f0fdf4'}}><b>20% Auto</b><br/>Webhook charge.success → auto to AfricanIES</div>
        <div style={{border:'2px solid #eab308', borderRadius:10, padding:12, background:'#fefce8'}}><b>40% Auto</b><br/>AfricanIES uploads BOL → auto</div>
        <div style={{border:'2px solid #2563eb', borderRadius:10, padding:12, background:'#eff6ff'}}><b>40% Auto + 10% Fee</b><br/>Customer scans QR → auto final + fee to you</div>
      </div>
      <div style={{marginTop:16, background:'#111', color:'#fff', borderRadius:10, padding:12, fontSize:11}}>LICENSE SAFE: All releases have auto_triggered=true, no manual instruction from you. Paystack holds insured funds. Platform fee auto.</div>
      <h2 style={{marginTop:20, fontSize:16, fontWeight:800}}>Recent Orders</h2>
      {orders.map(o=>(
        <div key={o.id} style={{border:'1px solid #eee', borderRadius:10, padding:12, marginTop:8, fontSize:12}}>
          <b>{o.id}</b> - ₦{o.amount_total} - {o.escrow_status || 'holding_insured'}<br/>
          Releases: {releases.filter(r=>r.order_id===o.id).map(r=>`${r.milestone}:₦${r.amount}${r.auto_triggered?' auto':''}`).join(' | ') || 'none yet'}
        </div>
      ))}
    </div>
  )
}
