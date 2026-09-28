'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function QuoteModal({ product, onClose }: { product: any, onClose: ()=>void }){
  const [form, setForm] = useState({ name:'', phone:'', qty:1, location:'', selfClear:false })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const platformFee = form.selfClear ? 35000 : 85000
  const deliveryType = form.selfClear ? 'SELF-CLEAR' : 'FULL'
  async function handleSubmit(e:any){
    e.preventDefault()
    if(!form.name || !form.phone){ alert('Name & Phone required'); return }
    setLoading(true)
    try{
      const { data: quote, error } = await supabase.from('africanies_quotes').insert({
        product_id: product.id,
        product_title: product.title || product.name,
        customer_name: form.name,
        phone: form.phone,
        quantity: form.qty,
        location: form.location,
        self_clear: form.selfClear,
      }).select().single()
      if(error) throw error
      const africaniesNumber = '2347050477950'
      const message = `NEW QUOTE - NiChAm Trade\nProduct: ${product.title||product.name}\nCustomer: ${form.name}\nPhone: ${form.phone}\nQty: ${form.qty}\nLocation: ${form.location}\nDelivery: ${deliveryType} (Fee: ₦${platformFee.toLocaleString()})\nPlatform Fee (internal, do NOT show buyer): ₦${platformFee.toLocaleString()}\nQuote ID: ${quote.id}`
      const waUrl = `https://wa.me/${africaniesNumber}?text=${encodeURIComponent(message)}`
      await supabase.from('whatsapp_logs').insert({ quote_id: quote.id, phone: form.phone, message, wa_url: waUrl })
      window.open(waUrl, '_blank')
      setDone(true)
    }catch(err:any){ alert('Error: '+err.message) }finally{ setLoading(false) }
  }
  if(done){
    return (
      <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(12px)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
        <div style={{background:'#fff', borderRadius:24, padding:28, maxWidth:400, width:'100%', textAlign:'center'}}>
          <div style={{width:56, height:56, background:'#dcfce7', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto', fontSize:24}}>✓</div>
          <div style={{fontWeight:900, fontSize:18, marginTop:12}}>Opening WhatsApp...</div>
          <div style={{fontSize:13, color:'#666', marginTop:8}}>Your quote saved. AfricanIES will reply within 2 hours with landed cost valid for 3 days only.</div>
          <button onClick={onClose} style={{marginTop:16, width:'100%', background:'#111', color:'#fff', border:0, padding:'12px', borderRadius:12, fontWeight:700}}>Close</button>
        </div>
      </div>
    )
  }
  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(12px)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
      <div style={{background:'#fff', borderRadius:24, padding:24, maxWidth:440, width:'100%', maxHeight:'90vh', overflow:'auto'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}><div style={{fontWeight:900, fontSize:16}}>Get Quote - Valid 3 Days Only</div><button onClick={onClose} style={{width:28, height:28, borderRadius:100, border:'1px solid #eee', background:'#fff'}}>✕</button></div>
        <div style={{marginTop:6, fontSize:12, color:'#666'}}>{product.title||product.name} • Landed Cost Valid for 3 Days Only</div>
        <form onSubmit={handleSubmit} style={{marginTop:18, display:'grid', gap:12}}>
          <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Your Name*" style={{padding:'12px 14px', borderRadius:12, border:'1px solid #e5e7eb', fontSize:13}} />
          <input required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="WhatsApp Phone* e.g. 08012345678" style={{padding:'12px 14px', borderRadius:12, border:'1px solid #e5e7eb', fontSize:13}} />
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <input type="number" min={1} value={form.qty} onChange={e=>setForm({...form, qty: parseInt(e.target.value)||1})} placeholder="Qty" style={{padding:'12px 14px', borderRadius:12, border:'1px solid #e5e7eb', fontSize:13}} />
            <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Location e.g. Enugu" style={{padding:'12px 14px', borderRadius:12, border:'1px solid #e5e7eb', fontSize:13}} />
          </div>
          <label style={{display:'flex', gap:10, alignItems:'flex-start', background:'#f9fafb', border:'1px solid #f0f0f0', borderRadius:12, padding:12, cursor:'pointer'}}>
            <input type="checkbox" checked={form.selfClear} onChange={e=>setForm({...form, selfClear: e.target.checked})} />
            <span style={{fontSize:12}}><b>Self-clear:</b> I will handle clearing myself (Lagos port) - Lower fee ₦35k vs ₦85k</span>
          </label>
          <div style={{background:'#fffbeb', border:'1px solid #fde68a', borderRadius:12, padding:12, fontSize:11, color:'#92400e'}}>
            <b>Fee hidden:</b> Landed = FOB+Freight+Customs+Fee (₦35k/₦85k). Buyer sees only final landed cost valid 3 days. Fee hidden.<br/>
            <span style={{background:'#fff', padding:'3px 8px', borderRadius:100, fontWeight:700, marginTop:4, display:'inline-block'}}>{deliveryType} ₦{platformFee.toLocaleString()} (Admin only)</span>
          </div>
          <button disabled={loading} type="submit" style={{background:'#111', color:'#fff', border:0, padding:'14px', borderRadius:14, fontWeight:800, fontSize:14}}>{loading ? 'Saving...' : 'Request Landed Cost - Valid 3 Days →'}</button>
        </form>
      </div>
    </div>
  )
}
