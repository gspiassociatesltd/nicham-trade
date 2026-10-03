'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Quote {
  id: string
  product_title: string
  customer_name: string
  phone: string
  quantity: number
  location: string
  status: string
  created_at: string
  is_motoma?: boolean
}

const MOTOMA_MODELS: Record<string, { fobUSD: number, shippingUSD: number, weightKG: number }> = {
  'M68PW PRO': { fobUSD: 950, shippingUSD: 180, weightKG: 85 },
  'M69PW PRO': { fobUSD: 1250, shippingUSD: 220, weightKG: 110 },
  'M87PW PRO': { fobUSD: 980, shippingUSD: 180, weightKG: 90 },
  'M88PW PRO': { fobUSD: 1650, shippingUSD: 280, weightKG: 150 },
  'M90 PRO': { fobUSD: 2400, shippingUSD: 380, weightKG: 220 },
  'M91 PRO': { fobUSD: 2950, shippingUSD: 450, weightKG: 270 },
  'HV-M 40-61': { fobUSD: 5800, shippingUSD: 800, weightKG: 600 },
  'HV-M 92-193': { fobUSD: 12500, shippingUSD: 1800, weightKG: 1200 },
  'ESS-MHV PRO 161': { fobUSD: 18500, shippingUSD: 2500, weightKG: 1800 },
  'ESS-MHV PRO 209': { fobUSD: 23500, shippingUSD: 3000, weightKG: 2200 },
  'M50-100': { fobUSD: 15500, shippingUSD: 2200, weightKG: 1500 },
  'BESS-500kW/1045kWh': { fobUSD: 145000, shippingUSD: 12000, weightKG: 12000 },
  'M2500-5015': { fobUSD: 680000, shippingUSD: 35000, weightKG: 35000 },
  'FT25-690V3450KW': { fobUSD: 45000, shippingUSD: 4000, weightKG: 3000 },
  'M77U Series': { fobUSD: 650, shippingUSD: 120, weightKG: 55 },
}

