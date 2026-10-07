import { NextResponse } from 'next/server'
export async function POST(req: Request){
  try{
    const { email, password } = await req.json()
    const users = (global as any).nichamUsers || []
    const user = users.find((u:any)=>u.email===email && u.password===password)
    if(!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    const { password:_, ...safe } = user
    return NextResponse.json({ success: true, user: safe })
  }catch(e:any){ return NextResponse.json({ error: e.message }, { status: 500 }) }
}
