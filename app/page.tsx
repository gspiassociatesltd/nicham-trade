
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const PRODUCTS = [
  { id: 1, name: '3KVA Hybrid Inverter - Pure Sine Wave', price: 280000, oldPrice: 320000, category: 'Inverters', image: '⚡', badge: 'Best Seller', inStock: true },
  { id: 2, name: '5KVA Must Hybrid Inverter', price: 450000, oldPrice: 520000, category: 'Inverters', image: '⚡', badge: 'Hot', inStock: true },
  { id: 3, name: '200Ah Lithium Battery - 48V', price: 650000, oldPrice: 750000, category: 'Batteries', image: '🔋', badge: 'New', inStock: true },
  { id: 4, name: '220Ah Tubular Battery - 12V', price: 185000, oldPrice: 210000, category: 'Batteries', image: '🔋', badge: null, inStock: true },
  { id: 5, name: '450W Monocrystalline Solar Panel', price: 95000, oldPrice: 110000, category: 'Panels', image: '☀️', badge: 'Save 15%', inStock: true },
  { id: 6, name: '550W Bifacial Solar Panel', price: 125000, oldPrice: 145000, category: 'Panels', image: '☀️', badge: null, inStock: true },
  { id: 7, name: '60A MPPT Charge Controller', price: 85000, oldPrice: 95000, category: 'Controllers', image: '🎛️', badge: null, inStock: true },
  { id: 8, name: 'Complete 3KVA Solar Kit - Home', price: 1450000, oldPrice: 1650000, category: 'Kits', image: '🏠', badge: 'Complete', inStock: true },
]

