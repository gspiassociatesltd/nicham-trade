
-- FINAL FIX for NiChAm Trade - Run once in Supabase SQL Editor
ALTER TABLE africanies_quotes ALTER COLUMN product_id TYPE TEXT USING product_id::TEXT;
ALTER TABLE africanies_quotes ALTER COLUMN product_id DROP NOT NULL;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS fee_note TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS moq TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS is_motoma BOOLEAN DEFAULT true;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS ddp_total_ngn NUMERIC;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS ddp_breakdown TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS valid_until TIMESTAMPTZ;
CREATE TABLE IF NOT EXISTS whatsapp_logs (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, quote_id UUID REFERENCES africanies_quotes(id) ON DELETE CASCADE, phone TEXT, message TEXT, created_at TIMESTAMPTZ DEFAULT NOW());
NOTIFY pgrst, 'reload schema';
