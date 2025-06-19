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
    const userid = "123";
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
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <img src={hamsterLoading} alt="Loading..." className="w-32 h-32 mb-4" />
        <h2 className="text-white text-lg">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'game' && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">🎮 Tap Game</h2>
            <button
              onClick={handleTap}
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-2xl shadow active:scale-95 transition"
            >
              TAP +5 BILLU
            </button>
            <p className="mt-4 text-gray-700">Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">💰 Wallet</h2>
            <p className="text-lg">Balance: <strong>{balance} BILLU</strong></p>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full">
              Buy in Pre-sale
            </button>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">⚡️ Premium Packages</h2>
            <ul className="space-y-3">
              <li className="border p-3 rounded shadow">🥉 Bronze - $20 - 2500 taps/day</li>
              <li className="border p-3 rounded shadow">🥈 Silver - $40 - 5500 taps/day</li>
              <li className="border p-3 rounded shadow">🥇 Gold - $50 - 7500 taps/day</li>
            </ul>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
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

      {/* ✅ HamsterVerse-style Bottom Nav */}
      <nav className="flex justify-around items-center bg-black text-white py-3 border-t">
        <button
          onClick={() => setActiveTab('game')}
          className={`flex flex-col items-center ${activeTab === 'game' ? 'text-white' : 'text-gray-500'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h18v18H3V3z" />
          </svg>
          <span className="text-xs font-medium">HamsterVerse</span>
          {activeTab === 'game' && <div className="h-1 w-full bg-orange-500 mt-1 rounded"></div>}
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex flex-col items-center ${activeTab === 'wallet' ? 'text-white' : 'text-gray-500'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 7h18v10H3V7z" />
          </svg>
          <span className="text-xs font-medium">Wallet</span>
          {activeTab === 'wallet' && <div className="h-1 w-full bg-orange-500 mt-1 rounded"></div>}
        </button>

        <button
          onClick={() => setActiveTab('premium')}
          className={`flex flex-col items-center ${activeTab === 'premium' ? 'text-white' : 'text-gray-500'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="text-xs font-medium">Charge</span>
          {activeTab === 'premium' && <div className="h-1 w-full bg-orange-500 mt-1 rounded"></div>}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
          <span className="text-xs font-medium">Profile</span>
          {activeTab === 'profile' && <div className="h-1 w-full bg-orange-500 mt-1 rounded"></div>}
        </button>
      </nav>
    </div>
  );
}
