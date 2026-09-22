"use client"
import { useState, useEffect } from 'react'

type Product = { id:string; name:string; category:string; manufacturer:string; status:string; source:string; contact?:any }
type Manufacturer = { name:string; country:string; email:string; phone:string; website:string; products:string[]; wantsNigeria:boolean }

const CHINA_USA_MANUFACTURERS: Manufacturer[] = [
  {name:'ChemChina AgroChem Ltd', country:'China', email:'export@chemchina.cn', phone:'+86 21 1234 5678', website:'chemchina.cn', products:['Glyphosate','NPK','Atrazine'], wantsNigeria:true},
  {name:'Shandong Caustic Industrial', country:'China', email:'sales@sdcaustic.com', phone:'+86 531 8765 4321', website:'sdcaustic.com', products:['Caustic Soda','Sulphuric Acid'], wantsNigeria:true},
  {name:'SolarTech China', country:'China', email:'export@solartech.cn', phone:'+86 755 1234 5678', website:'solartech.cn', products:['Solar Incubator','Solar Corn Sheller','Solar Welding Machine'], wantsNigeria:true},
  {name:'AgroChem USA LLC', country:'USA', email:'info@agrochemusa.com', phone:'+1 713 555 0100', website:'agrochemusa.com', products:['Glyphosate','NPK Fertilizer'], wantsNigeria:true},
]

