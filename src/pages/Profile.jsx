import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../services/api'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../components/common/LoadingSpinner'
import Card from '../components/common/Card'
import { formatRelativeTime, formatPercentage, formatNumber } from '../utils/formatters'

const Profile = () => {
  const { user, isAuthenticated } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadProfile()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const loadProfile = async () => {
    try {
      const data = await getUserProfile()
      setProfile(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to view your profile
            </p>
            <button className="btn-primary">
              Sign In
            </button>
          </div>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={loadProfile} className="btn-primary">
              Try Again
            </button>
          </div>
        </Card>
      </div>
    )
  }

  // Mock data if profile not loaded
  const profileData = profile || {
    username: user?.username || 'User',
    email: user?.email || 'user@example.com',
    joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      totalSubmissions: 12,
      activeAgents: 3,
      totalMatches: 456,
      averageRank: 23,
      bestRank: 12,
      totalWins: 289,
    },
    recentAgents: [
      { id: 1, name: 'DeepPongV3', competition: 'Pong Battle', status: 'active', rank: 23 },
      { id: 2, name: 'SnakeAI', competition: 'Snake Arena', status: 'active', rank: 45 },
      { id: 3, name: 'CartPoleBot', competition: 'CartPole Balance', status: 'processing', rank: null },
    ],
    matchHistory: [
      { id: 1, competition: 'Pong', opponent: 'ai_master', result: 'loss', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { id: 2, competition: 'Pong', opponent: 'neural_ninja', result: 'win', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
      { id: 3, competition: 'Snake', opponent: 'code_wizard', result: 'win', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  }

  const stats = profileData.stats || {}
  const winRate = stats.totalMatches > 0 ? stats.totalWins / stats.totalMatches : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            {profileData.username}
          </h1>
          <p className="text-sm text-gray-600">{profileData.email}</p>
        </div>

        {/* Statistics */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Submissions</span>
              <span className="font-medium text-gray-900">{stats.totalSubmissions || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Agents</span>
              <span className="font-medium text-primary-600">{stats.activeAgents || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Matches</span>
              <span className="font-medium text-gray-900">{stats.totalMatches || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Best Rank</span>
              <span className="font-medium text-gray-900">#{stats.bestRank || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Submitted Agents */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Agents</h2>
          <div className="space-y-3">
            {profileData.recentAgents && profileData.recentAgents.length > 0 ? (
              profileData.recentAgents.map((agent) => (
                <div key={agent.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{agent.competition}</p>
                  {agent.rank && (
                    <p className="text-sm text-gray-500 mt-1">Rank: #{agent.rank}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">No agents submitted yet</p>
            )}
          </div>
        </div>

        {/* Match History */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Matches</h2>
          <div className="space-y-3">
            {profileData.matchHistory && profileData.matchHistory.length > 0 ? (
              profileData.matchHistory.map((match) => (
                <div key={match.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      vs {match.opponent}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      match.result === 'win' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {match.result.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{match.competition}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatRelativeTime(match.timestamp)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">No match history yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
