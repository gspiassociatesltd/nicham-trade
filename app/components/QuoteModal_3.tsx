'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function QuoteModal({ product, onClose }: { product: any, onClose: () => void }) {
  const [form, setForm] = useState({ customer_name: '', phone: '', momo_account: '', quantity: 1, location: '' })
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!form.customer_name || !form.phone || !form.momo_account) { alert('Name, phone and MoMo account required'); return }
    const moqText = product.moq || '12 pcs'
    const moqNum = parseInt(moqText) || 1
    const isKwhMoq = moqText.includes('kWh') || moqText.includes('MWh')
    if (!isKwhMoq && form.quantity < moqNum) { alert(`MOQ for ${product.model} is ${moqText}. Qty >= ${moqNum}`); return }
    setLoading(true)
    try {
      const { data, error } = await supabase.from('africanies_quotes').insert({
        product_title: `${product.model} - ${product.name} - MOQ ${product.moq} - MoMo ${form.momo_account}`,
        customer_name: form.customer_name,
        phone: form.phone,
        quantity: form.quantity,
        location: form.location,
        status: 'new_momo'
      }).select().single()
      if (error) throw error

      const message = `NiChAm Trade - MOTOMA DDP Lagos Quote - MoMo to Flutterwave Escrow
Product: ${product.name}
Model: ${product.model}
MOQ: ${product.moq}
Qty: ${form.quantity}
Location: ${form.location}
Customer: ${form.customer_name}
Phone: ${form.phone}
MoMo Account: ${form.momo_account}
DDP Lagos All Inclusive Valid 3 Days
Quote ID: ${data.id.slice(0,8)}

Payment Flow: MoMo ${form.momo_account} -> Flutterwave Escrow (Licensed) -> Flutterwave pays Factory, Customs, Delivery, NiChAm Platform
Flutterwave charges to buyer account`

      try { await supabase.from('whatsapp_logs').insert({ quote_id: data.id, phone: form.phone, message }) } catch {}

      const waUrl = `https://wa.me/2347050477950?text=${encodeURIComponent(message)}`
      window.open(waUrl, '_blank')
      alert(`Quote saved with MoMo ${form.momo_account}! ID ${data.id.slice(0,8)}`)
      onClose()
    } catch (e: any) { alert('Error: ' + e.message) } finally { setLoading(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 24, width: '100%', maxWidth: 440 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Get DDP Lagos Quote - MoMo → Escrow</div>
            <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700, marginTop: 2 }}>MOQ: {product.moq} • MoMo to Flutterwave Escrow • Valid 3 Days</div>
          </div>
          <button onClick={onClose} style={{ border: 0, background: '#f3f4f6', width: 28, height: 28, borderRadius: 100, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, marginTop: 8 }}>{product.name}</div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{product.model} • MOQ {product.moq}</div>
        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          <input placeholder="Your Name e.g. Godwin Abaniwo" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb' }} />
          <input placeholder="Phone e.g. 08087364309" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb' }} />
          <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 12, padding: '8px 12px' }}>
            <input placeholder="MTN MoMo Account e.g. 08087364309 (Required)" value={form.momo_account} onChange={e => setForm({ ...form, momo_account: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #fde68a', background: '#fff' }} />
            <div style={{ fontSize: 10, color: '#92400e', marginTop: 4, fontWeight: 700 }}>Registered buyers must have MoMo account - Payment to Flutterwave Escrow from MoMo</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <input type="number" min={1} value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', width: '100%' }} />
              <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 700, marginTop: 4, textAlign: 'center' }}>MOQ: {product.moq}</div>
            </div>
            <input placeholder="Location e.g. Lokoja" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', flex: 1 }} />
          </div>
          <div style={{ fontSize: 10, color: '#64748b', background: '#f9fafb', padding: '8px 12px', borderRadius: 12 }}>MoMo → Flutterwave Escrow - Flutterwave charges to buyer - Escrow protects buyer - License compliant</div>
          <button onClick={submit} disabled={loading} style={{ background: '#0f172a', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 800, border: 0, cursor: 'pointer' }}>{loading ? 'Saving...' : 'Submit Quote with MoMo →'}</button>
        </div>
      </div>
    </div>
  )
}
