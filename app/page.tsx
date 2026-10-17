"use client"
import { useState } from 'react'

const PRODUCTS = [
  // MOTOMA 4 – Dubai – +971 52 580 3914 – MOQ 12 pcs
  { id: 1, brand: 'MOTOMA', name: 'M68PW PRO - 200Ah 25.6V', cat: '25.6V Residential', desc: '200Ah 25.6V Grade A+ 8000 Cycles', moq: 'MOQ 12 pcs', price: '$880/860/840', wa: '971525803914' },
  { id: 2, brand: 'MOTOMA', name: 'M69PW PRO - 280Ah 25.6V', cat: '25.6V High Cap', desc: '280Ah High Capacity 15+ Years', moq: 'MOQ 12 pcs', price: '$1150/1120/1090', wa: '971525803914' },
  { id: 3, brand: 'MOTOMA', name: 'M87PW PRO - 100Ah 51.2V', cat: '51.2V Compact', desc: '100Ah 51.2V 8000 cycles Compact', moq: 'MOQ 12 pcs', price: '$590/570/550', wa: '971525803914' },
  { id: 4, brand: 'MOTOMA', name: 'M88PW PRO - 200Ah 51.2V', cat: '51.2V Popular', desc: '200Ah 51.2V 16 Parallel', moq: 'MOQ 12 pcs', price: '$1080/1050/1020', wa: '971525803914' },
  // MUST 14 – China – +86 189 2434 3876 – MOQ Mix 1/5/20
  { id: 5, brand: 'MUST', name: 'PV18-3224 VPMII', cat: 'High Frequency', desc: '3.2KW 24V 60A MPPT 160V VOC', moq: 'MOQ Mix 1/5/20', price: '$180/168/159', wa: '8618924343876' },
  { id: 6, brand: 'MUST', name: 'PV18-3624 PRO', cat: 'High Frequency', desc: '3.6KW 24V 100A MPPT 400V VOC', moq: 'MOQ Mix 1/5/20', price: '$180/168/159', wa: '8618924343876' },
  { id: 7, brand: 'MUST', name: 'PV18-6048 PRO', cat: 'High Frequency', desc: '6KW 48V 100A MPPT 450V VOC 7.83KGS', moq: 'MOQ Mix 1/5/20', price: '$270/240/227', wa: '8618924343876' },
  { id: 8, brand: 'MUST', name: 'PV19-10048EXP', cat: 'High Frequency', desc: '10KW 48V 150A MPPT 500V VOC WIFI Parallel 17.4KGS', moq: 'MOQ Mix 1/5/20', price: '$520/496/469', wa: '8618924343876' },
  { id: 9, brand: 'MUST', name: 'PH11-10KL1-EU', cat: 'IP65 230V', desc: '10KW 48V IP65 ON/OFF GRID 230V', moq: 'MOQ Mix 1/5/20', price: '$1200/1195/1129', wa: '8618924343876' },
  { id: 10, brand: 'MUST', name: 'PH11-15KL3-EU', cat: 'IP65 380V', desc: '15KW 48V IP65 ON/OFF GRID 380V', moq: 'MOQ Mix 1/5/20', price: '$1580/1572/1484', wa: '8618924343876' },
  { id: 11, brand: 'MUST', name: 'LP16-24200', cat: 'Li 25.6V', desc: '25.6V 200AH 5.12KWH BMS', moq: 'MOQ Mix 1/5/20', price: '$670/642/607', wa: '8618924343876' },
  { id: 12, brand: 'MUST', name: 'LP16-24300', cat: 'Wall Mounted', desc: '25.6V 300AH 7.68KWH WALL MOUNTED', moq: 'MOQ Mix 1/5/20', price: '$880/856/809', wa: '8618924343876' },
  { id: 13, brand: 'MUST', name: 'LP16-48100 SE', cat: '51.2V', desc: '51.2V 100AH 5.12KWH No WiFi kit', moq: 'MOQ Mix 1/5', price: '$630/610/590', wa: '8618924343876' },
  { id: 14, brand: 'MUST', name: 'LP16-48200', cat: '51.2V', desc: '51.2V 200AH 10.24KWH BMS', moq: 'MOQ Mix 1/5/20', price: '$1160/1120/1080', wa: '8618924343876' },
  { id: 15, brand: 'MUST', name: 'LP16-48300', cat: '51.2V High', desc: '51.2V 300AH 15.36KWH BMS', moq: 'MOQ Mix 1/5/20', price: '$1550/1510/1470', wa: '8618924343876' },
  { id: 16, brand: 'MUST', name: 'HBP15-1012', cat: 'ALL IN ONE', desc: '1KW WITH 1.28KWH LITHIUM ALL IN ONE ESS', moq: 'MOQ Mix 1/5', price: '$390/370/350', wa: '8618924343876' },
  { id: 17, brand: 'MUST', name: 'HBP18-3024 OS', cat: 'HBP Series', desc: '3KW 3KWH ALL IN ONE', moq: 'MOQ Mix 1/5/20', price: '$650/620/590', wa: '8618924343876' },
  { id: 18, brand: 'MUST', name: 'HBP18-5548 ES', cat: 'HBP Series', desc: '5.5KW 10.24KWH ESS', moq: 'MOQ Mix 1/5/20', price: '$1572/1520/1480', wa: '8618924343876' },
]

