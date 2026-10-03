
-- FIX: invalid input syntax for type uuid: "M91"
-- product_id column is UUID type but code inserts "M91" string
-- Solution 1: Change product_id to TEXT (recommended for MOTOMA models)
ALTER TABLE africanies_quotes ALTER COLUMN product_id TYPE TEXT USING product_id::TEXT;

-- Solution 2: Or make it nullable and don't insert it (code now does this)
ALTER TABLE africanies_quotes ALTER COLUMN product_id DROP NOT NULL;

-- Also ensure other columns exist
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS product_title TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS is_motoma BOOLEAN DEFAULT true;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS moq TEXT;
ALTER TABLE africanies_quotes ADD COLUMN IF NOT EXISTS fee_note TEXT;

CREATE TABLE IF NOT EXISTS whatsapp_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID REFERENCES africanies_quotes(id),
  phone TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

NOTIFY pgrst, 'reload schema';
