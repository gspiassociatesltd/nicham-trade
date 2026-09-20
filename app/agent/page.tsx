"use client"
import Link from 'next/link'
export default function Agent(){
  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b"><div className="max-w-4xl mx-auto px-4 py-3"><Link href="/" className="text-xs border px-4 py-2 rounded-full">← Marketplace</Link></div></header>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="font-black text-xl">Agent Dashboard</h1>
        <div className="text-xs text-gray-500">Help farmers/traders who cannot read English. Earn 3% per order.</div>
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <div className="bg-yellow-400 rounded-2xl p-4"><div className="font-black">3% Commission</div><div className="text-xs mt-1">Per successful order via MTN Escrow</div></div>
          <div className="bg-white border rounded-2xl p-4"><div className="font-bold text-sm">How it works</div><div className="text-xs mt-1 text-gray-600">1. Find farmer who needs product<br/>2. Order for them on marketplace<br/>3. Receive 3% via MTN MoMo</div></div>
          <div className="bg-black text-white rounded-2xl p-4"><div className="font-bold">Agent Code</div><div className="text-xs mt-2 bg-white text-black px-3 py-1 rounded-full inline-block">AGENT-{Math.floor(Math.random()*9000)+1000}</div></div>
        </div>
      </div>
    </div>
  )
}
