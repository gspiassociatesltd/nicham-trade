"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Product = { id: string, title: string, description: string, category: string }

const icons: any = {
  solar_panel: '☀️',
  lithium_battery: '🔋',
  tubular_battery: '🔋',
  inverter: '⚡',
  street_light: '💡',
  solar_pump: '🚿',
  default: '📦'
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('products').select('*').eq('is_homepage_visible', true).order('title')
      if (data) setProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#fff;color:#111}
        .header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);border-bottom:1px solid #eee}
        .wrap{max-width:1160px;margin:0 auto;padding:0 24px}
        .hero{background:#0a3d1f;color:white;padding:72px 0}
        .hero-grid{display:grid;grid-template-columns:1.2fr 0.8fr;gap:40px;align-items:center}
        .badge{background:#f4b400;color:#0a3d1f;font-weight:800;font-size:11px;padding:6px 12px;border-radius:100px;letter-spacing:0.6px}
        .h1{font-size:44px;line-height:1.05;font-weight:900;margin-top:16px;letter-spacing:-0.5px}
        .sub{color:rgba(255,255,255,0.75);margin-top:16px;font-size:17px;line-height:1.5}
        .btn{padding:14px 22px;border-radius:12px;font-weight:700;border:0;cursor:pointer}
        .btn-gold{background:#f4b400;color:#0a3d1f}
        .btn-ghost{background:transparent;border:1px solid rgba(255,255,255,0.25);color:white}
        .quote-card{background:white;color:#0a3d1f;border-radius:20px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,0.25)}
        .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .pcard{border:1px solid #eee;border-radius:16px;padding:20px;transition:all 0.2s;background:white}
        .pcard:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.08);border-color:#0a3d1f22}
        .pill{display:inline-block;background:#e6f4ea;color:#137333;font-size:11px;font-weight:700;padding:5px 10px;border-radius:100px;text-transform:uppercase}
        .icon{font-size:28px;margin-bottom:12px}
        @media(max-width:900px){.hero-grid{grid-template-columns:1fr}.grid3{grid-template-columns:1fr}.h1{font-size:32px}}
      `}</style>

      <div className="header">
        <div className="wrap" style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:64}}>
          <div style={{fontWeight:900,fontSize:20,color:'#0a3d1f'}}>NiChAm Trade <span style={{color:'#f4b400'}}>.</span></div>
          <div style={{fontSize:12,background:'#f5f5f5',padding:'6px 12px',borderRadius:100}}>GSPI Associates Ltd | Enugu • 13 Tables Ready</div>
        </div>
      </div>

      <div className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="badge">DUAL-QUOTE MVP LIVE • SUPABASE kjeyqcxbqwiqenigpcot</span>
            <h1 className="h1">Source Solar & EV Direct from China - With Honest Naira Landed Cost</h1>
            <p className="sub">Ex-China FOB + Africanies 72hr Naira Quote + Tax. No Hidden Factory Name. CE/TUV Verified. Machinery is search-only hidden for compliance.</p>
            <div style={{display:'flex',gap:12,marginTop:24}}>
              <button className="btn btn-gold">Request Quote →</button>
              <button className="btn btn-ghost">How It Works</button>
            </div>
          </div>
          <div className="quote-card">
            <div style={{fontWeight:800,fontSize:13,marginBottom:16,letterSpacing:0.5}}>SAMPLE DUAL QUOTE</div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px dashed #eee',fontSize:14}}><span>Ex-China (Factory)</span><strong>$1,200 FOB</strong></div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px dashed #eee',fontSize:14}}><span>Africanies (72hr NGN)</span><strong>₦1,850,000</strong></div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'14px 0',fontWeight:900,fontSize:15}}><span>Landed Lagos</span><span>₦2,050,000 inc. Tax</span></div>
            <div style={{marginTop:12,fontSize:11,color:'#666'}}>Manufacturer: Hidden | CE ✓ | TUV ✓ | GSPI Tax Invoice</div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{padding:'48px 24px'}}>
        <h2 style={{fontSize:24,fontWeight:800,color:'#0a3d1f'}}>Homepage Products - From Supabase</h2>
        <p style={{color:'#666',marginTop:8}}>{loading ? 'Loading 5 products from Supabase...' : `${products.length} products visible • Machinery search-only hidden as per your rule`}</p>
        <div className="grid3" style={{marginTop:28}}>
          {products.map(p => (
            <div key={p.id} className="pcard">
              <div className="icon">{icons[p.category] || icons.default}</div>
              <span className="pill">{p.category.replace('_',' ')}</span>
              <h3 style={{fontWeight:800,marginTop:12}}>{p.title}</h3>
              <p style={{fontSize:13,color:'#666',marginTop:8,lineHeight:1.5}}>{p.description}</p>
              <div style={{marginTop:14,fontSize:11,color:'#999'}}>Verified CE Manufacturer • Homepage Visible ✓</div>
            </div>
          ))}
          {!loading && products.length===0 && <div style={{gridColumn:'span 3',padding:40,textAlign:'center',border:'1px dashed #ccc',borderRadius:16}}>No products - Run the RLS fix SQL I gave you in Supabase SQL Editor, then refresh Vercel</div>}
        </div>
      </div>

      <div style={{background:'#f8faf8',borderTop:'1px solid #eee',padding:'40px 0'}}>
        <div className="wrap" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
          <div><div style={{width:32,height:32,borderRadius:100,background:'#f4b400',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800}}>1</div><div style={{fontWeight:700,marginTop:12}}>Search Machinery</div><div style={{fontSize:13,color:'#666',marginTop:4}}>Search-only, never homepage visible - compliance rule you defined</div></div>
          <div><div style={{width:32,height:32,borderRadius:100,background:'#f4b400',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800}}>2</div><div style={{fontWeight:700,marginTop:12}}>Get Dual Quotes</div><div style={{fontSize:13,color:'#666',marginTop:4}}>factory_quotes + africanies_quotes + auto-charger detection for EVs</div></div>
          <div><div style={{width:32,height:32,borderRadius:100,background:'#f4b400',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800}}>3</div><div style={{fontWeight:700,marginTop:12}}>We Source & Clear</div><div style={{fontSize:13,color:'#666',marginTop:4}}>Merged quote, tax invoice, receipts tracking - full compliance</div></div>
        </div>
      </div>

      <footer style={{background:'#0a3d1f',color:'rgba(255,255,255,0.6)',padding:'24px 0',fontSize:12}}>
        <div className="wrap" style={{display:'flex',justifyContent:'space-between'}}><span>© 2025 NiChAm Trade - GSPI Associates Ltd Platform</span><span>13 Tables Ready</span></div>
      </footer>
    </>
  )
}
