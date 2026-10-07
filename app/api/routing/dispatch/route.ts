import { NextResponse } from 'next/server'

// NiChAm Routing Dispatch – Sends URL to 3 verifiers: AfricanIES, Proc360, Laybel
// User has accounts – They accept URL and do verification and sourcing
// Parallel dispatch, normalization to total landed cost, 4 layers

export async function POST(req: Request) {
  try {
    const { productUrl, productName, sourceCompany, sourcePlatform, quantity, location, moq, user } = await req.json()
    
    if (!productUrl) return NextResponse.json({ error: 'Product URL required – Send URL of intended purchase' }, { status: 400 })
    
    const userInfo = user || {}
    const qtyNum = parseFloat(quantity) || 1
    const baseGoodsCost = Math.random() * 500 + 100 // Mock goods cost in USD for demo – In production, fetched from supplier via 1688/Alibaba API
    
    // Simulate 3 quotes – In production, call real APIs:
    // AfricanIES: via WhatsApp/email – https://www.africanies.com – Request quote form – Nduka Udeh team verifies supplier business, factory, license
    // Proc360: via Link Order – 7% service fee – paste product link – https://proc360.app – $15 inspection vs $125 Alibaba
    // Laybel: via direct contact – Transport & Logistics – Sea/Inland Dry Ports Expert
    
    const africanIESQuote = {
      provider: 'AfricanIES',
      providerFull: 'African Import Export Solutions – Nduka Udeh – China warehouse + Nigeria delivery',
      goodsCost: baseGoodsCost * 0.98, // Slightly cheaper – China warehouse, consolidation
      serviceFeePercent: 5, // Estimated – AfricanIES does not publish % – Industry 5-10%
      serviceFee: baseGoodsCost * 0.05,
      verificationCost: 0, // Included – Supplier verification, sample verification, photo/video verification
      inspectionCost: 10, // Photo & video verification before shipping
      freight: location === 'Lagos' ? 15 * qtyNum : 10.5 * qtyNum, // $15/kg Lagos, $10.5/kg Kano per AfricanIES offer
      clearance: baseGoodsCost * 0.08,
      insurance: baseGoodsCost * 0.01,
      totalLanded: 0,
      ddpToPremises: '',
      sourceUrl: productUrl,
      sourceCompany,
      notes: 'We verify supplier business, factory, license, reputation before you pay – Multiple store pickup – Free 14 days storage – Photo & video verification',
      verificationIncluded: ['Supplier verification', 'Sample verification', 'Pre-shipment verification', 'Company visit', 'Naira to RMB payment'],
      isVerified: true
    }
    africanIESQuote.totalLanded = africanIESQuote.goodsCost + africanIESQuote.serviceFee + africanIESQuote.verificationCost + africanIESQuote.inspectionCost + africanIESQuote.freight + africanIESQuote.clearance + africanIESQuote.insurance
    africanIESQuote.ddpToPremises = `$${africanIESQuote.totalLanded.toFixed(2)} DDP to ${location} premises – Valid 3 Days`

    const proc360Quote = {
      provider: 'Proc360',
      providerFull: 'Proc360 by Checkit – Fara Popoola – 1200+ vetted suppliers – 1688/Alibaba/Pinduoduo',
      goodsCost: baseGoodsCost, // Base
      serviceFeePercent: 7, // Link Order 7% – Picture 9% – Custom 11-12%
      serviceFee: baseGoodsCost * 0.07,
      verificationCost: 0, // Included – Verified sourcing
      inspectionCost: 15, // $15 inspection vs $125 Alibaba
      freight: location === 'Lagos' ? 10 * qtyNum : 8 * qtyNum, // $7-10/kg air, $300-400/CBM sea
      clearance: baseGoodsCost * 0.06,
      insurance: baseGoodsCost * 0.015,
      totalLanded: 0,
      ddpToPremises: '',
      sourceUrl: productUrl,
      sourceCompany,
      notes: 'Verified sourcing – Users can source directly from suppliers on 1688, Alibaba and Pinduoduo – Buy For Me handles quality inspections, shipment insurance and refund policies – Verification completed while goods still in China',
      verificationIncluded: ['Verified sourcing 1200+ suppliers', 'Quality inspection $15', 'Shipment insurance', 'Refund policy', 'RMB wallet Paystack/MoMo', 'Free 30 days storage'],
      isVerified: true
    }
    proc360Quote.totalLanded = proc360Quote.goodsCost + proc360Quote.serviceFee + proc360Quote.verificationCost + proc360Quote.inspectionCost + proc360Quote.freight + proc360Quote.clearance + proc360Quote.insurance
    proc360Quote.ddpToPremises = `$${proc360Quote.totalLanded.toFixed(2)} DDP to ${location} premises – Valid 3 Days`

    const laybelQuote = {
      provider: 'Laybel Global Solution',
      providerFull: 'Laybel Global Solutions – Usman Umar – Maritime Transport & Logistics – Sea/Inland Dry Ports Expert',
      goodsCost: baseGoodsCost * 1.02, // Slightly higher – Focus on logistics
      serviceFeePercent: 6, // Estimated – Transport & Logistics specialist
      serviceFee: baseGoodsCost * 0.06,
      verificationCost: 5,
      inspectionCost: 12,
      freight: location === 'Kano' || location === 'Kaduna' ? 8 * qtyNum : 12 * qtyNum, // Strong in northern corridor
      clearance: baseGoodsCost * 0.07,
      insurance: baseGoodsCost * 0.012,
      totalLanded: 0,
      ddpToPremises: '',
      sourceUrl: productUrl,
      sourceCompany,
      notes: 'Maritime Transport & Logistics Management – Sea/Inland Dry Ports Expert – Northern Nigeria delivery – Kano, Kaduna',
      verificationIncluded: ['Transport & Logistics verification', 'Inland dry port expertise', 'Northern corridor delivery'],
      isVerified: true
    }
    laybelQuote.totalLanded = laybelQuote.goodsCost + laybelQuote.serviceFee + laybelQuote.verificationCost + laybelQuote.inspectionCost + laybelQuote.freight + laybelQuote.clearance + laybelQuote.insurance
    laybelQuote.ddpToPremises = `$${laybelQuote.totalLanded.toFixed(2)} DDP to ${location} premises – Valid 3 Days`

    const quotes = [africanIESQuote, proc360Quote, laybelQuote]
    
    // Step A: Choose cheapest among 3 – AI first chooses cheapest of all 3 before comparing to similar platforms
    const cheapestOf3 = quotes.reduce((prev, curr) => prev.totalLanded < curr.totalLanded ? prev : curr)
    
    // Step B: Compare to direct platforms (1688 domestic 15-40% less than Alibaba)
    const direct1688Cost = baseGoodsCost * 0.75 // 1688 is 15-40% less – Domestic trade site
    const directAlibabaCost = baseGoodsCost * 1.05 // Alibaba includes export overhead
    const directComparison = {
      '1688_direct': { cost: direct1688Cost, risk: 'Unverified – No inspection – No insurance – Supplier not vetted', isVerified: false },
      'Alibaba_direct': { cost: directAlibabaCost, risk: 'Alibaba standard inspection $125 – No China ground verification', isVerified: false },
      'Cheapest_verified_of_3': { cost: cheapestOf3.totalLanded, provider: cheapestOf3.provider, isVerified: true }
    }

    // Platform fee – Added AFTER cheapest selection – Transparent zero-markup model
    // Factory prices passed directly, services billed separately as clear fixed fee
    const platformFeePercent = productName?.toLowerCase().includes('chemical') || productName?.toLowerCase().includes('paracetamol') ? 5 : productName?.toLowerCase().includes('solar') ? 3 : 3.5
    const platformFee = cheapestOf3.totalLanded * (platformFeePercent / 100)
    const finalDDP = cheapestOf3.totalLanded + platformFee

    const routingResult = {
      id: Date.now().toString(),
      productUrl,
      productName,
      sourceCompany,
      sourcePlatform,
      quantity,
      location,
      moq,
      buyer: userInfo,
      quotes,
      cheapestOf3,
      directComparison,
      platformFee: {
        percent: platformFeePercent,
        amount: platformFee,
        note: 'NiChAm Trade Service Fee – Added AFTER cheapest selection – For AI routing, verification comparison, escrow via Paystack test api, MoMo linking, 3-day validity lock – Transparent zero-markup model – Factory prices passed directly',
        whenAdded: 'After cheapest of 3 selected, before external comparison – Best practice – Preserves true cheapest, prevents distortion'
      },
      finalDDP: {
        amount: finalDDP,
        ddpString: `$${finalDDP.toFixed(2)} DDP to ${location} premises – Valid 3 Days – Only DDP – No FOB`,
        validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        breakdown: {
          cheapestVerifiedCost: cheapestOf3.totalLanded,
          platformFee: platformFee,
          total: finalDDP
        }
      },
      createdAt: new Date().toISOString(),
      status: 'routed – cheapest selected – awaiting buyer approval'
    }

    // Save to global
    const globalRouting = (global as any).nichamRouting || []
    globalRouting.push(routingResult)
    ;(global as any).nichamRouting = globalRouting

    // Also save to quotes for admin dashboard compatibility
    const globalQuotes = (global as any).nichamQuotes || []
    globalQuotes.push({
      id: routingResult.id,
      productId: productName,
      productModel: productName,
      productName: `${productName} – ${quantity} – ${location}`,
      sourceCompany: `${sourceCompany} – Cheapest: ${cheapestOf3.provider} – Platform fee ${platformFeePercent}% after selection`,
      sourceUrl: productUrl,
      sourcePlatform: `${sourcePlatform} – Routed via 3 verifiers – Cheapest: ${cheapestOf3.provider} – $${cheapestOf3.totalLanded.toFixed(2)} + $${platformFee.toFixed(2)} fee = $${finalDDP.toFixed(2)} DDP`,
      quantity,
      location,
      moq,
      user: userInfo,
      email: userInfo.email,
      name: userInfo.name,
      phone: userInfo.phone,
      momoNumber: userInfo.momoNumber,
      status: 'routed – cheapest selected',
      createdAt: routingResult.createdAt,
      validUntil: routingResult.finalDDP.validUntil,
      routing: routingResult
    })
    ;(global as any).nichamQuotes = globalQuotes

    return NextResponse.json({ success: true, routing: routingResult, message: `Routed to 3 companies – Cheapest: ${cheapestOf3.provider} at $${cheapestOf3.totalLanded.toFixed(2)} – Platform fee ${platformFeePercent}% added after selection – Final DDP $${finalDDP.toFixed(2)} – Valid 3 Days` })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  const routing = (global as any).nichamRouting || []
  return NextResponse.json({ routing, total: routing.length })
}
