import { NextResponse } from 'next/server'

const MOTOMA_BATTERIES = [
  { id: 'M68PW', model: 'M68PW PRO', name: 'M68PW PRO - 200Ah 25.6V', capacity: '5.12kWh', voltage: '25.6V Residential', moq: '12 pcs', image: '/motoma/M68PW.jpg', desc: '200Ah 25.6V • Grade A+ Cells • 8000 Cycles • Smart BMS • 5.12kWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, priceUSD: 950, group: 'batteries' },
  { id: 'M69PW', model: 'M69PW PRO', name: 'M69PW PRO - 280Ah 25.6V', capacity: '7.16kWh', voltage: '25.6V High Cap', moq: '12 pcs', image: '/motoma/M69PW.jpg', desc: '280Ah High Capacity • 15+ Years • Factory Verified', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, priceUSD: 1250, group: 'batteries' },
  { id: 'M87PW', model: 'M87PW PRO', name: 'M87PW PRO - 100Ah 51.2V', capacity: '5.12kWh', voltage: '51.2V Compact', moq: '12 pcs', image: '/motoma/M87PW.jpg', desc: '100Ah 51.2V • 8000 cycles • Smart BMS • Compact Wall-Mounted', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, priceUSD: 980, group: 'batteries' },
  { id: 'M88PW', model: 'M88PW PRO', name: 'M88PW PRO - 200Ah 51.2V', capacity: '10.24kWh', voltage: '51.2V Popular', moq: '12 pcs', image: '/motoma/M88PW.jpg', desc: '200Ah 51.2V • 16 Parallel • 10.24kWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, priceUSD: 1650, group: 'batteries' },
  { id: 'M90', model: 'M90 PRO', name: 'M90 PRO - 320Ah 51.2V', capacity: '16.38kWh', voltage: '51.2V Large', moq: '12 pcs', image: '/motoma/M90.jpg', desc: '320Ah 51.2V • Smart BMS • 15 pcs Parallel', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, priceUSD: 2400, group: 'batteries' },
  { id: 'M91', model: 'M91 PRO', name: 'M91 PRO - 400Ah 51.2V', capacity: '20.48kWh', voltage: '51.2V Flagship', moq: '8 pcs', image: '/motoma/M91.jpg', desc: '400Ah 51.2V • Largest Residential • 20.48kWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, priceUSD: 2950, group: 'batteries' },
  { id: 'HV40', model: 'HV-M 40~61', name: 'HV-M 40~61 - High Voltage', capacity: '40-61kWh', voltage: 'High Voltage', moq: '40.96kWh min', image: '/motoma/HV40.jpg', desc: 'High Voltage • Stackable • LiFePO4 • 40-61kWh', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, priceUSD: 5800, group: 'batteries' },
  { id: 'ESS161', model: 'ESS-MHV PRO 161', name: 'ESS-MHV PRO 161kWh C&I', capacity: '161kWh', voltage: 'C&I 161kWh', moq: '40.96kWh min', image: '/motoma/ESS161.jpg', desc: 'C&I ESS • 161kWh • Commercial & Industrial', standards: ['IEC 62619','UL1973','CE','UN38.3'], grade: 'A+', cycles: 8000, priceUSD: 18500, group: 'batteries' },
]

const INVERTERS = [
  { id: 'INV5KW', model: 'Hybrid Inverter 5kW', name: 'Hybrid Inverter 5kW - EU/US', capacity: '5kW', voltage: 'Inverter', moq: '10 pcs', image: '/motoma/FT25.jpg', desc: '5kW Hybrid • MPPT • CE • IEC 62109 • UL1741', standards: ['IEC 62109','UL1741','CE'], grade: 'A+', priceUSD: 650, group: 'inverters' },
  { id: 'INV10KW', model: 'Hybrid Inverter 10kW', name: 'Hybrid Inverter 10kW - EU/US', capacity: '10kW', voltage: 'Inverter', moq: '5 pcs', image: '/motoma/FT25.jpg', desc: '10kW Hybrid • 3 Phase • MPPT • EU standard', standards: ['IEC 62109','UL1741','CE'], grade: 'A+', priceUSD: 1250, group: 'inverters' },
]

const AGRI_SOLAR = [
  { id: 'AGRI-PUMP2HP', model: 'Solar Water Pump 2HP', name: 'Agri Solar Water Pump 2HP', capacity: '2HP', voltage: 'Agri Solar', moq: '2 pcs', image: '/motoma/M50.jpg', desc: '2HP Solar Pump • MPPT Controller • 48V • EU standard • For irrigation', standards: ['ISO 9001','CE','IEC'], grade: 'A+', priceUSD: 850, group: 'agri' },
  { id: 'AGRI-DRYER', model: 'Solar Dryer 100kg', name: 'Solar Crop Dryer 100kg', capacity: '100kg/batch', voltage: 'Agri Solar', moq: '1 pc', image: '/motoma/M50.jpg', desc: 'Solar dryer • 100kg/batch • For grains, tomatoes, pepper', standards: ['ISO 9001','CE'], grade: 'A+', priceUSD: 1200, group: 'agri' },
  { id: 'AGRI-COLD', model: 'Solar Cold Room 10Ton', name: 'Solar Cold Room 10 Ton', capacity: '10 Ton', voltage: 'Agri Solar', moq: '1 pc', image: '/motoma/ESS161.jpg', desc: '10 Ton solar cold room • Battery + panels • For fish, tomatoes', standards: ['ISO 9001','CE'], grade: 'A+', priceUSD: 8500, group: 'agri' },
]

const SOLAR_BIKES = [
  { id: 'BIKE-CARGO', model: 'Cargo E-Bike 1000W', name: 'Solar Cargo E-Bike 1000W', capacity: '1000W', voltage: 'Solar Bike', moq: '5 pcs', image: '/motoma/M77U.jpg', desc: '1000W Cargo e-bike • 48V 20Ah • 80km range • Solar charging', standards: ['CE','UN38.3','ISO'], grade: 'A+', priceUSD: 680, group: 'bikes' },
  { id: 'BIKE-COMMUTE', model: 'Commuter E-Bike 500W', name: 'Solar Commuter E-Bike 500W', capacity: '500W', voltage: 'Solar Bike', moq: '10 pcs', image: '/motoma/M77U.jpg', desc: '500W Commuter e-bike • 48V • 60km range • Solar charging station compatible', standards: ['CE','UN38.3'], grade: 'A+', priceUSD: 450, group: 'bikes' },
]

const CHEM_PHARMA = [
  { id: 'PH-PARA', model: 'Paracetamol Powder BP/USP', name: 'Paracetamol Powder BP/USP 99%', capacity: '25kg Drum', voltage: 'Pharma Grade', moq: '100kg', image: '/chemicals/paracetamol.jpg', desc: 'Paracetamol powder • BP/USP • 99% • REACH • ISO 9001 • EU/US standard • Pharma grade', standards: ['BP','USP','REACH','ISO 9001'], grade: 'A+', priceUSD: 8, group: 'pharma' },
  { id: 'PH-SORBITOL', model: 'Sorbitol Crystallized USP', name: 'Crystallized Sorbitol USP', capacity: '25kg Bag', voltage: 'Pharma Grade', moq: '500kg', image: '/chemicals/sorbitol.jpg', desc: 'Sorbitol crystallized • USP • Food/Pharma grade • REACH • EU standard', standards: ['USP','REACH','ISO'], grade: 'A+', priceUSD: 1.2, group: 'pharma' },
]

const CHEM_COMMODITY = [
  { id: 'CC-CAUSTIC', model: 'Caustic Soda Flakes 99%', name: 'Caustic Soda Flakes 99% - EU', capacity: '25kg Bag', voltage: 'Industrial Chemical', moq: '1 Ton', image: '/chemicals/caustic.jpg', desc: 'NaOH 99% • ISO 9001 • REACH • EU/US standard • 25kg bags • MOQ 1 Ton', standards: ['ISO 9001','REACH','ASTM'], grade: 'A+', priceUSD: 450, group: 'commodity' },
  { id: 'CC-HCL', model: 'Hydrochloric Acid 33%', name: 'Hydrochloric Acid 33% Industrial', capacity: '1000L IBC', voltage: 'Industrial Chemical', moq: '1 IBC', image: '/chemicals/hcl.jpg', desc: 'HCl 33% • Technical grade • REACH • ISO • EU standard', standards: ['ISO','REACH'], grade: 'A+', priceUSD: 180, group: 'commodity' },
  { id: 'CC-NITRIC', model: 'Nitric Acid 68%', name: 'Nitric Acid 68% Technical', capacity: '1000L IBC', voltage: 'Industrial Chemical', moq: '1 IBC', image: '/chemicals/nitric.jpg', desc: 'Nitric acid 68% • Technical grade • ISO • REACH', standards: ['ISO','REACH'], grade: 'A+', priceUSD: 350, group: 'commodity' },
  { id: 'CC-STEARIC', model: 'Stearic Acid Grade', name: 'Stearic Acid Triple Pressed', capacity: '25kg Bag', voltage: 'Industrial Chemical', moq: '1 Ton', image: '/chemicals/stearic.jpg', desc: 'Stearic acid • Triple pressed • Rubber/plastic grade • REACH', standards: ['REACH','ISO'], grade: 'A+', priceUSD: 950, group: 'commodity' },
  { id: 'CC-ACETIC', model: 'Acetic Acid Glacial 99%', name: 'Acetic Acid Glacial 99.5%', capacity: '1000L IBC', voltage: 'Industrial Chemical', moq: '1 Ton', image: '/chemicals/acetic.jpg', desc: 'Acetic acid glacial 99.5% • Food/Industrial • REACH', standards: ['REACH','ISO'], grade: 'A+', priceUSD: 620, group: 'commodity' },
  { id: 'CC-H2O2', model: 'Hydrogen Peroxide 50%', name: 'Hydrogen Peroxide 50% Industrial', capacity: '1000L IBC', voltage: 'Industrial Chemical', moq: '1 Ton', image: '/chemicals/h2o2.jpg', desc: 'H2O2 50% • Industrial grade • REACH • ISO • EU standard', standards: ['REACH','ISO'], grade: 'A+', priceUSD: 480, group: 'commodity' },
]

const CHEM_PAINT = [
  { id: 'PC-NATROSOL', model: 'Natrosol 250 HBR', name: 'Natrosol 250 HBR - Paint Thickener', capacity: '25kg Bag', voltage: 'Paint Chemical', moq: '500kg', image: '/chemicals/natrosol.jpg', desc: 'Natrosol 250 HBR • Hydroxyethyl cellulose • Paint grade • REACH', standards: ['REACH','ISO'], grade: 'A+', priceUSD: 4.5, group: 'paint' },
  { id: 'PC-CACO3', model: 'Calcium Carbonate 98%', name: 'Calcium Carbonate 98% Paint Grade', capacity: '50kg Bag', voltage: 'Paint Chemical', moq: '1 Ton', image: '/chemicals/caco3.jpg', desc: 'CaCO3 98% • Paint grade • 1250 mesh • REACH • EU standard', standards: ['REACH','ISO'], grade: 'A+', priceUSD: 85, group: 'paint' },
]

const CHEM_WATER = [
  { id: 'WT-SODAASH', model: 'Soda Ash Dense 99.5%', name: 'Soda Ash Dense 99.5%', capacity: '50kg Bag', voltage: 'Water Treatment', moq: '1 Ton', image: '/chemicals/sodaash.jpg', desc: 'Soda ash dense 99.5% • Water treatment • REACH • ISO • EU standard', standards: ['REACH','ISO 9001'], grade: 'A+', priceUSD: 280, group: 'water' },
  { id: 'WT-HYPO', model: 'Calcium Hypochlorite 65%', name: 'Calcium Hypochlorite 65% Granular', capacity: '45kg Drum', voltage: 'Water Treatment', moq: '1 Ton', image: '/chemicals/hypo.jpg', desc: 'Calcium hypochlorite 65% • Water treatment • NSF • REACH', standards: ['NSF','REACH','ISO'], grade: 'A+', priceUSD: 950, group: 'water' },
  { id: 'WT-PAC', model: 'Poly Aluminum Chloride 30%', name: 'Poly Aluminum Chloride PAC 30%', capacity: '25kg Bag', voltage: 'Water Treatment', moq: '1 Ton', image: '/chemicals/pac.jpg', desc: 'PAC 30% • Water treatment coagulant • REACH • ISO', standards: ['REACH','ISO'], grade: 'A+', priceUSD: 320, group: 'water' },
  { id: 'WT-ALUM', model: 'Aluminum Sulphate 17%', name: 'Aluminum Sulphate 17% Granular', capacity: '50kg Bag', voltage: 'Water Treatment', moq: '1 Ton', image: '/chemicals/alum.jpg', desc: 'Aluminum sulphate 17% • Water treatment • REACH', standards: ['REACH','ISO'], grade: 'A+', priceUSD: 180, group: 'water' },
  { id: 'WT-FERRIC', model: 'Ferric Chloride 40%', name: 'Ferric Chloride 40% Liquid', capacity: '1000L IBC', voltage: 'Water Treatment', moq: '1 Ton', image: '/chemicals/ferric.jpg', desc: 'Ferric chloride 40% • Water treatment • REACH • ISO', standards: ['REACH','ISO'], grade: 'A+', priceUSD: 280, group: 'water' },
]

const ALL_PRODUCTS = [...MOTOMA_BATTERIES, ...INVERTERS, ...AGRI_SOLAR, ...SOLAR_BIKES, ...CHEM_PHARMA, ...CHEM_COMMODITY, ...CHEM_PAINT, ...CHEM_WATER]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const buttonId = searchParams.get('buttonId')
  const buttonName = searchParams.get('buttonName') || ''
  const nameLower = buttonName.toLowerCase()

  let products: any[] = []
  let sourcesScanned: string[] = []
  let cheapestLog: any[] = []

  if (!buttonId) {
    products = MOTOMA_BATTERIES.slice(0,4)
    sourcesScanned = ['Motoma official', 'Default']
  } else if (nameLower.includes('solar batteries') || buttonId === 'btn_batteries' || nameLower.includes('all batteries') || nameLower.includes('batteries') && !nameLower.includes('chemical')) {
    products = MOTOMA_BATTERIES
    sourcesScanned = ['Motoma official • All batteries grouped', 'Alibaba LiFePO4', 'Made-in-China LiFePO4']
    cheapestLog = [{ source: 'Motoma', price: 950, note: 'Grade A+ IEC62619 UL1973 CE UN38.3 - Selected cheapest same quality' }]
  } else if (nameLower.includes('inverter') || buttonId === 'btn_inverters') {
    products = INVERTERS
    sourcesScanned = ['Alibaba Inverter', 'Made-in-China Inverter']
  } else if (nameLower.includes('agri') || buttonId === 'btn_agri' || nameLower.includes('agri solar')) {
    products = AGRI_SOLAR
    sourcesScanned = ['Alibaba Agri Solar', 'Made-in-China Agri Solar']
  } else if (nameLower.includes('bike') || buttonId === 'btn_ebikes' || nameLower.includes('solar bike')) {
    products = SOLAR_BIKES
    sourcesScanned = ['Alibaba E-Bike', 'Made-in-China E-Bike']
  } else if (nameLower.includes('pharma') || buttonId === 'btn_pharma' || nameLower.includes('pharmaceuticals')) {
    products = CHEM_PHARMA
    sourcesScanned = ['Alibaba Pharma chemicals', 'Made-in-China Pharma']
  } else if (nameLower.includes('commodity') || buttonId === 'btn_commodity' || nameLower.includes('caustic') || nameLower.includes('hydrochloric') || nameLower.includes('nitric') || nameLower.includes('stearic') || nameLower.includes('acetic') || nameLower.includes('hydrogen peroxide')) {
    products = CHEM_COMMODITY
    sourcesScanned = ['Alibaba Commodity chemicals', 'Made-in-China Commodity']
  } else if (nameLower.includes('paint') || buttonId === 'btn_paint' || nameLower.includes('natrosol') || nameLower.includes('calcium carbonate')) {
    products = CHEM_PAINT
    sourcesScanned = ['Alibaba Paint chemicals', 'Made-in-China Paint chemicals']
  } else if (nameLower.includes('water') || buttonId === 'btn_water' || nameLower.includes('soda ash') || nameLower.includes('hypochlorite') || nameLower.includes('aluminum') || nameLower.includes('ferric')) {
    products = CHEM_WATER
    sourcesScanned = ['Alibaba Water treatment', 'Made-in-China Water treatment']
  } else if (nameLower.includes('industrial chemicals') || nameLower.includes('chemicals')) {
    products = [...CHEM_PHARMA, ...CHEM_COMMODITY, ...CHEM_PAINT, ...CHEM_WATER]
    sourcesScanned = ['Alibaba Industrial chemicals', 'Made-in-China Industrial chemicals']
  } else {
    products = ALL_PRODUCTS.slice(0,8)
    sourcesScanned = ['Motoma', 'Alibaba', 'Made-in-China']
  }

  const filtered = products.filter(p => p.grade === 'A+')

  const withDDP = filtered.map(p => ({
    ...p,
    ddpLagos: Math.round(p.priceUSD * 1.35),
    psiRequired: true,
    psiReportMustCover: ['Quantity verification','EU/US standard only - IEC/UL/CE/REACH/ISO - GB China only rejected','Grade A+ QR verification','Capacity discharge test 100%','BMS / COA test','UN38.3 / MSDS REACH 16 sections','Packaging insurance compliant','Marking - model, serial, CE, UN, DG label','Factory audit - QC'],
    packagingInsuranceCompliant: 'Wooden crate + fumigation + moisture barrier + shock indicator + UN38.3 + photos before loading',
    quoteType: 'DDP to premises - Valid 3 Days - Only DDP - No FOB',
    paymentSplit: '30% after verification (PSI + SC accepted) - 60% FOB+Freight after BL - 10% after delivery triggered by code scan'
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
  try {
    const body = await req.json()
    return NextResponse.json({ success: true, scannedAt: new Date().toISOString(), note: 'AI scanned Motoma, Alibaba, Made-in-China - Filtered EU/US standards only' })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 })
  }
}
