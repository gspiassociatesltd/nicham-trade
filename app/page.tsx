import p from '../lib/products.json'
export default function Page(){
 const all=[...(p as any).motoma, ...(p as any).must]
 return <div style={{fontFamily:'system-ui',padding:16}}>
  <h1 style={{fontWeight:900}}>NiChAm Trade –  Powering Nigeria </h1>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginTop:16}}>
   {all.map((x:any,i:number)=><div key={i} style={{border:'1px solid #ddd',borderRadius:16,padding:12,background:'white'}}>
    <b style={{fontSize:11}}>{x.badge}</b> <span style={{fontSize:10,background:'#dcfce7',padding:'2px 6px',borderRadius:99}}>MOQ {x.moq}</span>
    <h3 style={{fontSize:12,margin:'8px 0 0 0'}}>{x.model}</h3>
    <p style={{fontSize:11,color:'#555'}}>{x.spec}</p>
    {x.usd && <p style={{fontSize:11,background:'#f8fafc',padding:6,borderRadius:8,marginTop:6}}><b>{x.usd}</b></p>}
   </div>)}
  </div>
  <p style={{fontSize:11,marginTop:24}}>Payment: MoMo → Flutterwave Escrow + Afriex Diaspora Zero Fee + Alibaba Deep Link 15 days cookie – DDP Example LP16-48200: $1087 + $120 freight + $180 Nigeria + $50 last-mile + 3% platform = ~₦2,057,454/unit</p>
 </div>
}
