import React, { useState } from 'react';
import { connectionTester, ConnectionTestResult } from '../services/connectionTester';
import { CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';

const ConnectionTest: React.FC = () => {
  const [results, setResults] = useState<{ [key: string]: ConnectionTestResult } | null>(null);
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    setResults(null);

    try {
      const testResults = await connectionTester.testAllEndpoints();
      setResults(testResults);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setTesting(false);
    }
  };

  const runSingleTest = async () => {
    setTesting(true);
    
    try {
      const result = await connectionTester.testConnection();
      setResults({ health: result });
    } catch (error) {
      console.error('Single test failed:', error);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">VTEEMO Connection Test</h1>
          <p className="text-gray-400">Test connection to backend API</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Backend URL:</strong>
              <br />
              <code className="text-blue-400">
                {import.meta.env.VITE_API_ENDPOINT || 'https://vteemo-backend.liara.run/api'}
              </code>
            </div>
            <div>
              <strong>Frontend URL:</strong>
              <br />
              <code className="text-green-400">
                {import.meta.env.VITE_APP_URL || 'https://vteemo.com'}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Test Controls</h2>
            <div className="space-x-2">
              <button
                onClick={runSingleTest}
                disabled={testing}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {testing ? <Loader className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                <span>Quick Test</span>
              </button>
              <button
                onClick={runTests}
                disabled={testing}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {testing ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                <span>Full Test</span>
              </button>
            </div>
          </div>
        </div>

        {results && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Test Results</h2>
            {Object.entries(results).map(([name, result]) => (
              <div
                key={name}
                className={`bg-gray-800 rounded-lg p-4 border-l-4 ${
                  result.success ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <h3 className="font-semibold capitalize">{name} Endpoint</h3>
                  </div>
                  {result.details && (
                    <span className="text-sm text-gray-400">
                      {result.details.responseTime}ms
                    </span>
                  )}
                </div>
                
                <p className={`text-sm ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                  {result.message}
                </p>
                
                {result.details && (
                  <div className="mt-2 text-xs text-gray-500">
                    <div>Endpoint: {result.details.endpoint}</div>
                    <div>Status: {result.details.status}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!results && !testing && (
          <div className="text-center py-12">
            <p className="text-gray-400">Click a test button to check API connectivity</p>
          </div>
        )}

        {testing && (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-500" />
            <p className="text-gray-400">Testing connections...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionTest;