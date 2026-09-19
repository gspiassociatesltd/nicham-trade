"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { t, Lang, speak } from '@/lib/i18n'
import LangToggle from '@/components/LangToggle'
import Link from 'next/link'

export default function Home(){
  const [lang, setLang] = useState<Lang>('ha')
  const [products, setProducts] = useState<any[]>([])
  const [points, setPoints] = useState(0)

  useEffect(()=>{
    supabase.from('products').select('*, product_translations!left(*)').eq('status','approved').limit(20).then(({data})=> setProducts(data||[]))
    const p = localStorage.getItem('green_points'); if(p) setPoints(parseInt(p))
  },[])

  const share = async (p:any)=>{
    const text = `${p.name_en} - ${p.price_ngn_sea? '₦'+p.price_ngn_sea.toLocaleString()+' sea' : '$'+p.price_usd} - Buy on NiChAm Trade: https://nicham-trade.vercel.app/product/${p.id} `
    const wa = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(wa,'_blank')
    // Insert referral + green points FREE - zero budget
    const phone = '+2348023456789'
    const { data: u } = await supabase.from('users').select('id').eq('phone',phone).single()
    if(u){
      await supabase.from('referrals').insert({ referrer_id: u.id, referred_phone: '+2348000000000', product_id: p.id, share_channel: 'whatsapp', status:'shared', green_points_earned:10 })
      await supabase.from('green_points').insert({ user_id: u.id, source:'referral', points:10, description:'WhatsApp/Ayoba share '+p.name_en })
      const newPts = points+10; setPoints(newPts); localStorage.setItem('green_points', String(newPts))
      alert(t[lang].airtime+`! +10 points. Total: ${newPts} = ₦${newPts*20} MTN Airtime (mock MVP)`)
    }
  }

  const tr = t[lang]
  return <div className="max-w-5xl mx-auto p-3">
    <header className="flex justify-between items-center card sticky top-2 z-10">
      <div className="flex gap-2 items-center"><div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">☀️</div><div><div className="font-black">NiChAm Trade</div><div className="text-xs text-green-700">Kayayyakin Rana Mai Rahusa • All Nigeria</div></div></div>
      <div className="flex gap-2 items-center"><div className="hidden md:block text-xs bg-yellow-100 px-2 py-1 rounded-full">🟢 {points} pts → ₦{points*20} Airtime</div><LangToggle lang={lang} setLang={setLang}/></div>
    </header>

    <div className="mt-4 card bg-gradient-to-br from-yellow-50 to-green-50">
      <div className="inline-block bg-white px-3 py-1 rounded-full text-xs font-bold border">• {tr.allNaija} • MTN MoMo Escrow • Ayoba • USSD</div>
      <h1 className="text-4xl font-black mt-3 leading-[0.9]">Shafin zane <br/>na <span className="text-green-700">solar</span><br/>ga matsai.</h1>
      <p className="mt-3 text-sm opacity-80">{tr.hero} {tr.sub}</p>
      <div className="mt-4 flex flex-col gap-2">
        <button onClick={()=>speak(tr.hero + '. ' + tr.sub, lang)} className="btn-green w-full">🎤 {tr.listen}</button>
        <div className="grid grid-cols-2 gap-2 text-xs"><div className="card">📱 MoMo Escrow<br/>Hold & Release</div><div className="card">🟣 Ayoba + WhatsApp<br/>Share = Airtime</div><div className="card">📞 USSD *123#<br/>For feature phones</div><div className="card">👥 Agent 3%<br/>Order for farmers</div></div>
      </div>
    </div>

    <h2 className="mt-6 font-black text-xl">5 Categories • All Nigerian Farmers</h2>
    <div className="grid md:grid-cols-3 gap-3 mt-3">
      {products.map(p=>{
        const trans = p.product_translations?.find((x:any)=>x.language===lang) || p.product_translations?.find((x:any)=>x.language==='ha') 
        return <div key={p.id} className="card">
          <img src={`https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400`} alt="" className="rounded-xl h-32 w-full object-cover"/>
          <div className="mt-2 flex gap-1"><span className="text-[10px] bg-green-100 px-2 py-0.5 rounded-full">✓ Gold</span><span className="text-[10px] bg-yellow-100 px-2 py-0.5 rounded-full">{p.category}</span></div>
          <div className="font-bold mt-1">{trans?.name || p.name_en}</div>
          <div className="text-xs opacity-70">{trans?.what_it_does || p.description_en}</div>
          <div className="mt-2 font-black">₦{p.price_ngn_sea?.toLocaleString()} <span className="text-xs font-normal">sea / ₦{p.price_ngn_air?.toLocaleString()} air</span></div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button onClick={()=>speak((trans?.name||p.name_en)+'. '+(trans?.roi_text||''), lang)} className="btn border">Saurara</button>
            <button onClick={()=>share(p)} className="btn-yellow text-xs">{tr.share}</button>
          </div>
          <Link href={`/product/${p.id}`} className="btn-green mt-2 w-full">View → Order with MoMo</Link>
        </div>
      })}
    </div>

    <div className="mt-6 card">
      <h3 className="font-bold">Agent USSD Mock (for MTN Pitch)</h3>
      <p className="text-xs opacity-70">Feature phone farmer? Agent dials *347*...# - no smartphone needed. Render backend will handle this.</p>
      <div className="mt-2 flex gap-2"><input placeholder="Farmer phone +234..." className="border rounded-xl px-3 py-2 flex-1"/><button className="btn-green">{t[lang].orderFor}</button></div>
    </div>

    <footer className="mt-8 text-center text-xs opacity-60 pb-20">Built with GitHub + Vercel + Render + Supabase + Ubuntu • Zero Budget MVP • gspiassociatesltd-/nicham-trade • MTN MoMo Sandbox • Green Points → Airtime</footer>
  </div>
}
