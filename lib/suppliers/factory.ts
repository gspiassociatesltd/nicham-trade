
export async function getFactoryPrice(sku: string, factoryPrice: number){
  // Future: when you get manufacturer API key, plug here
  return { factory: factoryPrice, merchantCost: factoryPrice*0.85, competitiveSelling: factoryPrice*0.95, saving: factoryPrice*0.05, supplier: 'factory_direct', discount: '15%' }
}
