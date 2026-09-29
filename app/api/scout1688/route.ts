import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/scout1688 - Accepts { keyword, url1688, weightKg }
export async function POST(req: NextRequest){
  try{
    const { keyword, url1688, weightKg = 10, targetCategory = 'solar' } = await req.json()
    
    if(!keyword && !url1688) return NextResponse.json({ error: 'keyword or url1688 required' }, { status: 400 })

    // For MVP, if url1688 provided, scrape it - here we simulate with parsing
    // Real implementation: fetch m-search.1688.com?q=keyword -> parse JSON
    // Using public endpoint: https://m-search.1688.com/search?keyword=xxx

    let productData: any = {}
    if(url1688){
      // TODO: real scraping with fetch + cheerio in production
      // For now create draft from URL
      const id = url1688.match(/offer\/(\d+)/)?.[1] || Date.now().toString()
      productData = {
        title: `1688 Import - ${keyword || id}`,
        base_rmb: 500,
        image: '',
        supplier: '1688 Supplier',
        moq: 1,
        detail_url: url1688
      }
    } else {
      // Keyword search - create draft scouting request
      productData = {
        title: keyword,
        base_rmb: 500,
        image: '',
        supplier: 'Search Result',
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
    const platformFee = Math.round(totalCost * 0.10) // 10% Boss rule
    const landed = totalCost + platformFee

    // Create draft scouting request - status = scouting, needs admin approval
    const { data, error } = await supabase.from('scout_requests').insert({
      request_code: `SR-${Date.now().toString().slice(-6)}`,
      title: productData.title,
      description: `Auto-scouted from 1688: ${productData.detail_url}\nSupplier: ${productData.supplier}\nMOQ: ${productData.moq}\nBase RMB: ${productData.base_rmb} => NGN ${baseNGN}\nFreight: ${FREIGHT}\nDuty: ${duty}\nPlatform Fee 10%: ${platformFee}\nLanded: ${landed}\nNeeds admin approval before sending to customer.`,
      target_landed_price_ngn: landed,
      status: 'scouting',
      valid_until: new Date(Date.now() + 3*24*60*60*1000).toISOString(), // 3 days valid
      waitlist_count: 0
    }).select().single()

    if(error) throw error

    return NextResponse.json({ 
      success: true, 
      message: 'Draft created - needs admin approval',
      draft: data,
      breakdown: { baseNGN, freight: FREIGHT, duty, totalCost, platformFee, landed, valid3Days: true }
    })
  } catch(e: any){
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
