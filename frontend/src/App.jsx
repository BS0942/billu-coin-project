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
    const userid = "123";
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
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <main className="flex-1 p-6 pb-28">
        {activeTab === "game" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">🎮 Tap Game</h1>
            <button
              onClick={handleTap}
              className="bg-yellow-500 px-6 py-3 rounded-full text-xl"
            >
              TAP +5 BILLU
            </button>
            <p className="mt-4 text-lg">Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">💰 Wallet</h1>
            <p className="text-xl">Balance: {balance} BILLU</p>
          </div>
        )}

        {activeTab === "premium" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">👑 Premium</h1>
            <p className="text-xl">Exclusive perks coming soon!</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>
            <p className="text-xl">@billu_coin_bot</p>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 flex justify-around py-2">
        {[
          { name: "Game", icon: "🎮", tab: "game" },
          { name: "Wallet", icon: "💰", tab: "wallet" },
          { name: "Premium", icon: "👑", tab: "premium" },
          { name: "Profile", icon: "👤", tab: "profile" },
        ].map(({ name, icon, tab }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex flex-col items-center text-xs ${
              activeTab === tab ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            <span className="text-3xl">{icon}</span>
            <span className="mt-1">{name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
