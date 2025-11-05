import React, { useEffect } from 'react'
import ReplayCanvas from './ReplayCanvas'
import ReplayControls from './ReplayControls'
import LoadingSpinner from '../common/LoadingSpinner'
import useReplay from '../../hooks/useReplay'
import { formatDate } from '../../utils/formatters'

/**
 * Replay modal component
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close handler
 * @param {string} props.matchId - Match ID to load
 * @param {Object} props.metadata - Match metadata (agent names, score, etc.)
 */
const ReplayModal = ({ isOpen, onClose, matchId, metadata = {} }) => {
  const {
    replayData,
    currentFrame,
    isPlaying,
    playbackSpeed,
    loading,
    error,
    loadReplay,
    togglePlay,
    setFrame,
    setSpeed,
    clearReplay,
    getCurrentFrameData,
    getTotalFrames,
  } = useReplay()

  useEffect(() => {
    if (isOpen && matchId) {
      loadReplay(matchId)
    }

    return () => {
      if (!isOpen) {
        clearReplay()
      }
    }
  }, [isOpen, matchId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const frameData = getCurrentFrameData()
  const totalFrames = getTotalFrames()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Match Replay
              </h2>
              {metadata.agent1 && metadata.agent2 && (
                <p className="text-sm text-gray-600 mt-1">
                  {metadata.agent1} vs {metadata.agent2}
                </p>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" text="Loading replay..." />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={onClose}
                  className="text-primary-600 hover:text-primary-700"
                >
                  Close
                </button>
              </div>
            ) : replayData ? (
              <>
                {/* Canvas */}
                <ReplayCanvas
                  frameData={frameData}
                  width={800}
                  height={450}
                />

                {/* Controls */}
                <ReplayControls
                  isPlaying={isPlaying}
                  playbackSpeed={playbackSpeed}
                  currentFrame={currentFrame}
                  totalFrames={totalFrames}
                  onPlayPause={togglePlay}
                  onSpeedChange={setSpeed}
                  onFrameChange={setFrame}
                />

                {/* Metadata */}
                {replayData.metadata && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      {replayData.metadata.finalScore && (
                        <div>
                          <span className="text-gray-600">Final Score:</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {replayData.metadata.finalScore}
                          </span>
                        </div>
                      )}
                      {replayData.metadata.duration && (
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {replayData.metadata.duration}s
                          </span>
                        </div>
                      )}
                      {replayData.metadata.timestamp && (
                        <div>
                          <span className="text-gray-600">Played:</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {formatDate(replayData.metadata.timestamp)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-600">No replay data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplayModal
