
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest){
  const formData = await req.formData()
  const order_id = formData.get('order_id') as string
  const file = formData.get('file') as File
  const bol_number = formData.get('bol_number') as string

  // In production, upload file to Supabase Storage
  // For MVP, we store file name and mark as pending verification
  // AfricanIES uploads BOL -> System verifies -> Auto triggers 40% payout

  const { data, error } = await supabase.from('escrow_documents').insert({
    order_id,
    type: 'bill_of_lading',
    file_name: file?.name || 'bol.pdf',
    bol_number,
    file_url: `https://storage.nicham-trade.com/bol/${order_id}/${file?.name}`,
    verified: false, // Will be verified by OCR or admin quick check, then auto-release triggers
    uploaded_by: 'africanies',
    created_at: new Date().toISOString()
  }).select().single()

  if(error) return NextResponse.json({error}, {status:400})

  // Auto-verify for MVP (in production, use OCR to verify BOL number)
  await supabase.from('escrow_documents').update({ verified: true, verified_at: new Date().toISOString() }).eq('id', data.id)

  // Trigger auto 40% release
  const autoRelease = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/escrow/auto-release`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order_id, milestone: 'bol_40' })
  }).then(r=>r.json()).catch(()=>({success:false}))

  return NextResponse.json({ success:true, document: data, autoRelease })
}
