-- Cloudflare D1 Schema

-- Table to store user information
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,       -- Simple hash for demo (in production use bcrypt)
  trial_count INTEGER DEFAULT 0, -- Track usage (Max 3)
  is_pro BOOLEAN DEFAULT 0,     -- 0 = Free, 1 = Pro
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Table to store order information
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id TEXT PRIMARY KEY,          -- Local Order ID (trade_order_id)
  user_id INTEGER,              -- Linked to users.id
  amount REAL,
  status TEXT DEFAULT 'pending', -- pending, paid
  title TEXT,
  client_ip TEXT,
  payment_url TEXT,             -- Store the payment URL/QR info if needed
  hupi_order_id TEXT,           -- Remote Order ID from Hupijiao (from callback)
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Table to store generated lyrics
DROP TABLE IF EXISTS lyrics;
CREATE TABLE lyrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,              -- Linked to users.id
  order_id TEXT,                -- Optional if just trial
  prompt TEXT,
  content TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);
