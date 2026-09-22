"use client"
import { useState, useEffect } from 'react'

type Product = { id:string; name:string; category:string; manufacturer:string; status:string; source:string; contact?:any }
type Manufacturer = { name:string; country:string; email:string; phone:string; website:string; products:string[]; wantsNigeria:boolean; trendingScore:number }
type Trend = { name:string; category:string; demand:string; reason:string; score:number; source:string }

const MANUFACTURERS: Manufacturer[] = [
  {name:'ChemChina AgroChem Ltd', country:'China', email:'export@chemchina.cn', phone:'+86 21 1234 5678', website:'chemchina.cn', products:['Glyphosate','NPK','Atrazine'], wantsNigeria:true, trendingScore:95},
  {name:'Shandong Caustic Industrial', country:'China', email:'sales@sdcaustic.com', phone:'+86 531 8765 4321', website:'sdcaustic.com', products:['Caustic Soda','Sulphuric Acid'], wantsNigeria:true, trendingScore:88},
  {name:'SolarTech China', country:'China', email:'export@solartech.cn', phone:'+86 755 1234 5678', website:'solartech.cn', products:['Solar Incubator','Solar Corn Sheller','Solar Welding Machine'], wantsNigeria:true, trendingScore:92},
  {name:'AgroChem USA LLC', country:'USA', email:'info@agrochemusa.com', phone:'+1 713 555 0100', website:'agrochemusa.com', products:['Glyphosate','NPK Fertilizer'], wantsNigeria:true, trendingScore:85},
  {name:'EV Bike Power China', country:'China', email:'ev@evbike.cn', phone:'+86 10 8888 9999', website:'evbike.cn', products:['Solar Bike','Solar Tractor','Solar Car'], wantsNigeria:true, trendingScore:90},
]

const TRENDING_NIGERIA: Trend[] = [
  {name:'Glyphosate 360SL Herbicide 20L', category:'Agro Chemicals', demand:'Very High', reason:'Planting season in Niger State, farmers requesting 500L+ bulk', score:98, source:'Your ready buyer + RFQ history'},
  {name:'NPK 20-10-10 Fertilizer 50kg', category:'Fertilizers', demand:'High', reason:'Subsidy removal, farmers shifting to direct import', score:92, source:'Market + Jumia comparison'},
  {name:'Caustic Soda Flakes 25kg', category:'Industrial Chemicals', demand:'High', reason:'Soap makers in Kano, Lagos requesting', score:88, source:'Brochure uploads'},
  {name:'Solar Incubator 500 Eggs', category:'Farm & Agro', demand:'Rising', reason:'Poultry farmers need diesel-free incubators', score:85, source:'Solar niche trend'},
  {name:'Solar Corn Sheller', category:'Farm & Agro', demand:'Rising', reason:'Harvest season, fuel cost high', score:82, source:'Discovery Machine'},
]

