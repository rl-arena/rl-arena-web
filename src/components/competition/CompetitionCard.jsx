import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Competition card component for list display
 * @param {Object} props
 * @param {Object} props.competition - Competition data
 */
const CompetitionCard = ({ competition }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/competition/${competition.id}`)
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary-500 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {competition.name}
        </h3>
        {competition.userRank && (
          <span className="text-xs font-medium text-primary-600">
            Rank #{competition.userRank}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {competition.description}
      </p>

      <div className="text-xs text-gray-500">
        {competition.participantCount || 0} participants
      </div>
    </div>
  )
}

export default CompetitionCard
