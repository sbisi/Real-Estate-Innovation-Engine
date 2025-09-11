// API service for backend communication
const API_BASE_URL = 'http://localhost:5001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
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
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Trend Management APIs
  async getTrendPhases() {
    return this.request('/trend-phases');
  }

  async getTrendDashboard() {
    return this.request('/trends/analytics/dashboard');
  }

  async getTrendCorrelations() {
    return this.request('/trends/correlations');
  }

  async searchTrends(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/trends/search?${queryString}`);
  }

  async getContentScores(contentId) {
    return this.request(`/contents/${contentId}/scores`);
  }

  async getContentHistory(contentId) {
    return this.request(`/contents/${contentId}/history`);
  }

  async getContentMetrics(contentId) {
    return this.request(`/contents/${contentId}/metrics`);
  }

  async getTrendAlerts(userId = null) {
    const params = userId ? `?user_id=${userId}` : '';
    return this.request(`/trend-alerts${params}`);
  }

  async getTrendTags() {
    return this.request('/trend-tags');
  }

  // Content APIs
  async getContent() {
    return this.request('/content');
  }

  async getContentById(id) {
    return this.request(`/content/${id}`);
  }

  async createContent(data) {
    return this.request('/content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContent(id, data) {
    return this.request(`/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteContent(id) {
    return this.request(`/content/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();

