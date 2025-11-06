import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CompetitionInfo from '../components/competition/CompetitionInfo'
import AgentUploadForm from '../components/submission/AgentUploadForm'
import SubmissionHistory from '../components/submission/SubmissionHistory'
import LeaderboardTable from '../components/leaderboard/LeaderboardTable'
import ReplayModal from '../components/replay/ReplayModal'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useCompetitions from '../hooks/useCompetitions'
import useLeaderboard from '../hooks/useLeaderboard'
import { getUserSubmissions } from '../services/api'

const CompetitionDetail = () => {
  const { envId } = useParams()
  const { fetchCompetition, selectedCompetition, loading: competitionLoading } = useCompetitions(false)
  const [submissions, setSubmissions] = useState([])
  const [submissionsLoading, setSubmissionsLoading] = useState(false)
  const [replayModal, setReplayModal] = useState({ isOpen: false, matchId: null, metadata: {} })

  // Leaderboard hook
  const {
    data: leaderboardData,
    loading: leaderboardLoading,
    page,
    totalPages,
    goToPage,
    sort,
    sortBy,
    sortOrder,
    refresh: refreshLeaderboard,
  } = useLeaderboard(envId)

  // Fetch competition data
  useEffect(() => {
    if (envId) {
      fetchCompetition(envId)
      loadSubmissions()
    }
  }, [envId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Load user submissions
  const loadSubmissions = async () => {
    setSubmissionsLoading(true)
    try {
      const data = await getUserSubmissions(envId)
      setSubmissions(data.submissions || [])
    } catch (error) {
      console.error('Failed to load submissions:', error)
      setSubmissions([])
    } finally {
      setSubmissionsLoading(false)
    }
  }

  // Handle successful submission
  const handleSubmissionSuccess = () => {
    loadSubmissions()
    refreshLeaderboard()
  }

  // Handle watch replay
  const handleWatchReplay = (entry) => {
    // TODO: Get actual match ID from entry
    const matchId = `match_${entry.rank}`
    setReplayModal({
      isOpen: true,
      matchId,
      metadata: {
        agent1: entry.agentName,
        agent2: 'Opponent',
      },
    })
  }

  // Close replay modal
  const closeReplayModal = () => {
    setReplayModal({ isOpen: false, matchId: null, metadata: {} })
  }

  if (competitionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading competition..." />
      </div>
    )
  }

  if (!selectedCompetition) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Competition not found</p>
          <a href="/" className="text-primary-600 hover:text-primary-700">
            ← Back to competitions
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back link */}
        <a
          href="/"
          className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back
        </a>

        {/* Single column layout */}
        <div className="space-y-6">
          {/* Competition Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <CompetitionInfo competition={selectedCompetition} />
          </div>

          {/* Submission Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <AgentUploadForm
              envId={envId}
              onSuccess={handleSubmissionSuccess}
            />
          </div>
            
          {/* Submission History */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SubmissionHistory
              submissions={submissions}
              loading={submissionsLoading}
            />
          </div>

          {/* Leaderboard */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard</h2>
            <LeaderboardTable
              data={leaderboardData}
              loading={leaderboardLoading}
              onWatchReplay={handleWatchReplay}
            />
          </div>
        </div>
      </div>

      {/* Replay Modal */}
      <ReplayModal
        isOpen={replayModal.isOpen}
        onClose={closeReplayModal}
        matchId={replayModal.matchId}
        metadata={replayModal.metadata}
      />
    </div>
  )
}

export default CompetitionDetail
