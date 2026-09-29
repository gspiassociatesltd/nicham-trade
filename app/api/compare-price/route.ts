import { NextRequest, NextResponse } from 'next/server'
import { compareMarketPrice, calcLandedWithTier, getPlatformFeeRate } from '@/lib/priceComparator'

// POST /api/compare-price - AI Assistant per Master Build Doc Rule 13F
// Body: { product_title, base_price_ngn, weightKg, isNewInvention, selfClear }
export async function POST(req: NextRequest){
  try{
    const { product_title, base_price_ngn, weightKg = 10, isNewInvention = false, selfClear = false } = await req.json()
    
    if(!product_title || !base_price_ngn) {
      return NextResponse.json({ error: 'product_title and base_price_ngn required' }, { status: 400 })
    }

    // Tiered fee: 10% standard, 8% >2M, 12% new invention
    const calc = calcLandedWithTier(Number(base_price_ngn), weightKg, isNewInvention, selfClear)
    
    // AI compares vs Jumia/Kara/Konga/Fouani
    const comparison = await compareMarketPrice(product_title, calc.landed)
    comparison.your_base_ngn = calc.baseNGN
    comparison.your_fee_rate = calc.feeRate
    comparison.your_fee_ngn = calc.platformFee
    comparison.your_landed_ngn = calc.landed

    // Auto-decision: should admin forward?
    const autoApprove = comparison.verdict === 'COMPETITIVE' || comparison.verdict === 'GOOD'

    return NextResponse.json({
      success: true,
      ...comparison,
      tiered_fee: {
        rate: calc.feeRate,
        amount: calc.platformFee,
        isNewInvention: calc.isNewInvention,
        selfClear: calc.selfClear,
        rule: isNewInvention ? '12% new invention' : (base_price_ngn > 2000000 ? '8% >₦2M tier' : '10% standard - Boss rule')
      },
      action: {
        auto_approve_recommended: autoApprove,
        needs_admin_approval: true, // Per Master Doc, always seeks admin approval before sending
        next_step: autoApprove ? 'Admin can Approve & Forward via WhatsApp' : 'Admin should review fee or freight before forwarding'
      }
    })
  } catch(e: any){
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// GET for testing: /api/compare-price?title=3KVA Hybrid Inverter&base=280000
export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || '3KVA Hybrid Inverter'
  const base = Number(searchParams.get('base') || '280000')
  const calc = calcLandedWithTier(base, 10, false, false)
  const comparison = await compareMarketPrice(title, calc.landed)
  comparison.your_base_ngn = calc.baseNGN
  comparison.your_fee_ngn = calc.platformFee
  comparison.your_fee_rate = calc.feeRate
  return NextResponse.json({ ...comparison, tiered: calc })
}
