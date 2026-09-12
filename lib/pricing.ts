
// ARCHITECT: NiChAm Pricing Engine - Competitive vs AfricanIES + Carbon Credits + MTN Share
// Merchant Discount 10% from AfricanIES → Pass 2% to buyer → Keep 8% + Carbon

export const PRICING_CONFIG = {
  africanIESMerchantDiscount: 0.10, // 10% discount AfricanIES gives us as merchant
  passToBuyer: 0.02, // 2% passed to buyer to be competitive vs AfricanIES retail
  nichamMargin: 0.08, // 8% kept: 5% GSPI platform + 3% operations
  vat: 0.075, // 7.5% VAT Nigeria
  escrowFee: 0.01, // 1% MoMo escrow
  carbonCreditValue: 0.03, // 3% value from carbon credits shared with MTN (not AfricanIES)
  // AfricanIES NOT in carbon loop - only GSPI + MTN + Buyer
}

export function calcTotal(baseChinaPrice: number, supplier: string = 'africanIES') {
  // baseChinaPrice = AfricanIES retail price (what buyer sees on africanies.com)
  // We get 10% off that as merchant
  const merchantPrice = baseChinaPrice * (1 - PRICING_CONFIG.africanIESMerchantDiscount) // 90% of retail
  
  // We pass 2% of original to buyer to be competitive
  // So buyer sees: AfricanIES retail 100% vs NiChAm 98% → NiChAm cheaper
  const competitivePrice = baseChinaPrice * (1 - PRICING_CONFIG.passToBuyer) // 98% of AfricanIES retail
  
  // Our cost is merchantPrice (90%), we sell at competitivePrice (98%)
  // Gross margin = 8% of original
  // Then add VAT + Escrow on top of competitive price (buyer pays)
  // Carbon credit is separate revenue share with MTN, not charged to buyer upfront
  
  const priceBeforeFees = competitivePrice
  const vatAmount = priceBeforeFees * PRICING_CONFIG.vat
  const escrowAmount = priceBeforeFees * PRICING_CONFIG.escrowFee
  const total = priceBeforeFees + vatAmount + escrowAmount
  
  // Carbon credit - not added to buyer price, but tracked as revenue
  // Example: Solar bike saves 2.2 tons CO2/yr = $15 carbon credit
  // Shared: 50% buyer (as discount next purchase), 30% GSPI, 20% MTN
  // AfricanIES NOT in this loop
  
  return {
    africanIESRetail: baseChinaPrice,
    merchantCost: merchantPrice,
    nichamSellingBeforeFees: competitivePrice,
    vat: vatAmount,
    escrow: escrowAmount,
    total: Math.round(total),
    grossMargin: competitivePrice - merchantPrice, // 8%
    buyerSavingVsAfricanIES: baseChinaPrice - competitivePrice, // 2%
    carbonCreditNote: "Carbon credit shared with MTN, not AfricanIES - extra revenue"
  }
}

export function formatPriceBreakdown(basePrice: number) {
  const calc = calcTotal(basePrice)
  return {
    display: `₦${calc.total.toLocaleString()}`, // Only Total shown on listing (per your rule)
    breakdownHidden: calc, // For order page if needed
    competitiveMessage: `2% cheaper than AfricanIES retail - You save ₦${calc.buyerSavingVsAfricanIES.toLocaleString()}`
  }
}

// Future: Factory direct API pricing - same logic, bigger discount
export function calcFactoryDirect(factoryPrice: number) {
  // Factory gives 15% discount vs AfricanIES, we pass 5% to buyer to be even more competitive
  const merchantDiscount = 0.15
  const passToBuyer = 0.05
  const merchantCost = factoryPrice * (1 - merchantDiscount)
  const selling = factoryPrice * (1 - passToBuyer)
  const total = selling * 1.085 // VAT + escrow
  return {
    factoryPrice,
    merchantCost,
    selling,
    total: Math.round(total),
    buyerSaving: factoryPrice - selling,
    margin: selling - merchantCost
  }
}
