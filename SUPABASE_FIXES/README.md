# Supabase Fixes - Run in SQL Editor

1. Fix FK 42804 error (product_id UUID -> TEXT):
   Run supabase_fix_fk_42804.sql

2. MoMo + Flutterwave Escrow:
   Run supabase_momo_escrow.sql

Both files drop FK constraint first, then change product_id to TEXT.
