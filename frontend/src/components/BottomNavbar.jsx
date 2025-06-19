import { Gamepad2, Wallet2, Crown, User2 } from "lucide-react";

export default function BottomNavbar({ activeTab, setActiveTab }) {
  const buttons = [
    { key: "game", icon: <Gamepad2 size={26} />, label: "Game" },
    { key: "wallet", icon: <Wallet2 size={26} />, label: "Wallet" },
    { key: "premium", icon: <Crown size={26} />, label: "Premium" },
    { key: "profile", icon: <User2 size={26} />, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow flex justify-around py-2">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => setActiveTab(btn.key)}
          className={`flex flex-col items-center text-xs ${
            activeTab === btn.key ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {btn.icon}
          <span className="mt-1">{btn.label}</span>
        </button>
      ))}
    </nav>
  );
}
