NiChAm Chemical Verify Build - Option 1
This ZIP implements chemical verification flow:

1. app/page.tsx - BIG header + dropdown clean (your current live version)
2. app/admin/page.tsx - NEW admin with Chemicals tab, Verify & Add to Catalog button
3. app/admin/chemicals/page.tsx - Same as admin - dedicated chemicals admin
4. app/api/scout1688/route.ts - Enhanced to log chemical scouts, create waitlist if phone provided, WhatsApp admin alert

HOW TO DEPLOY:
- Unzip
- Copy app/ folder into your nicham-trade-main/app/ (replace)
- git add . && git commit -m "Chemical verify flow + WhatsApp" && git push

FLOW:
1. Customer searches chemical on homepage -> not found -> scout draft created (scout_requests table)
2. Admin goes to /admin -> Chemicals tab (password GSPI2026) -> sees scout -> clicks Verify & Add to Catalog -> sets price -> product inserted into products table as VERIFIED 1688
3. Now chemical searchable instantly on homepage
4. WhatsApp log created for 07050477950

Test: Search "Caustic Soda" -> check /admin -> Chemicals -> Verify
