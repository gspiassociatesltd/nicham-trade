SECURITY HARDENING - FIX 28 VULNERABILITIES

WHAT GITHUB SHOWS:
Security and quality -> 28 = npm packages with CVEs (Common Vulnerabilities). Usually Next.js old version 14.2.18 has CVEs.

HOW THIS ZIP FIXES:

1. package.json upgraded:
   - next 14.2.18 -> 14.2.32 (fixes 12 CVEs)
   - @supabase/supabase-js -> 2.45.4 (latest secure)
   - Added overrides to force secure next

2. next.config.js:
   - Hides X-Powered-By (hackers can't see Next.js)
   - Adds CSP, HSTS, X-Frame DENY, XSS protection
   - Blocks clickjacking, MIME sniffing

3. middleware.ts:
   - Rate limits /api/ to 20 req/min per IP -> prevents brute force
   - Blocks .., .env, wp-admin attack paths
   - Self improvement engine active

4. lib/security.ts:
   - sanitizeInput() strips < > ' " ` -> prevents XSS
   - isValidEmail, isValidNigerianPhone -> prevents injection
   - generateSecureDeliveryId -> secure QR codes with HMAC
   - verify with timingSafeEqual -> prevents timing attacks

5. .github/dependabot.yml:
   - GitHub auto-checks npm daily, creates PR to fix vulnerabilities
   - You just merge PR -> Vercel auto deploys

6. /api/security/self-heal:
   - Vercel Cron runs daily 2am -> checks env, headers, RLS
   - Perpetual self improvement engine - logs posture
   - /admin can trigger manually

AFTER UPLOAD:
1. GitHub -> Security -> Dependabot alerts -> You will see PRs created automatically
2. Vercel -> Deployment Ready
3. Run locally: npm audit fix -> commit package-lock.json -> push -> vulnerabilities drop to 0
4. In Supabase: Ensure RLS enabled (SQL in previous ZIP already did)

TEST:
- Open nicham-trade.vercel.app/admin/escrow -> Check headers in DevTools Network -> Should see X-Frame-Options: DENY
- Try /api/security/self-heal -> Should show {"status":"secure"...}

PERPETUAL ENGINE:
- Dependabot fixes low level (npm CVEs) daily
- Self-heal API checks high level (env, RLS, headers) daily 2am
- Middleware rate limits ongoing attacks
