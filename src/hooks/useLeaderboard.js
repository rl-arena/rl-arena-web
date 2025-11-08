import { useState, useEffect, useCallback } from 'react'
import { getLeaderboard } from '../services/api'
import { LEADERBOARD_PAGE_SIZE } from '../utils/constants'

/**
 * Custom hook for fetching leaderboard data
 * @param {string} envId - Competition ID
 * @param {number} initialPage - Initial page number
 * @returns {Object} Leaderboard data and methods
 */
const useLeaderboard = (envId, initialPage = 1) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('rank')
  const [sortOrder, setSortOrder] = useState('asc')

  /**
   * Fetch leaderboard data
   */
  const fetchLeaderboard = useCallback(async () => {
    if (!envId) return

    setLoading(true)
    setError(null)

    try {
      const response = await getLeaderboard(envId, page, LEADERBOARD_PAGE_SIZE)
      setData(response.data || response.leaderboard || [])
      setTotalPages(response.totalPages || 1)
      setTotalItems(response.totalItems || response.total || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [envId, page])

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  /**
   * Go to specific page
   * @param {number} newPage - Page number
   */
  const goToPage = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }, [totalPages])

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    goToPage(page + 1)
  }, [page, goToPage])

  /**
   * Go to previous page
   */
  const prevPage = useCallback(() => {
    goToPage(page - 1)
  }, [page, goToPage])

  /**
   * Sort leaderboard by column
   * @param {string} column - Column name
   */
  const sort = useCallback((column) => {
    const newOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortBy(column)
    setSortOrder(newOrder)

    // Sort data locally
    const sorted = [...data].sort((a, b) => {
      const aVal = a[column]
      const bVal = b[column]
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newOrder === 'asc' ? aVal - bVal : bVal - aVal
      }
      
      const aStr = String(aVal).toLowerCase()
      const bStr = String(bVal).toLowerCase()
      
      if (newOrder === 'asc') {
        return aStr.localeCompare(bStr)
      } else {
        return bStr.localeCompare(aStr)
      }
    })

    setData(sorted)
  }, [data, sortBy, sortOrder])

  /**
   * Refresh leaderboard
   */
  const refresh = useCallback(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  return {
    data,
    page,
    totalPages,
    totalItems,
    loading,
    error,
    sortBy,
    sortOrder,
    goToPage,
    nextPage,
    prevPage,
    sort,
    refresh,
  }
}

export default useLeaderboard
