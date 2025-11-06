/**
 * LocalStorage helper functions
 */

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
}

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored value or default value
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error getting item from localStorage: ${key}`, error)
    return defaultValue
  }
}

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting item in localStorage: ${key}`, error)
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item from localStorage: ${key}`, error)
  }
}

/**
 * Clear all items from localStorage
 */
export const clear = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage', error)
  }
}

// Auth-specific helpers

export const getAuthToken = () => {
  // Get token as plain string, not JSON
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
}

export const setAuthToken = (token) => {
  // Store token as plain string, not JSON
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
}

export const removeAuthToken = () => {
  removeItem(STORAGE_KEYS.AUTH_TOKEN)
}

export const getUser = () => {
  return getItem(STORAGE_KEYS.USER)
}

export const setUser = (user) => {
  setItem(STORAGE_KEYS.USER, user)
}

export const removeUser = () => {
  removeItem(STORAGE_KEYS.USER)
}

export const clearAuth = () => {
  removeAuthToken()
  removeUser()
}
