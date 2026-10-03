
-- Run in Supabase SQL Editor to fix all schema errors
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS fee_note TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS moq TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS is_motoma BOOLEAN DEFAULT true;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS ddp_total_ngn NUMERIC;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS ddp_breakdown TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS valid_until TIMESTAMPTZ;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS platform_fee_ngn NUMERIC DEFAULT 0;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS self_clear BOOLEAN DEFAULT false;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS product_id TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;

CREATE TABLE IF NOT EXISTS whatsapp_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID REFERENCES africanies_quotes(id),
  phone TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

NOTIFY pgrst, 'reload schema';

-- Verify
SELECT column_name FROM information_schema.columns WHERE table_name='africanies_quotes';
