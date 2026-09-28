import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const rateLimitMap = new Map()
export function middleware(req: NextRequest){
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  const path = req.nextUrl.pathname
  if(path.startsWith('/api/')){
    const now = Date.now()
    const key = `${ip}:${path}`
    const entry = rateLimitMap.get(key) || { count: 0, reset: now + 60000 }
    if(now > entry.reset){ entry.count = 0; entry.reset = now + 60000 }
    entry.count++
    rateLimitMap.set(key, entry)
    if(entry.count > 20) return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
  }
  return NextResponse.next()
}
export const config = { matcher: ['/api/:path*'] }
