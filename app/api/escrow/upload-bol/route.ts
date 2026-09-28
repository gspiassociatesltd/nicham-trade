import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
export async function POST(req: NextRequest){
  const { order_id, bol_number } = await req.json()
  const { data, error } = await supabase.from('escrow_documents').insert({
    order_id, type:'bill_of_lading', bol_number, file_name: bol_number+'.pdf', file_url: `bol/${order_id}`, verified:true, verified_at: new Date().toISOString(), uploaded_by:'africanies'
  }).select().single()
  if(error) return NextResponse.json({error}, {status:400})
  // Trigger auto 40%
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://nicham-trade.vercel.app'
  await fetch(`${site}/api/escrow/auto-release`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ order_id, milestone:'bol_40' }) }).catch(()=>{})
  return NextResponse.json({ success:true, document: data })
}
