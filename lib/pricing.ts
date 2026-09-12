
export const PRICING = { merchantDiscount: 0.10, passToBuyer: 0.02, margin: 0.08 }
export function getCompetitiveSaving(base: number){ return Math.round(base*0.02) }
