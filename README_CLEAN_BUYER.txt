
CLEAN BUYER VERSION - NO AFFILIATE, NO FEE BREAKDOWN, NO INTERNAL TERMS

Fixed per user request: remove 5% affiliate and any other thing that is not meant for buyer's consumption

BEFORE (wrong for buyer):
- DDP Lagos price includes: Factory + Shipping + Duty + PSI (SGS/BV) + Insurance 110% + 5% affiliate commission
- Buyer sees TOTAL DDP only - No breakdown - Valid 3 Days
- Residential - Admin will send DDP total after MOTOMA factory quote
- No self-clear option - DDP only - We handle everything
- DDP Lagos valid 3 days. Total DDP includes all costs + 5% affiliate. Admin provides breakdown. Buyer sees total only. Platform fee hidden.

AFTER (clean for buyer):
- Title: Get DDP Lagos Quote - MOTOMA / MOTOMA Authorized - DDP Lagos - Valid 3 Days
- Subtitle: DDP Lagos - All Inclusive (no 5% affiliate mention)
- Box: DDP Lagos - All Inclusive - Valid 3 Days / Includes Factory Price, Shipping, Duty, Clearance, and Delivery to Lagos. Total price only - No hidden breakdown.
- Bottom: Quote valid for 3 days. You will receive total DDP Lagos price on WhatsApp.
- Button: Submit Quote & Open WhatsApp
- NO affiliate, NO platform fee hidden, NO admin provides breakdown, NO self-clear, NO 5%, NO fee - CLEAN BUYER VIEW

Internal: fee_note still saved to Supabase for admin only, but NOT shown to buyer in modal or WhatsApp message.
WhatsApp message now clean: NiChAm Trade - MOTOMA DDP Lagos Quote / Product / Model / Customer / Phone / Qty / Location / DDP Lagos - All Inclusive - Valid 3 Days / Quote ID

Deploy:
1. app/page.tsx
2. app/components/QuoteModal.tsx (THIS IS THE FIX)
3. public/motoma/*.png
4. git add . commit push
