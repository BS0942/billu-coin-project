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
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTap = async () => {
    if (taps >= dailyTapLimit) {
      alert('Daily tap limit reached!');
      return;
    }

    const userid = "123"; // Replace with real user id
    const res = await fetch('https://billu-coin-project.onrender.com/api/tap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid })
    });
    const data = await res.json();
    setBalance(data.balance);
    setTaps(data.taps);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <img src={hamsterLoading} alt="Loading..." className="w-36 h-36 animate-spin-slow" />
        <h2 className="mt-6 text-lg font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'game' && (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6">🎮 Tap Game</h1>
            <button
              onClick={handleTap}
              className="bg-indigo-600 text-white px-10 py-5 rounded-full text-2xl font-bold shadow-lg active:scale-95 transition"
            >
              TAP +5 BILLU
            </button>
            <p className="mt-6 text-gray-700 text-lg">Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-6">💰 Wallet</h1>
            <p className="text-lg mb-4">Balance: <strong>{balance} BILLU</strong></p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md">
              Buy in Pre-sale
            </button>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-6">🌟 Premium Packages</h1>
            <ul className="space-y-4">
              <li className="border p-4 rounded-xl shadow">🥉 Bronze - $20 - 2500 taps/day</li>
              <li className="border p-4 rounded-xl shadow">🥈 Silver - $40 - 5500 taps/day</li>
              <li className="border p-4 rounded-xl shadow">🥇 Gold - $50 - 7500 taps/day</li>
            </ul>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-6">👤 Profile</h1>
            <p>Username: @username</p>
            <p className="mt-4">Referral Link:</p>
            <input
              readOnly
              value="https://t.me/billu_coin_bot?start=123456"
              className="w-full mt-2 p-3 border rounded"
            />
          </div>
        )}
      </main>

      {/* Bottom Nav: Large HamsterVerse Style */}
      <nav className="flex justify-around items-center border-t bg-black text-white py-3">
        <button onClick={() => setActiveTab('game')} className="flex flex-col items-center">
          <span className="text-2xl">🎮</span>
          <span className="text-xs mt-1">Game</span>
        </button>
        <button onClick={() => setActiveTab('wallet')} className="flex flex-col items-center">
          <span className="text-2xl">💰</span>
          <span className="text-xs mt-1">Wallet</span>
        </button>
        <button onClick={() => setActiveTab('premium')} className="flex flex-col items-center">
          <span className="text-2xl">🌟</span>
          <span className="text-xs mt-1">Premium</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className="flex flex-col items-center">
          <span className="text-2xl">👤</span>
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
