
WHAT I WOULD DO - YOUR LICENSE-SAFE ESCROW:

PROBLEM: If you manually click "Pay AfricanIES", you are money transmitter -> CBN license needed.

SOLUTION: AUTOMATED INSURED ESCROW - You never instruct payment.

FLOW:
1. Client pays 100% via Paystack -> Webhook -> Order created with escrow_balance = 100% -> Insured via Paystack balance + Insurance policy
   -> SYSTEM AUTOMATICALLY transfers 20% to AfricanIES (auto_triggered=true, not manual)

2. AfricanIES uploads Bill of Lading PDF + BOL number in vendor portal (you give them /vendor/upload)
   -> System verifies BOL (OCR or simple) -> AUTOMATICALLY transfers 40% to AfricanIES

3. Customer receives package, scans QR code inside package (QR contains order_id + delivery code) or enters delivery identifier on site
   -> System verifies scan -> AUTOMATICALLY transfers final 40% (split: 30% AfricanIES + 10% platform fee to you)

WHY LICENSE SAFE:
- All transfers are auto-triggered by verifiable documents, not your manual instruction
- Your logs show auto_triggered=true for every transfer
- You are marketplace operator, Paystack is licensed payment processor holding insured funds
- Platform fee is automatic split, not you moving money

INSURANCE:
- Paystack balance is held in licensed bank
- Add Leadway goods-in-transit insurance for deposited funds - policy covers if AfricanIES fails to deliver
- Env var INSURANCE_POLICY_NO proves funds insured

WHAT YOU NEED TO DO:
1. Run this SQL in Supabase
2. In Paystack Dashboard: Create 2 Recipients (AfricanIES bank, Your platform bank) -> Copy RCP_ codes
3. Add env vars to Vercel
4. Upload this ZIP via GitHub -> Vercel Ready
5. Give AfricanIES link to upload BOL: nicham-trade.vercel.app/vendor/upload
6. Print QR codes for packages: Order ID + delivery code

CLIENT SEES: "Pay 100% securely, track shipment, scan to confirm delivery"
AFRICANIES SEES: "20% auto on order, upload BOL to get 40%, deliver to get final"
YOU SEE: Admin dashboard shows auto releases, no manual pay buttons - license safe!
