'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function QuoteModal({ product, onClose }: { product: any, onClose: () => void }) {
  const [form, setForm] = useState({ customer_name: '', phone: '', quantity: 1, location: '', self_clear: false })
  const [loading, setLoading] = useState(false)

  // Detect MOTOMA product
  const isMotoma = product?.is_motoma || (product?.title||'').toUpperCase().includes('MOTOMA') || (product?.supplier_name||'').includes('MOTOMA') || product?.model?.includes('PW') || product?.model?.includes('HV-M') || product?.model?.includes('ESS') || product?.model?.includes('M50') || product?.model?.includes('BESS')
  const isLargeESS = (product?.kwh && parseInt(product.kwh) > 50) || (product?.model||'').includes('BESS') || (product?.model||'').includes('M2500') || (product?.model||'').includes('FT25') || (product?.capacity && product.capacity.includes('MWh'))

  // Dynamic fee logic
  const getFee = () => {
    if (isMotoma) {
      // MOTOMA DDP: 5% affiliate commission built into DDP price, platform fee hidden = 5-8%
      // For display to admin only, buyer sees total DDP only
      if (isLargeESS) return 0 // For BESS/Container, fee is % of millions, not fixed – admin calculates later
      return 0 // DDP quote pending – fee calculated after MOTOMA DDP quote
    }
    // Non-MOTOMA: old logic
    return form.self_clear ? 35000 : 85000
  }

  async function submit() {
    if (!form.customer_name || !form.phone) { alert('Name and phone required'); return }
    setLoading(true)
    try {
      const platform_fee = getFee()
      const product_price = Number(product.price_ngn || product.landed_price_ngn || 0)
      
      // For MOTOMA, price is 0 pending – admin will quote DDP
      let feeNote = ''
      if (isMotoma) {
        if (isLargeESS) {
          feeNote = 'MOTOMA BESS/Container – DDP Lagos – 5% affiliate + 3% platform – Admin to quote DDP total – Valid 3 Days'
        } else {
          feeNote = `MOTOMA ${product.model} – DDP Lagos – 5% affiliate included in DDP – Admin to quote DDP total – Valid 3 Days`
        }
      } else {
        feeNote = form.self_clear ? 'YES (Fee 35k)' : 'NO (Fee 85k)'
      }

      const { data, error } = await supabase.from('africanies_quotes').insert({
        product_id: product.id || `motoma-${product.model}`,
        product_title: product.title,
        customer_name: form.customer_name,
        phone: form.phone,
        quantity: form.quantity,
        location: form.location,
        self_clear: isMotoma ? false : form.self_clear, // MOTOMA never self-clear – DDP only
        platform_fee_ngn: platform_fee,
        status: 'new',
        is_motoma: isMotoma,
        fee_note: feeNote
      }).select().single()

      if (error) throw error

      const totalNote = isMotoma ? `DDP Lagos Quote Pending – Admin will provide total DDP (includes duty+shipping+5% affiliate)` : `Hidden Platform Fee: ₦${platform_fee.toLocaleString()}`
      
      const message = `NiChAm MOTOMA Quote Request
Product: ${product.title}
Model: ${product.model || product.supplier_model}
Customer: ${form.customer_name}
Phone: ${form.phone}
Qty: ${form.quantity}
Location: ${form.location}
Type: ${isMotoma ? 'MOTOMA DDP Lagos – ' + feeNote : 'Standard – Self-Clear: ' + feeNote}
${totalNote}
Quote ID: ${data.id.slice(0,8)}
Valid 3 Days`

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
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{product.model || product.supplier_model} • {isMotoma ? 'DDP Lagos – Quote Pending – Includes 5% affiliate' : `₦${Number(product.price_ngn || 0).toLocaleString()}`}</div>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          <input placeholder="Your Name e.g. Godwin Abaniwo" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }} />
          <input placeholder="Phone e.g. 08087364309" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="number" min={1} placeholder="Qty" value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', flex: 1, fontSize: 13 }} />
            <input placeholder="Location e.g. Abuja / Lagos" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e5e7eb', flex: 1.5, fontSize: 13 }} />
          </div>

          {isMotoma ? (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 12px', fontSize: 11, lineHeight: 1.4, color: '#166534' }}>
              <b>MOTOMA DDP Lagos – All Inclusive</b><br/>
              • DDP Lagos price includes: Factory + Shipping + Duty + PSI (SGS/BV) + Insurance 110% + 5% affiliate commission<br/>
              • Buyer sees TOTAL DDP only – No breakdown – Valid 3 Days<br/>
              • {isLargeESS ? 'BESS/Container – Custom DDP quote by admin – 5% affiliate + 3% platform' : 'Residential – Admin will send DDP total after MOTOMA factory quote'}<br/>
              • No self-clear option – DDP only – We handle everything
            </div>
          ) : (
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, background: '#fffbeb', padding: '8px 12px', borderRadius: 12, border: '1px solid #fde68a', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.self_clear} onChange={e => setForm({ ...form, self_clear: e.target.checked })} />
              Self-clear? (Fee ₦35k instead of ₦85k) – Admin sees breakdown
            </label>
          )}

          <div style={{ fontSize: 10, color: '#666', background: '#f9fafb', padding: '8px 12px', borderRadius: 12, lineHeight: 1.4 }}>
            {isMotoma ? 'DDP Lagos valid 3 days. Total DDP includes all costs + 5% affiliate. Admin provides breakdown. Buyer sees total only. Platform fee hidden.' : 'Landed cost valid 3 days. Buyer sees total only. Platform fee hidden.'}
          </div>
          <button onClick={submit} disabled={loading} style={{ background: '#0f172a', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 800, border: 0, cursor: 'pointer', opacity: loading ? 0.6 : 1, fontSize: 13 }}>{loading ? 'Saving...' : isMotoma ? 'Submit DDP Quote & Open WhatsApp' : 'Submit Quote & Open WhatsApp'}</button>
        </div>
      </div>
    </div>
  )
}
