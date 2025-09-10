const API_BASE_URL = 'http://localhost:5000/api'

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Content endpoints
  async getContents(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/contents?${queryString}` : '/contents'
    return this.request(endpoint)
  }

  async getContent(id) {
    return this.request(`/contents/${id}`)
  }

  async createContent(contentData) {
    return this.request('/contents', {
      method: 'POST',
      body: JSON.stringify(contentData),
    })
  }

  async updateContent(id, contentData) {
    return this.request(`/contents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contentData),
    })
  }

  async deleteContent(id) {
    return this.request(`/contents/${id}`, {
      method: 'DELETE',
    })
  }

  // Rating endpoints
  async rateContent(contentId, rating, criteria = null) {
    return this.request(`/contents/${contentId}/ratings`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1, // Default user for demo
        value: rating,
        criteria: criteria,
      }),
    })
  }

  async getContentRatings(contentId) {
    return this.request(`/contents/${contentId}/ratings`)
  }

  // Comment endpoints
  async addComment(contentId, text) {
    return this.request(`/contents/${contentId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1, // Default user for demo
        text: text,
      }),
    })
  }

  async getContentComments(contentId) {
    return this.request(`/contents/${contentId}/comments`)
  }

  // User endpoints
  async getUsers() {
    return this.request('/users')
  }

  async getUser(id) {
    return this.request(`/users/${id}`)
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // Trend management endpoints
  async getTrendPhases() {
    return this.request('/trend-phases')
  }

  async getTrendTags() {
    return this.request('/trend-tags')
  }

  async getTrendScores(contentId) {
    return this.request(`/content/${contentId}/trend-scores`)
  }

  async updateTrendScore(contentId, scoreData) {
    return this.request(`/content/${contentId}/trend-scores`, {
      method: 'POST',
      body: JSON.stringify(scoreData),
    })
  }

  async getTrendAnalytics() {
    return this.request('/trend-analytics')
  }

  async getOpportunitySpaces() {
    return this.request('/opportunity-spaces')
  }

  async createOpportunitySpace(spaceData) {
    return this.request('/opportunity-spaces', {
      method: 'POST',
      body: JSON.stringify(spaceData),
    })
  }
}

export default new ApiService()

