import { useState } from "react";
import "./index.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("game");
  const [taps, setTaps] = useState(0);
  const dailyTapLimit = 1000;

  const handleTap = () => {
    if (taps >= dailyTapLimit) {
      alert("Daily tap limit reached!");
      return;
    }
    setTaps(taps + 5);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-white">
      {/* TOP BAR */}
      <header className="bg-[#020617] text-center py-4 text-lg font-bold">
        🐱 Billu Coin
      </header>

      {/* TOP TABS */}
      <div className="flex justify-around bg-[#0F172A] border-b border-gray-700">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex-1 py-3 ${
            activeTab === "game"
              ? "border-b-2 border-orange-400 text-orange-400"
              : "text-gray-400"
          }`}
        >
          Games
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`flex-1 py-3 ${
            activeTab === "social"
              ? "border-b-2 border-orange-400 text-orange-400"
              : "text-gray-400"
          }`}
        >
          Social Media
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {activeTab === "game" && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold mb-2">🎮 Tap Game</h2>
            <button
              onClick={handleTap}
              className="bg-orange-500 text-white px-10 py-6 rounded-full text-xl shadow active:scale-95 transition"
            >
              TAP +5 BILLU
            </button>
            <p className="text-gray-300">
              Taps: {taps} / {dailyTapLimit}
            </p>
          </div>
        )}

        {activeTab === "social" && (
          <div className="text-center">
            <h2 className="text-xl font-bold">🌐 Social Media</h2>
            <p className="text-gray-400 mt-2">
              Follow Billu Coin on Social Media for updates!
            </p>
          </div>
        )}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="flex justify-around bg-[#020617] border-t border-gray-700 py-2 fixed bottom-0 left-0 w-full">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex flex-col items-center ${
            activeTab === "game" ? "text-orange-400" : "text-gray-400"
          }`}
        >
          <span className="text-2xl">🏠</span>
          <span className="text-xs">Game</span>
        </button>
        <button
          onClick={() => setActiveTab("wallet")}
          className={`flex flex-col items-center ${
            activeTab === "wallet" ? "text-orange-400" : "text-gray-400"
          }`}
        >
          <span className="text-2xl">💰</span>
          <span className="text-xs">Wallet</span>
        </button>
        <button
          onClick={() => setActiveTab("boost")}
          className={`flex flex-col items-center ${
            activeTab === "boost" ? "text-orange-400" : "text-gray-400"
          }`}
        >
          <span className="text-2xl">⚡</span>
          <span className="text-xs">Boost</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center ${
            activeTab === "profile" ? "text-orange-400" : "text-gray-400"
          }`}
        >
          <span className="text-2xl">👤</span>
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
}
