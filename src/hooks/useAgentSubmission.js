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

    try {
      // For debugging: Try to submit without creating agent
      // This assumes you have an existing agent in the database
      const { getMyAgents, createAgent } = await import('../services/api')
      
      let agentId
      
      // Try to find existing agent first
      try {
        const myAgents = await getMyAgents()
        console.log('My agents:', myAgents)
        
        if (myAgents.agents && myAgents.agents.length > 0) {
          // Use first available agent
          const envAgent = myAgents.agents.find(a => a.environmentId === envId)
          if (envAgent) {
            agentId = envAgent.id
            console.log('Using existing agent:', agentId, envAgent.name)
          } else {
            // Use any agent for now
            agentId = myAgents.agents[0].id
            console.log('Using first available agent:', agentId)
          }
        }
      } catch (err) {
        console.error('Failed to get agents:', err)
      }
      
      // Only create new agent if no existing agent found
      if (!agentId) {
        console.log('Creating new agent with data:', {
          name: agentName,
          environmentId: envId,
          description: `Agent for ${envId}`
        })
        
        try {
          const agentData = await createAgent({
            name: agentName,
            environmentId: envId,
            description: `Agent for ${envId}`
          })
          
          console.log('Agent creation response:', agentData)
          agentId = agentData.agent?.id || agentData.id
        } catch (createError) {
          console.error('Agent creation failed:', createError)
          throw new Error(`Failed to create agent: ${createError.message}`)
        }
      }
      
      if (!agentId) {
        throw new Error('Failed to get agent ID. Please create an agent first.')
      }
      
      // Step 2: Create form data for submission
      const formData = new FormData()
      formData.append('file', file)
      formData.append('agentId', agentId)
      
      console.log('Submitting with agentId:', agentId)
      
      // Step 3: Submit the file
      const result = await submitAgent(agentId, formData)
      
      setSuccess(true)
      setUploadProgress(100)
      setLoading(false)

      return { success: true, data: result }
    } catch (err) {
      console.error('Submission error:', err)
      const errorMessage = err.response?.data?.error || err.message || 'Failed to submit agent'
      setError(errorMessage)
      setLoading(false)
      return { success: false, error: errorMessage }
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