export default function Admin(){
  const [products,setProducts]=useState<Product[]>([])
  const [paste,setPaste]=useState('')
  const [category,setCategory]=useState('Agro Chemicals')
  const [brochureText,setBrochureText]=useState('')
  const [contacts,setContacts]=useState<any[]>([])
  const [discovered,setDiscovered]=useState<Manufacturer[]>([])
  const [trending,setTrending]=useState<Trend[]>(TRENDING_NIGERIA)
  const [localPrice,setLocalPrice]=useState('')

  useEffect(()=>{
    const saved=localStorage.getItem('nicham_v103_products'); if(saved) try{ setProducts(JSON.parse(saved)) }catch{}
    const savedContacts=localStorage.getItem('nicham_contacts'); if(savedContacts) try{ setContacts(JSON.parse(savedContacts)) }catch{}
    const rfqs=localStorage.getItem('nicham_rfqs');
    if(rfqs){
      try{
        const list=JSON.parse(rfqs)
        // Count trending from RFQs
        const count: any={}; list.forEach((r:any)=>{ count[r.productName]=(count[r.productName]||0)+1 })
        const rfqTrends=Object.entries(count).map(([name,cnt]:any)=>({ name, category:'From RFQs', demand:cnt>2?'Very High':'High', reason:`${cnt} RFQs from buyers`, score: 70+cnt*5, source:'Your RFQs' } as Trend))
        if(rfqTrends.length>0) setTrending(prev=> [...rfqTrends,...prev].slice(0,10))
      }catch{}
    }
  },[])

  const save=(list:Product[])=>{ setProducts(list); localStorage.setItem('nicham_v103_products', JSON.stringify(list)) }
  const saveContacts=(list:any[])=>{ setContacts(list); localStorage.setItem('nicham_contacts', JSON.stringify(list)) }

  const parseAndAdd=()=>{
    if(!paste.trim()){ alert('Paste product list first'); return }
    const lines=paste.split(/[\n,]+/).map(s=>s.trim()).filter(Boolean)
    const newProducts: Product[]=lines.map((name,i)=>({ id:Date.now().toString()+i, name, category, manufacturer:'To be sourced via Discovery', status:'Approved', source:'Bulk Paste' }))
    const updated=[...newProducts,...products]; save(updated); setPaste('')
    // Update trending based on paste
    const newTrends: Trend[]=newProducts.map(p=>({ name:p.name, category:p.category, demand:'New', reason:'Just pasted by you — ready buyer?', score:80, source:'Bulk Paste' }))
    setTrending(prev=> [...newTrends,...prev].slice(0,10))
    alert(`${newProducts.length} added. Trending updated. Total ${updated.length}`)
  }

  const parseBrochure=()=>{
    if(!brochureText.trim()){ alert('Paste brochure text first'); return }
    const emailRegex=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const phoneRegex=/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
    const webRegex=/https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.(com|cn|net|org)/g
    const emails=brochureText.match(emailRegex)||[]; const phones=brochureText.match(phoneRegex)||[]; const websites=brochureText.match(webRegex)||[]
    const keywords=['glyphosate','npk','caustic','sulphuric','atrazine','fertilizer','herbicide','solar','incubator','sheller','welding','shovel','cutlass','bike','tractor','car']
    const lines=brochureText.split('\n').map(l=>l.trim()).filter(Boolean)
    const productLines=lines.filter(l=> keywords.some(k=> l.toLowerCase().includes(k)) && l.length>5 && l.length<100)
    const newProducts: Product[]=productLines.map((name,i)=>{
      let cat='Industrial Chemicals'; if(/glyphosate|atrazine|herbicide/i.test(name)) cat='Agro Chemicals'; else if(/npk|fertilizer/i.test(name)) cat='Fertilizers'; else if(/solar|incubator|sheller|welding/i.test(name)) cat=name.toLowerCase().includes('solar')?'Solar Power':'Farm & Agro'
      return { id:Date.now().toString()+'b'+i, name, category:cat, manufacturer:'From Brochure', status:'Approved', source:'Brochure Upload' }
    })
    const contact={ id:Date.now().toString(), emails:[...new Set(emails)], phones:[...new Set(phones)], websites:[...new Set(websites)], products:productLines, raw:brochureText.slice(0,500), date:new Date().toLocaleString() }
    saveContacts([contact,...contacts]); save([...newProducts,...products])
    const matching=MANUFACTURERS.filter(m=> productLines.some(p=> m.products.some(mp=> p.toLowerCase().includes(mp.toLowerCase()))))
    setDiscovered(matching)
    // Trending from brochure
    const brochureTrends: Trend[]=newProducts.map(p=>({ name:p.name, category:p.category, demand:'Discovered', reason:`From brochure — manufacturer wants Nigeria entry`, score:85, source:'Brochure Upload' }))
    setTrending(prev=> [...brochureTrends,...prev].slice(0,10))
    alert(`Brochure parsed: ${newProducts.length} products + ${emails.length} contacts. Trending updated.`)
    setBrochureText('')
  }

  const handleFileUpload=(e:any)=>{ const file=e.target.files[0]; if(!file) return; const reader=new FileReader(); reader.onload=(ev:any)=>{ setBrochureText(ev.target.result as string); alert(`Brochure ${file.name} loaded. Click Parse Brochure.`) }; reader.readAsText(file) }

  const sendToAfricanIES=()=>{
    if(products.length===0){ alert('No products'); return }
    const listText=products.map((p,i)=>`${i+1}. ${p.name} (${p.category})`).join('%0A')
    const msg=`BULK RFQ - ${products.length} ITEMS:%0A${listText}%0A%0AQUOTE NEEDED: Factory visit (except if previously done) + Sourcing + Logistics + Customs + Delivery to Niger State%0A%0ATrending: ${trending.slice(0,3).map(t=>t.name).join(', ')}`
    window.open(`https://wa.me/2348012345678?text=${msg}`,'_blank')
  }
  const sendToQIMA=()=>{
    if(products.length===0){ alert('No products'); return }
    const listText=products.map((p,i)=>`${i+1}. ${p.name}`).join('%0A')
    const msg=`BULK PSI REQUEST - ${products.length} ITEMS:%0A${listText}%0A%0AQIMA quote for PSI. 5 Proofs Gate.`
    window.open(`https://wa.me/2348098765432?text=${msg}`,'_blank')
  }

  const discoverManufacturers=()=>{
    const allCats=[...new Set(products.map(p=>p.category))]
    const matching=MANUFACTURERS.filter(m=> m.wantsNigeria).sort((a,b)=>b.trendingScore-a.trendingScore)
    setDiscovered(matching)
    // Update trending with manufacturer trending scores
    const manufTrends: Trend[]=matching.slice(0,5).map(m=>({ name:m.products[0], category:'Manufacturer Wants Nigeria', demand:'Trending', reason:`${m.name} (${m.country}) actively seeking Nigeria entry — ${m.trendingScore}% match`, score:m.trendingScore, source:`Discovery: ${m.country}` }))
    setTrending(prev=> [...manufTrends,...prev].slice(0,12))
  }

  return <div className="min-h-screen bg-black p-4"><div className="max-w-6xl mx-auto">
    <div className="bg-white rounded- p-6 flex justify-between items-center">
      <div><h1 className="font-black text-lg">Admin Vault — Cap 1+2+Trending</h1><p className="text-xs text-gray-500 mt-1">{products.length} products • {contacts.length} brochure contacts • {trending.length} trending • Discovery always tells admin what is trending</p></div>
      <a href="/" className="bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold">View Marketplace (No Admin Link)</a>
    </div>

    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded- p-5 mt-4 text-black">
      <h2 className="font-black text-sm">🔥 Trending Now — What Admin Should Source Next (Discovery Machine Always Tells Admin)</h2>
      <div className="grid md:grid-cols-3 gap-3 mt-3">{trending.slice(0,6).map((t,i)=><div key={i} className="bg-white rounded-xl p-3"><div className="font-bold text-xs">{t.name}</div><div className="text- mt-1">{t.category} • {t.demand} • Score {t.score}</div><div className="text- text-gray-600 mt-1">Why trending: {t.reason}</div><div className="text- mt-1 opacity-60">Source: {t.source}</div></div>)}</div>
      <p className="text- mt-3 font-bold">Discovery Machine: Auto-updates trending from your bulk paste + brochure uploads + RFQs + China/America manufacturers wanting Nigeria entry</p>
    </div>

    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <div className="bg-white rounded- p-6">
        <h2 className="font-black">1. Paste Products List</h2>
        <textarea value={paste} onChange={e=>setPaste(e.target.value)} placeholder="Glyphosate 360SL 20L&#10;NPK 20-10-10 50kg&#10;Caustic Soda Flakes 25kg" className="w-full border rounded-xl p-3 text-sm mt-3 h-24" />
        <div className="flex gap-2 mt-3"><select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded-full px-4 py-2 text-xs font-bold"><option>Agro Chemicals</option><option>Industrial Chemicals</option><option>Fertilizers</option><option>Farm & Agro</option><option>Solar Power</option></select><button onClick={parseAndAdd} className="flex-1 bg-green-700 text-white rounded-full py-2.5 text-sm font-bold">+ Add List → Trending Updates</button></div>

        <h2 className="font-black mt-6">2. Upload Manufacturer Brochure</h2>
        <input type="file" accept=".pdf,.txt,.csv" onChange={handleFileUpload} className="w-full border rounded-xl p-3 text-xs mt-3" />
        <textarea value={brochureText} onChange={e=>setBrochureText(e.target.value)} placeholder="Or paste brochure text: Glyphosate 360SL 20L - ChemChina export@chemchina.cn +86 21 1234 5678" className="w-full border rounded-xl p-3 text-sm mt-3 h-24" />
        <button onClick={parseBrochure} className="w-full bg-black text-white rounded-full py-2.5 text-sm font-bold mt-3">📄 Parse Brochure → Products to Tabs + Contacts + Trending</button>
      </div>

      <div className="bg-white rounded- p-6">
        <h2 className="font-black">3. Send Lists Separately</h2>
        <div className="space-y-3 mt-4">
          <button onClick={sendToAfricanIES} className="w-full bg-black text-white rounded-full py-3 text-sm font-bold">📤 Send {products.length} Items to AfricanIES (Trending: {trending[0]?.name||'None'})</button>
          <button onClick={sendToQIMA} className="w-full border-2 border-black text-black rounded-full py-3 text-sm font-bold">🔍 Send {products.length} Items to QIMA PSI</button>
        </div>

        <h2 className="font-black mt-6">4. Discovery Machine — China/America + Trending</h2>
        <button onClick={discoverManufacturers} className="w-full bg-green-700 text-white rounded-full py-2.5 text-sm font-bold mt-3">🌍 Discover Manufacturers + Update Trending</button>
        <div className="mt-3 space-y-2 max-h-48 overflow-auto">{discovered.map((m,i)=><div key={i} className="border rounded-xl p-3 text-xs"><div className="font-bold">{m.name} • {m.country} • Trending Score {m.trendingScore} • {m.wantsNigeria?'Wants Nigeria':''}</div><div>📧 {m.email} • 📞 {m.phone}</div><div>🌐 {m.website} • {m.products.join(', ')}</div></div>)}</div>

        <h3 className="font-bold text-sm mt-6">Brochure Contacts on Admin Console ({contacts.length})</h3>
        <div className="mt-2 space-y-2 max-h-40 overflow-auto">{contacts.map(c=><div key={c.id} className="border rounded-xl p-3 text-xs bg-yellow-50"><div>Emails: {c.emails.join(', ')||'None'} • Phones: {c.phones.join(', ')||'None'}</div><div>Products: {c.products.slice(0,3).join(', ')}</div></div>)}</div>

        <h3 className="font-bold text-sm mt-6">Existing Products ({products.length})</h3>
        <div className="mt-2 space-y-2 max-h-40 overflow-auto">{products.map(p=><div key={p.id} className="border rounded-xl p-2 text-xs flex justify-between"><span><b>{p.name}</b> • {p.category} • {p.source}</span><button onClick={()=>save(products.filter(x=>x.id!==p.id))} className="text-red-600 font-bold">Remove</button></div>)}</div>
      </div>
    </div>
  </div></div>
}
