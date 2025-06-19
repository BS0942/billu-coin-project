import { useState } from "react";
import "./styles.css"; // যদি আলাদা styles লাগে

export default function App() {
  const [activeTab, setActiveTab] = useState("game");

  const cards = [
    {
      title: "Billu Fight Club",
      desc: "Special daily rewards for warriors!",
      image: "https://placehold.co/400x200?text=Fight+Club",
    },
    {
      title: "Billu King",
      desc: "Be the king of all Billu holders!",
      image: "https://placehold.co/400x200?text=Billu+King",
    },
    {
      title: "Billu Boost",
      desc: "Boost your daily income x2!",
      image: "https://placehold.co/400x200?text=Billu+Boost",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="p-4 bg-[#020617] text-center text-2xl font-bold">
        🐱 Billu Coin
      </header>

      {/* Top Tabs */}
      <div className="flex justify-around border-b border-gray-700 bg-[#0F172A]">
        <button
          onClick={() => setActiveTab("game")}
          className={`py-3 flex-1 ${activeTab === "game" ? "border-b-2 border-orange-400 text-orange-400" : "text-gray-400"}`}
        >
          Games
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={`py-3 flex-1 ${activeTab === "social" ? "border-b-2 border-orange-400 text-orange-400" : "text-gray-400"}`}
        >
          Social Media
        </button>
      </div>

      {/* Main Body */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="grid gap-4">
          {cards.map((card, i) => (
            <div key={i} className="bg-[#1E293B] rounded-xl overflow-hidden shadow">
              <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="text-gray-300">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="flex justify-around bg-[#020617] border-t border-gray-700 py-2">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex flex-col items-center ${activeTab === "game" ? "text-orange-400" : "text-gray-400"}`}
        >
          <span className="text-2xl">🏠</span>
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => setActiveTab("wallet")}
          className={`flex flex-col items-center ${activeTab === "wallet" ? "text-orange-400" : "text-gray-400"}`}
        >
          <span className="text-2xl">💰</span>
          <span className="text-xs">Wallet</span>
        </button>
        <button
          onClick={() => setActiveTab("boost")}
          className={`flex flex-col items-center ${activeTab === "boost" ? "text-orange-400" : "text-gray-400"}`}
        >
          <span className="text-2xl">⚡</span>
          <span className="text-xs">Boost</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center ${activeTab === "profile" ? "text-orange-400" : "text-gray-400"}`}
        >
          <span className="text-2xl">👤</span>
          <span className="text-xs">Profile</span>
        </button>
      </nav>
    </div>
  );
}
