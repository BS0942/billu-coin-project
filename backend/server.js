// ✅ server.js

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ SQLite DB connection + fallback auto-create
const db = new sqlite3.Database('./billu.db', (err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("✅ Connected to SQLite DB");

    // Create tables if not exist
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        userid TEXT PRIMARY KEY,
        username TEXT,
        balance INTEGER DEFAULT 0,
        tap_count INTEGER DEFAULT 0,
        tap_date TEXT DEFAULT '',
        referral_count INTEGER DEFAULT 0,
        premium_level TEXT DEFAULT 'free'
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS presale (
        userid TEXT,
        txid TEXT,
        amount REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// ✅ Balance API
app.get('/api/balance/:userid', (req, res) => {
  const { userid } = req.params;
  db.get(`SELECT balance FROM users WHERE userid = ?`, [userid], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ balance: row ? row.balance : 0 });
  });
});

// ✅ Tap API
app.post('/api/tap', (req, res) => {
  const { userid } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  db.get(`SELECT * FROM users WHERE userid=?`, [userid], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!row) {
      db.run(`INSERT INTO users (userid, balance, tap_count, tap_date) VALUES (?, 5, 1, ?)`,
        [userid, today], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Insert Error" });
          }
          return res.json({ balance: 5, taps: 1 });
        });
    } else {
      let tap_count = (row.tap_date === today) ? row.tap_count + 1 : 1;
      let balance = row.balance + 5;
      db.run(`UPDATE users SET balance=?, tap_count=?, tap_date=? WHERE userid=?`,
        [balance, tap_count, today, userid], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Update Error" });
          }
          return res.json({ balance, taps: tap_count });
        });
    }
  });
});

// ✅ Premium API
app.post('/api/premium', (req, res) => {
  const { userid, level } = req.body;
  db.run(`UPDATE users SET premium_level=? WHERE userid=?`, [level, userid], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ success: true });
  });
});

// ✅ Referral API
app.get('/api/referral/:userid', (req, res) => {
  db.get(`SELECT referral_count FROM users WHERE userid=?`, [req.params.userid], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ referrals: row ? row.referral_count : 0 });
  });
});

// ✅ Presale API
app.post('/api/presale', (req, res) => {
  const { userid, txid, amount } = req.body;
  db.run(`INSERT INTO presale (userid, txid, amount) VALUES (?, ?, ?)`, [userid, txid, amount], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ success: true });
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
