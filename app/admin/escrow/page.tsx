
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EscrowPage(){
  const [orders, setOrders] = useState<any[]>([])
  const [docs, setDocs] = useState<any[]>([])
  const [releases, setReleases] = useState<any[]>([])

  useEffect(()=>{ load() },[])
  async function load(){
    const { data: o } = await supabase.from('orders').select('*').order('created_at',{ascending:false})
    const { data: d } = await supabase.from('escrow_documents').select('*').order('created_at',{ascending:false})
    const { data: r } = await supabase.from('escrow_releases').select('*').order('created_at',{ascending:false})
    if(o) setOrders(o); if(d) setDocs(d); if(r) setReleases(r)
  }

  return (
    <div style={{padding:24, maxWidth:1200, margin:'0 auto', fontFamily:'system-ui'}}>
      <h1 style={{fontSize:24,fontWeight:900}}>Auto Insured Escrow - No Manual Instruction</h1>
      <p style={{color:'#666', marginTop:8}}>You NEVER manually pay. System auto-releases based on documents. Insurance covers deposit via Paystack balance.</p>
      
      <div style={{marginTop:20, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
        <div style={{border:'2px solid #16a34a', borderRadius:12, padding:16, background:'#f0fdf4'}}><b>20% Auto</b><br/>Client pays 100% → Paystack verifies → Auto to AfricanIES. Insured.<br/><small>Trigger: charge.success webhook</small></div>
        <div style={{border:'2px solid #eab308', borderRadius:12, padding:16, background:'#fefce8'}}><b>40% Auto</b><br/>AfricanIES uploads Bill of Lading → OCR verified → Auto to AfricanIES<br/><small>Trigger: BOL upload</small></div>
        <div style={{border:'2px solid #2563eb', borderRadius:12, padding:16, background:'#eff6ff'}}><b>40% Auto + Platform Fee</b><br/>Customer scans delivery QR → Auto final to AfricanIES + 10% fee to NiChAm Trade<br/><small>Trigger: Delivery scan</small></div>
      </div>

      <div style={{marginTop:24, background:'#111', color:'#fff', borderRadius:12, padding:16, fontSize:13}}>
        <b>License Safe:</b> You are NOT giving payment instructions. Paystack Transfer API is called automatically by system when documents verified. You are a marketplace with automated payouts, not a money transmitter. Funds insured via Paystack settlement + Leadway Insurance policy (add policy no to env).
      </div>

      <h2 style={{marginTop:30, fontWeight:800}}>Orders - Insured Escrow Balance: Paystack Holds</h2>
      {orders.map(o=>(
        <div key={o.id} style={{border:'1px solid #eee', borderRadius:12, padding:16, marginTop:12}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <b>{o.id} - {o.amount_total} NGN - Paid 100%</b>
            <span style={{background:o.escrow_status?.includes('completed')?'#dcfce7':'#fef3c7', padding:'4px 8px', borderRadius:100, fontSize:11}}>{o.escrow_status} - Hold: {o.escrow_balance} NGN - Insured</span>
          </div>
          <div style={{fontSize:12, color:'#666', marginTop:8}}>Releases: {releases.filter(r=>r.order_id===o.id).map(r=>`${r.milestone}: ₦${r.amount} auto=${r.auto_triggered}`).join(' | ') || 'Waiting for payment'}</div>
          <div style={{fontSize:12, color:'#666', marginTop:4}}>Docs: {docs.filter(d=>d.order_id===o.id).map(d=>`${d.type} verified=${d.verified}`).join(' | ')}</div>
        </div>
      ))}
    </div>
  )
}
