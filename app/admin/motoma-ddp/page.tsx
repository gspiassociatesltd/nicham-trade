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
  momo_account?: string
}

const MOTOMA_MODELS: Record<string, { fobUSD: number, shippingUSD: number }> = {
  'M68PW PRO': { fobUSD: 950, shippingUSD: 180 },
  'M69PW PRO': { fobUSD: 1250, shippingUSD: 220 },
  'M87PW PRO': { fobUSD: 980, shippingUSD: 180 },
  'M88PW PRO': { fobUSD: 1650, shippingUSD: 280 },
  'M90 PRO': { fobUSD: 2400, shippingUSD: 380 },
  'M91 PRO': { fobUSD: 2950, shippingUSD: 450 },
  'HV-M 40-61': { fobUSD: 5800, shippingUSD: 800 },
  'HV-M 92-193': { fobUSD: 12500, shippingUSD: 1800 },
  'ESS-MHV PRO 161': { fobUSD: 18500, shippingUSD: 2500 },
  'ESS-MHV PRO 209': { fobUSD: 23500, shippingUSD: 3000 },
  'M50-100': { fobUSD: 15500, shippingUSD: 2200 },
  'BESS-500kW/1045kWh': { fobUSD: 145000, shippingUSD: 12000 },
  'M2500-5015': { fobUSD: 680000, shippingUSD: 35000 },
  'FT25-690V3450KW': { fobUSD: 45000, shippingUSD: 4000 },
  'M77U Series': { fobUSD: 650, shippingUSD: 120 },
}

