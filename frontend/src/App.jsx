// src/App.jsx
import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('game');
  const [balance, setBalance] = useState(0);
  const [taps, setTaps] = useState(0);
  const dailyTapLimit = 1000;

  const handleTap = async () => {
    if (taps >= dailyTapLimit) {
      alert('Daily tap limit reached!');
      return;
    }

    // Use your deployed backend
    const userid = "8003246405"; // your real Telegram user ID (owner)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://billu-coin-project.onrender.com";

    try {
      const res = await fetch(`${backendUrl}/api/tap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      setBalance(data.balance);
      setTaps(data.taps);
    } catch (error) {
      console.error('Tap failed:', error);
      alert('Tap failed! Please check connection.');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4">
        {activeTab === 'game' && (
          <div className="flex flex-col items-center">
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
          <div>
            <h2 className="text-xl font-bold mb-4">💰 Wallet</h2>
            <p>Balance: <strong>{balance} BILLU</strong></p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Buy in Pre-sale
            </button>
          </div>
        )}

        {activeTab === 'premium' && (
          <div>
            <h2 className="text-xl font-bold mb-4">🌟 Premium Packages</h2>
            <ul className="space-y-3">
              <li className="border p-3 rounded shadow">🥉 Bronze - $20 - 2500 taps/day</li>
              <li className="border p-3 rounded shadow">🥈 Silver - $40 - 5500 taps/day</li>
              <li className="border p-3 rounded shadow">🥇 Gold - $50 - 7500 taps/day</li>
            </ul>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
            <p>Username: @billu_coin_bot</p>
            <p className="mt-2">Referral Link:</p>
            <input
              className="w-full p-2 border rounded mt-1"
              readOnly
              value="https://t.me/billu_coin_bot?start=8003246405"
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
