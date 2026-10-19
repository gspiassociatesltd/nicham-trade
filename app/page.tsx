"use client"
import { useState } from 'react'

const PRODUCTS = [ { id:1, brand:'MOTOMA', name:'M68PW PRO 200Ah 25.6V', cat:'25.6V Residential', group:'Solar Batteries', desc:'5.12kWh LiFePO4 green hex BMS 6000 cycles', moq:'MOQ 2 Units', img:'/solar/motoma-m68pw.png', mfg:'Motoma', color:'#0ea5e9' }, { id:2, brand:'MOTOMA', name:'M69PW PRO 280Ah 25.6V', cat:'25.6V High Capacity', group:'Solar Batteries', desc:'7.16kWh 25.6V wall CAN/RS485 parallel 16 units', moq:'MOQ 2 Units', img:'/solar/motoma-m69pw.png', mfg:'Motoma', color:'#0ea5e9' }, { id:3, brand:'MOTOMA', name:'M87PW PRO 100Ah 51.2V', cat:'51.2V Server/Wall', group:'Solar Batteries', desc:'5.12kWh 51.2V server/wall Grade A UN38.3', moq:'MOQ 2 Units', img:'/solar/motoma-m87pw.png', mfg:'Motoma', color:'#0ea5e9' }, { id:4, brand:'MOTOMA', name:'M88PW PRO 200Ah 51.2V', cat:'51.2V Popular', group:'Solar Batteries', desc:'10.24kWh 51.2V stackable 100A charge', moq:'MOQ 2 Units', img:'/solar/motoma-m88pw.png', mfg:'Motoma', color:'#0ea5e9' }, { id:5, brand:'MUST', name:'PV18-3224 VPMII 3.2KW', cat:'High Frequency 24V', group:'Solar Batteries', desc:'3.2KW 24V 60A MPPT 160V VOC', moq:'MOQ Mix 1/5/20', img:'/solar/must-pv18-3224.png', mfg:'Must Power', color:'#f59e0b' }, { id:6, brand:'MUST', name:'PV18-3624 PRO 3.6KW', cat:'High Frequency 24V', group:'Solar Batteries', desc:'3.6KW 24V 100A MPPT 400V VOC', moq:'MOQ Mix 1/5/20', img:'/solar/must-pv18-3624.png', mfg:'Must Power', color:'#f59e0b' }, { id:7, brand:'MUST', name:'PV18-6048 PRO 6KW', cat:'High Frequency 48V', group:'Solar Batteries', desc:'6KW 48V 100A MPPT 450V VOC', moq:'MOQ Mix 1/5/20', img:'/solar/must-pv18-6048.png', mfg:'Must Power', color:'#f59e0b' }, { id:8, brand:'MUST', name:'PV19-10048EXP 10KW', cat:'Exp Series 48V', group:'Solar Batteries', desc:'10KW 48V 150A MPPT 500V WIFI Parallel', moq:'MOQ Mix 1/5/20', img:'/solar/must-pv19-10048.png', mfg:'Must Power', color:'#f59e0b' }, { id:9, brand:'MUST', name:'PH11-10KL1-EU 10KW', cat:'IP65 230V', group:'Solar Batteries', desc:'10KW 48V IP65 ON/OFF GRID 230V', moq:'MOQ Mix 1/5/20', img:'/solar/must-ph11-10kl1.png', mfg:'Must Power', color:'#f59e0b' }, { id:10, brand:'MUST', name:'PH11-15KL3-EU 15KW', cat:'IP65 380V', group:'Solar Batteries', desc:'15KW 48V IP65 ON/OFF GRID 380V', moq:'MOQ Mix 1/5/20', img:'/solar/must-ph11-15kl3.png', mfg:'Must Power', color:'#f59e0b' }, { id:11, brand:'MUST', name:'LP16-24200 5.12KWH', cat:'5.12KWH Wall', group:'Solar Batteries', desc:'25.6V 200AH LITHIUM 5.12KWH BMS', moq:'MOQ Mix 1/5/20', img:'/solar/must-lp16-24200.png', mfg:'Must Power', color:'#f59e0b' }, { id:12, brand:'MUST', name:'LP16-24300 7.68KWH', cat:'7.68KWH Wall', group:'Solar Batteries', desc:'25.6V 300AH 7.68KWH WALL MOUNTED', moq:'MOQ Mix 1/5/20', img:'/solar/must-lp16-24300.png', mfg:'Must Power', color:'#f59e0b' }, { id:13, brand:'MUST', name:'LP16-48100 SE 5.12KWH', cat:'5.12KWH SE', group:'Solar Batteries', desc:'51.2V 100AH BMS no WiFi kit', moq:'MOQ Mix 1/5/20', img:'/solar/must-lp16-48100se.png', mfg:'Must Power', color:'#f59e0b' }, { id:14, brand:'MUST', name:'LP16-48200 10.24KWH', cat:'10.24KWH', group:'Solar Batteries', desc:'51.2V 200AH 10.24KWH BMS stackable', moq:'MOQ Mix 1/5/20', img:'/solar/must-lp16-48200.png', mfg:'Must Power', color:'#f59e0b' }, { id:15, brand:'MUST', name:'LP16-48300 15.36KWH', cat:'15.36KWH', group:'Solar Batteries', desc:'51.2V 300AH 15.36KWH BMS 150A', moq:'MOQ Mix 1/5/20', img:'/solar/must-lp16-48300.png', mfg:'Must Power', color:'#f59e0b' }, { id:16, brand:'MUST', name:'HBP15-1012 1KW+1.28KWH', cat:'ALL IN ONE ESS', group:'Solar Batteries', desc:'1KW INVERTER WITH 1.28KWH BATTERY ALL IN ONE', moq:'MOQ Mix 1/5/20', img:'/solar/must-hbp15-1012.png', mfg:'Must Power', color:'#f59e0b' }, { id:17, brand:'MUST', name:'HBP18-3024 OS 3KW+3KWH', cat:'ALL IN ONE', group:'Solar Batteries', desc:'3KW INVERTER WITH 3KWH BATTERY', moq:'MOQ Mix 1/5/20', img:'/solar/must-hbp18-3024.png', mfg:'Must Power', color:'#f59e0b' }, { id:18, brand:'MUST', name:'HBP18-5548 ES 5.5KW+10.24KWH', cat:'Solar Generator', group:'Solar Batteries', desc:'5.5KW GENERATOR WITH 10.24KWH BATTERY', moq:'MOQ Mix 1/5/20', img:'/solar/must-hbp18-5548.png', mfg:'Must Power', color:'#f59e0b' }, { id:101, brand:'CHEMICAL', name:'Paracetamol Powder', cat:'Pharmaceuticals', group:'Industrial Chemical', desc:'USP/BP COA MSDS 25KG drum', moq:'MOQ 5 MT', img:'', mfg:'', color:'#6366f1' }, { id:102, brand:'CHEMICAL', name:'Crystallized Sorbitol', cat:'Pharmaceuticals', group:'Industrial Chemical', desc:'Food & Pharma grade 25KG bags', moq:'MOQ 5 MT', img:'', mfg:'', color:'#6366f1' }, { id:103, brand:'CHEMICAL', name:'Caustic Soda Flakes 99%', cat:'Commodity Chemicals', group:'Industrial Chemical', desc:'99% 25KG bags NaOH', moq:'MOQ 5 MT', img:'', mfg:'', color:'#0ea5e9' }, { id:104, brand:'CHEMICAL', name:'Hydrochloric Acid 31%', cat:'Commodity Chemicals', group:'Industrial Chemical', desc:'31% HCl IBC 1000L', moq:'MOQ 5 MT', img:'', mfg:'', color:'#0ea5e9' }, { id:105, brand:'CHEMICAL', name:'Nitric Acid 68%', cat:'Commodity Chemicals', group:'Industrial Chemical', desc:'68% HNO3 IBC fertilizer', moq:'MOQ 5 MT', img:'', mfg:'', color:'#0ea5e9' }, { id:106, brand:'CHEMICAL', name:'Stearic Acid', cat:'Commodity Chemicals', group:'Industrial Chemical', desc:'Triple pressed 25KG bags', moq:'MOQ 5 MT', img:'', mfg:'', color:'#0ea5e9' }, { id:107, brand:'CHEMICAL', name:'Acetic Acid Glacial 99%', cat:'Commodity Chemicals', group:'Industrial Chemical', desc:'99.8% glacial IBC 1000L', moq:'MOQ 5 MT', img:'', mfg:'', color:'#0ea5e9' }, { id:108, brand:'CHEMICAL', name:'Hydrogen Peroxide 50%', cat:'Commodity Chemicals', group:'Industrial Chemical', desc:'50% food grade IBC 1000L', moq:'MOQ 5 MT', img:'', mfg:'', color:'#0ea5e9' }, { id:109, brand:'CHEMICAL', name:'Natrosol 250 HHR', cat:'Paint Chemicals', group:'Industrial Chemical', desc:'HEC thickener 25KG bags', moq:'MOQ 5 MT', img:'', mfg:'', color:'#f59e0b' }, { id:110, brand:'CHEMICAL', name:'Calcium Carbonate', cat:'Paint Chemicals', group:'Industrial Chemical', desc:'Superfine 800-2500 mesh 25KG', moq:'MOQ 10 MT', img:'', mfg:'', color:'#f59e0b' }, { id:111, brand:'CHEMICAL', name:'Soda Ash Light', cat:'Water Treatment', group:'Industrial Chemical', desc:'99.2% Na2CO3 50KG bags', moq:'MOQ 10 MT', img:'', mfg:'', color:'#14b8a6' }, { id:112, brand:'CHEMICAL', name:'Calcium Hypochlorite 65%', cat:'Water Treatment', group:'Industrial Chemical', desc:'65% granular 45KG drum', moq:'MOQ 5 MT', img:'', mfg:'', color:'#14b8a6' }, { id:113, brand:'CHEMICAL', name:'Poly Aluminium Chloride 30%', cat:'Water Treatment', group:'Industrial Chemical', desc:'PAC 30% yellow 25KG bags', moq:'MOQ 5 MT', img:'', mfg:'', color:'#14b8a6' }, { id:114, brand:'CHEMICAL', name:'Aluminium Sulphate 17%', cat:'Water Treatment', group:'Industrial Chemical', desc:'17% granular 50KG bags', moq:'MOQ 10 MT', img:'', mfg:'', color:'#14b8a6' }, { id:115, brand:'CHEMICAL', name:'Ferric Chloride 40%', cat:'Water Treatment', group:'Industrial Chemical', desc:'40% liquid IBC', moq:'MOQ 5 MT', img:'', mfg:'', color:'#14b8a6' } ]

