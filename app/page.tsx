'use client'
import { useState, useEffect } from 'react'
import { translations, productTranslations } from '../lib/i18n'
import LangToggle from '../components/LangToggle'
import VoiceOrder from '../components/VoiceOrder'

const productsMeta = [
  { id: 1, basePrice: 400000, co2: 2.2, img: "🚲", category: "Mobility" },
  { id: 2, basePrice: 280000, co2: 3.0, img: "💧", category: "Irrigation" },
  { id: 3, basePrice: 240000, co2: 4.0, img: "❄️", category: "Cold Chain" },
  { id: 4, basePrice: 2200000, co2: 8.5, img: "⚡", category: "Energy" },
  { id: 5, basePrice: 3400000, co2: 6.0, img: "🚜", category: "Mechanization" },
  { id: 6, basePrice: 130000, co2: 1.5, img: "☀️", category: "Processing" },
  { id: 7, basePrice: 160000, co2: 5.0, img: "🛶", category: "Marine" },
  { id: 8, basePrice: 1050000, co2: 5.5, img: "🚤", category: "Marine Logistics" },
  { id: 9, basePrice: 250000, co2: 1.8, img: "🚲‍♂️", category: "Mobility" },
]

function calcTotal(base: number) {
  // Competitive: 10% merchant discount, pass 2% to buyer
  const merchantDiscount = 0.10
  const passToBuyer = 0.02
  const merchantPrice = base * (1 - merchantDiscount)
  const competitivePrice = base * (1 - passToBuyer)
  const vat = Math.round(competitivePrice * 0.075)
  const escrowFee = Math.round(competitivePrice * 0.01)
  return Math.round(competitivePrice + vat + escrowFee)
}