export default function Page() {
  const [filter, setFilter] = useState('All')
  const [toast, setToast] = useState('')

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.brand === filter)

  const handleRFQ = (p: any) => {
    const isMotoma = p.brand === 'MOTOMA'
    const phone = isMotoma ? '971525803914' : '8618924343876'
    const factory = isMotoma ? 'MOTOMA Dubai Team 🇦🇪' : 'MUST Factory Team 🇨🇳'
    const msg = `Hi ${factory}\n\nRFQ for ${p.name}\n${p.desc}\n\n- DDP Lagos, Nigeria\n- DDP to Premises Minna, Niger State\n- NiChAm Trade\n- Qty: Please quote Tier 1/5/20\n\nAdmin notified – Please send DDP price.`
    setToast(`Admin notified – RFQ for ${p.name} logged – DDP Lagos – Opening WhatsApp ${isMotoma ? '+971 52 580 3914' : '+86 189 2434 3876'}`)
    setTimeout(() => setToast(''), 4000)
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-900 text-white p-6">
        <h1 className="text-3xl font-bold">NiChAm Trade – Powering Nigeria</h1>
        <p className="text-gray-300 mt-2 text-sm">Source MUSTNG.pdf 14 models + MOTOMA 4 models – Mix MOQ Policy: 3 inverters + 2 batteries = 5 units price – DDP Lagos, Nigeria – Valid 3 Days – Only EU/US Standards</p>
        <div className="mt-4 flex gap-2">
          {['All', 'MOTOMA', 'MUST'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-bold ${filter === f ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white'}`}>{f === 'All' ? 'All 18' : f === 'MOTOMA' ? 'MOTOMA Dubai 🇦🇪' : 'MUST Factory 🇨🇳'} {f === 'All' ? '' : f === 'MOTOMA' ? '(4)' : '(14)'}</button>
          ))}
        </div>
      </header>

      {toast && <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl z-50 font-bold">{toast}</div>}

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-3">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.brand === 'MOTOMA' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>{p.brand} {p.brand === 'MOTOMA' ? '🇦🇪' : '🇨🇳'}</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-bold">{p.moq}</span>
            </div>
            <div className="text-xs text-gray-500 font-bold mb-1">{p.cat}</div>
            <h3 className="font-bold text-slate-900 mb-1">{p.name}</h3>
            <p className="text-xs text-gray-500 mb-3 h-8">{p.desc}</p>
            <div className="bg-gray-100 rounded-lg p-2 text-sm font-bold mb-3">{p.price}</div>
            <button onClick={() => handleRFQ(p)} className="w-full bg-slate-900 text-white rounded-xl py-3 text-sm font-bold hover:bg-black transition">
              Request for Quote – DDP Lagos
            </button>
            <div className="text-xs text-center mt-2 text-gray-400">{p.brand === 'MOTOMA' ? 'WhatsApp +971 52 580 3914' : 'WhatsApp +86 189 2434 3876'}</div>
          </div>
        ))}
      </main>
    </div>
  )
}
