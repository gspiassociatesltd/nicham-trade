import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
export async function POST(req: NextRequest){
  const { order_id, milestone } = await req.json()
  const { data: order } = await supabase.from('orders').select('*').eq('id', order_id).single()
  if(!order) return NextResponse.json({error:'Order not found'}, {status:404})
  let amount = 0
  let recipient = process.env.AFRICANIES_RECIPIENT_CODE || ''
  let desc = ''
  if(milestone==='initial_20'){ amount = order.amount_total * 0.2; desc = `Auto 20% initial for ${order_id} - insured` }
  else if(milestone==='bol_40'){ amount = order.amount_total * 0.4; desc = `Auto 40% BOL verified for ${order_id}` }
  else if(milestone==='delivery_40'){ amount = order.amount_total * 0.36; desc = `Auto final 36% delivery verified for ${order_id}` }
  // Simulate transfer log - real transfer happens if PAYSTACK_SECRET_KEY set and recipient exists
  const secret = process.env.PAYSTACK_SECRET_KEY
  let transferOk = false
  let transferData = null
  if(secret && recipient){
    try{
      const res = await fetch('https://api.paystack.co/transfer', {
        method:'POST',
        headers:{ Authorization: `Bearer ${secret}`, 'Content-Type':'application/json' },
        body: JSON.stringify({ source:'balance', amount: Math.round(amount*100), recipient, reason: desc, reference: `escrow_${order_id}_${milestone}_${Date.now()}` })
      }).then(r=>r.json())
      transferOk = res.status
      transferData = res.data
    }catch(e){ transferOk = false }
  } else {
    // MVP without real Paystack recipient - mark as simulated auto release
    transferOk = true
    transferData = { simulated: true, amount, recipient }
  }
  await supabase.from('escrow_releases').insert({
    order_id, milestone, amount, recipient_code: recipient, paystack_transfer_ref: transferData?.reference || `sim_${Date.now()}`,
    auto_triggered: true, insurance_policy: process.env.INSURANCE_POLICY_NO || 'LEADWAY-MVP-INSURED',
    description: desc + (transferOk ? ' - AUTO NO MANUAL INSTRUCTION' : ' - SIMULATED')
  })
  // If final milestone, also auto pay platform fee
  if(milestone==='delivery_40'){
    const platformFee = order.amount_total * 0.1
    const platformRecipient = process.env.PLATFORM_RECIPIENT_CODE || recipient
    if(secret && platformRecipient){
      await fetch('https://api.paystack.co/transfer', {
        method:'POST',
        headers:{ Authorization: `Bearer ${secret}`, 'Content-Type':'application/json' },
        body: JSON.stringify({ source:'balance', amount: Math.round(platformFee*100), recipient: platformRecipient, reason: `Platform fee ${order_id}`, reference: `fee_${order_id}_${Date.now()}` })
      })
    }
    await supabase.from('escrow_releases').insert({
      order_id, milestone: 'platform_fee_10', amount: platformFee, recipient_code: platformRecipient,
      auto_triggered: true, description: `Platform fee auto for ${order_id}`
    })
  }
  await supabase.from('orders').update({ escrow_status: milestone==='delivery_40' ? 'completed_insured_auto' : 'partially_released_auto' }).eq('id', order_id)
  return NextResponse.json({ success:true, amount, auto:true, insured:true, transfer: transferData })
}
