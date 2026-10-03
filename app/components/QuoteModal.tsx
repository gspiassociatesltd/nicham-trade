'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function QuoteModal({ product, onClose }: { product: any, onClose: () => void }) {
  const [form, setForm] = useState({ customer_name: '', phone: '', quantity: 1, location: '', self_clear: false })
  const [loading, setLoading] = useState(false)

  // Detect MOTOMA product – buyer sees clean DDP only
  const isMotoma = product?.is_motoma || (product?.title||'').toUpperCase().includes('MOTOMA') || (product?.supplier_name||'').includes('MOTOMA') || product?.model?.includes('PW') || product?.model?.includes('HV-M') || product?.model?.includes('ESS') || product?.model?.includes('M50') || product?.model?.includes('BESS')

  async function submit() {
    if (!form.customer_name || !form.phone) { alert('Name and phone required'); return }
    setLoading(true)
    try {
      // Internal: fee hidden, not shown to buyer. MOTOMA DDP includes all costs – buyer sees total only.
      const internalFeeNote = isMotoma ? `MOTOMA ${product.model} – DDP Lagos – Admin to quote DDP total – Valid 3 Days` : (form.self_clear ? 'Self-clear YES' : 'Standard')

      const { data, error } = await supabase.from('africanies_quotes').insert({
        product_id: product.id || `motoma-${product.model}`,
        product_title: product.title,
        customer_name: form.customer_name,
        phone: form.phone,
        quantity: form.quantity,
        location: form.location,
        self_clear: false, // MOTOMA DDP only, no self-clear. Non-MOTOMA also defaults false – fee logic internal
        platform_fee_ngn: 0, // Dynamic % calculated by admin – hidden from buyer
        status: 'new',
        is_motoma: isMotoma,
        fee_note: internalFeeNote
      }).select().single()

      if (error) throw error

      // Buyer-facing WhatsApp message – CLEAN – NO affiliate, NO fee, NO breakdown
      const message = isMotoma
        ? `NiChAm Trade – MOTOMA DDP Lagos Quote
Product: ${product.title}
Model: ${product.model || product.supplier_model}
Customer: ${form.customer_name}
Phone: ${form.phone}
Qty: ${form.quantity}
Location: ${form.location}
DDP Lagos – All Inclusive – Valid 3 Days
Quote ID: ${data.id.slice(0,8)}`
        : `NiChAm Trade Quote
Product: ${product.title}
Customer: ${form.customer_name}
Phone: ${form.phone}
Qty: ${form.quantity}
Location: ${form.location}
Valid 3 Days
Quote ID: ${data.id.slice(0,8)}`

      await supabase.from('whatsapp_logs').insert({
        quote_id: data.id,
        phone: form.phone,
        message: message,
        wa_url: `https://wa.me/2347050477950?text=${encodeURIComponent(message)}`
      })

      const waUrl = `https://wa.me/2347050477950?text=${encodeURIComponent(message)}`
      window.open(waUrl, '_blank')
      alert(isMotoma ? 'MOTOMA DDP Quote saved! Admin will send DDP Lagos total (includes all fees) – Opening WhatsApp...' : 'Quote saved! Opening WhatsApp...')
      onClose()
    } catch (e: any) {
      alert('Error: ' + e.message)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 24, width: '100%', maxWidth: 440, border: '1px solid #eee', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{isMotoma ? 'Get DDP Lagos Quote – MOTOMA' : 'Get Quote – Valid 3 Days'}</div>
            <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700, marginTop: 2 }}>{isMotoma ? 'MOTOMA Authorized • DDP Lagos • Valid 3 Days' : 'Standard Quote • Valid 3 Days'}</div>
          </div>
          <button onClick={onClose} style={{ border: 0, background: '#f3f4f6', width: 28, height: 28, borderRadius: 100, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ fontSize: 12, color: '#0f172a', marginTop: 8, fontWeight: 700, lineHeight: 1.3 }}>{product.title}</div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{product.model || product.supplier_model} • DDP Lagos – All Inclusive</div>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          <input placeholder="Your Name e.g. Godwin Abaniwo" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }} />
          <input placeholder="Phone e.g. 08087364309" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" min={1} placeholder="Qty" value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', flex: 1, fontSize: 13 }} />
            <input placeholder="Location e.g. Abuja / Lagos" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', flex: 1.5, fontSize: 13 }} />
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 12, padding: '10px 12px', fontSize: 11, lineHeight: 1.5, color: '#0f172a' }}>
            <b>DDP Lagos – All Inclusive – Valid 3 Days</b><br/>
            Includes Factory Price, Shipping, Duty, Clearance, and Delivery to Lagos. Total price only – No hidden breakdown.
          </div>

          <div style={{ fontSize: 10, color: '#64748b', background: '#f9fafb', padding: '8px 12px', borderRadius: 12, lineHeight: 1.4 }}>
            Quote valid for 3 days. You will receive total DDP Lagos price on WhatsApp.
          </div>
          <button onClick={submit} disabled={loading} style={{ background: '#0f172a', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 800, border: 0, cursor: 'pointer', opacity: loading ? 0.6 : 1, fontSize: 13 }}>{loading ? 'Saving...' : 'Submit Quote & Open WhatsApp'}</button>
        </div>
      </div>
    </div>
  )
}
