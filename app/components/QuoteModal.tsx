
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function QuoteModal({ product, onClose }: { product: any, onClose: () => void }) {
  const [form, setForm] = useState({ customer_name: '', phone: '', quantity: 1, location: '', self_clear: false })
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!form.customer_name || !form.phone) { alert('Name and phone required'); return }
    setLoading(true)
    try {
      const platform_fee = form.self_clear ? 35000 : 85000
      const { data, error } = await supabase.from('africanies_quotes').insert({
        product_id: product.id,
        product_title: product.title,
        customer_name: form.customer_name,
        phone: form.phone,
        quantity: form.quantity,
        location: form.location,
        self_clear: form.self_clear,
        platform_fee_ngn: platform_fee,
        status: 'new'
      }).select().single()

      if (error) throw error

      const message = `NiChAm Quote Request\nProduct: ${product.title}\nCustomer: ${form.customer_name}\nPhone: ${form.phone}\nQty: ${form.quantity}\nLocation: ${form.location}\nSelf-Clear: ${form.self_clear ? 'YES (Fee 35k)' : 'NO (Fee 85k)'}\nHidden Platform Fee: ₦${platform_fee.toLocaleString()}\nQuote ID: ${data.id.slice(0,8)}`

      await supabase.from('whatsapp_logs').insert({
        quote_id: data.id,
        phone: form.phone,
        message: message,
        wa_url: `https://wa.me/2347050477950?text=${encodeURIComponent(message)}`
      })

      const waUrl = `https://wa.me/2347050477950?text=${encodeURIComponent(message)}`
      window.open(waUrl, '_blank')
      alert('Quote saved! Opening WhatsApp to 07050477950...')
      onClose()
    } catch (e: any) {
      alert('Error: ' + e.message)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 24, width: '100%', maxWidth: 420, border: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>Get Quote - Valid 3 Days</div>
          <button onClick={onClose} style={{ border: 0, background: '#f3f4f6', width: 28, height: 28, borderRadius: 100, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{product.title} - ₦{Number(product.price_ngn || product.landed_price_ngn || 0).toLocaleString()}</div>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          <input placeholder="Your Name e.g. Godwin Abaniwo" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb' }} />
          <input placeholder="Phone e.g. 08087364309" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" min={1} placeholder="Qty" value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', flex: 1 }} />
            <input placeholder="Location e.g. Abaji" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', flex: 1.5 }} />
          </div>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, background: '#fffbeb', padding: '8px 12px', borderRadius: 12, border: '1px solid #fde68a', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.self_clear} onChange={e => setForm({ ...form, self_clear: e.target.checked })} />
            Self-clear? (Fee ₦35k instead of ₦85k) - Admin sees breakdown
          </label>
          <div style={{ fontSize: 10, color: '#666', background: '#f9fafb', padding: '8px 12px', borderRadius: 12 }}>Landed cost valid 3 days. Buyer sees total only. Platform fee hidden.</div>
          <button onClick={submit} disabled={loading} style={{ background: '#111', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 800, border: 0, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>{loading ? 'Saving...' : 'Submit Quote & Open WhatsApp'}</button>
        </div>
      </div>
    </div>
  )
}

