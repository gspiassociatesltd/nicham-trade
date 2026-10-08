'use client'
import { useState } from 'react'

// Catalogue Extraction Mechanism – Admin Console – HONEST Pharma Catalogue – Industrial chemicals tab

export default function CatalogExtractor() {
  const [extracting, setExtracting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleExtract = async () => {
    setExtracting(true)
    try {
      const form = new FormData()
      if (file) form.append('file', file)
      form.append('category', 'Industrial chemicals')
      
      const res = await fetch('/api/catalog/extract', { method: 'POST', body: form })
      const data = await res.json()
      setResult(data)
    } catch (e: any) {
      alert(e.message)
    }
    setExtracting(false)
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 20 }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Catalogue Extraction Mechanism – Admin Console – Industrial Chemicals Tab</h3>
      <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Extract products and picture and data sheet to Nicham under Industrial chemicals tab – HONEST Pharma 16 pages – 16 products – Pictures + Data sheets</div>
      
      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Upload Catalogue PDF – HONEST-Catalogue-Pharma.pdf or any supplier catalogue</label>
          <input type="file" accept=".pdf" onChange={e => setFile(e.target.files?.[0] || null)} style={{ width: '100%', marginTop: 6, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8 }} />
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Selected: {file?.name || 'HONEST-Catalogue-Pharma.pdf – 16 pages – Pre-loaded – Will extract 16 products: HPMC, HEC, MCC, CMC, HPC, EC, Vegetable Capsule, Film Coating, CMS-NA, Magnesium Stearate, Povidone K30/K90, Crospovidone PVPP, HP-Beta-CD, Beta-CD, Maize Starch, Silicon Dioxide'}</div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleExtract} disabled={extracting} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 600, cursor: 'pointer', opacity: extracting ? 0.6 : 1 }}>
            {extracting ? 'Extracting 16 products...' : 'Extract Products + Picture + Data Sheet to Industrial chemicals Tab'}
          </button>
          <button onClick={async () => { const res = await fetch('/api/catalog/extract'); const d = await res.json(); setResult(d); }} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 20px', cursor: 'pointer' }}>
            View Existing Industrial Chemicals
          </button>
        </div>

        {result && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#15803d' }}>✓ {result.message}</div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>Total Extracted: {result.totalExtracted || result.total} – Tab: {result.tab} – Added: {result.added}</div>
            </div>

            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, maxHeight: 600, overflowY: 'auto' }}>
              {(result.products || []).map((p: any) => (
                <div key={p.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                  <img src={p.image || p.pictureUrl} alt={p.name} style={{ width: '100%', height: 120, objectFit: 'cover', background: '#f8fafc' }} />
                  <div style={{ padding: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>{p.subCategory} – {p.cas} – MOQ {p.moq} – Packing {p.packing}</div>
                    <div style={{ fontSize: 10, color: '#475569', marginTop: 6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.function?.slice(0, 120)}...</div>
                    <div style={{ fontSize: 9, color: '#64748b', marginTop: 6 }}>Data Sheet: Page {p.originalPage} – {p.dataSheet?.slice(0, 80)}...</div>
                    <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 9, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 6px', borderRadius: 20 }}>Industrial chemicals</span>
                      <span style={{ fontSize: 9, background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 6px', borderRadius: 20 }}>Page {p.originalPage}</span>
                      <span style={{ fontSize: 9, background: '#fefce8', border: '1px solid #fde68a', padding: '2px 6px', borderRadius: 20 }}>HONEST Verified</span>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 10, color: '#0f172a', fontWeight: 600 }}>DDP to premises – Valid 3 Days – Only DDP – Routes to AfricanIES, Proc360, Laybel – AI cheapest first – Platform fee after</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 16, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, fontSize: 11, color: '#475569' }}>
        <div style={{ fontWeight: 600 }}>How Catalogue Extraction Works – Admin Console Mechanism:</div>
        <div style={{ marginTop: 4 }}>1. Admin uploads PDF catalogue – HONEST-Catalogue-Pharma.pdf – 16 pages – Or any supplier PDF – System extracts text via PyMuPDF – Extracts images per page</div>
        <div>2. Parses Product Appearance, Product Function, Storage Conditions, Packing, MOQ, Specs, CAS, Index table, data sheet</div>
        <div>3. Creates product entry under Industrial chemicals tab – With picture (placeholder + extracted image), data sheet link to PDF page, supplier verified, sourceUrl saved internally, quote delivered to company from whose page item and picture pulled</div>
        <div>4. Product appears in Nicham marketplace under Industrial chemicals – User sees – Clicks Get Exact DDP to Premises Quote – Valid 3 Days – Only DDP – Routes to AfricanIES ($15/kg Lagos), Proc360 (7% link, $15 inspection), Laybel (dry ports) – AI chooses cheapest of 3 before comparing to 1688/Alibaba – Platform fee added AFTER cheapest – Zero-markup transparent</div>
        <div style={{ marginTop: 6, fontWeight: 600 }}>Products extracted: HPMC, HEC, MCC PH101/102, CMC Pharma, HPC H-HPC, EC K N T, Vegetable Capsule HPMC, Film Coating HONESTA Stomach/Intestine, CMS-NA, Magnesium Stearate MS, Povidone K30/K90, Crospovidone PVPP, Hydroxypropyl Beta Cyclodextrin HP-β-CD, Beta Cyclodextrin, Maize Starch Corn Starch, Silicon Dioxide SiO2 Colloidal Silica – All from Shanghai Honest Chem Co Ltd – Comalong Building 204, 889 Yi Shan Rd Shanghai – lannie@honestsh.com – www.honestsh.net</div>
      </div>
    </div>
  )
}
