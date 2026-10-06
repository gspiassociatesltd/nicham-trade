'use client'
import { useState, useEffect } from 'react'
import QuoteModal from './components/QuoteModal'

interface ProductButton {
  id: string
  name: string
  links: { motoma: string, 【entity-alibaba¦canonical_name=Alibaba】: string, madeinchina: string }
  active: boolean
}

export default function Home() {
  const [buttons, setButtons] = useState<ProductButton[]>([])
  const [selectedButton, setSelectedButton] = useState<ProductButton | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [scanInfo, setScanInfo] = useState<any>(null)

  useEffect(() => { loadButtons() }, [])

  async function loadButtons() {
    try {
      const res = await fetch('/api/product-buttons')
      const data = await res.json()
      if (data.buttons) {
        const activeButtons = data.buttons.filter((b: ProductButton) => b.active)
        setButtons(activeButtons)
        if (activeButtons.length > 0) {
          selectButton(activeButtons[0])
        }
      }
    } catch {}
  }

  async function selectButton(btn: ProductButton) {
    setSelectedButton(btn)
    setLoadingProducts(true)
    setProducts([])
    try {
      const res = await fetch(`/api/scout1688?buttonId=${btn.id}&buttonName=${encodeURIComponent(btn.name)}`)
      const data = await res.json()
      setProducts(data.products || [])
      setScanInfo(data)
    } catch {
      setProducts([])
    } finally {
      setLoadingProducts(false)
    }
  }

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ background: '#ffffff', borderBottom: '2px solid #0f172a', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #0f172a 0%, #22c55e 100%)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 28, letterSpacing: -1 }}>N</span>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 26, lineHeight: 1, letterSpacing: -0.5, color: '#0f172a' }}>
                NiChAm Trade
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginTop: 2, letterSpacing: 0.3 }}>
                SOLAR & INDUSTRIAL CHEMICAL MARKETPLACE • EU/US STANDARDS ONLY • DDP TO PREMISES • VALID 3 DAYS
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="/admin/products/subheadings" style={{ background: '#0f172a', color: '#fff', padding: '8px 16px', borderRadius: 100, fontSize: 11, fontWeight: 800, textDecoration: 'none' }}>Admin • Selection Buttons</a>
            <div style={{ background: '#22c55e', color: '#fff', padding: '8px 16px', borderRadius: 100, fontSize: 11, fontWeight: 800 }}>{buttons.length} CATEGORIES • DDP</div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 20px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: -0.3 }}>
            Powering Nigeria – Solar & Industrial Chemicals – DDP to Your Premises
          </h1>
          <p style={{ fontSize: 13, color: '#475569', margin: '8px auto 0', maxWidth: 800, lineHeight: 1.5 }}>
            Only items manufactured to EU/US standards only should be purchased – IEC 62619 • UL1973 • CE • UN38.3 • REACH • ISO 9001 • ASTM – Not China GB only – Grade A+ Cells • 8000 Cycles • 15+ Years • DDP Lagos All Inclusive • Packaging insurance compliant • Valid 3 Days • 30% after verification / 60% FOB+Freight / 10% after delivery triggered by code scan
          </p>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>✓ Grade A+ Cells / ISO REACH</span>
            <span style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>✓ 8000 Cycles / EU/US Std</span>
            <span style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>✓ PSI Report Must Cover 9 Points</span>
            <span style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>✓ Packaging Insurance Compliant</span>
          </div>
        </div>

        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', background: '#fff', padding: 12, borderRadius: 16, border: '1px solid #e2e8f0' }}>
          {buttons.map(btn => (
            <button key={btn.id} onClick={() => selectButton(btn)} style={{ background: selectedButton?.id === btn.id? '#0f172a' : '#f1f5f9', color: selectedButton?.id === btn.id? '#fff' : '#334155', border: selectedButton?.id === btn.id? '2px solid #0f172a' : '1px solid #e2e8f0', padding: '10px 16px', borderRadius: 100, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>
              {btn.name}
            </button>
          ))}
          {buttons.length === 0 && <div style={{ fontSize: 12, color: '#94a3b8' }}>No categories – Admin add selection buttons at /admin/products/subheadings</div>}
        </div>

        {selectedButton && scanInfo && (
          <div style={{ marginTop: 12, background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 12, padding: 12, fontSize: 11, color: '#64748b' }}>
            <b>AI Scan:</b> Button "{selectedButton.name}" – Scanning: {scanInfo.sourcesScanned?.join(' • ')} – Filter: {scanInfo.filterApplied} – Found {scanInfo.total} products – EU/US standards only – Grade A+ – Cheapest same quality – Packaging insurance compliant – Payment 30/60/10 with code scan trigger
          </div>
        )}
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px 40px' }}>
        {loadingProducts? (
          <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>AI scanning Motoma / Alibaba / Made-in-China links for "{selectedButton?.name}" – Filtering EU/US standards only – Grade A+ – Cheapest same quality – Please wait...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {products.map(p => (
              <div key={p.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 220, background: '#ffffff', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }} loading="lazy" onError={(e: any) => e.target.src = '/motoma/M68PW.jpg'} />
                  <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(15,23,42,0.9)', color: '#fff', padding: '5px 10px', borderRadius: 100, fontSize: 10, fontWeight: 800 }}>{p.voltage} • {p.capacity}</div>
                  <div style={{ position: 'absolute', top: 10, right: 10, background: '#22c55e', color: '#fff', padding: '5px 10px', borderRadius: 100, fontSize: 10, fontWeight: 800 }}>MOQ: {p.moq}</div>
                  <div style={{ position: 'absolute', bottom: 10, left: 10, background: '#fff', border: '1px solid #e2e8f0', color: '#166534', padding: '4px 8px', borderRadius: 100, fontSize: 9, fontWeight: 800 }}>EU/US: {p.standards?.slice(0,2).join(', ')}</div>
                </div>
                <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: 0.5 }}>{p.voltage} {p.capacity} MOQ: {p.moq}</div>
                  <div style={{ fontWeight: 900, fontSize: 15, marginTop: 4, color: '#0f172a' }}>{p.model}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#334155', marginTop: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>{p.desc}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 9, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '3px 7px', borderRadius: 100, fontWeight: 700 }}>Grade A+ {p.standards?.[0]}</span>
                    <span style={{ fontSize: 9, background: '#eff6ff', border: '1px solid #bfdbfe', padding: '3px 7px', borderRadius: 100, fontWeight: 700 }}>DDP ${p.ddpLagos}</span>
                    <span style={{ fontSize: 9, background: '#fffbeb', border: '1px solid #fde68a', padding: '3px 7px', borderRadius: 100, fontWeight: 700 }}>PSI Required</span>
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', gap: 8 }}>
                    <button onClick={() => setSelectedProduct(p)} style={{ flex: 1, background: '#0f172a', color: '#fff', border: 0, padding: '11px', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Get DDP Quote 30/60/10 →</button>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 10px', borderRadius: 10, fontSize: 10, fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center' }}>Valid 3 Days</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: 'center', padding: 16, color: '#94a3b8', fontSize: 11, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <b>NiChAm Trade – Solar & Industrial Chemical Marketplace</b> • DDP to Premises All Inclusive • Valid 3 Days • EU/US Standards Only • Only items manufactured to EU/US standards only should be purchased • Grade A+ / ISO / REACH / UL • 8000 Cycles • Packaging insurance compliant • PSI Report must cover 9 points • 30% after verification / 60% FOB+Freight after BL / 10% after delivery triggered by code scan by buyer via /verify-delivery • Flutterwave Escrow MoMo
          <br/><br/>
          Phone: +234 808 7364 309, +234 705 0477 950 • WeChat: wxid_2viy9xivqcfk22 • https://nicham-trade.vercel.app/ • Proc360 DDP Partner (Solar) – AfricanIES DDP Partner (Industrial)
        </div>
      </div>

      {selectedProduct && <QuoteModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
