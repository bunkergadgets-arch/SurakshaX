import React, { useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [upiLink, setUpiLink] = useState("");
  const [decodedLink, setDecodedLink] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // Translations
  const translations = {
    en: {
      title: "SurakshaX - Stay Safe from Cyber Scams",
      subtitle: "Your AI-powered shield against UPI fraud, phishing links, and voice scams",
      home: "Home",
      linkChecker: "Link Checker",
      voiceScam: "Voice Scams",
      emergency: "Emergency",
      darkMode: "Night Mode",
      lightMode: "Day Mode",
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
      voiceTitle: "Voice Scam Awareness",
      voiceDesc: "Listen to real scam call examples and learn how to protect yourself",
      playAudio: "Play Scam Call Example",
      stopAudio: "Stop Audio",
      quizTitle: "Can you spot the red flags?",
      quizQ1: "Does the caller ask for your UPI PIN?",
      quizQ2: "Is the caller creating urgency?",
      quizQ3: "Are they offering free money or prizes?",
      submitQuiz: "Submit Answers",
      resultSafe: "Great! You can recognize scam calls",
      resultRisky: "Be careful! Learn the warning signs",
      emergencyTitle: "What To Do If Scammed",
      step1: "1. Immediately call your bank's UPI helpline",
      step2: "2. Dial *123*2# to block UPI temporarily",
      step3: "3. Report at cybercrime.gov.in",
      step4: "4. Inform family members",
      step5: "5. Monitor your accounts closely",
    },
  };

  const t = translations[selectedLanguage] || translations.en;

  const decodeUPILink = () => {
    if (!upiLink.trim()) return;
    const mock = {
      payee: upiLink.includes("scam") ? "987654321@scam" : "validuser@bank",
      amount: upiLink.includes("99999") ? "₹99,999" : "₹100",
      bank: upiLink.includes("scam") ? "Fake Bank" : "State Bank of India",
      risk: upiLink.includes("scam") || upiLink.includes("99999") ? "danger" : "safe",
    };
    setDecodedLink(mock);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
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

      {/* Navigation */}
      <nav className="max-w-4xl mx-auto mb-6">
        <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
          {["home", "linkChecker", "voiceScam", "emergency"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-white dark:bg-slate-800 shadow' : ''}`}
            >
              {t[tab]}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        {activeTab === "home" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t.title}</h2>
            <p className="text-lg mb-6">{t.subtitle}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setActiveTab("linkChecker")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                {t.checkLink}
              </button>
              <button
                onClick={() => setActiveTab("voiceScam")}
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg"
              >
                {t.voiceScam}
              </button>
            </div>
          </div>
        )}

        {activeTab === "linkChecker" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.checkLink}</h2>
            <input
              type="text"
              value={upiLink}
              onChange={(e) => setUpiLink(e.target.value)}
              placeholder={t.pasteLink}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={decodeUPILink}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {t.decode}
            </button>
            {decodedLink && (
              <div className={`mt-6 p-4 rounded-lg ${decodedLink.risk === 'danger' ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'}`}>
                <h3 className="font-bold">Decoded Link:</h3>
                <p><strong>{t.payee}:</strong> {decodedLink.payee}</p>
                <p><strong>{t.amount}:</strong> {decodedLink.amount}</p>
                <p><strong>{t.bank}:</strong> {decodedLink.bank}</p>
                <p><strong>{t.risk}:</strong> <span style={{ color: decodedLink.risk === 'danger' ? 'red' : decodedLink.risk === 'warning' ? 'orange' : 'green' }}>
                  {t[decodedLink.risk]}
                </span></p>
              </div>
            )}
          </div>
        )}

        {activeTab === "voiceScam" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.voiceTitle}</h2>
            <p className="mb-4">{t.voiceDesc}</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
              {t.playAudio}
            </button>
          </div>
        )}

        {activeTab === "emergency" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.emergencyTitle}</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>{t.step1}</li>
              <li>{t.step2}</li>
              <li>{t.step3}</li>
              <li>{t.step4}</li>
              <li>{t.step5}</li>
            </ol>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
