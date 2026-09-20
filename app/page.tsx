"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

type Product = {
  id: string
  name: string
  desc: string
  price: number
  category: string
  emoji: string
  status: string
  manufacturer: string
}

const DEFAULT_PRODUCTS: Product[] = [
  {id:'1', name:'Solar Incubator 500 Eggs', desc:'Hatch 500 chicks with sun. No NEPA. Hatchery business.', price:450000, category:'Farm & Agro', emoji:'🥚', status:'Approved', manufacturer:'AfricanIES'},
  {id:'2', name:'Solar Corn Sheller', desc:'Shell corn fast with solar. 500kg per hour. No diesel.', price:180000, category:'Farm & Agro', emoji:'🌽', status:'Approved', manufacturer:'AfricanIES'},
  {id:'3', name:'Solar Oil Press Machine', desc:'Press groundnut, palm kernel oil with solar. No fuel.', price:220000, category:'Farm & Agro', emoji:'🫒', status:'Approved', manufacturer:'AfricanIES'},
  {id:'4', name:'Solar Vegetable & Meat Dryer 100kg', desc:'Dry tomatoes, pepper, meat, fish clean. No dust.', price:150000, category:'Farm & Agro', emoji:'🌶️', status:'Approved', manufacturer:'AfricanIES'},
  {id:'5', name:'Caustic Soda 25kg', desc:'Industrial grade for soap making. 99% pure.', price:45000, category:'Industrial Chemicals', emoji:'🧪', status:'Approved', manufacturer:'Betterluck'},
  {id:'6', name:'Solar Fan 16 inch', desc:'Cool your home with solar. No NEPA bill.', price:65000, category:'Home & Kitchen', emoji:'🌀', status:'Approved', manufacturer:'AfricanIES'},
  {id:'7', name:'Solar Hair Dryer', desc:'For salons, no NEPA needed. Fast drying.', price:35000, category:'Salon & Beauty', emoji:'💇', status:'Approved', manufacturer:'AfricanIES'},
  {id:'8', name:'Industrial Sewing Machine Solar', desc:'Tailor clothes with solar power. No fuel.', price:120000, category:'Tailoring & Workshop', emoji:'🧵', status:'Approved', manufacturer:'AfricanIES'},
]

export default function Home(){
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All','Farm & Agro','Home & Kitchen','Salon & Beauty','Tailoring & Workshop','Industrial Chemicals']

  useEffect(()=>{
    const saved = localStorage.getItem('nicham_v103_products')
    if(saved){
      try{
        const list = JSON.parse(saved)
        const approved = list.filter((p:any)=> p.status==='Approved').map((p:any)=> ({
          id: p.id,
          name: p.name,
          desc: p.manufacturer + ' • ' + p.category,
          price: p.appPrice ? Math.round(p.appPrice * 1600) : p.factoryPrice ? p.factoryPrice * 1600 : 100000,
          category: p.category || 'Farm & Agro',
          emoji: '📦',
          status: 'Approved',
          manufacturer: p.manufacturer
        }))
        if(approved.length>0){
          setProducts([...approved, ...DEFAULT_PRODUCTS])
        }
      }catch{}
    }
  },[])

  const filtered = products.filter(p=>{
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    const matchesCat = category==='All' || p.category===category
    return matchesSearch && matchesCat
  })

  const calcTotal = (price:number)=> Math.round(price * 1.075)

  return <div className="min-h-screen bg-[#fefce8]">
    {/* Header */}
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto p-3 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full border-2 border-green-600 flex items-center justify-center bg-[#fefce8]">
            <div className="text-[10px] font-black text-green-700 text-center leading-[0.9]">NiChAm<br/>Trade</div>
          </div>
          <div>
            <div className="font-black text-2xl text-green-800">NiChAm Trade</div>
            <div className="text-[11px] tracking-[0.2em] text-gray-600">SOLAR + CHEMICALS MARKETPLACE</div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Link href="/orders" className="bg-black text-white text-xs px-4 py-1.5 rounded-full font-bold">Orders</Link>
          <Link href="/agent" className="bg-yellow-400 text-black text-xs px-4 py-1.5 rounded-full font-bold">Agent Dashboard</Link>
          <Link href="/affiliate" className="bg-purple-600 text-white text-xs px-4 py-1.5 rounded-full font-bold">Affiliate</Link>
          <Link href="/admin" className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-full">Admin</Link>
        </div>
      </div>
      <div className="bg-green-600 text-white text-center text-[11px] py-1 font-bold">
        Secure Trading via MTN Escrow | Traders & Farmers Marketplace
      </div>
    </header>

    <div className="max-w-6xl mx-auto p-3">
      {/* Welcome */}
      <div className="bg-white border border-green-200 rounded-xl p-3 text-center mt-3">
        <div className="text-green-700 font-bold text-sm">Welcome to NiChAm Trade, type the product you want into the search box and click Search.</div>
        <div className="text-[11px] opacity-60 mt-1">Marketplace for Manufacturers to sell, farmers and traders to buy. Agent helps those who cannot read or write English.</div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-2 flex gap-2 mt-3 shadow-sm border">
        <input 
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Type product e.g. Caustic Soda, Solar Fan..." 
          className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
        />
        <button className="bg-green-600 text-white px-6 rounded-full text-sm font-bold">Search</button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mt-3 overflow-auto pb-1">
        {categories.map(cat=>(
          <button 
            key={cat}
            onClick={()=>setCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap ${category===cat ? 'bg-black text-white' : 'bg-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="text-[11px] opacity-60 mt-2">Showing: {category} ({filtered.length})</div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
        {filtered.map(p=>(
          <div key={p.id} className="bg-white rounded-xl p-3 border shadow-sm">
            <div className="text-3xl text-center">{p.emoji}</div>
            <div className="font-bold text-sm mt-2 leading-tight">{p.name}</div>
            <div className="text-[11px] opacity-60 mt-1 leading-tight">{p.desc}</div>
            <div className="font-black text-sm mt-2">N{p.price.toLocaleString()}</div>
            <div className="text-[10px] opacity-50">Total (VAT 7.5% inclusive) N{calcTotal(p.price).toLocaleString()}</div>
            <Link href={`/product/${p.id}`} className="mt-2 block w-full text-center border rounded-lg py-1.5 text-xs bg-gray-50">View</Link>
          </div>
        ))}
      </div>

      <footer className="mt-10 text-center text-[10px] opacity-40 pb-10">
        V110 Preferred Marketplace • Secure via MTN Escrow • Admin at /admin • English Only
      </footer>
    </div>
  </div>
}
