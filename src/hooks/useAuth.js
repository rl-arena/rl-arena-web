import useAuthStore from '../store/authStore'

/**
 * Custom hook for authentication
 * @returns {Object} Auth state and methods
 */
const useAuth = () => {
  const { 
    user, 
    token, 
    isAuthenticated, 
    loading, 
    error,
    login,
    register,
    logout,
    setUser,
    clearError
  } = useAuthStore()

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    setUser,
    clearError,
  }
}

export default useAuth
