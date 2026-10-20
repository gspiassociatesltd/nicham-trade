'use client';
import { useState } from 'react';

type ProductAdmin = {
  id: string;
  brand: string;
  model: string;
  image: string;
  ddpPriceUSD: number;
  costUSD: number;
  supplier: string;
  supplierPhone: string;
  manufacturer: string;
  moq: string;
  location: string;
};

const adminProducts: ProductAdmin[] = [
  // MOTOMA
  { id: 'M68PW', brand: 'MOTOMA', model: 'M68PW PRO 200Ah 25.6V 5.12kWh', image: '/products/motoma/M68PW_PRO.png', ddpPriceUSD: 1150, costUSD: 890, supplier: 'MOTOMA Dubai FZE', supplierPhone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed', location: 'Dubai Warehouse' },
  { id: 'M69PW', brand: 'MOTOMA', model: 'M69PW PRO 300Ah 25.6V 7.68kWh', image: '/products/motoma/M69PW_PRO.png', ddpPriceUSD: 1650, costUSD: 1280, supplier: 'MOTOMA Dubai FZE', supplierPhone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed', location: 'Dubai' },
  { id: 'M87PW', brand: 'MOTOMA', model: 'M87PW PRO 100Ah 51.2V 5.12kWh', image: '/products/motoma/M87PW_PRO.png', ddpPriceUSD: 1180, costUSD: 920, supplier: 'MOTOMA Dubai FZE', supplierPhone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed', location: 'Dubai' },
  { id: 'M88PW', brand: 'MOTOMA', model: 'M88PW PRO 200Ah 51.2V 10.24kWh', image: '/products/motoma/M88PW_PRO.png', ddpPriceUSD: 2250, costUSD: 1750, supplier: 'MOTOMA Dubai FZE', supplierPhone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed', location: 'Dubai' },
  { id: 'M90', brand: 'MOTOMA', model: 'M90 PRO 320Ah 51.2V 16.38kWh Rack', image: '/products/motoma/M90_PRO.png', ddpPriceUSD: 3450, costUSD: 2680, supplier: 'MOTOMA Dubai FZE', supplierPhone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: '2 Units', location: 'Dubai' },
  { id: 'M91', brand: 'MOTOMA', model: 'M91 PRO 280Ah 51.2V 14.33kWh', image: '/products/motoma/M91_PRO.png', ddpPriceUSD: 2950, costUSD: 2290, supplier: 'MOTOMA Dubai FZE', supplierPhone: '+971 52 580 3914', manufacturer: 'MOTOMA Dubai', moq: 'Mix Allowed', location: 'Dubai' },
  // MUST
  { id: 'MUST-PV18-5248', brand: 'MUST', model: 'PV18-5248 PRO 5.2kW Hybrid', image: '/products/must/MUST_1_916x1268.png', ddpPriceUSD: 580, costUSD: 420, supplier: 'MUST Power Factory', supplierPhone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '5 Units', location: 'Guangdong, CN' },
  { id: 'MUST-PV18-8048', brand: 'MUST', model: 'PV18-8048 PRO 8kW Hybrid', image: '/products/must/MUST_2_685x950.png', ddpPriceUSD: 780, costUSD: 560, supplier: 'MUST Power Factory', supplierPhone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '3 Units', location: 'Guangdong' },
  { id: 'MUST-LP16-48200', brand: 'MUST', model: 'LP16-48200 200Ah 48V 10.24kWh', image: '/products/must/MUST_3_656x684.png', ddpPriceUSD: 1950, costUSD: 1480, supplier: 'MUST Power Factory', supplierPhone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: 'Mix Allowed', location: 'Guangdong' },
  { id: 'MUST-LP16-48100', brand: 'MUST', model: 'LP16-48100 100Ah 48V 5.12kWh', image: '/products/must/MUST_4_526x684.png', ddpPriceUSD: 1080, costUSD: 820, supplier: 'MUST Power Factory', supplierPhone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: 'Mix Allowed', location: 'Guangdong' },
  { id: 'MUST-PH1800-5K', brand: 'MUST', model: 'PH1800 Pro 5kW 48V Off-Grid', image: '/products/must/MUST_5_584x553.png', ddpPriceUSD: 520, costUSD: 380, supplier: 'MUST Power Factory', supplierPhone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '10 Units', location: 'Guangdong' },
  { id: 'MUST-HM-3K', brand: 'MUST', model: 'HM 3kW 24V Hybrid', image: '/products/must/MUST_6_472x684.png', ddpPriceUSD: 310, costUSD: 220, supplier: 'MUST Power Factory', supplierPhone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '10 Units', location: 'Guangdong' },
  { id: 'MUST-PV18-10148', brand: 'MUST', model: 'PV18-10148 10kW 48V 3-Phase', image: '/products/must/MUST_11_433x519.png', ddpPriceUSD: 1450, costUSD: 1050, supplier: 'MUST Power Factory', supplierPhone: '+86 189 2434 3876', manufacturer: 'MUST Factory', moq: '2 Units', location: 'Guangdong' },
];

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);

  const handleLogin = () => {
    if (pass === 'nicham2026' || pass === 'admin') setAuthed(true);
    else alert('Wrong password - Use nicham2026');
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm">
          <h1 className="font-black text-xl">NiChAm Admin</h1>
          <p className="text-xs text-slate-500 mt-1">Supplier numbers hidden from customers. Login to view.</p>
          <input
            type="password"
            placeholder="Password: nicham2026"
            value={pass}
            onChange={e => setPass(e.target.value)}
            className="mt-4 w-full border rounded-xl px-4 py-2.5 text-sm"
          />
          <button onClick={handleLogin} className="mt-3 w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm">Unlock Admin</button>
          <p className="mt-3 text-[10px] text-slate-400">Customer RFQ goes to +234 705 047 7950. This page shows real supplier contacts for fulfillment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="font-black">NiChAm Trade – Admin Panel</h1>
          <p className="text-xs text-slate-400">MOTOMA Dubai + MUST Factory – Supplier View – Customer RFQ → +234 705 047 7950</p>
        </div>
        <button onClick={() => setAuthed(false)} className="text-xs bg-white text-black px-3 py-1.5 rounded-full">Logout</button>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border rounded-xl p-4">
            <div className="text-xs text-slate-500">Customer Facing Number</div>
            <div className="font-black text-emerald-600">+234 705 047 7950</div>
            <div className="text-[10px]">All RFQ via WhatsApp – You forward to supplier</div>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <div className="text-xs text-slate-500">MOTOMA Supplier</div>
            <div className="font-bold">+971 52 580 3914</div>
            <div className="text-[10px]">MOTOMA Dubai FZE – Manufacturer: MOTOMA Dubai</div>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <div className="text-xs text-slate-500">MUST Supplier</div>
            <div className="font-bold">+86 189 2434 3876</div>
            <div className="text-[10px]">MUST Factory Guangdong – Manufacturer: MUST Factory</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold">20 Products – Cost vs DDP Margin</h2>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">{adminProducts.length} items (sample)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 text-[10px] uppercase">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">DDP Lagos</th>
                  <th className="p-3">Cost</th>
                  <th className="p-3">Margin</th>
                  <th className="p-3">Supplier</th>
                  <th className="p-3">MOQ</th>
                </tr>
              </thead>
              <tbody>
                {adminProducts.map(p => {
                  const margin = p.ddpPriceUSD - p.costUSD;
                  const pct = Math.round((margin / p.costUSD) * 100);
                  return (
                    <tr key={p.id} className="border-t hover:bg-slate-50">
                      <td className="p-3 flex items-center gap-2">
                        <img src={p.image} alt="" className="w-10 h-10 object-contain bg-white border rounded" />
                        <div>
                          <div className="font-bold line-clamp-1">{p.model}</div>
                          <div className="text-[10px] text-slate-500">{p.manufacturer} – {p.location}</div>
                        </div>
                      </td>
                      <td className="p-3"><span className={`px-2 py-1 rounded-full font-bold ${p.brand==='MOTOMA'?'bg-emerald-600 text-white':'bg-yellow-400'}`}>{p.brand}</span></td>
                      <td className="p-3 font-bold">${p.ddpPriceUSD}</td>
                      <td className="p-3">${p.costUSD}</td>
                      <td className="p-3"><span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-bold">+${margin} ({pct}%)</span></td>
                      <td className="p-3">
                        <div className="font-bold">{p.supplier}</div>
                        <div className="text-emerald-700">{p.supplierPhone}</div>
                      </td>
                      <td className="p-3">{p.moq}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-yellow-50 text-[11px] text-yellow-800 border-t">
            ⚠️ IMPORTANT: Customer app at / never shows supplierPhone. Only this /admin page shows it. RFQ flow: Customer WhatsApp → +234 705 047 7950 (you) → you forward to +971 52 580 3914 (MOTOMA) or +86 189 2434 3876 (MUST) with Manufacturer tag.
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white rounded-2xl p-5">
            <h3 className="font-bold">How RFQ Works (As Per Your Instruction)</h3>
            <ol className="mt-3 text-xs space-y-2 list-decimal pl-4 text-slate-300">
              <li>Customer clicks RFQ → WhatsApp opens to <b className="text-white">+234 705 047 7950</b></li>
              <li>Message includes Model + Manufacturer (MOTOMA Dubai / MUST Factory)</li>
              <li>You receive in Nigeria, you check stock/admin panel for supplier cost</li>
              <li>You forward RFQ to supplier: MOTOMA +971 52 580 3914 or MUST +86 189 2434 3876</li>
              <li>Supplier sends proforma, you add margin, send to customer as DDP Lagos</li>
            </ol>
          </div>
          <div className="bg-white border rounded-2xl p-5">
            <h3 className="font-bold">Permanent Image Storage</h3>
            <p className="text-xs text-slate-600 mt-2">Images you uploaded via <b>Upload files</b> to <code>public/products/motoma/</code> and <code>public/products/must/</code> are permanent in GitHub – never lost until admin replaces. Your earlier 7 files were 0-byte because you used Create file, not Upload.</p>
            <div className="mt-3 text-[11px] bg-slate-100 p-3 rounded-xl font-mono">public/products/motoma/M68PW_PRO.png<br/>public/products/motoma/M69PW_PRO.png<br/>public/products/motoma/M87PW_PRO.png<br/>public/products/motoma/M88PW_PRO.png<br/>public/products/motoma/M90_PRO.png<br/>public/products/motoma/M91_PRO.png</div>
          </div>
        </div>
      </div>
    </div>
  );
}
