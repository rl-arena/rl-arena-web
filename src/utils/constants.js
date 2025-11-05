// API Base URLs
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
export const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws'

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = ['.py']

// Pagination
export const LEADERBOARD_PAGE_SIZE = 20
export const SUBMISSIONS_PAGE_SIZE = 10

// Replay
export const PLAYBACK_SPEEDS = [0.5, 1, 2]
export const DEFAULT_PLAYBACK_SPEED = 1
export const FRAME_RATE = 30 // FPS

// Rank Colors
export const RANK_COLORS = {
  1: '#FFD700', // Gold
  2: '#C0C0C0', // Silver
  3: '#CD7F32', // Bronze
}

// Win Rate Thresholds
export const WIN_RATE_THRESHOLDS = {
  HIGH: 0.6,   // Green
  MEDIUM: 0.4, // Yellow
  // Below MEDIUM is red
}

// WebSocket Events
export const WS_EVENTS = {
  MATCH_UPDATE: 'match:update',
  LEADERBOARD_UPDATE: 'leaderboard:update',
  SUBMISSION_STATUS: 'submission:status',
}

// Agent Status
export const AGENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  ACTIVE: 'active',
  FAILED: 'failed',
}
