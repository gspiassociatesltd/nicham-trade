import { NextResponse } from 'next/server'

// NiChAm Routing Compare – AI chooses cheapest of 3 before comparing to similar platforms
// Platform fee added AFTER cheapest selection – Transparent zero-markup model

export async function POST(req: Request) {
  try {
    const { routingId } = await req.json()
    
    const globalRouting = (global as any).nichamRouting || []
    const routing = routingId ? globalRouting.find((r: any) => r.id === routingId) : globalRouting[globalRouting.length - 1]
    
    if (!routing) return NextResponse.json({ error: 'No routing found – Dispatch first via /api/routing/dispatch' }, { status: 404 })

    const { quotes, cheapestOf3, directComparison, platformFee, finalDDP, productName, location } = routing

    // Detailed comparison – AI logic
    const comparisonTable = quotes.map((q: any) => ({
      provider: q.provider,
      goodsCost: q.goodsCost,
      serviceFee: `${q.serviceFeePercent}% ($${q.serviceFee.toFixed(2)})`,
      inspection: `$${q.inspectionCost}`,
      freight: `$${q.freight.toFixed(2)}`,
      clearance: `$${q.clearance.toFixed(2)}`,
      insurance: `$${q.insurance.toFixed(2)}`,
      totalLanded: `$${q.totalLanded.toFixed(2)}`,
      isCheapest: q.provider === cheapestOf3.provider,
      isVerified: q.isVerified,
      notes: q.notes
    }))

    // External comparison – Cheapest of 3 vs direct platforms
    const externalComparison = {
      'Cheapest_verified_of_3': {
        provider: cheapestOf3.provider,
        cost: cheapestOf3.totalLanded,
        ddp: cheapestOf3.ddpToPremises,
        verified: true,
        risk: 'Low – Supplier verified, inspection included, insurance, Naira to RMB payment, photo/video verification',
        recommendation: 'Recommended – Verified cheapest among 3 trusted verifiers'
      },
      '1688_direct': {
        cost: directComparison['1688_direct'].cost,
        risk: directComparison['1688_direct'].risk,
        verified: false,
        recommendation: directComparison['1688_direct'].cost < cheapestOf3.totalLanded ? `Cheaper by $${(cheapestOf3.totalLanded - directComparison['1688_direct'].cost).toFixed(2)} (${(((cheapestOf3.totalLanded - directComparison['1688_direct'].cost)/cheapestOf3.totalLanded)*100).toFixed(1)}%) but UNVERIFIED – No $15 inspection – No China ground team – Risk of wrong specs, fraud` : 'More expensive than verified cheapest',
        savingsVsCheapest: cheapestOf3.totalLanded - directComparison['1688_direct'].cost
      },
      'Alibaba_direct': {
        cost: directComparison['Alibaba_direct'].cost,
        risk: directComparison['Alibaba_direct'].risk,
        verified: false,
        recommendation: 'Standard Alibaba inspection $125 vs Proc360 $15 – No multi-store pickup – No Nigeria inland delivery'
      }
    }

    // Platform fee placement analysis
    const feePlacementAnalysis = {
      'Before_cheapest_selection': {
        effect: 'Distorts comparison – Hides true cheapest – Violates zero-markup transparency – Example: $100 goods + 10% fee = $110 appears more expensive than $105 unverified',
        recommended: false
      },
      'After_cheapest_of_3_selected_before_external': {
        effect: 'BEST – Preserves true cheapest among 3 on equal footing – Then compares to external platforms – Platform fee added as separate transparent line – Factory prices passed directly',
        recommended: true,
        implementation: `Cheapest ${cheapestOf3.provider} at $${cheapestOf3.totalLanded.toFixed(2)} + NiChAm fee ${platformFee.percent}% ($${platformFee.amount.toFixed(2)}) = Final DDP $${finalDDP.amount.toFixed(2)}`,
        breakdown: `Goods $${cheapestOf3.goodsCost.toFixed(2)} + Service ${cheapestOf3.serviceFeePercent}% ($${cheapestOf3.serviceFee.toFixed(2)}) + Inspection $${cheapestOf3.inspectionCost} + Freight $${cheapestOf3.freight.toFixed(2)} + Clearance $${cheapestOf3.clearance.toFixed(2)} + Insurance $${cheapestOf3.insurance.toFixed(2)} = $${cheapestOf3.totalLanded.toFixed(2)} + Platform ${platformFee.percent}% ($${platformFee.amount.toFixed(2)}) = $${finalDDP.amount.toFixed(2)} DDP to ${location} – Valid 3 Days`
      },
      'After_external_comparison_at_final_DDP': {
        effect: 'Also valid but fee appears late – May surprise buyer – Less transparent',
        recommended: false
      }
    }

    // AI decision
    const aiDecision = {
      cheapestOf3: cheapestOf3.provider,
      cheapestCost: cheapestOf3.totalLanded,
      finalDDP: finalDDP.amount,
      platformFeeAdded: platformFee,
      validUntil: finalDDP.validUntil,
      recommendation: `AI selected ${cheapestOf3.provider} as cheapest among 3 verified providers at $${cheapestOf3.totalLanded.toFixed(2)} DDP to ${location}. Platform fee ${platformFee.percent}% ($${platformFee.amount.toFixed(2)}) added AFTER cheapest selection as transparent service fee. Final DDP $${finalDDP.amount.toFixed(2)} Valid 3 Days Only DDP. ${externalComparison['1688_direct'].savingsVsCheapest > 0 ? `1688 direct cheaper by $${externalComparison['1688_direct'].savingsVsCheapest.toFixed(2)} but unverified – Recommend verified cheapest for safety – $15 inspection vs $125 Alibaba.` : `Verified cheapest also cheaper than direct 1688 – Best value + safety.`}`,
      nextSteps: [
        '1. Buyer approves final DDP – Valid 3 Days',
        '2. Deposit fund with Paystack test api / Flutterwave for orders – Using MoMo number linked – Created on phone – Not via Nicham API',
        '3. NiChAm escrow holds 30% after verification (PSI + SC accepted), 60% after BL, 10% after delivery code scan via /verify-delivery',
        '4. Source from cheapest verifier – AfricanIES/Proc360/Laybel – With photo/video verification before shipping',
        '5. DDP to premises – Lagos/Abuja/Kano/PH/Enugu – With tracking, insurance, customs clearance'
      ]
    }

    return NextResponse.json({
      success: true,
      routingId: routing.id,
      productName,
      location,
      comparisonTable,
      cheapestOf3,
      externalComparison,
      feePlacementAnalysis,
      aiDecision,
      finalDDP,
      platformFee
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const routingId = searchParams.get('id')
  const globalRouting = (global as any).nichamRouting || []
  const routing = routingId ? globalRouting.find((r: any) => r.id === routingId) : globalRouting[globalRouting.length - 1]
  
  if (!routing) return NextResponse.json({ error: 'No routing found' }, { status: 404 })
  
  // Auto compare latest
  const req2 = new Request('http://localhost', { method: 'POST', body: JSON.stringify({ routingId: routing.id }) })
  const res = await POST(req2)
  return res
}
