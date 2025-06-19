import { useState } from "react";
import BottomNavbar from "./components/BottomNavbar";

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

    const userid = "123"; // Replace with real user ID
    const res = await fetch("https://billu-coin-project.onrender.com/api/tap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid }),
    });

    const data = await res.json();
    setBalance(data.balance);
    setTaps(data.taps);
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-900 text-white flex flex-col">
      <div className="flex-1 p-4">
        {activeTab === "game" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">🎮 Tap Game</h1>
            <button
              onClick={handleTap}
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg shadow"
            >
              TAP +5 BILLU
            </button>
            <p className="mt-4">Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">💰 Wallet</h2>
            <p>Balance: <strong>{balance} BILLU</strong></p>
          </div>
        )}

        {activeTab === "premium" && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">🌟 Premium Packages</h2>
            <ul className="space-y-3">
              <li className="border p-3 rounded shadow">🥉 Bronze - $20 - 2500 taps/day</li>
              <li className="border p-3 rounded shadow">🥈 Silver - $40 - 5500 taps/day</li>
              <li className="border p-3 rounded shadow">🥇 Gold - $50 - 7500 taps/day</li>
            </ul>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
            <p>Username: @username</p>
            <p className="mt-2">Referral Link:</p>
            <input
              className="w-full p-2 border rounded mt-1 text-black"
              readOnly
              value="https://t.me/billu_coin_bot?start=123456"
            />
          </div>
        )}
      </div>

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
