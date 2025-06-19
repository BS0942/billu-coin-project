import { useState } from "react";
import { Gamepad, Wallet, Crown, User } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState('game');
  const [balance, setBalance] = useState(0);
  const [taps, setTaps] = useState(0);
  const dailyTapLimit = 1000;

  const handleTap = async () => {
    if (taps >= dailyTapLimit) {
      alert('Daily tap limit reached!');
      return;
    }
    const userid = "123"; // Example
    const res = await fetch('https://billu-coin-project.onrender.com/api/tap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid }),
    });
    const data = await res.json();
    setBalance(data.balance);
    setTaps(data.taps);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <main className="flex-1 p-4 overflow-auto">
        {activeTab === 'game' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">🎮 Tap Game</h1>
            <button
              onClick={handleTap}
              className="bg-blue-600 text-white px-6 py-3 rounded-full mb-4"
            >
              TAP +5 BILLU
            </button>
            <p>Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">💰 Wallet</h1>
            <p>Balance: {balance} BILLU</p>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">🌟 Premium</h1>
            <p>Coming soon...</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
            <p>@billu_coin_bot</p>
          </div>
        )}
      </main>

      {/* BOTTOM NAVBAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 flex justify-around py-2 border-t border-gray-700">
        <button onClick={() => setActiveTab('game')} className="flex flex-col items-center text-xs">
          <Gamepad className="h-6 w-6" />
          Game
        </button>
        <button onClick={() => setActiveTab('wallet')} className="flex flex-col items-center text-xs">
          <Wallet className="h-6 w-6" />
          Wallet
        </button>
        <button onClick={() => setActiveTab('premium')} className="flex flex-col items-center text-xs">
          <Crown className="h-6 w-6" />
          Premium
        </button>
        <button onClick={() => setActiveTab('profile')} className="flex flex-col items-center text-xs">
          <User className="h-6 w-6" />
          Profile
        </button>
      </nav>
    </div>
  );
}
