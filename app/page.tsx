// For MOTOMA products
const motomaWhatsApp = (productName: string) => {
  const msg = `Hi MOTOMA Dubai Team 🇦🇪\n\nRFQ for ${productName}\n\n- DDP Lagos, Nigeria\n- DDP to Premises Minna\n- NiChAm Trade\n\nPlease send DDP price with shipping.`
  return `https://wa.me/971525803914?text=${encodeURIComponent(msg)}`
}

// For MUST products
const mustWhatsApp = (productName: string) => {
  const msg = `Hi MUST Factory Team 🇨🇳\n\nRFQ for ${productName}\n\n- DDP Lagos, Nigeria\n- Mix MOQ Policy: 3 inverters + 2 batteries = 5 units price\n- NiChAm Trade Minna\n\nPlease send DDP price.`
  return `https://wa.me/8618924343876?text=${encodeURIComponent(msg)}`
}

// Button in card:
<button 
  onClick={() => {
    // Admin notified – log to supabase
    supabase.from('rfq_logs').insert({
      product: productName,
      brand: product.brand, // MOTOMA or MUST
      ddp: 'Lagos, Nigeria',
      timestamp: new Date()
    })
    window.open(brand === 'MOTOMA' ? motomaWhatsApp(productName) : mustWhatsApp(productName), '_blank')
  }}
  className="w-full bg-slate-900 text-white rounded-xl py-3 font-bold hover:bg-black"
>
  Request for Quote – DDP Lagos
</button>
