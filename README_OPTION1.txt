OPTION 1 - Admin DDP Quote Engine - Built

What built:
- app/admin/motoma-ddp/page.tsx - Full DDP calculator admin dashboard
- app/admin/page.tsx - Redirects to motoma-ddp
- app/page.tsx - World-class MOTOMA only 15 products - No auth banner - No No Breakdown text - Clean buyer view
- app/components/QuoteModal.tsx - Clean buyer - No affiliate % - No fee breakdown - DDP Lagos All Inclusive Valid 3 Days only
- public/motoma/ - 6 official images from motoma.com + 6 from PDFs

How Admin DDP Engine Works:
1. Buyer clicks Get DDP Quote on site -> Quote saved to africanies_quotes table (is_motoma=true, status=new)
2. Admin goes to /admin/motoma-ddp -> Sees list of MOTOMA quotes (left side)
3. Admin clicks quote -> FOB auto-filled from MOTOMA_MODELS database (e.g., M68PW PRO FOB $950, Shipping $180, Weight 85kg)
4. Admin adjusts: Exchange rate (default 1620 NGN/USD), Duty % (5% for battery HS 85076000), PSI $200, Insurance 1.1%, Clearance 250k NGN, Delivery 150k NGN, Platform % dynamic (3% BESS, 5% C&I, 8% Residential)
5. Auto-calc: FOB NGN + Shipping NGN + PSI NGN = CIF NGN, + Insurance, + Duty, + Clearance, + Delivery = Subtotal, + Platform % = TOTAL DDP NGN x Qty
6. Left box: ADMIN ONLY FULL BREAKDOWN (FOB, Shipping, PSI, CIF, Insurance, Duty, Clearance, Delivery, Subtotal, Platform % hidden) - Not for buyer
7. Right box: BUYER VIEW CLEAN - DDP Lagos All Inclusive: N1,250,000 - Valid 3 Days - Includes Delivery - No FOB, no shipping, no duty, no PSI, no insurance, no clearance, no platform % - Total Only
8. Admin clicks Approve & Send DDP -> Updates africanies_quotes status=quoted, ddp_total_ngn, ddp_breakdown, valid_until, and sends WhatsApp to buyer phone with clean total only

Dynamic Platform Fee Logic (Hidden from Buyer):
- Residential 25.6V/51.2V (M68PW-M91): 8% platform - e.g., if subtotal 1M, platform 80k, total DDP 1.08M
- C&I ESS (HV-M, ESS-MHV, M50-100): 5% - large but still residential commercial
- BESS/Container (BESS-500kW, M2500, FT25): 3% - millions, 3% is still large (e.g., 10M subtotal, 300k fee)
- Telecom M77U: 10% - small but high demand

Supabase tables needed:
- africanies_quotes: add columns if not exist: is_motoma boolean, ddp_total_ngn numeric, ddp_breakdown text, valid_until timestamp, fee_note text
- whatsapp_logs: existing - logs buyer message

Deploy:
1. Unzip
2. cp -r app/* your-project/app/
3. mkdir -p your-project/public/motoma && cp -r public/motoma/* your-project/public/motoma/
4. git add app/ public/motoma/
5. git commit -m "Option1 Admin DDP Quote Engine - Dynamic DDP calc - Buyer sees total only Valid 3 Days"
6. git push -> Vercel deploys
7. Go to nicham-trade.vercel.app/admin/motoma-ddp -> Admin dashboard ready

Test:
- Go to main site, click Get DDP Quote on M68PW PRO, fill name phone qty location, submit -> WhatsApp opens
- Go to /admin/motoma-ddp -> See quote on left -> Click -> Auto-filled FOB $950 -> Adjust if needed -> See total DDP -> Approve & Send -> WhatsApp to buyer with total only

Next: You need to get real MOTOMA FOB prices from MOTOMA Power Technology Co., Ltd (Shenzhen) - info@motoma.com - and update MOTOMA_MODELS fobUSD values - currently estimated.

This engine makes you able to quote DDP Lagos in 2 minutes per buyer - world-class!
