import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  try {
    const { email, password, name, phone } = await req.json()
    if (!email || !password || !name) return NextResponse.json({ error: 'Name, email, password required' }, { status: 400 })
    const globalUsers = (global as any).nichamUsers || []
    if (globalUsers.find((u:any)=>u.email===email)) return NextResponse.json({ error: 'User exists' }, { status: 400 })
    const isFirst = globalUsers.length===0
    const newUser = { id: Date.now().toString(), name, email, phone: phone||'', password, role: isFirst?'admin':'user', createdAt: new Date().toISOString() }
    globalUsers.push(newUser); (global as any).nichamUsers = globalUsers
    const { password:_, ...safe } = newUser
    return NextResponse.json({ success: true, user: safe, message: isFirst?'First user is admin':'Created' })
  } catch(e:any){ return NextResponse.json({ error: e.message }, { status: 500 }) }
}
export async function GET(){ const u=(global as any).nichamUsers||[]; return NextResponse.json({ users: u.map((x:any)=>{const {password,...r}=x;return r}), total: u.length }) }
