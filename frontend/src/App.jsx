// src/App.jsx
import { useState, useEffect } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("game");
  const [balance, setBalance] = useState(0);
  const [taps, setTaps] = useState(0);
  const dailyTapLimit = 1000;

  const handleTap = async () => {
    if (taps >= dailyTapLimit) {
      alert("Daily tap limit reached!");
      return;
    }

    const userid = "123"; // Demo ID
    const res = await fetch('https://billu-coin-project.onrender.com/api/tap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid })
    });
    const data = await res.json();
    setBalance(data.balance);
    setTaps(data.taps);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-16">
      <div className="flex-1 p-4">
        {activeTab === "game" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              🎮 Tap Game
            </h2>
            <button
              onClick={handleTap}
              className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg shadow active:scale-95 transition"
            >
              TAP +5 BILLU
            </button>
            <p className="mt-4">Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">💰 Wallet</h2>
            <p className="text-lg">Balance: <strong>{balance} BILLU</strong></p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Buy in Pre-sale
            </button>
          </div>
        )}

        {activeTab === "premium" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">👑 Premium Packages</h2>
            <ul className="space-y-3 text-left max-w-xs mx-auto">
              <li className="border p-3 rounded shadow">🥉 Bronze - $20 - 2500 taps/day</li>
              <li className="border p-3 rounded shadow">🥈 Silver - $40 - 5500 taps/day</li>
              <li className="border p-3 rounded shadow">🥇 Gold - $50 - 7500 taps/day</li>
            </ul>
          </div>
        )}

        {activeTab === "profile" && (
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

      {/* ✅ Fixed Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex flex-col items-center ${activeTab === "game" ? "text-blue-600" : "text-gray-500"}`}
        >
          🎮
          <span className="text-xs">Game</span>
        </button>
        <button
          onClick={() => setActiveTab("wallet")}
          className={`flex flex-col items-center ${activeTab === "wallet" ? "text-blue-600" : "text-gray-500"}`}
        >
          💰
          <span className="text-xs">Wallet</span>
        </button>
        <button
          onClick={() => setActiveTab("premium")}
          className={`flex flex-col items-center ${activeTab === "premium" ? "text-blue-600" : "text-gray-500"}`}
        >
          👑
          <span className="text-xs">Premium</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center ${activeTab === "profile" ? "text-blue-600" : "text-gray-500"}`}
        >
          👤
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
}
