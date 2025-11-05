import React, { useEffect } from 'react'
import CompetitionCard from '../components/competition/CompetitionCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useCompetitions from '../hooks/useCompetitions'
// Uncomment below to use mock data during development
import { mockCompetitions } from '../mocks/competitions'

const Home = () => {
  // const { competitions, loading, error, fetchCompetitions } = useCompetitions(true)

  // Use mock data during development
  const competitions = mockCompetitions
  const loading = false
  const error = null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            RL Competition Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your agent, compete, and climb the leaderboard
          </p>
        </div>
      </section>

      {/* Competitions List */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Loading..." />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={fetchCompetitions} className="btn-primary">
              Retry
            </button>
          </div>
        ) : competitions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">No competitions available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {competitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                competition={competition}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
