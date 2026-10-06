'use client'
import { useState, useEffect } from 'react'

interface ButtonLink {
  motoma: string
  alibaba: string
  madeinchina: string
}

interface ProductButton {
  id: string
  name: string
  links: ButtonLink
  active: boolean
}

export default function SubheadingsAdmin() {
  const [buttons, setButtons] = useState<ProductButton[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => { loadButtons() }, [])

  async function loadButtons() {
    setLoading(true)
    try {
      const res = await fetch('/api/product-buttons')
      const data = await res.json()
      if (data.buttons) setButtons(data.buttons)
    } catch (e) {
      setMessage('Failed to load')
    } finally { setLoading(false) }
  }

  async function saveButtons() {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/product-buttons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buttons })
      })
      const data = await res.json()
      if (data.success) {
        setMessage('✅ Saved – Homepage selection buttons updated – AI will scan Motoma / Alibaba / Made-in-China links to pull what to display')
      } else {
        setMessage('Failed to save: ' + data.error)
      }
    } catch (e: any) {
      setMessage('Error: ' + e.message)
    } finally { setSaving(false) }
  }

  function addButton() {
    const id = 'btn_' + Date.now()
    setButtons([...buttons, { id, name: 'New Category e.g. Caustic Soda Flakes', links: { motoma: '', alibaba: '', madeinchina: '' }, active: true }])
  }

  function updateButton(index: number, field: string, value: any) {
    const newButtons = [...buttons]
    if (field === 'name' || field === 'active') {
      (newButtons[index] as any)[field] = value
    } else {
      (newButtons[index].links as any)[field] = value
    }
    setButtons(newButtons)
  }

  function deleteButton(index: number) {
    if (confirm('Delete this selection button? Products under it will not display')) {
      setButtons(buttons.filter((_, i) => i !== index))
    }
  }

  async function testScan(index: number) {
    const btn = buttons[index]
    setMessage(`Scanning ${btn.name} – Motoma / Alibaba / Made-in-China – Filtering EU/US standards only...`)
    try {
      const res = await fetch('/api/scout1688?buttonId=' + btn.id + '&buttonName=' + encodeURIComponent(btn.name))
      const data = await res.json()
      setMessage(`✅ Scanned ${btn.name} – Found ${data.total} products – EU/US standards only – Grade A+ – Cheapest same quality – Sources: ${data.sourcesScanned?.join(', ')}`)
    } catch (e: any) {
      setMessage('Scan error: ' + e.message)
    }
  }

  if (loading) return <div style={{ padding: 40, fontFamily: 'Inter' }}>Loading selection buttons...</div>

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: 20 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>Admin – Selection Buttons – What to Display</h1>
          <p style={{ color: '#64748b', marginTop: 8, fontSize: 14, lineHeight: 1.5 }}>
            <b>As agreed:</b> Admin will give names for the selection buttons and system scans using links of Motoma, Alibaba and Made in China to pull what to display.<br/>
            - Give name e.g. "25.6V Residential", "51.2V Popular", "Industrial Chemicals – Caustic Soda"<br/>
            - Paste 3 links: Motoma + Alibaba + Made-in-China – AI scans – Pulls cheapest same quality – EU/US standards only – Grade A+ – 8000 cycles – Packaging insurance compliant<br/>
            - Only items manufactured to EU/US standards only should be purchased – China GB only rejected<br/>
            - PSI Report must cover: Quantity, EU/US standard IEC/UL/CE/REACH/ISO, Grade A+ QR, Capacity test, BMS/COA, UN38.3/MSDS, Packaging insurance compliant photos, Marking, Factory audit
          </p>
          <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
            <button onClick={addButton} style={{ background: '#0f172a', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 800, border: 0, cursor: 'pointer' }}>+ Add Selection Button</button>
            <button onClick={saveButtons} disabled={saving} style={{ background: '#22c55e', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 800, border: 0, cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save – Update Homepage Buttons'}</button>
            <a href="/" target="_blank" style={{ background: '#f1f5f9', color: '#0f172a', padding: '10px 18px', borderRadius: 10, fontWeight: 800, textDecoration: 'none', border: '1px solid #e2e8f0' }}>View Homepage →</a>
          </div>
          {message && <div style={{ marginTop: 12, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: 12, borderRadius: 10, fontSize: 13, fontWeight: 600 }}>{message}</div>}
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {buttons.map((btn, idx) => (
            <div key={btn.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input value={btn.name} onChange={e => updateButton(idx, 'name', e.target.value)} placeholder="Button name e.g. 25.6V Residential Batteries" style={{ fontWeight: 800, fontSize: 16, padding: '8px 12px', borderRadius: 10, border: '1px solid #e2e8f0', minWidth: 320 }} />
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700 }}><input type="checkbox" checked={btn.active} onChange={e => updateButton(idx, 'active', e.target.checked)} /> Active – Show on homepage</label>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => testScan(idx)} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', padding: '6px 12px', borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>Test Scan AI</button>
                  <button onClick={() => deleteButton(idx)} style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '6px 12px', borderRadius: 8, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>Delete</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#166534' }}>Motoma Link</label>
                  <input value={btn.links.motoma} onChange={e => updateButton(idx, 'motoma', e.target.value)} placeholder="https://www.motoma.com/..." style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #bbf7d0', marginTop: 4, fontSize: 12, background: '#f0fdf4' }} />
                  <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>Official – Grade A+ – IEC/UL/CE</div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#b45309' }}>Alibaba Link</label>
                  <input value={btn.links.alibaba} onChange={e => updateButton(idx, 'alibaba', e.target.value)} placeholder="https://www.alibaba.com/..." style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #fde68a', marginTop: 4, fontSize: 12, background: '#fffbeb' }} />
                  <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>Check cheapest same quality</div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#1e40af' }}>Made-in-China Link</label>
                  <input value={btn.links.madeinchina} onChange={e => updateButton(idx, 'madeinchina', e.target.value)} placeholder="https://www.made-in-china.com/..." style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #bfdbfe', marginTop: 4, fontSize: 12, background: '#eff6ff' }} />
                  <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>Compare price</div>
                </div>
              </div>

              <div style={{ marginTop: 10, fontSize: 10, color: '#64748b', background: '#f8fafc', padding: 8, borderRadius: 8 }}>
                AI will scan these 3 links → Pull products → Filter EU/US standards only (IEC 62619, UL1973, CE, REACH, ISO, UN38.3) – Not GB China only → Grade A+ only → Cheapest same quality → Packaging insurance compliant (wooden crate + photos + shock indicator) → Display on homepage under "{btn.name}" button → DDP Lagos Valid 3 Days → Payment 30% after verification / 60% FOB+Freight after BL / 10% after delivery triggered by code scan by buyer
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, textAlign: 'center', color: '#94a3b8', fontSize: 11 }}>
          NiChAm Trade – Admin Selection Buttons – Motoma + Alibaba + Made-in-China – EU/US standards only – Grade A+ – DDP Only – 30/60/10 with code scan trigger
        </div>
      </div>
    </div>
  )
}
