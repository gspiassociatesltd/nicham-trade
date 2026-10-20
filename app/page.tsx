'use client';
import { useState } from 'react';

type Product = {
  id: string;
  brand: 'MOTOMA' | 'MUST';
  model: string;
  image: string;
  capacity: string;
  voltage: string;
  energy: string;
  cycles: string;
  features: string[];
  manufacturer: string;
};

const products: Product[] = [
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO - 200Ah 25.6V', image: '/products/motoma/M68PW_PRO.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '8000 Cycles @ 80% DoD', features: ['Grade A+ LiFePO4', 'SOC Display', 'WiFi Monitoring', '15 Parallel', '150A Discharge'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO - 300Ah 25.6V', image: '/products/motoma/M69PW_PRO.png', capacity: '300Ah', voltage: '25.6V', energy: '7.68kWh', cycles: '8000 Cycles', features: ['Grade A+ Cells', 'Touch Screen', 'RS485/CAN/RS232', '7 Years Warranty'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO - 100Ah 51.2V', image: '/products/motoma/M87PW_PRO.png', capacity: '100Ah', voltage: '51.2V', energy: '5.12kWh', cycles: '8000 Cycles', features: ['Wall Mount', 'Grade A+ Fresh LiFePO4', 'Heat Resilience 60°C', 'Superior Safety BMS'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO - 200Ah 51.2V', image: '/products/motoma/M88PW_PRO.png', capacity: '200Ah', voltage: '51.2V', energy: '10.24kWh', cycles: '8000 Cycles', features: ['10kWh Power Wall', '150A Continuous', 'WiFi + Touch', 'Multi-Inverter Compatible'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO - 320Ah 51.2V Rack', image: '/products/motoma/M90_PRO.png', capacity: '320Ah', voltage: '51.2V', energy: '16.38kWh', cycles: '8000 Cycles', features: ['Rack Mount 19"', 'Commercial Use', 'High Current 200A', 'CAN/RS485'], manufacturer: 'MOTOMA Dubai' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO - 280Ah 51.2V', image: '/products/motoma/M91_PRO.png', capacity: '280Ah', voltage: '51.2V', energy: '14.33kWh', cycles: '8000 Cycles', features: ['High Capacity', 'Lifetime Tech Support', 'Smart BMS', 'EPS/UPS Ready'], manufacturer: 'MOTOMA Dubai' },
  { id: 'MUST-PV18-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid Inverter', image: '/products/must/MUST_1_916x1268.png', capacity: '5.2kW', voltage: '48V', energy: 'MPPT 100A', cycles: 'Pure Sine Wave', features: ['WiFi Monitoring', 'Parallel up to 9', 'LiFePO4 Compatible', 'Touch LCD'], manufacturer: 'MUST Factory' },
  { id: 'MUST-PV18-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid', image: '/products/must/MUST_2_685x950.png', capacity: '8kW', voltage: '48V', energy: 'MPPT 120A', cycles: 'On/Off Grid', features: ['Dual MPPT', 'High PV 500V', 'BMS Communication', 'IP20'], manufacturer: 'MUST Factory' },
  { id: 'MUST-LP16-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V Wall Battery', image: '/products/must/MUST_3_656x684.png', capacity: '200Ah', voltage: '48V', energy: '10.24kWh', cycles: '6000 Cycles', features: ['Wall Mount', 'Grade A Cells', '6000 Cycles', 'RS485/CAN'], manufacturer: 'MUST Factory' },
  { id: 'MUST-LP16-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V Battery', image: '/products/must/MUST_4_526x684.png', capacity: '100Ah', voltage: '48V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['Compact Wall', '5kWh Module', 'Parallel 16pcs', '5Y Warranty'], manufacturer: 'MUST Factory' },
  { id: 'MUST-PH1800-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V Off-Grid', image: '/products/must/MUST_5_584x553.png', capacity: '5kW', voltage: '48V', energy: 'MPPT 80A', cycles: 'Transformer Based', features: ['Heavy Duty', 'Pure Sine', 'LCD Display', 'Dust Proof'], manufacturer: 'MUST Factory' },
  { id: 'MUST-HM-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', image: '/products/must/MUST_6_472x684.png', capacity: '3kW', voltage: '24V', energy: 'MPPT 60A', cycles: 'Hybrid', features: ['Budget Best Seller', 'WiFi Optional', 'Lithium Ready', 'LCD'], manufacturer: 'MUST Factory' },
  { id: 'MUST-LP20-24100', brand: 'MUST', model: 'LP20-24100 100Ah 24V', image: '/products/must/MUST_7_468x553.png', capacity: '100Ah', voltage: '25.6V', energy: '2.56kWh', cycles: '6000 Cycles', features: ['24V System', '2.5kWh', 'Wall/Floor', 'BMS Built-in'], manufacturer: 'MUST Factory' },
  { id: 'MUST-PV3500', brand: 'MUST', model: 'PV3500 3.5kW 24V', image: '/products/must/MUST_8_453x570.png', capacity: '3.5kW', voltage: '24V', energy: 'MPPT 100A', cycles: 'High PV 450V', features: ['High PV Input', 'Parallel Ready', 'Smart LCD', 'Lithium Activation'], manufacturer: 'MUST Factory' },
  { id: 'MUST-EP3000', brand: 'MUST', model: 'EP3000 Plus 3kW Pro', image: '/products/must/MUST_9_437x587.png', capacity: '3kW', voltage: '24V/48V', energy: 'Off-Grid', cycles: '80A MPPT', features: ['Pure Sine', 'Transformer', 'Wide PV Range', 'UPS Function'], manufacturer: 'MUST Factory' },
  { id: 'MUST-LP16-24200', brand: 'MUST', model: 'LP16-24200 200Ah 24V', image: '/products/must/MUST_10_446x553.png', capacity: '200Ah', voltage: '25.6V', energy: '5.12kWh', cycles: '6000 Cycles', features: ['24V Large', '5kWh', 'Heavy Duty BMS', '10Y Design Life'], manufacturer: 'MUST Factory' },
  { id: 'MUST-PV18-10148', brand: 'MUST', model: 'PV18-10148 10kW 48V 3-Phase', image: '/products/must/MUST_11_433x519.png', capacity: '10kW', voltage: '48V', energy: 'MPPT 2x100A', cycles: '3 Phase Option', features: ['10kW Hybrid', 'Dual MPPT', 'Parallel 9', 'Industrial'], manufacturer: 'MUST Factory' },
  { id: 'MUST-CC-60A', brand: 'MUST', model: 'MPPT 60A Charge Controller', image: '/products/must/RENDER_PAGE_1.png', capacity: '60A', voltage: '12/24/48V', energy: 'Max PV 190V', cycles: 'Controller', features: ['LCD', 'Lithium Profile', 'RS485', 'High Efficiency 99%'], manufacturer: 'MUST Factory' },
  { id: 'MUST-PC-3KVA', brand: 'MUST', model: 'PC18-3024 3kVA UPS Inverter', image: '/products/must/RENDER_PAGE_2.png', capacity: '3kVA', voltage: '24V', energy: 'Pure Sine', cycles: 'UPS Mode', features: ['UPS + Charger', 'AVR', 'Generator Ready', 'LCD'], manufacturer: 'MUST Factory' },
  { id: 'MUST-LP16-4850', brand: 'MUST', model: 'LP16-4850 50Ah 48V Slim', image: '/products/must/MUST_3_656x684.png', capacity: '50Ah', voltage: '48V', energy: '2.56kWh', cycles: '6000 Cycles', features: ['Slim Design', '2.5kWh', 'Stackable', 'Entry Level'], manufacturer: 'MUST Factory' },
];

export default function Page() {
  const [filter, setFilter] = useState<'ALL' | 'MOTOMA' | 'MUST'>('ALL');
  const [toast, setToast] = useState<string | null>(null);

  const filtered = products.filter(p => filter === 'ALL' || p.brand === filter);

  const handleRFQ = (product: Product) => {
    const message = `Hello NiChAm Trade - Powering Nigeria%0A%0A*RFQ Request*%0AModel: ${product.model}%0ABrand: ${product.brand}%0ACapacity: ${product.capacity} ${product.voltage} (${product.energy})%0AManufacturer: ${product.manufacturer}%0A%0APlease send proforma + availability.`;
    const waNumber = '2347050477950';
    const waUrl = `https://wa.me/${waNumber}?text=${message}`;
    window.open(waUrl, '_blank');
    setToast(`RFQ sent for ${product.model} – Admin notified`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl">
          ✅ {toast}
        </div>
      )}

      <header className="sticky top-0 z-40 backdrop-blur bg-white/90 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-yellow-500 flex items-center justify-center text-white font-black">N</div>
            <div>
              <h1 className="font-black text-xl leading-none">NiChAm Trade</h1>
              <p className="text-xs text-emerald-700 font-semibold">Powering Nigeria – Solar & Storage</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <span className="bg-slate-100 px-3 py-1 rounded-full">MOTOMA Dubai + MUST Factory</span>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-3">⚡ 20 Products Ready</div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            MOTOMA Grade A+ <span className="text-emerald-600">8000 Cycles</span> & MUST Hybrid Inverters
          </h2>
          <p className="mt-3 text-slate-600">Wall mount, rack mount, hybrid inverters. Professional solar & storage solutions for Nigeria.</p>
          <div className="mt-6 flex gap-2">
            <button onClick={() => setFilter('MOTOMA')} className={`px-5 py-2.5 rounded-xl font-bold ${filter==='MOTOMA' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'}`}>MOTOMA 6</button>
            <button onClick={() => setFilter('MUST')} className={`px-5 py-2.5 rounded-xl font-bold ${filter==='MUST' ? 'bg-yellow-500 text-black' : 'bg-white border'}`}>MUST 14</button>
            <button onClick={() => setFilter('ALL')} className={`px-5 py-2.5 rounded-xl font-bold ${filter==='ALL' ? 'bg-slate-900 text-white' : 'bg-white border'}`}>All 20</button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-yellow-400 rounded-3xl p-1">
          <div className="bg-white rounded-[22px] p-4">
            <img src="/products/motoma/M68PW_PRO.png" alt="MOTOMA" className="w-full h-64 object-contain" />
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-black">M68PW PRO Best Seller</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">200Ah 25.6V 5.12kWh</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div key={p.id} className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="relative bg-gradient-to-b from-slate-50 to-white p-4 h-56 flex items-center justify-center">
                <span className={`absolute top-3 left-3 text-[10px] font-black px-2 py-1 rounded-full ${p.brand==='MOTOMA' ? 'bg-emerald-600 text-white' : 'bg-yellow-400 text-black'}`}>{p.brand}</span>
                <span className="absolute top-3 right-3 text-[10px] bg-slate-900 text-white px-2 py-1 rounded-full">Mix Allowed</span>
                <img
                  src={p.image}
                  alt={p.model}
                  className="max-h-44 object-contain group-hover:scale-105 transition"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/products/must/RENDER_PAGE_1.png'; }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm leading-tight line-clamp-2">{p.model}</h3>
                <div className="mt-2 flex gap-1.5 flex-wrap">
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">{p.capacity}</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">{p.voltage}</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full">{p.energy}</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{p.cycles}</span>
                </div>
                <div className="mt-3 space-y-1">
                  {p.features.slice(0,3).map(f => (
                    <div key={f} className="text-[11px] text-slate-600 flex gap-1"><span className="text-emerald-600">✓</span> {f}</div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="text-[11px] text-slate-500">Manufacturer</div>
                  <div className="text-xs font-semibold">{p.manufacturer}</div>
                </div>

                <button
                  onClick={() => handleRFQ(p)}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-sm"
                >
                  Request RFQ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4 text-sm">
          <div>
            <b>NiChAm Trade – Powering Nigeria</b><br/>
            <span className="text-slate-400">MOTOMA Dubai + MUST Factory | GSPI Associates Ltd</span>
          </div>
          <div className="text-slate-400 text-xs">
            Professional Solar & Storage Solutions<br/>
            Minna • Abuja • Lagos
          </div>
        </div>
      </footer>
    </div>
  );
}
