"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { t, Lang, speak } from '@/lib/i18n'
import LangToggle from '@/components/LangToggle'

export default function ProductPage({params}:{params:{id:string}}){
  const [lang, setLang] = useState<Lang>('ha')
  const [p, setP] = useState<any>(null)
  const [showOTP, setShowOTP] = useState(false)
  const [freight, setFreight] = useState<'sea'|'air'>('sea')

  useEffect(()=>{ supabase.from('products').select('*, product_translations(*)').eq('id', params.id).single().then(({data})=>setP(data)) },[params.id])
  if(!p) return <div className="p-10">Loading...</div>
  const trans = p.product_translations?.find((x:any)=>x.language===lang) || p.product_translations?.[0]
  const price = freight==='sea'? p.price_ngn_sea : p.price_ngn_air
  const tr = t[lang]

  const order = async ()=>{
    setShowOTP(true)
  }
  const confirmOTP = async ()=>{
    const { data: u } = await supabase.from('users').select('id').eq('phone','+2348023456789').single()
    if(!u) return alert('Demo user not found')
    const { data: order } = await supabase.from('orders').insert({ buyer_id: u.id, product_id: p.id, freight_type: freight, quantity:1, unit_price_usd: p.price_usd, total_ngn: price, status:'paid', is_agent_order:false, escrow_status:'held' }).select().single()
    if(order){
      await supabase.from('escrow_transactions').insert({ order_id: order.id, milestone_number:1, amount_ngn: price, status:'held', description:'MTN MoMo Sandbox Hold - 100%' })
      alert(`Order Paid! MoMo Sandbox held ₦${price.toLocaleString()}. Milestone 1 held. Agent will get 3% = ₦${Math.floor(price*0.03).toLocaleString()}`)
      setShowOTP(false)
    }
  }

  return <div className="max-w-xl mx-auto p-3">
    <header className="flex justify-between card"><div className="font-black">NiChAm Trade</div><LangToggle lang={lang} setLang={setLang}/></header>
    <div className="card mt-4">
      <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600" className="rounded-xl w-full h-56 object-cover"/>
      <h1 className="text-2xl font-black mt-3">{trans?.name || p.name_en}</h1>
      <p className="text-sm opacity-70">{trans?.description || p.description_en}</p>
      <div className="mt-2 bg-green-50 p-3 rounded-xl text-sm">💡 <b>ROI:</b> {trans?.roi_text || 'Saves N5000/week on fuel'}</div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button onClick={()=>setFreight('sea')} className={`btn border ${freight==='sea'?'bg-black text-white':''}`}>{tr.sea}<br/>₦{p.price_ngn_sea?.toLocaleString()}</button>
        <button onClick={()=>setFreight('air')} className={`btn border ${freight==='air'?'bg-black text-white':''}`}>{tr.air}<br/>₦{p.price_ngn_air?.toLocaleString()}</button>
      </div>
      <button onClick={()=>speak(trans?.name+' '+trans?.description, lang)} className="btn border w-full mt-2">🎤 {tr.listen}</button>
      <button onClick={order} className="btn-green w-full mt-2">Pay with MTN MoMo Sandbox - Hold ₦{price?.toLocaleString()}</button>
      <div className="text-[10px] mt-2 opacity-60">Vercel frontend + Render backend + Supabase Escrow + GitHub CI/CD - Zero Budget MVP for MTN</div>
    </div>
    {showOTP && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"><div className="card max-w-sm w-full"><h3 className="font-bold">MoMo Sandbox OTP (FREE MOCK)</h3><p className="text-xs">No Twilio - Mock only</p><div className="text-3xl font-mono tracking-widest bg-yellow-100 p-3 rounded-xl mt-2 text-center">123456</div><input placeholder="Enter 123456" className="border rounded-xl w-full mt-3 px-3 py-2"/><button onClick={confirmOTP} className="btn-green w-full mt-2">Confirm Pay</button><button onClick={()=>setShowOTP(false)} className="btn border w-full mt-2">Cancel</button></div></div>}
  </div>
}
