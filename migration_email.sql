-- Email Registration & Password Reset Migration
-- Add email and password reset fields to users table

-- Step 1: Add nullable email column (NOT UNIQUE yet)
ALTER TABLE users ADD COLUMN email TEXT;

-- Step 2: Add password reset fields
ALTER TABLE users ADD COLUMN reset_token TEXT;
ALTER TABLE users ADD COLUMN reset_token_expires INTEGER;

-- Step 3: Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);

-- Note: UNIQUE constraint on email will be enforced at application level
-- Existing users can have NULL email, new users must provide email
