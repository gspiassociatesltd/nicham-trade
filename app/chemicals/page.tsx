'use client'
import { useState } from 'react'
export default function ChemicalsPage() {
  return (
    <main className="min-h-screen bg-[#f6f7e8] p-4">
      <a href="/" className="text-sm font-bold">← Back to Market</a>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-xl font-black">Industrial Chemicals - 15 Items - China Sourcing</h1>
        <div className="text-xs text-gray-600 mt-1">Same layout as screenshot, chemicals listed under Industrial Chemicals heading. Click any chemical card on homepage goes to WhatsApp quote with perpetual agent ref.</div>
        <div className="mt-4 bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
          <div className="font-bold text-sm">How to share with clients for perpetual commission:</div>
          <div className="text-[11px] mt-1">1. Go to homepage → Click Industrial Chemicals category → Copy link with your ref ?ref=YOURCODE</div>
          <div className="text-[11px]">2. Share on WhatsApp to bulk buyers (soap, water treatment, paint, pharma factories)</div>
          <div className="text-[11px]">3. They click, request quote via WhatsApp, you forward to China friend + AfricanIES</div>
          <div className="text-[11px] font-bold">4. They re-order monthly → You earn 3-5% forever - PERPETUAL</div>
          <a href="/industrial-agent" className="mt-3 inline-block px-4 py-2 bg-yellow-400 text-black rounded-full font-black text-xs">Generate Perpetual Buyer Link</a>
        </div>
        <a href="/" className="mt-6 block w-full py-3 bg-black text-white rounded-full font-black text-center">Back to Clean Layout - All Under Same Headings</a>
      </div>
    </main>
  )
}
