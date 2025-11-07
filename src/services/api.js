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
      
      // Note: We don't automatically clear auth on 401
      // to prevent logout when accessing protected resources while not logged in
      // Components should handle auth requirements themselves
      
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

// ======================
// Environments (Competitions)
// ======================

/**
 * Get all environments
 * @returns {Promise<Array>} List of environments
 * 
 * Note: Backend doesn't have /environments endpoint yet.
 * Using hardcoded environment list from local data.
 */
export const getEnvironments = async () => {
  // Import here to avoid circular dependency
  const { ENVIRONMENTS } = await import('../data/environments.js')
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return ENVIRONMENTS
}

/**
 * Get single environment by ID
 * @param {string} envId - Environment ID
 * @returns {Promise<Object>} Environment details
 * 
 * Note: Backend doesn't have /environments/:id endpoint yet.
 * Using hardcoded environment list from local data.
 */
export const getEnvironment = async (envId) => {
  const { getEnvironmentById } = await import('../data/environments.js')
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const environment = getEnvironmentById(envId)
  if (!environment) {
    throw new Error(`Environment '${envId}' not found`)
  }
  
  return environment
}

// Aliases for backward compatibility
export const getCompetitions = getEnvironments
export const getCompetition = getEnvironment

// ======================
// Agents
// ======================

/**
 * Get all my agents
 * @param {Object} filters - Optional filters (e.g., { environmentId })
 * @returns {Promise<Array>} List of agents
 */
export const getMyAgents = async (filters = {}) => {
  const response = await api.get('/agents/my', { params: filters })
  return response.data
}

/**
 * Get specific agent by ID
 * @param {string} agentId - Agent ID
 * @returns {Promise<Object>} Agent details
 */
export const getAgent = async (agentId) => {
  const response = await api.get(`/agents/${agentId}`)
  return response.data
}

/**
 * Create new agent
 * @param {Object} agentData - { name, description, environmentId }
 * @returns {Promise<Object>} Created agent
 */
export const createAgent = async (agentData) => {
  console.log('Creating agent with data:', agentData)
  const response = await api.post('/agents', agentData)
  console.log('Agent creation response:', response.data)
  return response.data
}

/**
 * Update agent
 * @param {string} agentId - Agent ID
 * @param {Object} updates - { name, description }
 * @returns {Promise<Object>} Updated agent
 */
export const updateAgent = async (agentId, updates) => {
  const response = await api.put(`/agents/${agentId}`, updates)
  return response.data
}

/**
 * Delete agent
 * @param {string} agentId - Agent ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteAgent = async (agentId) => {
  const response = await api.delete(`/agents/${agentId}`)
  return response.data
}

// ======================
// Submissions
// ======================

/**
 * Create code submission for agent
 * @param {Object} submissionData - { agentId, codeUrl }
 * @returns {Promise<Object>} Submission result
 */
export const createSubmission = async (submissionData) => {
  const response = await api.post('/submissions', submissionData)
  return response.data
}

/**
 * Submit agent code file (create submission with file upload)
 * @param {string} agentId - Agent ID (not envId)
 * @param {FormData} formData - Form data with file
 * @returns {Promise<Object>} Submission result
 * 
 * Backend expects:
 * - agentId: string (form field)
 * - file: File (multipart file)
 */
