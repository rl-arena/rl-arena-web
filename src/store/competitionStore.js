import { create } from 'zustand'
import { getCompetitions, getCompetition } from '../services/api'

const useCompetitionStore = create((set, get) => ({
  competitions: [],
  selectedCompetition: null,
  loading: false,
  error: null,

  /**
   * Fetch all competitions
   */
  fetchCompetitions: async () => {
    set({ loading: true, error: null })
    try {
      const competitions = await getCompetitions()
      set({ 
        competitions, 
        loading: false 
      })
      return { success: true, data: competitions }
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      })
      return { success: false, error: error.message }
    }
  },

  /**
   * Fetch single competition by ID
   * @param {string} envId - Competition ID
   */
  fetchCompetition: async (envId) => {
    set({ loading: true, error: null })
    try {
      const competition = await getCompetition(envId)
      set({ 
        selectedCompetition: competition, 
        loading: false 
      })
      return { success: true, data: competition }
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      })
      return { success: false, error: error.message }
    }
  },

  /**
   * Set selected competition
   * @param {Object} competition - Competition object
   */
  setSelectedCompetition: (competition) => {
    set({ selectedCompetition: competition })
  },

  /**
   * Clear selected competition
   */
  clearSelectedCompetition: () => {
    set({ selectedCompetition: null })
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null })
  },

  /**
   * Update competition in list (for live updates)
   * @param {string} envId - Competition ID
   * @param {Object} updates - Updated fields
   */
  updateCompetition: (envId, updates) => {
    set((state) => ({
      competitions: state.competitions.map(comp => 
        comp.id === envId ? { ...comp, ...updates } : comp
      ),
      selectedCompetition: 
        state.selectedCompetition?.id === envId 
          ? { ...state.selectedCompetition, ...updates }
          : state.selectedCompetition
    }))
  },
}))

export default useCompetitionStore
