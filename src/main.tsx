import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Debug function
const debugRouting = () => {
  console.log('🚀 VTEEMO App Starting...');
  console.log('📍 Current URL:', window.location.href);
  console.log('📍 Pathname:', window.location.pathname);
  console.log('📍 Hash:', window.location.hash);
  console.log('📍 Search:', window.location.search);
  console.log('🕐 Time:', new Date().toISOString());
};

// Call debug function
debugRouting();

// Get root element with enhanced error handling
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  throw new Error('Root element with id="root" not found');
}

console.log('✅ Root element found:', rootElement);

// Enhanced loading screen removal
const removeLoadingScreen = () => {
  try {
    const loading = document.getElementById('loading-screen');
    if (loading) {
      console.log('🎯 Removing loading screen...');
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 0.8s ease';
      setTimeout(() => {
        if (loading && loading.parentNode) {
          loading.parentNode.removeChild(loading);
          console.log('✅ Loading screen removed successfully');
        }
      }, 800);
    } else {
      console.log('ℹ️ No loading screen found to remove');
    }
  } catch (error) {
    console.error('❌ Error removing loading screen:', error);
  }
};

// Create React root with error handling
let root;
try {
  root = ReactDOM.createRoot(rootElement);
  console.log('✅ React root created successfully');
} catch (error) {
  console.error('❌ Failed to create React root:', error);
  throw error;
}

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ React Error Boundary caught error:', error);
    console.error('❌ Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #6A0DAD 0%, #4B0082 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#FFD700' }}>
            ⚠️ VTEEMO Error
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Something went wrong loading the app
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#FFD700',
              color: '#1a1a2e',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Reload App
          </button>
          <button 
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Clear Cache & Reload
          </button>
          <details style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: '0.8' }}>
            <summary>Error Details</summary>
            <pre style={{ textAlign: 'left', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Render app with comprehensive error handling
try {
  console.log('🎯 Starting React render...');
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('✅ React render completed');
  
  // Remove loading screen after successful render
  setTimeout(() => {
    removeLoadingScreen();
  }, 100);
  
  console.log('🎉 VTEEMO App Loaded Successfully');
  
} catch (error) {
  console.error('❌ Critical error during React render:', error);
  
  // Fallback error display
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
        font-family: Inter, sans-serif;
      ">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #FFD700;">🚨 VTEEMO Loading Error</h1>
        <p style="font-size: 1.3rem; margin-bottom: 2rem; max-width: 600px;">
          We encountered an error while loading the premium video platform. Please try reloading the page.
        </p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
          <button onclick="window.location.reload()" style="
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #1a1a2e;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(255,215,0,0.3);
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            🔄 Reload Page
          </button>
          
          <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.reload();" style="
            background: linear-gradient(45deg, #ef4444, #dc2626);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(239,68,68,0.3);
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            🗑️ Clear Cache & Reload
          </button>
        </div>
        
        <details style="margin-top: 3rem; font-size: 0.9rem; opacity: 0.8; max-width: 800px;">
          <summary style="cursor: pointer; font-weight: bold;">🔍 Technical Details</summary>
          <div style="text-align: left; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; margin-top: 15px; font-family: monospace;">
            <strong>Error:</strong> ${error.message}<br>
            <strong>URL:</strong> ${window.location.href}<br>
            <strong>Time:</strong> ${new Date().toISOString()}<br>
            <strong>Browser:</strong> ${navigator.userAgent}
          </div>
        </details>
        
        <p style="font-size: 0.8rem; margin-top: 2rem; opacity: 0.6;">
          VTEEMO Premium Video Platform - Version 2.0.0
        </p>
      </div>
    `;
  }
  
  // Also remove loading screen in error case
  removeLoadingScreen();
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('❌ Global JavaScript Error:', event.error);
  console.error('📍 File:', event.filename, 'Line:', event.lineno, 'Col:', event.colno);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled Promise Rejection:', event.reason);
});

// Development helpers
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Development mode active');
  
  // Expose debugging functions
  window.VTEEMO_DEBUG = {
    removeLoading: removeLoadingScreen,
    reload: () => window.location.reload(),
    clearAll: () => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
  };
}