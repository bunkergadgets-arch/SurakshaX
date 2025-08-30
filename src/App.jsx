import React, { useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [upiLink, setUpiLink] = useState("");
  const [decodedLink, setDecodedLink] = useState(null);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className="p-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">SurakshaX</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-blue-600 text-white rounded">
            {darkMode ? "☀️" : "🌙"}
          </button>
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
              {tab === "home" && "HomeAsd"}
              {tab === "linkChecker" && "Link Checker"}
              {tab === "voiceScam" && "Voice Scams"}
              {tab === "emergency" && "Emergency"}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        {activeTab === "home" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">SurakshaX - Stay Safe from Cyber Scams</h2>
            <p className="text-lg mb-6">Your AI-powered shield against UPI fraud, phishing links, and voice scams</p>
            <button
              onClick={() => setActiveTab("linkChecker")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Check UPI Link
            </button>
          </div>
        )}

        {activeTab === "linkChecker" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Check UPI Link</h2>
            <input
              type="text"
              value={upiLink}
              onChange={(e) => setUpiLink(e.target.value)}
              placeholder="Paste UPI link here..."
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={() => setDecodedLink({ risk: upiLink.includes('scam') ? 'danger' : 'safe' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Decode Link
            </button>
            {decodedLink && (
              <div className={`mt-6 p-4 rounded-lg ${decodedLink.risk === 'danger' ? 'bg-red-100' : 'bg-green-100'}`}>
                <p><strong>Risk Level:</strong> {decodedLink.risk}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "voiceScam" && <div>🎤 Voice Scam Awareness</div>}
        {activeTab === "emergency" && <div>🚨 Emergency Guide</div>}
      </main>
    </div>
  );
};

export default App;