export default function Page(){
  const [tab, setTab] = useState('All')
  const TABS = ['All','Solar Batteries','Industrial Chemical']
  const filtered = tab === 'All' ? PRODUCTS : PRODUCTS.filter(function(p){ return p.group === tab })
  const handleRFQ = function(p){
    var msg = 'Hello NiChAm Trade, RFQ for ' + p.brand + ' ' + p.name + ' - ' + p.desc + '. DDP Lagos, Nigeria. Qty: '
    window.open('https://wa.me/2347050477950?text=' + encodeURIComponent(msg), '_blank')
  }
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'}}>
      <header style={{background:'#ffffff', borderBottom:'1px solid #e2e8f0', position:'sticky', top:0, zIndex:20}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{width:'36px', height:'36px', background:'#0f172a', color:'#fff', borderRadius:'9px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'14px', letterSpacing:'-0.5px'}}>NC</div>
            <div>
              <div style={{fontWeight:800, fontSize:'15px', letterSpacing:'-0.3px', color:'#0f172a', lineHeight:1}}>NiChAm Trade</div>
              <div style={{fontSize:'11px', color:'#64748b', fontWeight:600, marginTop:'2px'}}>SOLAR & CHEMICAL DDP LAGOS</div>
            </div>
          </div>
          <div style={{fontSize:'11px', color:'#64748b', border:'1px solid #e2e8f0', padding:'6px 10px', borderRadius:'999px', fontWeight:600}}>33 PRODUCTS • DDP READY</div>
        </div>
      </header>

      <main style={{maxWidth:'1280px', margin:'0 auto', padding:'20px'}}>
        <div style={{display:'flex', gap:'10px', flexWrap:'wrap', margin:'18px 0 22px'}}>
          {TABS.map(function(t){
            var active = tab === t
            return (
              <button key={t} onClick={function(){ setTab(t) }} style={{padding:'10px 18px', borderRadius:'999px', border:'1px solid ' + (active ? '#0f172a' : '#e2e8f0'), background: active ? '#0f172a' : '#ffffff', color: active ? '#ffffff' : '#334155', fontSize:'13px', fontWeight:700, cursor:'pointer', transition:'all .15s'}}>
                {t}
              </button>
            )
          })}
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'18px'}}>
          {filtered.map(function(p){
            return (
              <div key={p.id} style={{background:'#ffffff', border:'1px solid #e2e8f0', borderRadius:'16px', overflow:'hidden', display:'flex', flexDirection:'column'}}>
                <div style={{height:'176px', background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', borderBottom:'1px solid #f1f5f9'}}>
                  {p.img ? (
                    <>
                      <img src={p.img} alt={p.name} style={{width:'100%', height:'100%', objectFit:'contain', padding:'14px'}} onError={function(e){ var t=e.currentTarget as HTMLImageElement; t.style.display='none'; var fb=t.nextElementSibling as HTMLElement; if(fb) fb.style.display='flex'; }} />
                      <div style={{display:'none', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'8px', color:'#94a3b8'}}>
                        <div style={{width:'44px', height:'44px', borderRadius:'10px', background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px'}}>◧</div>
                        <div style={{fontSize:'11px', fontWeight:700}}>{p.brand}</div>
                      </div>
                    </>
                  ) : (
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'8px', color:'#94a3b8'}}>
                      <div style={{width:'48px', height:'48px', borderRadius:'12px', background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px'}}>⬡</div>
                      <div style={{fontSize:'11px', fontWeight:700, letterSpacing:'.5px'}}>{p.brand}</div>
                    </div>
                  )}
                  <div style={{position:'absolute', top:'10px', left:'10px', display:'flex', gap:'6px'}}>
                    <span style={{fontSize:'10px', fontWeight:800, letterSpacing:'.4px', padding:'5px 8px', borderRadius:'999px', background:'#0f172a', color:'#fff'}}>{p.brand}</span>
                  </div>
                  <div style={{position:'absolute', top:'10px', right:'10px'}}>
                    <span style={{fontSize:'10px', fontWeight:700, padding:'5px 8px', borderRadius:'999px', background:'#ffffff', border:'1px solid #e2e8f0', color:'#334155'}}>{p.moq}</span>
                  </div>
                </div>
                <div style={{padding:'14px 14px 12px', display:'flex', flexDirection:'column', flex:1, gap:'8px'}}>
                  <div style={{fontSize:'11px', fontWeight:700, color:p.color, letterSpacing:'.3px', textTransform:'uppercase'}}>{p.cat}</div>
                  <div style={{fontSize:'15px', fontWeight:800, color:'#0f172a', lineHeight:1.2, letterSpacing:'-0.2px'}}>{p.name}</div>
                  <div style={{fontSize:'12.5px', color:'#475569', lineHeight:1.4}}>{p.desc}</div>
                  <div style={{background:'#f1f5f9', border:'1px dashed #cbd5e1', borderRadius:'9px', padding:'8px 10px', fontSize:'11px', color:'#475569', fontWeight:600, marginTop:'4px'}}>DDP Lagos • Customs & Duty Included • Invoice + COA</div>
                  <button onClick={function(){ handleRFQ(p) }} style={{marginTop:'auto', width:'100%', background:'#0f172a', color:'#fff', border:'none', borderRadius:'10px', padding:'11px 12px', fontSize:'13px', fontWeight:800, cursor:'pointer', letterSpacing:'.2px'}}>Request for Quote – DDP Lagos</button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <footer style={{borderTop:'1px solid #e2e8f0', background:'#ffffff', marginTop:'28px'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'22px 20px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'12px'}}>
          <div style={{fontSize:'12px', color:'#64748b', fontWeight:600}}>© {new Date().getFullYear()} NiChAm Trade – DDP Lagos. Solar Batteries & Industrial Chemical.</div>
          <div style={{fontSize:'11px', color:'#94a3b8', fontWeight:600}}>Built for WhatsApp RFQ • No phone display • Clean catalog</div>
        </div>
      </footer>
    </div>
  )
}
