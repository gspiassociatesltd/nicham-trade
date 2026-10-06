
export interface ProductButton {
  id: string
  name: string
  links: { motoma: string, alibaba: string, madeinchina: string }
  active: boolean
}

export const DEFAULT_BUTTONS: ProductButton[] = [
  { id: "btn_25v", name: "25.6V Residential Batteries", links: { motoma: "https://www.motoma.com/25-6v-residential", alibaba: "https://www.alibaba.com/showroom/25.6v-lifepo4-battery.html", madeinchina: "https://www.made-in-china.com/products-search/hot-china-products/25.6v_Battery.html" }, active: true },
  { id: "btn_51v", name: "51.2V Popular Batteries", links: { motoma: "https://www.motoma.com/51-2v-residential", alibaba: "https://www.alibaba.com/showroom/51.2v-lifepo4-battery.html", madeinchina: "https://www.made-in-china.com/products-search/hot-china-products/51.2v_Battery.html" }, active: true },
  { id: "btn_hv", name: "High Voltage & C&I ESS", links: { motoma: "https://www.motoma.com/hv-ess", alibaba: "https://www.alibaba.com/showroom/high-voltage-lifepo4.html", madeinchina: "https://www.made-in-china.com/products-search/hot-china-products/High_Voltage_Battery.html" }, active: true },
  { id: "btn_inverter", name: "Solar Inverters", links: { motoma: "", alibaba: "https://www.alibaba.com/showroom/solar-inverter.html", madeinchina: "https://www.made-in-china.com/products-search/hot-china-products/Solar_Inverter.html" }, active: true },
  { id: "btn_chemicals", name: "Industrial Chemicals", links: { motoma: "", alibaba: "https://www.alibaba.com/showroom/caustic-soda.html", madeinchina: "https://www.made-in-china.com/products-search/hot-china-products/Caustic_Soda.html" }, active: true },
]
