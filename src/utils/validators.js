import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from './constants'

/**
 * Validate file for agent submission
 * @param {File} file - File to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateAgentFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' }
  }

  // Check file extension
  const fileName = file.name.toLowerCase()
  const hasValidExtension = ALLOWED_FILE_TYPES.some(ext => fileName.endsWith(ext))
  
  if (!hasValidExtension) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}` 
    }
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` 
    }
  }

  return { valid: true }
}

/**
 * Validate agent name
 * @param {string} name - Agent name to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateAgentName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Agent name is required' }
  }

  if (name.length < 3) {
    return { valid: false, error: 'Agent name must be at least 3 characters' }
  }

  if (name.length > 50) {
    return { valid: false, error: 'Agent name must be less than 50 characters' }
  }

  // Only allow alphanumeric, spaces, hyphens, and underscores
  const validPattern = /^[a-zA-Z0-9\s\-_]+$/
  if (!validPattern.test(name)) {
    return { 
      valid: false, 
      error: 'Agent name can only contain letters, numbers, spaces, hyphens, and underscores' 
    }
  }

  return { valid: true }
}

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }

  return { valid: true }
}
