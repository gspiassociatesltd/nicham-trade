'use client'
import { useState, useEffect } from 'react'

export default function VerifyDelivery() {
  const [code, setCode] = useState('')
  const [scanning, setScanning] = useState(false)
  const [verified, setVerified] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setOrderId(params.get('orderId') || '')
    setCode(params.get('code') || '')
  }, [])

  async function handleVerify() {
    if (!code) { alert('Enter delivery code / scan QR'); return }
    setScanning(true)
    // Simulate verification and trigger 10% escrow release
    setTimeout(() => {
      setScanning(false)
      setVerified(true)
      // In production: POST /api/escrow/verify-delivery { code, orderId, photo, geolocation }
      // Flutterwave releases 10% - Triggered by code scan by buyer
    }, 1500)
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>Verify Delivery – Code Scan</h1>
          <p style={{ color: '#64748b', marginTop: 8, fontSize: 13 }}>
            Scan QR code on package / delivery note to trigger 10% final payment from Flutterwave Escrow.<br/>
            As agreed: 30% after verification / 60% FOB+Freight after BL / 10% after delivery triggered by code scan by buyer
          </p>

          {!verified ? (
            <>
              <div style={{ marginTop: 20, background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: 16, padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 48 }}>📦</div>
                <div style={{ fontWeight: 800, marginTop: 12 }}>QR Code Scanner</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Point camera at QR on package – EU/US standard verified – Grade A+ – Packaging insurance compliant</div>
                <button onClick={() => setCode('DEMO-' + Date.now())} style={{ marginTop: 16, background: '#0f172a', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 800, border: 0, cursor: 'pointer' }}>Simulate Scan</button>
              </div>

              <div style={{ marginTop: 20, textAlign: 'left' }}>
                <label style={{ fontSize: 12, fontWeight: 800 }}>Delivery Code / Order ID</label>
                <input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter code from package e.g. NICHAM-12345" style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6 }} />
                <label style={{ fontSize: 12, fontWeight: 800, marginTop: 12, display: 'block' }}>Order ID (optional)</label>
                <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Order ID" style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6 }} />
                <label style={{ fontSize: 12, fontWeight: 800, marginTop: 12, display: 'block' }}>Buyer Name – For verification</label>
                <input value={buyerName} onChange={e => setBuyerName(e.target.value)} placeholder="Buyer name" style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6 }} />
              </div>

              <button onClick={handleVerify} disabled={scanning} style={{ width: '100%', marginTop: 20, background: '#22c55e', color: '#fff', padding: '14px', borderRadius: 12, fontWeight: 900, border: 0, cursor: 'pointer', fontSize: 14 }}>{scanning ? 'Verifying – Checking EU/US standards, Grade A+, Packaging insurance compliant, PSI Report 9 points...' : 'Verify Delivery – Release 10% Escrow →'}</button>

              <div style={{ marginTop: 16, fontSize: 11, color: '#64748b', background: '#fffbeb', border: '1px solid #fde68a', padding: 10, borderRadius: 10, textAlign: 'left' }}>
                <b>PSI Report must have covered:</b><br/>
                1. Quantity verification<br/>
                2. EU/US standard only – IEC 62619 / UL1973 / CE / REACH / ISO – GB China only rejected<br/>
                3. Grade A+ QR verification<br/>
                4. Capacity discharge test 100%<br/>
                5. BMS / COA test<br/>
                6. UN38.3 / MSDS REACH 16 sections<br/>
                7. Packaging insurance compliant – wooden crate / UN drums / photos before loading<br/>
                8. Marking – model, serial, CE, UN, DG label<br/>
                9. Factory audit – QC<br/><br/>
                Only items manufactured to EU/US standards only should be purchased – Payment 30% after verification (PSI+SC accepted) / 60% FOB+Freight after BL / 10% after delivery triggered by code scan by buyer
              </div>
            </>
          ) : (
            <div style={{ marginTop: 20, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 48 }}>✅</div>
              <div style={{ fontWeight: 900, fontSize: 18, color: '#166534', marginTop: 12 }}>Delivery Verified!</div>
              <div style={{ fontSize: 13, color: '#166534', marginTop: 8 }}>
                Code {code} verified – Buyer {buyerName || 'confirmed'} – Delivery at premises confirmed<br/>
                <b>Flutterwave Escrow releasing 10% final payment to DDP partner – Proc360 / AfricanIES</b><br/>
                30% verification + 60% FOB + 10% delivery – Complete
              </div>
              <div style={{ marginTop: 16, background: '#fff', borderRadius: 10, padding: 12, fontSize: 11, textAlign: 'left' }}>
                Transaction: Order {orderId || code} – EU/US standard verified – Grade A+ – Packaging insurance compliant – PSI Report 9 points covered – SON-approved PSI SGS/BV/Intertek/Cotecna/CCIC – Delivery confirmed via code scan by buyer
              </div>
              <a href="/" style={{ display: 'inline-block', marginTop: 16, background: '#0f172a', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 800, textDecoration: 'none' }}>Back to Marketplace</a>
            </div>
          )}
        </div>

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 11, color: '#94a3b8' }}>
          NiChAm Trade • Solar & Industrial Chemical Marketplace • DDP to premises • Valid 3 Days • 30% after verification / 60% FOB+Freight / 10% code scan • Flutterwave Escrow MoMo • Phone: +234 808 7364 309 • WeChat: wxid_2viy9xivqcfk22
        </div>
      </div>
    </div>
  )
}
