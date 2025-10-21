import type {
  AnalysisRequest,
  AnalysisResponse,
  Search,
  Tweet,
  Report,
  SavedSearch,
  User,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * API client for VoxLens backend
 */
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request<{ access_token: string; refresh_token: string }>(
      '/api/v1/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
  }

  async register(email: string, password: string, fullName?: string) {
    return this.request<{ message: string }>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName }),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request<{ access_token: string }>('/api/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  // Analysis
  async startAnalysis(request: AnalysisRequest): Promise<AnalysisResponse> {
    return this.request<AnalysisResponse>('/api/v1/analyze', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getAnalysis(searchId: string): Promise<Search> {
    return this.request<Search>(`/api/v1/analyze/${searchId}`);
  }

  async getTweets(searchId: string): Promise<Tweet[]> {
    return this.request<Tweet[]>(`/api/v1/analyze/${searchId}/tweets`);
  }

  async deleteAnalysis(searchId: string): Promise<void> {
    return this.request<void>(`/api/v1/analyze/${searchId}`, {
      method: 'DELETE',
    });
  }

  // Searches
  async getSearchHistory(): Promise<Search[]> {
    return this.request<Search[]>('/api/v1/searches');
  }

  async getSavedSearches(): Promise<SavedSearch[]> {
    return this.request<SavedSearch[]>('/api/v1/searches/saved');
  }

  async saveSearch(
    query: string,
    alertEnabled: boolean = false
  ): Promise<SavedSearch> {
    return this.request<SavedSearch>('/api/v1/searches/save', {
      method: 'POST',
      body: JSON.stringify({ query, alert_enabled: alertEnabled }),
    });
  }

  async deleteSavedSearch(searchId: string): Promise<void> {
    return this.request<void>(`/api/v1/searches/${searchId}`, {
      method: 'DELETE',
    });
  }

  // Reports
  async generateReport(
    searchId: string,
    format: 'pdf' | 'csv' | 'json'
  ): Promise<Report> {
    return this.request<Report>('/api/v1/reports/generate', {
      method: 'POST',
      body: JSON.stringify({ search_id: searchId, format }),
    });
  }

  async getReport(reportId: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/api/v1/reports/${reportId}`, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    });

    if (!response.ok) {
      throw new Error('Failed to download report');
    }

    return response.blob();
  }

  async getReports(): Promise<Report[]> {
    return this.request<Report[]>('/api/v1/reports');
  }

  // User
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/v1/users/me');
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/api/v1/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getCredits(): Promise<{
    credits_remaining: number;
    credits_reset_date: string;
  }> {
    return this.request('/api/v1/users/me/credits');
  }
}

export const apiClient = new ApiClient(API_URL);
