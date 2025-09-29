import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Debug function
const debugRouting = () => {
  console.log('🚀 VTEEMO App Starting...');
  console.log('Current URL:', window.location.href);
  console.log('Pathname:', window.location.pathname);
  console.log('React Router Version:', require('react-router-dom/package.json')?.version || 'Unknown');
};

// Call debug function
debugRouting();

// Get root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Create React root
const root = ReactDOM.createRoot(rootElement);

// Remove loading screen when React loads
const removeLoadingScreen = () => {
  const loading = document.getElementById('loading-screen');
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (loading.parentNode) {
          loading.parentNode.removeChild(loading);
        }
      }, 500);
    }, 500);
  }
};

// Render app with error boundary
try {
  root.render(
    <React.StrictMode>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  
  // Remove loading screen after render
  removeLoadingScreen();
  console.log('✅ VTEEMO App Loaded Successfully');
  
} catch (error) {
  console.error('❌ Error loading VTEEMO App:', error);
  
  // Show error message
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        height: 100vh; 
        background: linear-gradient(135deg, #6A0DAD 0%, #4B0082 100%);
        color: white;
        text-align: center;
        padding: 20px;
      ">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">خطا در بارگذاری VTEEMO</h1>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">متأسفانه مشکلی در بارگذاری اپلیکیشن پیش آمده</p>
        <button onclick="window.location.reload()" style="
          background: #FFD700;
          color: #1a1a2e;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
        ">تلاش مجدد</button>
        <p style="font-size: 0.9rem; margin-top: 2rem; opacity: 0.8;">
          Error: ${error.message}
        </p>
      </div>
    `;
  }
}