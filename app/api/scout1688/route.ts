import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Enhanced POST /api/scout1688 - handles chemical search engine + solar
export async function POST(req: NextRequest){
  try{
    const { keyword, url1688, weightKg = 25, source = 'homepage', targetCategory = 'chemical', customer_phone = '' } = await req.json()
    
    if(!keyword && !url1688) return NextResponse.json({ error: 'keyword or url1688 required' }, { status: 400 })

    let productData: any = {}
    if(url1688){
      const id = url1688.match(/offer\/(\d+)/)?.[1] || Date.now().toString()
      productData = { title: `1688 Import - ${keyword || id}`, base_rmb: 500, supplier: '1688 Supplier', moq: 1, detail_url: url1688 }
    } else {
      productData = { 
        title: keyword, 
        base_rmb: keyword.toLowerCase().includes('caustic') ? 180 : keyword.toLowerCase().includes('paracetamol') ? 800 : 500,
        supplier: '1688 Search Result', 
        moq: 1, 
        detail_url: `https://m-search.1688.com/search?keyword=${encodeURIComponent(keyword)}` 
      }
    }

    const RMB_TO_NGN = 240
    const FREIGHT = weightKg * 3500
    const baseNGN = productData.base_rmb * RMB_TO_NGN
    const cif = baseNGN + FREIGHT
    const duty = cif * 0.20
    const totalCost = cif + duty
    const platformFee = Math.round(totalCost * 0.10)
    const landed = totalCost + platformFee

    // Create scouting request
    const { data, error } = await supabase.from('scout_requests').insert({
      request_code: `SR-${Date.now().toString().slice(-6)}`,
      title: productData.title,
      description: `Source: ${source}\nCategory: ${targetCategory}\nChemical Search: ${keyword}\n1688 URL: ${productData.detail_url}\nSupplier: ${productData.supplier}\nBase RMB: ${productData.base_rmb} => NGN ${baseNGN}\nFreight ${weightKg}kg: ${FREIGHT}\nDuty 20%: ${duty}\nPlatform Fee 10%: ${platformFee}\nLanded NGN: ${landed}\nCustomer Phone: ${customer_phone || 'Not provided - need waitlist'}\nNeeds admin verification before WhatsApp quote. Valid 3 Days.`,
      target_landed_price_ngn: landed,
      status: 'scouting',
      valid_until: new Date(Date.now() + 3*24*60*60*1000).toISOString(),
      waitlist_count: 0
    }).select().single()

    if(error) throw error

    // If chemical and phone provided, also create waitlist
    if(customer_phone && targetCategory==='chemical'){
      await supabase.from('waitlists').insert({
        scout_request_id: data.id,
        customer_name: 'Chemical Search User',
        phone: customer_phone,
        location: 'From Search',
      })
    }

    // Log WhatsApp for admin
    const adminMsg = `🧪 NEW Chemical Scout: ${keyword}\nCode: ${data.request_code}\nLanded est: NGN ${landed.toLocaleString()} (Valid 3 Days)\nSource: ${source}\nPhone: ${customer_phone||'No phone - check admin'}\nVerify in /admin/chemicals`
    await supabase.from('whatsapp_logs').insert({
      quote_id: data.id,
      phone: '2347050477950',
      message: adminMsg,
      wa_url: `https://wa.me/2347050477950?text=${encodeURIComponent(adminMsg)}`
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Chemical draft created - admin verifies & WhatsApp quote in 24h - Valid 3 Days',
      sr_id: data.request_code,
      draft: data,
      breakdown: { baseNGN, freight: FREIGHT, duty, totalCost, platformFee, landed, valid3Days: true }
    })
  } catch(e: any){
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
