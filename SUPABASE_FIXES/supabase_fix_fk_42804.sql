
-- Fix ERROR 42804 foreign key constraint cannot be implemented
ALTER TABLE africanies_quotes DROP CONSTRAINT IF EXISTS africanies_quotes_product_id_fkey;
ALTER TABLE africanies_quotes DROP CONSTRAINT IF EXISTS fk_product_id;
ALTER TABLE africanies_quotes ALTER COLUMN product_id TYPE TEXT USING product_id::TEXT;
ALTER TABLE africanies_quotes ALTER COLUMN product_id DROP NOT NULL;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS is_motoma BOOLEAN DEFAULT true;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS moq TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS fee_note TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS momo_account TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS flutterwave_fee_ngn NUMERIC DEFAULT 0;
CREATE TABLE IF NOT EXISTS whatsapp_logs (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, quote_id UUID REFERENCES africanies_quotes(id) ON DELETE CASCADE, phone TEXT, message TEXT, created_at TIMESTAMPTZ DEFAULT NOW());
NOTIFY pgrst, 'reload schema';
