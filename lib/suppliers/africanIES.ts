
export async function getAfricanIESPrice(sku: string, retailPrice: number){
  const merchantDiscount = 0.10
  return { retail: retailPrice, merchantCost: retailPrice*0.9, competitiveSelling: retailPrice*0.98, saving: retailPrice*0.02, supplier: 'africanIES', discount: '10%' }
}
export async function createAfricanIESOrder(sku: string, qty: number){
  return { orderId: `AFR-${Date.now()}`, status: 'Sourcing from JD/1688', eta: '14 days' }
}