export default function MotomaDDPAdminEscrow() {
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
  const [flutterwavePercent, setFlutterwavePercent] = useState(1.4)
  const [flutterwaveCap, setFlutterwaveCap] = useState(2000)
  const [momoAccount, setMomoAccount] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadQuotes() }, [])

  async function loadQuotes() {
    const { data } = await supabase.from('africanies_quotes').select('*').order('created_at', { ascending: false }).limit(50)
    if (data) setQuotes(data)
  }

  function selectQuote(q: Quote) {
    setSelected(q)
    setMomoAccount(q.phone || '')
    const modelKey = Object.keys(MOTOMA_MODELS).find(k => q.product_title.includes(k))
    if (modelKey) {
      const m = MOTOMA_MODELS[modelKey]
      setFobUSD(m.fobUSD)
      setShippingUSD(m.shippingUSD)
      if (q.product_title.includes('BESS') || q.product_title.includes('M2500') || q.product_title.includes('FT25')) setPlatformPercent(3)
      else if (q.product_title.includes('ESS-MHV') || q.product_title.includes('HV-M') || q.product_title.includes('M50-100')) setPlatformPercent(5)
      else setPlatformPercent(8)
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
  const totalDDPBeforeFlutterwave = subtotalBeforePlatform + platformNGN
  const totalPerQtyBeforeFW = selected ? totalDDPBeforeFlutterwave * selected.quantity : totalDDPBeforeFlutterwave
  
  // Flutterwave charges to buyer
  const flutterwaveFeeNGN = Math.min(totalPerQtyBeforeFW * (flutterwavePercent / 100), flutterwaveCap * (selected?.quantity || 1) * 5) // cap per transaction logic
  const flutterwaveFeeCalc = Math.min(totalPerQtyBeforeFW * (flutterwavePercent / 100), 200000) // max cap example
  const totalWithFlutterwave = totalPerQtyBeforeFW + flutterwaveFeeCalc

  const validUntil = new Date()
  validUntil.setDate(validUntil.getDate() + 3)

  async function approveAndSendEscrowWhatsApp() {
    if (!selected) return
    setLoading(true)
    try {
      const buyerMessage = `NiChAm Trade - MOTOMA DDP Lagos Quote - Flutterwave Escrow

Product: ${selected.product_title}
Qty: ${selected.quantity}
Location: ${selected.location}
MoMo Account: ${momoAccount}

DDP Lagos Total (incl Delivery): N${totalPerQtyBeforeFW.toLocaleString()}
Flutterwave Escrow Fee (${flutterwavePercent}%): N${flutterwaveFeeCalc.toLocaleString()}
TOTAL TO PAY TO ESCROW: N${totalWithFlutterwave.toLocaleString()}

Valid 3 Days until ${validUntil.toLocaleDateString()}
Factory Verified - Grade A+ Cells - 8000 Cycles - 15+ Years
Quote ID: ${selected.id.slice(0,8)}

PAYMENT FLOW (License Compliant):
1. Buyer pays N${totalWithFlutterwave.toLocaleString()} from MoMo ${momoAccount} to Flutterwave Escrow Account
2. Flutterwave holds funds in escrow - secure
3. Flutterwave pays: Factory FOB+Shipping, Customs Duty, Clearance, Delivery, and NiChAm Platform Fee
4. Goods delivered DDP Lagos - 25-30 days after payment confirmation

Flutterwave charges charged to buyer - included above
Escrow protects buyer - money released only after delivery confirmation

Reply YES to confirm MoMo payment to Flutterwave Escrow
Payment Link will be sent after confirmation

Questions? Call/WhatsApp: 07050477950
Escrow Provider: Flutterwave - Licensed CBN`

      try { await supabase.from('africanies_quotes').update({ status: 'quoted_escrow' }).eq('id', selected.id) } catch {}
      try { await supabase.from('whatsapp_logs').insert({ quote_id: selected.id, phone: selected.phone, message: buyerMessage }) } catch {}

      const waUrl = `https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(buyerMessage)}`
      window.open(waUrl, '_blank')
      alert(`Escrow Quote Sent! Total with Flutterwave Fee: N${totalWithFlutterwave.toLocaleString()} - WhatsApp opened`)
      loadQuotes()
    } catch (e: any) { alert('Error: ' + e.message) } finally { setLoading(false) }
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>MOTOMA DDP Admin - Flutterwave Escrow + MoMo</h1>
            <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0' }}>License Compliant - Buyer MoMo to Flutterwave Escrow - Flutterwave pays everyone - Buyer bears Flutterwave charges</p>
          </div>
          <a href="/" style={{ background: '#0f172a', color: '#fff', padding: '8px 16px', borderRadius: 100, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>Back to Store</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>MOTOMA Quotes ({quotes.length})</div>
            {quotes.length === 0 ? <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: 20 }}>No quotes yet</div> : (
              <div style={{ display: 'grid', gap: 8, maxHeight: '70vh', overflow: 'auto' }}>
                {quotes.map(q => (
                  <button key={q.id} onClick={() => selectQuote(q)} style={{ textAlign: 'left', padding: 12, borderRadius: 12, border: selected?.id === q.id ? '2px solid #0f172a' : '1px solid #f1f5f9', background: selected?.id === q.id ? '#f8fafc' : '#fff', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>{q.product_title.slice(0, 55)}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{q.customer_name} • {q.phone} • Qty {q.quantity} • {q.location}</div>
                    <div style={{ fontSize: 10, color: '#16a34a', marginTop: 4, fontWeight: 700 }}>{q.status.toUpperCase()} • {new Date(q.created_at).toLocaleDateString()}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 20 }}>
            {!selected ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
                <div style={{ fontSize: 28 }}>🏦 MoMo → Flutterwave Escrow</div>
                <div style={{ fontWeight: 700, marginTop: 12 }}>Select Quote for Escrow Payment</div>
                <div style={{ fontSize: 11, marginTop: 12, background: '#f8fafc', padding: 12, borderRadius: 12, textAlign: 'left', maxWidth: 560, margin: '12px auto 0' }}>
                  <b>New Payment Flow (License Compliant):</b><br/>
                  OLD: Payment to NiChAm Trade account → License issue<br/>
                  NEW: Buyer MoMo → Flutterwave Escrow → Flutterwave pays Factory, Customs, Clearance, Delivery, NiChAm Platform<br/>
                  • All registered buyers must have MoMo account (MTN MoMo)<br/>
                  • Payments to Flutterwave escrow account (licensed)<br/>
                  • Flutterwave charges (1.4% capped) charged to buyer account<br/>
                  • Flutterwave Flow pays everyone including platform<br/>
                  • Escrow protects buyer – funds released after delivery confirmation<br/><br/>
                  Example from your WhatsApp: M69PW PRO Qty 12 Lokoja N42,404,049 → Now + Flutterwave fee = N42,404,049 + N... = Total to pay to escrow
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{selected.product_title}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{selected.customer_name} • {selected.phone} • Qty {selected.quantity} • {selected.location}</div>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, color: '#166534' }}>MoMo → Flutterwave Escrow • Valid 3 Days</div>
                </div>

                <div style={{ marginBottom: 16, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 12 }}>Buyer MoMo Account (Registered)</div>
                  <input value={momoAccount} onChange={e => setMomoAccount(e.target.value)} placeholder="MTN MoMo e.g. 08087364309" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #fde68a', marginTop: 6, background: '#fff' }} />
                  <div style={{ fontSize: 10, color: '#92400e', marginTop: 4 }}>All registered buyers must have MoMo account – Payment will be made from this MoMo to Flutterwave escrow</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10 }}>Factory & Shipping (USD)</div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      <div><label style={{ fontSize: 11, fontWeight: 700 }}>FOB USD</label><input type="number" value={fobUSD} onChange={e => setFobUSD(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      <div><label style={{ fontSize: 11, fontWeight: 700 }}>Shipping USD</label><input type="number" value={shippingUSD} onChange={e => setShippingUSD(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      <div><label style={{ fontSize: 11, fontWeight: 700 }}>Exchange Rate</label><input type="number" value={exchangeRate} onChange={e => setExchangeRate(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10 }}>Nigeria & Fees</div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div><label style={{ fontSize: 11, fontWeight: 700 }}>Duty %</label><input type="number" value={dutyPercent} onChange={e => setDutyPercent(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                        <div><label style={{ fontSize: 11, fontWeight: 700 }}>Platform %</label><select value={platformPercent} onChange={e => setPlatformPercent(parseFloat(e.target.value))} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }}><option value={3}>3% BESS</option><option value={5}>5% C&I</option><option value={8}>8% Residential</option></select></div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <div><label style={{ fontSize: 11, fontWeight: 700, color: '#dc2626' }}>Flutterwave % (Buyer)</label><input type="number" step={0.1} value={flutterwavePercent} onChange={e => setFlutterwavePercent(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #fecaca', marginTop: 4, background: '#fef2f2' }} /></div>
                        <div><label style={{ fontSize: 11, fontWeight: 700 }}>Clearance NGN</label><input type="number" value={clearanceNGN} onChange={e => setClearanceNGN(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '8px 12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 4 }} /></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ background: '#f8fafc', borderRadius: 16, padding: 14 }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#64748b' }}>ADMIN - FULL BREAKDOWN (Flutterwave pays all)</div>
                    <div style={{ fontSize: 11, marginTop: 8, fontFamily: 'monospace', lineHeight: 1.5 }}>
                      DDP Before FW: N{totalPerQtyBeforeFW.toLocaleString()}<br/>
                      Platform {platformPercent}%: N{(subtotalBeforePlatform * (platformPercent/100) * (selected.quantity)).toLocaleString()}<br/>
                      Flutterwave Fee {flutterwavePercent}% (buyer): N{flutterwaveFeeCalc.toLocaleString()}<br/>
                      <b>TOTAL TO ESCROW: N{totalWithFlutterwave.toLocaleString()}</b><br/><br/>
                      Escrow Disbursement:<br/>
                      - Factory FOB+Ship: N{((fobNGN+shippingNGN+psiNGN)*(selected.quantity)).toLocaleString()}<br/>
                      - Customs Duty etc: N{((insuranceNGN+dutyNGN)*(selected.quantity) + clearanceNGN + deliveryNGN).toLocaleString()}<br/>
                      - NiChAm Platform: N{(platformNGN*selected.quantity).toLocaleString()}<br/>
                      - Flutterwave: N{flutterwaveFeeCalc.toLocaleString()} (from buyer)
                    </div>
                  </div>
                  <div style={{ background: '#0f172a', color: '#fff', borderRadius: 16, padding: 14 }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: '#fde68a' }}>BUYER - MoMo → Flutterwave Escrow - Valid 3 Days</div>
                    <div style={{ fontWeight: 900, fontSize: 22, marginTop: 10, color: '#22c55e' }}>N{totalWithFlutterwave.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>DDP N{totalPerQtyBeforeFW.toLocaleString()} + FW Fee N{flutterwaveFeeCalc.toLocaleString()}<br/>MoMo {momoAccount} → Flutterwave Escrow<br/>Valid until {validUntil.toLocaleDateString()}</div>
                    <button onClick={approveAndSendEscrowWhatsApp} disabled={loading} style={{ width: '100%', marginTop: 12, background: '#fbbf24', color: '#0f172a', padding: '12px', borderRadius: 12, fontWeight: 900, border: 0, cursor: 'pointer', fontSize: 12 }}>{loading ? 'Sending...' : `Send Escrow N${totalWithFlutterwave.toLocaleString()} to ${selected.phone} →`}</button>
                    <div style={{ fontSize: 9, color: '#64748b', marginTop: 8, lineHeight: 1.3 }}>Payment to Flutterwave escrow (licensed) not NiChAm account - License compliant - Flutterwave pays everyone including platform - Buyer bears Flutterwave charges</div>
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
