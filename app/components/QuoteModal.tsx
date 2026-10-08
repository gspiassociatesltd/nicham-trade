'use client'
import { useState } from 'react'

export default function QuoteModal({ product, onClose }: { product: any, onClose: () => void }) {
  const [qty, setQty] = useState(product.moq || '1')
  const [location, setLocation] = useState('Lagos')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [momoNumber, setMomoNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [routing, setRouting] = useState<any>(null)
  const [step, setStep] = useState<'form' | 'routing' | 'success'>('form')

  const handleRequest = async () => {
    if (!qty || !location || !name || !email || !phone) { alert('Fill all required'); return }
    setLoading(true)
    try {
      const userStr = typeof window !== 'undefined' ? localStorage.getItem('nicham_user') : null
      const user = userStr ? JSON.parse(userStr) : { name, email, phone, momoNumber }
      const dispatchRes = await fetch('/api/routing/dispatch', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productUrl: product.sourceUrl || product.image || `https://nicham-trade.com/product/${product.id}`,
          productName: product.name || product.model,
          sourceCompany: product.sourceCompany || product.company || 'Verified Supplier',
          sourcePlatform: product.sourcePlatform || '1688/Alibaba',
          quantity: qty, location, moq: product.moq,
          user: { name, email, phone, momoNumber, ...user }
        })
      })
      const dispatchData = await dispatchRes.json()
      if (!dispatchData.success) throw new Error(dispatchData.error)
      setRouting(dispatchData.routing)
      setStep('routing')
      setTimeout(async () => {
        const compareRes = await fetch('/api/routing/compare', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ routingId: dispatchData.routing.id })
        })
        const compareData = await compareRes.json()
        setRouting((prev: any) => ({ ...prev, compare: compareData }))
        setStep('success')
      }, 1500)
    } catch (e: any) { alert('Error: ' + e.message) }
    setLoading(false)
  }

  if (step === 'routing') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 40, maxWidth: 500, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Routing to 3 Verifiers – AI Selecting Cheapest...</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>AfricanIES vs Proc360 vs Laybel – AI chooses cheapest of 3 before comparing to similar platforms</div>
          <div style={{ marginTop: 20 }}>Sending URL to 3 companies for verification and sourcing – As you have accounts</div>
        </div>
      </div>
    )
  }

  if (step === 'success' && routing) {
    const cheapest = routing.cheapestOf3
    const finalDDP = routing.finalDDP
    const platformFee = routing.platformFee
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20, overflowY: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 16, maxWidth: 700, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ background: '#0f172a', color: '#fff', padding: 20, borderRadius: '16px 16px 0 0' }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>✓ Routed – Cheapest of 3 Selected – Platform Fee Added After</h3>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>Zero-markup transparent – Valid 3 Days – Only DDP</div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#15803d' }}>CHEAPEST OF 3 VERIFIERS</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>{cheapest.provider} – ${cheapest.totalLanded.toFixed(2)} DDP</div>
            </div>
            <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
              {routing.quotes.map((q: any) => (
                <div key={q.provider} style={{ border: `1px solid ${q.provider === cheapest.provider ? '#bbf7d0' : '#e2e8f0'}`, borderRadius: 8, padding: 10, background: q.provider === cheapest.provider ? '#f0fdf4' : '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ fontWeight: q.provider === cheapest.provider ? 700 : 400 }}>{q.provider} {q.provider === cheapest.provider ? '✓ CHEAPEST' : ''}</span>
                    <span style={{ fontWeight: 700 }}>${q.totalLanded.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0f172a', color: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, opacity: 0.8 }}>PLATFORM FEE – AFTER CHEAPEST – TRANSPARENT</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8 }}>{finalDDP.ddpString}</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 8 }}>Cheapest {cheapest.provider} ${cheapest.totalLanded.toFixed(2)} + Fee {platformFee.percent}% (${platformFee.amount.toFixed(2)}) = ${finalDDP.amount.toFixed(2)}</div>
            </div>
            <button onClick={onClose} style={{ width: '100%', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: 14, cursor: 'pointer', fontWeight: 600 }}>Close – Quote Sent to {cheapest.provider}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20, overflowY: 'auto' }}>
      <div style={{ background: '#fff', borderRadius: 16, maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ padding: 20, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Get Exact DDP to Premises Quote – Valid 3 Days</h3>
            <div style={{ fontSize: 11, color: '#64748b' }}>Routes to AfricanIES, Proc360, Laybel – AI chooses cheapest of 3 – Platform fee after</div>
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>X</button>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div><label style={{ fontSize: 12, fontWeight: 600 }}>Quantity * Min {product.moq || '1'}</label><input value={qty} onChange={e => setQty(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
            <div><label style={{ fontSize: 12, fontWeight: 600 }}>Location * DDP to premises</label><select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }}><option>Lagos</option><option>Abuja</option><option>Kano</option><option>Port Harcourt</option><option>Enugu</option><option>Ibadan</option><option>Other</option></select></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label style={{ fontSize: 12, fontWeight: 600 }}>Full Name *</label><input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600 }}>Phone *</label><input value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
            </div>
            <div><label style={{ fontSize: 12, fontWeight: 600 }}>Email *</label><input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
            <div><label style={{ fontSize: 12, fontWeight: 600 }}>MoMo Number – Create MoMo on phone and link – Optional</label><input value={momoNumber} onChange={e => setMomoNumber(e.target.value)} placeholder="MTN MoMo you created on phone – Link to Nicham" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
          </div>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, marginTop: 16, fontSize: 11 }}>
            <div style={{ fontWeight: 600 }}>Routing to 3 companies – You have accounts – Send URL for verification:</div>
            <div>• AfricanIES – $15/kg Lagos – Verification, photo/video, Naira to RMB</div>
            <div>• Proc360 – 7% link – $15 inspection vs $125 Alibaba – 1200+ vetted</div>
            <div>• Laybel – Maritime Transport – Dry ports – Northern corridor</div>
            <div style={{ fontWeight: 600, marginTop: 6 }}>AI chooses cheapest of 3, compares to 1688/Alibaba, adds platform fee AFTER – Zero-markup – Valid 3 Days</div>
          </div>
          <button onClick={handleRequest} disabled={loading} style={{ width: '100%', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: 14, marginTop: 16, cursor: 'pointer', fontWeight: 600 }}>{loading ? 'Routing...' : `Request DDP Quote to ${location} – Route to 3 – AI Cheapest First`}</button>
        </div>
      </div>
    </div>
  )
}
