
import must from '../lib/mustProducts.json'
export default function Page(){
  return (
    <div style={{fontFamily:'Inter,system-ui', maxWidth:'1200px', margin:'0 auto', padding:'16px'}}>
      <h1 style={{fontWeight:900, fontSize:'22px'}}>NiChAm Trade – MUST Power – 14 Models – Powering Nigeria</h1>
      <p style={{fontSize:'12px', color:'#555'}}>DDP to Your Premises • Only EU/US Standards IEC 62619 UL1973 CE UN38.3 • Valid 3 Days • Mix MOQ Policy: Mix different models to unlock tier pricing</p>
      <p style={{fontSize:'11px', marginTop:'8px', background:'#eff6ff', padding:'8px', borderRadius:'8px'}}>Source: MUSTNG.pdf + www.mustpower.com | MUST Factory: 20 years, 1500 staff, 80k units/month, 100k m² base | Case Studies: PV19 EXP+LP16, 120kW/240kWh Hybrid Storage, PH11+HV29 C&I ESS | ESP 10-20kW/40-51kWh, ESG 30-60kW/61-115kWh, ESG-E 125kW/261kWh Liquid-Cooled</p>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'16px'}}>
        {(must as any[]).map((p:any,i:number)=>(
          <div key={i} style={{border:'1px solid #e2e8f0', borderRadius:'16px', padding:'12px', background:'white'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><span style={{background:'#2563eb', color:'white', fontSize:'10px', padding:'2px 8px', borderRadius:'999px', fontWeight:700}}>MUST {p.model}</span><span style={{fontSize:'10px', background:'#f1f5f9', padding:'2px 8px', borderRadius:'999px'}}>{p.cat}</span></div>
            <h3 style={{fontWeight:700, fontSize:'13px', marginTop:'8px'}}>{p.model}</h3>
            <p style={{fontSize:'11px', color:'#475569'}}>{p.spec}</p>
            <div style={{fontSize:'11px', marginTop:'8px', background:'#f8fafc', padding:'8px', borderRadius:'8px'}}>
              <p><b>USD:</b> {p.usd} | <b>NGN:</b> {p.ngn}</p>
              <p><b>MOQ:</b> {p.moq}</p>
            </div>
            <button style={{width:'100%', background:'#2563eb', color:'white', padding:'8px', borderRadius:'12px', marginTop:'8px', fontSize:'12px', fontWeight:700}}>Quote DDP Lagos → Routes to 3 Companies</button>
          </div>
        ))}
      </div>
      <div style={{marginTop:'24px', background:'#0f172a', color:'white', padding:'16px', borderRadius:'16px', fontSize:'12px'}}>
        <p style={{fontWeight:900}}>NiChAm Trade – Payment: MoMo → Flutterwave Escrow (1.4% fee, holds until delivery) + Afriex Diaspora (Zero fee, instant USD→NGN to MoMo) + Alibaba Affiliate Deep Link (15 days cookie)</p>
        <p style={{marginTop:'8px'}}>DDP Example LP16-48200 10.24KWH: Factory $1,087 (20 units) = ₦1,521,800 + Freight $120 = ₦168k + Nigeria-side + Customs $180 = ₦252k + Last-mile $50 = ₦70k + Platform 3% $32.6 = ₦45,654 = DDP ~₦2,057,454/unit – Valid 3 Days</p>
      </div>
    </div>
  )
}
