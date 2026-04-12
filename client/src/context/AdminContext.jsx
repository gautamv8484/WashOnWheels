import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext(null)

const DEFAULT_ADMIN = {
  id: 'ADMIN001',
  username: 'admin',
  password: 'admin123',
  name: 'Administrator',
  role: 'super_admin'
}

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAdmin = localStorage.getItem('washOnWheelsAdmin')
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin))
    }
    setLoading(false)
  }, [])

  const adminLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
        const adminData = {
          id: DEFAULT_ADMIN.id,
          username: DEFAULT_ADMIN.username,
          name: DEFAULT_ADMIN.name,
          role: DEFAULT_ADMIN.role,
          loginTime: new Date().toISOString()
        }
        localStorage.setItem('washOnWheelsAdmin', JSON.stringify(adminData))
        setAdmin(adminData)
        resolve(adminData)
      } else {
        reject({ message: 'Invalid admin credentials!' })
      }
    })
  }

  const adminLogout = () => {
    localStorage.removeItem('washOnWheelsAdmin')
    setAdmin(null)
  }

  const value = {
    admin,
    loading,
    adminLogin,
    adminLogout,
    isAdminAuthenticated: !!admin
  }

  return (
    <AdminContext.Provider value={value}>
      {!loading && children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

export default AdminContext;