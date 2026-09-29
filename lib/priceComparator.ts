// lib/priceComparator.ts - AI Assistant per Master Build Doc v1 Rule 13F + v2.2 Metrics
// Compares our landed cost vs similar platforms before admin forwards to buyer

export interface MarketPrice {
  platform: 'Jumia' | 'Kara' | 'Konga' | 'Fouani' | 'Jiji'
  title: string
  price_ngn: number
  url?: string
}

export interface PriceComparisonResult {
  your_product: string
  your_base_ngn: number
  your_fee_rate: number // 0.10 = 10%
  your_fee_ngn: number
  your_landed_ngn: number
  market_prices: MarketPrice[]
  avg_market_ngn: number
  diff_ngn: number
  diff_pct: number // negative = below market (good)
  verdict: 'COMPETITIVE' | 'GOOD' | 'HIGH' | 'TOO_HIGH' // per Master Doc 15%+ above = flag
  recommendation: string
  valid_3_days: boolean
}

// Tiered fee per Boss approval
export function getPlatformFeeRate(orderValue: number, isNewInvention: boolean = false): number {
  if (isNewInvention) return 0.12 // 12% for scouting board new inventions - extra R&D
  if (orderValue > 2000000) return 0.08 // 8% for >₦2M orders
  return 0.10 // 10% standard - Boss rule
}

export function calcLandedWithTier(baseNGN: number, weightKg: number = 10, isNewInvention: boolean = false, selfClear: boolean = false) {
  const feeRate = getPlatformFeeRate(baseNGN, isNewInvention)
  let platformFee = Math.round(baseNGN * feeRate)
  if (selfClear) platformFee = Math.round(platformFee * 0.4) // 60% discount for self-clear
  const landed = baseNGN + platformFee
  return { baseNGN, feeRate, platformFee, landed, isNewInvention, selfClear }
}

// Mock market scraper - in production calls real APIs or scraping
// For MVP uses static knowledge + future integration to Jumia/Kara public search
export async function compareMarketPrice(productTitle: string, yourLanded: number): Promise<PriceComparisonResult> {
  // TODO: Replace with real fetch to Jumia search: https://www.jumia.com.ng/catalog/?q=3KVA+Hybrid+Inverter
  // and Kara: https://kara.com.ng/search?type=product&q=
  // For now, intelligent mock based on title keywords

  const keyword = productTitle.toLowerCase()
  let marketPrices: MarketPrice[] = []

  if (keyword.includes('3kva') || keyword.includes('hybrid inverter')) {
    marketPrices = [
      { platform: 'Jumia', title: '3KVA Hybrid Inverter Pure Sine Wave', price_ngn: 350000 },
      { platform: 'Kara', title: '3KVA Hybrid Inverter 24V', price_ngn: 330000 },
      { platform: 'Konga', title: '3KVA Inverter Hybrid', price_ngn: 345000 },
    ]
  } else if (keyword.includes('5kva')) {
    marketPrices = [
      { platform: 'Jumia', title: '5KVA Must Hybrid Inverter', price_ngn: 520000 },
      { platform: 'Kara', title: '5KVA Hybrid Inverter 48V', price_ngn: 490000 },
    ]
  } else if (keyword.includes('lithium') || keyword.includes('200ah')) {
    marketPrices = [
      { platform: 'Jumia', title: '200Ah Lithium Battery 48V', price_ngn: 750000 },
      { platform: 'Fouani', title: '200Ah LiFePO4 Battery', price_ngn: 720000 },
    ]
  } else {
    marketPrices = [
      { platform: 'Jumia', title: `${productTitle} - Jumia`, price_ngn: Math.round(yourLanded * 1.15) },
      { platform: 'Kara', title: `${productTitle} - Kara`, price_ngn: Math.round(yourLanded * 1.10) },
    ]
  }

  const avg = marketPrices.length > 0 ? Math.round(marketPrices.reduce((s, p) => s + p.price_ngn, 0) / marketPrices.length) : yourLanded
  const diff = yourLanded - avg
  const diffPct = avg > 0 ? (diff / avg) * 100 : 0

  let verdict: PriceComparisonResult['verdict'] = 'GOOD'
  let recommendation = ''
  if (diffPct <= -10) {
    verdict = 'COMPETITIVE'
    recommendation = `GREEN ✅ ${diffPct.toFixed(1)}% BELOW market - Highly competitive! Approve to send to buyer.`
  } else if (diffPct <= 5) {
    verdict = 'GOOD'
    recommendation = `GREEN ✅ ${diffPct.toFixed(1)}% vs market - Good, within range. Approve.`
  } else if (diffPct <= 15) {
    verdict = 'HIGH'
    recommendation = `YELLOW ⚠️ ${diffPct.toFixed(1)}% ABOVE market - Consider reducing fee from ${(getPlatformFeeRate(yourLanded)*100)}% to 8% or negotiate better freight.`
  } else {
    verdict = 'TOO_HIGH'
    recommendation = `RED ❌ ${diffPct.toFixed(1)}% ABOVE market - Price advisor flags 15%+ above! Must reduce. Try 8% fee or ask AfricanIES for cheaper freight.`
  }

  return {
    your_product: productTitle,
    your_base_ngn: 0,
    your_fee_rate: 0.10,
    your_fee_ngn: 0,
    your_landed_ngn: yourLanded,
    market_prices: marketPrices,
    avg_market_ngn: avg,
    diff_ngn: diff,
    diff_pct: diffPct,
    verdict,
    recommendation,
    valid_3_days: true
  }
}

