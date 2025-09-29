import { apiService } from './apiService';

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  details?: {
    endpoint: string;
    status: number;
    responseTime: number;
  };
}

export class ConnectionTester {
  async testConnection(): Promise<ConnectionTestResult> {
    const startTime = Date.now();
    
    try {
      const result = await apiService.checkHealth();
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        message: 'Successfully connected to VTEEMO backend',
        details: {
          endpoint: 'https://vteemo-backend.liara.run/api/health',
          status: 200,
          responseTime
        }
      };
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
        details: {
          endpoint: 'https://vteemo-backend.liara.run/api/health',
          status: 0,
          responseTime
        }
      };
    }
  }

  async testAllEndpoints(): Promise<{ [key: string]: ConnectionTestResult }> {
    const tests = {
      health: () => apiService.checkHealth(),
      videos: () => apiService.getVideos({ limit: 1 }),
    };

    const results: { [key: string]: ConnectionTestResult } = {};

    for (const [name, test] of Object.entries(tests)) {
      const startTime = Date.now();
      
      try {
        await test();
        const responseTime = Date.now() - startTime;
        
        results[name] = {
          success: true,
          message: `${name} endpoint working`,
          details: {
            endpoint: `https://vteemo-backend.liara.run/api/${name}`,
            status: 200,
            responseTime
          }
        };
      } catch (error: any) {
        const responseTime = Date.now() - startTime;
        
        results[name] = {
          success: false,
          message: `${name} endpoint failed: ${error.message}`,
          details: {
            endpoint: `https://vteemo-backend.liara.run/api/${name}`,
            status: 0,
            responseTime
          }
        };
      }
    }

    return results;
  }
}

export const connectionTester = new ConnectionTester();