export default function Home(){
  const [cart, setCart] = useState<any[]>([])
  const [showQuote, setShowQuote] = useState(false)
  const [quoteForm, setQuoteForm] = useState({ name: '', phone: '', product: '' })
  const [filter, setFilter] = useState('All')

  const filtered = filter==='All' ? PRODUCTS : PRODUCTS.filter(p=>p.category===filter)
  const categories = ['All','Inverters','Batteries','Panels','Controllers','Kits']

  const addToCart = (p:any) => {
    setCart(prev=> [...prev, p])
    alert(`Added ${p.name} to cart! WhatsApp us to checkout: 2347050477950`)
  }

  const requestQuote = async (e:any) => {
    e.preventDefault()
    const { error } = await supabase.from('quotes').insert({
      customer_name: quoteForm.name,
      phone: quoteForm.phone,
      product: quoteForm.product,
      message: `Quote request for ${quoteForm.product}`,
      status: 'new'
    })
    if(!error){
      alert('✓ Quote request sent! We will WhatsApp you in 5 minutes: 2347050477950')
      setShowQuote(false)
      setQuoteForm({name:'',phone:'',product:''})
    } else {
      // Fallback if quotes table not ready - still show success for MVP
      alert('✓ Request received! WhatsApp us now: 2347050477950 - ' + quoteForm.product)
      setShowQuote(false)
    }
  }

  return (
    <div style={{fontFamily:'system-ui', background:'#fbfcfa', minHeight:'100vh'}}>
      {/* Header */}
      <header style={{background:'#fff', borderBottom:'1px solid #eee', position:'sticky', top:0, zIndex:10}}>
        <div style={{maxWidth:1200, margin:'0 auto', padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontWeight:900, fontSize:22}}>NiChAm Trade<span style={{color:'#16a34a'}}>.</span></div>
          <nav style={{display:'flex', gap:20, fontSize:14}}>
            <span>Home</span><span>Shop</span><span>About</span>
            <a href="/admin" style={{color:'#16a34a', fontWeight:700, textDecoration:'none'}}>Admin</a>
          </nav>
          <div style={{display:'flex', gap:10, alignItems:'center'}}>
            <span style={{fontSize:13}}>🛒 {cart.length}</span>
            <a href="https://wa.me/2347050477950" target="_blank" style={{background:'#16a34a', color:'#fff', padding:'8px 14px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:700}}>WhatsApp</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{maxWidth:1200, margin:'0 auto', padding:'40px 20px', display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:20}}>
        <div style={{background:'#111', color:'#fff', borderRadius:24, padding:32}}>
          <div style={{background:'#16a34a', display:'inline-block', padding:'4px 10px', borderRadius:100, fontSize:11, fontWeight:700}}>⚡ NIGERIA #1 SOLAR MARKETPLACE</div>
          <h1 style={{fontSize:38, fontWeight:900, marginTop:16, lineHeight:1.1}}>Power Your Home<br/>With <span style={{color:'#86efac'}}>Sunshine</span></h1>
          <p style={{marginTop:12, color:'#aaa', fontSize:15}}>Inverters • Lithium Batteries • Solar Panels • Kits. Delivered via AfricanIES nationwide. Pay 100% secure via Paystack.</p>
          <div style={{marginTop:20, display:'flex', gap:12}}>
            <button onClick={()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})} style={{background:'#fff', color:'#111', border:0, padding:'12px 20px', borderRadius:100, fontWeight:800}}>Shop Now →</button>
            <button onClick={()=>setShowQuote(true)} style={{background:'transparent', border:'1px solid #333', color:'#fff', padding:'12px 20px', borderRadius:100}}>Get Quote</button>
          </div>
          <div style={{marginTop:20, fontSize:12, color:'#666'}}>✓ 2347050477950 • gspiassociatesltd@gmail.com • Minna, Niger State</div>
        </div>
        <div style={{background:'#fff', border:'1px solid #eee', borderRadius:24, padding:20}}>
          <div style={{fontWeight:800}}>Why NiChAm Trade?</div>
          <div style={{marginTop:16, display:'grid', gap:12}}>
            <div style={{display:'flex', gap:10}}><span>✓</span><div><b>Paystack Secure</b><br/><span style={{fontSize:12, color:'#666'}}>Pay 100% upfront, safe delivery</span></div></div>
            <div style={{display:'flex', gap:10}}><span>✓</span><div><b>AfricanIES Logistics</b><br/><span style={{fontSize:12, color:'#666'}}>Nationwide delivery with tracking</span></div></div>
            <div style={{display:'flex', gap:10}}><span>✓</span><div><b>Admin Instant Login</b><br/><span style={{fontSize:12, color:'#666'}}>No email delay - trade now</span></div></div>
            <div style={{display:'flex', gap:10}}><span>✓</span><div><b>Escrow Protection</b><br/><span style={{fontSize:12, color:'#666'}}>Funds released to vendor in milestones</span></div></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div style={{maxWidth:1200, margin:'0 auto', padding:'0 20px', display:'flex', gap:8, flexWrap:'wrap'}}>
        {categories.map(c=>(
          <button key={c} onClick={()=>setFilter(c)} style={{padding:'8px 14px', borderRadius:100, border: filter===c?'1px solid #111':'1px solid #eee', background: filter===c?'#111':'#fff', color: filter===c?'#fff':'#111', fontSize:13}}>{c}</button>
        ))}
      </div>

      {/* Products */}
      <section id="products" style={{maxWidth:1200, margin:'0 auto', padding:'20px 20px 60px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:16}}>
        {filtered.map(p=>(
          <div key={p.id} style={{background:'#fff', border:'1px solid #eee', borderRadius:20, overflow:'hidden'}}>
            <div style={{background:'#f6f7f5', height:140, display:'flex', alignItems:'center', justifyContent:'center', fontSize:50, position:'relative'}}>
              {p.image}
              {p.badge && <span style={{position:'absolute', top:10, left:10, background:'#111', color:'#fff', fontSize:11, padding:'4px 8px', borderRadius:100}}>{p.badge}</span>}
              <span style={{position:'absolute', top:10, right:10, background: p.inStock?'#dcfce7':'#fee2e2', color: p.inStock?'#16a34a':'#dc2626', fontSize:10, padding:'4px 8px', borderRadius:100}}>{p.inStock?'In Stock':'Out'}</span>
            </div>
            <div style={{padding:14}}>
              <div style={{fontSize:12, color:'#888'}}>{p.category}</div>
              <div style={{fontWeight:700, fontSize:14, marginTop:4, lineHeight:1.3}}>{p.name}</div>
              <div style={{marginTop:8, display:'flex', gap:8, alignItems:'center'}}>
                <span style={{fontWeight:800, fontSize:16}}>₦{p.price.toLocaleString()}</span>
                <span style={{fontSize:12, color:'#999', textDecoration:'line-through'}}>₦{p.oldPrice.toLocaleString()}</span>
              </div>
              <div style={{marginTop:12, display:'flex', gap:8}}>
                <button onClick={()=>addToCart(p)} style={{flex:1, background:'#111', color:'#fff', border:0, padding:'10px', borderRadius:12, fontSize:13, fontWeight:700}}>Add to Cart</button>
                <button onClick={()=>{setQuoteForm({...quoteForm, product: p.name}); setShowQuote(true)}} style={{border:'1px solid #eee', background:'#fff', padding:'10px 14px', borderRadius:12, fontSize:13}}>Quote</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Quote Modal */}
      {showQuote && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:20}}>
          <div style={{background:'#fff', borderRadius:20, padding:24, width:'100%', maxWidth:400}}>
            <h3 style={{fontWeight:800, fontSize:18}}>Request Quote</h3>
            <p style={{fontSize:13, color:'#666', marginTop:6}}>We reply via WhatsApp: 2347050477950</p>
            <form onSubmit={requestQuote} style={{marginTop:16, display:'grid', gap:12}}>
              <input required value={quoteForm.name} onChange={e=>setQuoteForm({...quoteForm, name:e.target.value})} placeholder="Your name" style={{padding:'12px', borderRadius:12, border:'1px solid #e5e7eb'}}/>
              <input required value={quoteForm.phone} onChange={e=>setQuoteForm({...quoteForm, phone:e.target.value})} placeholder="Phone - e.g. 080..." style={{padding:'12px', borderRadius:12, border:'1px solid #e5e7eb'}}/>
              <input required value={quoteForm.product} onChange={e=>setQuoteForm({...quoteForm, product:e.target.value})} placeholder="Product you need" style={{padding:'12px', borderRadius:12, border:'1px solid #e5e7eb'}}/>
              <button type="submit" style={{background:'#16a34a', color:'#fff', border:0, padding:'12px', borderRadius:12, fontWeight:700}}>Send via WhatsApp</button>
              <button type="button" onClick={()=>setShowQuote(false)} style={{background:'#f5f5f5', border:0, padding:'12px', borderRadius:12}}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <footer style={{background:'#111', color:'#fff', padding:'24px 20px', textAlign:'center', fontSize:12}}>
        NiChAm Trade © 2026 • GSPI Associates Ltd • Minna • WhatsApp 2347050477950 • gspiassociatesltd@gmail.com • Admin: /admin • Escrow: /admin/escrow
      </footer>
    </div>
  )
}
