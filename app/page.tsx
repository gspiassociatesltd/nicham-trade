"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATIC_PRODUCTS = [
  {id:'1', name:'Solar Incubator 500 Eggs', cat:'Farm & Agro', manufacturer:'SolarTech China', status:'Approved', factoryPrice:500, appPrice:620},
  {id:'2', name:'Solar Corn Sheller', cat:'Farm & Agro', manufacturer:'FarmPower', status:'Approved', factoryPrice:800, appPrice:992},
  {id:'4', name:'Glyphosate 360SL Herbicide 20L', cat:'Chemicals', manufacturer:'ChemChina', status:'Approved', factoryPrice:120, appPrice:149},
  {id:'5', name:'NPK 20-10-10 Fertilizer 50kg', cat:'Chemicals', manufacturer:'ChemChina', status:'Approved', factoryPrice:45, appPrice:56},
  {id:'6', name:'Caustic Soda Flakes 25kg', cat:'Chemicals', manufacturer:'ChemIndustrial', status:'Approved', factoryPrice:60, appPrice:74},
  {id:'9', name:'Cutlass + Shovel Set', cat:'Hand Tools', manufacturer:'ToolMaster', status:'Approved', factoryPrice:25, appPrice:31},
  {id:'10', name:'Solar Welding Machine 200A', cat:'Hand Tools', manufacturer:'WeldSolar', status:'Approved', factoryPrice:350, appPrice:434},
]

export default function Home(){
  const [products, setProducts] = useState<any[]>([])
  const [cat,setCat]=useState('All')
  const [search,setSearch]=useState('')
  useEffect(()=>{
    const saved = localStorage.getItem('nicham_v103_products')
    if(saved){
      try{
        const list = JSON.parse(saved)
        const approved = list.filter((p:any)=> p.status==='Approved')
        setProducts(approved.length>0?approved:STATIC_PRODUCTS)
      }catch{ setProducts(STATIC_PRODUCTS) }
    } else {
      setProducts(STATIC_PRODUCTS)
    }
  },[])
  const filtered = products.filter(p=> (cat==='All'||p.category===cat||p.cat===cat) && (search===''||p.name.toLowerCase().includes(search.toLowerCase())))

  return <div className="min-h-screen bg-[#FFFEF5]">
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex justify-between items-center bg-white border rounded-2xl p-4 shadow-sm">
        <div className="flex gap-3 items-center">
          <div className="w-11 h-11 bg-green-700 rounded-xl flex items-center justify-center text-white font-black text-lg">N</div>
          <div>
            <div className="font-black text-">NiChAm Trade</div>
            <div className="text- text-green-700">Verified Solar & Chemicals • Nigeria</div>
          </div>
        </div>
        <Link href="/orders" className="text-xs bg-black text-white px-4 py-2 rounded-full font-bold">My Orders</Link>
      </header>

      <div className="mt-4 bg-gradient-to-br from-green-700 to-green-900 rounded- p-6 text-white">
        <h1 className="text-2xl font-black leading-tight">Verified Solar, Chemicals & Farm Equipment for Nigerian Businesses.</h1>
        <p className="text-xs mt-2 opacity-80">All products verified with EU/US standards and inspected by QIMA & Cotecna. Sourced and delivered by AfricanIES.</p>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-sm">Browse by Category</h2>
          <span className="text- text-gray-500">{filtered.length} items</span>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {['All','Farm & Agro','Chemicals','Hand Tools','Solar Power'].map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={cat===c?'bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold whitespace-nowrap':'bg-white border text-xs px-5 py-2.5 rounded-full font-bold whitespace-nowrap hover:bg-gray-50'}>{c}</button>
          ))}
        </div>
        <div className="mt-3">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Chemicals, Solar Incubator..." className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-green-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {filtered.map((p:any)=><div key={p.id} className="bg-white rounded- border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
          <div className="h-24 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl flex items-center justify-center text-3xl font-black text-green-800">{p.name.charAt(0)}</div>
          <div className="font-bold text- mt-3 leading-tight">{p.name}</div>
          <div className="text- text-gray-500 mt-1">{p.manufacturer || p.cat || p.category} • Verified by AfricanIES</div>
          <Link href={`/product/${p.id}`} className="mt-3 block w-full text-center bg-green-700 text-white rounded-full py-2.5 text-xs font-bold hover:bg-black">Request for Quote</Link>
        </div>)}
      </div>

      {filtered.length===0 && <div className="text-center py-16 text-sm text-gray-400">No items in {cat} — try All. Admin can add products via /admin (secret URL)</div>}

      <footer className="text- text-center text-gray-400 mt-12 pb-10">V117 Clean • No prices displayed • Sourced and delivered by AfricanIES • Verified by QIMA</footer>
    </div>
  </div>
}
