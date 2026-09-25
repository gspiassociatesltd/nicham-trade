"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Product = { id: string, title: string, description: string, category: string }

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('products').select('*').eq('is_homepage_visible', true).order('title')
      if (!error && data) setProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-black text-xl text-[#0a3d1f]">NiChAm Trade <span className="text-[#f4b400]">.</span></div>
          <div className="text-sm text-gray-600">GSPI Associates Ltd | Enugu</div>
        </div>
      </header>

      <section className="bg-[#0a3d1f] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block bg-[#f4b400] text-[#0a3d1f] px-3 py-1 text-xs font-bold rounded-full mb-4">DUAL-QUOTE MVP LIVE</div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Source Solar & EV Direct from China - With Honest Naira Landed Cost</h1>
            <p className="mt-4 text-white/80">Ex-China FOB + Africanies 72hr Naira Quote + Tax. No Hidden Factory Name. CE/TUV Verified.</p>
            <div className="mt-6 flex gap-3">
              <button className="bg-[#f4b400] text-[#0a3d1f] px-6 py-3 rounded font-bold">Request Quote</button>
              <button className="border border-white/30 px-6 py-3 rounded font-bold">How It Works</button>
            </div>
            <div className="mt-6 text-xs text-white/60">Supabase Project: kjeyqcxbqwiqenigpcot.supabase.co | 13 Tables Ready</div>
          </div>
          <div className="bg-white text-[#0a3d1f] p-6 rounded-2xl shadow-2xl">
            <div className="text-sm font-bold mb-3">Sample Dual Quote</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Ex-China (Factory)</span><span className="font-bold">$1,200 FOB</span></div>
              <div className="flex justify-between"><span>Africanies (72hr NGN)</span><span className="font-bold">₦1,850,000</span></div>
              <div className="border-t pt-2 flex justify-between font-black"><span>Landed Lagos</span><span>₦2,050,000 inc. Tax</span></div>
            </div>
            <div className="mt-4 text-xs text-gray-500">Manufacturer: Hidden | CE Verified ✓ | TUV ✓</div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#0a3d1f]">Homepage Products - From Supabase</h2>
        <p className="text-gray-600 mt-2">{loading ? 'Loading from Supabase...' : `${products.length} products visible - machinery is search-only hidden as per your rule`}</p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {products.map(p => (
            <div key={p.id} className="border rounded-xl p-5 hover:shadow-lg transition">
              <div className="text-xs bg-green-100 text-green-800 inline-block px-2 py-1 rounded-full mb-2">{p.category}</div>
              <h3 className="font-bold">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.description}</p>
              <div className="mt-4 text-xs text-gray-500">Verified CE Manufacturer | Homepage Visible ✓</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
          <div><div className="font-bold">1. Search Machinery</div><div className="text-gray-600 mt-1">Search-only, never homepage visible - compliance rule</div></div>
          <div><div className="font-bold">2. Get Dual Quotes</div><div className="text-gray-600 mt-1">factory_quotes + africanies_quotes + auto-charger detection</div></div>
          <div><div className="font-bold">3. We Source & Clear</div><div className="text-gray-600 mt-1">Merged quote, tax invoice, receipts tracking</div></div>
        </div>
      </section>

      <footer className="bg-[#0a3d1f] text-white/70 py-8">
        <div className="max-w-6xl mx-auto px-6 text-sm flex justify-between">
          <div>© 2025 NiChAm Trade - A GSPI Associates Ltd Platform</div>
          <div>13 Tables: users, products, manufacturers, factory_quotes, africanies_quotes, merged_quotes, orders, receipts, tax_records...</div>
        </div>
      </footer>
    </main>
  )
}
