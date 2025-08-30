import React, { useState, useEffect } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [upiLink, setUpiLink] = useState("");
  const [decodedLink, setDecodedLink] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Language translations
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
      language: "Language",
      scanComplete: "Link analysis complete",
      threatDetected: "Threat detected!",
      allClear: "All systems clear",
      premiumFeature: "Premium Feature",
      loading: "Analyzing link...",
    },
  };

  const t = translations[selectedLanguage] || translations.en;

  // Simulate UPI link decoding
  const decodeUPILink = () => {
    if (!upiLink.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      const mock = {
        payee: upiLink.includes("scam") ? "987654321@scam" : "validuser@bank",
        amount: upiLink.includes("99999") ? "₹99,999" : "₹100",
        bank: upiLink.includes("scam") ? "Fake Bank" : "State Bank of India",
        risk: upiLink.includes("scam") || upiLink.includes("99999") ? "danger" : "safe",
      };
      setDecodedLink(mock);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setIsLoading(false);
    }, 1500);
  };

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Simulate audio play
  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
    setTimeout(() => setAudioPlaying(false), 3000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}>
      <style jsx>{`
        .dark * {
          color: #ffffff !important;
        }
      `}</style>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-6 z-50 bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-4 border border-blue-100 dark:border-blue-900 max-w-sm">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-3 ${decodedLink?.risk === 'danger' ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {decodedLink?.risk === 'danger' ? t.threatDetected : t.allClear}
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-6 lg:mb-0">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.165-2.052-.477-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">SurakshaX</h1>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm pl-3 pr-8 py-2 rounded-xl shadow-sm">
              <option value="en">English</option>
            </select>
            <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900">
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-1 shadow-lg">
            {["home", "linkChecker", "voiceScam", "emergency"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-6 rounded-xl font-semibold ${activeTab === tab ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                {t[tab]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {activeTab === "home" && (
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">SurakshaX</h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12">{t.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => setActiveTab("linkChecker")} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold">
                {t.checkLink}
              </button>
            </div>
          </div>
        )}

        {activeTab === "linkChecker" && (
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">
            <div className="space-y-8">
              <div>
                <label className="block text-lg mb-3 text-slate-700 dark:text-slate-300">{t.pasteLink}</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={upiLink}
                    onChange={(e) => setUpiLink(e.target.value)}
                    placeholder="upi://pay?pa=example@upi&pn=Payee&am=100"
                    className="flex-1 px-6 py-4 text-lg border border-blue-200 dark:border-blue-800 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                  <button
                    onClick={decodeUPILink}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
                  >
                    {isLoading ? "🔍 Analyzing..." : "Decode Link"}
                  </button>
                </div>
              </div>

              {decodedLink && !isLoading && (
                <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700/50 dark:to-slate-800/50 border border-blue-200 dark:border-blue-800/30">
                  <h3 className="text-2xl font-bold mb-6">Decoded Link Information</h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white dark:bg-slate-700 p-6 rounded-xl">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t.payee}</p>
                      <p className="text-lg font-semibold">{decodedLink.payee}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-700 p-6 rounded-xl">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t.amount}</p>
                      <p className="text-lg font-semibold">{decodedLink.amount}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-700 p-6 rounded-xl">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t.bank}</p>
                      <p className="text-lg font-semibold">{decodedLink.bank}</p>
                    </div>
                  </div>
                  <div className={`p-6 rounded-xl border-2 ${decodedLink.risk === 'safe' ? 'border-green-200' : 'border-red-200'}`}>
                    <p className="font-semibold text-lg">{decodedLink.risk === 'safe' ? t.allClear : t.threatDetected}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "voiceScam" && (
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t.voiceTitle}</h2>
            <p className="text-xl mb-8">{t.voiceDesc}</p>
            <button
              onClick={toggleAudio}
              className={`px-8 py-4 rounded-2xl font-bold text-lg ${audioPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
            >
              {audioPlaying ? t.stopAudio : t.playAudio}
            </button>
          </div>
        )}

        {activeTab === "emergency" && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">{t.emergencyTitle}</h2>
            <ol className="space-y-4 text-xl">
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
