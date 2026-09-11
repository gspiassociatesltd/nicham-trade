'use client'
import { useState, useEffect } from 'react'
import { translations } from '../../../lib/i18n'

const basePrices: any = {1:400000,2:280000,3:240000,4:2200000,5:3400000,6:130000,7:160000,8:1050000,9:250000}

export default function ProductPage({ params }: { params: { id: string } }) {
  const base = basePrices[params.id] || 400000
  const platformFee = Math.round(base * 0.10)
  const vat = Math.round(platformFee * 0.075)
  const escrowFee = Math.round(base * 0.02)
  const greenPoints = Math.round(base * 0.01)
  const total = base + platformFee + vat + escrowFee + greenPoints
  
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <a href="/" className="text-sm">← Back to Solar Market</a>
      <div className="bg-white rounded-2xl shadow p-6 mt-4">
        <h1 className="text-2xl font-black">Solar Product #{params.id}</h1>
        <p className="mt-2 text-sm text-gray-600">Platform Owner: GSPI/NiChAm | Sourcing & Delivery: AfricanIES handles procurement & delivery</p>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm border border-blue-200">
          <h3 className="font-bold">🏢 Platform Model</h3>
          <p className="mt-2">GSPI/NiChAm owns platform only. AfricanIES sources from manufacturers & delivers to buyer in 36 States.</p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm">
          <h3 className="font-bold mb-2">Pricing Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between"><span>AfricanIES Sourced Price</span><span>₦{base.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Platform Fee (10%)</span><span>₦{platformFee.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>VAT on Platform Fee</span><span>₦{vat.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Escrow Fee (2%)</span><span>₦{escrowFee.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Green Points (1%)</span><span>₦{greenPoints.toLocaleString()}</span></div>
            <div className="flex justify-between font-black text-lg border-t pt-2"><span>Customer Pays</span><span>₦{total.toLocaleString()}</span></div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <h3 className="font-bold">🌱 Carbon Mission</h3>
          <p className="text-sm mt-2">This solar product displaces diesel/petrol, saves CO2, earns carbon credits for platform.</p>
        </div>

        <div className="mt-4 bg-black text-yellow-300 p-2 rounded-xl text-xs">🔊 Voice order active - Tap mic button bottom-right, say Yes to order in your language (EN/HA/YO/IG/PIDGIN) - No typing needed per master spec 2.1</div>
        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-full font-bold">Order via Platform - ₦{total.toLocaleString()}</button>
      </div>
    </main>
  )
}
