'use client'
import { useState, useEffect } from 'react'
import QuoteModal from './components/QuoteModal'
interface Btn { id: string; name: string; links: any; active: boolean; subOptions?: string[] }
export default function Home() {
  const [buttons, setButtons] = useState<Btn[]>([])
  const [selectedButton, setSelectedButton] = useState<Btn | null>(null)
  const [selectedSubOption, setSelectedSubOption] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const SUB = ['Pharmaceuticals - Paracetamol, Sorbitol','Commodity Chemicals - Caustic Soda, HCl, Nitric, Stearic, Acetic, H2O2','Paint Chemicals - Natrosol, Calcium Carbonate','Water Treatment - Soda Ash, Calcium Hypochlorite, PAC, Aluminum Sulphate, Ferric Chloride']
  useEffect(() => { loadButtons() }, [])
  async function loadButtons() {
    try {
      const res = await fetch('/api/product-buttons')
      const data = await res.json()
      if (data.buttons) {
        const active = data.buttons.filter((b: any) => b.active)
        const grouped = active.filter((b: any) => !b.name.toLowerCase().includes('industrial chemicals'))
        grouped.push({ id: 'btn_industrial', name: 'Industrial Chemicals', links: {}, active: true, subOptions: SUB })
        setButtons(grouped)
        if (grouped.length > 0) selectButton(grouped[0])
      }
    } catch {
      const fallback = [
        { id: 'btn_batteries', name: 'Solar Batteries', links: {}, active: true },
        { id: 'btn_inverters', name: 'Solar Inverters', links: {}, active: true },
        { id: 'btn_agri', name: 'Agri Solar Products', links: {}, active: true },
        { id: 'btn_ebikes', name: 'Solar Bikes', links: {}, active: true },
        { id: 'btn_industrial', name: 'Industrial Chemicals', links: {}, active: true, subOptions: SUB }
      ]
      setButtons(fallback)
      selectButton(fallback[0] as any)
    }
  }
  async function selectButton(btn: Btn, subOption?: string) {
    setSelectedButton(btn)
    if (btn.id === 'btn_industrial' && subOption) setSelectedSubOption(subOption)
    else if (btn.id === 'btn_industrial' && !subOption) { setSelectedSubOption(SUB[0]); subOption = SUB[0] }
    else setSelectedSubOption(null)
    setLoading(true)
    setProducts([])
    try {
      let queryName = btn.name
      if (btn.id === 'btn_industrial' && subOption) {
        if (subOption.includes('Pharmaceuticals')) queryName = 'Industrial Chemicals - Pharmaceuticals'
        else if (subOption.includes('Commodity')) queryName = 'Industrial Chemicals - Commodity Chemicals'
        else if (subOption.includes('Paint')) queryName = 'Industrial Chemicals - Paint Chemicals'
        else if (subOption.includes('Water')) queryName = 'Industrial Chemicals - Water Treatment'
      }
      const res = await fetch('/api/scout1688?buttonId=' + btn.id + '&buttonName=' + encodeURIComponent(queryName))
      const data = await res.json()
      setProducts(data.products || [])
    } catch { setProducts([]) }
    finally { setLoading(false) }
  }
  function fallbackImg(p: any) {
    const name = encodeURIComponent(p.model + ' ' + p.capacity)
    if (p.id?.startsWith('BIKE-')) return 'https://dummyimage.com/600x400/0f172a/ffffff&text=' + name
    if (p.id?.startsWith('AGRI-')) return 'https://dummyimage.com/600x400/22c55e/ffffff&text=' + name
    if (p.id?.startsWith('PH-') || p.id?.startsWith('CC-') || p.id?.startsWith('PC-') || p.id?.startsWith('WT-')) return 'https://dummyimage.com/600x400/1e40af/ffffff&text=' + name
    return '/motoma/M68PW.jpg'
  }
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ background: '#fff', borderBottom: '2px solid #0f172a', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 56, height: 56, background: '#0f172a', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontWeight: 900, fontSize: 28 }}>N</span></div>
            <div><div style={{ fontWeight: 900, fontSize: 26 }}>NiChAm Trade</div><div style={{ fontSize: 11, color: '#64748b' }}>SOLAR & INDUSTRIAL CHEMICAL MARKETPLACE • EU/US STANDARDS ONLY • DDP TO PREMISES • VALID 3 DAYS • SOURCE URL SAVED</div></div>
          </div>
          <div style={{ background: '#22c55e', color: '#fff', padding: '8px 16px', borderRadius: 100, fontSize: 11, fontWeight: 800 }}>5 CATEGORIES • DDP LAGOS • VALID 3 DAYS • CORRECT PICTURES</div>
        </div>
      </header>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center' }}><h1 style={{ fontSize: 22, fontWeight: 800 }}>Powering Nigeria – Solar & Industrial Chemicals – DDP to Your Premises</h1><p style={{ fontSize: 13, color: '#475569', margin: '8px auto 0', maxWidth: 900 }}>Only EU/US standards – IEC 62619 • UL1973 • CE • UN38.3 • REACH • ISO 9001 – Not China GB only – Grade A+ • 8000 Cycles • DDP Lagos • Valid 3 Days • 30% verification / 60% FOB+Freight / 10% code scan • Source URL saved</p></div>
        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', background: '#fff', padding: 12, borderRadius: 16, border: '1px solid #e2e8f0' }}>
          {buttons.map(btn => (<button key={btn.id} onClick={() => selectButton(btn)} style={{ background: selectedButton?.id === btn.id ? '#0f172a' : '#f1f5f9', color: selectedButton?.id === btn.id ? '#fff' : '#334155', padding: '10px 16px', borderRadius: 100, fontWeight: 800, fontSize: 12, cursor: 'pointer', border: 'none' }}>{btn.name}</button>))}
        </div>
        {selectedButton?.id === 'btn_industrial' && (
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', background: '#f0fdf4', padding: 12, borderRadius: 12, border: '1px solid #bbf7d0' }}>
            <div style={{ width: '100%', textAlign: 'center', fontSize: 11, fontWeight: 800, color: '#166534', marginBottom: 4 }}>Industrial Chemicals – Choose Category – 4 Options – EU/US Standards Only:</div>
            {SUB.map(opt => (<button key={opt} onClick={() => selectButton(selectedButton, opt)} style={{ background: selectedSubOption === opt ? '#166534' : '#fff', color: selectedSubOption === opt ? '#fff' : '#166534', border: '1px solid #bbf7d0', padding: '8px 12px', borderRadius: 100, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>{opt}</button>))}
          </div>
        )}
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px 40px' }}>
        {loading ? (<div style={{ textAlign: 'center', padding: 40 }}>Loading {selectedButton?.name} {selectedSubOption ? ' - ' + selectedSubOption : ''}...</div>) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {products.map(p => (
              <div key={p.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 200, background: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }} loading="lazy" onError={(e: any) => { e.target.src = fallbackImg(p) }} />
                  <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(15,23,42,0.9)', color: '#fff', padding: '4px 8px', borderRadius: 100, fontSize: 9, fontWeight: 800 }}>{p.voltage} • {p.capacity}</div>
                  <div style={{ position: 'absolute', top: 8, right: 8, background: '#22c55e', color: '#fff', padding: '4px 8px', borderRadius: 100, fontSize: 9, fontWeight: 800 }}>MOQ: {p.moq}</div>
                  <div style={{ position: 'absolute', bottom: 8, left: 8, background: '#fff', border: '1px solid #e2e8f0', color: '#166534', padding: '3px 6px', borderRadius: 100, fontSize: 8, fontWeight: 800 }}>{p.standards?.[0]} • {p.grade}</div>
                  <div style={{ position: 'absolute', bottom: 8, right: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '3px 6px', borderRadius: 100, fontSize: 7, fontWeight: 800 }}>{p.sourcePlatform}</div>
                </div>
                <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontWeight: 900, fontSize: 14 }}>{p.model}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>{p.desc}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 8 }}>Capacity: {p.capacity} • Voltage: {p.voltage} • Est. DDP Lagos: ${p.ddpLagos} • Valid 3 Days</div>
                  <div style={{ fontSize: 9, color: '#166534', marginTop: 6, background: '#f0fdf4', padding: '6px 8px', borderRadius: 8, border: '1px solid #bbf7d0', wordBreak: 'break-all' }}><b>Source:</b> {p.sourceCompany} – {p.sourcePlatform}<br /><b>Source URL saved:</b> {p.sourceUrl}</div>
                  <div style={{ fontSize: 10, color: '#0f172a', marginTop: 6, background: '#f8fafc', padding: '6px 8px', borderRadius: 8, border: '1px dashed #cbd5e1' }}><b>Quote needed:</b> Est. DDP Lagos ${p.ddpLagos} is scan estimate – Click to lock DDP to your premises – Valid 3 Days – Source URL saved</div>
                  <button onClick={() => setSelectedProduct(p)} style={{ width: '100%', marginTop: 12, background: '#0f172a', color: '#fff', padding: '11px', borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer', border: 'none' }}>Get Exact DDP to Premises Quote • MOQ {p.moq}</button>
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
