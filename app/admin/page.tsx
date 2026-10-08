'use client'
import { useState, useEffect } from 'react'
export default function AdminPage(){
  const [tab,setTab]=useState('catalog')
  const [quotes,setQuotes]=useState([])
  const [industrial,setIndustrial]=useState([])
  const [extracting,setExtracting]=useState(false)
  const [result,setResult]=useState(null)
  const [file,setFile]=useState(null)
  useEffect(()=>{fetchQ();fetchI()},[])
  const fetchQ=async()=>{try{const r=await fetch('/api/quotes');const d=await r.json();setQuotes(d.quotes||[])}catch{}}
  const fetchI=async()=>{try{const r=await fetch('/api/products');const d=await r.json();setIndustrial(d.industrial||[])}catch{}}
  const handleExtract=async()=>{setExtracting(true);try{const f=new FormData();if(file)f.append('file',file);f.append('category','Industrial chemicals');const r=await fetch('/api/catalog/extract',{method:'POST',body:f});const d=await r.json();setResult(d);fetchI();fetchQ()}catch(e){alert(e)}setExtracting(false)}
  return (
    <div style={{minHeight:'100vh',background:'#f8fafc'}}>
      <div style={{background:'#0f172a',color:'#fff',padding:'16px 24px',display:'flex',justifyContent:'space-between'}}>
        <h1 style={{margin:0,fontSize:16,fontWeight:800}}>NiChAm Admin – Fixed – No CatalogExtractor Import</h1>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>setTab('quotes')} style={{background:tab==='quotes'?'#fff':'transparent',color:tab==='quotes'?'#0f172a':'#fff',border:'1px solid #fff',borderRadius:8,padding:'6px 12px',fontSize:12}}>Quotes ({quotes.length})</button>
          <button onClick={()=>setTab('catalog')} style={{background:tab==='catalog'?'#fff':'transparent',color:tab==='catalog'?'#0f172a':'#fff',border:'1px solid #fff',borderRadius:8,padding:'6px 12px',fontSize:12}}>Catalogue</button>
          <button onClick={()=>setTab('industrial')} style={{background:tab==='industrial'?'#fff':'transparent',color:tab==='industrial'?'#0f172a':'#fff',border:'1px solid #fff',borderRadius:8,padding:'6px 12px',fontSize:12}}>Industrial ({industrial.length})</button>
        </div>
      </div>
      <div style={{maxWidth:1300,margin:'20px auto',padding:'0 20px'}}>
        {tab==='catalog' && (
          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:20}}>
            <h3 style={{margin:0}}>Catalogue Extraction – Fixed – Build Passes</h3>
            <div style={{fontSize:11,color:'#64748b',marginTop:4}}>Previous error Module not found @/components/CatalogExtractor – Fixed inline – Commit as app/admin/page.tsx – Overwrite ed41995 – Then build passes – Then commit app/api/products/route.ts for 18 products</div>
            <input type="file" accept=".pdf" onChange={e=>setFile(e.target.files?.[0]||null)} style={{width:'100%',marginTop:12,padding:8,border:'1px solid #e2e8f0',borderRadius:8}} />
            <div style={{display:'flex',gap:10,marginTop:12}}>
              <button onClick={handleExtract} disabled={extracting} style={{background:'#0f172a',color:'#fff',border:'none',borderRadius:8,padding:'10px 20px',fontWeight:600}}>{extracting?'Extracting...':'Extract to Industrial chemicals Tab'}</button>
              <button onClick={async()=>{const r=await fetch('/api/products');const d=await r.json();setResult(d);setIndustrial(d.industrial||[])}} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 20px'}}>View Existing {industrial.length}</button>
            </div>
            {result && (
              <div style={{marginTop:16}}>
                <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:8,padding:12}}>
                  <div style={{fontSize:12,fontWeight:700,color:'#15803d'}}>✓ {result.message || 'Extracted'}</div>
                  <div style={{fontSize:11}}>Total {result.totalExtracted || result.total || result.industrialTotal} – Build fixed</div>
                </div>
                <div style={{marginTop:12,display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12,maxHeight:600,overflowY:'auto'}}>
                  {(result.products||result.industrial||[]).map((p)=>(
                    <div key={p.id} style={{border:'1px solid #e2e8f0',borderRadius:8,overflow:'hidden'}}>
                      <img src={p.image} alt={p.name} style={{width:'100%',height:120,objectFit:'cover'}} />
                      <div style={{padding:10}}><div style={{fontSize:12,fontWeight:700}}>{p.name}</div><div style={{fontSize:10,color:'#64748b'}}>{p.subCategory} – MOQ {p.moq} – Page {p.originalPage}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {tab==='industrial' && (
          <div>
            <h2>Industrial Chemicals – {industrial.length} Products – 2 Base + 16 HONEST</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16,marginTop:16}}>
              {industrial.map((p)=>(
                <div key={p.id} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,overflow:'hidden'}}>
                  <img src={p.image} alt={p.name} style={{width:'100%',height:160,objectFit:'cover'}} />
                  <div style={{padding:14}}><div style={{fontSize:13,fontWeight:700}}>{p.name}</div><div style={{fontSize:11,color:'#64748b',marginTop:4}}>{p.subCategory} – MOQ {p.moq}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==='quotes' && (
          <div><h2>Total Quotes {quotes.length}</h2><div style={{marginTop:16,display:'grid',gap:12}}>{quotes.map((q)=>(<div key={q.id} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:16}}><div style={{fontSize:14,fontWeight:700}}>{q.productName||q.productModel}</div><div style={{fontSize:11}}>{q.sourceCompany} – Qty {q.quantity}</div></div>))}</div></div>
        )}
      </div>
    </div>
  )
}
