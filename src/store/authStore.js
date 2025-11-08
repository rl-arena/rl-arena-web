import { create } from 'zustand'
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../services/api'
import { setAuthToken, setUser, clearAuth, getAuthToken, getUser } from '../services/storage'

const useAuthStore = create((set, get) => ({
  user: getUser(),
  token: getAuthToken(),
  isAuthenticated: !!getAuthToken(),
  loading: false,
  error: null,

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials) => {
    set({ loading: true, error: null })
    try {
      const data = await apiLogin(credentials)
      const { token, user } = data
      
      setAuthToken(token)
      setUser(user)
      
      set({ 
        token, 
        user, 
        isAuthenticated: true, 
        loading: false 
      })
      
      return { success: true }
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      })
      return { success: false, error: error.message }
    }
  },

  /**
   * Register new user
   * @param {Object} userData - { username, email, password }
   */
  register: async (userData) => {
    set({ loading: true, error: null })
    try {
      const data = await apiRegister(userData)
      const { token, user } = data
      
      setAuthToken(token)
      setUser(user)
      
      set({ 
        token, 
        user, 
        isAuthenticated: true, 
        loading: false 
      })
      
      return { success: true }
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      })
      return { success: false, error: error.message }
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await apiLogout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        error: null 
      })
    }
  },

  /**
   * Set user data
   * @param {Object} user - User object
   */
  setUser: (user) => {
    setUser(user)
    set({ user })
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null })
  },
}))

export default useAuthStore
