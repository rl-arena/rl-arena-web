import React from 'react'
import LeaderboardRow from './LeaderboardRow'
import LoadingSpinner from '../common/LoadingSpinner'
import useAuth from '../../hooks/useAuth'

/**
 * Simplified leaderboard table
 */
const LeaderboardTable = ({ 
  data = [],
  loading = false,
  onWatchReplay,
}) => {
  const { user } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No entries yet
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Matches
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((entry) => (
            <LeaderboardRow
              key={entry.userId}
              entry={entry}
              isCurrentUser={user && entry.userId === user.id}
              onWatchReplay={onWatchReplay}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardTable
