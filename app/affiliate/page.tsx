"use client"
import Link from 'next/link'
export default function Affiliate(){
  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      <header className="bg-white border-b"><div className="max-w-4xl mx-auto px-4 py-3"><Link href="/" className="text-xs border px-4 py-2 rounded-full">← Marketplace</Link></div></header>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="font-black text-xl">Affiliate Program</h1>
        <div className="text-xs text-gray-500">Share product link, earn when someone orders.</div>
        <div className="mt-4 bg-purple-600 text-white rounded-2xl p-6">
          <div className="font-black text-lg">Earn 2% per sale</div>
          <div className="text-xs mt-1">Your referral link:</div>
          <div className="mt-2 bg-white text-black rounded-full px-4 py-2 text-xs">https://nicham-trade.vercel.app?ref=GSPI-{Math.floor(Math.random()*9000)+1000}</div>
        </div>
      </div>
    </div>
  )
}
