import { useEffect, useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('game');
  const [balance, setBalance] = useState(0);
  const [taps, setTaps] = useState(0);
  const dailyTapLimit = 1000;

  useEffect(() => {
    // Fake loading delay for demo (2s)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTap = async () => {
    if (taps >= dailyTapLimit) {
      alert('Daily tap limit reached!');
      return;
    }

    const userid = "123";
    const res = await fetch('https://billu-coin-project.onrender.com/api/tap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid }),
    });
    const data = await res.json();
    setBalance(data.balance);
    setTaps(data.taps);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <img src="/hamster_loading.gif" alt="Loading..." />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="content">
        {activeTab === 'game' && (
          <div className="tab">
            <h2>🎮 Tap Game</h2>
            <button onClick={handleTap}>TAP +5 BILLU</button>
            <p>Taps: {taps} / {dailyTapLimit}</p>
          </div>
        )}
        {activeTab === 'wallet' && (
          <div className="tab">
            <h2>💰 Wallet</h2>
            <p>Balance: <strong>{balance} BILLU</strong></p>
            <button>Buy in Pre-sale</button>
          </div>
        )}
        {activeTab === 'premium' && (
          <div className="tab">
            <h2>🌟 Premium Packages</h2>
            <ul>
              <li>🥉 Bronze - $20 - 2500 taps/day</li>
              <li>🥈 Silver - $40 - 5500 taps/day</li>
              <li>🥇 Gold - $50 - 7500 taps/day</li>
            </ul>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="tab">
            <h2>👤 Profile</h2>
            <p>Username: @username</p>
            <p>Referral: https://t.me/billu_coin_bot?start=123456</p>
          </div>
        )}
      </div>

      <nav className="nav">
        <button onClick={() => setActiveTab('game')}>🎮 Game</button>
        <button onClick={() => setActiveTab('wallet')}>💰 Wallet</button>
        <button onClick={() => setActiveTab('premium')}>🌟 Premium</button>
        <button onClick={() => setActiveTab('profile')}>👤 Profile</button>
      </nav>
    </div>
  );
}
