-- Fix RLS policies: auth.uid() returns the Supabase Auth user ID,
-- but customer_id is the customers table UUID. We need to join through
-- the customers table to match by auth user email.

-- Drop the broken policies
DROP POLICY IF EXISTS "Users can view own progress" ON lesson_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON lesson_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON lesson_progress;

-- Recreate with correct auth check (match via customers.email = auth.email())
CREATE POLICY "Users can view own progress" ON lesson_progress
  FOR SELECT USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT auth.email())
    )
  );

CREATE POLICY "Users can insert own progress" ON lesson_progress
  FOR INSERT WITH CHECK (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT auth.email())
    )
  );

CREATE POLICY "Users can update own progress" ON lesson_progress
  FOR UPDATE USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = (SELECT auth.email())
    )
  );
