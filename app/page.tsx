'use client'
import { useState, useEffect } from 'react'
import QuoteModal from './components/QuoteModal'
import { supabase } from '@/lib/supabase'
const FALLBACK = [
  { id:'1', title:'3KVA Hybrid Inverter - Pure Sine Wave', description:'24V 80A MPPT', category:'china', landed_cost_ngn:280000, icon:'⚡', badge:'Best Seller' },
  { id:'2', title:'5KVA Must Hybrid Inverter', description:'48V 100A MPPT', category:'china', landed_cost_ngn:450000, icon:'⚡', badge:'Hot' },
  { id:'3', title:'200Ah Lithium Battery - 48V', description:'LiFePO4 10 Year Warranty', category:'china', landed_cost_ngn:650000, icon:'🔋', badge:'New' },
  { id:'4', title:'450W Solar Panel', description:'Monocrystalline Grade A', category:'usa', landed_cost_ngn:95000, icon:'☀️', badge:'Save 15%' },
]
export default function Home(){
  const [filter, setFilter] = useState('All')
  const [tab, setTab] = useState<'china'|'usa'>('china')
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<any[]>(FALLBACK)
  const [scouts, setScouts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  useEffect(()=>{ load() },[tab])
  async function load(){
    const { data: prod } = await supabase.from('products').select('*').eq('category', tab).limit(20)
    if(prod && prod.length>0) setProducts(prod)
    const { data: scout } = await supabase.from('scout_requests').select('*').in('status',['scouting','quoted','available']).limit(3)
    if(scout) setScouts(scout)
  }
  const filtered = products.filter(p=>{
    const mS = !search || p.title.toLowerCase().includes(search.toLowerCase())
    const mF = filter==='All' || p.category===filter || p.badge===filter
    return mS && mF
  })
  return (
    <div style={{fontFamily:'Inter, system-ui', background:'#fff', minHeight:'100vh'}}>
      <header style={{background:'rgba(255,255,255,0.8)', backdropFilter:'blur(20px)', borderBottom:'1px solid #f0f0f0', position:'sticky', top:0, zIndex:10}}>
        <div style={{maxWidth:1240, margin:'0 auto', padding:'14px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontWeight:900, fontSize:20}}>NiChAm Trade<span style={{color:'#16a34a'}}>.</span></div>
          <div style={{display:'flex', gap:8}}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{padding:'9px 14px', borderRadius:100, border:'1px solid #eaeaea', fontSize:13, width:180}} /><a href="https://wa.me/2347050477950" target="_blank" style={{background:'#111', color:'#fff', padding:'9px 16px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:700}}>WhatsApp</a></div>
        </div>
      </header>
      <section style={{maxWidth:1240, margin:'0 auto', padding:'24px 24px 0'}}>
        <div style={{background:'#111', color:'#fff', borderRadius:28, padding:28, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:20}}>
          <div><div style={{background:'rgba(255,255,255,0.1)', padding:'5px 12px', borderRadius:100, fontSize:11, fontWeight:700, display:'inline-block'}}>LIVE • {products.length} PRODUCTS • LANDED COST VALID 3 DAYS</div><h1 style={{fontSize:32, fontWeight:900, marginTop:12, lineHeight:1}}>Shop China & USA<br/><span style={{color:'#86efac'}}>Landed Cost Valid 3 Days</span></h1><div style={{marginTop:10, fontSize:12, color:'#aaa'}}>✓ Platform Fee Included ✓ Valid 3 Days ✓ No Hidden Charges</div></div>
          <div style={{display:'flex', gap:8}}><button onClick={()=>setTab('china')} style={{padding:'10px 18px', borderRadius:100, border:'1px solid rgba(255,255,255,0.2)', background: tab==='china'?'#fff':'transparent', color: tab==='china'?'#111':'#fff', fontWeight:700}}>Shop China</button><button onClick={()=>setTab('usa')} style={{padding:'10px 18px', borderRadius:100, border:'1px solid rgba(255,255,255,0.2)', background: tab==='usa'?'#fff':'transparent', color: tab==='usa'?'#111':'#fff', fontWeight:700}}>Shop USA</button></div>
        </div>
      </section>
      <section id="products" style={{maxWidth:1240, margin:'0 auto', padding:'16px 24px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:14}}>
        {filtered.map(p=>(
          <div key={p.id} style={{background:'#fff', border:'1px solid #f0f0f0', borderRadius:20, overflow:'hidden'}}>
            <div style={{background:'#f9fafb', height:120, display:'flex', alignItems:'center', justifyContent:'center', fontSize:48}}>{p.icon||'⚡'}</div>
            <div style={{padding:14}}><div style={{fontSize:10, color:'#888', fontWeight:700}}>{p.category?.toUpperCase()} {p.badge?`• ${p.badge}`:''}</div><div style={{fontWeight:800, fontSize:13, marginTop:4}}>{p.title}</div><div style={{fontSize:11, color:'#666'}}>{p.description?.slice(0,60)}</div><div style={{marginTop:8}}><b>₦{Number(p.landed_cost_ngn).toLocaleString()}</b> <span style={{fontSize:10, background:'#dcfce7', padding:'3px 6px', borderRadius:100, marginLeft:6}}>Valid 3 Days</span></div><button onClick={()=>setSelected(p)} style={{marginTop:10, width:'100%', background:'#111', color:'#fff', border:0, padding:'11px', borderRadius:12, fontSize:12, fontWeight:700}}>Get Quote - Valid 3 Days</button></div>
          </div>
        ))}
      </section>
      {scouts.length>0 && (
        <section style={{maxWidth:1240, margin:'0 auto', padding:'0 24px 40px'}}>
          <h2 style={{fontSize:16, fontWeight:900}}>Scouting Board - New Inventions</h2>
          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:12}}>
            {scouts.map(s=>(
              <div key={s.id} style={{border:'1px solid #f0f0f0', borderRadius:16, padding:14, background:'#fffcf0'}}>
                <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:11, fontWeight:800}}>{s.request_code}</span><span style={{fontSize:10, background:'#111', color:'#fff', padding:'3px 8px', borderRadius:100}}>{s.status}</span></div>
                <div style={{fontWeight:800, fontSize:13, marginTop:6}}>{s.icon} {s.title}</div>
                <div style={{fontSize:11, color:'#666', marginTop:4}}>{s.description?.slice(0,90)}...</div>
                <div style={{marginTop:8, fontSize:11}}><b>Target: ₦{Number(s.target_price_ngn).toLocaleString()}</b> • Waitlist: {s.waitlist_count}</div>
                <button onClick={()=>setSelected({ title: s.title, description: s.description })} style={{marginTop:10, width:'100%', background:'#f59e0b', color:'#fff', border:0, padding:'10px', borderRadius:10, fontSize:12, fontWeight:700}}>Join Waitlist</button>
              </div>
            ))}
          </div>
        </section>
      )}
      {selected && <QuoteModal product={selected} onClose={()=>setSelected(null)} />}
      <footer style={{borderTop:'1px solid #f0f0f0', padding:'24px', textAlign:'center', fontSize:11, color:'#999'}}>© 2026 NiChAm Trade • GSPI Associates Ltd • Valid 3 Days Only per NFR4</footer>
    </div>
  )
}
