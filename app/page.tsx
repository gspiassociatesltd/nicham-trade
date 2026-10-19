"use client";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: "solar" | "chemical";
  spec: string;
  image?: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: "MOTOMA M68PW", brand: "MOTOMA", category: "solar", spec: "5.12kWh / 51.2V 100Ah Wall-Mounted LiFePO4", image: "/solar/motoma-m68pw.png" },
  { id: 2, name: "MOTOMA M69PW", brand: "MOTOMA", category: "solar", spec: "10.24kWh / 51.2V 200Ah Wall-Mounted LiFePO4", image: "/solar/motoma-m69pw.png" },
  { id: 3, name: "MOTOMA M87PW", brand: "MOTOMA", category: "solar", spec: "5.12kWh / 51.2V 100Ah Rack-Mounted LiFePO4", image: "/solar/motoma-m87pw.png" },
  { id: 4, name: "MOTOMA M88PW", brand: "MOTOMA", category: "solar", spec: "10.24kWh / 51.2V 200Ah Rack-Mounted LiFePO4", image: "/solar/motoma-m88pw.png" },
  { id: 5, name: "MUST PV18-3224 VHM", brand: "MUST", category: "solar", spec: "3.2kW 24V Hybrid Inverter, MPPT 100A, WiFi", image: "/solar/must-pv18-3224.png" },
  { id: 6, name: "MUST PV18-3624 VHM", brand: "MUST", category: "solar", spec: "3.6kW 24V Hybrid Inverter, MPPT 120A, WiFi", image: "/solar/must-pv18-3624.png" },
  { id: 7, name: "MUST PV18-6048 VHM", brand: "MUST", category: "solar", spec: "6kW 48V Hybrid Inverter, MPPT 100A, Parallel", image: "/solar/must-pv18-6048.png" },
  { id: 8, name: "MUST PV19-10048 EXP", brand: "MUST", category: "solar", spec: "10kW 48V Hybrid Inverter, Expansion Parallel up to 9", image: "/solar/must-pv18-6048.png" },
  { id: 9, name: "MUST PH11-10KL1", brand: "MUST", category: "solar", spec: "10kW 48V Off-Grid Inverter, Single Phase, MPPT", image: "/solar/must-pv18-6048.png" },
  { id: 10, name: "MUST PH11-15KL3", brand: "MUST", category: "solar", spec: "15kW 48V Off-Grid Inverter, 3-Phase, Dual MPPT", image: "/solar/must-pv18-6048.png" },
  { id: 11, name: "MUST LP16-24200", brand: "MUST", category: "solar", spec: "2.56kWh 25.6V 100Ah LiFePO4 – Wall Mount", image: "/solar/must-lp16-48100se.png" },
  { id: 12, name: "MUST LP16-24300", brand: "MUST", category: "solar", spec: "7.68kWh 25.6V 300Ah LiFePO4 Battery", image: "/solar/must-lp16-48100se.png" },
  { id: 13, name: "MUST LP16-48100 SE", brand: "MUST", category: "solar", spec: "5.12kWh 51.2V 100Ah LiFePO4 – SE Edition", image: "/solar/must-lp16-48100se.png" },
  { id: 14, name: "MUST LP16-48200", brand: "MUST", category: "solar", spec: "10.24kWh 51.2V 200Ah LiFePO4 Battery", image: "/solar/must-lp16-48100se.png" },
  { id: 15, name: "MUST LP16-48300", brand: "MUST", category: "solar", spec: "15.36kWh 51.2V 300Ah LiFePO4 Battery", image: "/solar/must-lp16-48100se.png" },
  { id: 16, name: "MUST HBP15-1012", brand: "MUST", category: "solar", spec: "1kW 12V Hybrid Inverter, MPPT 60A, Lithium Ready", image: "/solar/must-hbp18-5548.png" },
  { id: 17, name: "MUST HBP18-3024", brand: "MUST", category: "solar", spec: "3kW 24V Hybrid Inverter, MPPT 80A", image: "/solar/must-hbp18-5548.png" },
  { id: 18, name: "MUST HBP18-5548", brand: "MUST", category: "solar", spec: "5.5kW 48V Hybrid Inverter, MPPT 100A, WiFi", image: "/solar/must-hbp18-5548.png" },
  { id: 19, name: "Sodium Hydroxide 98% Flakes", brand: "Industrial", category: "chemical", spec: "Caustic Soda – 25kg Bags – High Purity" },
  { id: 20, name: "Sodium Carbonate Dense", brand: "Industrial", category: "chemical", spec: "Soda Ash Dense – 25kg / 50kg Bags" },
  { id: 21, name: "Calcium Chloride 94%", brand: "Industrial", category: "chemical", spec: "Granular / Powder – 25kg Bags" },
  { id: 22, name: "Citric Acid Anhydrous", brand: "Industrial", category: "chemical", spec: "Food Grade – 25kg Bags – E330" },
  { id: 23, name: "Sodium Tripolyphosphate STPP", brand: "Industrial", category: "chemical", spec: "Tech Grade 94% – Detergent Grade" },
  { id: 24, name: "LABSA 96%", brand: "Industrial", category: "chemical", spec: "Linear Alkyl Benzene Sulphonic Acid – 210kg Drum" },
  { id: 25, name: "SLES 70%", brand: "Industrial", category: "chemical", spec: "Sodium Laureth Sulfate – 170kg Drum" },
  { id: 26, name: "Caustic Potash KOH 90%", brand: "Industrial", category: "chemical", spec: "Potassium Hydroxide Flakes – 25kg Bags" },
  { id: 27, name: "Sodium Metabisulphite", brand: "Industrial", category: "chemical", spec: "Food Grade 97% – 25kg Bags" },
  { id: 28, name: "Sodium Bicarbonate", brand: "Industrial", category: "chemical", spec: "Food Grade – 25kg Bags – Baking Soda" },
  { id: 29, name: "Hydrogen Peroxide 50%", brand: "Industrial", category: "chemical", spec: "Industrial Grade – 30kg Carboy" },
  { id: 30, name: "PAC 30% – Poly Aluminium Chloride", brand: "Industrial", category: "chemical", spec: "Water Treatment – 25kg Bags" },
  { id: 31, name: "Sodium Hypochlorite 12%", brand: "Industrial", category: "chemical", spec: "Bleach – IBC / Drum – Water Treatment" },
  { id: 32, name: "Glacial Acetic Acid 99.8%", brand: "Industrial", category: "chemical", spec: "Tech Grade – 30kg Drum / IBC" },
  { id: 33, name: "Oxalic Acid", brand: "Industrial", category: "chemical", spec: "99.6% Powder – 25kg Bags – Cleaning Grade" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<"all" | "solar" | "chemical">("all");
  const filtered = PRODUCTS.filter((p) => (activeTab === "all" ? true : p.category === activeTab));

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black text-white grid place-items-center font-bold text-sm">N</div>
            <div>
              <div className="font-bold tracking-tight leading-none">NiChAm Trade</div>
              <div className="text-[11px] tracking-widest uppercase text-zinc-500">Solar & Industrial Supply</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] border px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            DDP LAGOS – IMPORT & CLEARING INCLUDED
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[0.95]">Power & Chemical Supply. Simplified.</h1>
            <p className="mt-4 text-zinc-600 max-w-xl text-[15px] leading-relaxed">33 verified products. MOTOMA & MUST solar batteries and inverters + industrial chemicals. All prices DDP Lagos – no hidden clearing fees.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={() => setActiveTab("all")} className={`px-4 py-2 text-sm rounded-full border ${activeTab==="all" ? "bg-black text-white border-black" : "bg-white"}`}>All 33 Products</button>
              <button onClick={() => setActiveTab("solar")} className={`px-4 py-2 text-sm rounded-full border ${activeTab==="solar" ? "bg-black text-white border-black" : "bg-white"}`}>Solar Batteries 18</button>
              <button onClick={() => setActiveTab("chemical")} className={`px-4 py-2 text-sm rounded-full border ${activeTab==="chemical" ? "bg-black text-white border-black" : "bg-white"}`}>Industrial Chemical 15</button>
            </div>
          </div>
          <div className="border rounded-2xl p-5 bg-zinc-50">
            <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-3">DDP Lagos Includes</div>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2"><span>✓</span> Import Duty & Customs Clearance</li>
              <li className="flex gap-2"><span>✓</span> Port Charges & Terminal Handling</li>
              <li className="flex gap-2"><span>✓</span> Delivery to Lagos Warehouse</li>
              <li className="flex gap-2"><span>✓</span> No Extra Fees on Arrival</li>
            </ul>
            <div className="mt-4 p-3 bg-white rounded-xl border text-xs text-zinc-600">Request a formal quote – stock and DDP price confirmed within 2 hours.</div>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="border rounded-2xl p-5 bg-white hover:border-black transition">
              <div className="flex justify-between items-start gap-3">
                <div className="text-[11px] tracking-widest uppercase px-2 py-1 bg-zinc-100 rounded-full">{p.brand}</div>
                <div className="text-[10px] tracking-widest uppercase text-zinc-400">{p.category}</div>
              </div>
              <h3 className="mt-4 font-semibold leading-tight">{p.name}</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-snug">{p.spec}</p>
              <div className="mt-5">
                <a href={`https://wa.me/2347050477950?text=Hello%20NiChAm%20Trade%20-%20I%20need%20DDP%20Lagos%20quote%20for%20${encodeURIComponent(p.name)}`} target="_blank" rel="noopener" className="inline-flex w-full justify-center px-4 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-zinc-800">Request for Quote</a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t pt-8 text-center text-xs text-zinc-500">© {new Date().getFullYear()} NiChAm Trade – DDP Lagos Supply</div>
      </section>
    </main>
  );
}
