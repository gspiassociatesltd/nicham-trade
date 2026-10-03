Fixed Error: Could not find the 'fee_note' column of 'africanies_quotes' in the schema cache

Cause: QuoteModal tried to insert fee_note and moq columns that don't exist in Supabase table africanies_quotes

Fix in code: QuoteModal now tries insert with is_motoma, if fails tries without is_motoma, if fails tries minimal columns only (product_id, product_title, customer_name, phone, quantity, location, status) - so it will work even if table is old schema

Also includes supabase_fix_fee_note.sql - Run this SQL in Supabase SQL Editor to add missing columns: fee_note TEXT, moq TEXT, is_motoma BOOLEAN, ddp_total_ngn, ddp_breakdown, valid_until, plus whatsapp_logs table

Deploy: cp app/components/QuoteModal.tsx ./app/components/QuoteModal.tsx, git add, git commit, git push