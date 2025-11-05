import { WS_BASE_URL } from '../utils/constants'

class WebSocketService {
  constructor() {
    this.socket = null
    this.listeners = new Map()
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000
  }

  /**
   * Connect to WebSocket server
   * @param {string} token - Auth token
   */
  connect(token) {
    const wsUrl = token ? `${WS_BASE_URL}?token=${token}` : WS_BASE_URL

    try {
      this.socket = new WebSocket(wsUrl)

      this.socket.onopen = () => {
        console.log('WebSocket connected')
        this.reconnectAttempts = 0
      }

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      this.socket.onclose = () => {
        console.log('WebSocket disconnected')
        this.handleReconnect(token)
      }
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
    }
  }

  /**
   * Handle reconnection logic
   * @param {string} token - Auth token
   */
  handleReconnect(token) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * this.reconnectAttempts
      console.log(`Reconnecting in ${delay}ms... (attempt ${this.reconnectAttempts})`)
      
      setTimeout(() => {
        this.connect(token)
      }, delay)
    } else {
      console.error('Max reconnection attempts reached')
    }
  }

  /**
   * Handle incoming message
   * @param {Object} data - Message data
   */
  handleMessage(data) {
    const { type, payload } = data

    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(callback => {
        try {
          callback(payload)
        } catch (error) {
          console.error(`Error in WebSocket listener for ${type}:`, error)
        }
      })
    }
  }

  /**
   * Subscribe to a message type
   * @param {string} type - Message type
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type).add(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(type)
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          this.listeners.delete(type)
        }
      }
    }
  }

  /**
   * Send message to server
   * @param {string} type - Message type
   * @param {Object} payload - Message payload
   */
  send(type, payload) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }))
    } else {
      console.warn('WebSocket is not connected')
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    this.listeners.clear()
    this.reconnectAttempts = 0
  }

  /**
   * Check if WebSocket is connected
   * @returns {boolean}
   */
  isConnected() {
    return this.socket && this.socket.readyState === WebSocket.OPEN
  }
}

// Export singleton instance
const websocketService = new WebSocketService()
export default websocketService
