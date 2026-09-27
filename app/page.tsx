'use client'
import { useState } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')

  const products = [
    { id:1, name:'5KVA Solar Inverter', price:'₦450,000', cat:'inverter' },
    { id:2, name:'10KVA Hybrid Inverter', price:'₦850,000', cat:'inverter' },
    { id:3, name:'400W Solar Panel', price:'₦120,000', cat:'solar' },
    { id:4, name:'200AH Lithium Battery', price:'₦650,000', cat:'battery' },
    { id:5, name:'3KVA Inverter System', price:'₦280,000', cat:'inverter' },
    { id:6, name:'MPPT Charge Controller 60A', price:'₦95,000', cat:'solar' },
  ]

  const filtered = products.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#fff;color:#111;-webkit-font-smoothing:antialiased}
        .wrap{max-width:1200px;margin:0 auto;padding:0 20px}
        .header{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid #eee;position:sticky;top:0;background:#fff;z-index:10}
        .logo{font-weight:800;font-size:22px;letter-spacing:-0.5px}
        .logo span{color:#16a34a}
        .hero-grid{display:grid;grid-template-columns:1.2fr 0.8fr;gap:24px;padding:40px 0}
        .h1{font-size:48px;line-height:1.05;letter-spacing:-1.5px;font-weight:800}
        .btn{padding:12px 20px;border-radius:100px;border:0;background:#111;color:#fff;font-weight:600;cursor:pointer}
        .btn-green{background:#16a34a}
        .card{border:1px solid #e8eae6;border-radius:20px;padding:16px;background:#fff}
        .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .how{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:20px}
        @media(max-width:960px){.hero-grid{grid-template-columns:1fr}.grid3{grid-template-columns:1fr}.how{grid-template-columns:1fr}.h1{font-size:36px}}
      `}</style>

      <div className="header wrap">
        <div className="logo">NiChAm Trade<span>.</span></div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search solar, inverter..." style={{padding:'10px 14px',border:'1px solid #e8eae6',borderRadius:100,background:'#f6f7f5',fontSize:13,width:200}} />
          <a href="https://wa.me/2347050477950" target="_blank" className="btn btn-green" style={{textDecoration:'none',fontSize:13}}>WhatsApp 2347050477950</a>
          <a href="/admin" style={{fontSize:13,textDecoration:'none',color:'#111',fontWeight:600,border:'1px solid #eee',padding:'10px 14px',borderRadius:100}}>Admin</a>
        </div>
      </div>

      <div className="wrap hero-grid">
        <div>
          <h1 className="h1">World-class solar & inverter marketplace for Nigeria.</h1>
          <p style={{marginTop:16,color:'#555',lineHeight:1.6}}>Verified products, escrow protection, insurance, Africanies logistics. Built for Minna, Abuja, Lagos & everywhere.</p>
          <div style={{marginTop:20,display:'flex',gap:10}}>
            <a href="https://wa.me/2347050477950" className="btn btn-green" style={{textDecoration:'none'}}>Chat on WhatsApp</a>
            <button className="btn" onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>Browse Products</button>
          </div>
        </div>
        <div className="card" style={{background:'#f6f7f5'}}>
          <h3 style={{fontWeight:700}}>Why NiChAm?</h3>
          <div className="how">
            <div><b>Escrow Safe</b><p style={{fontSize:13,color:'#666',marginTop:6}}>Pay only when delivered - Paystack secured</p></div>
            <div><b>Insured</b><p style={{fontSize:13,color:'#666',marginTop:6}}>Transit insurance by leadway</p></div>
            <div><b>Fast Delivery</b><p style={{fontSize:13,color:'#666',marginTop:6}}>Africanies logistics nationwide</p></div>
          </div>
        </div>
      </div>

      <div id="products" className="wrap" style={{paddingBottom:60}}>
        <h2 style={{fontSize:28,fontWeight:800,marginBottom:16}}>Products</h2>
        <div className="grid3">
          {filtered.map(p=>(
            <div key={p.id} className="card">
              <div style={{height:120,background:'#f6f7f5',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#888'}}>{p.cat.toUpperCase()}</div>
              <h3 style={{marginTop:12,fontWeight:700}}>{p.name}</h3>
              <p style={{marginTop:4,fontWeight:800,color:'#16a34a'}}>{p.price}</p>
              <a href={`https://wa.me/2347050477950?text=I%20want%20${encodeURIComponent(p.name)}%20${p.price}`} target="_blank" className="btn btn-green" style={{display:'block',textAlign:'center',marginTop:10,textDecoration:'none',fontSize:13}}>Order on WhatsApp</a>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:40,color:'#888',fontSize:13}}>© {new Date().getFullYear()} NiChAm Trade - Godwin Abaniwo - gspiassociatesltd@gmail.com - Compiled Successfully - Problems 0</div>
      </div>
    </>
  )
}
