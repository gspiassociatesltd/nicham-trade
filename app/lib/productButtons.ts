export interface ProductButton {
  id: string
  name: string
  links: { motoma: string; alibaba: string; madeinchina: string }
  active: boolean
}

export const DEFAULT_BUTTONS: ProductButton[] = [
  { id: 'btn_batteries', name: 'Solar Batteries', links: { motoma: 'https://www.motoma.com/energy-storage-battery', alibaba: 'https://www.alibaba.com/showroom/lifepo4-battery-51.2v-200ah.html', madeinchina: 'https://www.made-in-china.com/products-search/hot-china-products/Lifepo4_Battery.html' }, active: true },
  { id: 'btn_inverters', name: 'Solar Inverters', links: { motoma: 'https://www.motoma.com/hybrid-inverter', alibaba: 'https://www.alibaba.com/showroom/hybrid-solar-inverter-5kw.html', madeinchina: 'https://www.made-in-china.com/products-search/hot-china-products/Hybrid_Inverter.html' }, active: true },
  { id: 'btn_agri', name: 'Agri Solar Products', links: { motoma: 'https://www.alibaba.com/showroom/solar-water-pump.html', alibaba: 'https://www.alibaba.com/showroom/solar-water-pump-system.html', madeinchina: 'https://www.made-in-china.com/products-search/hot-china-products/Solar_Water_Pump.html' }, active: true },
  { id: 'btn_ebikes', name: 'Solar Bikes', links: { motoma: 'https://www.alibaba.com/showroom/electric-bike.html', alibaba: 'https://www.alibaba.com/showroom/electric-cargo-bike.html', madeinchina: 'https://www.made-in-china.com/products-search/hot-china-products/Electric_Bike.html' }, active: true },
  { id: 'btn_pharma', name: 'Industrial Chemicals - Pharmaceuticals', links: { motoma: 'https://www.alibaba.com/showroom/paracetamol-powder.html', alibaba: 'https://www.alibaba.com/showroom/sorbitol-powder.html', madeinchina: 'https://www.made-in-china.com/products-search/hot-china-products/Paracetamol_Powder.html' }, active: true },
  { id: 'btn_commodity', name: 'Industrial Chemicals - Commodity Chemicals', links: { motoma: 'https://www.alibaba.com/showroom/caustic-soda-flakes.html', alibaba: 'https://www.alibaba.com/showroom/hydrochloric-acid.html', madeinchina: 'https://www.made-in-china.com/products-search/hot-china-products/Caustic_Soda.html' }, active: true },
  { id: 'btn_paint', name: 'Industrial Chemicals - Paint Chemicals', links: { motoma: 'https://www.alibaba.com/showroom/natrosol.html', alibaba: 'https://www.alibaba.com/showroom/calcium-carbonate-powder.html', madeinchina: 'https://www.made-in-china.com/products-search/hot-china-products/Calcium_Carbonate.html' }, active: true },
  { id: 'btn_water', name: 'Industrial Chemicals - Water Treatment', links: { motoma: 'https://www.alibaba.com/showroom/soda-ash.html', alibaba: 'https://www.alibaba.com/showroom/calcium-hypochlorite.html', madeinchina: 'https://www.made-in-china.com/products-search/hot-china-products/Poly_Aluminum_Chloride.html' }, active: true }
]

let buttonsStore: ProductButton[] = [...DEFAULT_BUTTONS]
export function getButtons() { return buttonsStore }
export function setButtons(buttons: ProductButton[]) { buttonsStore = buttons; return buttonsStore }
export function getButtonById(id: string) { return buttonsStore.find(b => b.id === id) }
