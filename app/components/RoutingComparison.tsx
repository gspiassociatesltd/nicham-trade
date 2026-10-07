'use client'
import { useState, useEffect } from 'react'

// NiChAm Routing Comparison Component – Shows 3 quotes, cheapest selection, platform fee, external comparison

export default function RoutingComparison({ routingId, onClose }: { routingId?: string, onClose?: () => void }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompare = async () => {
      try {
        const res = await fetch('/api/routing/compare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ routingId })
        })
        const d = await res.json()
        setData(d)
        setLoading(false)
      } catch (e) {
        setLoading(false)
      }
    }
    fetchCompare()
  }, [routingId])

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>AI comparing 3 verifiers – Choosing cheapest of AfricanIES, Proc360, Laybel – Then comparing to similar platforms – Adding platform fee after cheapest...</div>
  if (!data || !data.success) return <div style={{ padding: 40 }}>No routing found – Request quote first – DDP to premises – Valid 3 Days</div>

  const { comparisonTable, cheapestOf3, externalComparison, feePlacementAnalysis, aiDecision, finalDDP, platformFee } = data

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: 20 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ background: '#0f172a', color: '#fff', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>AI Routing – 3 Verifiers – Cheapest First – Platform Fee After Selection</h2>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>AfricanIES vs Proc360 vs Laybel Global Solution – AI selects cheapest of 3 before comparing to 1688/Alibaba – Platform fee added AFTER cheapest – Zero-markup transparent</div>
          </div>
          {onClose && <button onClick={onClose} style={{ background: '#fff', color: '#0f172a', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>Close</button>}
        </div>

        <div style={{ padding: 24 }}>
          {/* Cheapest of 3 */}
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#15803d', fontWeight: 700 }}>AI SELECTED CHEAPEST OF 3 VERIFIERS</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{cheapestOf3.provider} – ${cheapestOf3.totalLanded.toFixed(2)} DDP to {data.location} – Valid 3 Days</div>
            <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{cheapestOf3.providerFull}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>{cheapestOf3.notes}</div>
          </div>

          {/* Comparison Table – 3 verifiers */}
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Step A: Cheapest Among 3 Verified – Total Landed Cost – 4 Layers (Origin, Freight, Nigeria-side, Customs)</h3>
          <div style={{ overflowX: 'auto', marginBottom: 24, border: '1px solid #e2e8f0', borderRadius: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Provider</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Goods</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Service Fee</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Inspection</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Freight</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Total Landed</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Cheapest?</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row: any, i: number) => (
                  <tr key={i} style={{ background: row.isCheapest ? '#f0fdf4' : '#fff' }}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontWeight: row.isCheapest ? 700 : 400 }}>
                      {row.provider} {row.isCheapest ? '✓' : ''}
                      <div style={{ fontSize: 10, color: '#64748b' }}>{row.isVerified ? 'Verified' : 'Unverified'}</div>
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>${row.goodsCost.toFixed(2)}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.serviceFee}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.inspection}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.freight}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontWeight: row.isCheapest ? 700 : 400 }}>{row.totalLanded}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.isCheapest ? <span style={{ background: '#22c55e', color: '#fff', padding: '2px 8px', borderRadius: 20, fontSize: 10 }}>CHEAPEST OF 3</span> : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* External Comparison */}
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Step B: Cheapest of 3 vs Similar Platforms – 1688/Alibaba Direct – Risk Flag</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginBottom: 24 }}>
            {Object.entries(externalComparison).map(([key, val]: any) => (
              <div key={key} style={{ border: `1px solid ${val.verified ? '#bbf7d0' : '#fde68a'}`, borderRadius: 12, padding: 12, background: val.verified ? '#f0fdf4' : '#fefce8' }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{key.toUpperCase().replace('_', ' ')}</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>${val.cost.toFixed(2)}</div>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>{val.risk || val.ddp}</div>
                <div style={{ fontSize: 11, color: val.verified ? '#15803d' : '#a16207', marginTop: 8, fontWeight: 600 }}>{val.recommendation}</div>
              </div>
            ))}
          </div>

          {/* Platform Fee Placement */}
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Platform Fee – When to Add – Zero-Markup Transparent Model</h3>
          <div style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
            {Object.entries(feePlacementAnalysis).map(([key, val]: any) => (
              <div key={key} style={{ border: `1px solid ${val.recommended ? '#bbf7d0' : '#e2e8f0'}`, borderRadius: 12, padding: 12, background: val.recommended ? '#f0fdf4' : '#fff' }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{key.replace(/_/g, ' ')} {val.recommended ? '✓ RECOMMENDED' : ''}</div>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>{val.effect}</div>
                {val.implementation && <div style={{ fontSize: 11, color: '#0f172a', marginTop: 8, fontFamily: 'monospace', background: '#fff', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}>{val.implementation}</div>}
                {val.breakdown && <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>{val.breakdown}</div>}
              </div>
            ))}
          </div>

          {/* Final DDP */}
          <div style={{ background: '#0f172a', color: '#fff', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>FINAL DDP TO PREMISES – VALID 3 DAYS – ONLY DDP – NO FOB – PLATFORM FEE ADDED AFTER CHEAPEST SELECTION</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>{finalDDP.ddpString}</div>
            <div style={{ fontSize: 13, marginTop: 8, opacity: 0.9 }}>
              Cheapest verified: {cheapestOf3.provider} ${cheapestOf3.totalLanded.toFixed(2)} + NiChAm fee {platformFee.percent}% (${platformFee.amount.toFixed(2)}) = ${finalDDP.amount.toFixed(2)} DDP to {data.location}
            </div>
            <div style={{ fontSize: 11, marginTop: 8, opacity: 0.7 }}>{platformFee.note}</div>
            <div style={{ fontSize: 11, marginTop: 12, opacity: 0.8 }}>Valid until: {new Date(finalDDP.validUntil).toLocaleString()} – MoMo linked – Deposit fund with Paystack test api / Flutterwave for orders – As you said – People create MoMo on phone and link to Nicham</div>
          </div>

          {/* AI Decision */}
          <div style={{ marginTop: 20, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1d4ed8' }}>AI DECISION – CHEAPEST FIRST – PLATFORM FEE AFTER</div>
            <div style={{ fontSize: 13, marginTop: 8 }}>{aiDecision.recommendation}</div>
            <div style={{ fontSize: 12, marginTop: 12 }}>
              {aiDecision.nextSteps.map((s: string, i: number) => <div key={i} style={{ marginTop: 4 }}>• {s}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
