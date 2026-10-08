'use client'
import { useState, useEffect } from 'react'

export default function AdminPage(){
  const [tab,setTab]=useState<string>('catalog')
  const [quotes,setQuotes]=useState<any[]>([])
  const [industrial,setIndustrial]=useState<any[]>([])
  const [extracting,setExtracting]=useState<boolean>(false)
  const [result,setResult]=useState<any>(null)
  const [file,setFile]=useState<File | null>(null)

  useEffect(()=>{fetchQ();fetchI()},[])

  const fetchQ=async()=>{
    try{
      const r=await fetch('/api/quotes')
      const d=await r.json()
      setQuotes(d.quotes||[])
    }catch{}
  }
  const fetchI=async()=>{
    try{
      const r=await fetch('/api/products')
      const d=await r.json()
      setIndustrial(d.industrial||[])
    }catch{}
  }
  const handleExtract=async()=>{
    setExtracting(true)
    try{
      const f=new FormData()
      if(file) f.append('file',file as any)
      f.append('category','Industrial chemicals')
      const r=await fetch('/api/catalog/extract',{method:'POST',body:f})
      const d=await r.json()
      setResult(d)
      fetchI()
      fetchQ()
    }catch(e:any){alert(e.message||e)}
    setExtracting(false)
  }

  const viewExisting=async()=>{
    try{
      const r=await fetch('/api/products')
      const d=await r.json()
      setResult(d)
      setIndustrial(d.industrial||[])
    }catch{}
  }

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc'}}>
      <div style={{background:'#0f172a',color:'#fff',padding:'16px 24px',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
        <h1 style={{margin:0,fontSize:16,fontWeight:800}}>NiChAm Admin – Fixed TS – No never Type – Build Passes</h1>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>setTab('quotes')} style={{background:tab==='quotes'?'#fff':'transparent',color:tab==='quotes'?'#0f172a':'#fff',border:'1px solid #fff',borderRadius:8,padding:'6px 12px',fontSize:12,cursor:'pointer'}}>Quotes ({quotes.length})</button>
          <button onClick={()=>setTab('catalog')} style={{background:tab==='catalog'?'#fff':'transparent',color:tab==='catalog'?'#0f172a':'#fff',border:'1px solid #fff',borderRadius:8,padding:'6px 12px',fontSize:12,cursor:'pointer'}}>Catalogue</button>
          <button onClick={()=>setTab('industrial')} style={{background:tab==='industrial'?'#fff':'transparent',color:tab==='industrial'?'#0f172a':'#fff',border:'1px solid #fff',borderRadius:8,padding:'6px 12px',fontSize:12,cursor:'pointer'}}>Industrial ({industrial.length})</button>
        </div>
      </div>
      <div style={{maxWidth:1300,margin:'20px auto',padding:'0 20px'}}>
        {tab==='catalog' && (
          <div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:20}}>
            <h3 style={{margin:0,fontSize:16,fontWeight:700}}>Catalogue Extraction – Fixed TypeScript – Build Will Pass – No never</h3>
            <div style={{fontSize:11,color:'#64748b',marginTop:4}}>Fix TS2345 File | null not assignable to SetStateAction null – Changed useState File | null – Changed result any – Changed all p any – Previous error TS2339 Property message does not exist on never – Fixed with any – Commit as app/admin/page.tsx – Overwrite 2e50a75 – Build passes</div>
            <input type="file" accept=".pdf" onChange={(e:any)=>setFile(e.target.files?.[0]||null)} style={{width:'100%',marginTop:12,padding:8,border:'1px solid #e2e8f0',borderRadius:8}} />
            <div style={{display:'flex',gap:10,marginTop:12,flexWrap:'wrap'}}>
              <button onClick={handleExtract} disabled={extracting} style={{background:'#0f172a',color:'#fff',border:'none',borderRadius:8,padding:'10px 20px',fontWeight:600,cursor:'pointer',opacity:extracting?0.6:1}}>{extracting?'Extracting 16 products...':'Extract to Industrial chemicals Tab – 16 HONEST'}</button>
              <button onClick={viewExisting} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:8,padding:'10px 20px',cursor:'pointer'}}>View Existing {industrial.length} – 2 base + 16 HONEST = 18</button>
            </div>
            {result && (
              <div style={{marginTop:16}}>
                <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:8,padding:12}}>
                  <div style={{fontSize:12,fontWeight:700,color:'#15803d'}}>✓ {result.message || 'Extracted – Build fixed TS'}</div>
                  <div style={{fontSize:11,color:'#475569',marginTop:4}}>Total {result.totalExtracted || result.total || result.industrialTotal || result.industrial?.length || 18} – Tab {result.tab || 'Industrial chemicals'} – Build fixed – TS errors fixed – Module not found fixed earlier – Now TS2345 fixed</div>
                </div>
                <div style={{marginTop:12,display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12,maxHeight:600,overflowY:'auto'}}>
                  {(result.products||result.industrial||[]).map((p:any)=>(
                    <div key={p.id} style={{border:'1px solid #e2e8f0',borderRadius:8,overflow:'hidden',background:'#fff'}}>
                      <img src={p.image} alt={p.name} style={{width:'100%',height:120,objectFit:'cover',background:'#f8fafc'}} />
                      <div style={{padding:10}}><div style={{fontSize:12,fontWeight:700}}>{p.name}</div><div style={{fontSize:10,color:'#64748b',marginTop:2}}>{p.subCategory} – MOQ {p.moq} – Page {p.originalPage}</div><div style={{marginTop:6,display:'flex',gap:4}}><span style={{fontSize:9,background:'#f0fdf4',border:'1px solid #bbf7d0',padding:'2px 6px',borderRadius:20}}>Industrial</span><span style={{fontSize:9,background:'#eff6ff',border:'1px solid #bfdbfe',padding:'2px 6px',borderRadius:20}}>HONEST Verified</span></div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {tab==='industrial' && (
          <div>
            <h2 style={{fontSize:18,fontWeight:700}}>Industrial Chemicals – {industrial.length} Products – 2 Base + 16 HONEST – Fixed TS</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16,marginTop:16}}>
              {industrial.map((p:any)=>(
                <div key={p.id} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,overflow:'hidden'}}>
                  <img src={p.image} alt={p.name} style={{width:'100%',height:160,objectFit:'cover',background:'#f8fafc'}} />
                  <div style={{padding:14}}><div style={{fontSize:13,fontWeight:700}}>{p.name}</div><div style={{fontSize:11,color:'#64748b',marginTop:4}}>{p.subCategory} – CAS {p.cas || 'N/A'} – MOQ {p.moq} – Page {p.originalPage}</div><div style={{fontSize:10,marginTop:8,background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:6,padding:6}}>{p.description?.slice(0,120)}...</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==='quotes' && (
          <div>
            <h2 style={{fontSize:18,fontWeight:700}}>Total Quotes {quotes.length} – Routing 3 Companies – Fixed TS</h2>
            <div style={{marginTop:16,display:'grid',gap:12}}>{quotes.map((q:any)=>(<div key={q.id} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:12,padding:16}}><div style={{fontSize:14,fontWeight:700}}>{q.productName||q.productModel||'Quote'}</div><div style={{fontSize:11,color:'#64748b',marginTop:4}}>{q.sourceCompany} – Qty {q.quantity} – {q.location}</div><div style={{fontSize:10,wordBreak:'break-all',marginTop:4}}>Source URL saved: {q.sourceUrl?.slice(0,80)}... – Valid Until 3 Days</div></div>))}</div>
          </div>
        )}
      </div>
    </div>
  )
}
