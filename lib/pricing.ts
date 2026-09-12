
export const PRICING = {
  // Internal: 10% merchant discount from supplier, 2% passed to buyer to be competitive (silent)
  merchantDiscount: 0.10,
  passToBuyer: 0.02,
  margin: 0.08,
  vat: 0.075,
  escrow: 0.01,
  // Internal carbon: Buyer 50% + GSPI 30% + MTN 20% - NOT shown to buyer publicly
  carbonInternal: { buyer: 0.5, gspi: 0.3, mtn: 0.2 }
}
export function getSaving(base:number){ return Math.round(base*0.02) }
