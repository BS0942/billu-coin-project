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
    // ২ সেকেন্ড লোডিং দেখাবে
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTap = async () => {
    if (taps >= dailyTapLimit) {
      alert('Daily tap limit reached!');
      return;
    }

    const userid = "123"; // Real Telegram user id here
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
        <img src={hamsterLoading} alt="Loading..." className="w-40 h-40" />
        <h2 className="mt-4 text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 p-4">
        {activeTab === 'game' && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">🎮 Tap Game</h2>
            <button
              onClick={handleTap}
              className="bg-blue-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow active:scale-95 transition"
            >
              TAP +5 BILLU
            </button>
            <p className="mt-6 text-gray-700 text-lg">Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">💰 Wallet</h2>
            <p className="text-lg">Balance: <strong>{balance} BILLU</strong></p>
            <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full shadow">
              Buy in Pre-sale
            </button>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🌟 Premium Packages</h2>
            <ul className="space-y-4">
              <li className="border p-4 rounded-lg shadow">🥉 Bronze - $20 - 2500 taps/day</li>
              <li className="border p-4 rounded-lg shadow">🥈 Silver - $40 - 5500 taps/day</li>
              <li className="border p-4 rounded-lg shadow">🥇 Gold - $50 - 7500 taps/day</li>
            </ul>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
            <p>Username: @username</p>
            <p className="mt-4">Referral Link:</p>
            <input
              className="w-full p-3 border rounded mt-2"
              readOnly
              value="https://t.me/billu_coin_bot?start=123456"
            />
          </div>
        )}
      </div>

      {/* Bottom Nav: Big Buttons */}
      <nav className="flex justify-around border-t bg-white py-2 shadow-lg">
        <button onClick={() => setActiveTab('game')} className="flex flex-col items-center text-xl">
          🎮 <span className="text-xs">Game</span>
        </button>
        <button onClick={() => setActiveTab('wallet')} className="flex flex-col items-center text-xl">
          💰 <span className="text-xs">Wallet</span>
        </button>
        <button onClick={() => setActiveTab('premium')} className="flex flex-col items-center text-xl">
          🌟 <span className="text-xs">Premium</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className="flex flex-col items-center text-xl">
          👤 <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
}
