import { create } from 'zustand'
import { getMatchReplay, getMatchReplayURL } from '../services/api'
import { DEFAULT_PLAYBACK_SPEED } from '../utils/constants'

const useReplayStore = create((set, get) => ({
  replayData: null,
  replayHTML: null,
  replayFormat: 'json', // 'json' or 'html'
  currentFrame: 0,
  isPlaying: false,
  playbackSpeed: DEFAULT_PLAYBACK_SPEED,
  loading: false,
  error: null,
  intervalId: null,

  /**
   * Load replay data
   * @param {string} matchId - Match ID
   * @param {string} format - Replay format ('json' or 'html')
   */
  loadReplay: async (matchId, format = 'json') => {
    set({ loading: true, error: null, replayFormat: format })
    try {
      const data = await getMatchReplay(matchId, format)
      
      if (format === 'html') {
        set({ 
          replayHTML: data,
          replayData: null,
          currentFrame: 0,
          isPlaying: false,
          loading: false 
        })
      } else {
        set({ 
          replayData: data,
          replayHTML: null,
          currentFrame: 0,
          isPlaying: false,
          loading: false 
        })
      }
      return { success: true, data }
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      })
      return { success: false, error: error.message }
    }
  },

  /**
   * Get replay URL
   * @param {string} matchId - Match ID
   * @param {string} format - Replay format ('json' or 'html')
   * @returns {string} Replay URL
   */
  getReplayURL: (matchId, format = 'json') => {
    return getMatchReplayURL(matchId, format)
  },

  /**
   * Start playback
   */
  play: () => {
    const state = get()
    if (!state.replayData || state.isPlaying) return

    const totalFrames = state.replayData.frames.length
    
    const intervalId = setInterval(() => {
      const currentState = get()
      const nextFrame = currentState.currentFrame + 1

      if (nextFrame >= totalFrames) {
        // Reached end of replay
        get().pause()
        set({ currentFrame: totalFrames - 1 })
      } else {
        set({ currentFrame: nextFrame })
      }
    }, 1000 / (30 * state.playbackSpeed)) // 30 FPS adjusted by speed

    set({ isPlaying: true, intervalId })
  },

  /**
   * Pause playback
   */
  pause: () => {
    const state = get()
    if (state.intervalId) {
      clearInterval(state.intervalId)
    }
    set({ isPlaying: false, intervalId: null })
  },

  /**
   * Toggle play/pause
   */
  togglePlay: () => {
    const state = get()
    if (state.isPlaying) {
      state.pause()
    } else {
      state.play()
    }
  },

  /**
   * Set current frame
   * @param {number} frameNumber - Frame number
   */
  setFrame: (frameNumber) => {
    const state = get()
    if (!state.replayData) return

    const totalFrames = state.replayData.frames.length
    const validFrame = Math.max(0, Math.min(frameNumber, totalFrames - 1))
    
    set({ currentFrame: validFrame })
  },

  /**
   * Set playback speed
   * @param {number} speed - Playback speed (0.5, 1, 2)
   */
  setSpeed: (speed) => {
    const state = get()
    const wasPlaying = state.isPlaying
    
    if (wasPlaying) {
      state.pause()
    }
    
    set({ playbackSpeed: speed })
    
    if (wasPlaying) {
      state.play()
    }
  },

  /**
   * Reset replay
   */
  reset: () => {
    const state = get()
    state.pause()
    set({ 
      currentFrame: 0,
      isPlaying: false,
      playbackSpeed: DEFAULT_PLAYBACK_SPEED
    })
  },

  /**
   * Clear replay data
   */
  clearReplay: () => {
    const state = get()
    state.pause()
    set({ 
      replayData: null,
      replayHTML: null,
      replayFormat: 'json',
      currentFrame: 0,
      isPlaying: false,
      playbackSpeed: DEFAULT_PLAYBACK_SPEED,
      error: null
    })
  },
}))

export default useReplayStore
