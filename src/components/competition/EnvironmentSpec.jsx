import React from 'react'

/**
 * Environment specification display component
 * @param {Object} props
 * @param {Object} props.actionSpace - Action space specification
 * @param {Object} props.observationSpace - Observation space specification
 */
const EnvironmentSpec = ({ actionSpace, observationSpace }) => {
  const renderSpaceInfo = (space, title) => {
    if (!space) return null

    return (
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
        <div className="bg-gray-50 rounded-md p-3 space-y-1">
          {space.type && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-600 w-24">Type:</span>
              <span className="text-gray-900">{space.type}</span>
            </div>
          )}
          {space.shape && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-600 w-24">Shape:</span>
              <span className="text-gray-900">{JSON.stringify(space.shape)}</span>
            </div>
          )}
          {space.range && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-600 w-24">Range:</span>
              <span className="text-gray-900">{space.range}</span>
            </div>
          )}
          {space.description && (
            <div className="text-sm mt-2 pt-2 border-t border-gray-200">
              <span className="text-gray-700">{space.description}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      {renderSpaceInfo(actionSpace, 'Action Space')}
      {renderSpaceInfo(observationSpace, 'Observation Space')}
    </div>
  )
}

export default EnvironmentSpec
