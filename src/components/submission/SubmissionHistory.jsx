import React from 'react'
import { formatRelativeTime } from '../../utils/formatters'
import { AGENT_STATUS } from '../../utils/constants'

/**
 * Submission history component
 * @param {Object} props
 * @param {Array} props.submissions - List of submissions
 * @param {boolean} props.loading - Loading state
 */
const SubmissionHistory = ({ submissions = [], loading = false }) => {
  const getStatusBadge = (status) => {
    const badges = {
      [AGENT_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
      [AGENT_STATUS.PROCESSING]: 'bg-blue-100 text-blue-800',
      [AGENT_STATUS.ACTIVE]: 'bg-green-100 text-green-800',
      [AGENT_STATUS.FAILED]: 'bg-red-100 text-red-800',
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Submissions
        </h2>
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-card p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Your Submissions
      </h2>

      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            No submissions yet. Upload your first agent!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((submission) => (
            <div 
              key={submission.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">
                  {submission.name || submission.agentName}
                </h3>
                {getStatusBadge(submission.status)}
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                {formatRelativeTime(submission.timestamp || submission.createdAt)}
              </div>

              {submission.message && (
                <p className="mt-2 text-xs text-gray-600">
                  {submission.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SubmissionHistory
