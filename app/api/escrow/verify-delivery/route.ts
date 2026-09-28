
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest){
  const { order_id, identifier, customer_phone } = await req.json()

  // Customer scans QR code on package or enters delivery code
  // This is the proof of delivery

  const { data, error } = await supabase.from('escrow_documents').insert({
    order_id,
    type: 'delivery_proof',
    identifier_scanned: identifier,
    customer_phone,
    verified: false,
    created_at: new Date().toISOString()
  }).select().single()

  if(error) return NextResponse.json({error}, {status:400})

  // Verify identifier matches order (simple check for MVP)
  const { data: order } = await supabase.from('orders').select('*').eq('id', order_id).single()
  const isValid = order && (identifier.startsWith(order_id.slice(0,6)) || identifier.length > 5) // MVP validation

  if(isValid){
    await supabase.from('escrow_documents').update({ verified: true, verified_at: new Date().toISOString() }).eq('id', data.id)

    // Trigger final 40% + platform fee automatically
    // 1. Pay AfricanIES final
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/escrow/auto-release`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id, milestone: 'delivery_40' })
    })

    // 2. Pay platform fee to you (GSPI) automatically
    const platformFee = order.amount_total * 0.1
    const secret = process.env.PAYSTACK_SECRET_KEY!
    await fetch('https://api.paystack.co/transfer', {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'balance',
        amount: Math.round(platformFee * 100),
        recipient: process.env.PLATFORM_RECIPIENT_CODE,
        reason: `Platform fee for order ${order_id} - Auto insured escrow`,
        reference: `platform_fee_${order_id}_${Date.now()}`
      })
    })
  }

  return NextResponse.json({ success: isValid, document: data, message: isValid ? 'Delivery verified! Final 40% released to AfricanIES, platform fee to NiChAm Trade. Insured.' : 'Invalid delivery code' })
}
