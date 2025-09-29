const API_BASE = import.meta.env.VITE_API_ENDPOINT || 'https://vteemo-backend.liara.run/api';

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export const apiService = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  },

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },

  // Health check
  async checkHealth(): Promise<ApiResponse> {
    return this.get('/health');
  },

  // Authentication
  async login(credentials: { email: string; password: string }): Promise<ApiResponse> {
    return this.post('/auth/login', credentials);
  },

  async register(userData: { name: string; email: string; password: string }): Promise<ApiResponse> {
    return this.post('/auth/register', userData);
  },

  async logout(): Promise<ApiResponse> {
    return this.post('/auth/logout', {});
  },

  // Videos
  async getVideos(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    
    const endpoint = `/videos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(endpoint);
  },

  async getVideo(id: string): Promise<ApiResponse> {
    return this.get(`/videos/${id}`);
  },

  async uploadVideo(videoData: FormData): Promise<ApiResponse> {
    return this.request('/videos/upload', {
      method: 'POST',
      body: videoData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  },

  async updateVideo(id: string, videoData: any): Promise<ApiResponse> {
    return this.put(`/videos/${id}`, videoData);
  },

  async deleteVideo(id: string): Promise<ApiResponse> {
    return this.delete(`/videos/${id}`);
  },

  // Users
  async getProfile(): Promise<ApiResponse> {
    return this.get('/users/profile');
  },

  async updateProfile(profileData: any): Promise<ApiResponse> {
    return this.put('/users/profile', profileData);
  },

  // Admin endpoints
  async getUsers(params?: { page?: number; limit?: number }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const endpoint = `/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(endpoint);
  },

  async getAnalytics(): Promise<ApiResponse> {
    return this.get('/admin/analytics');
  },

  // Premium content
  async getPremiumVideos(): Promise<ApiResponse> {
    return this.get('/videos/premium');
  },

  async subscribeToPremium(planData: any): Promise<ApiResponse> {
    return this.post('/premium/subscribe', planData);
  }
};

export default apiService;