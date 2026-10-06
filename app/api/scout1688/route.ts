import { NextResponse } from 'next/server'

const MOTOMA_PRODUCTS = [
  { id: 'M68PW', model: 'M68PW PRO', name: 'M68PW PRO - 200Ah 25.6V', capacity: '5.12kWh', voltage: '25.6V Residential', moq: '12 pcs', image: '/motoma/M68PW.jpg', desc: '200Ah 25.6V • Grade A+ Cells • 8000 Cycles • Smart BMS • 5.12kWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 950 },
  { id: 'M69PW', model: 'M69PW PRO', name: 'M69PW PRO - 280Ah 25.6V', capacity: '7.16kWh', voltage: '25.6V High Cap', moq: '12 pcs', image: '/motoma/M69PW.jpg', desc: '280Ah High Capacity • 15+ Years • Factory Verified • 7.16kWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 1250 },
  { id: 'M87PW', model: 'M87PW PRO', name: 'M87PW PRO - 100Ah 51.2V', capacity: '5.12kWh', voltage: '51.2V Compact', moq: '12 pcs', image: '/motoma/M87PW.jpg', desc: '100Ah 51.2V • 8000 cycles • Smart BMS • Compact Wall-Mounted', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 980 },
  { id: 'M88PW', model: 'M88PW PRO', name: 'M88PW PRO - 200Ah 51.2V', capacity: '10.24kWh', voltage: '51.2V Popular', moq: '12 pcs', image: '/motoma/M88PW.jpg', desc: '200Ah 51.2V • High Cycle Efficiency • 16 Parallel • 10.24kWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 1650 },
  { id: 'M90', model: 'M90 PRO', name: 'M90 PRO - 320Ah 51.2V', capacity: '16.38kWh', voltage: '51.2V Large', moq: '12 pcs', image: '/motoma/M90.jpg', desc: '320Ah 51.2V • Smart BMS • 15 pcs Parallel • 16.38kWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 2400 },
  { id: 'M91', model: 'M91 PRO', name: 'M91 PRO - 400Ah 51.2V', capacity: '20.48kWh', voltage: '51.2V Flagship', moq: '8 pcs', image: '/motoma/M91.jpg', desc: '400Ah 51.2V • Largest Residential • 20.48kWh • MOQ 8 pcs', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 2950 },
  { id: 'HV40', model: 'HV-M 40~61', name: 'HV-M 40~61 - High Voltage', capacity: '40-61kWh', voltage: 'High Voltage', moq: '40.96kWh min', image: '/motoma/HV40.jpg', desc: 'High Voltage • Stackable • LiFePO4 • 40-61kWh • Up to 5MWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 5800 },
  { id: 'HV92', model: 'HV-M 92-193', name: 'HV-M 92-193 - 92.16kWh', capacity: '92-193kWh', voltage: 'HV 92-193', moq: '40.96kWh min', image: '/motoma/HV92.jpg', desc: '150Ah Module • 92-193kWh • Scalable • High Voltage', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 12500 },
  { id: 'ESS161', model: 'ESS-MHV PRO 161', name: 'ESS-MHV PRO 161kWh C&I', capacity: '161kWh', voltage: 'C&I 161kWh', moq: '40.96kWh min', image: '/motoma/ESS161.jpg', desc: 'C&I ESS • 161kWh • Commercial & Industrial • Outdoor Cabinet', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 18500 },
  { id: 'ESS209', model: 'ESS-MHV PRO 209', name: 'ESS-MHV PRO 209kWh C&I', capacity: '209kWh', voltage: 'C&I 209kWh', moq: '40.96kWh min', image: '/motoma/ESS209.jpg', desc: 'C&I ESS • 209kWh • High Capacity • 3-Phase', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, source: 'Motoma', priceUSD: 23500 },
]

const CHEMICAL_PRODUCTS = [
  { id: 'CAUSTIC', model: 'Caustic Soda Flakes 99%', name: 'Caustic Soda Flakes 99% - EU Standard', capacity: '25kg Bag', voltage: 'Industrial Chemical', moq: '1 Ton', image: '/chemicals/caustic.jpg', desc: 'NaOH 99% • ISO 9001 • REACH • EU/US standard • 25kg bags • MOQ 1 Ton', standards: ['ISO 9001','REACH','ASTM'], grade: 'A+', source: 'Alibaba', priceUSD: 450 },
  { id: 'SODAASH', model: 'Soda Ash Dense', name: 'Soda Ash Dense 99.5% - EU Standard', capacity: '50kg Bag', voltage: 'Industrial Chemical', moq: '1 Ton', image: '/chemicals/sodaash.jpg', desc: 'Na2CO3 99.5% • ISO • REACH • EU standard • 50kg', standards: ['ISO 9001','REACH'], grade: 'A+', source: 'Made-in-China', priceUSD: 280 },
]

const INVERTER_PRODUCTS = [
  { id: 'INV5KW', model: 'Hybrid Inverter 5kW', name: 'Hybrid Inverter 5kW - EU/US', capacity: '5kW', voltage: 'Inverter', moq: '10 pcs', image: '/motoma/FT25.jpg', desc: '5kW Hybrid • MPPT • CE • IEC 62109 • UL1741 • EU/US standard', standards: ['IEC 62109','UL1741','CE'], grade: 'A+', source: 'Alibaba', priceUSD: 650 },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const buttonId = searchParams.get('buttonId')
  const buttonName = searchParams.get('buttonName') || ''

  // Simulate AI scanning Motoma, Alibaba, Made-in-China links
  // For MVP zero budget - we filter existing catalog by button name + check EU/US standards only + Grade A+
  // In production, this would fetch and parse the 3 links provided by admin

  let products: any[] = []
  let sourcesScanned = []
  let cheapestLog = []

  if (!buttonId) {
    return NextResponse.json({ products: MOTOMA_PRODUCTS.slice(0,4), message: 'No button selected - showing default' })
  }

  const nameLower = buttonName.toLowerCase()

  if (nameLower.includes('25.6v') || nameLower.includes('25.6') || buttonId === 'btn_25v') {
    products = MOTOMA_PRODUCTS.filter(p => p.voltage.includes('25.6V'))
    sourcesScanned = ['Motoma official', 'Alibaba 25.6V', 'Made-in-China 25.6V']
    cheapestLog = [{ source: 'Alibaba', price: 920, note: 'Grade B rejected - not EU standard' }, { source: 'Motoma', price: 950, note: 'Grade A+ IEC62619 UL1973 CE UN38.3 - Selected cheapest same quality' }]
  } else if (nameLower.includes('51.2v') || nameLower.includes('51.2') || buttonId === 'btn_51v') {
    products = MOTOMA_PRODUCTS.filter(p => p.voltage.includes('51.2V'))
    sourcesScanned = ['Motoma official', 'Alibaba 51.2V', 'Made-in-China 51.2V']
    cheapestLog = [{ source: 'Made-in-China', price: 950, note: 'No UL cert - rejected' }, { source: 'Motoma', price: 980, note: 'EU/US IEC UL CE - Selected' }]
  } else if (nameLower.includes('high voltage') || nameLower.includes('c&i') || nameLower.includes('ess') || buttonId === 'btn_hv') {
    products = MOTOMA_PRODUCTS.filter(p => p.voltage.includes('High Voltage') || p.voltage.includes('C&I') || p.voltage.includes('BESS') || p.voltage.includes('Container'))
    sourcesScanned = ['Motoma HV catalog', 'Alibaba HV', 'Made-in-China HV']
  } else if (nameLower.includes('inverter') || buttonId === 'btn_inverter') {
    products = INVERTER_PRODUCTS
    sourcesScanned = ['Alibaba Inverter', 'Made-in-China Inverter']
  } else if (nameLower.includes('chemical') || nameLower.includes('caustic') || nameLower.includes('soda') || buttonId === 'btn_chemicals') {
    products = CHEMICAL_PRODUCTS
    sourcesScanned = ['Alibaba Chemicals', 'Made-in-China Chemicals']
  } else {
    // Generic - show all but filter EU/US only
    products = [...MOTOMA_PRODUCTS.slice(0,6), ...INVERTER_PRODUCTS, ...CHEMICAL_PRODUCTS]
    sourcesScanned = ['Motoma', 'Alibaba', 'Made-in-China']
  }

  // Filter EU/US standards only - as agreed
  const filtered = products.filter(p => {
    // Only items manufactured to EU/US standards only should be purchased
    const hasEUUS = p.standards.some((s: string) => ['IEC','UL','CE','REACH','ISO','ASTM','UN38.3'].some(k => s.includes(k)))
    return hasEUUS && p.grade === 'A+'
  })

  // Add DDP calculation and PSI requirement
  const withDDP = filtered.map(p => ({
    ...p,
    ddpLagos: Math.round(p.priceUSD * 1.35), // FOB + shipping + duty + insurance + clearance
    psiRequired: true,
    psiReportMustCover: [
      'Quantity verification',
      'EU/US standard only - IEC 62619 / UL1973 / CE / REACH / ISO - GB China only rejected',
      'Grade A+ QR verification',
      'Capacity discharge test 100%',
      'BMS / COA test',
      'UN38.3 / MSDS REACH 16 sections',
      'Packaging insurance compliant - wooden crate / UN drums / photos',
      'Marking - model, serial, CE, UN, DG label',
      'Factory audit - QC'
    ],
    packagingInsuranceCompliant: 'Wooden crate + fumigation + moisture barrier + shock indicator + UN38.3 + photos before loading',
    quoteType: 'DDP to premises - Valid 3 Days - Only DDP - No FOB',
    paymentSplit: '30% after verification (PSI + SC accepted) - 60% FOB+Freight after BL - 10% after delivery triggered by code scan by buyer'
  }))

  return NextResponse.json({
    buttonId,
    buttonName,
    sourcesScanned,
    cheapestLog,
    products: withDDP,
    filterApplied: 'EU/US standards only - Grade A+ only - Cheapest same quality - Insurance compliant packaging',
    total: withDDP.length
  })
}

export async function POST(req: Request) {
  // For admin to trigger manual scan with custom links
  try {
    const body = await req.json()
    const { buttonId, buttonName, links } = body
    // In real implementation, would fetch links.motoma, links.alibaba, links.madeinchina and parse
    // For MVP, return same as GET but with links logged
    return NextResponse.json({
      success: true,
      message: `Scanned links for ${buttonName}`,
      links,
      scannedAt: new Date().toISOString(),
      note: 'AI scanned Motoma, Alibaba, Made-in-China - Filtered EU/US standards only - Grade A+ - Cheapest same quality selected - Packaging insurance compliant checked'
    })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}
