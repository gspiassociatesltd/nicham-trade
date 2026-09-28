FIX: Project framework is set to "services" error

CAUSE:
When we added vercel.json with only crons, Vercel dashboard changed Framework Preset to "services" (expects docker services). But you are Next.js!

FIX 2 STEPS:

STEP 1 - Vercel Dashboard (MUST DO):
1. Go to vercel.com -> nicham-trade project -> Settings -> General
2. Scroll to "Framework Preset"
3. Change from "services" to "Next.js" 
4. Save

STEP 2 - GitHub Upload (this ZIP):
Option A (Recommended for now to unblock):
- Delete vercel.json from GitHub (go to github.com/gspiassociatesltd/nicham-trade/vercel.json -> click trash icon -> commit)
- This lets Vercel auto-detect Next.js - build will succeed

Option B (Keep security cron):
- Upload this fixed vercel.json from ZIP -> Commit -> Build will succeed because it says framework: nextjs

After build Ready, you can add cron via Vercel Dashboard -> Settings -> Crons instead of vercel.json

RECOMMENDED: Do Step 1 + Option A (delete vercel.json) first to get Ready, then we add cron later via dashboard.

