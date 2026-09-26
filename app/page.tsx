"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Product = { id: string, title: string, description: string, category?: string }

const getIcon = (title: string, category?: string) => {
  const t = (title + ' ' + (category||'')).toLowerCase()
  if (t.includes('panel')) return '☀️'
  if (t.includes('battery')) return '🔋'
  if (t.includes('inverter')) return '⚡'
  if (t.includes('street')) return '💡'
  if (t.includes('pump')) return '🚿'
  return '📦'
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from('products').select('*').limit(20)
        if (error) { setError(error.message); setLoading(false); return }
        if (data) setProducts(data)
      } catch (e: any) { setError(e.message) } finally { setLoading(false) }
    }
    load()
  }, [])

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:system-ui,sans-serif;background:#fff;color:#111}
        .wrap{max-width:1160px;margin:0 auto;padding:0 24px}
        .hero{background:#0a3d1f;color:white;padding:72px 0}
        .hero-grid{display:grid;grid-template-columns:1.2fr 0.8fr;gap:40px;align-items:center}
        .badge{background:#f4b400;color:#0a3d1f;font-weight:800;font-size:11px;padding:6px 12px;border-radius:100px}
        .h1{font-size:44px;line-height:1.05;font-weight:900;margin-top:16px}
        .sub{color:rgba(255,255,255,0.75);margin-top:16px;font-size:17px}
        .btn{padding:14px 22px;border-radius:12px;font-weight:700;border:0;cursor:pointer}
        .btn-gold{background:#f4b400;color:#0a3d1f}
        .btn-ghost{background:transparent;border:1px solid rgba(255,255,255,0.25);color:white}
        .quote-card{background:white;color:#0a3d1f;border-radius:20px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,0.25)}
        .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .pcard{border:1px solid #eee;border-radius:16px;padding:20px;background:white}
        .pill{display:inline-block;background:#e6f4ea;color:#137333;font-size:11px;font-weight:700;padding:5px 10px;border-radius:100px}
        .icon{font-size:28px;margin-bottom:12px}
        @media(max-width:900px){.hero-grid{grid-template-columns:1fr}.grid3{grid-template-columns:1fr}.h1{font-size:32px}}
      `}</style>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:64}} className="wrap">
        <div style={{fontWeight:900,fontSize:20,color:'#0a3d1f'}}>NiChAm Trade <span style={{color:'#f4b400'}}>.</span></div>
        <div style={{fontSize:12,background:'#f5f5f5',padding:'6px 12px',borderRadius:100}}>GSPI Associates Ltd | Enugu • Fixed</div>
      </div>
      <div className="hero"><div className="wrap hero-grid"><div>
        <span className="badge">DUAL-QUOTE MVP LIVE • SUPABASE kjeyqcxbqwiqenigpcot • FIXED</span>
        <h1 className="h1">Source Solar & EV Direct from China - With Honest Naira Landed Cost</h1>
        <p className="sub">Ex-China FOB + Africanies 72hr Naira Quote + Tax. No Hidden Factory Name.</p>
        <div style={{display:'flex',gap:12,marginTop:24}}>
          <button className="btn btn-gold">Request Quote →</button>
          <button className="btn btn-ghost">How It Works</button>
        </div></div>
        <div className="quote-card">
          <div style={{fontWeight:800,fontSize:13,marginBottom:16}}>SAMPLE DUAL QUOTE</div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px dashed #eee',fontSize:14}}><span>Ex-China (Factory)</span><strong>$1,200 FOB</strong></div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px dashed #eee',fontSize:14}}><span>Africanies (72hr NGN)</span><strong>₦1,850,000</strong></div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'14px 0',fontWeight:900,fontSize:15}}><span>Landed Lagos</span><span>₦2,050,000 inc. Tax</span></div>
        </div></div></div>
      <div className="wrap" style={{padding:'48px 24px'}}>
        <h2 style={{fontSize:24,fontWeight:800,color:'#0a3d1f'}}>Homepage Products - From Supabase</h2>
        <p style={{color: loading ? '#f4b400' : '#666',marginTop:8}}>{loading ? 'Loading...' : error ? `Error: ${error}` : `${products.length} products visible`}</p>
        <div className="grid3" style={{marginTop:28}}>
          {products.map(p => (
            <div key={p.id} className="pcard">
              <div className="icon">{getIcon(p.title, p.category)}</div>
              <span className="pill">{(p.category || 'Solar').replace('_',' ')}</span>
              <h3 style={{fontWeight:800,marginTop:12}}>{p.title}</h3>
              <p style={{fontSize:13,color:'#666',marginTop:8}}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
