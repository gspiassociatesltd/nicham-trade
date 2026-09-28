import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limit (for Vercel Edge, use Upstash Redis in production)
const rateLimitMap = new Map()

export function middleware(req: NextRequest){
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  const path = req.nextUrl.pathname

  // Rate limit API routes: 20 req/min per IP
  if(path.startsWith('/api/')){
    const now = Date.now()
    const windowMs = 60 * 1000
    const key = `${ip}:${path}`
    const entry = rateLimitMap.get(key) || { count: 0, reset: now + windowMs }
    if(now > entry.reset){ entry.count = 0; entry.reset = now + windowMs }
    entry.count++
    rateLimitMap.set(key, entry)
    if(entry.count > 20){
      return NextResponse.json({ error: 'Rate limited - try later', security: 'self-improvement engine active' }, { status: 429 })
    }
  }

  // Block common attack paths
  if(path.includes('..') || path.includes('.env') || path.includes('wp-admin')){
    return NextResponse.json({ error: 'Blocked' }, { status: 403 })
  }

  const res = NextResponse.next()
  // Add security headers at edge too
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export const config = { matcher: ['/api/:path*', '/admin/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'] }
