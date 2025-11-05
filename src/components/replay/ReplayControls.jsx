import React from 'react'
import Button from '../common/Button'
import { PLAYBACK_SPEEDS } from '../../utils/constants'

/**
 * Replay controls component
 * @param {Object} props
 * @param {boolean} props.isPlaying - Playing state
 * @param {number} props.playbackSpeed - Current playback speed
 * @param {number} props.currentFrame - Current frame number
 * @param {number} props.totalFrames - Total frames
 * @param {Function} props.onPlayPause - Play/pause handler
 * @param {Function} props.onSpeedChange - Speed change handler
 * @param {Function} props.onFrameChange - Frame change handler
 */
const ReplayControls = ({
  isPlaying,
  playbackSpeed,
  currentFrame,
  totalFrames,
  onPlayPause,
  onSpeedChange,
  onFrameChange,
}) => {
  return (
    <div className="bg-gray-900 rounded-b-lg p-4">
      {/* Frame Slider */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={totalFrames - 1}
          value={currentFrame}
          onChange={(e) => onFrameChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Frame {currentFrame}</span>
          <span>/ {totalFrames}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Play/Pause Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onPlayPause}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 text-white transition-colors duration-200"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className="text-sm text-gray-400">
            {isPlaying ? 'Playing' : 'Paused'}
          </div>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Speed:</span>
          {PLAYBACK_SPEEDS.map((speed) => (
            <button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                playbackSpeed === speed
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #14b8a6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #14b8a6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default ReplayControls