export default function MotomaDDPAdmin() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [selected, setSelected] = useState<Quote | null>(null)
  const [fobUSD, setFobUSD] = useState(0)
  const [shippingUSD, setShippingUSD] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(1620)
  const [dutyPercent, setDutyPercent] = useState(5)
  const [psiCostUSD, setPsiCostUSD] = useState(200)
  const [insurancePercent, setInsurancePercent] = useState(1.1)
  const [clearanceNGN, setClearanceNGN] = useState(250000)
  const [deliveryNGN, setDeliveryNGN] = useState(150000)
  const [platformPercent, setPlatformPercent] = useState(8)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')

  useEffect(() => { loadQuotes() }, [])

  async function loadQuotes() {
    try {
      // Try with is_motoma filter
      let { data, error } = await supabase.from('africanies_quotes').select('*').eq('is_motoma', true).order('created_at', { ascending: false }).limit(50)
      if (error && error.message.includes('is_motoma')) {
        // Column doesn't exist – load all recent quotes (fallback)
        const fallback = await supabase.from('africanies_quotes').select('*').order('created_at', { ascending: false }).limit(50)
        data = fallback.data
        error = fallback.error
        setLoadError('is_motoma column missing – showing all quotes – Run SQL migration to add is_motoma column')
      }
      if (error) throw error
      if (data) setQuotes(data)
    } catch (e: any) {
      setLoadError(e.message)
    }
  }

  function selectQuote(q: Quote) {
    setSelected(q)
    const modelKey = Object.keys(MOTOMA_MODELS).find(k => q.product_title.includes(k))
    if (modelKey) {
      const m = MOTOMA_MODELS[modelKey]
      setFobUSD(m.fobUSD)
      setShippingUSD(m.shippingUSD)
      if (q.product_title.includes('BESS') || q.product_title.includes('M2500') || q.product_title.includes('FT25')) {
        setPlatformPercent(3)
      } else if (q.product_title.includes('ESS-MHV') || q.product_title.includes('HV-M') || q.product_title.includes('M50-100')) {
        setPlatformPercent(5)
      } else {
        setPlatformPercent(8)
      }
    } else {
      setFobUSD(1000)
      setShippingUSD(200)
    }
  }

  const fobNGN = fobUSD * exchangeRate
  const shippingNGN = shippingUSD * exchangeRate
  const psiNGN = psiCostUSD * exchangeRate
  const cifNGN = fobNGN + shippingNGN + psiNGN
  const insuranceNGN = cifNGN * (insurancePercent / 100)
  const dutyNGN = (cifNGN + insuranceNGN) * (dutyPercent / 100)
  const subtotalBeforePlatform = cifNGN + insuranceNGN + dutyNGN + clearanceNGN + deliveryNGN
  const platformNGN = subtotalBeforePlatform * (platformPercent / 100)
  const totalDDPNGN = subtotalBeforePlatform + platformNGN
  const totalPerQty = selected ? totalDDPNGN * selected.quantity : totalDDPNGN
  const validUntil = new Date()
  validUntil.setDate(validUntil.getDate() + 3)

  async function approveAndSendWhatsApp() {
    if (!selected) return
    setLoading(true)
    try {
      const buyerMessage = `NiChAm Trade - MOTOMA DDP Lagos Quote

Product: ${selected.product_title}
Qty: ${selected.quantity}
Location: ${selected.location}

DDP Lagos All Inclusive: N${totalPerQty.toLocaleString()}
Includes Delivery to Lagos
Valid 3 Days until ${validUntil.toLocaleDateString()}
Factory Verified - Grade A+ Cells - 8000 Cycles

Your Quote ID: ${selected.id.slice(0,8)}

Reply YES to confirm. Payment to NiChAm Trade account. Delivery 25-30 days after payment.

Questions? Call/WhatsApp: 07050477950`

      // Try to update quote with DDP total if columns exist, else just log
      try {
        await supabase.from('africanies_quotes').update({ status: 'quoted' }).eq('id', selected.id)
      } catch {}

      try {
        await supabase.from('whatsapp_logs').insert({ quote_id: selected.id, phone: selected.phone, message: buyerMessage })
      } catch {}

      const waUrl = `https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(buyerMessage)}`
      window.open(waUrl, '_blank')
      alert(`DDP Quote Sent! Total: N${totalPerQty.toLocaleString()} - WhatsApp opened`)
      loadQuotes()
    } catch (e: any) {
      alert('Error: ' + e.message)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>MOTOMA DDP Admin - Quote Engine</h1>
            <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0' }}>Dynamic DDP Lagos Calculation - Buyer sees Total Only - Valid 3 Days - No Breakdown to Buyer</p>
            {loadError && <p style={{ fontSize: 11, color: '#dc2626', background: '#fef2f2', padding: '6px 10px', borderRadius: 8, marginTop: 8 }}>{loadError} - Run supabase_fix_fee_note.sql</p>}
          </div>
          <a href="/" style={{ background: '#0f172a', color: '#fff', padding: '8px 16px', borderRadius: 100, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>Back to Store</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 16, height: 'fit-content' }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>MOTOMA Quotes ({quotes.length}) {loadError && <span style={{ color: '#dc2626', fontSize: 10 }}> - {loadError.slice(0,60)}</span>}</div>
            {quotes.length === 0 ? <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: 20 }}>No MOTOMA quotes yet - Quotes from Get DDP Quote button will appear here after fixing fee_note error. Try creating new quote from main site.</div> : (
              <div style={{ display: 'grid', gap: 8, maxHeight: '70vh', overflow: 'auto' }}>
                {quotes.map(q => (
                  <button key={q.id} onClick={() => selectQuote(q)} style={{ textAlign: 'left', padding: 12, borderRadius: 12, border: selected?.id === q.id ? '2px solid #0f172a' : '1px solid #f1f5f9', background: selected?.id === q.id ? '#f8fafc' : '#fff', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>{q.product_title.slice(0, 50)}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{q.customer_name} • {q.phone} • Qty {q.quantity} • {q.location}</div>
                    <div style={{ fontSize: 10, color: q.status === 'quoted' ? '#16a34a' : '#f59e0b', marginTop: 4, fontWeight: 700 }}>{q.status.toUpperCase()} • {new Date(q.created_at).toLocaleDateString()}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 20 }}>
            {!selected ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
                <div style={{ fontSize: 32 }}>📋</div>
                <div style={{ fontWeight: 700, marginTop: 12 }}>Select a MOTOMA Quote</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Click a quote from left to calculate DDP Lagos total</div>
                <div style={{ fontSize: 11, marginTop: 16, background: '#f8fafc', padding: 12, borderRadius: 12, textAlign: 'left', maxWidth: 500, margin: '16px auto 0' }}>
                  <b>How DDP Engine Works:</b><br/>
                  1. Buyer clicks Get DDP Quote → Quote saved to africanies_quotes<br/>
                  2. Admin selects quote → FOB auto-filled from MOTOMA model database (M68PW $950, M91 $2950 etc)<br/>
                  3. Admin adjusts exchange rate, duty, shipping → Auto-calc DDP<br/>
                  4. Buyer sees TOTAL DDP ONLY – No breakdown – Valid 3 Days<br/>
                  5. Admin sees full breakdown with dynamic platform % (3-8%)<br/><br/>
                  <b>Your last error fee_note column missing:</b> Fixed in new QuoteModal – now uses only existing columns – quotes will now save and appear here.
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{selected.product_title}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{selected.customer_name} • {selected.phone} • Qty {selected.quantity} • {selected.location}</div>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, color: '#166534' }}>DDP Lagos • Valid 3 Days</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10 }}>Factory & Shipping (USD)</div>
                    <div style={{ display: 'grid', gap: 10 }}>
                      <div><label style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>FOB USD</label><input type="number" value={fobUSD} onChange={e => setFobUSD(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      <div><label style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Shipping USD</label><input type="number" value={shippingUSD} onChange={e => setShippingUSD(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      <div><label style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>PSI USD</label><input type="number" value={psiCostUSD} onChange={e => setPsiCostUSD(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      <div><label style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Exchange Rate</label><input type="number" value={exchangeRate} onChange={e => setExchangeRate(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10 }}>Nigeria Costs</div>
                    <div style={{ display: 'grid', gap: 10 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div><label style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Duty %</label><input type="number" value={dutyPercent} onChange={e => setDutyPercent(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                        <div><label style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Insurance %</label><input type="number" step={0.1} value={insurancePercent} onChange={e => setInsurancePercent(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      </div>
                      <div><label style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Clearance NGN</label><input type="number" value={clearanceNGN} onChange={e => setClearanceNGN(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      <div><label style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Delivery NGN</label><input type="number" value={deliveryNGN} onChange={e => setDeliveryNGN(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      <div>
                        <label style={{ fontSize: 11, color: '#166534', fontWeight: 800 }}>Platform Fee % (Hidden)</label>
                        <select value={platformPercent} onChange={e => setPlatformPercent(parseFloat(e.target.value))} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbf7d0', background: '#f0fdf4', marginTop: 4, fontWeight: 700 }}>
                          <option value={3}>3% BESS/Container - { (subtotalBeforePlatform * 0.03).toLocaleString()}</option>
                          <option value={5}>5% C&I ESS - {(subtotalBeforePlatform * 0.05).toLocaleString()}</option>
                          <option value={8}>8% Residential - {(subtotalBeforePlatform * 0.08).toLocaleString()}</option>
                          <option value={10}>10% Telecom - {(subtotalBeforePlatform * 0.10).toLocaleString()}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 16, padding: 16 }}>
                    <div style={{ fontWeight: 800, fontSize: 12, color: '#64748b' }}>ADMIN ONLY - FULL BREAKDOWN</div>
                    <div style={{ fontSize: 11, lineHeight: 1.6, marginTop: 8, fontFamily: 'monospace' }}>
                      FOB: ${fobUSD} x {exchangeRate} = N{fobNGN.toLocaleString()}<br/>
                      Shipping: ${shippingUSD} x {exchangeRate} = N{shippingNGN.toLocaleString()}<br/>
                      PSI: ${psiCostUSD} = N{psiNGN.toLocaleString()}<br/>
                      CIF: N{cifNGN.toLocaleString()}<br/>
                      Insurance {insurancePercent}%: N{insuranceNGN.toLocaleString()}<br/>
                      Duty {dutyPercent}%: N{dutyNGN.toLocaleString()}<br/>
                      Clearance: N{clearanceNGN.toLocaleString()}<br/>
                      Delivery: N{deliveryNGN.toLocaleString()}<br/>
                      Subtotal: N{subtotalBeforePlatform.toLocaleString()}<br/>
                      Platform {platformPercent}% (hidden): N{platformNGN.toLocaleString()}<br/>
                      <span style={{ fontWeight: 900 }}>TOTAL DDP: N{totalDDPNGN.toLocaleString()} x {selected.quantity} = N{totalPerQty.toLocaleString()}</span>
                    </div>
                  </div>
                  <div style={{ background: '#0f172a', color: '#fff', borderRadius: 16, padding: 16 }}>
                    <div style={{ fontWeight: 800, fontSize: 12, color: '#94a3b8' }}>BUYER VIEW - TOTAL ONLY - VALID 3 DAYS</div>
                    <div style={{ fontWeight: 900, fontSize: 28, marginTop: 12, color: '#22c55e' }}>N{totalPerQty.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Qty {selected.quantity} x N{totalDDPNGN.toLocaleString()} • Valid 3 Days until {validUntil.toLocaleDateString()}</div>
                    <button onClick={approveAndSendWhatsApp} disabled={loading} style={{ width: '100%', marginTop: 16, background: '#22c55e', color: '#0f172a', padding: '14px', borderRadius: 12, fontWeight: 900, border: 0, cursor: 'pointer' }}>{loading ? 'Sending...' : `Send DDP N${totalPerQty.toLocaleString()} to ${selected.phone} →`}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
