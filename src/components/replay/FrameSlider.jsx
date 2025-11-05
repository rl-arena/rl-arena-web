import React from 'react'

/**
 * Frame slider component (can be extracted from ReplayControls if needed separately)
 * This component is actually integrated into ReplayControls, 
 * but creating this file for structure completeness
 * @param {Object} props
 * @param {number} props.currentFrame - Current frame
 * @param {number} props.totalFrames - Total frames
 * @param {Function} props.onChange - Change handler
 */
const FrameSlider = ({ currentFrame, totalFrames, onChange }) => {
  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max={totalFrames - 1}
        value={currentFrame}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>Frame {currentFrame}</span>
        <span>/ {totalFrames}</span>
      </div>
    </div>
  )
}

export default FrameSlider
