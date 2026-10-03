'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function QuoteModal({ product, onClose }: { product: any, onClose: () => void }) {
  const [form, setForm] = useState({ customer_name: '', phone: '', quantity: 1, location: '' })
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!form.customer_name || !form.phone) { alert('Name and phone required'); return }
    const moqText = product.moq || '12 pcs'
    const moqNum = parseInt(moqText) || 1
    const isKwhMoq = moqText.includes('kWh') || moqText.includes('MWh')
    if (!isKwhMoq && form.quantity < moqNum) {
      alert(`MOQ for ${product.model} is ${moqText}. Please enter qty >= ${moqNum}`)
      return
    }
    setLoading(true)
    try {
      // FIX 2: product_id is UUID type in Supabase, but we were inserting "M91" string – causes invalid input syntax for type uuid: "M91"
      // Solution: Don't insert product_id at all – store everything in product_title
      // Minimal insert that works with old schema
      const minimalData: any = {
        product_title: `${product.model} - ${product.name} - MOQ ${product.moq}`,
        customer_name: form.customer_name,
        phone: form.phone,
        quantity: form.quantity,
        location: form.location,
        status: 'new'
      }

      const { data, error } = await supabase.from('africanies_quotes').insert(minimalData).select().single()
      if (error) throw error

      const message = `NiChAm Trade - MOTOMA DDP Lagos Quote
Product: ${product.name}
Model: ${product.model}
MOQ: ${product.moq}
Qty: ${form.quantity}
Location: ${form.location}
Customer: ${form.customer_name}
Phone: ${form.phone}
DDP Lagos All Inclusive Valid 3 Days
Quote ID: ${data.id.slice(0,8)}`

      try {
        await supabase.from('whatsapp_logs').insert({ quote_id: data.id, phone: form.phone, message: message })
      } catch {}

      const waUrl = `https://wa.me/2347050477950?text=${encodeURIComponent(message)}`
      window.open(waUrl, '_blank')
      alert(`Quote saved! ID ${data.id.slice(0,8)} - MOQ ${product.moq} noted.`)
      onClose()
    } catch (e: any) {
      alert('Error: ' + e.message + '\n\nSQL Fix for product_id UUID error:\nALTER TABLE africanies_quotes ALTER COLUMN product_id TYPE TEXT;\nOr just drop product_id column if not needed.\nThen: NOTIFY pgrst, \'reload schema\';')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 24, width: '100%', maxWidth: 440 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Get DDP Lagos Quote</div>
            <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700, marginTop: 2 }}>MOQ: {product.moq} • DDP Lagos • Valid 3 Days</div>
          </div>
          <button onClick={onClose} style={{ border: 0, background: '#f3f4f6', width: 28, height: 28, borderRadius: 100, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, marginTop: 8 }}>{product.name}</div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{product.model} • MOQ {product.moq}</div>
        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          <input placeholder="Your Name e.g. Godwin Abaniwo" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb' }} />
          <input placeholder="Phone e.g. +2348087364309" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <input type="number" min={1} value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', width: '100%' }} />
              <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 700, marginTop: 4, textAlign: 'center' }}>MOQ: {product.moq}</div>
            </div>
            <input placeholder="Location e.g. Sokoto" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', flex: 1 }} />
          </div>
          <div style={{ fontSize: 10, color: '#64748b', background: '#f9fafb', padding: '8px 12px', borderRadius: 12 }}>MOQ {product.moq} required. Valid 3 Days.</div>
          <button onClick={submit} disabled={loading} style={{ background: '#0f172a', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 800, border: 0, cursor: 'pointer' }}>{loading ? 'Saving...' : 'Submit Quote & Open WhatsApp'}</button>
        </div>
      </div>
    </div>
  )
}
