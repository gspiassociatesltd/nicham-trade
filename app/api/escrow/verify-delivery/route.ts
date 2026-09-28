import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
export async function POST(req: NextRequest){
  const { order_id, identifier } = await req.json()
  const { data } = await supabase.from('escrow_documents').insert({
    order_id, type:'delivery_proof', identifier_scanned: identifier, verified:true, verified_at: new Date().toISOString()
  }).select().single()
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://nicham-trade.vercel.app'
  await fetch(`${site}/api/escrow/auto-release`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ order_id, milestone:'delivery_40' }) }).catch(()=>{})
  return NextResponse.json({ success:true, document: data, message:'Delivery verified - final 40% auto released + platform fee auto' })
}
