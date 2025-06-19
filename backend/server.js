// server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./billu.db');

// Balance API
app.get('/api/balance/:userid', (req, res) => {
  const { userid } = req.params;
  db.get(`SELECT balance FROM users WHERE userid = ?`, [userid], (err, row) => {
    if (err) return res.sendStatus(500);
    res.json({ balance: row ? row.balance : 0 });
  });
});

// Tap API
app.post('/api/tap', (req, res) => {
  const { userid } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  db.get(`SELECT * FROM users WHERE userid=?`, [userid], (err, row) => {
    if (err) return res.sendStatus(500);
    if (!row) {
      db.run(`INSERT INTO users (userid, balance, tap_count, tap_date) VALUES (?, 5, 1, ?)`,
        [userid, today], () => {
          return res.json({ balance: 5, taps: 1 });
        });
    } else {
      let tap_count = (row.tap_date === today) ? row.tap_count + 1 : 1;
      let balance = row.balance + 5;
      db.run(`UPDATE users SET balance=?, tap_count=?, tap_date=? WHERE userid=?`,
        [balance, tap_count, today, userid], () => {
          return res.json({ balance, taps: tap_count });
        });
    }
  });
});

// Premium API (optional)
app.post('/api/premium', (req, res) => {
  const { userid, level } = req.body;
  db.run(`UPDATE users SET premium_level=? WHERE userid=?`, [level, userid], (err) => {
    if (err) return res.sendStatus(500);
    res.json({ success: true });
  });
});

// Referral API (demo)
app.get('/api/referral/:userid', (req, res) => {
  db.get(`SELECT referral_count FROM users WHERE userid=?`, [req.params.userid], (err, row) => {
    if (err) return res.sendStatus(500);
    res.json({ referrals: row ? row.referral_count : 0 });
  });
});

// Pre-sale API (optional)
app.post('/api/presale', (req, res) => {
  const { userid, txid, amount } = req.body;
  db.run(`INSERT INTO presale (userid, txid, amount) VALUES (?, ?, ?)`, [userid, txid, amount], (err) => {
    if (err) return res.sendStatus(500);
    res.json({ success: true });
  });
});

// Start Server
app.listen(3000, () => console.log('✅ Backend running at http://localhost:3000'));
