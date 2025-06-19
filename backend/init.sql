CREATE TABLE IF NOT EXISTS users (
  userid TEXT PRIMARY KEY,
  username TEXT,
  balance INTEGER DEFAULT 0,
  tap_count INTEGER DEFAULT 0,
  tap_date TEXT DEFAULT '',
  referral_count INTEGER DEFAULT 0,
  premium_level TEXT DEFAULT 'free'
);

CREATE TABLE IF NOT EXISTS presale (
  userid TEXT,
  txid TEXT,
  amount REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
