const africanMsg = `NEW RFQ ${id}: ${name} x${qty} to ${state}. Phone ${phone}.%0A${!visited?`- Factory Visit N10k (except if previously done) to ${manufacturer}%0A`:''}${!isDiscovery?`- Sourcing Fee (except done through discovery)%0A`:''}- Logistics + Customs + Delivery to ${warehouse}, ${state}%0A- Visit Fee deductible`
const qimaMsg = `PSI REQUEST ${id}: ${name} from ${manufacturer}. QIMA quote for PSI. Phone ${phone}`
window.open(`https://wa.me/2348012345678?text=${africanMsg}`,'_blank')
setTimeout(()=>window.open(`https://wa.me/2348098765432?text=${qimaMsg}`,'_blank'),1000)
