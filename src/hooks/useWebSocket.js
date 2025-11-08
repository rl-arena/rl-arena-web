import { useEffect, useCallback, useRef } from 'react'
import websocketService from '../services/websocket'
import { getAuthToken } from '../services/storage'

/**
 * Custom hook for WebSocket connection
 * @returns {Object} WebSocket methods
 */
const useWebSocket = () => {
  const isConnected = useRef(false)

  useEffect(() => {
    // Connect on mount
    const token = getAuthToken()
    if (token && !isConnected.current) {
      websocketService.connect(token)
      isConnected.current = true
    }

    // Cleanup on unmount
    return () => {
      if (isConnected.current) {
        websocketService.disconnect()
        isConnected.current = false
      }
    }
  }, [])

  /**
   * Subscribe to WebSocket messages
   * @param {string} type - Message type
   * @param {Function} callback - Callback function
   */
  const subscribe = useCallback((type, callback) => {
    return websocketService.subscribe(type, callback)
  }, [])

  /**
   * Send message via WebSocket
   * @param {string} type - Message type
   * @param {Object} payload - Message payload
   */
  const send = useCallback((type, payload) => {
    websocketService.send(type, payload)
  }, [])

  /**
   * Check if WebSocket is connected
   */
  const checkConnection = useCallback(() => {
    return websocketService.isConnected()
  }, [])

  return {
    subscribe,
    send,
    isConnected: checkConnection,
  }
}

export default useWebSocket
