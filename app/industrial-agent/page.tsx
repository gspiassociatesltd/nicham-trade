'use client'
import { useState, useEffect } from 'react'
export default function IndustrialAgent() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  useEffect(() => {
    const c = localStorage.getItem('nicham_buyer_code')
    const n = localStorage.getItem('nicham_buyer_name')
    const p = localStorage.getItem('nicham_buyer_phone')
    if (c) setCode(c)
    if (n) setName(n)
    if (p) setPhone(p)
  }, [])
  const generate = () => {
    if (!name || !phone) { alert('Enter name and phone'); return }
    const newCode = 'NICHAM-BUY-' + name.substring(0,3).toUpperCase() + '-' + phone.slice(-4)
    setCode(newCode)
    localStorage.setItem('nicham_buyer_code', newCode)
    localStorage.setItem('nicham_buyer_name', name)
    localStorage.setItem('nicham_buyer_phone', phone)
  }
  const shareLink = () => {
    const link = `${window.location.origin}/chemicals?ref=${code}`
    const text = `NiChAm-Trade Chemicals 15 Items: Caustic Soda $420/ton, Soda Ash $280/ton, PAC $350/ton, Hypochlorite $1450/ton, Paracetamol $5.5/kg, Natrosol $3200/ton etc Buy via my link: ${link} Perpetual commission on re-orders.`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold">← NiChAm-Trade</a>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mt-3">
        <h1 className="text-xl font-black">Industrial Buyer Agent - Perpetual</h1>
        <div className="text-xs text-gray-600">Bring bulk buyers, earn 3-5% lifetime on re-orders.</div>
        {!code ? (
          <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-2">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name e.g. Emeka" className="px-3 py-2 rounded-full border text-xs" />
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone 0803..." className="px-3 py-2 rounded-full border text-xs" />
            </div>
            <button onClick={generate} className="mt-3 w-full py-2.5 bg-yellow-500 text-black rounded-full font-black text-sm">Generate Buyer Code - Perpetual</button>
          </div>
        ) : (
          <div className="mt-4 bg-green-50 border-2 border-green-400 rounded-xl p-4">
            <div className="font-black text-green-800">Code: {code} - Perpetual</div>
            <div className="text-[11px]">Name: {name} | Phone: {phone}</div>
            <button onClick={shareLink} className="mt-3 w-full py-2.5 bg-green-600 text-white rounded-full font-black text-sm">Share Chemicals Catalog WhatsApp with Perpetual Link</button>
            <div className="mt-3 text-[11px] bg-white p-3 rounded-xl">Example: 1 soap factory buys Caustic Soda 5 tons monthly at $420/ton = $2100/month. Your 3% = $63/month = N94k/month forever. 10 clients = N940k monthly passive.</div>
          </div>
        )}
      </div>
    </main>
  )
}
