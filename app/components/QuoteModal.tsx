'use client'
import { useState } from 'react'
export default function QuoteModal({ product, onClose }: { product: any; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', city: 'Lagos', quantity: '', premises: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  async function handleSubmit() {
    setSending(true)
    try {
      const payload = {
        productId: product.id, productModel: product.model, productName: product.name,
        productImage: product.image, originalImageUrl: product.originalImageUrl,
        sourceUrl: product.sourceUrl, sourceCompany: product.sourceCompany, sourcePlatform: product.sourcePlatform,
        capacity: product.capacity, voltage: product.voltage, moq: product.moq, standards: product.standards, grade: product.grade,
        priceUSD: product.priceUSD, ddpLagosEstimate: product.ddpLagos,
        buyer: form,
        ddpRequest: { to: 'DDP to Premises - ' + form.city + ' - ' + form.premises, paymentSplit: product.paymentSplit, psiRequired: true },
        quoteDelivery: { deliverTo: product.sourceCompany, deliverToUrl: product.sourceUrl, deliverToPlatform: product.sourcePlatform, note: 'Quote must be delivered to company from whose page item and picture was pulled - Source URL saved' },
        savedAt: new Date().toISOString()
      }
      const res = await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) setSent(true)
      else alert('Failed - Quote will be delivered to ' + product.sourceCompany)
    } catch { alert('Error - Will be delivered to ' + product.sourceCompany) }
    finally { setSending(false) }
  }
  if (sent) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, maxWidth: 480, width: '100%' }}>
          <div style={{ fontWeight: 900, fontSize: 18, color: '#166534' }}>Quote Sent to {product.sourceCompany}</div>
          <div style={{ marginTop: 12, fontSize: 12 }}>Source URL saved: {product.sourceUrl} - Quote delivered to company from whose page item and picture was pulled</div>
          <button onClick={onClose} style={{ marginTop: 16, width: '100%', background: '#0f172a', color: '#fff', padding: 12, borderRadius: 10, fontWeight: 800 }}>Close</button>
        </div>
      </div>
    )
  }
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20, overflowY: 'auto' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 20, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 900 }}>{product.model} - {product.name}</div>
            <div style={{ fontSize: 10, color: '#166534', marginTop: 6, background: '#f0fdf4', padding: '6px 8px', borderRadius: 8, border: '1px solid #bbf7d0' }}>
              Source: {product.sourceCompany} - {product.sourcePlatform}<br/>Source URL saved: {product.sourceUrl}<br/>Quote delivery: Will be delivered to this company
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', borderRadius: 100, width: 32, height: 32, fontWeight: 800 }}>x</button>
        </div>
        <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
          <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
          <input placeholder="Company Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
          <input placeholder="Phone / WhatsApp" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
          <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
            <option>Lagos</option><option>Abuja</option><option>Kano</option><option>Port Harcourt</option><option>Enugu</option><option>Ibadan</option><option>Other</option>
          </select>
          <input placeholder="Exact Premises Address" value={form.premises} onChange={e => setForm({ ...form, premises: e.target.value })} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
          <input placeholder={'Quantity - MOQ ' + product.moq} value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
        </div>
        <button onClick={handleSubmit} disabled={sending || !form.name || !form.phone} style={{ marginTop: 14, width: '100%', background: sending ? '#94a3b8' : '#0f172a', color: '#fff', padding: 12, borderRadius: 10, fontWeight: 800 }}>
          {sending ? 'Sending to ' + product.sourceCompany + '...' : 'Send DDP Quote to ' + product.sourceCompany + ' Via ' + product.sourcePlatform}
        </button>
        <div style={{ marginTop: 8, fontSize: 10, color: '#64748b', textAlign: 'center' }}>Quote will be delivered to company from whose page item and picture was pulled - Source URL: {product.sourceUrl} - Saved</div>
      </div>
    </div>
  )
}
