import { useState, useCallback } from 'react'
import { submitAgent } from '../services/api'
import { validateAgentFile, validateAgentName } from '../utils/validators'

/**
 * Custom hook for agent submission
 * @param {string} envId - Competition ID
 * @returns {Object} Submission state and methods
 */
const useAgentSubmission = (envId) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  /**
   * Submit agent
   * @param {File} file - Agent file
   * @param {string} agentName - Agent name
   * @returns {Promise<Object>} Submission result
   */
  const submit = useCallback(async (file, agentName) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    setUploadProgress(0)

    // Validate file
    const fileValidation = validateAgentFile(file)
    if (!fileValidation.valid) {
      setError(fileValidation.error)
      setLoading(false)
      return { success: false, error: fileValidation.error }
    }

    // Validate agent name
    const nameValidation = validateAgentName(agentName)
    if (!nameValidation.valid) {
      setError(nameValidation.error)
      setLoading(false)
      return { success: false, error: nameValidation.error }
    }

    // Create form data
    const formData = new FormData()
    formData.append('agentFile', file)
    formData.append('agentName', agentName)

    try {
      // TODO: Add upload progress tracking if backend supports it
      const result = await submitAgent(envId, formData)
      
      setSuccess(true)
      setUploadProgress(100)
      setLoading(false)

      return { success: true, data: result }
    } catch (err) {
      setError(err.message)
      setLoading(false)
      return { success: false, error: err.message }
    }
  }, [envId])

  /**
   * Reset submission state
   */
  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setSuccess(false)
    setUploadProgress(0)
  }, [])

  return {
    loading,
    error,
    success,
    uploadProgress,
    submit,
    reset,
  }
}

export default useAgentSubmission
