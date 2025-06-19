// src/App.jsx
import { useState } from "react";
import { Gamepad, Wallet, Crown, User } from "lucide-react";

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
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-6">
        {activeTab === "game" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              🎮 Tap Game
            </h1>
            <button
              onClick={handleTap}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full mb-4"
            >
              TAP +5 BILLU
            </button>
            <p>Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}
        {activeTab === "wallet" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">💰 Wallet</h1>
            <p>Balance: {balance} BILLU</p>
          </div>
        )}
        {activeTab === "premium" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">👑 Premium</h1>
            <p>Exclusive premium features will be here.</p>
          </div>
        )}
        {activeTab === "profile" && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
            <p>Your user profile info here.</p>
          </div>
        )}
      </div>

      <nav className="flex justify-around items-center border-t bg-white py-3 shadow-md fixed bottom-0 left-0 right-0">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex flex-col items-center ${activeTab === "game" ? "text-indigo-600" : "text-gray-500"}`}
        >
          <Gamepad size={28} />
          <span className="text-xs">Game</span>
        </button>
        <button
          onClick={() => setActiveTab("wallet")}
          className={`flex flex-col items-center ${activeTab === "wallet" ? "text-indigo-600" : "text-gray-500"}`}
        >
          <Wallet size={28} />
          <span className="text-xs">Wallet</span>
        </button>
        <button
          onClick={() => setActiveTab("premium")}
          className={`flex flex-col items-center ${activeTab === "premium" ? "text-indigo-600" : "text-gray-500"}`}
        >
          <Crown size={28} />
          <span className="text-xs">Premium</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center ${activeTab === "profile" ? "text-indigo-600" : "text-gray-500"}`}
        >
          <User size={28} />
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
}
