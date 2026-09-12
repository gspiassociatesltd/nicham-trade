
export const PRICING = {
  africanIES: { merchantDiscount: 0.10, passToBuyer: 0.02, margin: 0.08, note: "10% discount, 2% to buyer to undercut AfricanIES website" },
  factory: { merchantDiscount: 0.15, passToBuyer: 0.05, margin: 0.10 },
  vat: 0.075,
  escrow: 0.01,
  carbon: { buyer: 0.5, gspi: 0.3, mtn: 0.2, africanIES: 0, note: "AfricanIES NOT in carbon share - only GSPI+MTN+Buyer" }
}
