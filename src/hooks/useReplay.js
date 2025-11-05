import { useEffect } from 'react'
import useReplayStore from '../store/replayStore'

/**
 * Custom hook for replay control
 * @param {string} matchId - Match ID (optional, can load later)
 * @returns {Object} Replay state and methods
 */
const useReplay = (matchId = null) => {
  const {
    replayData,
    currentFrame,
    isPlaying,
    playbackSpeed,
    loading,
    error,
    loadReplay,
    play,
    pause,
    togglePlay,
    setFrame,
    setSpeed,
    reset,
    clearReplay,
  } = useReplayStore()

  useEffect(() => {
    if (matchId) {
      loadReplay(matchId)
    }

    return () => {
      // Cleanup: pause and clear on unmount
      pause()
    }
  }, [matchId]) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Get current frame data
   * @returns {Object|null} Current frame data
   */
  const getCurrentFrameData = () => {
    if (!replayData || !replayData.frames) return null
    return replayData.frames[currentFrame] || null
  }

  /**
   * Get total frames count
   * @returns {number} Total frames
   */
  const getTotalFrames = () => {
    if (!replayData || !replayData.frames) return 0
    return replayData.frames.length
  }

  /**
   * Check if at end of replay
   * @returns {boolean}
   */
  const isAtEnd = () => {
    return currentFrame >= getTotalFrames() - 1
  }

  /**
   * Check if at start of replay
   * @returns {boolean}
   */
  const isAtStart = () => {
    return currentFrame === 0
  }

  return {
    replayData,
    currentFrame,
    isPlaying,
    playbackSpeed,
    loading,
    error,
    loadReplay,
    play,
    pause,
    togglePlay,
    setFrame,
    setSpeed,
    reset,
    clearReplay,
    getCurrentFrameData,
    getTotalFrames,
    isAtEnd,
    isAtStart,
  }
}

export default useReplay
