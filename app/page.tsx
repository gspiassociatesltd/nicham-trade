'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import QuoteModal from './components/QuoteModal'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState<'all'|'china'|'usa'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await supabase.from('products').select('*').eq('status','available').order('created_at',{ascending:false})
      if (data) setProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = products.filter(p => {
    if (filter==='all') return true
    return (p.origin||'china').toLowerCase() === filter
  })

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <header style={{ padding: '14px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position:'sticky', top:0, background:'#fff', zIndex:10 }}>
        <div style={{ fontWeight: 900, fontSize: 20 }}>NiChAm Trade</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/admin" style={{ fontSize: 12, color: '#666', textDecoration: 'none', border:'1px solid #eee', padding:'6px 12px', borderRadius:100 }}>Admin</a>
          <a href={`https://wa.me/2347050477950`} target="_blank" style={{ background: '#16a34a', color: '#fff', padding: '8px 14px', borderRadius: 100, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>WhatsApp: 07050477950</a>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ background: '#f9fafb', borderRadius: 20, padding: 20, border: '1px solid #eee' }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Shop China & USA - Landed Cost Valid 3 Days</h1>
          <p style={{ fontSize: 13, color: '#666', marginTop: 6 }}>Factory prices + shipping + duty + ₦85k platform fee hidden. No breakdown shown to buyer per PRD.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button onClick={() => setFilter('all')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='all'?'#111':'#fff', color: filter==='all'?'#fff':'#111', cursor: 'pointer', fontWeight:700 }}>All ({products.length})</button>
            <button onClick={() => setFilter('china')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='china'?'#111':'#fff', color: filter==='china'?'#fff':'#111', cursor: 'pointer' }}>Shop China</button>
            <button onClick={() => setFilter('usa')} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #eee', background: filter==='usa'?'#111':'#fff', color: filter==='usa'?'#fff':'#111', cursor: 'pointer' }}>Shop USA</button>
          </div>
        </div>

        {loading ? <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>Loading products from Supabase...</div> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginTop: 20 }}>
            {filtered.map(p => (
              <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 16, overflow: 'hidden', background: '#fff' }}>
                <div style={{ height: 160, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{p.image_url ? '🖼️' : '📦'}</div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, lineHeight: '1.3' }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{p.origin?.toUpperCase()} • {p.category||'General'}</div>
                  <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 16 }}>₦{Number(p.price_ngn || p.landed_price_ngn || 0).toLocaleString()}</div>
                      <div style={{ fontSize: 10, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 100, display: 'inline-block', marginTop: 2 }}>Valid 3 Days</div>
                    </div>
                    <button onClick={() => setSelected(p)} style={{ background: '#111', color: '#fff', padding: '10px 14px', borderRadius: 100, border: 0, cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>Get Quote - Valid 3 Days</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {filtered.length===0 && !loading && <div style={{ padding: 40, textAlign: 'center', color: '#999', border:'1px dashed #ddd', borderRadius:16, marginTop:20 }}>No products for {filter} - Add in Supabase products table with status=available</div>}
      </div>

      {selected && <QuoteModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
