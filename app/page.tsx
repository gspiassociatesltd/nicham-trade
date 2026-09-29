'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import QuoteModal from './components/QuoteModal'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState<'all'|'china'|'usa'>('all')
  const [loading, setLoading] = useState(true)
  const [debug, setDebug] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      // Try status=available first, fallback to all if empty (per Master Doc)
      let { data, error } = await supabase.from('products').select('*').eq('status','available').order('created_at',{ascending:false})
      if (error) setDebug('Error status=available: ' + error.message)
      if (!data || data.length===0) {
        const res2 = await supabase.from('products').select('*').order('created_at',{ascending:false}).limit(20)
        if (res2.data && res2.data.length>0) {
          data = res2.data
          setDebug(`Fallback: found ${res2.data.length} products without status filter`)
        } else {
          setDebug('products table empty - add test data in Supabase SQL')
        }
      }
      if (data) setProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = products.filter(p => {
    if (filter==='all') return true
    return (p.origin||'china').toLowerCase() === filter
  })

  function feeBadge(p:any){
    const base = Number(p.price_ngn || p.landed_price_ngn || 280000)
    const isNew = p.is_new_invention
    let rate = 0.10
    if(isNew) rate = 0.12
    else if(base > 2000000) rate = 0.08
    return { rate, text: isNew ? '12% New Invention' : base>2000000 ? '8% >₦2M' : '10% Standard', landed: Math.round(base * (1+rate)) }
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <header style={{ padding: '14px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position:'sticky', top:0, background:'#fff', zIndex:10 }}>
        <div style={{ fontWeight: 900, fontSize: 20 }}>NiChAm Trade • 10% Platform Fee</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/admin" style={{ fontSize: 12, color: '#666', textDecoration: 'none', border:'1px solid #eee', padding:'6px 12px', borderRadius:100 }}>Admin AI Compare</a>
          <a href={`https://wa.me/2347050477950`} target="_blank" style={{ background: '#16a34a', color: '#fff', padding: '8px 14px', borderRadius: 100, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>WhatsApp: 07050477950</a>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ background: '#f9fafb', borderRadius: 20, padding: 20, border: '1px solid #eee' }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Shop China & USA - Landed Cost Valid 3 Days - AI Price Checked vs Jumia/Kara</h1>
          <p style={{ fontSize: 13, color: '#111', marginTop: 6, background:'#fffbeb', padding:'8px 12px', borderRadius:12, border:'1px solid #fde68a' }}>
            <b>NEW per Master Doc v2.2 Rule 13F:</b> Factory + shipping + duty + <b>10% platform fee (8% if {'>'}₦2M, 12% new inventions like canoe engine)</b>. AI compares vs Jumia/Kara/Konga before admin forwards. Valid 3 Days Only. Self-clear 40% fee (60% off).
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap:'wrap' }}>
            <button onClick={() => setFilter('all')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='all'?'#111':'#fff', color: filter==='all'?'#fff':'#111', cursor: 'pointer', fontWeight:700 }}>All ({products.length})</button>
            <button onClick={() => setFilter('china')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='china'?'#111':'#fff', color: filter==='china'?'#fff':'#111', cursor: 'pointer' }}>Shop China</button>
            <button onClick={() => setFilter('usa')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='usa'?'#111':'#fff', color: filter==='usa'?'#fff':'#111', cursor: 'pointer' }}>Shop USA</button>
            <span style={{ fontSize:11, color:'#666', alignSelf:'center', marginLeft:8 }}>{debug}</span>
          </div>
        </div>

        {loading ? <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>Loading products from Supabase... {debug}</div> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginTop: 20 }}>
            {filtered.map(p => {
              const fee = feeBadge(p)
              return (
              <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 16, overflow: 'hidden', background: '#fff' }}>
                <div style={{ height: 160, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color:'#666', flexDirection:'column' }}>
                  {p.image_url ? <img src={p.image_url} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <span style={{fontSize:40}}>📦</span>}
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, lineHeight: '1.3' }}>{p.title} {p.is_new_invention && <span style={{background:'#111', color:'#fff', fontSize:10, padding:'2px 6px', borderRadius:100}}>🔥 NEW</span>}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{(p.origin||'china').toUpperCase()} • {p.category||'General'} • {fee.text}</div>
                  <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 16 }}>₦{Number(fee.landed).toLocaleString()}</div>
                      <div style={{ fontSize: 10, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 100, display: 'inline-block', marginTop: 2 }}>Valid 3 Days • Fee {(fee.rate*100).toFixed(0)}%</div>
                    </div>
                    <button onClick={() => setSelected(p)} style={{ background: '#111', color: '#fff', padding: '10px 14px', borderRadius: 100, border: 0, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>Get Quote - AI Checked</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
        {filtered.length===0 && !loading && (
          <div style={{ padding: 20, textAlign: 'center', color: '#999', border:'1px dashed #ddd', borderRadius:16, marginTop:20 }}>
            No products for {filter} - Add in Supabase SQL:<br/>
            <code style={{fontSize:11, background:'#f9fafb', padding:8, borderRadius:8, display:'block', marginTop:8, textAlign:'left', whiteSpace:'pre-wrap'}}>
INSERT INTO products (title, description, price_ngn, landed_price_ngn, origin, status, is_verified) VALUES ('3KVA Hybrid Inverter 24V - Must', 'AI compared vs Jumia ₦350k', 280000, 308000, 'china', 'available', true);
            </code>
            <div style={{marginTop:8, fontSize:11}}>{debug}</div>
          </div>
        )}
      </div>

      {selected && <QuoteModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
