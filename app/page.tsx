'use client'
import { useState, useEffect } from 'react'
import QuoteModal from './components/QuoteModal'

interface ProductButton { id: string; name: string; links: any; active: boolean }

export default function Home() {
  const [buttons, setButtons] = useState<ProductButton[]>([])
  const [selectedButton, setSelectedButton] = useState<ProductButton | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  useEffect(() => { loadButtons() }, [])

  async function loadButtons() {
    try {
      const res = await fetch('/api/product-buttons')
      const data = await res.json()
      if (data.buttons) {
        const active = data.buttons.filter((b: any) => b.active)
        setButtons(active)
        if (active.length > 0) selectButton(active[0])
      }
    } catch {}
  }

  async function selectButton(btn: ProductButton) {
    setSelectedButton(btn)
    setLoading(true)
    setProducts([])
    try {
      const res = await fetch('/api/scout1688?buttonId=' + btn.id + '&buttonName=' + encodeURIComponent(btn.name))
      const data = await res.json()
      setProducts(data.products || [])
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ background: '#fff', borderBottom: '2px solid #0f172a', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 56, height: 56, background: '#0f172a', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 28 }}>N</span>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 26 }}>NiChAm Trade</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>SOLAR & INDUSTRIAL CHEMICAL MARKETPLACE • EU/US STANDARDS ONLY • DDP TO PREMISES • VALID 3 DAYS</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ background: '#22c55e', color: '#fff', padding: '8px 16px', borderRadius: 100, fontSize: 11, fontWeight: 800 }}>{buttons.length} CATEGORIES • DDP LAGOS • VALID 3 DAYS</div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Powering Nigeria – Solar & Industrial Chemicals – DDP to Your Premises</h1>
          <p style={{ fontSize: 13, color: '#475569', margin: '8px auto 0', maxWidth: 800 }}>Only EU/US standards – IEC 62619 • UL1973 • CE • UN38.3 • REACH • ISO 9001 – Not China GB only – Grade A+ • 8000 Cycles • DDP Lagos • Valid 3 Days • 30% verification / 60% FOB+Freight / 10% code scan</p>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', background: '#fff', padding: 12, borderRadius: 16, border: '1px solid #e2e8f0' }}>
          {buttons.map(btn => (
            <button key={btn.id} onClick={() => selectButton(btn)} style={{ background: selectedButton?.id === btn.id ? '#0f172a' : '#f1f5f9', color: selectedButton?.id === btn.id ? '#fff' : '#334155', padding: '10px 16px', borderRadius: 100, fontWeight: 800, fontSize: 12 }}>
              {btn.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px 40px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>Scanning...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {products.map(p => (
              <div key={p.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f8fafc', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, background: '#0f172a', color: '#fff', padding: '4px 8px', borderRadius: 100 }}>MOQ: {p.moq}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: 100 }}>{p.standards?.[0]} • {p.grade}</span>
                </div>
                <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontWeight: 900, fontSize: 14 }}>{p.model}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>{p.desc}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 8 }}>Capacity: {p.capacity} • Voltage: {p.voltage} • DDP Lagos: ${p.ddpLagos} • Valid 3 Days</div>
                  <button onClick={() => setSelectedProduct(p)} style={{ width: '100%', marginTop: 12, background: '#0f172a', color: '#fff', padding: '11px', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>
                    Get DDP Quote 30/60/10 • MOQ {p.moq}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && <QuoteModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
