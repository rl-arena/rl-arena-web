import React from 'react'
import EnvironmentSpec from './EnvironmentSpec'

/**
 * Competition info component (left panel in detail page)
 * @param {Object} props
 * @param {Object} props.competition - Competition data
 */
const CompetitionInfo = ({ competition }) => {
  if (!competition) return null

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {competition.name}
        </h1>
        <p className="text-lg text-gray-600">
          {competition.description}
        </p>
      </div>

      {/* Rules */}
      {competition.rules && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Rules & Objectives
          </h2>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">
              {competition.rules}
            </p>
          </div>
        </section>
      )}

      {/* Environment Specification */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Environment Specification
        </h2>
        <EnvironmentSpec 
          actionSpace={competition.actionSpace}
          observationSpace={competition.observationSpace}
        />
      </section>

      {/* Quick Start Code */}
      {competition.quickStartCode && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Quick Start Example
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{competition.quickStartCode}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Scoring System */}
      {competition.scoringSystem && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Scoring System
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              {competition.scoringSystem}
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

export default CompetitionInfo
