import { useEffect } from 'react'
import useCompetitionStore from '../store/competitionStore'

/**
 * Custom hook for fetching competitions
 * @param {boolean} autoFetch - Automatically fetch on mount
 * @returns {Object} Competitions data and methods
 */
const useCompetitions = (autoFetch = true) => {
  const {
    competitions,
    selectedCompetition,
    loading,
    error,
    fetchCompetitions,
    fetchCompetition,
    setSelectedCompetition,
    clearSelectedCompetition,
    clearError,
  } = useCompetitionStore()

  useEffect(() => {
    if (autoFetch && competitions.length === 0 && !loading) {
      fetchCompetitions()
    }
  }, [autoFetch]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    competitions,
    selectedCompetition,
    loading,
    error,
    fetchCompetitions,
    fetchCompetition,
    setSelectedCompetition,
    clearSelectedCompetition,
    clearError,
  }
}

export default useCompetitions
