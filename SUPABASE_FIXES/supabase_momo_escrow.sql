
ALTER TABLE africanies_quotes DROP CONSTRAINT IF EXISTS africanies_quotes_product_id_fkey;
ALTER TABLE africanies_quotes ALTER COLUMN product_id TYPE TEXT USING product_id::TEXT;
ALTER TABLE africanies_quotes ALTER COLUMN product_id DROP NOT NULL;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS momo_account TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'momo_flutterwave_escrow';
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS escrow_id TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS flutterwave_fee_ngn NUMERIC DEFAULT 0;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS is_motoma BOOLEAN DEFAULT true;
NOTIFY pgrst, 'reload schema';