export default function Admin(){
  const [products,setProducts]=useState<Product[]>([])
  const [paste,setPaste]=useState('')
  const [category,setCategory]=useState('Agro Chemicals')
  const [brochureText,setBrochureText]=useState('')
  const [contacts,setContacts]=useState<any[]>([])
  const [discovered,setDiscovered]=useState<Manufacturer[]>([])
  const [localPrice,setLocalPrice]=useState('')

  useEffect(()=>{ const saved=localStorage.getItem('nicham_v103_products'); if(saved) try{ setProducts(JSON.parse(saved)) }catch{}; const savedContacts=localStorage.getItem('nicham_contacts'); if(savedContacts) try{ setContacts(JSON.parse(savedContacts)) }catch{} },[])
  const save=(list:Product[])=>{ setProducts(list); localStorage.setItem('nicham_v103_products', JSON.stringify(list)) }
  const saveContacts=(list:any[])=>{ setContacts(list); localStorage.setItem('nicham_contacts', JSON.stringify(list)) }

  const parseAndAdd=()=>{
    if(!paste.trim()){ alert('Paste product list first'); return }
    const lines = paste.split(/[\n,]+/).map(s=>s.trim()).filter(Boolean)
    const newProducts: Product[] = lines.map((name,i)=>({
      id: Date.now().toString()+i,
      name,
      category,
      manufacturer:'To be sourced via Discovery',
      status:'Approved',
      source:'Bulk Paste -> Discovery'
    }))
    const updated=[...newProducts,...products]; save(updated); setPaste(''); alert(`${newProducts.length} added. Total ${updated.length}`)
  }

  const parseBrochure=()=>{
    if(!brochureText.trim()){ alert('Upload brochure or paste text first'); return }
    // Extract emails, phones, websites
    const emailRegex=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const phoneRegex=/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
    const webRegex=/https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.(com|cn|net|org)/g

    const emails=brochureText.match(emailRegex)||[]
    const phones=brochureText.match(phoneRegex)||[]
    const websites=brochureText.match(webRegex)||[]

    // Extract product lines - lines with chemical/solar keywords
    const keywords=['glyphosate','npk','caustic','sulphuric','atrazine','fertilizer','herbicide','solar','incubator','sheller','welding','shovel','cutlass']
    const lines=brochureText.split('\n').map(l=>l.trim()).filter(Boolean)
    const productLines=lines.filter(l=> keywords.some(k=> l.toLowerCase().includes(k)) && l.length>5 && l.length<100)

    const newProducts: Product[] = productLines.map((name,i)=>{
      let cat='Industrial Chemicals'
      if(/glyphosate|atrazine|herbicide/i.test(name)) cat='Agro Chemicals'
      else if(/npk|fertilizer/i.test(name)) cat='Fertilizers'
      else if(/solar|incubator|sheller|welding/i.test(name)) cat=name.toLowerCase().includes('solar')? 'Solar Power':'Farm & Agro'
      return { id: Date.now().toString()+'b'+i, name, category:cat, manufacturer:'From Brochure', status:'Approved', source:'Brochure Upload' }
    })

    const contact={ id:Date.now().toString(), emails: [...new Set(emails)], phones: [...new Set(phones)], websites: [...new Set(websites)], products: productLines, raw: brochureText.slice(0,500), date:new Date().toLocaleString() }
    const updatedContacts=[contact,...contacts]; saveContacts(updatedContacts)
    const updatedProducts=[...newProducts,...products]; save(updatedProducts)

    // Auto-discover matching manufacturers
    const matching=CHINA_USA_MANUFACTURERS.filter(m=> productLines.some(p=> m.products.some(mp=> p.toLowerCase().includes(mp.toLowerCase()))))
    setDiscovered(matching)

    alert(`Brochure parsed: ${newProducts.length} products added under ${[...new Set(newProducts.map(p=>p.category))].join(', ')} tabs + ${emails.length} emails, ${phones.length} phones found. Check Contacts on Admin Console and Discovery Machine.`)
    setBrochureText('')
  }

  const handleFileUpload=(e:any)=>{
    const file=e.target.files[0]; if(!file) return
    const reader=new FileReader()
    reader.onload=(ev:any)=>{
      const text=ev.target.result as string
      setBrochureText(text)
      alert(`Brochure ${file.name} loaded. Now click Parse Brochure to extract products + contacts.`)
    }
    if(file.type.includes('text')||file.name.endsWith('.txt')||file.name.endsWith('.csv')) reader.readAsText(file)
    else { reader.readAsText(file) } // For PDF, try as text - MVP, user can paste if fails
  }

  const sendToAfricanIES=()=>{
    if(products.length===0){ alert('No products'); return }
    const listText=products.map((p,i)=>`${i+1}. ${p.name} (${p.category})`).join('%0A')
    const msg=`BULK RFQ - ${products.length} ITEMS:%0A${listText}%0A%0AQUOTE NEEDED: Factory visit (except if previously done) + Sourcing + Logistics + Customs + Delivery to Niger State%0A%0AReady buyer. Need competitive price vs local.`
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
    const matching=CHINA_USA_MANUFACTURERS.filter(m=> m.wantsNigeria && (allCats.length===0 || allCats.some(cat=> m.products.some(mp=> cat.toLowerCase().includes(mp.split(' ')[0].toLowerCase()))))
    setDiscovered(matching.length>0?matching:CHINA_USA_MANUFACTURERS)
  }

  return <div className="min-h-screen bg-black p-4"><div className="max-w-6xl mx-auto">
    <div className="bg-white rounded- p-6 flex justify-between items-center"><div><h1 className="font-black text-lg">Admin Vault — Cap 1+2: Bulk + Brochure + Discovery</h1><p className="text-xs text-gray-500 mt-1">{products.length} products • {contacts.length} brochure contacts • No visible link on marketplace • Secret /admin URL</p></div><a href="/" className="bg-black text-white text-xs px-5 py-2.5 rounded-full font-bold">View Marketplace</a></div>

    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <div className="bg-white rounded- p-6">
        <h2 className="font-black">1. Paste Products List (Chemicals)</h2>
        <textarea value={paste} onChange={e=>setPaste(e.target.value)} placeholder="Glyphosate 360SL Herbicide 20L&#10;NPK 20-10-10 Fertilizer 50kg&#10;Caustic Soda Flakes 25kg" className="w-full border rounded-xl p-3 text-sm mt-3 h-28" />
        <div className="flex gap-2 mt-3"><select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded-full px-4 py-2 text-xs font-bold"><option>Agro Chemicals</option><option>Industrial Chemicals</option><option>Fertilizers</option><option>Farm & Agro</option><option>Solar Power</option></select><button onClick={parseAndAdd} className="flex-1 bg-green-700 text-white rounded-full py-2.5 text-sm font-bold">+ Add List</button></div>

        <h2 className="font-black mt-6">2. Upload Manufacturer Brochure</h2>
        <p className="text-xs text-gray-500 mt-1">Upload brochure (PDF/TXT/CSV) → app picks out products + contacts → adds to list page under correct tabs + contacts on admin console</p>
        <input type="file" accept=".pdf,.txt,.csv,.doc,.docx" onChange={handleFileUpload} className="w-full border rounded-xl p-3 text-xs mt-3" />
        <textarea value={brochureText} onChange={e=>setBrochureText(e.target.value)} placeholder="Or paste brochure text here...&#10;Example: Glyphosate 360SL 20L - ChemChina Ltd export@chemchina.cn +86 21 1234 5678 www.chemchina.cn" className="w-full border rounded-xl p-3 text-sm mt-3 h-32" />
        <button onClick={parseBrochure} className="w-full bg-black text-white rounded-full py-2.5 text-sm font-bold mt-3">📄 Parse Brochure → Add Products to Tabs + Contacts to Admin</button>
      </div>

      <div className="bg-white rounded- p-6">
        <h2 className="font-black">3. Send Lists Separately for Quotes</h2>
        <div className="space-y-3 mt-4">
          <button onClick={sendToAfricanIES} className="w-full bg-black text-white rounded-full py-3 text-sm font-bold">📤 Send {products.length} Items to AfricanIES (Factory + Sourcing + Logistics + Customs + Delivery)</button>
          <button onClick={sendToQIMA} className="w-full border-2 border-black text-black rounded-full py-3 text-sm font-bold">🔍 Send {products.length} Items to QIMA for PSI Quote</button>
        </div>

        <h2 className="font-black mt-6">4. Discovery Machine — China/America Seeking Nigeria</h2>
        <button onClick={discoverManufacturers} className="w-full bg-green-700 text-white rounded-full py-2.5 text-sm font-bold mt-3">🌍 Discover Manufacturers Looking for Nigeria Entry</button>
        <div className="mt-3 space-y-2 max-h-60 overflow-auto">{discovered.map((m,i)=><div key={i} className="border rounded-xl p-3 text-xs"><div className="font-bold">{m.name} • {m.country} {m.wantsNigeria?'• Wants Nigeria':''}</div><div>📧 {m.email} • 📞 {m.phone}</div><div>🌐 {m.website} • Products: {m.products.join(', ')}</div><div className="flex gap-2 mt-2"><a href={`mailto:${m.email}`} className="bg-black text-white px-3 py-1 rounded-full text-">Email</a><a href={`https://wa.me/${m.phone.replace(/[^0-9]/g,'')}`} target="_blank" className="border px-3 py-1 rounded-full text-">WhatsApp</a></div></div>)}</div>

        <h3 className="font-bold text-sm mt-6">Brochure Contacts on Admin Console ({contacts.length})</h3>
        <div className="mt-2 space-y-2 max-h-60 overflow-auto">{contacts.map(c=><div key={c.id} className="border rounded-xl p-3 text-xs bg-yellow-50"><div className="font-bold">Brochure Contact {c.date}</div><div>Emails: {c.emails.join(', ')||'None'}</div><div>Phones: {c.phones.join(', ')||'None'}</div><div>Websites: {c.websites.join(', ')||'None'}</div><div>Products Found: {c.products.length} — {c.products.slice(0,3).join(', ')}</div></div>)}</div>

        <h3 className="font-bold text-sm mt-6">Existing Products ({products.length}) — Auto Tabs on List Page</h3>
        <div className="mt-2 space-y-2 max-h-60 overflow-auto">{products.map(p=><div key={p.id} className="border rounded-xl p-2 text-xs flex justify-between"><span><b>{p.name}</b> • {p.category} • {p.source}</span><button onClick={()=>save(products.filter(x=>x.id!==p.id))} className="text-red-600 font-bold">Remove</button></div>)}</div>

        <div className="bg-gray-50 rounded-xl p-3 text-xs mt-4">
          <b>Capability 3 Next: Price Comparison</b><br/>
          <input value={localPrice} onChange={e=>setLocalPrice(e.target.value)} placeholder="Paste verifiable local price e.g. Jumia Glyphosate ₦15,000/20L" className="w-full border rounded-lg px-3 py-2 text-xs mt-2" />
          <p className="mt-2">Final landed price vs local: Compare before forwarding to buyer. Coming in Cap 3.</p>
        </div>
      </div>
    </div>
  </div></div>
}
