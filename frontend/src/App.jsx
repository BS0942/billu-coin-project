// src/App.jsx

import { useState, useEffect } from 'react';
import hamsterLoading from './assets/hamster_loading.gif';

export default function App() {
  const [activeTab, setActiveTab] = useState('game');
  const [balance, setBalance] = useState(0);
  const [taps, setTaps] = useState(0);
  const [loading, setLoading] = useState(true);
  const dailyTapLimit = 1000;

  useEffect(() => {
    // Dummy loading delay (2 seconds)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTap = async () => {
    if (taps >= dailyTapLimit) {
      alert('Daily tap limit reached!');
      return;
    }

    const userid = "123"; // ✅ Real Telegram UserID would come here

    const res = await fetch('https://billu-coin-project.onrender.com/api/tap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid }),
    });

    const data = await res.json();
    setBalance(data.balance);
    setTaps(data.taps);
  };

  if (loading) {
    return (
      <div className="loading-screen" style={{ textAlign: 'center', marginTop: '100px' }}>
        <img src={hamsterLoading} alt="Loading..." style={{ width: '200px' }} />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="content">
        {activeTab === 'game' && (
          <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-bold mb-4">🎮 Tap Game</h2>
            <button
              onClick={handleTap}
              className="bg-blue-500 text-white px-8 py-4 rounded-full text-2xl shadow active:scale-95 transition"
            >
              TAP +5 BILLU
            </button>
            <p className="mt-4 text-gray-700">Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">💰 Wallet</h2>
            <p>Balance: <strong>{balance} BILLU</strong></p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Buy in Pre-sale
            </button>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">🌟 Premium Packages</h2>
            <ul className="space-y-3">
              <li className="border p-3 rounded shadow">🥉 Bronze - $20 - 2500 taps/day</li>
              <li className="border p-3 rounded shadow">🥈 Silver - $40 - 5500 taps/day</li>
              <li className="border p-3 rounded shadow">🥇 Gold - $50 - 7500 taps/day</li>
            </ul>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
            <p>Username: @username</p>
            <p className="mt-2">Referral Link:</p>
            <input
              className="w-full p-2 border rounded mt-1"
              readOnly
              value="https://t.me/billu_coin_bot?start=123456"
            />
          </div>
        )}
      </div>

      <nav className="flex justify-around border-t p-2 bg-white shadow-md">
        <button onClick={() => setActiveTab('game')}>🎮 Game</button>
        <button onClick={() => setActiveTab('wallet')}>💰 Wallet</button>
        <button onClick={() => setActiveTab('premium')}>🌟 Premium</button>
        <button onClick={() => setActiveTab('profile')}>👤 Profile</button>
      </nav>
    </div>
  );
}
