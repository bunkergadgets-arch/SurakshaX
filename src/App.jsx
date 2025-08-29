import React, { useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [upiLink, setUpiLink] = useState("");
  const [decodedLink, setDecodedLink] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const t = {
    en: {
      home: "Home",
      linkChecker: "Link Checker",
      voiceScam: "Voice Scams",
      emergency: "Emergency",
      checkLink: "Check UPI Link",
      pasteLink: "Paste UPI link here...",
      decode: "Decode Link",
      payee: "Payee",
      amount: "Amount",
      bank: "Bank/Service",
      risk: "Risk Level",
      safe: "Safe",
      warning: "Warning",
      danger: "Danger",
      title: "SurakshaX - Stay Safe from Cyber Scams",
      subtitle: "Your AI-powered shield against UPI fraud, phishing links, and voice scams",
      darkMode: "Night Mode",
      lightMode: "Day Mode",
    }
  };

  const decodeUPILink = () => {
    if (!upiLink.trim()) return;
    const mock = {
      payee: upiLink.includes("scam") ? "987654321@scam" : "validuser@bank",
      amount: upiLink.includes("99999") ? "₹99,999" : "₹100",
      bank: upiLink.includes("scam") ? "Fake Bank" : "State Bank of India",
      risk: upiLink.includes("scam") || upiLink.includes("99999") ? "danger" : "safe"
    };
    setDecodedLink(mock);
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className="p-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">SurakshaX</h1>
          <div className="flex items-center gap-4">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent border border-blue-500 rounded px-2 py-1 text-sm"
            >
              <option value="en">English</option>
            </select>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-blue-600 text-white rounded"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="max-w-4xl mx-auto mb-6">
        <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
          {["home", "linkChecker", "voiceScam", "emergency"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-white dark:bg-slate-800 shadow' : ''}`}
            >
              {t.en[tab]}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        {activeTab === "home" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t.en.title}</h2>
            <p className="text-lg mb-6">{t.en.subtitle}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setActiveTab("linkChecker")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                {t.en.checkLink}
              </button>
              <button
                onClick={() => setActiveTab("voiceScam")}
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg"
              >
                {t.en.voiceScam}
              </button>
            </div>
          </div>
        )}

        {activeTab === "linkChecker" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.en.checkLink}</h2>
            <input
              type="text"
              value={upiLink}
              onChange={(e) => setUpiLink(e.target.value)}
              placeholder={t.en.pasteLink}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button onClick={decodeUPILink} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              {t.en.decode}
            </button>
            {decodedLink && (
              <div className={`mt-6 p-4 rounded-lg ${decodedLink.risk === 'danger' ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'}`}>
                <h3>Decoded:</h3>
                <p><strong>{t.en.payee}:</strong> {decodedLink.payee}</p>
                <p><strong>{t.en.amount}:</strong> {decodedLink.amount}</p>
                <p><strong>{t.en.bank}:</strong> {decodedLink.bank}</p>
                <p><strong>{t.en.risk}:</strong> <span style={{ color: decodedLink.risk === 'danger' ? 'red' : 'green' }}>{t.en[decodedLink.risk]}</span></p>
              </div>
            )}
          </div>
        )}

        {activeTab === "voiceScam" && <div>🎤 Voice Scam Awareness Coming Soon</div>}
        {activeTab === "emergency" && <div>🚨 Emergency Guide Coming Soon</div>}
      </main>
    </div>
  );
};

export default App;
