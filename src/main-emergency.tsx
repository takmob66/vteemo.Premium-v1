import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Simple test pages
const HomePage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">🎥 VTEEMO - Emergency Mode</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl mb-4">Navigation Test</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/premium" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-center">
            Premium
          </Link>
          <Link to="/upload" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-center">
            Upload
          </Link>
          <Link to="/test" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-center">
            Test API
          </Link>
          <Link to="/rewards" className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-center">
            Rewards
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl mb-4">Current Status</h2>
        <ul className="space-y-2 text-gray-300">
          <li>✅ React App Loaded</li>
          <li>✅ Hash Router Working</li>
          <li>✅ Navigation Links Active</li>
          <li>🔗 Current URL: {window.location.href}</li>
        </ul>
      </div>
    </div>
  </div>
);

const PremiumPage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4">👑 Premium Page</h1>
      <div className="bg-gradient-to-r from-purple-600 to-gold-500 p-6 rounded-lg">
        <p className="text-white">This is the Premium page! Navigation is working! 🎉</p>
      </div>
    </div>
  </div>
);

const UploadPage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4">📤 Upload Page</h1>
      <div className="bg-blue-600 p-6 rounded-lg">
        <p className="text-white">Upload functionality would go here! 🎥</p>
      </div>
    </div>
  </div>
);

const TestPage = () => {
  const [apiStatus, setApiStatus] = React.useState('Testing...');

  React.useEffect(() => {
    fetch('https://vteemo-backend.liara.run/api/health')
      .then(res => res.json())
      .then(() => setApiStatus('✅ API Working'))
      .catch(() => setApiStatus('❌ API Failed'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">← Back to Home</Link>
        <h1 className="text-3xl font-bold mb-4">🧪 API Test Page</h1>
        <div className="bg-green-600 p-6 rounded-lg">
          <p className="text-white mb-4">API Status: {apiStatus}</p>
          <p>Backend: https://vteemo-backend.liara.run</p>
        </div>
      </div>
    </div>
  );
};

const RewardsPage = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4">🎁 Rewards Page</h1>
      <div className="bg-yellow-600 p-6 rounded-lg">
        <p className="text-black font-bold">Rewards system coming soon! 🏆</p>
      </div>
    </div>
  </div>
);

// Emergency App
const EmergencyApp = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/premium" element={<PremiumPage />} />
    <Route path="/upload" element={<UploadPage />} />
    <Route path="/test" element={<TestPage />} />
    <Route path="/rewards" element={<RewardsPage />} />
  </Routes>
);

// Get root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Remove loading screen
const removeLoading = () => {
  const loading = document.getElementById('loading-screen');
  if (loading) loading.remove();
};

// Render emergency app
const root = ReactDOM.createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <HashRouter>
        <EmergencyApp />
      </HashRouter>
    </React.StrictMode>
  );
  
  removeLoading();
  console.log('🚨 VTEEMO Emergency Mode Loaded');
  
} catch (error) {
  console.error('❌ Emergency mode failed:', error);
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; background: #1f2937; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <h1 style="color: #ef4444;">خطای اضطراری</h1>
        <p>متأسفانه حتی حالت اضطراری هم کار نکرد</p>
        <button onclick="window.location.reload()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">
          تلاش مجدد
        </button>
      </div>
    `;
  }
}