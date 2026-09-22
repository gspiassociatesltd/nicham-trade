"use client"
import { useState, useEffect } from 'react'

type Product = { id:string; name:string; category:string; manufacturer:string; status:string; source:string }
type Manufacturer = { name:string; country:string; email:string; phone:string; website:string; products:string[]; wantsNigeria:boolean; trendingScore:number }
type Trend = { name:string; category:string; demand:string; reason:string; score:number; source:string }

const MANUFACTURERS: Manufacturer[] = [
  {name:'ChemChina AgroChem Ltd', country:'China', email:'export@chemchina.cn', phone:'+86 21 1234 5678', website:'chemchina.cn', products:['Glyphosate','NPK','Atrazine'], wantsNigeria:true, trendingScore:95},
  {name:'Shandong Caustic Industrial', country:'China', email:'sales@sdcaustic.com', phone:'+86 531 8765 4321', website:'sdcaustic.com', products:['Caustic Soda','Sulphuric Acid'], wantsNigeria:true, trendingScore:88},
  {name:'SolarTech China', country:'China', email:'export@solartech.cn', phone:'+86 755 1234 5678', website:'solartech.cn', products:['Solar Incubator','Solar Corn Sheller'], wantsNigeria:true, trendingScore:92},
  {name:'AgroChem USA LLC', country:'USA', email:'info@agrochemusa.com', phone:'+1 713 555 0100', website:'agrochemusa.com', products:['Glyphosate','NPK'], wantsNigeria:true, trendingScore:85},
]

const TRENDING_BASE: Trend[] = [
  {name:'Glyphosate 360SL Herbicide 20L', category:'Agro Chemicals', demand:'Very High', reason:'Planting season Niger State, 500L+ bulk request', score:98, source:'Ready buyer'},
  {name:'NPK 20-10-10 Fertilizer 50kg', category:'Fertilizers', demand:'High', reason:'Subsidy removal, farmers direct import', score:92, source:'Market'},
  {name:'Caustic Soda Flakes 25kg', category:'Industrial Chemicals', demand:'High', reason:'Soap makers Kano/Lagos', score:88, source:'Brochure'},
]

