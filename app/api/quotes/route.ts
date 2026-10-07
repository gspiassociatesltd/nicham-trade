import { NextResponse } from 'next/server'
export async function POST(req: Request){
  try{
    const body = await req.json()
    const { product, user, quantity, location, phone, email, name } = body
    if(!product || !quantity || !location) return NextResponse.json({ error: 'Product, quantity, location required' }, { status: 400 })
    const newQuote = {
      id: Date.now().toString(),
      productId: product.id,
      productModel: product.model,
      productName: product.name,
      sourceCompany: product.sourceCompany,
      sourceUrl: product.sourceUrl,
      sourcePlatform: product.sourcePlatform,
      quantity, location, moq: product.moq,
      user: user ? { id: user.id, name: user.name, email: user.email } : { name, email, phone },
      phone: phone||user?.phone, email: email||user?.email, name: name||user?.name,
      status: 'pending', createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now()+3*24*60*60*1000).toISOString()
    }
    const g = (global as any).nichamQuotes || []
    g.push(newQuote); (global as any).nichamQuotes = g
    return NextResponse.json({ success: true, quote: newQuote })
  }catch(e:any){ return NextResponse.json({ error: e.message }, { status: 500 }) }
}
export async function GET(){ const g=(global as any).nichamQuotes||[]; return NextResponse.json({ quotes: g, total: g.length }) }
