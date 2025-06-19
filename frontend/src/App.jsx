// src/App.jsx
import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('game');
  const [balance, setBalance] = useState(0);
  const [taps, setTaps] = useState(0);
  const dailyTapLimit = 1000;

  const handleTap = async () => {
    if (taps >= dailyTapLimit) {
      alert('🚫 Daily tap limit reached!');
      return;
    }

    const userid = "123"; // Telegram UserID or dynamic
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid })
    });
    const data = await res.json();
    setBalance(data.balance);
    setTaps(data.taps);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-700 to-pink-500 text-white font-sans">
      <header className="p-4 text-center text-3xl font-bold">
        🎮 Billu Coin Tap Game
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {activeTab === 'game' && (
          <div className="text-center">
            <button
              onClick={handleTap}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-10 py-5 rounded-full text-3xl font-bold shadow-lg hover:scale-105 active:scale-95 transition"
            >
              TAP +5 BILLU 🚀
            </button>
            <p className="mt-6 text-lg">🔥 Taps: <b>{taps}</b> / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="text-center">
            <h2 className="text-2xl mb-4">💰 My Wallet</h2>
            <p className="text-xl">Balance: <b>{balance} BILLU</b></p>
            <button className="mt-6 bg-green-400 text-black px-6 py-3 rounded-full font-bold shadow hover:scale-105 active:scale-95 transition">
              Buy in Pre-sale 💎
            </button>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="text-center">
            <h2 className="text-2xl mb-4">🌟 Premium Packages</h2>
            <div className="space-y-4">
              <div className="bg-white text-black rounded-lg p-4 shadow hover:scale-105 transition">
                🥉 Bronze — $20 — 2500 taps/day
              </div>
              <div className="bg-white text-black rounded-lg p-4 shadow hover:scale-105 transition">
                🥈 Silver — $40 — 5500 taps/day
              </div>
              <div className="bg-white text-black rounded-lg p-4 shadow hover:scale-105 transition">
                🥇 Gold — $50 — 7500 taps/day
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center">
            <h2 className="text-2xl mb-4">👤 Profile</h2>
            <p>Username: <b>@username</b></p>
            <p className="mt-2">Referral Link:</p>
            <input
              className="mt-2 w-full max-w-md p-3 rounded-lg text-black"
              value="https://t.me/billu_coin_bot?start=123456"
              readOnly
            />
          </div>
        )}
      </main>

      <nav className="flex justify-around p-4 bg-black bg-opacity-30 backdrop-blur border-t border-white/20">
        <button onClick={() => setActiveTab('game')} className={`${activeTab === 'game' ? 'font-bold underline' : ''}`}>🎮 Game</button>
        <button onClick={() => setActiveTab('wallet')} className={`${activeTab === 'wallet' ? 'font-bold underline' : ''}`}>💰 Wallet</button>
        <button onClick={() => setActiveTab('premium')} className={`${activeTab === 'premium' ? 'font-bold underline' : ''}`}>🌟 Premium</button>
        <button onClick={() => setActiveTab('profile')} className={`${activeTab === 'profile' ? 'font-bold underline' : ''}`}>👤 Profile</button>
      </nav>
    </div>
  );
}
