/*
  # Fix notes table foreign key constraint

  1. Changes
    - Drop existing foreign key constraint
    - Add new foreign key constraint with proper reference
    - Ensure proper cascading behavior

  2. Security
    - Maintains existing RLS policies
    - No data loss
*/

-- Drop existing foreign key constraint
ALTER TABLE notes
DROP CONSTRAINT IF EXISTS notes_user_id_fkey;

-- Add new foreign key constraint with proper reference
ALTER TABLE notes
ADD CONSTRAINT notes_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id)
ON DELETE CASCADE;