
"use client"
import { useState, useEffect } from 'react'

const INITIAL_COMPANIES = [
  { id: 1, name: 'Motoma', whatsapp: '+971 52 580 3914', phone: '971525803914', type: 'Battery', category: 'Manufacturer', status: 'Active', products: 'M68PW, M69PW, M87PW, M88PW' },
  { id: 2, name: 'Must Power', whatsapp: '+86 189 2434 3876', phone: '8618924343876', type: 'Inverter/Battery', category: 'Manufacturer', status: 'Active', products: 'PV18, PH11, LP16, HBP' },
  { id: 3, name: 'Alibaba', whatsapp: '+86 153 7259 8293', phone: '8615372598293', type: 'General', category: 'Manufacturer', status: 'Active', products: 'Industrial Chemicals' },
  { id: 4, name: 'Made in China', whatsapp: '+86 193 7268 3720', phone: '8619372683720', type: 'General', category: 'Manufacturer', status: 'Active', products: 'Chemicals & Solar' },
  { id: 5, name: 'Made in China', whatsapp: '+86 181 1480 3584', phone: '8618114803584', type: 'General', category: 'Manufacturer', status: 'Active', products: 'Chemicals & Solar' },
]

export default function AdminPage() {
  const [tab, setTab] = useState('rfqs')
  const [companies, setCompanies] = useState(INITIAL_COMPANIES)
  const [rfqs, setRfqs] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [showAddCompany, setShowAddCompany] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newCompany, setNewCompany] = useState({ name: '', whatsapp: '', type: 'General', category: 'Manufacturer', products: '' })
  const [newProduct, setNewProduct] = useState({ name: '', cat: '', desc: '', price: '', moq: '', manufacturer: '', brand: 'CHEMICAL' })
  const [toast, setToast] = useState('')

  useEffect(() => {
    const savedRfqs = localStorage.getItem('nicham_rfqs')
    if (savedRfqs) setRfqs(JSON.parse(savedRfqs))
    const savedCompanies = localStorage.getItem('nicham_companies')
    if (savedCompanies) setCompanies(JSON.parse(savedCompanies))
    const savedProducts = localStorage.getItem('nicham_products')
    if (savedProducts) setProducts(JSON.parse(savedProducts))
  }, [])

  const saveToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 4000)
  }

  const handleForward = (rfq: any, company: any, service: string = 'Manufacturer') => {
    const msg = `🔔 FORWARD RFQ – ${service}\n\nProduct: ${rfq.product}\nManufacturer: ${rfq.manufacturer}\nCategory: ${rfq.category}\nDesc: ${rfq.desc}\nPrice: ${rfq.price}\nMOQ: ${rfq.moq}\n\n📍 DDP Lagos, Nigeria – DDP to Premises Minna\n🏢 From: NiChAm Trade – Customer RFQ\nTime: ${rfq.time}\n\nPlease quote DDP Lagos with shipping & docs.\n\nForwarded via Admin Console – NiChAm Trade +234 705 047 7950`
    saveToast(`Forwarding to ${company.name} ${company.whatsapp} – ${service}`)
    window.open(`https://wa.me/${company.phone}?text=${encodeURIComponent(msg)}`, '_blank')
    const updated = rfqs.map(r => r.id === rfq.id ? {...r, status: `Forwarded to ${company.name} – ${service}`} : r)
    setRfqs(updated)
    localStorage.setItem('nicham_rfqs', JSON.stringify(updated))
  }

  const handleLogistics = (rfq: any, type: string) => {
    const msg = `${type.toUpperCase()} REQUEST – NiChAm Trade\n\nProduct: ${rfq.product}\nManufacturer: ${rfq.manufacturer}\nDDP: Lagos, Nigeria\n\nPlease provide ${type} quote for DDP shipment.\n\nNiChAm Trade Admin – +234 705 047 7950`
    saveToast(`${type} request logged for ${rfq.product}`)
    // In real app, this would go to logistics/insurance/inspector WhatsApp – For demo, open NiChAm Trade WhatsApp
    window.open(`https://wa.me/2347050477950?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const addCompany = () => {
    if (!newCompany.name || !newCompany.whatsapp) return saveToast('Name and WhatsApp required')
    const phone = newCompany.whatsapp.replace(/[^0-9]/g, '')
    const comp = { id: Date.now(), name: newCompany.name, whatsapp: newCompany.whatsapp, phone, type: newCompany.type, category: newCompany.category, status: 'Active', products: newCompany.products }
    const updated = [...companies, comp]
    setCompanies(updated)
    localStorage.setItem('nicham_companies', JSON.stringify(updated))
    setNewCompany({ name: '', whatsapp: '', type: 'General', category: 'Manufacturer', products: '' })
    setShowAddCompany(false)
    saveToast(`Company ${comp.name} onboarded – ${comp.whatsapp}`)
  }

  const addProduct = () => {
    if (!newProduct.name) return saveToast('Product name required')
    const prod = { id: Date.now(), ...newProduct, time: new Date().toLocaleString() }
    const updated = [...products, prod]
    setProducts(updated)
    localStorage.setItem('nicham_products', JSON.stringify(updated))
    setNewProduct({ name: '', cat: '', desc: '', price: '', moq: '', manufacturer: '', brand: 'CHEMICAL' })
    setShowAddProduct(false)
    saveToast(`Product ${prod.name} listed – ${prod.brand}`)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      <div style={{minHeight: '100vh', background: '#f8fafc', display: 'flex'}}>
        {/* SIDEBAR */}
        <div style={{width: '240px', background: '#0f172a', color: 'white', padding: '20px', position: 'fixed', height: '100vh', overflowY: 'auto'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px'}}>
            <div style={{width: '36px', height: '36px', background: '#f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>🏭</div>
            <div>
              <div style={{fontWeight: 800, fontSize: '14px'}}>NiChAm Trade</div>
              <div style={{fontSize: '11px', color: '#94a3b8'}}>Admin Console</div>
            </div>
          </div>

          {[
            {key: 'rfqs', label: 'RFQs', icon: '📩', count: rfqs.length},
            {key: 'companies', label: 'Companies', icon: '🏢', count: companies.length},
            {key: 'products', label: 'Products', icon: '📦', count: products.length},
            {key: 'logistics', label: 'Logistics', icon: '🚚'},
            {key: 'insurance', label: 'Insurance', icon: '🛡️'},
            {key: 'inspector', label: 'Inspector', icon: '🔍'},
          ].map(item => (
            <button key={item.key} onClick={() => setTab(item.key)} style={{
              width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: '8px', border: 'none',
              background: tab === item.key ? '#1e293b' : 'transparent', color: tab === item.key ? 'white' : '#94a3b8',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '4px', fontWeight: 600, fontSize: '13px'
            }}>
              <span>{item.icon} {item.label}</span>
              {item.count !== undefined && <span style={{background: '#f59e0b', color: 'black', padding: '2px 6px', borderRadius: '10px', fontSize: '10px'}}>{item.count}</span>}
            </button>
          ))}

          <div style={{marginTop: '24px', padding: '12px', background: '#1e293b', borderRadius: '10px'}}>
            <div style={{fontSize: '11px', color: '#94a3b8', fontWeight: 700}}>All RFQs to:</div>
            <div style={{fontSize: '13px', fontWeight: 800, color: '#f59e0b', marginTop: '4px'}}>NiChAm Trade</div>
            <div style={{fontSize: '12px', fontWeight: 700}}>+234 705 047 7950</div>
            <div style={{fontSize: '10px', color: '#64748b', marginTop: '6px'}}>Supplier numbers hidden from customer app – Only visible here for forwarding</div>
          </div>

          <a href="/" style={{display: 'block', marginTop: '20px', textAlign: 'center', padding: '10px', background: '#f59e0b', color: 'black', borderRadius: '8px', fontWeight: 800, fontSize: '12px', textDecoration: 'none'}}>← Customer View</a>
        </div>

        {/* MAIN */}
        <div style={{marginLeft: '240px', flex: 1, padding: '24px'}}>
          {toast && <div style={{position: 'fixed', top: '18px', right: '18px', background: '#16a34a', color: 'white', padding: '12px 18px', borderRadius: '10px', zIndex: 9999, fontWeight: 700, fontSize: '12px'}}>{toast}</div>}

          {tab === 'rfqs' && (
            <div>
              <h1 style={{fontSize: '22px', fontWeight: 800}}>RFQs – DDP Lagos, Nigeria – Forward to Manufacturer</h1>
              <p style={{color: '#64748b', fontSize: '13px', marginTop: '4px'}}>Customer RFQs come to NiChAm Trade +234 705 047 7950 – Admin forwards to right manufacturer with manufacturer name (except chemical) + Logistics/Insurance/Inspector</p>

              <div style={{marginTop: '18px', background: 'white', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'}}>
                {rfqs.length === 0 ? (
                  <div style={{textAlign: 'center', padding: '40px', color: '#94a3b8'}}>
                    <div style={{fontSize: '32px'}}>📩</div>
                    <div style={{fontWeight: 700, marginTop: '8px'}}>No RFQs yet</div>
                    <div style={{fontSize: '12px', marginTop: '4px'}}>When customers click Request for Quote on main site, RFQs appear here – Then you forward to Motoma, Must Power, Alibaba, Made in China etc</div>
                  </div>
                ) : (
                  <div style={{overflowX: 'auto'}}>
                    <table style={{width: '100%', fontSize: '12px', borderCollapse: 'collapse'}}>
                      <thead>
                        <tr style={{textAlign: 'left', borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '11px', textTransform: 'uppercase'}}>
                          <th style={{padding: '8px'}}>Time</th>
                          <th style={{padding: '8px'}}>Product</th>
                          <th style={{padding: '8px'}}>Manufacturer</th>
                          <th style={{padding: '8px'}}>Status</th>
                          <th style={{padding: '8px'}}>Forward</th>
                          <th style={{padding: '8px'}}>Services</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rfqs.map(r => (
                          <tr key={r.id} style={{borderBottom: '1px solid #f8fafc'}}>
                            <td style={{padding: '10px', color: '#64748b', fontSize: '11px'}}>{r.time}</td>
                            <td style={{padding: '10px', fontWeight: 700}}>{r.product}<div style={{fontSize: '10px', color: '#94a3b8', fontWeight: 400}}>{r.desc}</div></td>
                            <td style={{padding: '10px'}}><span style={{background: r.brand === 'CHEMICAL' ? '#eef2ff' : '#fffbeb', padding: '3px 8px', borderRadius: '12px', fontWeight: 700, fontSize: '11px'}}>{r.manufacturer}</span></td>
                            <td style={{padding: '10px'}}><span style={{background: r.status.includes('Forwarded') ? '#dcfce7' : '#fef3c7', color: r.status.includes('Forwarded') ? '#166534' : '#92400e', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700}}>{r.status}</span></td>
                            <td style={{padding: '10px'}}>
                              <select onChange={e => {
                                const comp = companies.find(c => c.id === parseInt(e.target.value))
                                if (comp) handleForward(r, comp)
                              }} style={{padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11px'}}>
                                <option>Forward to Manufacturer...</option>
                                {companies.map(c => <option key={c.id} value={c.id}>{c.name} – {c.whatsapp}</option>)}
                              </select>
                            </td>
                            <td style={{padding: '10px', display: 'flex', gap: '4px'}}>
                              <button onClick={() => handleLogistics(r, 'Logistics')} style={{padding: '4px 8px', borderRadius: '6px', border: 'none', background: '#0f172a', color: 'white', fontSize: '10px', cursor: 'pointer'}}>🚚 Logistics</button>
                              <button onClick={() => handleLogistics(r, 'Insurance')} style={{padding: '4px 8px', borderRadius: '6px', border: 'none', background: '#1e40af', color: 'white', fontSize: '10px', cursor: 'pointer'}}>🛡️ Insurance</button>
                              <button onClick={() => handleLogistics(r, 'Inspector')} style={{padding: '4px 8px', borderRadius: '6px', border: 'none', background: '#7c3aed', color: 'white', fontSize: '10px', cursor: 'pointer'}}>🔍 Inspector</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'companies' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 style={{fontSize: '22px', fontWeight: 800}}>Companies – Onboard More Companies</h1>
                <button onClick={() => setShowAddCompany(true)} style={{padding: '10px 16px', background: '#0f172a', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer'}}>+ Add Company</button>
              </div>
              <p style={{color: '#64748b', fontSize: '13px', marginTop: '4px'}}>Manufacturer numbers hidden from customer app – Only visible here – Forward RFQ to right manufacturer – Admin can onboard more companies</p>

              <div style={{marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px'}}>
                {companies.map(c => (
                  <div key={c.id} style={{background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{fontWeight: 800, fontSize: '14px'}}>{c.name}</div>
                      <span style={{fontSize: '10px', background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '10px', fontWeight: 700}}>{c.status}</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#0f172a', fontWeight: 700, marginTop: '6px'}}>📱 {c.whatsapp}</div>
                    <div style={{fontSize: '11px', color: '#64748b', marginTop: '4px'}}>{c.type} – {c.category}</div>
                    <div style={{fontSize: '11px', color: '#94a3b8', marginTop: '6px'}}>{c.products}</div>
                    <button onClick={() => window.open(`https://wa.me/${c.phone}?text=${encodeURIComponent(`Hi ${c.name} – From NiChAm Trade Admin – ${c.products}`)}`, '_blank')} style={{marginTop: '10px', width: '100%', padding: '8px', background: '#25D366', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer'}}>WhatsApp {c.name}</button>
                  </div>
                ))}
              </div>

              {showAddCompany && (
                <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
                  <div style={{background: 'white', borderRadius: '16px', padding: '20px', width: '400px'}}>
                    <h3 style={{fontWeight: 800, fontSize: '16px'}}>Onboard New Company</h3>
                    <input placeholder="Company Name (e.g., New Chemical Co)" value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '12px', fontSize: '13px'}} />
                    <input placeholder="WhatsApp (e.g., +86 123 4567 8901)" value={newCompany.whatsapp} onChange={e => setNewCompany({...newCompany, whatsapp: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '8px', fontSize: '13px'}} />
                    <input placeholder="Type (Battery/Inverter/Chemical/General)" value={newCompany.type} onChange={e => setNewCompany({...newCompany, type: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '8px', fontSize: '13px'}} />
                    <input placeholder="Products (e.g., Caustic Soda, PAC)" value={newCompany.products} onChange={e => setNewCompany({...newCompany, products: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '8px', fontSize: '13px'}} />
                    <div style={{display: 'flex', gap: '8px', marginTop: '14px'}}>
                      <button onClick={addCompany} style={{flex: 1, padding: '10px', background: '#0f172a', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer'}}>Add Company</button>
                      <button onClick={() => setShowAddCompany(false)} style={{flex: 1, padding: '10px', background: '#f1f5f9', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer'}}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'products' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 style={{fontSize: '22px', fontWeight: 800}}>Products – List More Items</h1>
                <button onClick={() => setShowAddProduct(true)} style={{padding: '10px 16px', background: '#0f172a', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer'}}>+ List More Item</button>
              </div>
              <p style={{color: '#64748b', fontSize: '13px', marginTop: '4px'}}>Admin can list more chemical and solar items – They appear on customer app – RFQ goes to +234 705 047 7950 with manufacturer name except chemical</p>
              <div style={{marginTop: '16px', background: 'white', borderRadius: '14px', padding: '16px'}}>
                {products.length === 0 ? <div style={{textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '13px'}}>No custom products yet – Click + List More Item to add industrial chemicals or solar models – They will show on customer app with beautiful cards</div> : products.map(p => <div key={p.id} style={{padding: '10px', borderBottom: '1px solid #f1f5f9', fontSize: '13px'}}><strong>{p.name}</strong> – {p.cat} – {p.manufacturer || 'Chemical (no manufacturer)'} – {p.price}</div>)}
              </div>

              {showAddProduct && (
                <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
                  <div style={{background: 'white', borderRadius: '16px', padding: '20px', width: '400px'}}>
                    <h3 style={{fontWeight: 800, fontSize: '16px'}}>List More Item</h3>
                    <input placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '12px', fontSize: '13px'}} />
                    <input placeholder="Category (Industrial Chemical / Solar)" value={newProduct.cat} onChange={e => setNewProduct({...newProduct, cat: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '8px', fontSize: '13px'}} />
                    <input placeholder="Manufacturer (leave empty for chemical)" value={newProduct.manufacturer} onChange={e => setNewProduct({...newProduct, manufacturer: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '8px', fontSize: '13px'}} />
                    <input placeholder="Description" value={newProduct.desc} onChange={e => setNewProduct({...newProduct, desc: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '8px', fontSize: '13px'}} />
                    <input placeholder="Price (e.g., $420/400/380/MT)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '8px', fontSize: '13px'}} />
                    <div style={{display: 'flex', gap: '8px', marginTop: '14px'}}>
                      <button onClick={addProduct} style={{flex: 1, padding: '10px', background: '#0f172a', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer'}}>List Item</button>
                      <button onClick={() => setShowAddProduct(false)} style={{flex: 1, padding: '10px', background: '#f1f5f9', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer'}}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {(tab === 'logistics' || tab === 'insurance' || tab === 'inspector') && (
            <div>
              <h1 style={{fontSize: '22px', fontWeight: 800, textTransform: 'capitalize'}}>{tab} – DDP Lagos Coordination</h1>
              <div style={{marginTop: '16px', background: 'white', borderRadius: '14px', padding: '24px', textAlign: 'center'}}>
                <div style={{fontSize: '36px'}}>{tab === 'logistics' ? '🚚' : tab === 'insurance' ? '🛡️' : '🔍'}</div>
                <div style={{fontWeight: 800, marginTop: '12px'}}>{tab.charAt(0).toUpperCase() + tab.slice(1)} Management</div>
                <div style={{fontSize: '13px', color: '#64748b', marginTop: '6px', maxWidth: '500px', margin: '6px auto'}}>
                  {tab === 'logistics' ? 'Coordinate DDP shipping from manufacturer to Lagos – Forwarding to Motoma, Must Power, Alibaba, Made in China – Track containers, ETA, customs' : 
                   tab === 'insurance' ? 'Arrange cargo insurance for DDP Lagos shipments – Cover chemicals and solar – Get quotes from insurers' :
                   'Arrange pre-shipment inspection – Quality check for chemicals and solar – Inspector reports – SGS, Bureau Veritas'}
                </div>
                <button onClick={() => window.open(`https://wa.me/2347050477950?text=${encodeURIComponent(`${tab.toUpperCase()} – NiChAm Trade – DDP Lagos – Need ${tab} coordination`)}`, '_blank')} style={{marginTop: '16px', padding: '10px 20px', background: '#0f172a', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer'}}>Manage {tab}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

