import { useState } from "react";
import "./index.css";
import {
  Gamepad2,
  Wallet2,
  Crown,
  User2
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("game");
  const [balance, setBalance] = useState(0);
  const [taps, setTaps] = useState(0);
  const dailyTapLimit = 1000;

  const handleTap = () => {
    if (taps >= dailyTapLimit) {
      alert("Daily tap limit reached!");
      return;
    }
    setTaps(taps + 1);
    setBalance(balance + 5);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-white relative">
      {/* Header */}
      <div className="text-xl font-bold p-4 border-b border-gray-700">
        Billu Coin 🐱
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "game" && (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">🎮 Tap Game</h1>
            <button
              onClick={handleTap}
              className="bg-blue-600 px-6 py-3 rounded-full text-xl font-semibold shadow hover:bg-blue-700 active:scale-95 transition"
            >
              TAP +5 BILLU
            </button>
            <div className="text-gray-300">Taps: {taps} / {dailyTapLimit}</div>
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">💰 Wallet</h2>
            <p>Balance: <strong>{balance} BILLU</strong></p>
            <button className="bg-green-600 px-4 py-2 rounded-full mt-4">
              Buy in Pre-sale
            </button>
          </div>
        )}

        {activeTab === "premium" && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">🌟 Premium Packages</h2>
            <div className="space-y-2">
              <div className="bg-gray-800 p-4 rounded-lg">🥉 Bronze - $20 - 2500 taps/day</div>
              <div className="bg-gray-800 p-4 rounded-lg">🥈 Silver - $40 - 5500 taps/day</div>
              <div className="bg-gray-800 p-4 rounded-lg">🥇 Gold - $50 - 7500 taps/day</div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">👤 Profile</h2>
            <p>Username: @billu_coin_bot</p>
            <p className="text-sm text-gray-400">Referral Link:</p>
            <input
              className="w-full p-2 border rounded bg-gray-900"
              readOnly
              value="https://t.me/billu_coin_bot?start=123456"
            />
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-[#0B1220] border-t border-gray-800 py-2">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex flex-col items-center ${activeTab === "game" ? "text-white" : "text-gray-500"}`}
        >
          <Gamepad2 size={24} />
          <span className="text-xs">Game</span>
        </button>
        <button
          onClick={() => setActiveTab("wallet")}
          className={`flex flex-col items-center ${activeTab === "wallet" ? "text-white" : "text-gray-500"}`}
        >
          <Wallet2 size={24} />
          <span className="text-xs">Wallet</span>
        </button>
        <button
          onClick={() => setActiveTab("premium")}
          className={`flex flex-col items-center ${activeTab === "premium" ? "text-white" : "text-gray-500"}`}
        >
          <Crown size={24} />
          <span className="text-xs">Premium</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center ${activeTab === "profile" ? "text-white" : "text-gray-500"}`}
        >
          <User2 size={24} />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
}
