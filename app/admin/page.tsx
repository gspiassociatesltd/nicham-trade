'use client'
import { useState, useEffect } from 'react'
import CatalogExtractor from '@/components/CatalogExtractor'

// Admin Page with Catalogue Extraction Mechanism – Industrial chemicals tab

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'quotes' | 'catalog' | 'industrial'>('catalog')
  const [quotes, setQuotes] = useState<any[]>([])
  const [industrial, setIndustrial] = useState<any[]>([])

  useEffect(() => {
    fetchQuotes()
    fetchIndustrial()
  }, [])

  const fetchQuotes = async () => {
    try {
      const res = await fetch('/api/quotes')
      const data = await res.json()
      setQuotes(data.quotes || [])
    } catch {}
  }

  const fetchIndustrial = async () => {
    try {
      const res = await fetch('/api/catalog/extract')
      const data = await res.json()
      setIndustrial(data.products || [])
    } catch {}
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#0f172a', color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>NiChAm Trade – Admin Console – Catalogue Extraction Mechanism</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setActiveTab('quotes')} style={{ background: activeTab === 'quotes' ? '#fff' : 'transparent', color: activeTab === 'quotes' ? '#0f172a' : '#fff', border: '1px solid #fff', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 600 }}>Quotes ({quotes.length})</button>
          <button onClick={() => setActiveTab('catalog')} style={{ background: activeTab === 'catalog' ? '#fff' : 'transparent', color: activeTab === 'catalog' ? '#0f172a' : '#fff', border: '1px solid #fff', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 600 }}>Catalogue Extraction</button>
          <button onClick={() => setActiveTab('industrial')} style={{ background: activeTab === 'industrial' ? '#fff' : 'transparent', color: activeTab === 'industrial' ? '#0f172a' : '#fff', border: '1px solid #fff', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontWeight: 600 }}>Industrial Chemicals ({industrial.length})</button>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '20px auto', padding: '0 20px' }}>
        {activeTab === 'catalog' && <CatalogExtractor />}

        {activeTab === 'industrial' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Industrial Chemicals Tab – Extracted from HONEST-Catalogue-Pharma.pdf – 16 Products – Pictures + Data Sheets</h2>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Products and picture and data sheet to Nicham under Industrial chemicals tab – Catalogue extraction mechanism – Shanghai Honest Chem – Comalong Building Shanghai – lannie@honestsh.com – Valid 3 Days Only DDP – Routes to AfricanIES Proc360 Laybel AI cheapest first platform fee after</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {industrial.map((p: any) => (
                <div key={p.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                  <img src={p.image || p.pictureUrl} alt={p.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                  <div style={{ padding: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{p.subCategory} – CAS {p.cas} – MOQ {p.moq} – Packing {p.packing} – Page {p.originalPage || p.originalPage}</div>
                    <div style={{ fontSize: 11, color: '#475569', marginTop: 8 }}>{p.appearance?.slice(0, 100)}...</div>
                    <div style={{ fontSize: 10, color: '#0f172a', marginTop: 8, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: 6 }}>
                      <div style={{ fontWeight: 600 }}>Data Sheet – Function:</div>
                      {p.function?.slice(0, 150)}...
                      <div style={{ marginTop: 4, fontWeight: 600 }}>Specs: {p.specs?.slice(0, 120)}...</div>
                      <div style={{ marginTop: 4 }}>Storage: {p.storage} – Source URL saved internally – {p.sourceUrl?.slice(0, 50)}...</div>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 9, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 6px', borderRadius: 20 }}>Industrial chemicals</span>
                      <span style={{ fontSize: 9, background: '#eff6ff', border: '1px solid #bfdbfe', padding: '2px 6px', borderRadius: 20 }}>Page {p.originalPage}</span>
                      <span style={{ fontSize: 9, background: '#fefce8', border: '1px solid #fde68a', padding: '2px 6px', borderRadius: 20 }}>HONEST Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {industrial.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', marginTop: 20 }}>
                <div>No products yet – Go to Catalogue Extraction tab – Click Extract Products + Picture + Data Sheet to Industrial chemicals Tab – HONEST 16 products</div>
                <button onClick={() => setActiveTab('catalog')} style={{ marginTop: 12, background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>Go to Extraction</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quotes' && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Total Quotes {quotes.length} – Routing to 3 Companies – Cheapest First – Platform Fee After</h2>
            <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
              {quotes.map((q: any) => (
                <div key={q.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{q.productName || q.productModel}</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{q.sourceCompany} – {q.sourcePlatform} – Qty {q.quantity} – Location {q.location}</div>
                      <div style={{ fontSize: 10, color: '#64748b', marginTop: 4, wordBreak: 'break-all' }}>Source URL saved internally: {q.sourceUrl?.slice(0, 80)}... – Quote delivered to company from whose page item and picture pulled – Valid until {q.validUntil ? new Date(q.validUntil).toLocaleString() : '3 Days'}</div>
                      <div style={{ fontSize: 11, color: '#0f172a', marginTop: 6 }}>{q.user?.name} – {q.email} – {q.phone} – MoMo {q.momoNumber || q.user?.momoNumber || 'Not linked – Create MoMo on phone and link'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: 20 }}>{q.status}</div>
                      <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>{q.createdAt ? new Date(q.createdAt).toLocaleString() : ''}</div>
                    </div>
                  </div>
                  {q.routing && (
                    <div style={{ marginTop: 12, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>Routing – Cheapest of 3 – AI Selected: {q.routing.cheapestOf3?.provider} – ${q.routing.cheapestOf3?.totalLanded?.toFixed(2)} – Platform fee {q.routing.platformFee?.percent}% (${q.routing.platformFee?.amount?.toFixed(2)}) – Final DDP ${q.routing.finalDDP?.amount?.toFixed(2)} – Valid 3 Days</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
