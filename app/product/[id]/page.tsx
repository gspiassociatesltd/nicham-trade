
'use client'
import { translations } from '../../../lib/i18n'
import { useState } from 'react'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [lang] = useState('en')
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <a href="/" className="text-sm">← Back to Solar Market</a>
      <div className="bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-2xl font-black">Solar Product #{params.id}</h1>
        <p className="mt-2">MTN MoMo Escrow: Buyer pays → AfricanIES verifies → Green Points → MTN Airtime</p>
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
          <h3 className="font-bold">How MTN MoMo Escrow Works</h3>
          <ol className="list-decimal ml-5 text-sm mt-2">
            <li>Buyer pays via MTN MoMo</li>
            <li>Funds held in escrow</li>
            <li>AfricanIES delivers (Last-mile + Cold-chain)</li>
            <li>Buyer confirms → Seller gets paid</li>
            <li>Both earn Green Points → Redeem for MTN Airtime via Ayoba</li>
          </ol>
        </div>
        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-full font-bold">Pay with MTN MoMo</button>
      </div>
    </main>
  )
}
