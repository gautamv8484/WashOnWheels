import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL + '/api'
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setUser(JSON.parse(userData))
      setIsAuthenticated(true)
      
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setLoading(false)
  }, [])

  // Register
  const register = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  }

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      const { token, user: userData } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)
      setIsAuthenticated(true)

      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    setIsAuthenticated(false)
  }

  // Update user data
  const updateUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  // Get user bookings
  const getMyBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings/my-bookings?phone=${user?.phone}`)
      return response.data.bookings || []
    } catch (error) {
      console.error('Error fetching bookings:', error)
      return []
    }
  }

  // Get user subscriptions
  const getMySubscriptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/subscriptions?phone=${user?.phone}`)
      return response.data.subscriptions || []
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      return []
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateUser,
    getMyBookings,
    getMySubscriptions
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default AuthContext;