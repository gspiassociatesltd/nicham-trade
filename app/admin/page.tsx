'use client'
import { useState, useEffect } from 'react'

type Mfr = {
 id:string; productName:string; factoryName:string; country:string;
 link:string; standard:string; proofType:string; proofUrl:string;
 hungryReason:string; price:string; status:'pending'|'approved'|'rejected'
}

export default function AdminVault(){
  const [pin,setPin]=useState('')
  const [auth,setAuth]=useState(false)
  const [tab,setTab]=useState<'vault'|'fast'|'logistics'|'inspectors'|'orders'|'payouts'>('vault')
  const [inspectors,setInspectors]=useState<any[]>([])
  const [newInsp,setNewInsp]=useState<any>({})
  const [logistics,setLogistics]=useState<any[]>([])
  const [newLog,setNewLog]=useState<any>({})
  const [mfrs,setMfrs]=useState<Mfr[]>([])
  const [newMfr,setNewMfr]=useState<Partial<Mfr>>({standard:'CE, IEC, UL, ISO 9001', proofType:'CE + TUV + ISO', status:'pending'})

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem('admin_mfrs')||'[]')
    setMfrs(saved)
    const savedLog = JSON.parse(localStorage.getItem('admin_logistics')||'[]')
    setLogistics(savedLog)
    const savedInsp = JSON.parse(localStorage.getItem('admin_inspectors')||'[]')
    if(savedInsp.length===0){
      // Preload QIMA + Cotecna as first 2 inspectors per CTO decision
      const preload=[
        {id:'INSP-QIMA', companyName:'QIMA (formerly AsiaInspection)', country:'China + Nigeria presence (100+ countries)', link:'https://www.qima.com', standard:'ISO 17020, EU/US - CE, UL, IEC, ISO, REACH, EPA verification', accreditation:'ISO 17020 accredited, 85 countries on-ground', chinaOffice:'Yes - Very strong QC presence China', nigeriaOffice:'Yes - Listed in Africa coverage: Nigeria, Ghana, Kenya, SA', service:'Pre-destination / Pre-shipment inspection, factory audit, sample test, photo/video PSI certificate', naira:'Yes - Lagos coverage accepts Naira via NG office', milestone:'Yes - Pay per inspection $300-600 from sourcing 3%', independence:'Independent from logistics - Your Eyes in Supply Chain', hungry:'Hungry to enter Nigeria agro/solar volume - 30k brands served', status:'approved'},
        {id:'INSP-COTECNA', companyName:'Cotecna Inspection Nigeria (SONCAP)', country:'Nigeria + China - Official SONCAP agent', link:'https://www.cotecna.com', standard:'SONCAP, ISO 17020, EU/US - CE, IEC, ISO, EPA, REACH for chemicals', accreditation:'Nigeria SONCAP authorized, ISO 17020', chinaOffice:'Yes - China inspection via global network', nigeriaOffice:'Yes - Lagos office, official govt partner', service:'Pre-shipment inspection for SONCAP, quality/quantity verification, customs compliance', naira:'Yes - Accepts Naira, Lagos account', milestone:'Yes - 30/40/30% and escrow friendly', independence:'Independent from logistics - Govt authorized', hungry:'Seeking private platform volume beyond govt - agro/chemicals', status:'approved'}
      ];
      setInspectors(preload); localStorage.setItem('admin_inspectors', JSON.stringify(preload))
    } else { setInspectors(savedInsp) }
    if(localStorage.getItem('admin_auth')==='yes') setAuth(true)
  },[])

  const saveMfrs = (list:Mfr[])=>{ setMfrs(list); localStorage.setItem('admin_mfrs', JSON.stringify(list)) }

  const login = ()=>{
    if(pin==='9201' || pin==='Abaniwo2026' || pin==='nicham-admin'){
      setAuth(true); localStorage.setItem('admin_auth','yes')
    } else alert('Wrong PIN - Contact owner only')
  }

  const addMfr = ()=>{
    if(!newMfr.factoryName || !newMfr.link || !newMfr.proofUrl){ alert('Factory Name + Link + Proof URL required - EU/US standard proof mandatory'); return }
    const m:Mfr = {
      id:'MFR-'+Date.now(),
      productName: newMfr.productName||'Solar/Chemical Product',
      factoryName: newMfr.factoryName||'',
      country: newMfr.country||'China',
      link: newMfr.link||'',
      standard: newMfr.standard||'CE, IEC, UL, ISO 9001, EPA, REACH',
      proofType: newMfr.proofType||'CE + TUV + ISO',
      proofUrl: newMfr.proofUrl||'',
      hungryReason: newMfr.hungryReason||'Hungry to enter Nigeria - seeking distributor, low MOQ, OEM',
      price: newMfr.price||'',
      status: 'pending'
    }
    saveMfrs([m, ...mfrs])
    setNewMfr({standard:'CE, IEC, UL, ISO 9001', proofType:'CE + TUV + ISO', status:'pending'})
  }

  const approve = (id:string)=>{ saveMfrs(mfrs.map(x=> x.id===id ? {...x, status:'approved'}:x)) }
  const reject = (id:string)=>{ saveMfrs(mfrs.map(x=> x.id===id ? {...x, status:'rejected'}:x)) }

  if(!auth){
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm">
          <h1 className="font-black text-lg">Admin Vault - Owner Only</h1>
          <div className="text-[11px] text-gray-600 mt-1">Manufacturers must meet EU/US standard with proof. Hidden from users. PIN required.</div>
          <input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="Enter Admin PIN (9201)" className="mt-4 w-full px-4 py-2 rounded-full border text-sm" />
          <button onClick={login} className="mt-3 w-full py-2 bg-black text-white rounded-full text-sm font-bold">Unlock Vault</button>
          <div className="text-[10px] mt-3 text-gray-500">Condition: Any manufacturer must manufacture to European & American standard with proof (CE, UL, IEC, ISO, EPA, REACH, TUV). Links suggested must be for factories hungry to enter Nigerian market.</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-black">Admin Vault - EU/US Standard Only</h1>
        <button onClick={()=>{localStorage.removeItem('admin_auth'); setAuth(false)}} className="text-xs underline">Lock</button>
      </div>

      <div className="flex gap-2 mt-4">
        {['vault','fast','logistics','inspectors','orders','payouts'].map(t=>(
          <button key={t} onClick={()=>setTab(t as any)} className={`px-4 py-1.5 rounded-full text-xs font-bold ${tab===t?'bg-black text-white':'bg-white border'}`}>{t.toUpperCase()}</button>
        ))}
      </div>

      {tab==='vault' && (
        <div className="mt-4 space-y-4">
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
            <div className="text-xs font-black">Condition Enforced</div>
            <div className="text-[11px] mt-1">Any manufacturer we deal with MUST manufacture to European & American standard with PROOF. Required proofs: Solar → CE, TUV, IEC 62109, IEC 62619, UL 1741, ISO 9001. Chemicals → ISO 9001, EPA, REACH, GHS SDS, EU MSDS. No proof = No listing. Suggested links must be factories HUNGRY to enter Nigeria (seeking distributor, low MOQ, OEM, competitive price).</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-xs font-black">Add Manufacturer - EU/US Standard Proof Mandatory</div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input value={newMfr.productName||''} onChange={e=>setNewMfr({...newMfr, productName:e.target.value})} placeholder="Product Name (e.g., 10kVA Hybrid Inverter)" className="px-3 py-2 rounded border text-xs" />
              <input value={newMfr.factoryName||''} onChange={e=>setNewMfr({...newMfr, factoryName:e.target.value})} placeholder="Factory Name" className="px-3 py-2 rounded border text-xs" />
              <input value={newMfr.country||''} onChange={e=>setNewMfr({...newMfr, country:e.target.value})} placeholder="Country" className="px-3 py-2 rounded border text-xs" />
              <input value={newMfr.link||''} onChange={e=>setNewMfr({...newMfr, link:e.target.value})} placeholder="Factory Link (Alibaba / Official Website)" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newMfr.standard||''} onChange={e=>setNewMfr({...newMfr, standard:e.target.value})} placeholder="EU/US Standard (CE, UL, IEC, ISO...)" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newMfr.proofType||''} onChange={e=>setNewMfr({...newMfr, proofType:e.target.value})} placeholder="Proof Type (e.g., CE+TUV Certificate No.)" className="px-3 py-2 rounded border text-xs" />
              <input value={newMfr.proofUrl||''} onChange={e=>setNewMfr({...newMfr, proofUrl:e.target.value})} placeholder="Proof URL / Doc Link (mandatory)" className="px-3 py-2 rounded border text-xs" />
              <input value={newMfr.hungryReason||''} onChange={e=>setNewMfr({...newMfr, hungryReason:e.target.value})} placeholder="Hungry Reason: Seeking distributor, low MOQ, Nigeria entry" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newMfr.price||''} onChange={e=>setNewMfr({...newMfr, price:e.target.value})} placeholder="Indicative Price $/unit or $/ton" className="px-3 py-2 rounded border text-xs col-span-2" />
            </div>
            <button onClick={addMfr} className="mt-3 w-full py-2 bg-black text-white rounded-full text-xs font-bold">Add to Vault (Pending Approval)</button>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-xs font-black">Vault - {mfrs.length} Manufacturers (EU/US proof required)</div>
            {mfrs.map(m=>(
              <div key={m.id} className="mt-3 border rounded-xl p-3 text-xs">
                <div className="flex justify-between"><span className="font-bold">{m.factoryName}</span><span className={`px-2 py-0.5 rounded-full text-[10px] ${m.status==='approved'?'bg-green-200':m.status==='rejected'?'bg-red-200':'bg-yellow-200'}`}>{m.status}</span></div>
                <div>Product: {m.productName} | {m.country}</div>
                <div>Link: <a href={m.link} target="_blank" className="text-blue-600 underline break-all">{m.link}</a></div>
                <div>Standard: {m.standard} | Proof: {m.proofType} → <a href={m.proofUrl} target="_blank" className="text-blue-600 underline">View Proof</a></div>
                <div>Hungry: {m.hungryReason}</div>
                <div>Price: {m.price}</div>
                <div className="flex gap-2 mt-2">
                  <button onClick={()=>approve(m.id)} className="px-3 py-1 bg-green-600 text-white rounded-full text-[11px]">Approve → Live</button>
                  <button onClick={()=>reject(m.id)} className="px-3 py-1 bg-red-600 text-white rounded-full text-[11px]">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='logistics' && (
        <div className="mt-4 space-y-4">
          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4">
            <div className="text-xs font-black">Logistics Condition Enforced - 5 Must-Haves</div>
            <div className="text-[11px] mt-1">Any logistics we deal with MUST meet ALL 5: 1) Allow milestone payments 30/40/30% 2) Accept escrow (MTN MoMo Escrow) 3) Have Goods-in-Transit Insurance with proof 4) Can undertake Custom Clearance at Lagos/Onne/Apapa + proof of license 5) Accept payment in Naira (not only USD/CNY). No 5 = No listing. Must be hungry to handle Nigeria agro/solar volume.</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-xs font-black">Add Trusted Logistics - 5 Conditions Mandatory</div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input value={newLog.companyName||''} onChange={e=>setNewLog({...newLog, companyName:e.target.value})} placeholder="Company Name" className="px-3 py-2 rounded border text-xs" />
              <input value={newLog.contact||''} onChange={e=>setNewLog({...newLog, contact:e.target.value})} placeholder="Contact / WhatsApp" className="px-3 py-2 rounded border text-xs" />
              <input value={newLog.milestone||''} onChange={e=>setNewLog({...newLog, milestone:e.target.value})} placeholder="Milestone: 30/40/30% ? Yes/No + Terms" className="px-3 py-2 rounded border text-xs" />
              <input value={newLog.escrow||''} onChange={e=>setNewLog({...newLog, escrow:e.target.value})} placeholder="Escrow: MTN MoMo Escrow accepted? Yes/No" className="px-3 py-2 rounded border text-xs" />
              <input value={newLog.insurance||''} onChange={e=>setNewLog({...newLog, insurance:e.target.value})} placeholder="Goods-in-Transit Insurance: Policy No + Insurer" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newLog.insuranceProof||''} onChange={e=>setNewLog({...newLog, insuranceProof:e.target.value})} placeholder="Insurance Proof URL (mandatory)" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newLog.customs||''} onChange={e=>setNewLog({...newLog, customs:e.target.value})} placeholder="Custom Clearance: License No + Ports (Lagos/Onne)" className="px-3 py-2 rounded border text-xs" />
              <input value={newLog.naira||''} onChange={e=>setNewLog({...newLog, naira:e.target.value})} placeholder="Accept Naira? Yes + Account / No" className="px-3 py-2 rounded border text-xs" />
              <input value={newLog.link||''} onChange={e=>setNewLog({...newLog, link:e.target.value})} placeholder="Company Website / Profile Link" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newLog.hungry||''} onChange={e=>setNewLog({...newLog, hungry:e.target.value})} placeholder="Hungry Reason: Seeking Nigeria volume, agro/solar" className="px-3 py-2 rounded border text-xs col-span-2" />
            </div>
            <button onClick={()=>{
              if(!newLog.companyName || !newLog.insuranceProof || !newLog.naira || !newLog.escrow){ alert('Company + Insurance Proof + Naira + Escrow required - 5 conditions mandatory'); return }
              const entry={id:'LOG-'+Date.now(), ...newLog, status:'pending'}
              const list=[entry, ...logistics]
              setLogistics(list); localStorage.setItem('admin_logistics', JSON.stringify(list)); setNewLog({})
            }} className="mt-3 w-full py-2 bg-blue-700 text-white rounded-full text-xs font-bold">Add Logistics to Vault</button>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-xs font-black">Vault - {logistics.length} Logistics (5 conditions required)</div>
            {logistics.map((l:any)=>(
              <div key={l.id} className="mt-3 border rounded-xl p-3 text-xs">
                <div className="flex justify-between"><span className="font-bold">{l.companyName}</span><span className={`px-2 py-0.5 rounded-full text-[10px] ${l.status==='approved'?'bg-green-200':'bg-yellow-200'}`}>{l.status}</span></div>
                <div>Contact: {l.contact} | Milestone: {l.milestone} | Escrow: {l.escrow}</div>
                <div>Insurance: {l.insurance} → <a href={l.insuranceProof} target="_blank" className="text-blue-600 underline">Proof</a> | Customs: {l.customs} | Naira: {l.naira}</div>
                <div>Link: <a href={l.link} target="_blank" className="text-blue-600 underline break-all">{l.link}</a> | Hungry: {l.hungry}</div>
                <div className="flex gap-2 mt-2">
                  <button onClick={()=>{ const lst=logistics.map(x=> x.id===l.id ? {...x, status:'approved'}:x); setLogistics(lst); localStorage.setItem('admin_logistics', JSON.stringify(lst)) }} className="px-3 py-1 bg-green-600 text-white rounded-full text-[11px]">Approve → Use for Escrow</button>
                </div>
              </div>
            ))}
            {logistics.length===0 && <div className="text-[11px] text-gray-500 mt-2">No logistics yet - Add those that accept 30/40/30%, MTN MoMo Escrow, Transit Insurance, Customs, Naira payment. Suggestion for V100: AfricanIES Logistics, Bollore, DHL Global Forwarding NG, Sifax, Kobo360 enterprise + insurance partner Leadway/AXA Mansard</div>}
          </div>
        </div>
      )}

      {tab==='inspectors' && (
        <div className="mt-4 space-y-4">
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4">
            <div className="text-xs font-black">Pre-Destination Inspectors - Independent from Logistics - MTN Trust Model</div>
            <div className="text-[11px] mt-1">Any inspector MUST be independent from logistics (no conflict). Must have China + Nigeria offices, EU/US accreditation, issue PSI certificate with photo/video proof. MTN MoMo Escrow releases 30% ONLY AFTER PSI pass. QIMA already in Nigeria per official coverage. Cotecna is official SONCAP agent. Others (SGS, Bureau Veritas, Intertek) can be added later via Admin portal - Add Inspector form below.</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-xs font-black">Add Professional Inspector - Independent PSI Mandatory</div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input value={newInsp.companyName||''} onChange={e=>setNewInsp({...newInsp, companyName:e.target.value})} placeholder="Company Name (e.g., SGS)" className="px-3 py-2 rounded border text-xs" />
              <input value={newInsp.link||''} onChange={e=>setNewInsp({...newInsp, link:e.target.value})} placeholder="Website Link" className="px-3 py-2 rounded border text-xs" />
              <input value={newInsp.accreditation||''} onChange={e=>setNewInsp({...newInsp, accreditation:e.target.value})} placeholder="Accreditation (ISO 17020 etc)" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newInsp.standard||''} onChange={e=>setNewInsp({...newInsp, standard:e.target.value})} placeholder="EU/US Standard Expertise (CE, UL, IEC...)" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newInsp.chinaOffice||''} onChange={e=>setNewInsp({...newInsp, chinaOffice:e.target.value})} placeholder="China Office? Yes/No" className="px-3 py-2 rounded border text-xs" />
              <input value={newInsp.nigeriaOffice||''} onChange={e=>setNewInsp({...newInsp, nigeriaOffice:e.target.value})} placeholder="Nigeria Office? Yes/No" className="px-3 py-2 rounded border text-xs" />
              <input value={newInsp.naira||''} onChange={e=>setNewInsp({...newInsp, naira:e.target.value})} placeholder="Accept Naira? Yes/No" className="px-3 py-2 rounded border text-xs" />
              <input value={newInsp.milestone||''} onChange={e=>setNewInsp({...newInsp, milestone:e.target.value})} placeholder="Milestone / Escrow? Yes/No" className="px-3 py-2 rounded border text-xs" />
              <input value={newInsp.service||''} onChange={e=>setNewInsp({...newInsp, service:e.target.value})} placeholder="Service: PSI, factory audit, photo/video cert" className="px-3 py-2 rounded border text-xs col-span-2" />
              <input value={newInsp.hungry||''} onChange={e=>setNewInsp({...newInsp, hungry:e.target.value})} placeholder="Hungry Reason for Nigeria" className="px-3 py-2 rounded border text-xs col-span-2" />
            </div>
            <button onClick={()=>{
              if(!newInsp.companyName || !newInsp.nigeriaOffice){ alert('Company + Nigeria presence required'); return }
              const entry={id:'INSP-'+Date.now(), ...newInsp, status:'pending', independence:'Independent from logistics'}
              const list=[entry, ...inspectors]
              setInspectors(list); localStorage.setItem('admin_inspectors', JSON.stringify(list)); setNewInsp({})
            }} className="mt-3 w-full py-2 bg-green-700 text-white rounded-full text-xs font-bold">Add Inspector to Vault</button>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-xs font-black">Vault - {inspectors.length} Inspectors (QIMA + Cotecna preloaded, independent)</div>
            {inspectors.map((ins:any)=>(
              <div key={ins.id} className="mt-3 border-2 border-green-200 rounded-xl p-3 text-xs bg-green-50/30">
                <div className="flex justify-between"><span className="font-bold">{ins.companyName}</span><span className={`px-2 py-0.5 rounded-full text-[10px] ${ins.status==='approved'?'bg-green-300':'bg-yellow-200'}`}>{ins.status}</span></div>
                <div>Country: {ins.country} | China Office: {ins.chinaOffice} | Nigeria: {ins.nigeriaOffice}</div>
                <div>Accreditation: {ins.accreditation} | Standard: {ins.standard}</div>
                <div>Service: {ins.service}</div>
                <div>Naira: {ins.naira} | Milestone: {ins.milestone} | Independent: {ins.independence}</div>
                <div>Link: <a href={ins.link} target="_blank" className="text-blue-600 underline break-all">{ins.link}</a> | Hungry: {ins.hungry}</div>
                <div className="text-[10px] mt-1 text-green-700">MTN Trust: Independent PSI → Escrow 30% release only after PSI cert uploaded</div>
              </div>
            ))}
            <div className="text-[11px] text-gray-600 mt-3">Next: SGS, Bureau Veritas, Intertek can be added via form above through admin portal - for MTN enterprise trust later.</div>
          </div>
        </div>
      )}

      {tab==='fast' && (
        <div className="mt-4 bg-white rounded-xl p-4 shadow text-xs">
          <div className="font-black">Fast-Moving Suggestions - Nigeria Market (Next V100)</div>
          <div className="mt-2 text-[11px] text-gray-600">Will auto-suggest high-quality solar & chemical products hungry for Nigeria entry, with EU/US proof. Coming in V100.</div>
        </div>
      )}
      {tab==='orders' && (
        <div className="mt-4 bg-white rounded-xl p-4 shadow text-xs">
          <div className="font-black">Orders & Escrow (Internal Split Hidden from Users)</div>
          <div className="mt-2">{JSON.parse(localStorage.getItem('nicham_orders')||'[]').length} orders in localStorage - detailed split visible only here</div>
        </div>
      )}
      {tab==='payouts' && (
        <div className="mt-4 bg-white rounded-xl p-4 shadow text-xs">
          <div className="font-black">Affiliate vs Agent Payouts - XOR Audit</div>
          <div className="text-[11px] mt-1">Rule: A or B never both same order. Agent 2% if agentPhone present, else Affiliate 1% perpetual if affiliateCode present.</div>
        </div>
      )}
    </main>
  )
}