export const submitAgent = async (agentId, formData) => {
  // Add agentId to formData if not already present
  if (!formData.has('agentId')) {
    formData.append('agentId', agentId)
  }
  
  const response = await api.post('/submissions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

/**
 * Get specific submission by ID
 * @param {string} submissionId - Submission ID
 * @returns {Promise<Object>} Submission details
 */
export const getSubmission = async (submissionId) => {
  const response = await api.get(`/submissions/${submissionId}`)
  return response.data
}

/**
 * Get all submissions for an agent
 * @param {string} agentId - Agent ID
 * @param {number} page - Page number
 * @param {number} pageSize - Items per page
 * @returns {Promise<Object>} Paginated submissions
 */
export const getAgentSubmissions = async (agentId, page = 1, pageSize = 20) => {
  const response = await api.get(`/submissions/agent/${agentId}`, {
    params: { page, pageSize }
  })
  return response.data
}

/**
 * Get user's submissions for a specific environment
 * @param {string} envId - Environment ID
 * @returns {Promise<Array>} List of submissions
 * 
 * Implementation: Get user's agents for this environment, then get submissions for each agent
 */
export const getUserSubmissions = async (envId) => {
  try {
    // 1. Get user's agents for this environment
    const myAgentsResponse = await getMyAgents({ environmentId: envId })
    const agents = myAgentsResponse.agents || []
    
    if (agents.length === 0) {
      return { submissions: [] }
    }
    
    // 2. Get submissions for each agent
    const submissionsPromises = agents.map(agent => 
      getAgentSubmissions(agent.id).catch(() => ({ submissions: [] }))
    )
    
    const submissionsResults = await Promise.all(submissionsPromises)
    
    // 3. Flatten and combine all submissions
    const allSubmissions = submissionsResults.flatMap(result => 
      result.submissions || []
    )
    
    // 4. Sort by createdAt (newest first)
    allSubmissions.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )
    
    return { submissions: allSubmissions }
  } catch (error) {
    console.error('getUserSubmissions error:', error)
    return { submissions: [] }
  }
}

/**
 * Activate a submission (set as active version)
 * @param {string} submissionId - Submission ID
 * @returns {Promise<Object>} Activated submission
 */
export const activateSubmission = async (submissionId) => {
  const response = await api.put(`/submissions/${submissionId}/activate`)
  return response.data
}

// ======================
// Matches
// ======================

/**
 * Create and execute a match between two agents
 * @param {Object} matchData - { agent1Id, agent2Id }
 * @returns {Promise<Object>} Match result
 */
export const createMatch = async (matchData) => {
  const response = await api.post('/matches', matchData)
  return response.data
}

/**
 * Get all matches (currently returns empty - TODO in backend)
 * @returns {Promise<Array>} List of matches
 */
export const getMatches = async () => {
  const response = await api.get('/matches')
  return response.data
}

/**
 * Get specific match by ID
 * @param {string} matchId - Match ID
 * @returns {Promise<Object>} Match details
 */
export const getMatch = async (matchId) => {
  const response = await api.get(`/matches/${matchId}`)
  return response.data
}

/**
 * Get all matches for a specific agent
 * @param {string} agentId - Agent ID
 * @param {number} page - Page number
 * @param {number} pageSize - Items per page
 * @returns {Promise<Object>} Paginated matches
 */
export const getAgentMatches = async (agentId, page = 1, pageSize = 20) => {
  const response = await api.get(`/matches/agent/${agentId}`, {
    params: { page, pageSize }
  })
  return response.data
}

/**
 * Get match replay data
 * @param {string} matchId - Match ID
 * @param {string} format - Replay format ('json' or 'html')
 * @returns {Promise<Object|string>} Replay data (JSON object or HTML string)
 */
export const getMatchReplay = async (matchId, format = 'json') => {
  const replayUrl = `/matches/${matchId}/replay`
  const response = await api.get(replayUrl, { 
    params: { format },
    // For HTML format, we need to handle it as text
    ...(format === 'html' && { responseType: 'text' })
  })
  return response.data
}

/**
 * Get match replay URL
 * @param {string} matchId - Match ID
 * @param {string} format - Replay format ('json' or 'html')
 * @returns {string} Full replay URL
 */
export const getMatchReplayURL = (matchId, format = 'json') => {
  const baseURL = api.defaults.baseURL || ''
  return `${baseURL}/matches/${matchId}/replay?format=${format}`
}

// ======================
// Leaderboard
// ======================

/**
 * Get global leaderboard
 * @param {number} limit - Number of agents to return
 * @returns {Promise<Array>} Leaderboard entries
 */
export const getGlobalLeaderboard = async (limit = 100) => {
  const response = await api.get('/leaderboard', { params: { limit } })
  return response.data
}

/**
 * Get leaderboard for a specific environment
 * @param {string} envId - Environment ID
 * @param {number} limit - Number of agents to return
 * @returns {Promise<Object>} Leaderboard entries with environment info
 */
export const getLeaderboard = async (envId, limit = 100) => {
  const response = await api.get(`/leaderboard/environment/${envId}`, {
    params: { limit }
  })
  return response.data
}

// ======================
// Authentication
// ======================

/**
 * Login user
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} { token, user }
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

/**
 * Register user
 * @param {Object} userData - { username, email, password, fullName }
 * @returns {Promise<Object>} { token, user }
 */
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

/**
 * Get current user info
 * @returns {Promise<Object>} User data
 */
export const getCurrentUser = async () => {
  const response = await api.get('/users/me')
  return response.data
}

/**
 * Get user profile (alias for getCurrentUser)
 * @returns {Promise<Object>} User data
 */
export const getUserProfile = getCurrentUser

/**
 * Logout user (client-side only - clear token)
 * @returns {Promise<void>}
 */
export const logout = async () => {
  localStorage.removeItem('auth_token')
  return Promise.resolve()
}

// ======================
// Health Check
// ======================

/**
 * Check API health status
 * @returns {Promise<Object>} { status, timestamp }
 */
export const checkHealth = async () => {
  const response = await api.get('/health')
  return response.data
}

export default api
