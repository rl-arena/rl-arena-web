import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
      
      // Return user-friendly error message
      const message = data?.message || data?.error || 'An error occurred'
      return Promise.reject(new Error(message))
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Network error. Please check your connection.'))
    } else {
      // Something else happened
      return Promise.reject(error)
    }
  }
)

// API Methods

/**
 * Get all competitions
 * @returns {Promise<Array>} List of competitions
 */
export const getCompetitions = async () => {
  const response = await api.get('/competitions')
  return response.data
}

/**
 * Get single competition by ID
 * @param {string} envId - Competition ID
 * @returns {Promise<Object>} Competition details
 */
export const getCompetition = async (envId) => {
  const response = await api.get(`/competitions/${envId}`)
  return response.data
}

/**
 * Get leaderboard for a competition
 * @param {string} envId - Competition ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Leaderboard data with pagination
 */
export const getLeaderboard = async (envId, page = 1, limit = 20) => {
  const response = await api.get(`/competitions/${envId}/leaderboard`, {
    params: { page, limit }
  })
  return response.data
}

/**
 * Submit agent to competition
 * @param {string} envId - Competition ID
 * @param {FormData} formData - Form data with file and agent name
 * @returns {Promise<Object>} Submission result
 */
export const submitAgent = async (envId, formData) => {
  const response = await api.post(`/competitions/${envId}/submit`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

/**
 * Get user's submissions for a competition
 * @param {string} envId - Competition ID
 * @returns {Promise<Array>} List of submissions
 */
export const getUserSubmissions = async (envId) => {
  const response = await api.get(`/competitions/${envId}/submissions`)
  return response.data
}

/**
 * Get match replay data
 * @param {string} matchId - Match ID
 * @returns {Promise<Object>} Replay data with frames and metadata
 */
export const getMatchReplay = async (matchId) => {
  const response = await api.get(`/matches/${matchId}/replay`)
  return response.data
}

/**
 * Get user profile
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async () => {
  const response = await api.get('/profile')
  return response.data
}

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} Auth token and user data
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

/**
 * Register user
 * @param {Object} userData - { username, email, password }
 * @returns {Promise<Object>} Auth token and user data
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}

export default api
