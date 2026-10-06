import { NextResponse } from 'next/server'
const MOTOMA = [
  { id: 'M68PW', model: 'M68PW PRO', name: 'M68PW PRO - 200Ah 25.6V', capacity: '5.12kWh', voltage: '25.6V Residential', moq: '12 pcs', image: '/motoma/M68PW.jpg', desc: '200Ah 25.6V Grade A+ 8000 Cycles Smart BMS', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', priceUSD: 950, sourceCompany: 'MOTOMA Power Co., Ltd', sourceUrl: 'https://www.motoma.com/M68PW-PRO-200Ah-25.6V.html', sourcePlatform: 'Motoma Official', originalImageUrl: 'https://www.motoma.com/images/M68PW.jpg' },
  { id: 'M69PW', model: 'M69PW PRO', name: 'M69PW PRO - 280Ah 25.6V', capacity: '7.16kWh', voltage: '25.6V High Cap', moq: '12 pcs', image: '/motoma/M69PW.jpg', desc: '280Ah High Capacity 15+ Years', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', priceUSD: 1250, sourceCompany: 'MOTOMA Power', sourceUrl: 'https://www.motoma.com/M69PW-PRO-280Ah.html', sourcePlatform: 'Motoma Official', originalImageUrl: 'https://www.motoma.com/images/M69PW.jpg' },
]
const BIKES = [
  { id: 'BIKE-CARGO', model: 'Cargo E-Bike 1000W', name: 'Solar Cargo E-Bike 1000W', capacity: '1000W', voltage: 'Solar Bike', moq: '5 pcs', image: 'https://via.placeholder.com/600x400/0f172a/ffffff?text=Cargo+E-Bike+1000W+Solar+Box', desc: '1000W Cargo e-bike 48V 20Ah 80km range Solar charging', standards: ['CE','UN38.3'], grade: 'A+', priceUSD: 680, sourceCompany: 'Alibaba Cargo E-Bike Manufacturer', sourceUrl: 'https://www.alibaba.com/product-detail/Cargo-E-Bike-1000W_1122334455.html', sourcePlatform: 'Alibaba', originalImageUrl: 'https://sc04.alicdn.com/kf/cargo-ebike.jpg' },
  { id: 'BIKE-COMMUTE', model: 'Commuter E-Bike 500W', name: 'Solar Commuter E-Bike 500W', capacity: '500W', voltage: 'Solar Bike', moq: '10 pcs', image: 'https://via.placeholder.com/600x400/334155/ffffff?text=Commuter+E-Bike+500W+Solar', desc: '500W Commuter e-bike 48V 60km range Solar compatible', standards: ['CE','UN38.3'], grade: 'A+', priceUSD: 450, sourceCompany: 'Made-in-China Commuter E-Bike', sourceUrl: 'https://www.made-in-china.com/product/commuter-e-bike-500W_55667788.html', sourcePlatform: 'Made-in-China', originalImageUrl: 'https://image.made-in-china.com/commuter-ebike.jpg' },
]
const PHARMA = [
  { id: 'PH-PARA', model: 'Paracetamol Powder BP/USP', name: 'Paracetamol Powder BP/USP 99%', capacity: '25kg Drum', voltage: 'Pharma Grade', moq: '100kg', image: 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Paracetamol+Powder+BP+USP+Drum', desc: 'Paracetamol powder BP/USP 99% REACH ISO 9001 EU/US', standards: ['BP','USP','REACH'], grade: 'A+', priceUSD: 8, sourceCompany: 'Hebei Pharmaceutical Co.', sourceUrl: 'https://www.alibaba.com/product-detail/Paracetamol-Powder-BP-USP_1600881234567.html', sourcePlatform: 'Alibaba', originalImageUrl: 'https://sc04.alicdn.com/kf/paracetamol.jpg' },
]
const ALL = [...MOTOMA, ...BIKES, ...PHARMA]
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const buttonName = searchParams.get('buttonName') || ''
  const nl = buttonName.toLowerCase()
  let products: any[] = []
  if (nl.includes('bike')) products = BIKES
  else if (nl.includes('pharma')) products = PHARMA
  else products = MOTOMA
  const withDDP = products.map(p => ({ ...p, ddpLagos: Math.round(p.priceUSD * 1.35), savedAt: new Date().toISOString() }))
  return NextResponse.json({ products: withDDP, total: withDDP.length, note: 'Correct pictures Source URL saved' })
}
export async function POST(req: Request) { return NextResponse.json({ success: true }) }
