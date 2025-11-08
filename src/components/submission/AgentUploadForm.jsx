import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FileDropzone from './FileDropzone'
import Button from '../common/Button'
import useAgentSubmission from '../../hooks/useAgentSubmission'
import useAuth from '../../hooks/useAuth'

/**
 * Agent upload form component
 * @param {Object} props
 * @param {string} props.envId - Competition ID
 * @param {Function} props.onSuccess - Success callback
 */
const AgentUploadForm = ({ envId, onSuccess }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [file, setFile] = useState(null)
  const [agentName, setAgentName] = useState('')
  const { loading, error, success, submit, reset } = useAgentSubmission(envId)

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    // Reset previous submission state
    reset()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!file || !agentName) {
      return
    }

    const result = await submit(file, agentName)
    
    if (result.success) {
      // Clear form
      setFile(null)
      setAgentName('')
      
      // Call success callback
      if (onSuccess) {
        onSuccess(result.data)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Submit Your Agent
      </h2>

      {/* Login Required Message */}
      {!isAuthenticated ? (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-center">
          <p className="text-sm text-blue-800 mb-3">
            You need to be logged in to submit an agent
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/login"
              state={{ from: location }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              state={{ from: location }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent File (.py)
          </label>
          <FileDropzone 
            onFileSelect={handleFileSelect}
            selectedFile={file}
          />
        </div>

        {/* Agent Name */}
        <div>
          <label 
            htmlFor="agentName" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Agent Name
          </label>
          <input
            type="text"
            id="agentName"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="e.g., DeepPongV1"
            className="input w-full"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Choose a unique name for your agent (3-50 characters)
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-sm text-green-800">
              Agent submitted successfully! Processing will begin shortly.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={!file || !agentName || loading}
          loading={loading}
        >
          {loading ? 'Submitting...' : 'Submit Agent'}
        </Button>
      </form>
      )}
    </div>
  )
}

export default AgentUploadForm