export default function Admin(){
  const [products,setProducts]=useState<Product[]>([])
  const [paste,setPaste]=useState('')
  const [category,setCategory]=useState('Agro Chemicals')
  const [brochureText,setBrochureText]=useState('')
  const [contacts,setContacts]=useState<any[]>([])
  const [discovered,setDiscovered]=useState<Manufacturer[]>(MANUFACTURERS)
  const [trending,setTrending]=useState<Trend[]>(TRENDING_BASE)
  // Cap 3 Price Comparison
  const [quoteProduct,setQuoteProduct]=useState('')
  const [finalLanded,setFinalLanded]=useState('')
  const [localSource,setLocalSource]=useState('')
  const [localPrice,setLocalPrice]=useState('')
  const [comparison,setComparison]=useState<any>(null)

  useEffect(()=>{
    const saved=localStorage.getItem('nicham_v103_products'); if(saved) try{ setProducts(JSON.parse(saved)) }catch{}
    const savedContacts=localStorage.getItem('nicham_contacts'); if(savedContacts) try{ setContacts(JSON.parse(savedContacts)) }catch{}
  },[])

  const save=(list:Product[])=>{ setProducts(list); localStorage.setItem('nicham_v103_products', JSON.stringify(list)) }
  const saveContacts=(list:any[])=>{ setContacts(list); localStorage.setItem('nicham_contacts', JSON.stringify(list)) }

  const parseAndAdd=()=>{
    if(!paste.trim()){ alert('Paste list first'); return }
    const lines=paste.split(/[\n,]+/).map(s=>s.trim()).filter(Boolean)
    const newProducts: Product[]=lines.map((name,i)=>({ id:Date.now().toString()+i, name, category, manufacturer:'Discovery', status:'Approved', source:'Bulk Paste' }))
    save([...newProducts,...products]); setPaste('')
    const newTrends=newProducts.map(p=>({ name:p.name, category:p.category, demand:'New', reason:'Just pasted — ready buyer?', score:80, source:'Bulk Paste' } as Trend))
    setTrending(prev=> [...newTrends,...prev].slice(0,12))
    alert(`${newProducts.length} added + trending updated`)
  }

  const parseBrochure=()=>{
    if(!brochureText.trim()){ alert('Paste brochure text'); return }
    const emailRegex=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g; const phoneRegex=/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g; const webRegex=/https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.(com|cn|net)/g
    const emails=brochureText.match(emailRegex)||[]; const phones=brochureText.match(phoneRegex)||[]; const websites=brochureText.match(webRegex)||[]
    const keywords=['glyphosate','npk','caustic','sulphuric','atrazine','fertilizer','herbicide','solar','incubator','sheller','welding']
    const lines=brochureText.split('\n').map(l=>l.trim()).filter(Boolean)
    const productLines=lines.filter(l=> keywords.some(k=> l.toLowerCase().includes(k)) && l.length>5 && l.length<100)
    const newProducts: Product[]=productLines.map((name,i)=>{
      let cat='Industrial Chemicals'; if(/glyphosate|atrazine|herbicide/i.test(name)) cat='Agro Chemicals'; else if(/npk|fertilizer/i.test(name)) cat='Fertilizers'; else if(/solar|incubator|sheller/i.test(name)) cat='Farm & Agro'
      return { id:Date.now().toString()+'b'+i, name, category:cat, manufacturer:'From Brochure', status:'Approved', source:'Brochure' }
    })
    const contact={ id:Date.now().toString(), emails:[...new Set(emails)], phones:[...new Set(phones)], websites:[...new Set(websites)], products:productLines, date:new Date().toLocaleString() }
    saveContacts([contact,...contacts]); save([...newProducts,...products])
    const matching=MANUFACTURERS.filter(m=> productLines.some(p=> m.products.some(mp=> p.toLowerCase().includes(mp.toLowerCase()))))
    setDiscovered(matching.length>0?matching:MANUFACTURERS)
    setTrending(prev=> [...newProducts.map(p=>({ name:p.name, category:p.category, demand:'Discovered', reason:'From brochure — wants Nigeria', score:85, source:'Brochure' } as Trend)),...prev].slice(0,12))
    alert(`Brochure: ${newProducts.length} products + ${emails.length} contacts → tabs + admin console + trending`); setBrochureText('')
  }

  const handleFileUpload=(e:any)=>{ const file=e.target.files[0]; if(!file) return; const reader=new FileReader(); reader.onload=(ev:any)=>{ setBrochureText(ev.target.result as string); alert(`Brochure ${file.name} loaded. Click Parse.`) }; reader.readAsText(file) }

  const sendToAfricanIES=()=>{
    const listText=products.map((p,i)=>`${i+1}. ${p.name} (${p.category})`).join('%0A')
    const msg=`BULK RFQ - ${products.length} ITEMS:%0A${listText}%0A%0AQUOTE NEEDED: Factory visit (except if previously done) + Sourcing + Logistics + Customs + Delivery%0A%0ATrending: ${trending.slice(0,3).map(t=>t.name).join(', ')}`
    window.open(`https://wa.me/2348012345678?text=${msg}`,'_blank')
  }
  const sendToQIMA=()=>{
    const listText=products.map((p,i)=>`${i+1}. ${p.name}`).join('%0A')
    const msg=`BULK PSI REQUEST - ${products.length} ITEMS:%0A${listText}`
    window.open(`https://wa.me/2348098765432?text=${msg}`,'_blank')
  }

  const discoverManufacturers=()=>{ setDiscovered([...MANUFACTURERS].sort((a,b)=>b.trendingScore-a.trendingScore)); setTrending(prev=> [...MANUFACTURERS.slice(0,3).map(m=>({ name:m.products[0], category:'Manufacturer Wants Nigeria', demand:'Trending', reason:`${m.name} (${m.country}) seeking Nigeria — ${m.trendingScore}%`, score:m.trendingScore, source:`Discovery ${m.country}` } as Trend)),...prev].slice(0,12)) }

  const comparePrice=()=>{
    if(!finalLanded ||!localPrice){ alert('Enter final landed price and local verifiable price'); return }
    const landed=parseFloat(finalLanded.replace(/[^0-9.]/g,'')); const local=parseFloat(localPrice.replace(/[^0-9.]/g,''))
    if(!landed ||!local){ alert('Enter valid numbers'); return }
    const diff = ((landed - local)/local)*100; const competitive = landed < local
    const result={
      product: quoteProduct||'Selected Product',
      landed, local, diff: diff.toFixed(1),
      competitive,
      message: competitive? `✅ ${Math.abs(diff).toFixed(1)}% CHEAPER than local — Very Competitive! Forward to buyer.` : `⚠️ ${diff.toFixed(1)}% MORE expensive than local — Check: reduce shipping/customs or negotiate factory price.`,
      advice: competitive? 'Forward quote to buyer with confidence. Highlight QIMA verified + EU standards.' : 'Do NOT forward yet. Ask AfricanIES for cheaper shipping, or find alternative manufacturer via Discovery Machine.'
    }
    setComparison(result)
    const compList=JSON.parse(localStorage.getItem('nicham_comparisons')||'[]'); compList.unshift({...result, date:new Date().toLocaleString(), localSource}); localStorage.setItem('nicham_comparisons', JSON.stringify(compList))
  }

  return <div className="min-h-screen bg-black p-4"><div className="max-w-6xl mx-auto">
    <div className="bg-white rounded- p-6 flex justify-between items-center"><div><h1 className="font-black text-lg">Admin Vault — Cap 1+2+3: Bulk + Brochure + Discovery + Price Comparison</h1><p className="text-xs text-gray-500 mt-1">{products.length} products • {trending.length} trending • Price comparison key before forwarding to buyer • No visible link on marketplace</p></div><a href="/" className="bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold">View Marketplace</a></div>

    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded- p-5 mt-4 text-black">
      <h2 className="font-black text-sm">🔥 Trending Now — Discovery Always Tells Admin What Is Trending</h2>
      <div className="grid md:grid-cols-3 gap-3 mt-3">{trending.slice(0,6).map((t,i)=><div key={i} className="bg-white rounded-xl p-3"><div className="font-bold text-xs">{t.name}</div><div className="text- mt-1">{t.category} • {t.demand} • Score {t.score}</div><div className="text- text-gray-600 mt-1">Why: {t.reason}</div><div className="text- mt-1 opacity-60">{t.source}</div></div>)}</div>
    </div>

    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <div className="bg-white rounded- p-6">
        <h2 className="font-black">1. Paste List + 2. Brochure Upload</h2>
        <textarea value={paste} onChange={e=>setPaste(e.target.value)} placeholder="Glyphosate 360SL 20L&#10;NPK 50kg&#10;Caustic Soda 25kg" className="w-full border rounded-xl p-3 text-sm mt-3 h-20" />
        <div className="flex gap-2 mt-2"><select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded-full px-3 py-2 text-xs font-bold"><option>Agro Chemicals</option><option>Industrial Chemicals</option><option>Fertilizers</option><option>Farm & Agro</option><option>Solar Power</option></select><button onClick={parseAndAdd} className="flex-1 bg-green-700 text-white rounded-full py-2 text-sm font-bold">+ Add List</button></div>
        <input type="file" accept=".pdf,.txt,.csv" onChange={handleFileUpload} className="w-full border rounded-xl p-2 text-xs mt-4" />
        <textarea value={brochureText} onChange={e=>setBrochureText(e.target.value)} placeholder="Paste brochure text with contacts: Glyphosate 20L - ChemChina export@chemchina.cn +86..." className="w-full border rounded-xl p-3 text-sm mt-2 h-20" />
        <button onClick={parseBrochure} className="w-full bg-black text-white rounded-full py-2.5 text-sm font-bold mt-2">📄 Parse Brochure → Tabs + Contacts + Trending</button>

        <h2 className="font-black mt-6">3. Discovery + Dual Quote</h2>
        <div className="flex gap-2 mt-3"><button onClick={discoverManufacturers} className="flex-1 bg-green-700 text-white rounded-full py-2.5 text-xs font-bold">🌍 Discover Manufacturers</button><button onClick={sendToAfricanIES} className="flex-1 bg-black text-white rounded-full py-2.5 text-xs font-bold">📤 AfricanIES</button><button onClick={sendToQIMA} className="flex-1 border border-black rounded-full py-2.5 text-xs font-bold">🔍 QIMA</button></div>
        <div className="mt-3 space-y-2 max-h-40 overflow-auto">{discovered.map((m,i)=><div key={i} className="border rounded-xl p-2 text-xs"><b>{m.name}</b> • {m.country} • Score {m.trendingScore} • {m.email} • {m.phone}</div>)}</div>
      </div>

      <div className="bg-white rounded- p-6">
        <h2 className="font-black">Cap 3: Price Comparison — Competitive Before Forwarding to Buyer (KEY)</h2>
        <p className="text-xs text-gray-500 mt-1">Compare final landed quote vs verifiable local source — know competitiveness before forwarding</p>
        <div className="space-y-3 mt-4">
          <input value={quoteProduct} onChange={e=>setQuoteProduct(e.target.value)} placeholder="Product: e.g. Glyphosate 360SL 20L" className="w-full border rounded-xl px-4 py-2.5 text-sm" />
          <input value={finalLanded} onChange={e=>setFinalLanded(e.target.value)} placeholder="Final Landed Quote: Factory+Shipping+Customs+Delivery+10% e.g. 14500" className="w-full border rounded-xl px-4 py-2.5 text-sm" />
          <input value={localSource} onChange={e=>setLocalSource(e.target.value)} placeholder="Verifiable Local Source: e.g. Jumia.com, Market in Minna, Kano" className="w-full border rounded-xl px-4 py-2.5 text-sm" />
          <input value={localPrice} onChange={e=>setLocalPrice(e.target.value)} placeholder="Local Verifiable Price e.g. 18000" className="w-full border rounded-xl px-4 py-2.5 text-sm" />
          <button onClick={comparePrice} className="w-full bg-black text-white rounded-full py-3 text-sm font-bold">⚖️ Compare Price — Is My Quote Competitive?</button>
        </div>

        {comparison && <div className={`mt-4 rounded-xl p-4 ${comparison.competitive?'bg-green-50 border-green-200 border':'bg-red-50 border-red-200 border'}`}>
          <div className="font-black text-sm">{comparison.product}</div>
          <div className="text-xs mt-2">Our Landed: ₦{comparison.landed.toLocaleString()} vs Local ({localSource}): ₦{comparison.local.toLocaleString()} → {comparison.diff}% {comparison.competitive?'cheaper':'more expensive'}</div>
          <div className="text-xs mt-2 font-bold">{comparison.message}</div>
          <div className="text- mt-2 text-gray-700">Advice: {comparison.advice}</div>
          <div className="flex gap-2 mt-3">
            <button onClick={()=>{ const msg=`QUOTE for ${comparison.product}: Our landed ₦${comparison.landed} vs Local ₦${comparison.local} (${localSource}) = ${comparison.diff}% ${comparison.competitive?'cheaper':'more'}. ${comparison.competitive?'✅ Competitive, verified by QIMA':'⚠️ Check needed'}`; window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank') }} className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold">Forward to Buyer if Competitive</button>
            <button onClick={()=>setComparison(null)} className="border px-4 py-2 rounded-full text-xs">Clear</button>
          </div>
        </div>}

        <div className="bg-gray-50 rounded-xl p-3 text-xs mt-4">
          <b>How Price Comparison Works (Key):</b><br/>
          • Final Landed = Factory + Shipping + Customs + Delivery + 10% (Platform 5% [Affiliate 1% + Field 2% + Net] + Sourcing 3% + Escrow 1% + Insurance 1%)<br/>
          • Verifiable Local Source = Jumia link, market price, or buyer-quoted local price<br/>
          • App shows % cheaper/more expensive + advice before forwarding to buyer<br/>
          • Saves to localStorage for audit
        </div>

        <h3 className="font-bold text-sm mt-6">Products ({products.length}) — Auto Tabs</h3>
        <div className="mt-2 space-y-1 max-h-32 overflow-auto">{products.map(p=><div key={p.id} className="border rounded-lg p-2 text-xs flex justify-between"><span><b>{p.name}</b> • {p.category}</span><button onClick={()=>save(products.filter(x=>x.id!==p.id))} className="text-red-600">Remove</button></div>)}</div>

        <h3 className="font-bold text-sm mt-4">Brochure Contacts ({contacts.length})</h3>
        <div className="mt-2 space-y-1 max-h-24 overflow-auto">{contacts.map(c=><div key={c.id} className="border rounded-lg p-2 text-xs bg-yellow-50">Emails: {c.emails.join(', ')} • Phones: {c.phones.join(', ')}</div>)}</div>
      </div>
    </div>
  </div></div>
}
