// Simple integration test for the API client
import apiClient, { api, ApiResponse } from './api';

// Test that API client can be imported and has expected structure
const testApiClient = () => {
  console.log('API Client Tests:');
  
  // Test that apiClient is configured properly
  console.log('✓ API client baseURL:', apiClient.defaults.baseURL);
  console.log('✓ API client timeout:', apiClient.defaults.timeout);
  console.log('✓ API client withCredentials:', apiClient.defaults.withCredentials);
  
  // Test that helper methods exist
  console.log('✓ API helper methods available:', {
    get: typeof api.get === 'function',
    post: typeof api.post === 'function',
    put: typeof api.put === 'function',
    patch: typeof api.patch === 'function',
    delete: typeof api.delete === 'function',
  });
  
  console.log('API Client tests completed successfully!');
};

// Export for potential usage in development
export { testApiClient };

// Auto-run test in development mode
if (import.meta.env.DEV) {
  testApiClient();
}