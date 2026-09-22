const requestQuote = () => {
  // 1. Check flags
  const isFactoryVisitedBefore = localStorage.getItem(`factory_visited_${p.manufacturer}`) === 'true'
  const isSourcedViaDiscovery = p.sourcedBy?.includes('Discovery') // from Admin Vault

  // 2. Build AfricanIES message
  let africanMsg = `NEW RFQ ${rfqId}: ${p.name} x${qty} to ${state}, ${warehouse}. Phone ${phone}.%0A%0AQUOTE NEEDED:%0A`
  if(!isFactoryVisitedBefore) africanMsg += `- Factory Visit Fee N10k (except if previously done) - first time visit to ${p.manufacturer}%0A`
  else africanMsg += `- Factory Visit: Previously done (skip fee)%0A`

  if(!isSourcedViaDiscovery) africanMsg += `- Sourcing Fee (except done through discovery engine)%0A`
  else africanMsg += `- Sourcing: Discovery Engine -> Platform earns 3% (no external sourcing)%0A`

  africanMsg += `- Logistics: Shipping + Customs Clearing + Delivery to customer's warehouse ${warehouse}, ${state}%0A`
  africanMsg += `- Visit Fee Deductible: N10k deductible from shipping%0A`
  africanMsg += `%0AAffiliate:${affCode||'None'} Field:${agentCode||'None'}`

  // 3. Build QIMA message (PSI only)
  const qimaMsg = `NEW PSI REQUEST ${rfqId}: ${p.name} from ${p.manufacturer} x${qty}. Factory ${p.manufacturer}. QIMA to quote for Pre-Shipment Inspection. Customer ${phone}, ${state}.%0A5 Proofs Gate required.`

  // 4. Send to both WhatsApps
  window.open(`https://wa.me/2348012345678?text=${africanMsg}`, '_blank') // AfricanIES number
  setTimeout(()=> window.open(`https://wa.me/2348098765432?text=${qimaMsg}`, '_blank'), 1000) // QIMA Nigeria number

  // 5. Save flags
  if(!isFactoryVisitedBefore) localStorage.setItem(`factory_visited_${p.manufacturer}`, 'true')
}
