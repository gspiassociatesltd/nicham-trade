'use client'
import { useState, useEffect } from 'react'
export default function SupplierAgent() {
  const [name, setName] = useState('')
  const [wechat, setWechat] = useState('')
  const [code, setCode] = useState('')
  const [factories, setFactories] = useState<any[]>([])
  useEffect(() => {
    const c = localStorage.getItem('nicham_supplier_code')
    const n = localStorage.getItem('nicham_supplier_name')
    const w = localStorage.getItem('nicham_supplier_wechat')
    const f = localStorage.getItem('nicham_supplier_factories')
    if (c) setCode(c)
    if (n) setName(n)
    if (w) setWechat(w)
    if (f) setFactories(JSON.parse(f))
  }, [])
  const generate = () => {
    if (!name || !wechat) { alert('Enter name and WeChat'); return }
    const newCode = 'NICHAM-SUP-' + name.substring(0,3).toUpperCase() + '-' + Date.now().toString().slice(-4)
    setCode(newCode)
    localStorage.setItem('nicham_supplier_code', newCode)
    localStorage.setItem('nicham_supplier_name', name)
    localStorage.setItem('nicham_supplier_wechat', wechat)
  }
  const addFactory = () => {
    const fname = prompt('Factory name')
    const product = prompt('Product e.g. Caustic Soda 99%')
    const price = prompt('Price e.g. $420/ton')
    if (!fname || !product) return
    const newF = { factory: fname, product, price, code, date: new Date().toLocaleString() }
    const updated = [newF, ...factories]
    setFactories(updated)
    localStorage.setItem('nicham_supplier_factories', JSON.stringify(updated))
  }
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold">← NiChAm-Trade</a>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mt-3">
        <h1 className="text-xl font-black">China Supplier Agent - Perpetual</h1>
        <div className="text-xs text-gray-600">Find manufacturers in China, earn 2% lifetime on sales.</div>
        {!code ? (
          <div className="mt-4 bg-green-50 border-2 border-green-300 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-2">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name e.g. Li Wei" className="px-3 py-2 rounded-full border text-xs" />
              <input value={wechat} onChange={e=>setWechat(e.target.value)} placeholder="WeChat ID" className="px-3 py-2 rounded-full border text-xs" />
            </div>
            <button onClick={generate} className="mt-3 w-full py-2.5 bg-green-600 text-white rounded-full font-black text-sm">Generate Supplier Code</button>
          </div>
        ) : (
          <div className="mt-4 bg-green-50 border-2 border-green-400 rounded-xl p-4">
            <div className="font-black text-green-800">Code: {code}</div>
            <div className="text-[11px]">Name: {name} | WeChat: {wechat} | Factories: {factories.length}</div>
            <button onClick={addFactory} className="mt-3 w-full py-2 bg-black text-white rounded-full text-xs font-bold">+ Add Factory Found in China</button>
            <div className="mt-3">{factories.map((f,i)=>(<div key={i} className="mt-2 p-2 bg-white rounded-xl text-xs border"><b>{f.factory}</b> - {f.product} - {f.price}</div>))}</div>
          </div>
        )}
      </div>
    </main>
  )
}
