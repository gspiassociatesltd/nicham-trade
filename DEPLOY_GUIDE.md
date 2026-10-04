# NiChAm Trade - FINAL Deploy Guide - Flutterwave Escrow + MoMo

LIVE URL: https://nicham-trade-f3mmxnylm-kpata-academy.vercel.app/

## What's Inside This ZIP - Flutterwave Escrow + MoMo License Compliant

1. app/page.tsx - Main Store - 15 MOTOMA models - BIG header 56px M logo - 28px NiChAm Trade x MOTOMA - Dynamic count 15 MODELS - Grade A+ 8000 cycles - DDP Lagos Valid 3 Days
2. app/components/QuoteModal.tsx - Quote Modal with MoMo Account - Yellow box MTN MoMo Required - MoMo -> Flutterwave Escrow - Flutterwave charges to buyer
3. app/admin/motoma-ddp/page.tsx - Admin DDP Engine - Flutterwave Escrow + MoMo - Buyer MoMo to Flutterwave Escrow - Flutterwave pays everyone - Platform fee hidden 3%/5%/8% - Flutterwave fee 1.4% to buyer - TOTAL TO ESCROW calculation - Send Escrow WhatsApp

## How to Deploy - Unzip, Load to GitHub, Commit and Deploy in Vercel

You are in: C:\Users\Admin\Downloads\nicham-trade-main

Step 1: Unzip this file to your project root (overwrite):
   - Right-click ZIP -> Extract All -> To C:\Users\Admin\Downloads\nicham-trade-main\ -> Yes to overwrite

Step 2: Open PowerShell in that folder:
   cd C:\Users\Admin\Downloads\nicham-trade-main

Step 3: Check files:
   dir app\page.tsx
   dir app\components\QuoteModal.tsx
   dir app\admin\motoma-ddp\page.tsx

Step 4: Git push to GitHub (Vercel auto-deploys):
   git add app/ lib/
   git commit -m "FINAL - Flutterwave Escrow + MoMo - License compliant - MoMo to Flutterwave escrow - Buyer bears charges - BIG header dynamic count"
   git push origin main

Step 5: Wait 30-40 seconds:
   Vercel Dashboard -> nicham-trade -> Deployments -> Building -> Ready
   Then visit: https://nicham-trade-f3mmxnylm-kpata-academy.vercel.app/
   And: https://nicham-trade-f3mmxnylm-kpata-academy.vercel.app/admin/motoma-ddp

## Supabase SQL - Run Once

Go to supabase.com/dashboard -> Your project nicham-trade -> SQL Editor -> New Query -> Paste:

ALTER TABLE africanies_quotes DROP CONSTRAINT IF EXISTS africanies_quotes_product_id_fkey;
ALTER TABLE africanies_quotes ALTER COLUMN product_id TYPE TEXT USING product_id::TEXT;
ALTER TABLE africanies_quotes ALTER COLUMN product_id DROP NOT NULL;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS momo_account TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS is_motoma BOOLEAN DEFAULT true;
NOTIFY pgrst, 'reload schema';

Then refresh admin page.

## New Payment Flow (License Compliant)

OLD: Payment to NiChAm Trade account -> License issue
NEW: Buyer MoMo (MTN MoMo 08087364309) -> Flutterwave Escrow (Licensed CBN) -> Flutterwave pays Factory, Customs, Clearance, Delivery, NiChAm Platform Fee
- All registered buyers must have MoMo account
- Flutterwave charges (1.4% capped) charged to buyer account
- Escrow protects buyer

Example M69PW PRO Qty 12 Lokoja:
DDP Lagos Total: N42,404,049
Flutterwave Fee 1.4%: N593,656
TOTAL TO PAY TO ESCROW from MoMo: N42,997,705
WhatsApp: MoMo 08087364309 -> Flutterwave Escrow N42,997,705

## Build Log - Your Last Build Succeeded

08:44:09 Compiled successfully in 6.1s
08:44:14 Route (app) - /admin/motoma-ddp - 21 pages
08:44:15 Build Completed - Deploying outputs - Deployment completed - Build cache 134.80 MB
