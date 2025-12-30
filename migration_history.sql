-- History Sidebar Migration
-- Extend lyrics table to support history management

-- Add new columns
ALTER TABLE lyrics ADD COLUMN title TEXT;
ALTER TABLE lyrics ADD COLUMN topic TEXT;
ALTER TABLE lyrics ADD COLUMN suno_tags TEXT;
ALTER TABLE lyrics ADD COLUMN updated_at INTEGER;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_lyrics_user_id ON lyrics(user_id);
CREATE INDEX IF NOT EXISTS idx_lyrics_created_at ON lyrics(created_at DESC);
