-- FIX: Could not find the 'fee_note' column of 'africanies_quotes' in the schema cache
-- Run this SQL in Supabase Dashboard > SQL Editor

ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS fee_note TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS moq TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS is_motoma BOOLEAN DEFAULT true;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS ddp_total_ngn NUMERIC;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS ddp_breakdown TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS valid_until TIMESTAMPTZ;

-- Also ensure whatsapp_logs exists
CREATE TABLE IF NOT EXISTS whatsapp_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID REFERENCES africanies_quotes(id),
  phone TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Refresh schema cache (Supabase does this automatically, but you can also)
NOTIFY pgrst, 'reload schema';
