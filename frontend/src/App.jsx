import { useState } from "react";

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
    const userid = "123"; // Example
    const res = await fetch(
      "https://billu-coin-project.onrender.com/api/tap",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid }),
      }
    );
    const data = await res.json();
    setBalance(data.balance);
    setTaps(data.taps);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {activeTab === "game" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">🎮 Tap Game</h1>
            <button
              onClick={handleTap}
              className="bg-blue-600 px-6 py-3 rounded-full text-lg"
            >
              TAP +5 BILLU
            </button>
            <p className="mt-4">Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">💰 Wallet</h1>
            <p className="text-xl">Balance: {balance} BILLU</p>
          </div>
        )}

        {activeTab === "premium" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">👑 Premium</h1>
            <p className="text-xl">Exclusive benefits coming soon!</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">👤 Profile</h1>
            <p className="text-xl">@billu_coin_bot</p>
          </div>
        )}
      </main>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around py-2">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex flex-col items-center text-xs ${activeTab === "game" ? "text-yellow-400" : "text-gray-300"}`}
        >
          <span className="text-2xl">🎮</span>
          Game
        </button>
        <button
          onClick={() => setActiveTab("wallet")}
          className={`flex flex-col items-center text-xs ${activeTab === "wallet" ? "text-yellow-400" : "text-gray-300"}`}
        >
          <span className="text-2xl">💰</span>
          Wallet
        </button>
        <button
          onClick={() => setActiveTab("premium")}
          className={`flex flex-col items-center text-xs ${activeTab === "premium" ? "text-yellow-400" : "text-gray-300"}`}
        >
          <span className="text-2xl">👑</span>
          Premium
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center text-xs ${activeTab === "profile" ? "text-yellow-400" : "text-gray-300"}`}
        >
          <span className="text-2xl">👤</span>
          Profile
        </button>
      </nav>
    </div>
  );
}
