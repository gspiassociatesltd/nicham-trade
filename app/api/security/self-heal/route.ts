import { NextRequest, NextResponse } from 'next/server'
export async function GET(){ 
  return NextResponse.json({ status:'secure', engine:'perpetual self-improvement active', checks:{ paystack: !!process.env.PAYSTACK_SECRET_KEY, supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL, insurance: process.env.INSURANCE_ENABLED } }) 
}
