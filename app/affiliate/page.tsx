'use client'
import { useState, useEffect } from 'react'

export default function AffiliatePage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [earnings, setEarnings] = useState(0)
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    const c = localStorage.getItem('nicham_aff_code')
    const n = localStorage.getItem('nicham_aff_name')
    const p = localStorage.getItem('nicham_aff_phone')
    const e = localStorage.getItem('nicham_aff_earnings')
    const cl = localStorage.getItem('nicham_aff_clicks')
    if (c) setCode(c)
    if (n) setName(n)
    if (p) setPhone(p)
    if (e) setEarnings(parseInt(e))
    if (cl) setClicks(parseInt(cl))
  }, [])

  const generateCode = () => {
    if (!name || !phone) { alert('Enter name and phone'); return }
    const newCode = 'NICHAM-' + name.substring(0,3).toUpperCase() + '-' + phone.slice(-4) + '-' + Date.now().toString().slice(-3)
    setCode(newCode)
    localStorage.setItem('nicham_aff_code', newCode)
    localStorage.setItem('nicham_aff_name', name)
    localStorage.setItem('nicham_aff_phone', phone)
    localStorage.setItem('nicham_aff_earnings', '0')
    localStorage.setItem('nicham_aff_clicks', '0')
    const all = JSON.parse(localStorage.getItem('nicham_all_affiliates') || '[]')
    all.unshift({ name, phone, code: newCode, date: new Date().toLocaleString(), earnings: 0 })
    localStorage.setItem('nicham_all_affiliates', JSON.stringify(all))
  }

  const copyLink = (type: string) => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://nicham.com'
    const link = `${base}/?ref=${code}&utm_source=${type}`
    navigator.clipboard.writeText(link)
    alert('Copied referral link: ' + link + '\nShare on WhatsApp, Facebook, Marketing App. You earn 10% commission.')
    const cl = clicks + 1
    setClicks(cl)
    localStorage.setItem('nicham_aff_clicks', cl.toString())
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <a href="/" className="text-sm font-bold flex items-center gap-2 mb-4"><img src="/logo.png" className="w-8 h-8 rounded-full" /> NiChAm Solar Market</a>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-12 h-12 rounded-full" />
          <div><h1 className="text-xl font-black">Affiliate Marketers / Referrals - Opportunity Finder</h1><div className="text-xs text-gray-600">Onboard affiliate marketers immediately - Zero budget - Earn 10% per sale</div></div>
        </div>

        <div className="mt-4 bg-black text-white rounded-xl p-4">
          <div className="font-bold text-sm text-yellow-300">Opportunity Finder Activated - Affiliate Products You Can Market TODAY</div>
          <div className="text-[11px] mt-1 text-gray-300">While waiting for AfricanIES response, start earning with fast-moving solar productive-use machines via Jumia/Konga Affiliate (9-13% commission)</div>
        </div>

        {!code ? (
          <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
            <div className="font-bold text-sm">Join as Affiliate Marketer - Free</div>
            <div className="text-[11px] text-gray-600 mt-1">Enter name and phone, get referral code NICHAM-XXX. Share link. When someone buys via your link, you earn 10% + Green Points.</div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name e.g. Emeka" className="px-3 py-2 rounded-full border text-xs" />
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone e.g. 0803..." className="px-3 py-2 rounded-full border text-xs" />
            </div>
            <button onClick={generateCode} className="mt-3 w-full py-2.5 bg-green-600 text-white rounded-full font-black text-sm">Generate My Affiliate Code & Start Earning</button>
          </div>
        ) : (
          <div className="mt-4 bg-green-50 border-2 border-green-400 rounded-xl p-4">
            <div className="font-black text-sm text-green-800">You are an Affiliate! Code: {code}</div>
            <div className="text-[11px] mt-1">Name: {name} | Phone: {phone} | Earnings: N{earnings.toLocaleString()} | Clicks: {clicks}</div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button onClick={()=>copyLink('whatsapp')} className="py-2 bg-green-600 text-white rounded-full text-xs font-bold">Copy WhatsApp Link</button>
              <button onClick={()=>copyLink('facebook')} className="py-2 bg-blue-600 text-white rounded-full text-xs font-bold">Copy Facebook Link</button>
              <button onClick={()=>copyLink('marketing_app')} className="py-2 bg-black text-white rounded-full text-xs font-bold">Copy Marketing App Link</button>
              <button onClick={()=>{localStorage.removeItem('nicham_aff_code'); setCode('');}} className="py-2 bg-gray-200 rounded-full text-xs font-bold">Reset</button>
            </div>
            <div className="text-[10px] mt-2 text-gray-600">Link: /?ref={code} - Anyone who clicks and buys within 30 days, you get 10%.</div>
          </div>
        )}

        <div className="mt-6">
          <div className="font-black text-sm">Immediate Affiliate Products You Can Market TODAY</div>
          <div className="text-[11px] text-gray-600 mt-1">Join JForce free: jforce.jumia.com.ng - Get Jumia affiliate link, paste into NiChAm, earn double.</div>
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            {[
              { name: "Grain Grinder / Solar Grinder", price: "15k-120k", comm: "9-12% = N1.3k-14k", where: "Jumia: Stainless Steel Electric Grain Mill", fast: "Market women daily" },
              { name: "Maize Sheller / Corn Sheller", price: "85k-250k", comm: "10% = N8.5k-25k", where: "Afrimash + Jumia", fast: "Farmers season" },
              { name: "Oil Press Machine", price: "180k-450k", comm: "10-13% = N18k-58k", where: "Jumia Oil Press Machine", fast: "Groundnut season" },
              { name: "Solar Incubator 500 Eggs", price: "120k-500k", comm: "12% = N14k-60k", where: "Jumia Egg Incubator", fast: "Poultry farmers" },
              { name: "Rechargeable Clippers, Hair Dryer", price: "8k-85k", comm: "9% = N720-7.6k", where: "Jumia Clippers", fast: "Barbers weekly" },
              { name: "Sewing + Embroidery Machine", price: "150k-350k", comm: "10% = N15k-35k", where: "Jumia Sewing Machine", fast: "Tailors wedding season" },
              { name: "Solar Blender, Cooker", price: "25k-80k", comm: "9% = N2.2k-7.2k", where: "Jumia Solar Blender", fast: "Homes no NEPA" },
              { name: "Solar Pest Repellant", price: "15k-95k", comm: "11% = N1.6k-10k", where: "Jumia Pest Repeller", fast: "Farms now" },
            ].map((p,i)=>(
              <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-3">
                <div className="font-bold text-xs">{p.name}</div>
                <div className="text-[10px] mt-1"><b>Price:</b> {p.price} | <b>Comm:</b> {p.comm}</div>
                <div className="text-[10px] text-gray-600 mt-1"><b>Where:</b> {p.where}</div>
                <div className="text-[9px] mt-1 bg-yellow-50 p-1 rounded"><b>Why fast:</b> {p.fast}</div>
                <div className="mt-2 flex gap-1"><span className="text-[8px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Affiliate Ready Today</span><span className="text-[8px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Jumia 9-13%</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-black text-white rounded-xl p-4">
          <div className="font-black text-xs text-yellow-300">How Affiliate / Referral Works (Zero Budget):</div>
          <div className="text-[11px] mt-2 leading-relaxed text-gray-300">
            1. Join as Affiliate - Free code NICHAM-XXX<br/>
            2. Join Jumia JForce free - jforce.jumia.com.ng<br/>
            3. Get Jumia link for grinder, sheller etc<br/>
            4. Add Jumia link to NiChAm product (admin)<br/>
            5. Share your NiChAm ref link on WhatsApp, Marketing App<br/>
            6. Customer buys via your link - Jumia pays 9-13% + NiChAm Green Points<br/>
            7. When AfricanIES responds, earn on heavy items too - dual income
          </div>
        </div>
      </div>
    </main>
  )
}
