
FEE FIXED - Dynamic fee for MOTOMA, not fixed 85k/35k

Issue: QuoteModal showed fixed Fee 35k instead of 85k - Admin sees breakdown - for MOTOMA batteries worth millions, 85k fixed is too low!

Fix:
- QuoteModal now detects MOTOMA product (is_motoma or title includes MOTOMA or model includes PW/HV-M/ESS/BESS)
- For MOTOMA:
  - NO self-clear checkbox (DDP Lagos only - we handle everything)
  - Platform fee = 0 (hidden) - Admin calculates DDP total after MOTOMA factory quote - includes 5% affiliate commission
  - Shows: MOTOMA DDP Lagos - All Inclusive - Factory+Shipping+Duty+PSI+Insurance 110% + 5% affiliate
  - Buyer sees TOTAL DDP only - Valid 3 Days - Dynamic fee hidden
- For non-MOTOMA (chemicals/agro):
  - Keeps old logic: Fee 35k self-clear vs 85k platform

Why fee was fixed: Old QuoteModal had hardcoded platform_fee = self_clear ? 35000 : 85000 - now dynamic for MOTOMA

Deploy:
1. app/page.tsx -> copy
2. app/components/QuoteModal.tsx -> copy (THIS IS THE FIX)
3. public/motoma/*.png -> copy
4. git add . commit push

Result: When you click Get DDP Quote on HV-M 92-193, modal shows MOTOMA DDP Lagos - All Inclusive, NO self-clear checkbox, dynamic fee hidden - NOT fixed 85k
