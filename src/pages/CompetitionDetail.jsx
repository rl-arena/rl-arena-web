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
import useAuth from '../hooks/useAuth'
import { getUserSubmissions } from '../services/api'

const CompetitionDetail = () => {
  const { envId } = useParams()
  const { isAuthenticated } = useAuth()
  const { fetchCompetition, selectedCompetition, loading: competitionLoading } = useCompetitions(false)
  const [submissions, setSubmissions] = useState([])
  const [submissionsLoading, setSubmissionsLoading] = useState(false)
  const [replayModal, setReplayModal] = useState({ isOpen: false, matchId: null, metadata: {} })
  const [matchList, setMatchList] = useState([])
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showMatchSelection, setShowMatchSelection] = useState(false)

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
      // Only load submissions if user is authenticated
      if (isAuthenticated) {
        loadSubmissions()
      }
    }
  }, [envId, isAuthenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  // Load user submissions (only called when authenticated)
  const loadSubmissions = async () => {
    if (!isAuthenticated) {
      setSubmissions([])
      return
    }
    
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
  const handleWatchReplay = async (entry) => {
    console.log('Watch replay clicked for entry:', entry) // Debug log
    
    if (!entry || !entry.id) {
      alert('Agent information not available')
      console.error('Invalid entry:', entry)
      return
    }
    
    try {
      // Fetch recent matches for this agent (limit to 10)
      const response = await fetch(`/api/v1/matches/agent/${entry.id}?limit=10`)
      if (!response.ok) throw new Error('Failed to fetch matches')
      
      const data = await response.json()
      console.log('Matches fetched:', data) // Debug log
      
      if (data.matches && data.matches.length > 0) {
        // If only one match, open directly
        if (data.matches.length === 1) {
          setReplayModal({
            isOpen: true,
            matchId: data.matches[0].id,
            metadata: {
              agent1: entry.name || entry.username,
              agent2: 'Opponent',
            },
          })
        } else {
          // Show match selection modal
          setMatchList(data.matches)
          setSelectedAgent(entry)
          setShowMatchSelection(true)
        }
      } else {
        alert('No matches found for this agent')
      }
    } catch (error) {
      console.error('Error fetching matches:', error)
      alert('Failed to load matches')
    }
  }

  const handleSelectMatch = (match) => {
    setReplayModal({
      isOpen: true,
      matchId: match.id,
      metadata: {
        agent1: selectedAgent?.name || selectedAgent?.username,
        agent2: 'Opponent',
      },
    })
    setShowMatchSelection(false)
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

      {/* Match Selection Modal */}
      {showMatchSelection && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
            onClick={() => setShowMatchSelection(false)}
          />
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select a Match to Watch
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {matchList.map((match, index) => {
                  const isAgent1 = match.agent1Id === selectedAgent?.id
                  const myScore = isAgent1 ? match.agent1Score : match.agent2Score
                  const opponentScore = isAgent1 ? match.agent2Score : match.agent1Score
                  const won = match.winnerId === selectedAgent?.id
                  const lost = match.winnerId && match.winnerId !== selectedAgent?.id
                  const draw = !match.winnerId
                  
                  return (
                    <button
                      key={match.id}
                      onClick={() => handleSelectMatch(match)}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">
                            Match #{matchList.length - index}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Score: {Math.round(myScore)} - {Math.round(opponentScore)}
                            {won && (
                              <span className="ml-2 text-green-600 font-semibold">✓ Won</span>
                            )}
                            {lost && (
                              <span className="ml-2 text-red-600 font-semibold">✗ Lost</span>
                            )}
                            {draw && (
                              <span className="ml-2 text-gray-500">- Draw</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(match.createdAt).toLocaleString('ko-KR')}
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setShowMatchSelection(false)}
                className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompetitionDetail
