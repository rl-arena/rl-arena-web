import React from 'react'
import Button from '../common/Button'

/**
 * Simplified leaderboard row
 */
const LeaderboardRow = ({ entry, isCurrentUser = false, onWatchReplay }) => {
  return (
    <tr className={isCurrentUser ? 'bg-primary-50' : 'hover:bg-gray-50'}>
      {/* Rank */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        #{entry.rank}
      </td>

      {/* Username */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {entry.username}
          {isCurrentUser && (
            <span className="ml-2 text-xs text-primary-600">(You)</span>
          )}
        </div>
      </td>

      {/* Score */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {Math.round(entry.score || entry.elo || 0)}
        </div>
      </td>

      {/* Matches Played */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">{entry.totalMatches || 0}</div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onWatchReplay && onWatchReplay(entry)}
        >
          Watch
        </Button>
      </td>
    </tr>
  )
}

export default LeaderboardRow
